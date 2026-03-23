import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck, GitCompareArrows, Shield, Microscope, Wrench,
  RefreshCw, Sparkles, Rocket, ArrowLeft, Bot, ArrowRight,
  CheckCircle2, X, ChevronRight, AlertCircle, Loader2,
  Search, FileCode, TrendingUp, ShieldCheck, Lock, Unlock,
  MonitorCheck, Eye, Zap, MousePointerClick, SlidersHorizontal, UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

/* ═══════════════════════════════════════
   Agent config
   — Miller's Law: 8 items chunked into 4 groups of 2-3
   — Hick's Law: categories reduce cognitive load
   ═══════════════════════════════════════ */
interface Agent {
  id: string;
  title: string;
  icon: any;
  tagline: string;
  outcome: string;
  simIndex: number;
}

interface AgentGroup {
  label: string;
  icon: any;
  agents: Agent[];
}

const allAgents: Agent[] = [
  { id: "data-validation", title: "Data Validation Agent", icon: ClipboardCheck, tagline: "Validates dataLayer quality", outcome: "Ensures clean and reliable data", simIndex: 0 },
  { id: "measurement-governance", title: "Measurement Governance Engine", icon: GitCompareArrows, tagline: "Enforces measurement standards", outcome: "Ensures consistent tracking across sites", simIndex: 1 },
  { id: "consent-compliance", title: "Consent & Compliance Monitor", icon: Shield, tagline: "Validates consent compliance", outcome: "Ensures privacy compliance", simIndex: 2 },
  { id: "root-cause", title: "Root Cause Analyzer", icon: Microscope, tagline: "Investigates tracking issues", outcome: "Identifies source of tracking issues", simIndex: 3 },
  { id: "automation-copilot", title: "Automation Copilot", icon: Wrench, tagline: "Generates fix suggestions", outcome: "Guides accurate implementation", simIndex: 4 },
  { id: "auto-remediation", title: "Auto-Remediation Engine", icon: RefreshCw, tagline: "Deploys fixes automatically", outcome: "Resolves issues automatically", simIndex: 5 },
  { id: "analytics-insights", title: "Analytics Insights Engine", icon: Sparkles, tagline: "Generates business insights", outcome: "Drives business decisions", simIndex: 6 },
  { id: "launch-readiness", title: "Launch Readiness Validator", icon: Rocket, tagline: "Validates pre-launch readiness", outcome: "Ensures successful launches", simIndex: 7 },
];

/* Law of Common Region + Miller's Law: group into digestible chunks */
const groups: AgentGroup[] = [
  { label: "Monitor", icon: Eye, agents: allAgents.slice(0, 3) },
  { label: "Analyze", icon: Microscope, agents: [allAgents[3]] },
  { label: "Fix", icon: Zap, agents: [allAgents[4], allAgents[5]] },
  { label: "Insights & Launch", icon: Sparkles, agents: [allAgents[6], allAgents[7]] },
];

/* ═══════════════════════════════════════
   Shared: overlay text sequencer
   ═══════════════════════════════════════ */
const useTextSequence = (texts: string[], intervalMs = 2200) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % texts.length; setIdx(i); }, intervalMs);
    return () => clearInterval(t);
  }, [texts, intervalMs]);
  return texts[idx];
};

const OverlayText = ({ text }: { text: string }) => (
  <AnimatePresence mode="wait">
    <motion.div key={text} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
      className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur border border-primary/15 rounded-lg px-3 py-1.5 shadow-sm">
      <span className="text-[11px] font-semibold text-primary flex items-center gap-1.5">
        <Loader2 className="w-3 h-3 animate-spin" />{text}
      </span>
    </motion.div>
  </AnimatePresence>
);

/* ═══════════════════════════════════════
   8 Agent simulations (unchanged logic)
   ═══════════════════════════════════════ */

