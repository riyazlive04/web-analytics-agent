import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Network, CheckCircle2, X, AlertTriangle, TrendingDown, TrendingUp,
  Search, FileCode, Loader2, ChevronDown,
} from "lucide-react";
import { workflowSteps } from "@/data/engineData";

/* ═══════════════════════════════════════════════════════
   Step-specific animated visualisations (GIF-like loops)
   ═══════════════════════════════════════════════════════ */

/* ─── 1. Data Validation: flowing data lines + tag pulses ─── */
const DataValidationViz = () => (
  <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/2 border border-primary/10">
    {/* Flowing data lines */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute h-[2px] rounded-full"
        style={{
          top: 20 + i * 28,
          background: `linear-gradient(90deg, transparent, hsl(181 69% 35% / ${0.15 + i * 0.08}), transparent)`,
          width: "60%",
        }}
        animate={{ x: ["-60%", "160%"] }}
        transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
      />
    ))}
    {/* Tag firing pulses */}
    {[
      { x: "20%", y: "30%", delay: 0 },
      { x: "50%", y: "55%", delay: 0.8 },
      { x: "75%", y: "35%", delay: 1.6 },
      { x: "35%", y: "75%", delay: 2.2 },
    ].map((p, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: p.x, top: p.y }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-primary/40"
          animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </motion.div>
    ))}
    {/* Floating tag labels */}
    {["page_view", "purchase", "add_to_cart"].map((tag, i) => (
      <motion.div
        key={tag}
        className="absolute px-2 py-0.5 rounded bg-white/80 border border-primary/15 text-[9px] font-mono text-primary"
        style={{ left: 15 + i * 30 + "%", bottom: 12 }}
        animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
      >
        {tag}
      </motion.div>
    ))}
  </div>
);

