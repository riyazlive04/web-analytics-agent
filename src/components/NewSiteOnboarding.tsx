import { motion } from "framer-motion";
import { Globe, CheckCircle2, AlertTriangle, Clock, ArrowRight } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const sites = [
  { brand: "OralB", site: "oralb-new.co.uk", status: "Validation Running", score: 82, statusColor: "yellow" as const },
  { brand: "Gillette", site: "gillette-new.com", status: "Ready for Launch", score: 95, statusColor: "green" as const },
  { brand: "Pampers", site: "pampers-new.de", status: "Registration", score: 0, statusColor: "yellow" as const },
  { brand: "Head & Shoulders", site: "hs-new.co.uk", status: "Scan In Progress", score: 45, statusColor: "yellow" as const },
];

const statusBadge = (status: string, color: "green" | "yellow" | "red") => {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${styles[color]}`}>{status}</span>;
};

const NewSiteOnboarding = () => (
  <motion.div {...fade(0)} className="card-float rounded-2xl p-5 mb-1">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-secondary/8 border border-secondary/15 flex items-center justify-center">
        <Globe className="w-5 h-5 text-secondary" />
      </div>
      <div>
        <h2 className="text-heading text-base font-bold">New Sites Onboarding</h2>
        <p className="text-[11px] text-sub">Pre-launch validation progress for new websites</p>
      </div>
    </div>

    <div className="grid grid-cols-[80px_1fr_120px_80px] gap-2 px-3 py-2 text-[10px] font-semibold text-sub uppercase tracking-wider border-b border-border">
      <span>Brand</span><span>Site</span><span>Status</span><span className="text-right">Score</span>
    </div>
    {sites.map((s, i) => (
      <motion.div key={s.site} {...fade(i * 0.05 + 0.05)} className="grid grid-cols-[80px_1fr_120px_80px] gap-2 px-3 py-3 items-center border-b border-border last:border-0">
        <span className="text-xs text-heading font-semibold">{s.brand}</span>
        <span className="text-xs font-mono text-sub">{s.site}</span>
        {statusBadge(s.status, s.statusColor)}
        <div className="text-right">
          {s.score > 0 ? (
            <span className={`text-sm font-extrabold ${s.score >= 90 ? "text-emerald-600" : s.score >= 80 ? "text-primary" : "text-amber-600"}`}>
              {s.score}%
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default NewSiteOnboarding;
