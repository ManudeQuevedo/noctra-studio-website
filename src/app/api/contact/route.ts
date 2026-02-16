
import { type NextRequest, NextResponse } from "next/server";
import { Client } from "@hubspot/api-client";
import { Resend } from "resend";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/contacts";
import { ContactPayload } from "@/types/hubspot";

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body as ContactPayload;

    if (!email || !name || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Search for existing contact in HubSpot
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: FilterOperatorEnum.Eq,
              value: email,
            },
          ],
        },
      ],
      sorts: ["email"],
      properties: ["email", "firstname", "lastname", "company", "lifecyclestage"],
      limit: 1,
    });

    let contactId;
    const existingContact = searchResponse.results[0];

    // Split name strictly for HubSpot (first/last)
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const contactProperties = {
      email,
      firstname: firstName,
      lastname: lastName,
      company: company || "",
      message: message, // Assuming a custom property or description
      service_interested: service, // Assuming a custom property
    };

    if (existingContact) {
      // Update existing contact
      contactId = existingContact.id;
      await hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties: contactProperties,
      });
      console.log(`Updated contact: ${contactId}`);
    } else {
      // Create new contact
      const createResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties: {
          ...contactProperties,
          lifecyclestage: "lead",
        },
        associations: [],
      });
      contactId = createResponse.id;
      console.log(`Created new contact: ${contactId}`);
    }

    // 2. Send notification email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Noctra Studio <onboarding@resend.dev>", // Or verified domain
      to: ["manu@noctrastudio.com"], // Replace with admin email
      subject: `New Lead: ${name} - ${service}`,
      html: `
        <h1>New Lead: ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
        <br/>
        <a href="https://app.hubspot.com/contacts/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/contact/${contactId}">View in HubSpot</a>
      `,
    });

    if (emailError) {
      console.error("Resend Error:", emailError);
      // We don't fail the request if email fails but HubSpot succeeded, just log it.
    }

    return NextResponse.json({
      success: true,
      message: existingContact ? "Contact updated" : "Contact created",
      contactId,
    });
  } catch (error: any) {
    console.error("HubSpot API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
