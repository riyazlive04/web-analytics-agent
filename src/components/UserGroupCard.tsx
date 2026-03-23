import { motion } from "framer-motion";
import type { UserGroup } from "@/data/engineData";

interface UserGroupCardProps {
  group: UserGroup;
  index: number;
}

const UserGroupCard = ({ group, index }: UserGroupCardProps) => {
  const Icon = group.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.9, duration: 0.4 }}
      className="card-elevated hover:card-elevated-hover rounded-2xl p-4 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-secondary/8 border border-secondary/15 flex items-center justify-center">
          <Icon className="w-4 h-4 text-secondary" />
        </div>
        <h4 className="text-heading text-sm font-bold">{group.title}</h4>
      </div>
      <div className="space-y-1.5">
        {group.widgets.map((widget) => (
          <div
            key={widget}
            className="flex items-center gap-2 text-xs text-sub"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {widget}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserGroupCard;
