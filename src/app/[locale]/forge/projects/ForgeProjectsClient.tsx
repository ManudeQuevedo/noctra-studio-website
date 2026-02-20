"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import type { Project } from "@/lib/projects";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Trash2, Plus, CheckCircle2, Save, X } from "lucide-react";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";

type StatusHistory = {
  id: string;
  project_id: string;
  status: string;
  created_at: string;
};

export default function ForgeProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [unsavedIds, setUnsavedIds] = useState<Set<string>>(new Set());
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [histories, setHistories] = useState<Record<string, StatusHistory[]>>(
    {},
  );

  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    slug: "",
    industry: "",
    status: "discovery",
    launch_date: "",
    start_date: "",
  });

  const router = useRouter();
  const supabase = createClient();

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const markUnsaved = (id: string) => {
    setUnsavedIds((prev) => new Set(prev).add(id));
  };

  const markSaved = (id: string) => {
    setUnsavedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateLocal = (id: string, field: keyof Project, value: any) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
    markUnsaved(id);
  };

  const fetchHistory = async (id: string) => {
    const { data } = await supabase
      .from("project_status_history")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false });
    if (data) setHistories((prev) => ({ ...prev, [id]: data }));
  };

  useEffect(() => {
    if (selectedId && !histories[selectedId]) {
      fetchHistory(selectedId);
    }
  }, [selectedId]);

  const handleStatusChange = async (project: Project, newStatus: string) => {
    if (project.status === newStatus) return;

    // Optimistic update
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, status: newStatus as any } : p,
      ),
    );

    try {
      const { error } = await supabase
        .from("projects")
        .update({ status: newStatus })
        .eq("id", project.id);
      if (error) throw error;

      await supabase
        .from("project_status_history")
        .insert({ project_id: project.id, status: newStatus });

      showToast(`Status updated to ${newStatus}`);
      fetchHistory(project.id);
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleNotesBlur = async (project: Project, notes: string) => {
    if (!unsavedIds.has(project.id)) return; // No change if not marked

    try {
      const { error } = await supabase
        .from("projects")
        .update({ internal_notes: notes })
        .eq("id", project.id);
      if (error) throw error;
      showToast("Notes auto-saved");
      markSaved(project.id);
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleSaveAllFields = async (project: Project) => {
    setSavingGlobal(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          name: project.name,
          slug: project.slug,
          tagline: project.tagline,
          industry: project.industry,
          visible: project.visible,
          start_date: project.start_date,
          launch_date: project.launch_date,
          deadline: project.deadline,
          has_ai_form: project.has_ai_form,
          form_description: project.form_description,
          case_study_enabled: project.case_study_enabled,
          challenge: project.challenge,
          solution: project.solution,
          results: project.results,
          metrics: project.metrics,
          gallery: project.gallery,
        })
        .eq("id", project.id);

      if (error) throw error;

      await Promise.all([
        fetch("/api/revalidate?path=/", { method: "POST" }),
        fetch("/api/revalidate?path=/work", { method: "POST" }),
        fetch(`/api/revalidate?path=/work/${project.slug}`, { method: "POST" }),
      ]);

      showToast("Changes saved successfully");
      markSaved(project.id);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSavingGlobal(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedId === id) setSelectedId(null);
      showToast("Project deleted");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.slug)
      return showToast("Name and slug required", "error");

    setSavingGlobal(true);
    try {
      const sort_order =
        projects.length > 0
          ? Math.max(...projects.map((p) => p.sort_order || 0)) + 10
          : 10;

      const { data, error } = await supabase
        .from("projects")
        .insert({
          name: newProject.name,
          slug: newProject.slug,
          industry: newProject.industry,
          status: newProject.status,
          start_date: newProject.start_date,
          launch_date: newProject.launch_date,
          sort_order,
          visible: true,
          has_ai_form: false,
          case_study_enabled: false,
          metrics: [],
          gallery: [],
        })
        .select()
        .single();

      if (error) throw error;

      await supabase
        .from("project_status_history")
        .insert({ project_id: data.id, status: data.status });

      setProjects((prev) =>
        [...prev, data as Project].sort((a, b) => a.sort_order - b.sort_order),
      );
      showToast("Project created");
      setIsCreating(false);
      setSelectedId(data.id);
      setNewProject({
        name: "",
        slug: "",
        industry: "",
        status: "discovery",
        launch_date: "",
        start_date: "",
      });
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSavingGlobal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "discovery":
        return "bg-neutral-500";
      case "design":
        return "bg-blue-500";
      case "development":
        return "bg-amber-500";
      case "launch":
        return "bg-orange-500";
      case "completed":
        return "bg-emerald-500";
      default:
        return "bg-neutral-500";
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden flex-col md:flex-row">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-none border text-sm font-mono tracking-widest uppercase transition-all ${toast.type === "success" ? "bg-black border-emerald-500/50 text-emerald-400" : "bg-black border-red-500/50 text-red-400"}`}>
          {toast.message}
        </div>
      )}

      {/* Sidebar */}
      <ForgeSidebar />

      {/* Projects Secondary Sidebar */}
      <aside className="w-full md:w-[280px] bg-[#0a0a0a] border-r border-neutral-900 flex flex-col shrink-0 flex-none h-[30vh] md:h-full z-10">
        <div className="p-6 pb-2">
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
            Projects
          </h2>
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 space-y-1"
          data-lenis-prevent>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left p-3 rounded-md transition-all flex flex-col gap-1 border-l-2 ${
                selectedId === p.id
                  ? "bg-white/[0.03] border-emerald-500"
                  : "border-transparent hover:bg-white/[0.02]"
              }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-neutral-200 truncate pr-2 flex items-center gap-2">
                  {p.name}
                  {unsavedIds.has(p.id) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(p.status)}`}
                  />
                </div>
              </div>
              {p.start_date && (
                <div className="text-[10px] text-neutral-300 font-mono uppercase tracking-wider">
                  {p.start_date}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-neutral-900 space-y-4">
          <button
            onClick={() => setIsCreating(true)}
            className="w-full py-2.5 bg-white border border-white text-black text-[10px] font-mono uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors">
            + New Project
          </button>
        </div>
      </aside>

      {/* Main Detail Panel */}
      <main
        className="flex-1 overflow-y-auto relative outline-none flex flex-col pb-24 md:pb-0"
        data-lenis-prevent>
        {!selectedProject ? (
          <div className="flex-1 flex items-center justify-center text-neutral-400 font-mono text-xs uppercase tracking-widest">
            Select a project
          </div>
        ) : (
          <div className="max-w-3xl w-full mx-auto p-8 md:p-12 space-y-16 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-2 py-0.5 rounded-none border text-[10px] font-mono uppercase tracking-widest ${getStatusColor(selectedProject.status)}/10 border-${getStatusColor(selectedProject.status)}/20 text-${getStatusColor(selectedProject.status).replace("bg-", "")}`}>
                    {selectedProject.status}
                  </div>
                  {!selectedProject.visible && (
                    <div className="px-2 py-0.5 border border-neutral-800 text-neutral-300 text-[10px] font-mono uppercase tracking-widest">
                      Hidden
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={selectedProject.name}
                  onChange={(e) =>
                    updateLocal(selectedProject.id, "name", e.target.value)
                  }
                  className="text-4xl md:text-5xl font-bold bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-full placeholder-neutral-800"
                  placeholder="Project Name"
                />
              </div>

              {deleteConfirmId === selectedProject.id ? (
                <div className="flex items-center gap-3 bg-red-500/10 p-3 border border-red-500/20">
                  <span className="text-xs text-red-500 font-mono">
                    Are you sure?
                  </span>
                  <button
                    onClick={() => handleDelete(selectedProject.id)}
                    className="text-xs font-bold text-red-400 hover:text-red-300">
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="text-xs text-neutral-400 hover:text-white">
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmId(selectedProject.id)}
                  className="text-neutral-400 hover:text-red-400 transition-colors p-2 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* SECTION 1: GENERAL */}
            <section className="space-y-8">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 border-b border-neutral-900 pb-2">
                1. General
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={selectedProject.slug}
                    onChange={(e) =>
                      updateLocal(selectedProject.id, "slug", e.target.value)
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={selectedProject.industry}
                    onChange={(e) =>
                      updateLocal(
                        selectedProject.id,
                        "industry",
                        e.target.value,
                      )
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={selectedProject.tagline}
                    onChange={(e) =>
                      updateLocal(selectedProject.id, "tagline", e.target.value)
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateLocal(
                        selectedProject.id,
                        "visible",
                        !selectedProject.visible,
                      )
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${selectedProject.visible ? "bg-emerald-500" : "bg-neutral-800"}`}>
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${selectedProject.visible ? "left-7" : "left-1"}`}
                    />
                  </button>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Visible on Public Work Page
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 2: TIMELINE */}
            <section className="space-y-8">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 border-b border-neutral-900 pb-2">
                2. Timeline
              </h3>

              <div className="space-y-4">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  Phase
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "discovery",
                    "design",
                    "development",
                    "launch",
                    "completed",
                  ].map((phase) => (
                    <button
                      key={phase}
                      onClick={() => handleStatusChange(selectedProject, phase)}
                      className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${selectedProject.status === phase ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-transparent border-neutral-800 text-neutral-300 hover:border-neutral-600"}`}>
                      {phase}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={selectedProject.start_date || ""}
                    onChange={(e) =>
                      updateLocal(
                        selectedProject.id,
                        "start_date",
                        e.target.value,
                      )
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Launch Date
                  </label>
                  <input
                    type="text"
                    value={selectedProject.launch_date || ""}
                    onChange={(e) =>
                      updateLocal(
                        selectedProject.id,
                        "launch_date",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. End of Q1 2026"
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={selectedProject.deadline || ""}
                    onChange={(e) =>
                      updateLocal(
                        selectedProject.id,
                        "deadline",
                        e.target.value,
                      )
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm [color-scheme:dark]"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: INTERNAL NOTES */}
            <section className="space-y-4">
              <div className="border-b border-neutral-900 pb-2 flex justify-between items-center">
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    3. Internal Notes
                  </h3>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Only visible to you. Never shown on the website. Auto-saves
                    on blur.
                  </p>
                </div>
              </div>
              <textarea
                value={selectedProject.internal_notes || ""}
                onChange={(e) =>
                  updateLocal(
                    selectedProject.id,
                    "internal_notes",
                    e.target.value,
                  )
                }
                onBlur={(e) => handleNotesBlur(selectedProject, e.target.value)}
                rows={4}
                className="w-full bg-neutral-900/30 border border-neutral-800 p-4 text-sm text-neutral-300 focus:outline-none focus:border-white transition-colors resize-both"
                placeholder="Write private notes, links, contacts here..."
              />
            </section>

            {/* SECTION 4: SPECIAL FEATURES */}
            <section className="space-y-8">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 border-b border-neutral-900 pb-2">
                4. Special Features
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateLocal(
                        selectedProject.id,
                        "has_ai_form",
                        !selectedProject.has_ai_form,
                      )
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${selectedProject.has_ai_form ? "bg-emerald-500" : "bg-neutral-800"}`}>
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${selectedProject.has_ai_form ? "left-7" : "left-1"}`}
                    />
                  </button>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    AI-Powered Form
                  </span>
                </div>
                {selectedProject.has_ai_form && (
                  <div className="pl-13 space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      Form Description
                    </label>
                    <textarea
                      value={selectedProject.form_description || ""}
                      onChange={(e) =>
                        updateLocal(
                          selectedProject.id,
                          "form_description",
                          e.target.value,
                        )
                      }
                      rows={2}
                      className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm"
                      placeholder="e.g. Analyzes documents automatically..."
                    />
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 5: CASE STUDY */}
            {selectedProject.status === "completed" && (
              <section className="space-y-8">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 border-b border-neutral-900 pb-2">
                  5. Case Study
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() =>
                      updateLocal(
                        selectedProject.id,
                        "case_study_enabled",
                        !selectedProject.case_study_enabled,
                      )
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${selectedProject.case_study_enabled ? "bg-emerald-500" : "bg-neutral-800"}`}>
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${selectedProject.case_study_enabled ? "left-7" : "left-1"}`}
                    />
                  </button>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Publish Case Study (/work/{selectedProject.slug})
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      The Challenge
                    </label>
                    <textarea
                      value={selectedProject.challenge || ""}
                      onChange={(e) =>
                        updateLocal(
                          selectedProject.id,
                          "challenge",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      Our Solution
                    </label>
                    <textarea
                      value={selectedProject.solution || ""}
                      onChange={(e) =>
                        updateLocal(
                          selectedProject.id,
                          "solution",
                          e.target.value,
                        )
                      }
                      rows={4}
                      className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      The Results
                    </label>
                    <textarea
                      value={selectedProject.results || ""}
                      onChange={(e) =>
                        updateLocal(
                          selectedProject.id,
                          "results",
                          e.target.value,
                        )
                      }
                      rows={2}
                      className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>

                {selectedProject.case_study_enabled && (
                  <>
                    <div className="space-y-4 pt-6">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                          Metrics
                        </label>
                        <button
                          onClick={() =>
                            updateLocal(selectedProject.id, "metrics", [
                              ...(selectedProject.metrics || []),
                              { label: "", value: "", delta: "" },
                            ])
                          }
                          className="text-[10px] font-mono uppercase text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add Metric
                        </button>
                      </div>
                      <div className="space-y-3">
                        {selectedProject.metrics?.map((m, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <input
                              value={m.label}
                              onChange={(e) => {
                                const newM = [...selectedProject.metrics];
                                newM[i].label = e.target.value;
                                updateLocal(
                                  selectedProject.id,
                                  "metrics",
                                  newM,
                                );
                              }}
                              placeholder="Label"
                              className="flex-1 bg-transparent border-b border-neutral-800 py-2 text-sm text-white focus:border-white focus:outline-none"
                            />
                            <input
                              value={m.value}
                              onChange={(e) => {
                                const newM = [...selectedProject.metrics];
                                newM[i].value = e.target.value;
                                updateLocal(
                                  selectedProject.id,
                                  "metrics",
                                  newM,
                                );
                              }}
                              placeholder="Value"
                              className="w-32 bg-transparent border-b border-neutral-800 py-2 text-sm text-white font-bold focus:border-white focus:outline-none"
                            />
                            <input
                              value={m.delta || ""}
                              onChange={(e) => {
                                const newM = [...selectedProject.metrics];
                                newM[i].delta = e.target.value;
                                updateLocal(
                                  selectedProject.id,
                                  "metrics",
                                  newM,
                                );
                              }}
                              placeholder="Delta"
                              className="w-24 bg-transparent border-b border-neutral-800 py-2 text-sm text-emerald-400 focus:border-emerald-500 focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                const newM = selectedProject.metrics.filter(
                                  (_, idx) => idx !== i,
                                );
                                updateLocal(
                                  selectedProject.id,
                                  "metrics",
                                  newM,
                                );
                              }}
                              className="p-2 mt-1 text-red-500/50 hover:text-red-400">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-6">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                          Gallery
                        </label>
                        <button
                          onClick={() =>
                            updateLocal(selectedProject.id, "gallery", [
                              ...(selectedProject.gallery || []),
                              { url: "", caption: "" },
                            ])
                          }
                          className="text-[10px] font-mono uppercase text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add Image
                        </button>
                      </div>
                      <div className="space-y-3">
                        {selectedProject.gallery?.map((g, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <input
                              value={g.url}
                              onChange={(e) => {
                                const newG = [...selectedProject.gallery];
                                newG[i].url = e.target.value;
                                updateLocal(
                                  selectedProject.id,
                                  "gallery",
                                  newG,
                                );
                              }}
                              placeholder="URL (/images/...)"
                              className="flex-1 bg-transparent border-b border-neutral-800 py-2 text-sm text-white focus:border-white focus:outline-none"
                            />
                            <input
                              value={g.caption}
                              onChange={(e) => {
                                const newG = [...selectedProject.gallery];
                                newG[i].caption = e.target.value;
                                updateLocal(
                                  selectedProject.id,
                                  "gallery",
                                  newG,
                                );
                              }}
                              placeholder="Caption"
                              className="flex-1 bg-transparent border-b border-neutral-800 py-2 text-sm text-white focus:border-white focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                const newG = selectedProject.gallery.filter(
                                  (_, idx) => idx !== i,
                                );
                                updateLocal(
                                  selectedProject.id,
                                  "gallery",
                                  newG,
                                );
                              }}
                              className="p-2 mt-1 text-red-500/50 hover:text-red-400">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </section>
            )}

            {/* SECTION 6: STATUS HISTORY */}
            <section className="space-y-4 pt-12">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-900 pb-2">
                6. Status History
              </h3>
              <div className="space-y-3 pl-2 border-l border-neutral-900">
                {(histories[selectedProject.id] || []).map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center gap-4 text-xs font-mono">
                    <span
                      className={`uppercase tracking-widest w-24 ${getStatusColor(h.status).replace("bg-", "text-")}`}>
                      {h.status}
                    </span>
                    <span className="text-neutral-400">→</span>
                    <span className="text-neutral-300">
                      {new Date(h.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Floating Save Button */}
        {selectedProject && unsavedIds.has(selectedProject.id) && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={() => handleSaveAllFields(selectedProject)}
              disabled={savingGlobal}
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-200 transition-colors shadow-2xl disabled:opacity-50">
              {savingGlobal ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </main>

      {/* New Project Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-neutral-800 w-full max-w-lg p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300">
                New Project
              </h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-neutral-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  Name *
                </label>
                <input
                  autoFocus
                  type="text"
                  value={newProject.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "");
                    setNewProject({ ...newProject, name, slug });
                  }}
                  className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  Slug *
                </label>
                <input
                  type="text"
                  value={newProject.slug}
                  onChange={(e) =>
                    setNewProject({ ...newProject, slug: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  Industry
                </label>
                <input
                  type="text"
                  value={newProject.industry}
                  onChange={(e) =>
                    setNewProject({ ...newProject, industry: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newProject.start_date || ""}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        start_date: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white text-sm [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    Launch Date
                  </label>
                  <input
                    type="text"
                    value={newProject.launch_date}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        launch_date: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-2 text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                disabled={savingGlobal}
                onClick={handleCreateProject}
                className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50">
                {savingGlobal ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
