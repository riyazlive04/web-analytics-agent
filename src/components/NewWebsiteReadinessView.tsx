import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, FileText, ScanSearch, CheckSquare, FileCode,
  Lightbulb, ShieldCheck, ChevronRight, ChevronLeft,
  AlertTriangle, XCircle, CheckCircle2, ArrowRight,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const steps = [
  {
    title: "Website Registration",
    icon: Globe,
    description: "Register a new website for analytics validation before launch.",
    content: "registration",
  },
  {
    title: "Measurement Plan Retrieval",
    icon: FileText,
    description: "Agent loads the global measurement plan defined in the system.",
    content: "plan",
  },
  {
    title: "Website Scan",
    icon: ScanSearch,
    description: "Agent scans website pages and captures dataLayer, tag firing, and GA4 events.",
    content: "scan",
  },
  {
    title: "Implementation Validation",
    icon: CheckSquare,
    description: "Compare detected events with measurement plan to identify gaps.",
    content: "validation",
  },
  {
    title: "Implementation Report",
    icon: FileCode,
    description: "Display launch readiness score with detailed issue breakdown.",
    content: "report",
  },
  {
    title: "Recommendation Engine",
    icon: Lightbulb,
    description: "Suggest fixes required before launch.",
    content: "recommendations",
  },
  {
    title: "Launch Approval",
    icon: ShieldCheck,
    description: "Determine launch readiness based on threshold score.",
    content: "approval",
  },
];

const measurementPlanEvents = [
  "page_view", "product_view", "add_to_cart", "begin_checkout", "purchase",
  "video_start", "video_complete", "form_submit", "newsletter_signup",
  "product_review_submit", "scroll_depth", "search", "select_content",
  "share", "sign_up", "login", "add_to_wishlist", "remove_from_cart",
  "view_cart", "add_payment_info", "add_shipping_info", "refund",
  "view_promotion", "select_promotion", "click", "file_download",
  "page_scroll", "outbound_click", "site_search", "view_item_list",
  "select_item", "generate_lead", "exception", "timing_complete",
  "screen_view", "user_engagement",
];

const detectedEvents = measurementPlanEvents.slice(0, 29);
const missingEvents = measurementPlanEvents.slice(29);

const readinessScore = 82;

