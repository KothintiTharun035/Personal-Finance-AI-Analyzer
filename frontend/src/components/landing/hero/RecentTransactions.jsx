import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    icon: ShoppingBag,
    title: "Amazon Shopping",
    date: "Today • 10:42 AM",
    amount: "- ₹2,499",
    type: "expense",
  },
  {
    id: 2,
    icon: ArrowDownLeft,
    title: "Salary Credited",
    date: "Yesterday • 09:00 AM",
    amount: "+ ₹65,000",
    type: "income",
  },
  {
    id: 3,
    icon: Landmark,
    title: "Mutual Fund SIP",
    date: "28 Jul • 08:15 AM",
    amount: "- ₹5,000",
    type: "expense",
  },
  {
    id: 4,
    icon: ArrowUpRight,
    title: "Interest Earned",
    date: "25 Jul • 04:20 PM",
    amount: "+ ₹1,250",
    type: "income",
  },
];

const RecentTransactions = () => {
  return (
    <motion.div
      className="transactions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="transactions-header">
        <h4>Recent Transactions</h4>
        <button className="view-all-btn">
          View All
        </button>
      </div>

      {transactions.map((transaction, index) => {
        const Icon = transaction.icon;

        return (
          <motion.div
            key={transaction.id}
            className="transaction"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1,
            }}
          >
            <div className="transaction-left">
              <div className="transaction-icon">
                <Icon size={20} />
              </div>

              <div>
                <h5>{transaction.title}</h5>
                <p>{transaction.date}</p>
              </div>
            </div>

            <span className={transaction.type}>
              {transaction.amount}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default RecentTransactions;