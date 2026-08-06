import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, ArrowRight } from "lucide-react";

const AIInsight = () => {
  return (
    <motion.div
      className="ai-insight"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="ai-header">
        <div className="ai-title">
          <div className="ai-icon">
            <BrainCircuit size={22} />
          </div>

          <div>
            <h4>AI Financial Insight</h4>
            <span>Updated just now</span>
          </div>
        </div>

        <div className="ai-score">
          <Sparkles size={16} />
          <span>92%</span>
        </div>
      </div>

      <p className="ai-message">
        Great progress! Your savings increased by{" "}
        <strong>18%</strong> this month. Reducing discretionary
        spending by another <strong>₹3,000</strong> could help
        you reach your emergency fund nearly
        <strong> 2 months earlier.</strong>
      </p>

      <div className="ai-actions">
        <button className="ai-btn">
          View Recommendations

          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default AIInsight;