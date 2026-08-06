import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function TypingIndicator() {

  return (

    <motion.div

      className="chat-message assistant-message"

      initial={{
        opacity: 0,
        y: 12,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: .25,
      }}

    >

      {/* ======================================
          AI Avatar
      ====================================== */}

      <div className="chat-avatar assistant-avatar">

        <BrainCircuit size={20} />

      </div>

      {/* ======================================
          Typing Bubble
      ====================================== */}

      <div className="message-bubble assistant-bubble typing-bubble">

        <div className="message-header">

          <span className="assistant-name">

            🤖 FinanceAI

          </span>

          <span className="typing-status">

            Thinking...

          </span>

        </div>

        <div className="typing-text">

          I'm analyzing your financial information and preparing the
          best recommendation for you.

        </div>

        <div className="typing-dots">

          <span></span>

          <span></span>

          <span></span>

        </div>

      </div>

    </motion.div>

  );

}