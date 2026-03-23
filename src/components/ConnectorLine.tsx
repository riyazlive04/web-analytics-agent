import { motion } from "framer-motion";

const ConnectorLine = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex justify-center py-2">
    <div className="relative w-px h-10">
      <div className="absolute inset-0 connector-gradient opacity-30" />
      <motion.div
        className="absolute w-full h-3 connector-gradient rounded-full glow-line"
        animate={{ y: [0, 28, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
      />
    </div>
  </div>
);

export default ConnectorLine;
