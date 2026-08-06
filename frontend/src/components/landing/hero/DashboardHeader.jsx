import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";

const DashboardHeader = () => {
  return (
    <motion.div
      className="dashboard-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <span className="dashboard-label">
          Welcome back 👋
        </span>

        <h2>₹12,48,750</h2>
      </div>

      <motion.div
        className="dashboard-score"
        whileHover={{ scale: 1.05 }}
      >
        <TrendingUp size={18} />

        <span>+12.8%</span>

        <Sparkles size={16} />
      </motion.div>
    </motion.div>
  );
};

export default DashboardHeader;