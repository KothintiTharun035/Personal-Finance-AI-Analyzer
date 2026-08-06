import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage from "./ChatMessage";

export default function ChatBox({ messages,onSuggestionClick,}) {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

  }, [messages]);

  return (

    <div className="chat-box">

      {messages.length === 0 ? (

        <div className="chat-empty">

          <div className="chat-empty-icon">

            🤖

          </div>

          <h3>

            FinanceAI Advisor

          </h3>

          <p>

            Ask anything about your loans,
            investments, savings, budgets,
            expenses or financial goals.

          </p>

        </div>

      ) : (

        <AnimatePresence mode="popLayout">

          {messages.map((message) => (

            <motion.div

                key={message.id}

                layout

                style={{ width: "100%" }}

                initial={{
                    opacity:0,
                    y:15
                }}

                animate={{
                    opacity:1,
                    y:0
                }}

                exit={{
                    opacity:0
                }}

                transition={{
                    duration:.25
                }}

            >

              <ChatMessage

                message={message}
                onSuggestionClick={onSuggestionClick}

              />

            </motion.div>

          ))}

        </AnimatePresence>

      )}

      <div ref={bottomRef} />

    </div>

  );

}