import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Layers, LayoutDashboard, ArrowLeft, ChevronRight, ChevronLeft,
  ChevronDown, Ticket, ArrowDown, Map, BarChart3, Bot,
  Globe, Database, Eye, Settings, Bell,
  Shield, RefreshCw, CheckCircle2, XCircle, ArrowRight,
  FileText, Zap, Workflow, Loader2,
} from "lucide-react";
import { engines, userGroups, componentGroups } from "@/data/engineData";
import type { EngineData } from "@/data/engineData";
import logo from "@/assets/logo.jpg";
import BrandDashboard from "@/components/BrandDashboard";
import SiteSettings from "@/components/SiteSettings";
import NotificationCenter from "@/components/NotificationCenter";
import ActivityFeed from "@/components/ActivityFeed";
import NewWebsiteReadinessView from "@/components/NewWebsiteReadinessView";
import NewSiteOnboarding from "@/components/NewSiteOnboarding";
import MeasurementPlanManager from "@/components/MeasurementPlanManager";
import GlobalGuidelinesView from "@/components/GlobalGuidelinesView";
import WorkflowVisualization from "@/components/WorkflowVisualization";

type MainView = "architecture" | "dashboard" | "settings" | "notifications";
type SettingsTab = "monitoring" | "measurement-plan" | "guidelines";

/* ─── Count-up hook ─── */
const useCountUp = (target: number, duration = 1200, delay = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
};

/* ─── Thinking state messages per engine ─── */
const thinkingMessages: Record<string, string[]> = {
  "data-validation": ["Scanning dataLayer payloads…", "Validating event parameters…", "Checking format compliance…"],
  "consent-compliance": ["Detecting consent platform…", "Verifying tag firing rules…", "Checking GDPR compliance…"],
  "measurement-governance": ["Loading measurement plan…", "Comparing event schemas…", "Scoring compliance…"],
  "root-cause": ["Analyzing GTM changes…", "Correlating deployments…", "Determining root cause…"],
  "analytics-insights": ["Aggregating analytics data…", "Analyzing trends…", "Generating AI insights…"],
  "automation-copilot": ["Reading root cause report…", "Generating fix suggestion…", "Preparing GTM config…"],
  "auto-remediation": ["Receiving approved fix…", "Deploying via GTM API…", "Validating implementation…"],
  "launch-readiness": ["Scanning website…", "Comparing against plan…", "Calculating readiness score…"],
};