const DataValidationSim = () => {
  const overlay = useTextSequence(["Scanning dataLayer…", "Invalid parameter detected", "Validation complete"], 2000);
  const [phase, setPhase] = useState(0);
  useEffect(() => { const loop = () => { setPhase(0); setTimeout(() => setPhase(1), 1500); setTimeout(() => setPhase(2), 3500); }; loop(); const t = setInterval(loop, 6000); return () => clearInterval(t); }, []);
  const rows = [{ tag: "page_view", ok: true }, { tag: "purchase", ok: false }, { tag: "add_to_cart", ok: true }, { tag: "begin_checkout", ok: false }, { tag: "sign_up", ok: true }];
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/4 to-transparent">
      <OverlayText text={overlay} />
      {[0,1,2,3,4].map(i => (<motion.div key={i} className="absolute h-px rounded-full" style={{ top:`${12+i*18}%`, width:"55%", background:`linear-gradient(90deg,transparent,hsl(181 69% 35%/${0.06+i*0.025}),transparent)` }} animate={{ x:["-55%","155%"] }} transition={{ duration:2.5+i*0.3, repeat:Infinity, ease:"linear", delay:i*0.35 }} />))}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12 space-y-1.5">
        {rows.map((r,i) => { const err = !r.ok && phase >= 1; const fixed = !r.ok && phase >= 2; return (
          <motion.div key={i} initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}
            className={`w-full max-w-xs flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-500 ${fixed?"bg-emerald-50/70 border-emerald-200/60":err?"bg-red-50/70 border-red-200/60":"bg-white/60 border-border/40"}`}>
            <span className="font-mono text-[11px] text-heading w-24">{r.tag}</span>
            <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden"><motion.div className={`h-full rounded-full transition-colors duration-500 ${fixed?"bg-emerald-400":err?"bg-red-400":"bg-primary/30"}`} initial={{width:0}} animate={{width:"100%"}} transition={{duration:0.6,delay:0.2+i*0.1}} /></div>
            {phase===0 && <Loader2 className="w-3.5 h-3.5 text-primary/30 animate-spin flex-shrink-0"/>}
            {err && !fixed && <motion.div initial={{scale:0}} animate={{scale:1}}><AlertCircle className="w-3.5 h-3.5 text-red-500"/></motion.div>}
            {(r.ok&&phase>=1||fixed) && <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:400}}><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/></motion.div>}
          </motion.div>
        ); })}
      </div>
    </div>
  );
};

const MeasurementGovernanceSim = () => {
  const overlay = useTextSequence(["Checking measurement plan…", "Mismatch detected", "Standard enforced"], 2000);
  const [phase, setPhase] = useState(0);
  useEffect(() => { const loop = () => { setPhase(0); setTimeout(()=>setPhase(1),1600); setTimeout(()=>setPhase(2),3600); }; loop(); const t=setInterval(loop,6000); return ()=>clearInterval(t); }, []);
  const events = [{ expected: "product_view", actual: "productview", match: false }, { expected: "add_to_cart", actual: "add_to_cart", match: true }, { expected: "purchase", actual: "purchase", match: true }, { expected: "sign_up", actual: "signup", match: false }];
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/4 to-transparent">
      <OverlayText text={overlay} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12">
        <div className="w-full max-w-sm space-y-2">
          <div className="grid grid-cols-[1fr_20px_1fr] gap-1 text-[9px] font-mono text-muted-foreground px-2 mb-1"><span>Expected</span><span/><span>Actual</span></div>
          {events.map((e,i) => { const revealed = phase >= 1; const corrected = phase >= 2 && !e.match; return (
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
              className={`grid grid-cols-[1fr_20px_1fr] gap-1 items-center px-2 py-2 rounded-lg border transition-all duration-500 ${corrected?"bg-emerald-50/60 border-emerald-200/50":revealed&&!e.match?"bg-red-50/60 border-red-200/50":"bg-white/50 border-border/30"}`}>
              <span className="font-mono text-[11px] text-heading">{e.expected}</span>
              <div className="flex justify-center">
                {!revealed ? <Loader2 className="w-3 h-3 text-primary/30 animate-spin"/> : corrected || e.match ? <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring"}}><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/></motion.div> : <motion.div initial={{scale:0}} animate={{scale:1}}><X className="w-3.5 h-3.5 text-red-400"/></motion.div>}
              </div>
              <span className={`font-mono text-[11px] transition-all duration-500 ${corrected?"text-emerald-700 font-semibold":revealed&&!e.match?"text-red-600 line-through":"text-heading"}`}>{corrected ? e.expected : e.actual}</span>
            </motion.div>
          ); })}
        </div>
      </div>
    </div>
  );
};

