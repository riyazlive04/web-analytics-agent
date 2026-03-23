import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { EngineData } from "@/data/engineData";

interface EngineCardProps {
  engine: EngineData;
  index: number;
  onClick: () => void;
}

const EngineCard = ({ engine, index, onClick }: EngineCardProps) => {
  const Icon = engine.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.35, duration: 0.5, type: "spring", stiffness: 120 }}
      onClick={onClick}
      className="group card-elevated hover:card-elevated-hover rounded-2xl p-6 text-left transition-all duration-300 cursor-pointer w-full"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/12 group-hover:border-primary/30 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-heading text-sm font-bold mb-1 group-hover:text-primary transition-colors">
            {engine.shortTitle}
          </h3>
          <p className="text-xs text-sub leading-relaxed line-clamp-2">
            {engine.description}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 flex-shrink-0 mt-1" />
      </div>
    </motion.button>
  );
};

export default EngineCard;
