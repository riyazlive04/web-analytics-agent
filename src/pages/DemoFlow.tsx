import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck, AlertCircle, Microscope, Wrench, RefreshCw,
  MonitorCheck, Sparkles, CheckCircle2, AlertTriangle, Search,
  FileCode, Loader2, TrendingUp, RotateCcw, Play, Pause,
  ArrowLeft, Bot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

/* ═══════════════════════════════════════════════════════
   Step config
   ═══════════════════════════════════════════════════════ */
const STEP_DURATION = 6000; // ms per step

interface DemoStep {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  accentHsl: string;
}

const steps: DemoStep[] = [
  { title: "Data Validation", subtitle: "Scanning analytics payloads across all monitored websites", icon: ClipboardCheck, color: "primary", accentHsl: "181 69% 35%" },
  { title: "Issue Detection", subtitle: "Anomaly detected in purchase event stream", icon: AlertCircle, color: "amber", accentHsl: "38 92% 50%" },
  { title: "Root Cause Analysis", subtitle: "Investigating GTM changes and deployment history", icon: Microscope, color: "primary", accentHsl: "181 69% 35%" },
  { title: "Automation Copilot", subtitle: "AI generating recommended fix configuration", icon: Wrench, color: "secondary", accentHsl: "231 80% 62%" },
  { title: "Auto-Remediation", subtitle: "Deploying fix to GTM workspace via API", icon: RefreshCw, color: "emerald", accentHsl: "152 69% 42%" },
  { title: "Validation", subtitle: "Confirming fix is working across all pages", icon: MonitorCheck, color: "primary", accentHsl: "181 69% 35%" },
  { title: "Insights", subtitle: "Measuring business impact of the resolution", icon: Sparkles, color: "secondary", accentHsl: "231 80% 62%" },
];

/* ═══════════════════════════════════════════════════════
   Cinematic scene visualizations
   ═══════════════════════════════════════════════════════ */

