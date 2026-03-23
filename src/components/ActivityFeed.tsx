import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, CheckCircle2, Ticket, RefreshCw, Eye, Shield,
  Zap, Bell, Search, XCircle, Activity,
} from "lucide-react";
import { toast } from "sonner";

interface FeedItem {
  id: number;
  type: "detection" | "fix" | "ticket" | "scan" | "alert" | "validation";
  agent: string;
  message: string;
  site: string;
  timestamp: string;
}

const feedTemplates: Omit<FeedItem, "id" | "timestamp">[] = [
  { type: "detection", agent: "Data Validation", message: "Missing purchase event detected on checkout page", site: "OralB UK" },
  { type: "fix", agent: "Auto-Remediation", message: "Auto-fix applied: product_review_submit event added", site: "Head & Shoulders UK" },
  { type: "ticket", agent: "Root Cause Analyzer", message: "ServiceNow ticket INC349042 created for tag conflict", site: "Gillette US" },
  { type: "scan", agent: "Data Validation", message: "Scheduled scan completed — 3 issues found", site: "Pampers DE" },
  { type: "alert", agent: "Analytics Insights", message: "Purchase events dropped 22% in last 24 hours", site: "OralB UK" },
  { type: "validation", agent: "Consent & Compliance", message: "GDPR compliance check passed — all tags compliant", site: "Head & Shoulders UK" },
  { type: "detection", agent: "Measurement Governance", message: "Naming drift detected: productview vs product_view", site: "Gillette US" },
  { type: "fix", agent: "Automation Copilot", message: "GTM tag reconfigured for video_start event", site: "Pampers DE" },
  { type: "ticket", agent: "Root Cause Analyzer", message: "Investigation complete — checkout template update identified", site: "OralB UK" },
  { type: "scan", agent: "Launch Readiness", message: "Pre-launch scan completed — readiness score: 82%", site: "oralb-new.co.uk" },
  { type: "alert", agent: "Analytics Insights", message: "Traffic spike detected — +45% sessions in last hour", site: "Head & Shoulders UK" },
  { type: "fix", agent: "Auto-Remediation", message: "Newsletter signup tag auto-created and deployed", site: "Gillette US" },
];

const typeConfig = {
  detection: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  fix: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  ticket: { icon: Ticket, color: "text-secondary", bg: "bg-indigo-50", border: "border-indigo-200" },
  scan: { icon: Eye, color: "text-primary", bg: "bg-teal-50", border: "border-teal-200" },
  alert: { icon: Bell, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  validation: { icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

const ActivityFeed = () => {
  const [items, setItems] = useState<FeedItem[]>(() => {
    const now = new Date();
    return feedTemplates.slice(0, 6).map((t, i) => ({
      ...t,
      id: i,
      timestamp: formatTime(new Date(now.getTime() - (5 - i) * 12000)),
    }));
  });
  const [nextId, setNextId] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = feedTemplates[Math.floor(Math.random() * feedTemplates.length)];
      const newItem: FeedItem = {
        ...template,
        id: nextId,
        timestamp: formatTime(new Date()),
      };
      setItems((prev) => [newItem, ...prev].slice(0, 12));
      setNextId((prev) => prev + 1);
      // Show toast for fix events
      if (template.type === "fix") {
        toast.success(template.message, {
          description: `${template.agent} · ${template.site}`,
          duration: 4000,
        });
      } else if (template.type === "alert") {
        toast.warning(template.message, {
          description: `${template.agent} · ${template.site}`,
          duration: 4000,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <div className="card-float rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-heading text-base font-bold">Real-Time Component Activity</h2>
          <p className="text-[11px] text-sub">Live feed of component actions across all monitored sites</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-600 font-semibold">LIVE</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex items-start gap-3 p-3 rounded-xl ${config.bg} border ${config.border}`}
              >
                <Icon className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-heading">{item.agent}</span>
                    <span className="text-[9px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-sub">{item.site}</span>
                  </div>
                  <div className="text-xs text-sub leading-relaxed">{item.message}</div>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0 mt-0.5">{item.timestamp}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityFeed;
