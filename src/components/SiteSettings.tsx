import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Clock, Shield, Mail, Save, ToggleLeft, ToggleRight,
  ChevronDown, X, Plus, Settings2, CheckCircle2,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const frequencies = ["Every 15 minutes", "Every 1 hour", "Every 6 hours", "Every 12 hours", "Daily"];

interface SiteConfig {
  name: string;
  frequency: string;
  continuousMonitoring: boolean;
  selfHealing: boolean;
  emails: string[];
}

const defaultSites: SiteConfig[] = [
  { name: "Head & Shoulders UK", frequency: "Every 1 hour", continuousMonitoring: true, selfHealing: true, emails: ["analytics-team@company.com", "engineering-team@company.com"] },
  { name: "OralB UK", frequency: "Every 15 minutes", continuousMonitoring: true, selfHealing: false, emails: ["analytics-team@company.com"] },
  { name: "Gillette US", frequency: "Every 6 hours", continuousMonitoring: true, selfHealing: true, emails: ["us-analytics@company.com", "engineering-team@company.com"] },
];

const SiteSettings = () => {
  const [sites, setSites] = useState<SiteConfig[]>(defaultSites);
  const [saved, setSaved] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<Record<number, string>>({});
  const [openFreq, setOpenFreq] = useState<number | null>(null);

  const updateSite = (index: number, updates: Partial<SiteConfig>) => {
    setSites((prev) => prev.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  };

  const addEmail = (index: number) => {
    const email = newEmail[index]?.trim();
    if (!email || !email.includes("@")) return;
    updateSite(index, { emails: [...sites[index].emails, email] });
    setNewEmail((prev) => ({ ...prev, [index]: "" }));
  };

  const removeEmail = (siteIdx: number, emailIdx: number) => {
    updateSite(siteIdx, { emails: sites[siteIdx].emails.filter((_, i) => i !== emailIdx) });
  };

  const handleSave = (index: number) => {
    setSaved(sites[index].name);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <motion.div {...fade(0)} className="mb-8">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <Settings2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-heading text-2xl font-extrabold">Site Monitoring Settings</h2>
            <p className="text-sub text-sm">Configure scanning behaviour, auto-remediation, and notifications per website.</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        {sites.map((site, idx) => (
          <motion.div key={site.name} {...fade(idx * 0.1 + 0.1)} className="card-float rounded-2xl p-6">
            {/* Site header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-secondary/8 border border-secondary/15 flex items-center justify-center">
                <Globe className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-heading text-lg font-bold">{site.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left col */}
              <div className="space-y-5">
                {/* Scan Frequency */}
                <div>
                  <label className="text-xs font-semibold text-sub uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Scan Frequency
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setOpenFreq(openFreq === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-heading font-medium hover:border-primary/30 transition-colors"
                    >
                      {site.frequency}
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFreq === idx ? "rotate-180" : ""}`} />
                    </button>
                    {openFreq === idx && (
                      <div className="absolute top-full mt-1 left-0 right-0 z-20 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                        {frequencies.map((f) => (
                          <button
                            key={f}
                            onClick={() => { updateSite(idx, { frequency: f }); setOpenFreq(null); }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${f === site.frequency ? "text-primary font-semibold bg-primary/5" : "text-sub"}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <ToggleRow
                    label="Enable Continuous Monitoring"
                    icon={<Shield className="w-3.5 h-3.5" />}
                    enabled={site.continuousMonitoring}
                    onToggle={() => updateSite(idx, { continuousMonitoring: !site.continuousMonitoring })}
                  />
                  <ToggleRow
                    label="Enable Auto-Remediation Mode"
                    icon={<Shield className="w-3.5 h-3.5" />}
                    enabled={site.selfHealing}
                    onToggle={() => updateSite(idx, { selfHealing: !site.selfHealing })}
                  />
                </div>
              </div>

              {/* Right col — Email */}
              <div>
                <label className="text-xs font-semibold text-sub uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Notification Recipients
                </label>
                <div className="space-y-2 mb-3">
                  {site.emails.map((email, eIdx) => (
                    <div key={email} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border text-sm">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-heading font-mono text-xs flex-1 truncate">{email}</span>
                      <button onClick={() => removeEmail(idx, eIdx)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Add email address"
                    value={newEmail[idx] || ""}
                    onChange={(e) => setNewEmail((prev) => ({ ...prev, [idx]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && addEmail(idx)}
                    className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors"
                  />
                  <button onClick={() => addEmail(idx)} className="px-3 py-2 rounded-lg bg-primary/8 border border-primary/20 text-primary hover:bg-primary/12 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => handleSave(idx)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                {saved === site.name ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved === site.name ? "Saved!" : "Save Settings"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ToggleRow = ({ label, icon, enabled, onToggle }: { label: string; icon: React.ReactNode; enabled: boolean; onToggle: () => void }) => (
  <button onClick={onToggle} className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl bg-muted/50 border border-border hover:border-primary/20 transition-colors">
    <span className="flex items-center gap-2 text-sm text-heading font-medium">
      {icon} {label}
    </span>
    {enabled ? (
      <ToggleRight className="w-6 h-6 text-primary" />
    ) : (
      <ToggleLeft className="w-6 h-6 text-muted-foreground" />
    )}
  </button>
);

export default SiteSettings;
