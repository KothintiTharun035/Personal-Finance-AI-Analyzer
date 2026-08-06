import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {

  const [message, setMessage] = useState("");

  const textareaRef = useRef(null);

  /* ======================================
      Auto Resize
  ====================================== */

  useEffect(() => {

    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";

    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";

  }, [message]);

  /* ======================================
      Send
  ====================================== */

  function handleSubmit(e) {

    e.preventDefault();

    if (!message.trim() || disabled) return;

    onSend(message.trim());

    setMessage("");

    requestAnimationFrame(() => {

      if (textareaRef.current) {

        textareaRef.current.style.height = "54px";

      }

    });

  }

  /* ======================================
      Enter to Send
  ====================================== */

  function handleKeyDown(e) {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSubmit(e);

    }

  }

  return (

    <form

      className="chat-input-container"

      onSubmit={handleSubmit}

    >

      <textarea

        ref={textareaRef}

        className="chat-input"

        rows={1}

        maxLength={3000}

        disabled={disabled}

        value={message}

        placeholder="Ask FinanceAI anything about your loans, investments, savings or goals..."

        onChange={(e) =>
          setMessage(e.target.value)
        }

        onKeyDown={handleKeyDown}

      />

      <button

        type="submit"

        className="send-button"

        disabled={
          disabled ||
          !message.trim()
        }

      >

        {disabled ? (

          "Thinking..."

        ) : (

          <>

            <SendHorizonal size={18} />

            <span>

              Send

            </span>

          </>

        )}

      </button>

    </form>

  );

}