const ThinkingState = ({ engineId }: { engineId: string }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = thinkingMessages[engineId] || ["Processing…"];
  useEffect(() => {
    const interval = setInterval(() => setMsgIndex((i) => (i + 1) % messages.length), 2000);
    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3 justify-center mb-6"
    >
      <div className="shimmer-bg rounded-full px-5 py-2.5 border border-primary/15 flex items-center gap-2.5">
        <Loader2 className="w-4 h-4 text-primary animate-spin" />
        <AnimatePresence mode="wait">
          <motion.span
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-medium text-primary"
          >
            {messages[msgIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [mainView, setMainView] = useState<MainView>("architecture");
  const [zoomedEngine, setZoomedEngine] = useState<EngineData | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [dashboardView, setDashboardView] = useState("Brand Team");
  const [showReadinessAgent, setShowReadinessAgent] = useState(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("monitoring");
  const [isThinking, setIsThinking] = useState(false);

  const handleZoomIn = useCallback((engine: EngineData) => {
    if (engine.id === "launch-readiness") {
      setShowReadinessAgent(true);
      return;
    }
    setActiveStep(0);
    setIsThinking(true);
    setZoomedEngine(engine);
    setTimeout(() => setIsThinking(false), 2800);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomedEngine(null);
    setIsThinking(false);
  }, []);

  const navItems: { key: MainView; label: string; icon: any }[] = [
    { key: "architecture", label: "Architecture", icon: Map },
    { key: "dashboard", label: "Dashboard", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: Settings },
    { key: "notifications", label: "Notifications", icon: Bell },
  ];

  if (showReadinessAgent) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,hsl(181_69%_35%/0.04),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `radial-gradient(circle, hsl(220 13% 55%) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        </div>
        <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Sirah Digital" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-heading text-sm font-bold hidden sm:block">Sirah Digital</span>
            </div>
          </div>
        </div>
        <NewWebsiteReadinessView onBack={() => setShowReadinessAgent(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Dot grid bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,hsl(181_69%_35%/0.04),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `radial-gradient(circle, hsl(220 13% 55%) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      {/* ═══ Global nav ═══ */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Sirah Digital" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-heading text-sm font-bold hidden sm:block">Sirah Digital</span>
          </div>

          {!zoomedEngine && (
            <div className="flex gap-1 bg-muted rounded-lg p-0.5">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setMainView(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    mainView === key ? "bg-card text-primary shadow-sm" : "text-sub hover:text-heading"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          )}

          {zoomedEngine && (
            <div className="flex items-center gap-3">
              <button onClick={handleZoomOut} className="flex items-center gap-1.5 text-xs font-medium text-sub hover:text-primary transition-colors duration-200">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Architecture
              </button>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                {(() => { const I = zoomedEngine.icon; return <I className="w-3.5 h-3.5 text-primary" />; })()}
                <span className="text-heading text-xs font-bold">{zoomedEngine.shortTitle}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ════════ DASHBOARD ════════ */}
        {mainView === "dashboard" && !zoomedEngine && (
          <motion.div key="dashboard" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
            <BrandDashboard activeView={dashboardView} setActiveView={setDashboardView} />
          </motion.div>
        )}

        {/* ════════ SETTINGS ════════ */}
        {mainView === "settings" && !zoomedEngine && (
          <motion.div key="settings" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
            <div className="max-w-5xl mx-auto px-6 pt-6">
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {([
                  { key: "monitoring" as SettingsTab, label: "Site Monitoring", icon: Settings },
                  { key: "measurement-plan" as SettingsTab, label: "Measurement Plan", icon: FileText },
                  { key: "guidelines" as SettingsTab, label: "Global Guidelines", icon: Globe },
                ]).map(({ key, label, icon: Icon }) => (
                  <button key={key} onClick={() => setSettingsTab(key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${settingsTab === key ? "bg-primary/10 text-primary border border-primary/20" : "bg-card border border-border text-sub hover:text-heading"}`}>
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>
            {settingsTab === "monitoring" && <SiteSettings />}
            {settingsTab === "measurement-plan" && (
              <div className="max-w-5xl mx-auto px-6 pb-8">
                <MeasurementPlanManager />
              </div>
            )}
            {settingsTab === "guidelines" && (
              <div className="max-w-5xl mx-auto px-6 pb-8">
                <GlobalGuidelinesView />
              </div>
            )}
          </motion.div>
        )}

        {/* ════════ NOTIFICATIONS ════════ */}
        {mainView === "notifications" && !zoomedEngine && (
          <motion.div key="notifications" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
            <NotificationCenter />
          </motion.div>
        )}

        {/* ════════ ARCHITECTURE CANVAS ════════ */}
        {mainView === "architecture" && !zoomedEngine && (
          <motion.div key="canvas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
            {/* Hero */}
            <div className="max-w-6xl mx-auto px-6 pt-10 pb-5">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-3 tracking-wide uppercase"
                >
                  <Bot className="w-3.5 h-3.5" /> Enterprise Architecture
                </motion.div>
                <h1 className="text-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-2">Sirah Analytics Intelligence Platform</h1>
                <p className="text-sub text-base md:text-lg max-w-2xl mx-auto">AI-driven Governance for Enterprise Web Analytics</p>
                <p className="text-muted-foreground text-sm mt-2 flex items-center justify-center gap-1">
                  Click any component to explore its workflow <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    onClick={() => navigate("/demo-flow")}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors duration-200"
                  >
                    <Bot className="w-4 h-4" /> Workflow Demo
                  </button>
                  <button
                    onClick={() => navigate("/agents-flow")}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-secondary/10 border border-secondary/20 text-sm font-semibold text-secondary hover:bg-secondary/15 transition-colors duration-200"
                  >
                    <Layers className="w-4 h-4" /> Agent Explorer
                  </button>
                </motion.div>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto px-6">
              {/* Stats with count-up */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <StatCard label="Issues Detected" target={12} color="text-heading" delay={200} />
                <StatCard label="Auto Fixes Applied" target={4} color="text-emerald-600" delay={400} />
                <StatCard label="Tickets Created" target={6} color="text-secondary" delay={600} />
                <StatCard label="Pending Review" target={2} color="text-amber-600" delay={800} />
              </motion.div>

              {/* Data Sources */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-float rounded-2xl p-5 mb-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/8 border border-secondary/15 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-heading text-base font-bold">Websites (500+)</h2>
                    <p className="text-[11px] text-sub">Enterprise web ecosystem data sources</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["GA4", "GTM", "dataLayer", "Consent Platforms", "BigQuery"].map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 200 }}
                      className="px-2.5 py-1 rounded-lg bg-muted border border-border text-[11px] text-sub font-medium flex items-center gap-1.5"
                    >
                      <Database className="w-3 h-3 text-secondary/60" />{s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <DataFlowConnector height={32} />

              {/* ── Grouped Component Sections ── */}
              {componentGroups.map((group, gi) => {
                const GroupIcon = group.icon;
                const groupEngines = group.engineIds.map((id) => engines.find((e) => e.id === id)!).filter(Boolean);
                return (
                  <motion.div key={group.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + gi * 0.1 }}>
                    {/* Group label */}
                    <div className="text-center mb-3 mt-2">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + gi * 0.1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-mono text-primary/70 tracking-widest uppercase"
                      >
                        <GroupIcon className="w-3 h-3" /> {group.title}
                      </motion.span>
                      <p className="text-[10px] text-sub mt-1">{group.description}</p>
                    </div>

                    {/* Component cards in group */}
                    <div className={`grid grid-cols-1 gap-3 mb-2 ${
                      groupEngines.length === 3 ? "md:grid-cols-3" :
                      groupEngines.length === 2 ? "md:grid-cols-2" :
                      "md:grid-cols-1 max-w-md mx-auto"
                    }`}>
                      {groupEngines.map((engine, i) => (
                        <AgentCard key={engine.id} engine={engine} index={gi * 3 + i} onClick={() => handleZoomIn(engine)} />
                      ))}
                    </div>

                    {gi < componentGroups.length - 1 && <DataFlowConnector height={28} />}
                  </motion.div>
                );
              })}

              {/* New Site Onboarding */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-4">
                <NewSiteOnboarding />
              </motion.div>

              <DataFlowConnector height={28} />

              {/* Real-time Activity Feed */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <ActivityFeed />
              </motion.div>

              <DataFlowConnector height={28} />

              {/* ── Animated Workflow Visualization ── */}
              <WorkflowVisualization />

              <DataFlowConnector height={24} />

              {/* ServiceNow with decision branch */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="card-float rounded-2xl p-5 mb-1 border-l-4 border-l-secondary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/8 border border-secondary/15 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-heading text-base font-bold">ServiceNow Integration & Auto-Remediation</h2>
                    <p className="text-[11px] text-sub">Decision flow: auto-fix or escalate to ServiceNow</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                    {["Issue Detected", "Root Cause Analyzer"].map((label) => (
                      <span key={label} className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-muted border border-border text-sub font-medium">{label}</span>
                        <ArrowDown className="w-2.5 h-2.5 text-muted-foreground -rotate-90" />
                      </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-lg bg-primary/8 border border-primary/20 text-primary font-bold text-[10px]">
                      <Shield className="w-3 h-3 inline mr-1" />Auto-Remediation Enabled?
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-xl bg-emerald-50/50 border border-emerald-200 p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">Yes — Auto-Remediation</span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap text-[9px]">
                        {["Automation Copilot", "Auto-Remediation", "Validate & Notify"].map((s, i, arr) => (
                          <span key={s} className="flex items-center gap-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-200 text-emerald-700 font-medium">{s}</span>
                            {i < arr.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-emerald-400" />}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-xl bg-amber-50/50 border border-amber-200 p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <XCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-xs font-bold text-amber-700">No — Escalate</span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap text-[9px]">
                        {["ServiceNow Ticket", "Engineering Fix", "Resolved"].map((s, i, arr) => (
                          <span key={s} className="flex items-center gap-1">
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-700 font-medium">{s}</span>
                            {i < arr.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-amber-400" />}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-muted/60 border border-border font-mono text-[11px] text-sub space-y-0.5">
                  <div><span className="text-heading font-semibold">INC349029</span> — Event drop detected</div>
                  <div>Site: OralB UK · Status: <span className="text-primary font-semibold">Open</span> · Assigned: Engineering Team</div>
                </div>
              </motion.div>

              <DataFlowConnector height={24} />

              {/* Dashboard block */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="card-float rounded-2xl p-6 mb-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-heading text-lg font-bold">Brand Intelligence Dashboard</h2>
                    <p className="text-[11px] text-sub">Unified command center for analytics intelligence</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["Business Insights", "Tracking Health", "Compliance Status", "Issues & Fixes", "Overall Health"].map((w, i) => (
                    <motion.span
                      key={w}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75 + i * 0.05 }}
                      className="px-2.5 py-1 rounded-lg bg-muted border border-border text-[11px] text-sub font-medium"
                    >
                      {w}
                    </motion.span>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
                  {[
                    { view: "Brand", desc: "Business insights" },
                    { view: "Analytics", desc: "Tracking health" },
                    { view: "Engineering", desc: "Issues + fixes" },
                    { view: "Leadership", desc: "Overall health" },
                  ].map((v, i) => (
                    <motion.div
                      key={v.view}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.06 }}
                      className="px-2.5 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center hover:bg-primary/10 transition-colors duration-200"
                    >
                      <div className="text-heading font-bold">{v.view}</div>
                      <div className="text-sub">{v.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <DataFlowConnector height={24} />

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/5 border border-secondary/10 text-xs font-mono text-secondary/70 tracking-widest">STAKEHOLDERS</span>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-8">
                {userGroups.map((group, i) => {
                  const Icon = group.icon;
                  return (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 + 0.9 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="card-elevated hover:card-elevated-hover rounded-2xl p-3.5 transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-secondary/8 border border-secondary/15 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        <h4 className="text-heading text-xs font-bold">{group.title}</h4>
                      </div>
                      <div className="space-y-1">
                        {group.widgets.map((widget) => (
                          <div key={widget} className="flex items-center gap-1.5 text-[11px] text-sub">
                            <div className="w-1 h-1 rounded-full bg-primary/50" />{widget}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Powered by footer */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center pb-10">
                <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                  Powered by Sirah Digital
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ════════ ZOOMED COMPONENT FLOW ════════ */}
        {zoomedEngine && (
          <motion.div key={zoomedEngine.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 pt-4">
            <div className="max-w-6xl mx-auto px-6 py-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 mb-3 glow-accent-strong"
                >
                  {(() => { const I = zoomedEngine.icon; return <I className="w-7 h-7 text-primary" />; })()}
                </motion.div>
                <h2 className="text-heading text-2xl md:text-3xl font-extrabold mb-1.5">{zoomedEngine.title}</h2>
                <p className="text-sub max-w-lg mx-auto text-sm mb-3">{zoomedEngine.purpose}</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1.5 ${
                    zoomedEngine.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    zoomedEngine.status === "Running" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        zoomedEngine.status === "Active" ? "bg-emerald-400" :
                        zoomedEngine.status === "Running" ? "bg-blue-400" : "bg-amber-400"
                      }`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                        zoomedEngine.status === "Active" ? "bg-emerald-500" :
                        zoomedEngine.status === "Running" ? "bg-blue-500" : "bg-amber-500"
                      }`} />
                    </span>
                    {zoomedEngine.status}
                  </span>
                </motion.div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mr-1">Observes:</span>
                  {zoomedEngine.observes.map((o, i) => (
                    <motion.span
                      key={o}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/15 text-[10px] font-medium text-primary/80 flex items-center gap-1"
                    >
                      <Eye className="w-2.5 h-2.5" />{o}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Thinking state */}
              <AnimatePresence>
                {isThinking && <ThinkingState engineId={zoomedEngine.id} />}
              </AnimatePresence>

              {/* Pipeline */}
              <div className="flex items-start justify-center gap-0 mb-10 overflow-x-auto pb-3 px-2">
                {zoomedEngine.steps.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <div key={i} className="flex items-start">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.09 + 0.2, type: "spring", stiffness: 120 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setActiveStep(i)}
                        className="relative flex flex-col items-center gap-2.5 px-1.5 py-2 cursor-pointer w-[90px]"
                      >
                        <motion.div
                          animate={isActive ? { scale: 1.12, y: -3 } : { scale: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className={`w-[44px] h-[44px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive ? "bg-primary/10 border-2 border-primary/40 shadow-lg shadow-primary/10"
                              : isPast ? "bg-primary/5 border border-primary/20"
                              : "bg-card border border-border shadow-sm"
                          }`}
                          style={isActive ? { animation: "step-highlight 1.5s ease-in-out infinite" } : {}}
                        >
                          <Icon className={`w-4.5 h-4.5 transition-colors duration-200 ${isActive ? "text-primary" : isPast ? "text-primary/60" : "text-muted-foreground"}`} />
                        </motion.div>
                        <span className={`text-[9px] font-semibold text-center leading-tight transition-colors duration-200 ${isActive ? "text-primary" : "text-sub"}`}>{s.title}</span>
                        {isActive && <motion.div layoutId="step-ind" className="absolute -bottom-0.5 w-8 h-0.5 bg-primary rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                      </motion.button>
                      {i < zoomedEngine.steps.length - 1 && (
                        <div className="flex items-center mt-5 mx-0 relative">
                          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.1 + 0.35 }} className={`w-4 h-[2px] rounded-full origin-left transition-colors duration-300 ${isPast ? "bg-primary/30" : "bg-border"}`} />
                          {isPast && (
                            <motion.div
                              className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
                              animate={{ x: [0, 16, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                              style={{ left: 0, top: -1 }}
                            />
                          )}
                          <ChevronRight className={`w-3 h-3 -ml-1 transition-colors duration-200 ${isPast ? "text-primary/40" : "text-border"}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Detail card */}
              <AnimatePresence mode="wait">
                <motion.div key={activeStep} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.96 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto">
                  {(() => {
                    const step = zoomedEngine.steps[activeStep];
                    const SI = step.icon;
                    return (
                      <div className="card-float rounded-3xl p-9 text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.05, type: "spring", stiffness: 200 }}
                          className="w-[68px] h-[68px] rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-5 glow-accent-strong"
                        >
                          <SI className="w-8 h-8 text-primary" />
                        </motion.div>
                        <div className="font-mono text-[10px] text-primary/50 mb-1.5 tracking-widest">STEP {activeStep + 1} OF {zoomedEngine.steps.length}</div>
                        <h3 className="text-heading text-xl font-extrabold mb-2.5">{step.title}</h3>
                        <p className="text-sub leading-relaxed text-sm mb-3">{step.description}</p>
                        {step.detail && (
                          <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                            {step.detail.map((d, di) => (
                              <motion.span
                                key={d}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + di * 0.08 }}
                                className="px-2.5 py-1 rounded-lg bg-muted border border-border text-[11px] font-mono text-sub"
                              >
                                {d}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl card-elevated text-sm font-medium text-sub hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveStep(Math.min(zoomedEngine.steps.length - 1, activeStep + 1))}
                  disabled={activeStep === zoomedEngine.steps.length - 1}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary/8 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/12 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Stat Card with count-up ─── */
const StatCard = ({ label, target, color, delay }: { label: string; target: number; color: string; delay: number }) => {
  const count = useCountUp(target, 1000, delay);
  return (
    <div className="card-elevated rounded-xl p-4 text-center">
      <div className={`text-xl font-extrabold ${color}`}>{count}</div>
      <div className="text-[10px] text-sub mt-0.5">{label}</div>
    </div>
  );
};

/* ─── Agent Card with enhanced hover + status pulse ─── */
const AgentCard = ({ engine, index, onClick }: { engine: EngineData; index: number; onClick: () => void }) => {
  const Icon = engine.icon;
  const statusColors: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Running: "bg-blue-50 text-blue-700 border-blue-200",
    Monitoring: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const dotColors: Record<string, string> = {
    Active: "bg-emerald-500",
    Running: "bg-blue-500",
    Monitoring: "bg-amber-500",
  };
  return (
    <motion.button
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06 + 0.25, duration: 0.45, type: "spring", stiffness: 110 }}
      whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group card-elevated hover:card-elevated-hover rounded-2xl p-4 text-left transition-shadow duration-300 cursor-pointer w-full"
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/12 group-hover:border-primary/30 transition-all duration-200">
            <Icon className="w-4.5 h-4.5 text-primary" />
          </div>
          <h3 className="text-heading text-[13px] font-bold group-hover:text-primary transition-colors duration-200 flex-1 leading-tight">{engine.shortTitle}</h3>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
        </div>
        <p className="text-[10px] text-sub leading-relaxed line-clamp-2">{engine.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {engine.observes.slice(0, 2).map((o) => (
              <span key={o} className="px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10 text-[8px] font-medium text-primary/70">{o}</span>
            ))}
          </div>
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border flex items-center gap-1 ${statusColors[engine.status]}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[engine.status]}`} />
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[engine.status]}`} />
            </span>
            {engine.status}
          </span>
        </div>
      </div>
    </motion.button>
  );
};

/* ─── Data Flow Connector with animated traveling dots ─── */
const DataFlowConnector = ({ height = 28 }: { height?: number }) => (
  <div className="flex justify-center py-1.5">
    <div className="relative flex gap-16">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative" style={{ width: 2, height }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/20 via-primary/10 to-primary/20" />
          <motion.div
            className="absolute w-2 h-2 -left-[3px] rounded-full bg-primary/50"
            style={{ filter: "blur(0.5px)" }}
            animate={{
              y: [0, height],
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1, 1, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-1 h-3 left-0 rounded-full bg-primary/30"
            style={{ filter: "blur(2px)" }}
            animate={{
              y: [-4, height - 4],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.6 + 0.1,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Index;