const ConsentComplianceSim = () => {
  const overlay = useTextSequence(["Checking consent status…", "Blocked before consent", "Compliance enforced"], 2200);
  const [phase, setPhase] = useState(0);
  useEffect(() => { const loop = () => { setPhase(0); setTimeout(()=>setPhase(1),1800); setTimeout(()=>setPhase(2),4000); }; loop(); const t=setInterval(loop,6500); return ()=>clearInterval(t); }, []);
  const tags = ["GA4 Config","Meta Pixel","Google Ads"];
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/4 to-transparent">
      <OverlayText text={overlay} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12 gap-4">
        <motion.div animate={{scale:phase===1?1.05:1}} className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all duration-500 ${phase===0?"bg-muted/60 border-border text-muted-foreground":phase===1?"bg-red-50 border-red-200 text-red-700":"bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
          {phase<2?<Lock className="w-3.5 h-3.5"/>:<Unlock className="w-3.5 h-3.5"/>}
          {phase===0?"Consent: Pending":phase===1?"Consent: Not Given":"Consent: Granted"}
        </motion.div>
        <div className="w-full max-w-xs space-y-1.5">
          {tags.map((tag,i) => (
            <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.1+i*0.08}}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-500 ${phase===0?"bg-white/50 border-border/30":phase===1?"bg-red-50/50 border-red-200/50":"bg-emerald-50/50 border-emerald-200/50"}`}>
              <span className="text-[11px] font-medium text-heading">{tag}</span>
              {phase===0 && <Loader2 className="w-3 h-3 text-primary/30 animate-spin"/>}
              {phase===1 && <motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1 text-[9px] font-bold text-red-600"><ShieldCheck className="w-3 h-3"/> BLOCKED</motion.div>}
              {phase===2 && <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:i*0.1}} className="flex items-center gap-1 text-[9px] font-bold text-emerald-600"><CheckCircle2 className="w-3 h-3"/> FIRING</motion.div>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RootCauseSim = () => {
  const overlay = useTextSequence(["Analyzing issue…", "Scanning changes…", "Root cause identified"], 1800);
  const logs = [{t:"GTM v128 published",hl:false},{t:"checkout.html updated",hl:true},{t:"purchase trigger changed",hl:true},{t:"deploy v2.4.1",hl:false},{t:"consent: no changes",hl:false}];
  const [scan, setScan] = useState(-1);
  useEffect(() => { const loop = () => { setScan(-1); let i=0; const id=setInterval(()=>{ setScan(i); i++; if(i>=logs.length)clearInterval(id); },550); }; loop(); const t=setInterval(loop,6000); return ()=>clearInterval(t); }, []);
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-50/80 to-transparent">
      <OverlayText text={overlay} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12">
        <div className="w-full max-w-sm space-y-1 font-mono text-[10px]">
          {logs.map((l,i) => { const reached=i<=scan; const found=reached&&l.hl; const active=i===scan; return (
            <motion.div key={i} animate={{opacity:reached?1:0.2,backgroundColor:active?"hsl(181 69% 35%/0.06)":found?"hsl(0 84% 60%/0.05)":"transparent"}}
              transition={{duration:0.2}} className={`px-2.5 py-2 rounded-lg flex items-center gap-2 ${found?"border border-red-200/60":"border border-transparent"}`}>
              <Search className={`w-3 h-3 flex-shrink-0 ${active?"text-primary":found?"text-red-500":"text-muted-foreground/25"}`}/>
              <span className={found?"text-red-600 font-semibold":reached?"text-heading":"text-muted-foreground/30"}>{l.t}</span>
              {found && <motion.span initial={{scale:0}} animate={{scale:1}} className="ml-auto text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">CAUSE</motion.span>}
            </motion.div>
          ); })}
        </div>
      </div>
    </div>
  );
};

const CopilotSim = () => {
  const overlay = useTextSequence(["Generating fix…", "Suggested configuration ready"], 2500);
  const code = 'Tag: GA4 Event — purchase\nTrigger: "checkout_complete"\nSelector: button[data-action="complete-purchase"]';
  const [chars, setChars] = useState(0);
  useEffect(() => { const loop = () => { setChars(0); const id=setInterval(()=>setChars(p=>{if(p>=code.length){clearInterval(id);return p;}return p+1;}),30); }; loop(); const t=setInterval(loop,7000); return ()=>clearInterval(t); }, []);
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-[#1e1e2e]">
      <div className="absolute top-3 left-3 z-10 bg-[#181825]/90 border border-white/10 rounded-lg px-3 py-1.5">
        <span className="text-[11px] font-semibold text-secondary/80 flex items-center gap-1.5"><FileCode className="w-3 h-3"/>
          <AnimatePresence mode="wait"><motion.span key={overlay} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:0.2}}>{overlay}</motion.span></AnimatePresence>
        </span>
      </div>
      <div className="flex items-center gap-1.5 absolute top-3.5 right-3"><div className="w-2 h-2 rounded-full bg-red-400/70"/><div className="w-2 h-2 rounded-full bg-amber-400/70"/><div className="w-2 h-2 rounded-full bg-emerald-400/70"/></div>
      <div className="relative z-10 flex items-center justify-center h-full p-5 pt-14">
        <pre className="font-mono text-[12px] leading-[1.9] text-[#a6e3a1] whitespace-pre-wrap max-w-sm">
          {code.substring(0,chars)}
          {chars>0&&chars<code.length&&<motion.span className="inline-block w-[6px] h-[14px] bg-secondary/70 ml-px align-middle" animate={{opacity:[1,0]}} transition={{duration:0.5,repeat:Infinity}}/>}
        </pre>
      </div>
    </div>
  );
};

const RemediationSim = () => {
  const overlay = useTextSequence(["Applying fix…", "Deployment successful"], 2800);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => { const loop = () => { setPct(0); setDone(false); const id=setInterval(()=>setPct(p=>{if(p>=100){setDone(true);clearInterval(id);return 100;}return p+2;}),45); }; loop(); const t=setInterval(loop,7000); return ()=>clearInterval(t); }, []);
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/60 to-transparent">
      <OverlayText text={overlay} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12 gap-4">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="bar" exit={{opacity:0}} className="w-full max-w-xs space-y-3">
              <div className="w-full h-3 rounded-full bg-emerald-100 border border-emerald-200 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{width:`${pct}%`}}/></div>
              <div className="flex justify-between text-[10px] text-emerald-600 font-mono"><span>Deploying…</span><span>{pct}%</span></div>
              {[{l:"Create tag",th:25},{l:"Configure trigger",th:50},{l:"Publish workspace",th:90}].map((m,i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  {pct>=m.th ? <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:400}}><CheckCircle2 className="w-3 h-3 text-emerald-500"/></motion.div> : <div className="w-3 h-3 rounded-full border border-emerald-300"/>}
                  <span className={pct>=m.th?"text-emerald-700 font-medium":"text-emerald-400"}>{m.l}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="ok" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} className="flex flex-col items-center gap-2">
              <motion.div initial={{scale:0}} animate={{scale:[0,1.3,1]}} transition={{duration:0.5}}><CheckCircle2 className="w-12 h-12 text-emerald-500"/></motion.div>
              <span className="text-sm font-bold text-emerald-700">Fix Deployed</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const InsightsSim = () => {
  const overlay = useTextSequence(["Analyzing trends…", "Insight generated"], 2500);
  const bars = [28,32,25,22,38,50,62,72,78,85];
  const insight = "Conversion rate improved by 42%";
  const [ch, setCh] = useState(0);
  useEffect(() => { const loop = () => { setCh(0); const d=setTimeout(()=>{const id=setInterval(()=>setCh(p=>p>=insight.length?p:p+1),28);},1200); return ()=>clearTimeout(d); }; loop(); const t=setInterval(loop,7000); return ()=>clearInterval(t); }, []);
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-secondary/4 to-transparent">
      <OverlayText text={overlay} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12 gap-3">
        <div className="flex items-end gap-1.5 h-20 w-full max-w-xs">
          {bars.map((h,i) => (<motion.div key={i} className="flex-1 rounded-t min-w-0" style={{background:i<4?"hsl(0 84% 60%/0.25)":`hsl(231 80% 62%/${0.25+(i-4)*0.07})`}} initial={{height:0}} animate={{height:`${h}%`}} transition={{duration:0.5,delay:0.15+i*0.08,ease:[0.22,1,0.36,1]}} />))}
        </div>
        <div className="flex justify-between w-full max-w-xs text-[8px] text-muted-foreground"><span>Before</span><span className="text-red-400">↑ Fix</span><span>After</span></div>
        <div className="p-2.5 rounded-lg bg-secondary/5 border border-secondary/10 w-full max-w-xs">
          <div className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-secondary flex-shrink-0"/>
            <p className="text-[10px] text-heading font-semibold">{insight.substring(0,ch)}{ch>0&&ch<insight.length&&<motion.span className="inline-block w-[5px] h-[11px] bg-secondary/60 ml-px align-middle" animate={{opacity:[1,0]}} transition={{duration:0.5,repeat:Infinity}}/>}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LaunchReadinessSim = () => {
  const overlay = useTextSequence(["Validating website…", "Readiness score calculated"], 2500);
  const checks = ["Analytics tags","Event coverage","Parameter quality","Consent setup","Data flow"];
  const [done, setDone] = useState<boolean[]>(checks.map(()=>false));
  const [score, setScore] = useState(0);
  useEffect(() => { const loop = () => { setDone(checks.map(()=>false)); setScore(0); checks.forEach((_,i) => setTimeout(()=>{ setDone(p=>{const n=[...p];n[i]=true;return n;}); setScore(Math.round(((i+1)/checks.length)*92)); }, 800+i*700)); }; loop(); const t=setInterval(loop,7000); return ()=>clearInterval(t); }, []);
  const allDone = done.every(Boolean);
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/4 to-transparent">
      <OverlayText text={overlay} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 pt-12 gap-3">
        <div className="w-full max-w-xs space-y-1.5">
          {checks.map((c,i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded border border-primary/20 flex items-center justify-center bg-white flex-shrink-0">
                <AnimatePresence>{done[i]&&<motion.div initial={{scale:0,rotate:-90}} animate={{scale:1,rotate:0}} transition={{type:"spring",stiffness:400,damping:15}}><CheckCircle2 className="w-4 h-4 text-emerald-500"/></motion.div>}</AnimatePresence>
              </div>
              <motion.span animate={{opacity:done[i]?1:0.3}} className={`text-[11px] ${done[i]?"text-heading font-medium":"text-muted-foreground"}`}>{c}</motion.span>
            </div>
          ))}
        </div>
        <motion.div animate={{scale:allDone?1.05:1}} className={`px-4 py-2 rounded-xl border text-sm font-extrabold transition-all duration-500 ${allDone?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-muted/60 border-border text-heading"}`}>
          Readiness: {score}%{allDone && <motion.span initial={{opacity:0}} animate={{opacity:1}} className="ml-2 text-[10px] font-bold">— APPROVED</motion.span>}
        </motion.div>
      </div>
    </div>
  );
};

const simulations: Record<string, React.FC> = {
  "data-validation": DataValidationSim, "measurement-governance": MeasurementGovernanceSim,
  "consent-compliance": ConsentComplianceSim, "root-cause": RootCauseSim,
  "automation-copilot": CopilotSim, "auto-remediation": RemediationSim,
  "analytics-insights": InsightsSim, "launch-readiness": LaunchReadinessSim,
};

/* ═══════════════════════════════════════
   Agent Card
   — Fitts's Law: large touch targets (full card is clickable)
   — Aesthetic-Usability: polish, glow, spring hover
   — Von Restorff: pulse dot makes cards feel alive
   ═══════════════════════════════════════ */
const AgentCard = ({ agent, index, onClick, explored }: { agent: Agent; index: number; onClick: () => void; explored: boolean }) => {
  const Icon = agent.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.4, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative card-elevated hover:card-elevated-hover rounded-2xl p-5 text-left transition-shadow duration-200 cursor-pointer w-full overflow-hidden"
    >
      <motion.div className="absolute -inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{boxShadow:"0 0 30px hsl(181 69% 35%/0.12)"}} />
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/12 group-hover:border-primary/30 transition-all duration-200">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-heading text-sm font-bold group-hover:text-primary transition-colors duration-150 leading-tight mb-0.5">{agent.title}</h3>
            <p className="text-[11px] text-sub leading-relaxed">{agent.tagline}</p>
          </div>
        </div>
        {/* Fitts's Law: large, visible CTA area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-primary/60 group-hover:text-primary font-semibold transition-colors duration-150">
            <MousePointerClick className="w-3 h-3" />
            <span>Explore agent</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-150" />
          </div>
          {/* Zeigarnik Effect: explored badge */}
          {explored && (
            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">EXPLORED</span>
          )}
        </div>
      </div>
      {/* Von Restorff: live pulse */}
      <div className="absolute top-3.5 right-3.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/60" />
        </span>
      </div>
    </motion.button>
  );
};

/* ═══════════════════════════════════════
   Agent Modal
   — Peak-End Rule: strong animated outcome at the end
   — Doherty Threshold: <400ms open animation
   — Aesthetic-Usability: polished, delightful close
   ═══════════════════════════════════════ */
const AgentModal = ({ agent, onClose }: { agent: Agent; onClose: () => void }) => {
  const Icon = agent.icon;
  const Sim = simulations[agent.id];

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.15}} className="fixed inset-0 z-50 flex items-start justify-center pt-6 pb-8 px-4 overflow-y-auto" onClick={onClose}>
      <motion.div className="fixed inset-0 bg-black/25 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
      <motion.div
        initial={{opacity:0,y:24,scale:0.96}}
        animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:16,scale:0.96}}
        transition={{duration:0.3,ease:[0.22,1,0.36,1]}}
        onClick={e=>e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors duration-150"><X className="w-4 h-4 text-muted-foreground"/></button>
        {/* Header */}
        <div className="px-6 pt-6 pb-3 flex items-center gap-3">
          <motion.div initial={{scale:0.6}} animate={{scale:1}} transition={{type:"spring",stiffness:250,damping:15}}
            className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <Icon className="w-5.5 h-5.5 text-primary"/>
          </motion.div>
          <div>
            <h2 className="text-heading text-lg font-extrabold">{agent.title}</h2>
            <p className="text-[11px] text-sub">{agent.tagline}</p>
          </div>
        </div>
        {/* React simulation */}
        <div className="px-4 pb-3">{Sim && <Sim />}</div>
        {/* Dark-themed HTML simulation */}
        <div className="px-4 pb-2">
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.3}} className="rounded-xl overflow-hidden border border-border/50">
            <iframe key={agent.id} src={`/agent-sims.html?agent=${agent.simIndex}`} className="w-full border-0 rounded-xl" style={{height:260,background:"#07070F"}} title={`${agent.title} simulation`}/>
          </motion.div>
        </div>
        {/* Peak-End Rule: strong, memorable outcome */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.3}} className="px-6 pb-6 pt-3">
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/15">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0"/>
            <span className="text-sm font-bold text-primary">{agent.outcome}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   Page
   — Jakob's Law: familiar card grid layout
   — Goal-Gradient + Zeigarnik: exploration progress bar
   — Serial Position: hero + footer emphasis
   — Law of Pragnanz: minimal, clear hierarchy
   — Postel's Law: forgiving click targets
   ═══════════════════════════════════════ */
