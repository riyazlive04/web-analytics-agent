import { motion } from "framer-motion";
import { LayoutDashboard, Layers } from "lucide-react";
import { engines, userGroups } from "@/data/engineData";
import EngineCard from "./EngineCard";
import UserGroupCard from "./UserGroupCard";
import ConnectorLine from "./ConnectorLine";

interface ArchitectureViewProps {
  onSelectEngine: (id: string) => void;
}

const ArchitectureView = ({ onSelectEngine }: ArchitectureViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Canvas background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(181_72%_35%/0.04),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(220 13% 70%) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-5 tracking-wide uppercase">
              <Layers className="w-3.5 h-3.5" />
              Interactive Architecture Explorer
            </div>
            <h1 className="text-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              Analytics Intelligence Platform
            </h1>
            <p className="text-sub text-lg max-w-2xl mx-auto leading-relaxed">
              Enterprise Web Analytics Automation & Governance Layer
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20">
          {/* Engine label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-mono text-primary/70 tracking-widest">
              AUTOMATION ENGINES
            </div>
          </motion.div>

          {/* Engine cards - canvas style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-3">
            {engines.map((engine, i) => (
              <EngineCard
                key={engine.id}
                engine={engine}
                index={i}
                onClick={() => onSelectEngine(engine.id)}
              />
            ))}
          </div>

          {/* Connector */}
          <div className="flex justify-center gap-20">
            <ConnectorLine delay={0} />
            <ConnectorLine delay={0.6} />
            <ConnectorLine delay={1.2} />
          </div>

          {/* Dashboard layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="card-float rounded-2xl p-7 mb-3"
          >
            <div className="flex items-center gap-4 mb-1">
              <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-heading text-xl font-bold">Brand & Analytics Dashboard</h2>
                <p className="text-sm text-sub">Unified command center for all analytics intelligence</p>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center gap-16">
            <ConnectorLine delay={0.3} />
            <ConnectorLine delay={0.8} />
            <ConnectorLine delay={1.3} />
            <ConnectorLine delay={0.5} />
          </div>

          {/* User groups label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/5 border border-secondary/10 text-xs font-mono text-secondary/70 tracking-widest">
              USER GROUPS
            </div>
          </motion.div>

          {/* User group cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {userGroups.map((group, i) => (
              <UserGroupCard key={group.title} group={group} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitectureView;
