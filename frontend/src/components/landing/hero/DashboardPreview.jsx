import { motion } from "framer-motion";

import DashboardHeader from "./DashboardHeader";
import LineChart from "./LineChart";
import BudgetProgress from "./BudgetProgress";
import SavingsGoal from "./SavingsGoal";
import RecentTransactions from "./RecentTransactions";
import AIInsight from "./AIInsight";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const DashboardPreview = () => {
  return (
    <motion.div
      className="dashboard-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <DashboardHeader />

      <LineChart />

      <div className="dashboard-widgets">
        <BudgetProgress />
        <SavingsGoal />
      </div>

      <RecentTransactions />

      <AIInsight />
    </motion.div>
  );
};

export default DashboardPreview;