const DataValidationScene = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const rows = [
    { event: "page_view", params: "page_title, page_location", status: "valid" },
    { event: "purchase", params: "transaction_id, value", status: "error" },
    { event: "add_to_cart", params: "item_id, item_name, price", status: "valid" },
    { event: "view_item", params: "item_id, item_name", status: "valid" },
    { event: "begin_checkout", params: "value, currency", status: "error" },
    { event: "sign_up", params: "method", status: "valid" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      {/* Flowing data lines background */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] rounded-full"
          style={{
            top: `${10 + i * 12}%`,
            background: `linear-gradient(90deg, transparent, hsl(181 69% 35% / ${0.06 + i * 0.02}), transparent)`,
            width: "70%",
          }}
          animate={{ x: ["-70%", "170%"] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
        />
      ))}

      {/* Data table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-white/90 backdrop-blur rounded-2xl border border-primary/15 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-heading">Event Payload Validation</span>
            {phase >= 1 && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                2 Issues Found
              </motion.span>
            )}
          </div>
          {/* Rows */}
          <div className="divide-y divide-border/50">
            {rows.map((row, i) => {
              const isError = row.status === "error";
              const revealed = phase >= 1;
              const fixed = phase >= 2 && isError;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.3 }}
                  className={`px-5 py-2.5 flex items-center gap-3 transition-colors duration-500 ${
                    fixed ? "bg-emerald-50/50" : revealed && isError ? "bg-red-50/50" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-heading w-28 flex-shrink-0">{row.event}</span>
                  <span className="text-[10px] text-sub flex-1 truncate">{row.params}</span>
                  <AnimatePresence mode="wait">
                    {!revealed ? (
                      <motion.div key="scanning" className="w-4 h-4 flex-shrink-0">
                        <Loader2 className="w-4 h-4 text-primary/40 animate-spin" />
                      </motion.div>
                    ) : fixed ? (
                      <motion.div key="fixed" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      </motion.div>
                    ) : isError ? (
                      <motion.div key="error" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.3 }}>
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      </motion.div>
                    ) : (
                      <motion.div key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const IssueDetectionScene = () => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowAlert(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Chart points: normal then drop
  const points = Array.from({ length: 30 }, (_, i) => {
    const x = (i / 29) * 100;
    let y;
    if (i < 18) y = 25 + Math.sin(i * 0.6) * 10 + Math.random() * 5;
    else if (i < 22) y = 25 + (i - 18) * 15;
    else y = 80 - (i - 22) * 2 + Math.random() * 3;
    return { x, y: Math.min(95, Math.max(5, y)) };
  });
  const path = `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;
  const areaPath = `${path} L 100,100 L 0,100 Z`;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
        {/* Chart */}
        <div className="relative bg-white/90 backdrop-blur rounded-2xl border border-amber-200/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-bold text-heading">Purchase Event Volume</div>
              <div className="text-[11px] text-sub">Last 24 hours</div>
            </div>
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 shadow-lg"
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <div>
                    <div className="text-[11px] font-bold text-red-700">Event Drop Detected</div>
                    <div className="text-[10px] text-red-500">purchase events: -35%</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <svg className="w-full h-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="demo-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(181 69% 35%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(181 69% 35%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={areaPath} fill="url(#demo-chart-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
            <motion.path d={path} fill="none" stroke="hsl(181 69% 35%)" strokeWidth="1.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeOut" }} />
            {/* Red zone highlight */}
            <motion.rect x="58" y="0" width="42" height="100" fill="hsl(0 84% 60% / 0.06)" initial={{ opacity: 0 }} animate={{ opacity: showAlert ? 1 : 0 }} transition={{ duration: 0.5 }} />
            <motion.line x1="58" y1="0" x2="58" y2="100" stroke="hsl(0 84% 60%)" strokeWidth="0.5" strokeDasharray="3 3" initial={{ opacity: 0 }} animate={{ opacity: showAlert ? 0.6 : 0 }} />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

const RootCauseScene = () => {
  const [scanLine, setScanLine] = useState(-1);
  const [found, setFound] = useState(false);
  const logs = [
    { text: "2024-03-21 14:32 — GTM container v128 published", highlight: false },
    { text: "2024-03-21 14:30 — 3 tags modified in workspace", highlight: false },
    { text: "2024-03-21 14:28 — checkout.html template updated", highlight: true },
    { text: "2024-03-21 14:25 — purchase trigger: CSS selector changed", highlight: true },
    { text: "2024-03-21 14:20 — Frontend deploy v2.4.1 released", highlight: false },
    { text: "2024-03-21 14:15 — GA4 config tag: no changes", highlight: false },
    { text: "2024-03-21 14:10 — Consent mode configuration: no changes", highlight: false },
  ];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setScanLine(i);
      if (logs[i]?.highlight) setFound(true);
      i++;
      if (i >= logs.length) clearInterval(t);
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-xl">
        <div className="bg-white/90 backdrop-blur rounded-2xl border border-primary/15 shadow-xl overflow-hidden">
          <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
            <Microscope className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-heading">Root Cause Analysis</span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-primary font-medium">
              <Loader2 className={`w-3 h-3 ${scanLine < logs.length - 1 ? "animate-spin" : "hidden"}`} />
              {scanLine < logs.length - 1 ? "Scanning…" : "Complete"}
            </span>
          </div>
          <div className="p-4 space-y-1 font-mono text-[11px]">
            {logs.map((log, i) => {
              const isScanning = i === scanLine;
              const isFound = i <= scanLine && log.highlight;
              const isReached = i <= scanLine;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: isReached ? 1 : 0.3,
                    backgroundColor: isScanning ? "hsl(181 69% 35% / 0.06)" : isFound ? "hsl(0 84% 60% / 0.05)" : "transparent",
                  }}
                  transition={{ duration: 0.25 }}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 ${isFound ? "border border-red-200/60" : "border border-transparent"}`}
                >
                  <Search className={`w-3.5 h-3.5 flex-shrink-0 ${isScanning ? "text-primary" : isFound ? "text-red-500" : "text-muted-foreground/30"}`} />
                  <span className={isFound ? "text-red-600 font-semibold" : isReached ? "text-heading" : "text-muted-foreground/50"}>
                    {log.text}
                  </span>
                  {isFound && (
                    <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }} className="ml-auto text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 whitespace-nowrap">
                      ROOT CAUSE
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
          {found && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mx-4 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/15">
              <div className="text-[11px] font-bold text-primary mb-1">Root cause identified with 94% confidence</div>
              <div className="text-[10px] text-sub">The checkout template update changed the CSS selector used by the purchase event trigger, causing it to stop firing.</div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CopilotScene = () => {
  const lines = [
    { text: "// Suggested Fix — Purchase Event Trigger", color: "text-slate-500" },
    { text: "", color: "" },
    { text: "Tag: GA4 Event — purchase", color: "text-sky-300" },
    { text: 'Trigger: "checkout_complete"', color: "text-[#a6e3a1]" },
    { text: "", color: "" },
    { text: "Parameters:", color: "text-sky-300" },
    { text: '  transaction_id: "{{DLV - txn_id}}"', color: "text-[#a6e3a1]" },
    { text: '  value: "{{DLV - order_total}}"', color: "text-[#a6e3a1]" },
    { text: '  currency: "{{DLV - currency}}"', color: "text-[#a6e3a1]" },
    { text: "", color: "" },
    { text: "CSS Selector (updated):", color: "text-sky-300" },
    { text: '  button[data-action="complete-purchase"]', color: "text-amber-300" },
  ];
  const totalChars = lines.reduce((s, l) => s + l.text.length, 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setChars((p) => (p >= totalChars ? p : p + 1));
    }, 28);
    return () => clearInterval(t);
  }, [totalChars]);

  let remaining = chars;
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
        <div className="bg-[#1e1e2e] rounded-2xl border border-secondary/20 shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="px-4 py-2.5 bg-[#181825] border-b border-white/5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono ml-2">automation-copilot.config</span>
            {chars < totalChars && (
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="ml-auto text-[9px] text-secondary/60 flex items-center gap-1">
                <FileCode className="w-3 h-3" /> AI generating…
              </motion.span>
            )}
          </div>
          {/* Code */}
          <div className="p-5 font-mono text-[12px] leading-[1.8] min-h-[240px]">
            {lines.map((line, li) => {
              if (remaining <= 0 && line.text.length > 0) return <div key={li} className="h-[22px]" />;
              const show = Math.min(remaining, line.text.length);
              remaining -= line.text.length;
              if (line.text.length === 0) return <div key={li} className="h-[22px]" />;
              return (
                <div key={li} className="flex">
                  <span className="text-slate-600 w-6 text-right mr-4 select-none text-[10px]">{li + 1}</span>
                  <span className={line.color}>
                    {line.text.substring(0, show)}
                    {show < line.text.length && show > 0 && (
                      <motion.span className="inline-block w-[7px] h-[15px] bg-secondary/70 ml-px align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RemediationScene = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"deploy" | "success">("deploy");
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setPhase("success"); return 100; }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  const deploySteps = [
    { label: "Creating tag in GTM workspace", threshold: 20 },
    { label: "Configuring trigger with updated selector", threshold: 40 },
    { label: "Setting event parameters", threshold: 65 },
    { label: "Publishing GTM workspace", threshold: 85 },
    { label: "Deployment complete", threshold: 100 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {phase === "deploy" ? (
            <motion.div key="deploy" exit={{ opacity: 0, scale: 0.95 }} className="bg-white/90 backdrop-blur rounded-2xl border border-emerald-200/50 shadow-xl p-8 space-y-6">
              <div className="text-center">
                <div className="text-base font-bold text-heading mb-1">Deploying Fix</div>
                <div className="text-xs text-sub">Auto-Remediation Engine via GTM API</div>
              </div>
              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[11px] text-emerald-700 font-semibold mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-emerald-100 border border-emerald-200 overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
              {/* Steps */}
              <div className="space-y-2">
                {deploySteps.map((s, i) => {
                  const done = progress >= s.threshold;
                  const active = !done && (i === 0 || progress >= deploySteps[i - 1].threshold);
                  return (
                    <motion.div key={i} className="flex items-center gap-3" animate={{ opacity: done || active ? 1 : 0.4 }}>
                      {done ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                      ) : active ? (
                        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-emerald-200" />
                      )}
                      <span className={`text-xs ${done ? "text-emerald-700 font-medium" : active ? "text-emerald-600" : "text-muted-foreground"}`}>{s.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur rounded-2xl border border-emerald-200 shadow-xl p-10 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.6, times: [0, 0.5, 1] }}>
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              </motion.div>
              <div className="text-lg font-bold text-emerald-700 mb-1">Fix Deployed Successfully</div>
              <div className="text-sm text-emerald-600">GTM workspace published · purchase trigger updated</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ValidationScene = () => {
  const checks = [
    "Purchase event firing on checkout page",
    "All required parameters present",
    "Data received in GA4 real-time",
    "Transaction ID format validated",
    "No duplicate events detected",
  ];
  const [revealed, setRevealed] = useState<boolean[]>(checks.map(() => false));
  useEffect(() => {
    checks.forEach((_, i) => {
      setTimeout(() => setRevealed((p) => { const n = [...p]; n[i] = true; return n; }), 800 + i * 700);
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl border border-primary/15 shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="text-base font-bold text-heading mb-1">Post-Deployment Validation</div>
            <div className="text-xs text-sub">Verifying fix across all affected pages</div>
          </div>
          <div className="space-y-3">
            {checks.map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg border border-primary/20 flex items-center justify-center bg-white flex-shrink-0">
                  <AnimatePresence>
                    {revealed[i] && (
                      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.span animate={{ opacity: revealed[i] ? 1 : 0.3 }} transition={{ duration: 0.3 }} className={`text-sm ${revealed[i] ? "text-heading font-medium" : "text-muted-foreground"}`}>
                  {label}
                </motion.span>
                {revealed[i] && (
                  <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, type: "spring" }} className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    PASS
                  </motion.span>
                )}
              </div>
            ))}
          </div>
          {revealed.every(Boolean) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-700">All checks passed — fix verified</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const InsightsScene = () => {
  const bars = [25, 30, 28, 22, 35, 42, 55, 68, 72, 80, 85, 88];
  const insight = "Conversion rate improved by 42% within 2 hours of fix deployment. Estimated revenue recovery: +$125K over 30 days.";
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      const t = setInterval(() => setChars((p) => (p >= insight.length ? p : p + 1)), 25);
      return () => clearInterval(t);
    }, 1800);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur rounded-2xl border border-secondary/15 shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-bold text-heading">Business Impact Analysis</span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-2 h-32 mb-1 px-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t min-w-0"
                style={{ background: i < 5 ? "hsl(0 84% 60% / 0.3)" : `hsl(231 80% 62% / ${0.3 + (i - 5) * 0.08})` }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground px-2 mb-4">
            <span>Before fix</span>
            <span className="text-[9px] text-red-400">↑ Fix deployed</span>
            <span>After fix</span>
          </div>
          {/* Typed insight */}
          <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 min-h-[52px]">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-heading leading-relaxed font-medium">
                {insight.substring(0, chars)}
                {chars > 0 && chars < insight.length && (
                  <motion.span className="inline-block w-[6px] h-[13px] bg-secondary/60 ml-px align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const sceneComponents: React.FC[] = [
  DataValidationScene,
  IssueDetectionScene,
  RootCauseScene,
  CopilotScene,
  RemediationScene,
  ValidationScene,
  InsightsScene,
];

/* ═══════════════════════════════════════════════════════
   Demo Flow Page
   ═══════════════════════════════════════════════════════ */
const DemoFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        setIsPlaying(false);
        setCompleted(true);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setTimeout(advanceStep, STEP_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentStep, isPlaying, advanceStep]);

  const handleReplay = () => {
    setCurrentStep(0);
    setCompleted(false);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((p) => !p);
  };

  const Scene = sceneComponents[currentStep];
  const step = steps[currentStep];
  const StepIcon = step.icon;

  // Progress within current step
  const [stepProgress, setStepProgress] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    setStepProgress(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      setStepProgress(Math.min(elapsed / STEP_DURATION, 1));
      if (elapsed < STEP_DURATION) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [currentStep, isPlaying]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(181_69%_35%/0.04),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `radial-gradient(circle, hsl(220 13% 55%) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-xs font-medium text-sub hover:text-primary transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <div className="w-px h-4 bg-border" />
            <img src={logo} alt="Sirah Digital" className="w-7 h-7 rounded-lg object-cover" />
            <span className="text-heading text-sm font-bold hidden sm:block">AI Workflow Simulation</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={togglePlayPause} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/8 border border-primary/15 text-xs font-medium text-primary hover:bg-primary/12 transition-colors">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
            {completed && (
              <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={handleReplay} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/8 border border-secondary/15 text-xs font-medium text-secondary hover:bg-secondary/12 transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Replay Demo
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex gap-8">
        {/* ─── Left: Step stepper ─── */}
        <div className="w-56 flex-shrink-0 hidden lg:block">
          <div className="sticky top-20 space-y-0">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isCurrent = i === currentStep;
              const isPast = i < currentStep;
              return (
                <div key={i}>
                  <motion.div
                    animate={{ scale: isCurrent ? 1.02 : 1 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      isCurrent ? "bg-primary/8 border border-primary/20 shadow-sm" :
                      isPast ? "opacity-60" : "opacity-30"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCurrent ? "bg-primary text-white" : isPast ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"
                    }`}>
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[11px] font-semibold truncate ${isCurrent ? "text-primary" : isPast ? "text-heading" : "text-muted-foreground"}`}>
                        {s.title}
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="relative flex h-2 w-2 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                    )}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-start pl-[22px] py-0.5">
                      <div className={`w-0.5 h-3 rounded-full transition-colors duration-500 ${isPast ? "bg-emerald-300" : "bg-border"}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Right: Main scene area ─── */}
        <div className="flex-1 min-w-0">
          {/* Step header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Step badge + title */}
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center"
                >
                  <StepIcon className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary/50 tracking-widest">STEP {currentStep + 1} OF {steps.length}</span>
                  </div>
                  <h2 className="text-heading text-xl font-extrabold">{step.title}</h2>
                </div>
              </div>
              <p className="text-sub text-sm mb-4 ml-[52px]">{step.subtitle}</p>

              {/* Progress bar for current step */}
              <div className="mb-6 ml-[52px]">
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary/40"
                    style={{ width: `${stepProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Scene visualization */}
              <div className="relative rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 min-h-[400px] overflow-hidden">
                {/* Subtle glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(${step.accentHsl}_/_0.04),transparent_70%)]`} />
                </div>
                <Scene key={currentStep} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Completed overlay */}
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <div className="card-float rounded-2xl p-8 inline-block">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.6 }}>
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-heading text-xl font-extrabold mb-2">Workflow Complete</h3>
                  <p className="text-sub text-sm mb-5 max-w-sm mx-auto">
                    The AI-powered analytics workflow has successfully detected, diagnosed, fixed, and validated a tracking issue — automatically.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={handleReplay} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/8 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/12 transition-colors">
                      <RotateCcw className="w-4 h-4" /> Replay Demo
                    </button>
                    <button onClick={() => navigate("/")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-medium text-sub hover:text-heading transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back to Platform
                    </button>
                  </div>
                </div>
                <div className="mt-6 text-[10px] text-muted-foreground">Powered by Sirah Digital AI Architecture</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DemoFlow;
