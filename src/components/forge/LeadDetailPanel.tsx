"use client";

import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  X,
  Mail,
  Phone,
  Globe,
  Calendar,
  MessageSquare,
  DollarSign,
  Clock,
  RefreshCw,
  StickyNote,
  Send,
  PhoneCall,
  Users,
  PlusCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Activity = {
  id: string;
  lead_id: string;
  type: "note" | "call" | "email" | "meeting" | "status_change";
  content: string;
  created_at: string;
};

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
  pipeline_status: string;
  estimated_value: number;
  next_action: string;
  next_action_date: string;
  locale: string;
  created_at: string;
  lost_reason?: string;
};

interface LeadDetailPanelProps {
  leadId: string | null;
  onClose: () => void;
  onUpdate: (updatedLead: Lead) => void;
}

export function LeadDetailPanel({
  leadId,
  onClose,
  onUpdate,
}: LeadDetailPanelProps) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newActivity, setNewActivity] = useState({ type: "note", content: "" });
  const [isSaving, setIsSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (leadId) {
      fetchLeadData();
    } else {
      setLead(null);
      setActivities([]);
    }
  }, [leadId]);

  const fetchLeadData = async () => {
    setIsLoading(true);
    try {
      const { data: leadData, error: leadError } = await supabase
        .from("contact_submissions")
        .select("*")
        .eq("id", leadId)
        .single();

      if (leadError) throw leadError;
      setLead(leadData);

      const { data: activityData, error: activityError } = await supabase
        .from("lead_activities")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });

      if (activityError) throw activityError;
      setActivities(activityData || []);
    } catch (err) {
      console.error("Error fetching lead data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLead = async (field: keyof Lead, value: any) => {
    if (!lead) return;
    const updatedLead = { ...lead, [field]: value };
    setLead(updatedLead);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ [field]: value })
        .eq("id", lead.id);

      if (error) throw error;
      onUpdate(updatedLead);
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  const handleAddActivity = async () => {
    if (!lead || !newActivity.content.trim()) return;
    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from("lead_activities")
        .insert({
          lead_id: lead.id,
          type: newActivity.type,
          content: newActivity.content.trim(),
        })
        .select()
        .single();

      if (error) throw error;
      setActivities([data, ...activities]);
      setNewActivity({ ...newActivity, content: "" });
    } catch (err) {
      console.error("Error adding activity:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
      case "contactado":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "propuesta_enviada":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "en_negociacion":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "cerrado":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "perdido":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "note":
        return <StickyNote className="w-3.5 h-3.5" />;
      case "call":
        return <PhoneCall className="w-3.5 h-3.5" />;
      case "email":
        return <Send className="w-3.5 h-3.5" />;
      case "meeting":
        return <Users className="w-3.5 h-3.5" />;
      case "status_change":
        return <RefreshCw className="w-3.5 h-3.5" />;
      default:
        return <StickyNote className="w-3.5 h-3.5" />;
    }
  };

  if (!leadId) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0a0a0a] border-l border-neutral-900 z-50 transform transition-transform duration-300 shadow-2xl ${lead ? "translate-x-0" : "translate-x-full"}`}>
      {isLoading ? (
        <div className="h-full flex items-center justify-center text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
          Loading Lead Details...
        </div>
      ) : lead ? (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-[#080808]">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {lead.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-white/[0.03] px-2 py-0.5 border border-white/[0.05]">
                  {lead.request_id}
                </span>
                <span
                  className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 border ${getStatusColor(lead.pipeline_status)}`}>
                  {lead.pipeline_status.replace("_", " ")}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-300 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-10">
            {/* Section 1: Contact Info */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors">
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-300">
                    {lead.phone || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-neutral-700" />
                    <span className="text-[10px] font-mono text-neutral-300 uppercase">
                      [{lead.locale || "ES"}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-neutral-700" />
                    <span className="text-[10px] font-mono text-neutral-300 uppercase">
                      {format(new Date(lead.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Lead Details */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Lead Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                    Service Interest
                  </label>
                  <span className="px-2 py-1 bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono uppercase tracking-widest">
                    {lead.service_interest}
                  </span>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                    Original Message
                  </label>
                  <p className="text-sm text-neutral-400 leading-relaxed italic border-l-2 border-neutral-800 pl-4 py-1">
                    "{lead.message || "No message provided."}"
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                    Valor Estimado (MXN)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="number"
                      value={lead.estimated_value || ""}
                      onChange={(e) =>
                        handleUpdateLead(
                          "estimated_value",
                          parseFloat(e.target.value),
                        )
                      }
                      placeholder="0.00"
                      className="w-full bg-[#0d0d0d] border border-neutral-900 px-10 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                </div>

                {lead.pipeline_status === "perdido" && (
                  <div>
                    <label className="text-[10px] font-mono uppercase text-red-500 block mb-2">
                      Razón de pérdida
                    </label>
                    <p className="text-sm text-red-400/80 italic bg-red-500/5 border border-red-500/10 p-3 leading-relaxed">
                      {lead.lost_reason || "No se proporcionó razón."}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Section 3: Next Action */}
            <section className="space-y-4 pt-4 border-t border-neutral-900">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Next Action
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                    Próxima Acción
                  </label>
                  <input
                    type="text"
                    value={lead.next_action || ""}
                    onBlur={(e) =>
                      handleUpdateLead("next_action", e.target.value)
                    }
                    onChange={(e) =>
                      setLead({ ...lead, next_action: e.target.value })
                    }
                    placeholder="e.g. Llamar viernes"
                    className="w-full bg-[#0d0d0d] border border-neutral-900 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={
                      lead.next_action_date
                        ? lead.next_action_date.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handleUpdateLead("next_action_date", e.target.value)
                    }
                    className="w-full bg-[#0d0d0d] border border-neutral-900 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Section 4 & 5: Activity Feed & Add Activity */}
            <section className="space-y-6 pt-4 border-t border-neutral-900">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  Activity Feed
                </h3>
              </div>

              {/* Add Activity */}
              <div className="bg-[#080808] border border-neutral-900 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  {[
                    { type: "note", icon: StickyNote, label: "Note" },
                    { type: "call", icon: PhoneCall, label: "Call" },
                    { type: "email", icon: Send, label: "Email" },
                    { type: "meeting", icon: Users, label: "Meeting" },
                  ].map((btn) => (
                    <button
                      key={btn.type}
                      onClick={() =>
                        setNewActivity({ ...newActivity, type: btn.type })
                      }
                      className={`flex items-center gap-2 px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest border transition-all ${
                        newActivity.type === btn.type
                          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                          : "bg-white/[0.02] border-white/5 text-neutral-300 hover:text-neutral-300"
                      }`}>
                      <btn.icon className="w-3 h-3" />
                      {btn.label}
                    </button>
                  ))}
                </div>
                <textarea
                  value={newActivity.content}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, content: e.target.value })
                  }
                  placeholder="Type activity details..."
                  className="w-full bg-[#0d0d0d] border border-neutral-900 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors min-h-[80px]"
                />
                <button
                  onClick={handleAddActivity}
                  disabled={isSaving || !newActivity.content.trim()}
                  className="w-full bg-white text-black text-[10px] font-black uppercase tracking-widest py-3 hover:bg-neutral-200 transition-all disabled:opacity-50">
                  {isSaving ? "Adding..." : "Add Activity"}
                </button>
              </div>

              {/* Feed */}
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-[10px] font-mono uppercase tracking-widest">
                    No activity recorded yet
                  </div>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 group">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:text-emerald-500 transition-colors">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
                            {activity.type.replace("_", " ")}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-700">
                            {formatDistanceToNow(
                              new Date(activity.created_at),
                              { addSuffix: true },
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-300 leading-relaxed font-light">
                          {activity.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Section 6: Pipeline Status */}
          <div className="p-6 bg-[#080808] border-t border-neutral-900">
            <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-4">
              Pipeline Status
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "nuevo",
                "contactado",
                "propuesta_enviada",
                "en_negociacion",
                "cerrado",
                "perdido",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateLead("pipeline_status", status)}
                  className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest border transition-all ${
                    lead.pipeline_status === status
                      ? getStatusColor(status)
                          .replace("/20", "/40")
                          .replace("/30", "/60") +
                        " border-" +
                        getStatusColor(status).split(" ")[1].split("/")[0]
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-neutral-400"
                  }`}>
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
