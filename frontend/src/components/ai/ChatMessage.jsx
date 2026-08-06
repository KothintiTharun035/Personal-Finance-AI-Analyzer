import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Bot, User } from "lucide-react";

export default function ChatMessage({ message, onSuggestionClick,}) {

  const isUser = message.role === "user";

  const [copied, setCopied] = useState(false);

  async function handleCopy() {

    try {

      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div
      className={`chat-message ${
        isUser
          ? "user-message"
          : "assistant-message"
      }`}
    >

      {/* ======================================
          AI Avatar
      ====================================== */}

      {!isUser && (

        <div className="chat-avatar assistant-avatar">

          <Bot size={20} />

        </div>

      )}

      {/* ======================================
          Bubble
      ====================================== */}

      <div
        className={`message-bubble ${
          isUser
            ? "user-bubble"
            : "assistant-bubble"
        }`}
      >

        {/* ======================================
            Header
        ====================================== */}

        {!isUser && (

          <div className="message-header">

            <span className="assistant-name">

              🤖 FinanceAI

            </span>

            <button

              className="copy-btn"

              onClick={handleCopy}

              title="Copy response"

            >

              {copied ? (

                <Check size={16} />

              ) : (

                <Copy size={16} />

              )}

            </button>

          </div>

        )}

        {/* ======================================
            Message
        ====================================== */}

        <div className="message-content">

          {isUser ? (

            <p>

              {message.content}

            </p>

          ) : (

            <ReactMarkdown

              remarkPlugins={[remarkGfm]}

            >

              {message.content}

            </ReactMarkdown>

          )}

        </div>


        {!isUser &&
              message.suggestions &&
              message.suggestions.length > 0 && (

              <div className="message-suggestions">

                  {message.suggestions.map((suggestion, index) => (

                      <button
                          key={index}
                          className="suggestion-chip"
                          onClick={() => onSuggestionClick(suggestion)}
                      >
                          {suggestion}
                      </button>

                  ))}

              </div>

          )}

      </div>

      {/* ======================================
          User Avatar
      ====================================== */}

      {isUser && (

        <div className="chat-avatar user-avatar">

          <User size={18} />

        </div>

      )}

    </div>

  );

}