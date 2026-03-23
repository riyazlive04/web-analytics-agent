import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import type { EngineData } from "@/data/engineData";

interface EngineFlowViewProps {
  engine: EngineData;
  onBack: () => void;
}

const EngineFlowView = ({ engine, onBack }: EngineFlowViewProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const step = engine.steps[activeStep];
  const StepIcon = step.icon;
  const EngineIcon = engine.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.15 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-background"
    >
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(181_72%_35%/0.03),transparent_50%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-border bg-card/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-sub hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Architecture
          </button>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
              <EngineIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-heading text-sm font-bold">{engine.title}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Horizontal pipeline */}
        <div className="flex items-center justify-center gap-1 mb-16 overflow-x-auto px-4">
          {engine.steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <div key={i} className="flex items-center">
                <motion.button
                  onClick={() => setActiveStep(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex flex-col items-center gap-2.5 px-3 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 border-2 border-primary/40 glow-accent-strong"
                        : isPast
                        ? "bg-primary/5 border border-primary/15"
                        : "bg-muted border border-border"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? "text-primary" : isPast ? "text-primary/60" : "text-muted-foreground"}`} />
                  </motion.div>
                  <span className={`text-[11px] font-semibold max-w-[85px] text-center leading-tight ${
                    isActive ? "text-primary" : "text-sub"
                  }`}>
                    {s.title}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="step-indicator"
                      className="absolute -bottom-0.5 w-8 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
                {i < engine.steps.length - 1 && (
                  <div className="flex items-center mx-1">
                    <motion.div
                      className={`w-10 h-[2px] rounded-full transition-colors duration-300 ${isPast ? "bg-primary/30" : "bg-border"}`}
                    />
                    <ChevronRight className={`w-3 h-3 -ml-1 ${isPast ? "text-primary/40" : "text-border"}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="card-float rounded-3xl p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-7 glow-accent-strong">
                <StepIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="font-mono text-xs text-primary/50 mb-2 tracking-widest">STEP {activeStep + 1} OF {engine.steps.length}</div>
              <h2 className="text-heading text-2xl font-extrabold mb-4">{step.title}</h2>
              <p className="text-sub leading-relaxed text-base">{step.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl card-elevated text-sm font-medium text-sub hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={() => setActiveStep(Math.min(engine.steps.length - 1, activeStep + 1))}
            disabled={activeStep === engine.steps.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/8 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/12 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EngineFlowView;
