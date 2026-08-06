import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const categories = [
  {
    name: "Needs",
    amount: "₹32,000",
    progress: 75,
  },
  {
    name: "Wants",
    amount: "₹12,500",
    progress: 48,
  },
  {
    name: "Savings",
    amount: "₹18,000",
    progress: 90,
  },
];

const BudgetProgress = () => {
  return (
    <motion.div
      className="budget-widget"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="widget-header">
        <div>
          <h4>Monthly Budget</h4>
          <span>July 2026</span>
        </div>

        <Wallet size={22} />
      </div>

      <div className="budget-summary">
        <h2>₹62,500</h2>
        <p>Spent of ₹80,000</p>
      </div>

      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: "78%" }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="progress-value">
        <span>78% Used</span>
        <span>₹17,500 Left</span>
      </div>

      <div className="budget-categories">
        {categories.map((item) => (
          <div
            key={item.name}
            className="budget-category"
          >
            <div className="budget-row">
              <span>{item.name}</span>
              <span>{item.amount}</span>
            </div>

            <div className="mini-progress">
              <motion.div
                className="mini-fill"
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetProgress;