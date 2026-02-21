"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  format,
  differenceInDays,
  isSameMonth,
  isAfter,
  subMonths,
  isBefore,
  addDays,
} from "date-fns";
import { es } from "date-fns/locale";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import {
  Bell,
  FileText,
  PenTool,
  Clock,
  Users,
  TrendingUp,
  Briefcase,
  DollarSign,
  ArrowRight,
  Activity,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { useFollowUps } from "@/hooks/useFollowUps";
import { FollowUpModal } from "@/components/forge/FollowUpModal";
import { RevenueForecast } from "@/app/actions/metrics";

type Lead = any;
type Proposal = any;
type Contract = any;
type Project = any;

const STAGES = [
  "nuevo",
  "contactado",
  "propuesta_enviada",
  "en_negociacion",
  "cerrado",
  "perdido",
];
const STAGE_LABELS: Record<string, string> = {
  nuevo: "NUEVO",
  contactado: "CONTACTADO",
  propuesta_enviada: "PROPUESTA",
  en_negociacion: "NEGOCIACIÓN",
  cerrado: "CERRADO",
  perdido: "PERDIDO",
};

export default function DashboardClient({
  leads,
  proposals,
  contracts,
  projects,
  forecast,
}: {
  leads: Lead[];
  proposals: Proposal[];
  contracts: Contract[];
  projects: Project[];
  forecast: RevenueForecast;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { suggestions, refresh } = useFollowUps();
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);

  useEffect(() => {
    // Only used to keep the Greeting fresh if they leave the tab open
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return "Buenos días";
    if (hour >= 12 && hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  const formattedDate = format(currentTime, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden flex-col md:flex-row">
      <ForgeSidebar />

      <main
        className="flex-1 overflow-y-auto bg-[#050505] flex flex-col pb-24 md:pb-0 min-w-0"
        data-lenis-prevent>
        {/* Header */}
        <header className="px-6 md:px-12 pt-12 pb-8 border-b border-neutral-900 bg-[#080808]">
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            {getGreeting()}, Manu.
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 capitalize">
              {formattedDate}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              Aquí está lo que necesitas saber hoy.
            </p>
          </div>
        </header>

        <div className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto w-full">
          {/* Follow-up Smart Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-black">
                    Seguimiento Sugerido
                  </p>
                  <p className="text-sm font-bold text-white">
                    Tienes {suggestions.length} cliente
                    {suggestions.length > 1 ? "s" : ""} que requiere
                    {suggestions.length > 1 ? "n" : ""} atención inmediata.
                  </p>
                </div>
              </div>
              <Link
                href="/forge/proposals"
                className="px-4 py-2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all">
                Revisar sugerencias
              </Link>
            </div>
          )}

          {/* Row 1: Alertas del Día */}
          <AlertsRow
            leads={leads}
            proposals={proposals}
            contracts={contracts}
          />

          {/* Row 2: KPIs Rápidos */}
          <KpiRow
            leads={leads}
            proposals={proposals}
            projects={projects}
            contracts={contracts}
            forecast={forecast}
          />

          {/* Row 3: Actividad Reciente & Próximas acciones */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <RecentActivity
              leads={leads}
              proposals={proposals}
              contracts={contracts}
              projects={projects}
            />
            <UpcomingActions leads={leads} />
          </div>

          {/* Row 4: Pipeline Snapshot */}
          <PipelineSnapshot leads={leads} />
        </div>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// ROW 1: ALERTAS DEL DÍA
// ----------------------------------------------------------------------
function AlertsRow({ leads, proposals, contracts }: any) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const alerts = [];

  // 1. Nuevos leads desde ayer
  const newLeads = leads.filter((l: any) =>
    isAfter(new Date(l.created_at), yesterday),
  );
  if (newLeads.length > 0) {
    alerts.push({
      type: "red",
      icon: Users,
      text: `${newLeads.length} lead${newLeads.length > 1 ? "s" : ""} nuevo${newLeads.length > 1 ? "s" : ""}`,
      link: "/forge/leads",
    });
  }

  // 2. Propuestas vistas sin firma (older than 2 days)
  const twoDaysAgo = subMonths(new Date(), 0); // reusing subMonths hack, wait let's use addDays
  const twoDaysAgoDate = addDays(today, -2);
  const hangingProposals = proposals.filter(
    (p: any) =>
      p.status === "viewed" &&
      isBefore(new Date(p.updated_at || p.created_at), twoDaysAgoDate),
  );
  if (hangingProposals.length > 0) {
    alerts.push({
      type: "orange",
      icon: FileText,
      text: `${hangingProposals.length} propuesta${hangingProposals.length > 1 ? "s" : ""} vista${hangingProposals.length > 1 ? "s" : ""} sin firma`,
      link: "/forge/proposals",
    });
  }

  // 3. Contratos pendientes de firma ("sent")
  const pendingContracts = contracts.filter((c: any) => c.status === "pending");
  if (pendingContracts.length > 0) {
    alerts.push({
      type: "orange",
      icon: PenTool,
      text: `${pendingContracts.length} contrato${pendingContracts.length > 1 ? "s" : ""} pendiente${pendingContracts.length > 1 ? "s" : ""} de firma`,
      link: "/forge/contracts",
    });
  }

  // 4. Acciones vencidas
  const overdueActions = leads.filter(
    (l: any) =>
      l.next_action_date &&
      isBefore(new Date(l.next_action_date), today) &&
      l.pipeline_status !== "cerrado" &&
      l.pipeline_status !== "perdido",
  );
  if (overdueActions.length > 0) {
    alerts.push({
      type: "red",
      icon: AlertCircle,
      text: `${overdueActions.length} acción${overdueActions.length > 1 ? "es" : ""} vencida${overdueActions.length > 1 ? "s" : ""}`,
      link: "/forge/pipeline",
    });
  }

  // 5. Leads sin contactar en 3+ días
  const threeDaysAgoDate = addDays(today, -3);
  const ghostingLeads = leads.filter(
    (l: any) =>
      l.pipeline_status === "nuevo" &&
      isBefore(new Date(l.created_at), threeDaysAgoDate),
  );
  if (ghostingLeads.length > 0) {
    alerts.push({
      type: "yellow",
      icon: Clock,
      text: `${ghostingLeads.length} lead${ghostingLeads.length > 1 ? "s" : ""} sin contactar (3+ días)`,
      link: "/forge/pipeline",
    });
  }

  if (alerts.length === 0) {
    return (
      <div className="w-full bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
          Todo al día. Sin pendientes.
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex w-full overflow-x-auto gap-4 scrollbar-hide snap-x"
      data-lenis-prevent>
      {alerts.map((a, i) => {
        let colors =
          "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700";
        if (a.type === "red")
          colors =
            "bg-red-500/10 border-red-500/30 text-red-500 hover:border-red-500/50 hover:bg-red-500/20";
        if (a.type === "orange")
          colors =
            "bg-orange-500/10 border-orange-500/30 text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/20";
        if (a.type === "yellow")
          colors =
            "bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:border-yellow-500/50 hover:bg-yellow-500/20";

        return (
          <Link
            key={i}
            href={a.link}
            className={`flex-shrink-0 snap-start flex items-center gap-3 p-4 pr-8 rounded-lg border transition-colors ${colors}`}>
            <a.icon className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              {a.text}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------------------------
// ROW 2: KPIs RÁPIDOS
// ----------------------------------------------------------------------
function KpiRow({ leads, proposals, projects, contracts, forecast }: any) {
  const currentMonth = new Date();
  const lastMonth = subMonths(currentMonth, 1);

  // 1. Leads este mes vs last month
  const leadsThisMonth = leads.filter((l: any) =>
    isSameMonth(new Date(l.created_at), currentMonth),
  ).length;
  const leadsLastMonth = leads.filter((l: any) =>
    isSameMonth(new Date(l.created_at), lastMonth),
  ).length;
  const leadDelta = leadsThisMonth - leadsLastMonth;

  // 2. Propuestas activas (sent, viewed)
  const activeProposals = proposals.filter(
    (p: any) => p.status === "sent" || p.status === "viewed",
  );
  const activeProposalsValue = activeProposals.reduce(
    (sum: number, p: any) => sum + (p.total_price || 0),
    0,
  );

  // 3. Proyectos en curso (not completed or cancelled)
  const ongoingProjects = projects.filter(
    (p: any) => !["completed", "cancelled"].includes(p.status),
  );

  // No longer using simplistic closedValue calculation as we have the engine.
  const formatCurrency = (val: number) => {
    return (
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }).format(val) + " MXN"
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        label="Leads Este Mes"
        value={leadsThisMonth.toString()}
        subtext={`${leadDelta > 0 ? "▲ +" : leadDelta < 0 ? "▼ " : ""}${leadDelta} vs mes anterior`}
        subtextColor={
          leadDelta > 0
            ? "text-emerald-400"
            : leadDelta < 0
              ? "text-red-400"
              : "text-neutral-500"
        }
      />
      <KpiCard
        label="Propuestas Activas"
        value={activeProposals.length.toString()}
        subtext={`${formatCurrency(activeProposalsValue)} acumulado`}
      />
      <div className="bg-[#111111] border border-neutral-900 p-6 flex flex-col justify-between relative group">
        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
          Proyectos En Curso
        </span>
        <div className="text-3xl font-black">{ongoingProjects.length}</div>
        <div className="absolute inset-0 bg-[#111] p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center overflow-hidden z-20 overflow-y-auto">
          {ongoingProjects.length === 0 ? (
            <span className="text-xs text-neutral-500">Ninguno</span>
          ) : (
            ongoingProjects.map((p: any) => (
              <p
                key={p.id}
                className="text-[10px] font-mono uppercase text-emerald-400 truncate w-full mb-1">
                • {p.name}
              </p>
            ))
          )}
        </div>
      </div>
      <KpiCard
        label="Forecast Ingresos"
        value={formatCurrency(forecast.total)}
        subtext="Proyección ponderada"
        valueColor="text-emerald-500"
      />
    </div>
  );
}

function KpiCard({
  label,
  value,
  subtext,
  subtextColor = "text-neutral-500",
  valueColor = "text-white",
}: any) {
  return (
    <div className="bg-[#111111] border border-neutral-900 p-6 flex flex-col justify-between">
      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
        {label}
      </span>
      <div className={`text-3xl font-black ${valueColor}`}>{value}</div>
      <div
        className={`text-[10px] font-mono uppercase tracking-widest mt-2 ${subtextColor}`}>
        {subtext}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// ROW 3: ACTIVIDAD RECIENTE & PRÓXIMAS ACCIONES
// ----------------------------------------------------------------------
function RecentActivity({ leads, proposals, contracts, projects }: any) {
  // Aggregate events into a unified chronological array
  const events: any[] = [];

  leads.forEach((l: any) => {
    events.push({
      id: `l-${l.id}`,
      date: new Date(l.created_at),
      type: "lead",
      desc: `Nuevo lead: ${l.name}`,
      link: `/forge/leads`,
    });
  });

  proposals.forEach((p: any) => {
    events.push({
      id: `p-${p.id}`,
      date: new Date(p.updated_at || p.created_at),
      type: "proposal",
      desc: `Propuesta ${p.status === "signed" ? "firmada" : p.status}: ${p.company_name}`,
      link: `/forge/proposals`,
    });
  });

  events.sort((a, b) => b.date.getTime() - a.date.getTime());
  const recentEvents = events.slice(0, 8);

  return (
    <div className="lg:col-span-3 bg-[#111111] border border-neutral-900 overflow-hidden flex flex-col h-[400px]">
      <div className="p-6 border-b border-neutral-900 bg-[#161616]">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
          Actividad Reciente
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6" data-lenis-prevent>
        {recentEvents.length === 0 ? (
          <p className="text-xs font-mono text-neutral-600">
            No hay actividad reciente.
          </p>
        ) : (
          recentEvents.map((evt) => (
            <Link key={evt.id} href={evt.link} className="flex gap-4 group">
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-800 transition-colors">
                <Activity className="w-3 h-3 text-neutral-400" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors truncate">
                  {evt.desc}
                </span>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                  {differenceInDays(new Date(), evt.date) === 0
                    ? "Hoy"
                    : `Hace ${differenceInDays(new Date(), evt.date)} días`}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function UpcomingActions({ leads }: any) {
  const today = new Date();
  const next7Days = addDays(today, 7);

  const actions = leads
    .filter(
      (l: any) =>
        l.next_action_date &&
        l.pipeline_status !== "cerrado" &&
        l.pipeline_status !== "perdido",
    )
    .filter((l: any) => isBefore(new Date(l.next_action_date), next7Days))
    .sort(
      (a: any, b: any) =>
        new Date(a.next_action_date).getTime() -
        new Date(b.next_action_date).getTime(),
    );

  return (
    <div className="lg:col-span-2 bg-[#111111] border border-neutral-900 overflow-hidden flex flex-col h-[400px]">
      <div className="p-6 border-b border-neutral-900 bg-[#161616]">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
          Próximas Acciones
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent>
        {actions.length === 0 ? (
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 leading-tight">
            Sin acciones programadas esta semana.
          </p>
        ) : (
          actions.map((l: any) => {
            const isOverdue = isBefore(new Date(l.next_action_date), today);
            return (
              <Link
                key={l.id}
                href="/forge/pipeline"
                className={`flex flex-col p-4 rounded-lg border transition-colors ${isOverdue ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40" : "bg-neutral-900 border-neutral-800 hover:border-neutral-600"}`}>
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest ${isOverdue ? "text-red-400" : "text-emerald-400"}`}>
                    {format(new Date(l.next_action_date), "MMM d", {
                      locale: es,
                    })}
                  </span>
                  {isOverdue && (
                    <span className="text-[8px] font-black uppercase text-red-500 bg-red-500/20 px-2 py-0.5 rounded-sm">
                      Atrasado
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm font-bold truncate ${isOverdue ? "text-red-100" : "text-white"}`}>
                  {l.name}
                </span>
                {l.next_action_notes && (
                  <span className="text-xs text-neutral-500 truncate mt-1">
                    {l.next_action_notes}
                  </span>
                )}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// ROW 4: PIPELINE SNAPSHOT
// ----------------------------------------------------------------------
function PipelineSnapshot({ leads }: any) {
  const activeLeads = leads.filter(
    (l: any) =>
      l.pipeline_status !== "cerrado" && l.pipeline_status !== "perdido",
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculateTotal = (stage: string) => {
    return leads
      .filter((l: any) => l.pipeline_status === stage)
      .reduce((sum: number, l: any) => sum + (l.estimated_value || 0), 0);
  };

  const calculateCount = (stage: string) =>
    leads.filter((l: any) => l.pipeline_status === stage).length;

  const totalPipelineValue = activeLeads.reduce(
    (sum: number, l: any) => sum + (l.estimated_value || 0),
    0,
  );

  return (
    <div className="bg-[#111111] border border-neutral-900 p-6 md:p-8 flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 mb-2">
            Pipeline Snapshot
          </h3>
          <p className="text-3xl font-black text-white">
            {formatCurrency(totalPipelineValue)}
          </p>
        </div>
        <Link
          href="/forge/pipeline"
          className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
          Ver Pipeline <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full h-auto min-h-[64px] md:h-24">
        {STAGES.filter((s) => !["cerrado", "perdido"].includes(s)).map(
          (stage, idx) => {
            const count = calculateCount(stage);
            const value = calculateTotal(stage);
            return (
              <Link
                key={stage}
                href="/forge/pipeline"
                className="flex-1 bg-[#1a1a1a] border border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all p-4 rounded-xl flex flex-col justify-between group min-w-0">
                <div className="flex items-center justify-between gap-2 max-w-full">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-emerald-400 transition-colors truncate">
                    {STAGE_LABELS[stage]}
                  </span>
                  <span className="text-xs font-black text-neutral-500 shrink-0">
                    {count > 0 ? count : ""}
                  </span>
                </div>
                <span className="text-sm font-bold truncate w-full text-white">
                  {count > 0 ? formatCurrency(value) : "---"}
                </span>
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}