/* ─── 2. Issue Detection: animated graph drop + alert popup ─── */
const IssueDetectionViz = () => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const t = setInterval(() => { setShowAlert(true); setTimeout(() => setShowAlert(false), 1800); }, 3500);
    return () => clearInterval(t);
  }, []);

  // SVG chart with animated drop
  const normalY = 30;
  const dropY = 90;
  const pathPoints = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 100;
    let y;
    if (i < 10) y = normalY + Math.sin(i * 0.8) * 8;
    else if (i < 13) y = normalY + (i - 10) * 20;
    else y = dropY - (i - 13) * 3;
    return `${x},${y}`;
  });
  const path = `M ${pathPoints.join(" L ")}`;

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-br from-amber-50/80 to-amber-50/30 border border-amber-200/50">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="drop-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(181 69% 35%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(181 69% 35%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${path} L 100,120 L 0,120 Z`}
          fill="url(#drop-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="hsl(181 69% 35%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
        />
        {/* Red marker at drop point */}
        <motion.circle
          cx="55" cy={dropY - 10} r="3"
          fill="hsl(0 84% 60%)"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </svg>
      {/* Alert popup */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute top-3 right-3 bg-white rounded-lg border border-red-200 shadow-lg px-3 py-2 flex items-center gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            <div>
              <div className="text-[10px] font-bold text-red-700">Event Drop Detected</div>
              <div className="text-[9px] text-red-500">purchase: -35%</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-2 left-3 text-[9px] text-amber-600/70 font-mono">Event volume / 24h</div>
    </div>
  );
};

/* ─── 3. Root Cause: log scanning + highlight ─── */
const RootCauseViz = () => {
  const [scanLine, setScanLine] = useState(0);
  const logs = [
    { text: "GTM v128 published — 3 tags modified", highlight: false },
    { text: "checkout.html template updated", highlight: true },
    { text: "GA4 config tag unchanged", highlight: false },
    { text: "purchase trigger: selector changed", highlight: true },
    { text: "deploy: frontend v2.4.1 released", highlight: false },
    { text: "consent mode: no changes", highlight: false },
  ];
  useEffect(() => {
    const t = setInterval(() => setScanLine((p) => (p + 1) % (logs.length + 2)), 700);
    return () => clearInterval(t);
  }, [logs.length]);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-50/50 border border-primary/10">
      <div className="p-3 space-y-1.5 font-mono text-[10px]">
        {logs.map((log, i) => {
          const isScanning = i === scanLine;
          const isFound = i < scanLine && log.highlight;
          return (
            <motion.div
              key={i}
              animate={{
                backgroundColor: isScanning ? "hsl(181 69% 35% / 0.08)" : isFound ? "hsl(0 84% 60% / 0.06)" : "transparent",
              }}
              transition={{ duration: 0.2 }}
              className={`px-2 py-1 rounded flex items-center gap-2 ${isFound ? "border border-red-200/60" : ""}`}
            >
              {isScanning && (
                <motion.div
                  className="w-1 h-full absolute left-0 top-0 bg-primary/40 rounded"
                  layoutId="scan-bar"
                />
              )}
              <Search className={`w-3 h-3 flex-shrink-0 ${isScanning ? "text-primary" : isFound ? "text-red-500" : "text-muted-foreground/40"}`} />
              <span className={`${isFound ? "text-red-600 font-semibold" : isScanning ? "text-primary" : "text-sub/70"}`}>
                {log.text}
              </span>
              {isFound && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200"
                >
                  ROOT CAUSE
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
      {/* Scanning indicator */}
      <motion.div
        className="absolute bottom-2 right-3 flex items-center gap-1.5 text-[9px] text-primary font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Loader2 className="w-3 h-3 animate-spin" /> Scanning logs…
      </motion.div>
    </div>
  );
};

/* ─── 4. Copilot: typing animation for suggested fix ─── */
const CopilotViz = () => {
  const lines = [
    "// Suggested GTM Tag Configuration",
    'event: "purchase"',
    'trigger: "checkout_complete"',
    "params: {",
    '  transaction_id: "{{dlv_txn_id}}",',
    '  value: "{{dlv_order_total}}"',
    "}",
  ];
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = lines.join("\n").length;

  useEffect(() => {
    setVisibleChars(0);
    const t = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= totalChars) {
          setTimeout(() => setVisibleChars(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 35);
    return () => clearInterval(t);
  }, [totalChars]);

  let charsRemaining = visibleChars;
  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-[#1e1e2e] border border-secondary/20 p-3">
      <div className="font-mono text-[10px] leading-relaxed space-y-0.5">
        {lines.map((line, li) => {
          if (charsRemaining <= 0) return <div key={li} className="h-4" />;
          const show = Math.min(charsRemaining, line.length);
          charsRemaining -= line.length;
          const text = line.substring(0, show);
          const isComment = line.startsWith("//");
          return (
            <div key={li} className="flex">
              <span className="text-slate-500 w-5 text-right mr-3 select-none">{li + 1}</span>
              <span className={isComment ? "text-emerald-400/60" : "text-[#a6e3a1]"}>
                {text}
                {show < line.length && (
                  <motion.span
                    className="inline-block w-[6px] h-[13px] bg-secondary/70 ml-px"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
      {visibleChars > 0 && visibleChars < totalChars && (
        <motion.div
          className="absolute bottom-2 right-3 flex items-center gap-1.5 text-[9px] text-secondary/70 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FileCode className="w-3 h-3" /> AI generating fix…
        </motion.div>
      )}
    </div>
  );
};

/* ─── 5. Remediation: deployment progress + success ─── */
const RemediationViz = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"deploying" | "success">("deploying");

  useEffect(() => {
    setProgress(0);
    setPhase("deploying");
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPhase("success");
          setTimeout(() => { setProgress(0); setPhase("deploying"); }, 2500);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/80 to-emerald-50/30 border border-emerald-200/50 flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {phase === "deploying" ? (
          <motion.div key="deploy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-3">
            <div className="text-center text-xs font-semibold text-emerald-700">Deploying to GTM…</div>
            <div className="w-full h-3 rounded-full bg-emerald-100 border border-emerald-200 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-emerald-600 font-mono">
              <span>Creating tag…</span>
              <span>{progress}%</span>
            </div>
            {/* Deployment steps */}
            <div className="space-y-1">
              {[
                { label: "Create tag", done: progress > 30 },
                { label: "Configure trigger", done: progress > 55 },
                { label: "Set parameters", done: progress > 80 },
                { label: "Publish workspace", done: progress >= 100 },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px]">
                  {s.done ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-emerald-300" />
                  )}
                  <span className={s.done ? "text-emerald-700 font-medium" : "text-emerald-400"}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </motion.div>
            <div className="text-sm font-bold text-emerald-700">Fix Deployed Successfully</div>
            <div className="text-[10px] text-emerald-600">GTM workspace published</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── 6. Validation: checkmarks appearing ─── */
const ValidationViz = () => {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const labels = ["Event firing confirmed", "Parameters validated", "Data received in GA4", "Trigger conditions met", "No console errors"];

  useEffect(() => {
    const run = () => {
      setChecks([false, false, false, false, false]);
      labels.forEach((_, i) => {
        setTimeout(() => setChecks((prev) => { const n = [...prev]; n[i] = true; return n; }), 600 + i * 500);
      });
    };
    run();
    const t = setInterval(run, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/2 border border-primary/10 p-4">
      <div className="space-y-2.5">
        {labels.map((label, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md border border-primary/20 flex items-center justify-center bg-white">
              <AnimatePresence>
                {checks[i] && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.span
              animate={{ opacity: checks[i] ? 1 : 0.35, x: checks[i] ? 0 : -4 }}
              transition={{ duration: 0.2 }}
              className={`text-xs font-medium ${checks[i] ? "text-heading" : "text-muted-foreground"}`}
            >
              {label}
            </motion.span>
            {checks[i] && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="text-[8px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 ml-auto"
              >
                PASS
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── 7. Insights: graph rising + typing insight text ─── */
const InsightsViz = () => {
  const insightText = "Add-to-cart increased 42% following fix deployment. Revenue impact estimated at +$125K over 30 days.";
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    const delay = setTimeout(() => {
      const t = setInterval(() => {
        setVisibleChars((p) => {
          if (p >= insightText.length) {
            setTimeout(() => setVisibleChars(0), 3000);
            return p;
          }
          return p + 1;
        });
      }, 30);
      return () => clearInterval(t);
    }, 800);
    return () => clearTimeout(delay);
  }, []);

  // Rising bar chart
  const bars = [35, 42, 38, 55, 62, 58, 72, 80, 76, 88];

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/2 border border-secondary/10">
      {/* Bar chart */}
      <div className="flex items-end gap-1.5 px-4 pt-3 h-[85px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-secondary/60 to-secondary/30 min-w-0"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <div className="h-px bg-secondary/15 mx-4" />
      {/* Typed insight */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-start gap-1.5">
          <TrendingUp className="w-3 h-3 text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-heading leading-relaxed font-medium min-h-[28px]">
            {insightText.substring(0, visibleChars)}
            {visibleChars < insightText.length && visibleChars > 0 && (
              <motion.span
                className="inline-block w-[5px] h-[11px] bg-secondary/60 ml-px"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   Main component map
   ═══════════════════════════════════════════════════════ */
const stepVizComponents: Record<number, React.FC> = {
  0: DataValidationViz,
  1: IssueDetectionViz,
  2: RootCauseViz,
  3: CopilotViz,
  4: RemediationViz,
  5: ValidationViz,
  6: InsightsViz,
};

const stepDescriptions: string[] = [
  "Data Validation Agent, Consent Monitor, and Measurement Governance Engine continuously scan all monitored websites for data quality issues, compliance violations, and measurement plan drift.",
  "When anomalies are detected — missing events, parameter mismatches, or unexpected data drops — the system flags them instantly with severity scoring and affected scope analysis.",
  "The Root Cause Analyzer investigates GTM container changes, site deployments, and tag firing logs to pinpoint exactly what caused the issue with a confidence score.",
  "The Automation Copilot generates a specific fix recommendation including GTM tag configuration, trigger setup, and parameter mapping — ready for review and approval.",
  "Once approved, the Auto-Remediation Engine deploys the fix directly via the GTM API, creating tags, configuring triggers, and publishing the workspace automatically.",
  "A post-deployment validation scan confirms the fix is working — events are firing, parameters are correct, and data is flowing to GA4 as expected.",
  "The Analytics Insights Engine measures the business impact of the resolution, tracking metric improvements and generating stakeholder-ready insights.",
];

/* ═══════════════════════════════════════════════════════
   Workflow Visualization (exported)
   ═══════════════════════════════════════════════════════ */
const WorkflowVisualization = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Auto-cycle animation
  useEffect(() => {
    if (!inView || expandedStep !== null) return;
    let cancelled = false;
    let i = 0;
    const run = () => {
      if (cancelled) return;
      setActiveIndex(i);
      i++;
      if (i <= workflowSteps.length) {
        setTimeout(run, 600);
      } else {
        setTimeout(() => {
          if (cancelled) return;
          setActiveIndex(-1);
          setTimeout(() => { if (!cancelled) { i = 0; run(); } }, 400);
        }, 2000);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [inView, expandedStep]);

  const colorMap: Record<string, { bg: string; border: string; text: string; dot: string; activeBg: string }> = {
    primary: { bg: "bg-primary/6", border: "border-primary/15", text: "text-primary", dot: "bg-primary", activeBg: "bg-primary/12" },
    secondary: { bg: "bg-secondary/6", border: "border-secondary/15", text: "text-secondary", dot: "bg-secondary", activeBg: "bg-secondary/12" },
    amber: { bg: "bg-amber-50/60", border: "border-amber-200/60", text: "text-amber-700", dot: "bg-amber-500", activeBg: "bg-amber-50" },
    emerald: { bg: "bg-emerald-50/60", border: "border-emerald-200/60", text: "text-emerald-700", dot: "bg-emerald-500", activeBg: "bg-emerald-50" },
  };

  const handleStepClick = (i: number) => {
    setExpandedStep(expandedStep === i ? null : i);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card-float rounded-2xl p-6 mb-1 border-l-4 border-l-primary"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
          <Network className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-heading text-base font-bold">End-to-End Workflow</h2>
          <p className="text-[11px] text-sub">Click any step to explore — from detection to resolution to business insight</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-primary font-semibold">LIVE</span>
        </div>
      </div>

      <div className="space-y-0">
        {workflowSteps.map((step, i) => {
          const StepIcon = step.icon;
          const colors = colorMap[step.color] || colorMap.primary;
          const isActive = expandedStep === null ? i === activeIndex : false;
          const isPast = expandedStep === null ? i < activeIndex : false;
          const isExpanded = expandedStep === i;
          const VizComponent = stepVizComponents[i];

          return (
            <div key={step.label}>
              {/* Clickable step row */}
              <motion.button
                onClick={() => handleStepClick(i)}
                animate={{ scale: isActive ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 text-left ${
                  isExpanded ? `${colors.activeBg} ${colors.border} ${colors.text} shadow-md ring-1 ring-primary/10` :
                  isActive ? `${colors.activeBg} ${colors.border} ${colors.text} shadow-sm` :
                  isPast ? `${colors.bg} ${colors.border} ${colors.text}` :
                  expandedStep !== null && expandedStep !== i ? "bg-muted/20 border-border/30 text-muted-foreground" :
                  "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50 hover:border-border"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isExpanded || isActive ? "bg-white shadow-sm" : isPast ? "bg-white/60" : "bg-white/30"
                }`}>
                  <StepIcon className={`w-4 h-4 transition-all duration-300 ${isExpanded || isActive || isPast ? "" : "opacity-40"}`} />
                </div>
                <span className={`text-xs font-semibold transition-all duration-300 flex-1 ${isExpanded || isActive || isPast ? "" : "opacity-50"}`}>
                  {step.label}
                </span>

                {/* Step number badge */}
                <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center transition-all duration-300 ${
                  isExpanded ? "bg-primary text-white" :
                  isActive || isPast ? `${colors.dot} text-white` :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </span>

                {isActive && !isExpanded && (
                  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-75`} />
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colors.dot}`} />
                    </span>
                  </motion.div>
                )}
                {isPast && !isExpanded && (
                  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                )}

                {/* Expand chevron */}
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className={`w-4 h-4 ${isExpanded ? "text-primary" : "text-muted-foreground/50"}`} />
                </motion.div>
              </motion.button>

              {/* Expanded detail panel */}
              <AnimatePresence>
                {isExpanded && VizComponent && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-2 px-1 space-y-3">
                      {/* Animated visualization */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <VizComponent />
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="text-xs text-sub leading-relaxed px-1"
                      >
                        {stepDescriptions[i]}
                      </motion.p>

                      {/* Status indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="flex items-center gap-3 px-1"
                      >
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                          </span>
                          Active
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Step {i + 1} of {workflowSteps.length}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connector between steps */}
              {i < workflowSteps.length - 1 && (
                <div className="flex justify-center py-0.5 relative">
                  <div className={`w-0.5 h-4 rounded-full transition-colors duration-500 ${
                    isPast ? "bg-primary/30" : "bg-border/50"
                  }`} />
                  {isActive && (
                    <motion.div
                      className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
                      animate={{ y: [0, 16], opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeIn" }}
                      style={{ left: "calc(50% - 3px)" }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WorkflowVisualization;
