import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getWorkspaceAccess } from "@/lib/workspace-access";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_fallback", {
  apiVersion: "2024-06-20",
} as any);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workspaceId } = body;

    if (!workspaceId) {
      return new NextResponse("Missing required parameters", { status: 400 });
    }

    const { supabase, userId, hasAccess } = await getWorkspaceAccess(workspaceId);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!hasAccess) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Fetch Stripe Customer ID from DB
    const { data: customerData } = await supabase
      .from("customers")
      .select("stripe_customer_id")
      .eq("workspace_id", workspaceId)
      .single();

    if (!customerData || !customerData.stripe_customer_id) {
        return new NextResponse("No active billing account", { status: 404 });
    }

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: customerData.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/forge/settings/billing`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    console.error("[STRIPE_PORTAL]", error);
    return new NextResponse(error.message || "Internal Error", { status: 500 });
  }
}