const NewWebsiteReadinessView = ({ onBack }: { onBack: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    siteName: "oralb-new.co.uk",
    domain: "https://oralb-new.co.uk",
    region: "EMEA",
    brand: "OralB",
    environment: "QA",
  });

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  const renderStepContent = () => {
    switch (currentStep.content) {
      case "registration":
        return (
          <div className="space-y-4">
            {[
              { label: "Site Name", key: "siteName" },
              { label: "Domain", key: "domain" },
              { label: "Region", key: "region" },
              { label: "Brand", key: "brand" },
              { label: "Environment", key: "environment" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">{field.label}</label>
                <input
                  value={(formData as any)[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading focus:outline-none focus:border-primary/30"
                />
              </div>
            ))}
          </div>
        );

      case "plan":
        return (
          <div>
            <div className="text-xs text-sub mb-3">Loading global measurement plan — {measurementPlanEvents.length} events defined</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {measurementPlanEvents.map((e) => (
                <div key={e} className="px-2.5 py-1.5 rounded-lg bg-muted border border-border text-[11px] font-mono text-heading">{e}</div>
              ))}
            </div>
          </div>
        );

      case "scan":
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
              <div className="text-xs text-heading font-semibold mb-2">Scan Progress</div>
              <div className="space-y-2">
                {["dataLayer capture", "Tag firing analysis", "GA4 event detection", "Consent signal check"].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-heading">{item}</span>
                    <span className="text-sub ml-auto">Complete</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-sub">Pages scanned: <span className="text-heading font-semibold">48</span></div>
          </div>
        );

      case "validation":
        return (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Expected", value: measurementPlanEvents.length, color: "text-heading" },
                { label: "Detected", value: detectedEvents.length, color: "text-emerald-600" },
                { label: "Missing", value: missingEvents.length, color: "text-red-600" },
              ].map((m) => (
                <div key={m.label} className="text-center p-3 rounded-lg bg-muted/50 border border-border">
                  <div className={`text-xl font-extrabold ${m.color}`}>{m.value}</div>
                  <div className="text-[10px] text-sub">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-sub uppercase tracking-wider mb-2">Missing Events</div>
            <div className="space-y-1">
              {missingEvents.map((e) => (
                <div key={e} className="flex items-center gap-2 text-xs">
                  <XCircle className="w-3 h-3 text-red-500" />
                  <span className="font-mono text-heading">{e}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "report":
        return (
          <div className="text-center">
            <div className="relative inline-flex justify-center mb-4">
              <svg width="160" height="160" className="-rotate-90">
                <circle cx="80" cy="80" r="64" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                <motion.circle
                  cx="80" cy="80" r="64" fill="none"
                  stroke={readinessScore >= 90 ? "#10b981" : readinessScore >= 80 ? "hsl(var(--primary))" : "#f59e0b"}
                  strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 64}
                  initial={{ strokeDashoffset: 2 * Math.PI * 64 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 64 - (readinessScore / 100) * 2 * Math.PI * 64 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-heading text-4xl font-extrabold">{readinessScore}%</div>
                <div className="text-sub text-xs">Readiness</div>
              </div>
            </div>
            <div className="space-y-2 text-left">
              {[
                { issue: "Missing event: product_review_submit", type: "red" },
                { issue: "Missing parameter: product_category", type: "red" },
                { issue: "Tag firing before consent detected", type: "amber" },
              ].map((i, idx) => (
                <div key={idx} className={`p-3 rounded-xl border text-xs ${i.type === "red" ? "bg-red-50/50 border-red-200 text-red-800" : "bg-amber-50/50 border-amber-200 text-amber-800"}`}>
                  <div className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />{i.issue}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "recommendations":
        return (
          <div className="space-y-2">
            {[
              "Add event product_review_submit on review submit button.",
              "Add parameter product_category to product_view event.",
              "Ensure consent is captured before any tag fires.",
              "Add scroll_depth tracking with 25/50/75/100 thresholds.",
              "Implement outbound_click event for external links.",
              "Add file_download tracking for PDF assets.",
              "Configure site_search event on search results page.",
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-heading">
                <Lightbulb className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        );

      case "approval":
        return (
          <div className="text-center space-y-4">
            {readinessScore >= 90 ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <div className="text-xl font-extrabold text-emerald-800">Ready for Launch</div>
                <div className="text-sm text-emerald-700 mt-1">All validation checks passed.</div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <div className="text-xl font-extrabold text-amber-800">Launch Blocked</div>
                <div className="text-sm text-amber-700 mt-1">Score {readinessScore}% is below the 90% threshold. Fix {missingEvents.length} issues before launch.</div>
              </div>
            )}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="text-xs text-sub mb-2">Launch threshold: <span className="text-heading font-bold">90%</span></div>
              <div className="text-xs text-sub">Current score: <span className={`font-bold ${readinessScore >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{readinessScore}%</span></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-6 py-8">
      <motion.div {...fade(0)} className="mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-xs text-sub hover:text-primary transition-colors mb-4">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Architecture
        </button>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center glow-accent-strong">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-heading text-2xl md:text-3xl font-extrabold">Launch Readiness Validator</h1>
            <p className="text-sub text-sm">Validates analytics implementation for newly launched websites before go-live.</p>
          </div>
        </div>
      </motion.div>

      {/* Pipeline */}
      <motion.div {...fade(0.05)} className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-3">
        {steps.map((s, i) => {
          const StepIcon = s.icon;
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          return (
            <div key={i} className="flex items-start">
              <button onClick={() => setActiveStep(i)} className="relative flex flex-col items-center gap-2 px-1.5 py-2 cursor-pointer w-[90px]">
                <motion.div
                  animate={isActive ? { scale: 1.12, y: -3 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`w-[44px] h-[44px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-primary/10 border-2 border-primary/40 shadow-lg shadow-primary/10"
                      : isPast ? "bg-primary/5 border border-primary/20"
                      : "bg-card border border-border shadow-sm"
                  }`}
                >
                  <StepIcon className={`w-5 h-5 ${isActive ? "text-primary" : isPast ? "text-primary/60" : "text-muted-foreground"}`} />
                </motion.div>
                <span className={`text-[9px] font-semibold text-center leading-tight ${isActive ? "text-primary" : "text-sub"}`}>{s.title}</span>
                {isActive && <motion.div layoutId="readiness-step" className="absolute -bottom-0.5 w-8 h-0.5 bg-primary rounded-full" />}
              </button>
              {i < steps.length - 1 && (
                <div className="flex items-center mt-5 mx-0">
                  <div className={`w-4 h-[2px] rounded-full ${isPast ? "bg-primary/30" : "bg-border"}`} />
                  <ChevronRight className={`w-3 h-3 -ml-1 ${isPast ? "text-primary/40" : "text-border"}`} />
                </div>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Step detail */}
      <AnimatePresence mode="wait">
        <motion.div key={activeStep} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="max-w-2xl mx-auto">
          <div className="card-float rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center glow-accent-strong">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-primary/50 tracking-widest">STEP {activeStep + 1} OF {steps.length}</div>
                <h2 className="text-heading text-xl font-extrabold">{currentStep.title}</h2>
              </div>
            </div>
            <p className="text-sub text-sm mb-5">{currentStep.description}</p>
            {renderStepContent()}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl card-elevated text-sm font-medium text-sub hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary/8 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/12 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default NewWebsiteReadinessView;
