"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Info } from "lucide-react";

export default function ProfessionalWebsitesClient() {
  const t = useTranslations("ServiceDetails.professional_websites");

  return (
    <div className="relative">
      {/* Landing Page Note */}
      <div className="absolute top-24 left-0 right-0 z-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-sm md:text-base backdrop-blur-sm">
            <Info className="w-5 h-5 shrink-0" />
            <p>
              {t.rich("landing_page_note", {
                link: (chunks) => (
                  <Link href="/services/landing-page" className="font-bold underline underline-offset-4 hover:text-white transition-colors">
                    {chunks}
                  </Link>
                )
              })}
            </p>
          </div>
        </div>
      </div>

      <ServicePageTemplate
        namespace="professional_websites"
        interestId="professional-websites"
      />
    </div>
  );
}
