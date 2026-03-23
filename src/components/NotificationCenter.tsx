import { motion } from "framer-motion";
import {
  Bell, Mail, CheckCircle2, AlertTriangle, Wrench,
  ArrowDown, Globe, Clock, Shield,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const notifications = [
  {
    type: "fix" as const,
    title: "Auto-Remediation Fix Applied",
    site: "Head & Shoulders UK",
    issue: "Missing event product_review_submit",
    action: "Tag created in GTM container",
    validation: "Event now firing successfully",
    time: "2 min ago",
    recipients: ["analytics-team@company.com", "engineering-team@company.com"],
  },
  {
    type: "alert" as const,
    title: "Event Drop Detected",
    site: "OralB UK",
    issue: "Checkout event dropped 35%",
    action: "ServiceNow ticket INC349029 created",
    validation: "Pending engineering review",
    time: "15 min ago",
    recipients: ["analytics-team@company.com"],
  },
  {
    type: "fix" as const,
    title: "Auto-Remediation Fix Applied",
    site: "Gillette US",
    issue: "Broken trigger on video_start event",
    action: "Trigger reconfigured in GTM",
    validation: "Event firing confirmed",
    time: "1 hour ago",
    recipients: ["us-analytics@company.com", "engineering-team@company.com"],
  },
];

const NotificationCenter = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <motion.div {...fade(0)} className="mb-8">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-heading text-2xl font-extrabold">Notification Center</h2>
            <p className="text-sub text-sm">Email notifications and component activity feed.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div {...fade(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Issues Detected", value: "12", color: "text-heading" },
          { label: "Auto Fixes Applied", value: "4", color: "text-emerald-600" },
          { label: "Tickets Created", value: "6", color: "text-secondary" },
          { label: "Pending Review", value: "2", color: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="card-float rounded-2xl p-5 text-center">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-[11px] text-sub mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Self-healing flow */}
      <motion.div {...fade(0.1)} className="card-float rounded-2xl p-6 mb-6 border-l-4 border-l-primary">
        <h3 className="text-heading text-base font-bold mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Auto-Remediation Workflow
        </h3>
        <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
          {["Detection", "Root Cause Analysis", "Automated Fix", "Validation Scan", "Email Notification"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-primary/5 border border-primary/15 text-primary font-semibold">{s}</span>
              {i < arr.length - 1 && <ArrowDown className="w-3 h-3 text-primary/40 -rotate-90" />}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Email preview */}
      <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6 mb-6">
        <h3 className="text-heading text-base font-bold mb-4 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" /> Email Notification Preview
        </h3>
        <div className="bg-muted rounded-xl border border-border p-5 font-mono text-xs space-y-2">
          <div className="text-sub">Subject: <span className="text-heading font-semibold">Auto-Remediation Fix Applied – Head & Shoulders UK</span></div>
          <div className="border-t border-border my-3" />
          <div className="text-sub leading-relaxed space-y-2">
            <p className="text-heading font-semibold">The Data Validation Agent detected a missing event and the Auto-Remediation Engine applied a fix.</p>
            <p><span className="text-sub">Issue:</span> <span className="text-heading">Missing event product_review_submit</span></p>
            <p><span className="text-sub">Action taken:</span> <span className="text-heading">Tag created in GTM container.</span></p>
            <p><span className="text-sub">Validation:</span> <span className="text-emerald-600 font-semibold">Event now firing successfully.</span></p>
          </div>
          <div className="border-t border-border my-3" />
          <div className="flex items-center gap-2 text-sub">
            <Mail className="w-3 h-3" />
            Recipients: analytics-team@company.com, engineering-team@company.com
          </div>
        </div>
      </motion.div>

      {/* Notification feed */}
      <motion.div {...fade(0.2)}>
        <h3 className="text-heading text-base font-bold mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div key={i} {...fade(i * 0.05 + 0.25)} className="card-elevated rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === "fix" ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"
                }`}>
                  {n.type === "fix" ? <Wrench className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-heading text-sm font-bold">{n.title}</h4>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{n.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Globe className="w-3 h-3 text-secondary" />
                    <span className="text-xs text-heading font-semibold">{n.site}</span>
                  </div>
                  <div className="text-xs text-sub space-y-0.5">
                    <div>Issue: <span className="text-heading">{n.issue}</span></div>
                    <div>Action: <span className="text-heading">{n.action}</span></div>
                    <div>Status: <span className={n.type === "fix" ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>{n.validation}</span></div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    {n.recipients.map((r) => (
                      <span key={r} className="px-2 py-0.5 rounded bg-muted border border-border text-[10px] font-mono text-sub">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationCenter;
