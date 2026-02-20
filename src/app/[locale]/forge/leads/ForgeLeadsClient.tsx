"use client";

import { useState } from "react";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  Calendar,
  Globe,
  Send,
  MessageSquare,
} from "lucide-react";

type Lead = {
  id: string;
  request_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service_interest: string;
  source_page: string;
  source_cta: string;
  email_sent: boolean;
  email_sent_at: string;
  locale: string;
  created_at: string;
};

export default function ForgeLeadsClient({
  initialLeads,
}: {
  initialLeads: Lead[];
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  const handleRetry = async (submissionId: string) => {
    setIsRetrying(true);
    try {
      const res = await fetch("/api/contact/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      });

      if (res.ok) {
        // Update local state
        setLeads((prev) =>
          prev.map((l) =>
            l.id === submissionId
              ? {
                  ...l,
                  email_sent: true,
                  email_sent_at: new Date().toISOString(),
                }
              : l,
          ),
        );
      } else {
        const error = await res.json();
        alert(`Failed to retry: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("An exception occurred while retrying.");
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden flex-col md:flex-row">
      <ForgeSidebar />

      <aside className="w-full md:w-[320px] bg-[#080808] border-r border-neutral-900 flex flex-col shrink-0 h-[40vh] md:h-full">
        <div className="p-6 border-b border-neutral-900">
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            Recent Leads
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedLeadId(lead.id)}
              className={`w-full text-left p-4 rounded-md transition-all flex flex-col gap-1 ${
                selectedLeadId === lead.id
                  ? "bg-white/[0.05] border-l-2 border-emerald-500"
                  : "hover:bg-white/[0.02] border-l-2 border-transparent"
              }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-neutral-600 bg-white/[0.03] px-1.5 py-0.5 border border-white/[0.05]">
                  {lead.request_id || "NOC-XXXX"}
                </span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase">
                  {format(new Date(lead.created_at), "MMM d")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-neutral-100 truncate pr-2">
                  {lead.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-tighter truncate">
                  {lead.service_interest}
                </span>
                {lead.locale && (
                  <span className="text-[10px] text-neutral-600 font-mono uppercase">
                    [{lead.locale}]
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#050505]">
        {!selectedLead ? (
          <div className="h-full flex items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-widest">
            Select a lead to view details
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-0.5 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-mono uppercase tracking-widest">
                    {selectedLead.service_interest}
                  </div>
                  <div className="px-2 py-0.5 border border-white/10 bg-white/5 text-white/60 text-[10px] font-mono uppercase tracking-widest">
                    {selectedLead.request_id || "NOC-XXXX"}
                  </div>
                  {selectedLead.email_sent && (
                    <div className="px-2 py-0.5 border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <Send className="w-2.5 h-2.5" /> Response Sent
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                  {selectedLead.name}
                </h1>
                <p className="text-neutral-500 font-mono text-sm">
                  Received on{" "}
                  {format(new Date(selectedLead.created_at), "PPPP 'at' p")}
                </p>
              </div>
            </div>

            {/* Quick Actions/Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="space-y-8">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-neutral-600">
                        Email
                      </p>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-lg font-medium text-neutral-200 hover:text-emerald-400 transition-colors">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-neutral-600">
                        Phone
                      </p>
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="text-lg font-medium text-neutral-200 hover:text-emerald-400 transition-colors">
                        {selectedLead.phone || "Not provided"}
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Source Tracking
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Globe className="w-4 h-4 text-neutral-600 mt-1" />
                    <div>
                      <p className="text-[10px] font-mono uppercase text-neutral-600">
                        Origin CTA
                      </p>
                      <p className="text-sm font-mono text-emerald-400">
                        {selectedLead.source_cta || "Direct / Organic"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar className="w-4 h-4 text-neutral-600 mt-1" />
                    <div>
                      <p className="text-[10px] font-mono uppercase text-neutral-600">
                        Locale
                      </p>
                      <p className="text-sm font-mono text-white uppercase">
                        {selectedLead.locale || "ES"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Globe className="w-4 h-4 text-neutral-600 mt-1" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-neutral-600">
                        Source Page
                      </p>
                      <p className="text-xs font-mono text-neutral-400 truncate max-w-xs">
                        {selectedLead.source_page || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Message */}
            <section className="space-y-6 pt-12 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Inquiry Message
                </h3>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-900 p-8 rounded-2xl">
                <p className="text-neutral-200 leading-relaxed whitespace-pre-wrap italic">
                  "{selectedLead.message || "No message provided."}"
                </p>
              </div>
            </section>

            {/* Automation Status */}
            <section className="pt-12">
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Response Automation
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Status of the automated email response triggered upon
                    submission.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {selectedLead.email_sent ? (
                    <div className="text-right">
                      <p className="text-[10px] font-mono uppercase text-emerald-500 font-bold">
                        SENT SUCCESSFULLY
                      </p>
                      <p className="text-[10px] font-mono text-neutral-600 uppercase">
                        {format(new Date(selectedLead.email_sent_at), "PPp")}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p className="text-[10px] font-mono uppercase text-red-500 font-bold">
                        Email not sent
                      </p>
                      <button
                        onClick={() => handleRetry(selectedLead.id)}
                        disabled={isRetrying}
                        className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50">
                        {isRetrying ? "Retrying..." : "Retry Now"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