const AgentsFlow = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Agent|null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());

  const handleSelect = (agent: Agent) => {
    setSelected(agent);
    setExplored(prev => new Set(prev).add(agent.id));
  };

  const progress = explored.size / allAgents.length;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(181_69%_35%/0.04),transparent_60%)]"/>
        <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:`radial-gradient(circle,hsl(220 13% 55%) 1px,transparent 1px)`,backgroundSize:"40px 40px"}}/>
      </div>

      {/* Header — Doherty Threshold: instant visual feedback on nav */}
      <div className="sticky top-0 z-40 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={()=>navigate("/")} className="flex items-center gap-1.5 text-xs font-medium text-sub hover:text-primary transition-colors duration-150"><ArrowLeft className="w-3.5 h-3.5"/> Back</button>
            <div className="w-px h-4 bg-border"/>
            <img src={logo} alt="Sirah Digital" className="w-7 h-7 rounded-lg object-cover"/>
            <span className="text-heading text-sm font-bold hidden sm:block">Sirah Digital</span>
          </div>
          {/* Goal-Gradient: progress indicator */}
          {explored.size > 0 && (
            <motion.div initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} className="flex items-center gap-2.5">
              <span className="text-[10px] font-semibold text-sub">{explored.size} / {allAgents.length} explored</span>
              <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div className="h-full rounded-full bg-primary" animate={{width:`${progress*100}%`}} transition={{duration:0.3}}/>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Hero — Serial Position Effect: memorable first impression */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-center mb-10">
          <motion.div
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{delay:0.1,duration:0.3}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-4 tracking-wide uppercase"
          >
            <Bot className="w-3.5 h-3.5"/> Live Architecture
          </motion.div>
          <h1 className="text-heading text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Web Analytics Agent Architecture</h1>

          {/* Von Restorff Effect: animated CTA that stands out */}
          <motion.div
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.3,duration:0.4}}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary/8 border border-primary/20"
          >
            <motion.div
              animate={{x:[0,4,0]}}
              transition={{duration:1.5,repeat:Infinity,ease:"easeInOut"}}
            >
              <MousePointerClick className="w-4 h-4 text-primary"/>
            </motion.div>
            <span className="text-sm font-semibold text-primary">
              Tap any agent to watch it simulate live
            </span>
            <motion.div
              animate={{scale:[1,1.2,1],opacity:[0.5,1,0.5]}}
              transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}
              className="w-2 h-2 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>

        {/* Agent groups — Law of Common Region + Proximity */}
        <div className="space-y-8">
          {groups.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.label}
                initial={{opacity:0,y:16}}
                animate={{opacity:1,y:0}}
                transition={{delay:0.15+gi*0.08}}
              >
                {/* Group label — Law of Similarity */}
                <div className="flex items-center gap-2 mb-3 ml-1">
                  <div className="w-6 h-6 rounded-md bg-primary/8 border border-primary/10 flex items-center justify-center">
                    <GroupIcon className="w-3 h-3 text-primary/70"/>
                  </div>
                  <span className="text-[11px] font-bold text-primary/60 tracking-widest uppercase">{group.label}</span>
                  <div className="flex-1 h-px bg-border/40 ml-2"/>
                </div>

                {/* Cards grid — Law of Proximity: tight within group */}
                <div className={`grid gap-3 ${
                  group.agents.length === 3 ? "grid-cols-1 md:grid-cols-3" :
                  group.agents.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {group.agents.map((agent, i) => (
                    <AgentCard key={agent.id} agent={agent} index={gi*3+i} onClick={() => handleSelect(agent)} explored={explored.has(agent.id)} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Human-in-the-loop trust banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 mx-auto max-w-xl"
        >
          <div className="relative rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 p-5 overflow-hidden">
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent 0%, hsl(181 69% 35% / 0.06) 50%, transparent 100%)", backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-heading">Human-in-the-Loop Controls</span>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/8 border border-primary/15 text-[8px] font-bold text-primary tracking-wider">
                    <UserCheck className="w-2.5 h-2.5" /> CONFIGURABLE
                  </span>
                </div>
                <p className="text-[11px] text-sub leading-relaxed">
                  Automation levels can be configured with human-in-the-loop controls — every agent supports manual review, approval gates, and adjustable autonomy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}} className="text-center mt-10 pb-8">
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide">Powered by Sirah Digital AI Architecture</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <AgentModal agent={selected} onClose={()=>setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default AgentsFlow;
