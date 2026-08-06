import { motion } from "framer-motion";
import {
  CreditCard,
  TrendingUp,
  Target,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const cards = [
  {
    className: "loan-card",
    icon: CreditCard,
    title: "Loan Optimized",
    value: "₹12,450",
    subtitle: "Interest Saved",
    badge: "-18%",
    duration: 4,
    offset: -12,
  },
  {
    className: "investment-card",
    icon: TrendingUp,
    title: "Portfolio Growth",
    value: "+24.6%",
    subtitle: "This Year",
    badge: "▲",
    duration: 5,
    offset: 10,
  },
  {
    className: "goal-card",
    icon: Target,
    title: "Savings Goal",
    value: "82%",
    subtitle: "Completed",
    badge: "AI",
    duration: 4.5,
    offset: -15,
  },
];

const FloatingCards = () => {
  return (
    <>
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={index}
            className={`floating-card ${card.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, card.offset, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.15 },
              scale: { duration: 0.6, delay: index * 0.15 },
              y: {
                duration: card.duration,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="floating-icon">
              <Icon size={20} />
            </div>

            <div className="floating-content">
              <div className="floating-top">
                <h4>{card.title}</h4>

                <span className="floating-badge">
                  {card.badge}
                </span>
              </div>

              <div className="floating-value">
                {card.value}
              </div>

              <div className="floating-bottom">
                <span>{card.subtitle}</span>

                <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        className="floating-ai-dot"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Sparkles size={18} />
      </motion.div>
    </>
  );
};

export default FloatingCards;