import { motion } from "framer-motion";
import { Target } from "lucide-react";

const radius = 48;
const circumference = 2 * Math.PI * radius;

const progress = 72;

const offset =
  circumference - (progress / 100) * circumference;

const SavingsGoal = () => {
  return (
    <motion.div
      className="goal-widget"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      <div className="widget-header">
        <div>
          <h4>Savings Goal</h4>
          <span>Emergency Fund</span>
        </div>

        <Target size={22} />
      </div>

      <div className="goal-circle">

        <svg width="120" height="120">

          <circle
            cx="60"
            cy="60"
            r={radius}
            className="goal-track"
          />

          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            className="goal-progress"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{
              strokeDashoffset: offset,
            }}
            transition={{
              duration: 1.5,
            }}
          />

        </svg>

        <span>{progress}%</span>

      </div>

      <div className="goal-details">

        <h3>₹3.6L Saved</h3>

        <p>Target ₹5L</p>

      </div>

      <div className="goal-footer">

        <div>
          <strong>₹1.4L</strong>
          <span>Remaining</span>
        </div>

        <div>
          <strong>8 Months</strong>
          <span>Est. Time</span>
        </div>

      </div>

    </motion.div>
  );
};

export default SavingsGoal;