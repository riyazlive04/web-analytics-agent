import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse, Activity, TrendingUp, TrendingDown, CheckCircle2,
  AlertTriangle, XCircle, BarChart3, ShoppingCart, Eye, Play,
  Shield, Ticket, Lightbulb, ArrowDown, ArrowRight,
  MonitorCheck, Globe, Code, Wifi, WifiOff,
  Users, Clock, Wrench, RefreshCw, Database,
  Megaphone, Target, Layers, AlertCircle, Zap, ChevronDown,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from "recharts";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const StatusDot = ({ status }: { status: "green" | "yellow" | "red" }) => {
  const colors = { green: "bg-emerald-500", yellow: "bg-amber-500", red: "bg-red-500" };
  const pingColors = { green: "bg-emerald-400", yellow: "bg-amber-400", red: "bg-red-400" };
  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColors[status]}`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[status]}`} />
    </span>
  );
};

const StatusBadge = ({ label, status }: { label: string; status: "green" | "yellow" | "red" }) => {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${styles[status]}`}>{label}</span>;
};

const useCountUp = (target: number, duration = 1200, delay = 300) => {
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

const RadialScore = ({ score, label }: { score: number; label: string }) => {
  const r = 54, c = 2 * Math.PI * r, offset = c - (score / 100) * c;
  const displayScore = useCountUp(score, 1200, 300);
  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
        <motion.circle cx="70" cy="70" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} />
      </svg>
      <div className="absolute mt-10 text-center">
        <div className="text-heading text-3xl font-extrabold">{displayScore}</div>
        <div className="text-sub text-xs">/100</div>
      </div>
      <div className="text-heading text-sm font-bold mt-2">{label}</div>
    </div>
  );
};

const MiniBar = ({ value, color = "bg-primary" }: { value: number; color?: string }) => (
  <div className="w-full h-1.5 rounded-full bg-muted">
    <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} />
  </div>
);

const MetricCard = ({ label, value, trend, icon: Icon }: { label: string; value: string; trend: string; icon?: any }) => (
  <div className="p-3 rounded-xl bg-muted/50 border border-border">
    <div className="flex items-center gap-1.5 mb-1">
      {Icon && <Icon className="w-3 h-3 text-muted-foreground" />}
      <div className="text-[10px] text-sub uppercase tracking-wider">{label}</div>
    </div>
    <div className="text-heading text-lg font-extrabold">{value}</div>
    <div className={`text-xs font-semibold ${trend.startsWith("+") ? "text-emerald-600" : trend.startsWith("-") ? "text-red-600" : "text-sub"}`}>
      {trend.startsWith("+") ? <TrendingUp className="w-3 h-3 inline mr-0.5" /> : trend.startsWith("-") ? <TrendingDown className="w-3 h-3 inline mr-0.5" /> : null}
      {trend}
    </div>
  </div>
);

/* ═══ Brand data per site ═══ */
interface BrandData {
  name: string;
  healthScore: number;
  sessions: string; pageViews: string; addToCart: string; purchases: string;
  sessionsTrend: string; pageViewsTrend: string; addToCartTrend: string; purchasesTrend: string;
  avgDuration: string; bounceRate: string;
  eventImpl: number; paramCoverage: number; consentCompliance: number; tagQuality: number;
  expectedEvents: number; implementedEvents: number; missingEvents: string[];
  chartData: { day: string; sessions: number; pageViews: number; conversions: number }[];
  topCampaign: string; trafficIncrease: string; cartIncrease: string;
}

const generateChartData = (base: number[], pvBase: number[], convBase: number[]) =>
  Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    sessions: base[i % base.length] + Math.round(Math.random() * 5000),
    pageViews: pvBase[i % pvBase.length] + Math.round(Math.random() * 2000),
    conversions: convBase[i % convBase.length] + Math.round(Math.random() * 100),
  }));

const brands: BrandData[] = [
  {
    name: "Head & Shoulders UK", healthScore: 91,
    sessions: "1.2M", pageViews: "420K", addToCart: "85K", purchases: "14K",
    sessionsTrend: "+8%", pageViewsTrend: "+12%", addToCartTrend: "+38%", purchasesTrend: "-5%",
    avgDuration: "2m 34s", bounceRate: "41%",
    eventImpl: 94, paramCoverage: 92, consentCompliance: 100, tagQuality: 88,
    expectedEvents: 36, implementedEvents: 33,
    missingEvents: ["product_review_submit", "newsletter_signup", "video_complete"],
    chartData: generateChartData([38000, 41000, 39000, 43000, 42000], [13000, 14500, 13800, 15000, 14200], [450, 470, 440, 490, 460]),
    topCampaign: "Summer Promo Campaign", trafficIncrease: "+18%", cartIncrease: "+22%",
  },
  {
    name: "OralB UK", healthScore: 94,
    sessions: "890K", pageViews: "310K", addToCart: "62K", purchases: "11K",
    sessionsTrend: "+12%", pageViewsTrend: "+15%", addToCartTrend: "+8%", purchasesTrend: "+3%",
    avgDuration: "3m 12s", bounceRate: "38%",
    eventImpl: 97, paramCoverage: 95, consentCompliance: 100, tagQuality: 92,
    expectedEvents: 36, implementedEvents: 35,
    missingEvents: ["video_complete"],
    chartData: generateChartData([28000, 30000, 29500, 31000, 30500], [10000, 11000, 10500, 11200, 10800], [360, 380, 370, 390, 375]),
    topCampaign: "Electric Toothbrush Launch", trafficIncrease: "+24%", cartIncrease: "+31%",
  },
  {
    name: "Gillette US", healthScore: 87,
    sessions: "2.1M", pageViews: "680K", addToCart: "120K", purchases: "22K",
    sessionsTrend: "+5%", pageViewsTrend: "+3%", addToCartTrend: "-2%", purchasesTrend: "-8%",
    avgDuration: "2m 08s", bounceRate: "47%",
    eventImpl: 89, paramCoverage: 86, consentCompliance: 100, tagQuality: 82,
    expectedEvents: 36, implementedEvents: 31,
    missingEvents: ["product_review_submit", "newsletter_signup", "video_complete", "wishlist_add", "size_selector"],
    chartData: generateChartData([68000, 70000, 65000, 72000, 69000], [22000, 23000, 21500, 24000, 22500], [720, 700, 680, 710, 690]),
    topCampaign: "Father's Day Promo", trafficIncrease: "+9%", cartIncrease: "+5%",
  },
  {
    name: "Pampers DE", healthScore: 82,
    sessions: "1.5M", pageViews: "520K", addToCart: "95K", purchases: "18K",
    sessionsTrend: "+3%", pageViewsTrend: "-2%", addToCartTrend: "+15%", purchasesTrend: "+7%",
    avgDuration: "2m 45s", bounceRate: "39%",
    eventImpl: 85, paramCoverage: 80, consentCompliance: 98, tagQuality: 78,
    expectedEvents: 36, implementedEvents: 29,
    missingEvents: ["product_review_submit", "newsletter_signup", "video_complete", "size_selector", "diaper_calculator", "age_selector", "sample_request"],
    chartData: generateChartData([48000, 50000, 47000, 52000, 49000], [17000, 17500, 16500, 18000, 17200], [580, 600, 570, 620, 590]),
    topCampaign: "Newborn Bundle Campaign", trafficIncrease: "+11%", cartIncrease: "+19%",
  },
];

/* ═══ Chart tooltip ═══ */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs">
      <div className="text-heading font-semibold mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-sub">{p.name}:</span>
          <span className="text-heading font-semibold">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

/* ═══ Trend Chart ═══ */
const TrendChart = ({ data }: { data: BrandData["chartData"] }) => (
  <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
    <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
      <Activity className="w-4 h-4 text-primary" /> 30-Day Trends
    </h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(181, 72%, 35%)" stopOpacity={0.15} />
            <stop offset="95%" stopColor="hsl(181, 72%, 35%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradPageViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(231, 80%, 62%)" stopOpacity={0.15} />
            <stop offset="95%" stopColor="hsl(231, 80%, 62%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradConv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
        <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(220, 9%, 46%)" }} tickLine={false} axisLine={false} interval={6} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(220, 9%, 46%)" }} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="sessions" stroke="hsl(181, 72%, 35%)" strokeWidth={2} fill="url(#gradSessions)" name="Sessions" />
        <Area type="monotone" dataKey="pageViews" stroke="hsl(231, 80%, 62%)" strokeWidth={2} fill="url(#gradPageViews)" name="Page Views" />
        <Area type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} fill="url(#gradConv)" name="Conversions" />
      </AreaChart>
    </ResponsiveContainer>
    <div className="flex justify-center gap-4 mt-3">
      {[
        { label: "Sessions", color: "hsl(181, 72%, 35%)" },
        { label: "Page Views", color: "hsl(231, 80%, 62%)" },
        { label: "Conversions", color: "#10b981" },
      ].map((l) => (
        <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-sub">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
          {l.label}
        </div>
      ))}
    </div>
  </motion.div>
);

const viewTabs = ["Brand Team", "Analytics Team", "Engineering", "Leadership"] as const;

interface BrandDashboardProps {
  activeView: string;
  setActiveView: (v: string) => void;
}

/* ═══════════════════════════════════════════
   BRAND TEAM VIEW
   ═══════════════════════════════════════════ */
const BrandTeamView = ({ brand }: { brand: BrandData }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="space-y-5">
        <motion.div {...fade(0.1)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Traffic Overview
            <span className="ml-auto text-[10px] text-sub font-normal">Last 30 days</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Sessions" value={brand.sessions} trend={brand.sessionsTrend} icon={Users} />
            <MetricCard label="Page Views" value={brand.pageViews} trend={brand.pageViewsTrend} icon={Eye} />
            <MetricCard label="Add To Cart" value={brand.addToCart} trend={brand.addToCartTrend} icon={ShoppingCart} />
            <MetricCard label="Purchases" value={brand.purchases} trend={brand.purchasesTrend} icon={Target} />
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Customer Engagement
          </h3>
          <div className="space-y-3">
            {[
              { label: "Avg Session Duration", value: brand.avgDuration },
              { label: "Bounce Rate", value: brand.bounceRate },
              { label: "Pages per Session", value: "3.8" },
            ].map((m) => (
              <div key={m.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-xs text-sub">{m.label}</span>
                <span className="text-heading text-sm font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="space-y-5">
        <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" /> Conversion Funnel
          </h3>
          <div className="space-y-3">
            {[
              { from: "Product View", to: "Add to Cart", rate: 20, value: `${brand.pageViews} → ${brand.addToCart}` },
              { from: "Add to Cart", to: "Checkout", rate: 16, value: `${brand.addToCart} → ...` },
              { from: "Checkout", to: "Purchase", rate: 12, value: `... → ${brand.purchases}` },
            ].map((step) => (
              <div key={step.from} className="p-3 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-1.5 text-xs mb-2">
                  <span className="text-heading font-semibold">{step.from}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-heading font-semibold">{step.to}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-sub">{step.value}</span>
                  <span className="text-primary text-sm font-bold">{step.rate}%</span>
                </div>
                <MiniBar value={step.rate} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-primary" /> Top Campaign Impact
          </h3>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
            <div className="text-heading text-sm font-bold mb-2">{brand.topCampaign}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-sub">Traffic increase</span><span className="text-emerald-600 font-semibold">{brand.trafficIncrease}</span></div>
              <div className="flex justify-between text-xs"><span className="text-sub">Add-to-cart increase</span><span className="text-emerald-600 font-semibold">{brand.cartIncrease}</span></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-5">
        <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" /> Insights
          </h3>
          <div className="space-y-3">
            {[
              { text: `Add-to-cart increased ${brand.addToCartTrend} due to promotional campaign.`, type: "positive" as const },
              { text: "Checkout completion dropped 4% in last week.", type: "negative" as const },
            ].map((ins, i) => (
              <div key={i} className={`p-3 rounded-xl border text-xs ${ins.type === "positive" ? "bg-emerald-50/50 border-emerald-200 text-emerald-800" : "bg-red-50/50 border-red-200 text-red-800"}`}>
                <div className="font-semibold">{ins.text}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Recommendations
          </h3>
          <div className="space-y-2">
            {["Investigate checkout experience drop.", "Promote top-performing campaign creatives.", "Expand campaign to additional product categories."].map((r, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 border border-border text-xs text-sub">
                <ArrowRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" /><span>{r}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    {/* Full-width trend chart */}
    <TrendChart data={brand.chartData} />
  </div>
);

/* ═══════════════════════════════════════════
   ANALYTICS TEAM VIEW
   ═══════════════════════════════════════════ */
const AnalyticsTeamView = ({ brand }: { brand: BrandData }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="space-y-5">
        <motion.div {...fade(0.1)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-primary" /> Tracking Health Score
          </h3>
          <div className="flex justify-center relative mb-4">
            <RadialScore score={brand.healthScore} label="Overall Health" />
          </div>
          <div className="space-y-3">
            {[
              { label: "Event Implementation", value: brand.eventImpl },
              { label: "Parameter Coverage", value: brand.paramCoverage },
              { label: "Consent Compliance", value: brand.consentCompliance },
              { label: "Tag Quality", value: brand.tagQuality },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sub">{m.label}</span>
                  <span className="text-heading font-semibold">{m.value}%</span>
                </div>
                <MiniBar value={m.value} color={m.value >= 95 ? "bg-emerald-500" : m.value >= 90 ? "bg-primary" : "bg-amber-500"} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6 border-l-4 border-l-destructive">
          <h3 className="text-heading text-sm font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" /> Anomaly Alerts
          </h3>
          <div className="p-3 rounded-xl bg-red-50/50 border border-red-200 text-xs text-red-800">
            <div className="font-semibold mb-1">Purchase event dropped 22% in last 24 hours.</div>
            <div className="text-[11px] opacity-80">Possible cause: Checkout template update detected.</div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-5">
        <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Event Monitoring
          </h3>
          <div className="grid grid-cols-[1fr_60px_60px] gap-2 text-[10px] font-semibold text-sub uppercase tracking-wider mb-2 px-1">
            <span>Event</span><span className="text-center">Status</span><span className="text-right">7d Trend</span>
          </div>
          {[
            { name: "product_view", status: "green" as const, trend: "+4%" },
            { name: "add_to_cart", status: "yellow" as const, trend: brand.addToCartTrend },
            { name: "purchase", status: "red" as const, trend: brand.purchasesTrend },
            { name: "video_start", status: "green" as const, trend: "+2%" },
          ].map((e) => (
            <div key={e.name} className="grid grid-cols-[1fr_60px_60px] gap-2 items-center py-2 px-1 border-b border-border last:border-0">
              <div className="flex items-center gap-2"><StatusDot status={e.status} /><span className="text-xs font-mono text-heading">{e.name}</span></div>
              <div className="text-center"><StatusBadge label={e.status === "green" ? "Healthy" : e.status === "yellow" ? "Spike" : "Drop"} status={e.status} /></div>
              <span className={`text-xs font-semibold text-right ${e.trend.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>{e.trend}</span>
            </div>
          ))}
        </motion.div>

        <motion.div {...fade(0.25)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" /> DataLayer Validation
          </h3>
          {[
            { param: "SiteBrand", status: "OK" },
            { param: "SiteCountry", status: "OK" },
            { param: "SiteLocale", status: "OK" },
            { param: "content.type", status: "Missing on 12 pages" },
            { param: "user.sourceID", status: "Invalid format" },
          ].map((d) => (
            <div key={d.param} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-xs font-mono text-heading">{d.param}</span>
              <StatusBadge label={d.status} status={d.status === "OK" ? "green" : d.status.includes("Missing") ? "yellow" : "red"} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="space-y-5">
        <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Measurement Plan Compliance
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Expected", value: brand.expectedEvents, color: "text-heading" },
              { label: "Implemented", value: brand.implementedEvents, color: "text-emerald-600" },
              { label: "Missing", value: brand.expectedEvents - brand.implementedEvents, color: "text-red-600" },
            ].map((m) => (
              <div key={m.label} className="text-center p-2 rounded-lg bg-muted/50 border border-border">
                <div className={`text-xl font-extrabold ${m.color}`}>{m.value}</div>
                <div className="text-[10px] text-sub">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-sub uppercase tracking-wider mb-2">Missing Events</div>
          <div className="space-y-1">
            {brand.missingEvents.map((e) => (
              <div key={e} className="flex items-center gap-2 text-xs"><XCircle className="w-3 h-3 text-red-500" /><span className="font-mono text-heading">{e}</span></div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Consent Compliance
          </h3>
          <div className="text-xs text-sub mb-3">Platform: <span className="text-heading font-semibold">OneTrust</span></div>
          {[
            { label: "Tags firing before consent", value: "0", ok: true },
            { label: "GDPR compliance", value: "PASS", ok: true },
            { label: "Cookie categories", value: brand.consentCompliance >= 100 ? "PASS" : "WARN", ok: brand.consentCompliance >= 100 },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-xs text-sub">{c.label}</span>
              <StatusBadge label={c.value} status={c.ok ? "green" : "yellow"} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    <TrendChart data={brand.chartData} />
  </div>
);

/* ═══════════════════════════════════════════
   ENGINEERING VIEW
   ═══════════════════════════════════════════ */
const EngineeringView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
    <div className="space-y-5">
      <motion.div {...fade(0.1)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" /> GTM Container Status
        </h3>
        <div className="space-y-3">
          {[
            { label: "Region Container", version: "v34", status: "green" as const },
            { label: "Local Container", version: "v12", status: "green" as const },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
              <div><div className="text-xs text-heading font-semibold">{c.label}</div><div className="text-[10px] text-sub">Version: {c.version}</div></div>
              <StatusBadge label="Active" status={c.status} />
            </div>
          ))}
        </div>
        <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />Container publish detected 6 hours ago.
        </div>
      </motion.div>
      <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" /> Implementation Issues
        </h3>
        <div className="space-y-2">
          {[
            { issue: "Missing event trigger on checkout page.", severity: "red" as const },
            { issue: "Tag conflict between GA4 and Meta pixel.", severity: "yellow" as const },
            { issue: "Deprecated dataLayer variable in use.", severity: "yellow" as const },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs ${item.severity === "red" ? "bg-red-50/50 border-red-200 text-red-800" : "bg-amber-50/50 border-amber-200 text-amber-800"}`}>{item.issue}</div>
          ))}
        </div>
      </motion.div>
    </div>
    <div className="space-y-5">
      <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-primary" /> Auto-Remediation Actions
        </h3>
        <div className="space-y-2">
          {[
            { action: "product_review_submit event added", status: "Deployed", time: "2h ago" },
            { action: "video_start trigger reconfigured", status: "Deployed", time: "5h ago" },
            { action: "Newsletter signup tag created", status: "Pending", time: "1h ago" },
          ].map((a, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/50 border border-border">
              <div className="text-xs text-heading font-semibold mb-1">{a.action}</div>
              <div className="flex items-center justify-between">
                <StatusBadge label={a.status} status={a.status === "Deployed" ? "green" : "yellow"} />
                <span className="text-[10px] text-muted-foreground">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div {...fade(0.25)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" /> Suggested Fixes
        </h3>
        <div className="space-y-2">
          {["Add trigger for purchase event on checkout confirmation.", "Update dataLayer variable to new schema.", "Fix Meta pixel conflict with tag sequencing."].map((fix, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/15 text-xs text-heading">
              <Lightbulb className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" /><span>{fix}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
    <div className="space-y-5">
      <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6 border-l-4 border-l-secondary">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <Ticket className="w-4 h-4 text-secondary" /> ServiceNow Tickets
        </h3>
        <div className="space-y-2">
          {[
            { id: "INC349029", desc: "Checkout tracking issue", status: "Open", priority: "High" },
            { id: "INC349031", desc: "Missing parameter", status: "In Progress", priority: "Medium" },
            { id: "INC349035", desc: "Tag conflict resolution", status: "Open", priority: "Low" },
          ].map((t) => (
            <div key={t.id} className="p-3 rounded-lg bg-muted/60 border border-border font-mono text-xs space-y-0.5">
              <div className="flex items-center justify-between"><span className="text-heading font-bold">{t.id}</span><StatusBadge label={t.status} status={t.status === "Open" ? "red" : "yellow"} /></div>
              <div className="text-sub">{t.desc}</div>
              <div className="text-sub">Priority: <span className={`font-semibold ${t.priority === "High" ? "text-red-600" : t.priority === "Medium" ? "text-amber-600" : "text-sub"}`}>{t.priority}</span></div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" /> Recent Changes
        </h3>
        <div className="space-y-2">
          {[
            { change: "GTM container v34 published", time: "6h ago", type: "warning" },
            { change: "New GA4 config tag added", time: "1d ago", type: "info" },
            { change: "Meta pixel updated to v2.9.145", time: "2d ago", type: "info" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className={`w-2 h-2 rounded-full ${c.type === "warning" ? "bg-amber-500" : "bg-primary/50"}`} />
              <div className="flex-1"><div className="text-xs text-heading">{c.change}</div><div className="text-[10px] text-muted-foreground">{c.time}</div></div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   LEADERSHIP VIEW
   ═══════════════════════════════════════════ */
const LeadershipView = ({ brand }: { brand: BrandData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
    <div className="space-y-5">
      <motion.div {...fade(0.1)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" /> Ecosystem Health
        </h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Monitored", value: "512", color: "text-heading" },
            { label: "Healthy", value: "468", color: "text-emerald-600" },
            { label: "Issues", value: "44", color: "text-red-600" },
          ].map((m) => (
            <div key={m.label} className="text-center p-3 rounded-lg bg-muted/50 border border-border">
              <div className={`text-xl font-extrabold ${m.color}`}>{m.value}</div>
              <div className="text-[10px] text-sub">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center relative"><RadialScore score={brand.healthScore} label="Avg Health Score" /></div>
      </motion.div>
    </div>
    <div className="space-y-5">
      <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" /> Top Risks
        </h3>
        <div className="space-y-2">
          {[
            { risk: "3 sites with purchase event drops", severity: "red" as const },
            { risk: "2 sites with consent warnings", severity: "yellow" as const },
            { risk: "1 site with tracking failure", severity: "red" as const },
          ].map((r, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs font-medium ${r.severity === "red" ? "bg-red-50/50 border-red-200 text-red-800" : "bg-amber-50/50 border-amber-200 text-amber-800"}`}>
              <div className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{r.risk}</div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" /> Business Metrics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Total Sessions" value="12.4M" trend="+6%" />
          <MetricCard label="Conversions" value="210K" trend="+3%" />
        </div>
        <div className="mt-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200">
          <div className="flex items-center justify-between"><span className="text-xs text-sub">Revenue Impact Risk</span><StatusBadge label="Medium" status="yellow" /></div>
        </div>
      </motion.div>
    </div>
    <div className="space-y-5">
      <motion.div {...fade(0.15)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Automation Impact <span className="ml-auto text-[10px] text-sub font-normal">Today</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Issues Detected", value: "12", color: "text-heading" },
            { label: "Auto Fixes", value: "4", color: "text-emerald-600" },
            { label: "Tickets Created", value: "6", color: "text-secondary" },
            { label: "Pending Review", value: "2", color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="text-center p-3 rounded-lg bg-muted/50 border border-border">
              <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-sub">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div {...fade(0.2)} className="card-float rounded-2xl p-6 border-l-4 border-l-primary">
        <h3 className="text-heading text-sm font-bold mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" /> Key Insight
        </h3>
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-heading leading-relaxed">
          <div className="font-semibold mb-1">Checkout tracking issues detected on 3 sites.</div>
          <div className="text-sub mt-2">Estimated revenue impact: <span className="text-heading font-semibold">£180K underreported</span></div>
        </div>
      </motion.div>
      <motion.div {...fade(0.25)} className="card-float rounded-2xl p-6">
        <h3 className="text-heading text-sm font-bold mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" /> Summary
        </h3>
        <div className="space-y-2 text-xs">
          {["91% average tracking health.", "Self-healing resolved 4 issues today.", "44 sites require attention."].map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sub"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />{s}</div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════ */
const BrandDashboard = ({ activeView, setActiveView }: BrandDashboardProps) => {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const brand = brands[selectedBrand];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <motion.div {...fade(0)} className="mb-8">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            {/* Brand selector */}
            <div className="relative inline-block">
              <button
                onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                className="flex items-center gap-2 text-heading text-2xl font-extrabold hover:text-primary transition-colors"
              >
                {brand.name}
                <ChevronDown className={`w-5 h-5 transition-transform ${brandDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {brandDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 z-30 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[240px]">
                  {brands.map((b, i) => (
                    <button
                      key={b.name}
                      onClick={() => { setSelectedBrand(i); setBrandDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors flex items-center justify-between ${i === selectedBrand ? "bg-primary/5 text-primary font-semibold" : "text-sub"}`}
                    >
                      <span>{b.name}</span>
                      <span className={`text-xs font-bold ${b.healthScore >= 90 ? "text-emerald-600" : b.healthScore >= 85 ? "text-primary" : "text-amber-600"}`}>{b.healthScore}/100</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sub text-sm">Brand Intelligence Dashboard · Last updated 2 min ago</p>
          </div>
        </div>
      </motion.div>

      <motion.div {...fade(0.05)} className="flex gap-2 mb-8 overflow-x-auto">
        {viewTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveView(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeView === tab ? "bg-primary/10 text-primary border border-primary/20" : "bg-card border border-border text-sub hover:text-heading"}`}>
            {tab}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={`${activeView}-${selectedBrand}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          {activeView === "Brand Team" && <BrandTeamView brand={brand} />}
          {activeView === "Analytics Team" && <AnalyticsTeamView brand={brand} />}
          {activeView === "Engineering" && <EngineeringView />}
          {activeView === "Leadership" && <LeadershipView brand={brand} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BrandDashboard;
