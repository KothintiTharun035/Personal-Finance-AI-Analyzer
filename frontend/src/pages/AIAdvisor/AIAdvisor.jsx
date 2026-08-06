import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
  BrainCircuit,
  Sparkles,
  Landmark,
  TrendingUp,
  Target,
  Wallet,
} from "lucide-react";

import Layout from "../../components/layout/Layout";

import ChatBox from "../../components/ai/ChatBox";
import ChatInput from "../../components/ai/ChatInput";
import TypingIndicator from "../../components/ai/TypingIndicator";

import aiService from "../../services/aiService";

import "../../styles/ai.css";

export default function AIAdvisor() {

  const location = useLocation();

  /* ======================================================
      Selected Context
  ====================================================== */

  const selectedLoan = location.state?.loan;

  const selectedInvestment = location.state?.investment;

  const selectedGoal = location.state?.goal;

  /* ======================================================
      Chat State
  ====================================================== */

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "👋 Welcome to **FinanceAI Advisor**.\n\nI'm your personal AI financial assistant.\n\nI can help you analyze loans, investments, savings and financial goals.\n\nHow can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  /* ======================================================
      Financial Health Score
  ====================================================== */

  const financeScore = useMemo(() => {

    let score = 100;

    /* ---------------- Loan ---------------- */

    if (selectedLoan) {

      const rate = Number(selectedLoan.interestRate);

      if (rate > 14) {

        score -= 18;

      } else if (rate > 10) {

        score -= 10;

      } else {

        score -= 4;

      }

      if (selectedLoan.tenureMonths > 180) {

        score -= 10;

      } else if (selectedLoan.tenureMonths > 84) {

        score -= 5;

      }

    }

    /* ---------------- Investment ---------------- */

    if (selectedInvestment) {

      const expectedReturn =
        Number(selectedInvestment.expectedReturn);

      if (expectedReturn >= 12) {

        score += 5;

      } else if (expectedReturn < 8) {

        score -= 8;

      }

      if (
        Number(selectedInvestment.estimatedReturns) > 0
      ) {

        score += 5;

      }

    }

    /* ---------------- Goal ---------------- */

    if (selectedGoal) {

      const progress =
        Number(selectedGoal.progress);

      if (progress >= 80) {

        score += 8;

      } else if (progress >= 50) {

        score += 4;

      } else if (progress < 20) {

        score -= 10;

      }

    }

    if (score > 100) score = 100;

    if (score < 40) score = 40;

    return Math.round(score);

  }, [
    selectedLoan,
    selectedInvestment,
    selectedGoal,
  ]);

  /* ======================================================
      Page Title
  ====================================================== */

  const pageTitle = useMemo(() => {

    if (selectedLoan) {

      return "Loan Analysis";

    }

    if (selectedInvestment) {

      return "Investment Analysis";

    }

    if (selectedGoal) {

      return "Goal Planning";

    }

    return "Personal Financial Assistant";

  }, [
    selectedLoan,
    selectedInvestment,
    selectedGoal,
  ]);

  /* ======================================================
      Quick Suggestions
  ====================================================== */

  const quickSuggestions = useMemo(() => {

    if (selectedLoan) {

      return [

        "Can I reduce my EMI?",

        "Should I prepay this loan?",

        "How much interest can I save?",

        "Is refinancing beneficial?"

      ];

    }

    if (selectedInvestment) {

      return [

        "Is this investment good?",

        "Should I increase my SIP?",

        "What are the risks?",

        "Suggest better investments"

      ];

    }

    if (selectedGoal) {

      return [

        "Can I achieve this goal faster?",

        "Reduce monthly investment",

        "Best investment strategy",

        "Is my goal realistic?"

      ];

    }

    return [

      "Analyze my finances",

      "Investment advice",

      "Budget planning",

      "Savings strategy"

    ];

  }, [
    selectedLoan,
    selectedInvestment,
    selectedGoal,
  ]);

  /* ======================================================
      Load Selected Context
  ====================================================== */

  useEffect(() => {

    if (selectedLoan) {

      setMessages([
  {
    id: 1,
    role: "assistant",
    content: `👋 I have loaded your selected loan.

🏦 **Loan Name:** ${selectedLoan.loanName}

💰 **Loan Amount:** ₹${selectedLoan.loanAmount}

📅 **Tenure:** ${selectedLoan.tenureMonths} months

📈 **Interest Rate:** ${selectedLoan.interestRate}%

💳 **Monthly EMI:** ₹${selectedLoan.emiAmount}

💡 Choose one of the suggestions below or ask your own question.`,
    suggestions: [
      "💳 Can I reduce my EMI?",
      "💰 Should I prepay this loan?",
      "📉 How much interest will I save if I pay ₹5,000 extra every month?",
      "🏦 Is refinancing beneficial?",
      "📊 Give me a complete loan analysis"
    ],
  },
]);
      return;

    }

    if (selectedInvestment) {

      setMessages([
  {
    id: 1,
    role: "assistant",
    content: `📈 I have loaded your selected investment.

💼 **Investment Name:** ${selectedInvestment.investmentName}

🏷️ **Investment Type:** ${selectedInvestment.type.replace("_", " ")}

💰 **Total Invested:** ₹${selectedInvestment.totalInvested}

📈 **Expected Return:** ${selectedInvestment.expectedReturn}%

💹 **Estimated Returns:** ₹${selectedInvestment.estimatedReturns}

🏦 **Maturity Value:** ₹${selectedInvestment.maturityValue}

💡 Choose one of the suggestions below or ask your own question.`,
    suggestions: [
      "📊 Is this investment good?",
      "📈 Should I continue investing?",
      "⚠️ What are the risks?",
      "💰 Compare with SIP",
      "📋 Give me a complete investment analysis"
    ],
  },
]);

      return;

    }

    if (selectedGoal) {

      setMessages([
  {
    id: 1,
    role: "assistant",
    content: `🎯 I have loaded your selected goal.

🎯 **Goal Name:** ${selectedGoal.goalName}

💰 **Target Amount:** ₹${selectedGoal.targetAmount}

🏦 **Current Savings:** ₹${selectedGoal.currentSavings}

📈 **Progress:** ${selectedGoal.progress.toFixed(1)}%

💵 **Required Monthly Investment:** ₹${selectedGoal.requiredMonthlyInvestment}

💡 Choose one of the suggestions below or ask your own question.`,
    suggestions: [
      "🚀 How can I reach this goal faster?",
      "📉 Can I reduce my monthly investment?",
      "📊 Is this goal realistic?",
      "💰 Suggest a better investment",
      "📋 Give me a complete goal analysis"
    ],
  },
]);

    }

  }, [
    selectedLoan,
    selectedInvestment,
    selectedGoal,
  ]);

    /* ======================================================
      Send Message
  ====================================================== */

  async function handleSend(text) {

    if (!text.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      let context = "";

      /* ==========================================
          LOAN CONTEXT
      ========================================== */

      if (selectedLoan) {

        context = `
You are FinanceAI, a professional financial advisor.

Analyze ONLY the following loan.

Loan Name: ${selectedLoan.loanName}
Loan Amount: ₹${selectedLoan.loanAmount}
Interest Rate: ${selectedLoan.interestRate}%
Tenure: ${selectedLoan.tenureMonths} months
Monthly EMI: ₹${selectedLoan.emiAmount}

Always explain:

• Overall assessment
• Benefits
• Drawbacks
• Risks
• Suggestions
• Final recommendation
`;

      }

      /* ==========================================
          INVESTMENT CONTEXT
      ========================================== */

      else if (selectedInvestment) {

        context = `
You are FinanceAI, an investment advisor.

Investment Details

Investment Name: ${selectedInvestment.investmentName}

Investment Type: ${selectedInvestment.type}

Total Invested: ₹${selectedInvestment.totalInvested}

Expected Return: ${selectedInvestment.expectedReturn}%

Estimated Returns: ₹${selectedInvestment.estimatedReturns}

Maturity Value: ₹${selectedInvestment.maturityValue}

Tenure: ${selectedInvestment.tenureMonths} months

Always answer with

• Overall Rating (1-10)

• Advantages

• Risks

• Better Alternatives

• Recommendation

• Final Verdict
`;

      }

      /* ==========================================
          GOAL CONTEXT
      ========================================== */

      else if (selectedGoal) {

        context = `
You are FinanceAI.

Analyze the user's financial goal.

Goal Name: ${selectedGoal.goalName}

Target Amount: ₹${selectedGoal.targetAmount}

Current Savings: ₹${selectedGoal.currentSavings}

Progress: ${selectedGoal.progress}%

Required Monthly Investment: ₹${selectedGoal.requiredMonthlyInvestment}

Timeline: ${selectedGoal.tenureMonths} months

Always explain

• Goal Progress

• Is it achievable?

• Suggestions

• Better investment options

• Risks

• Action Plan
`;

      }

      /* ==========================================
          GENERAL CHAT
      ========================================== */

      else {

        context = `
You are FinanceAI.

You are an expert financial advisor.

Help users with

• Loans

• Investments

• SIP

• Mutual Funds

• Fixed Deposits

• Budgeting

• Saving Money

• Financial Planning

Use simple English.

Use headings.

Use bullet points.

Keep answers professional.

Finish with a short summary.
`;

      }

      /* ==========================================
          FINAL PROMPT
      ========================================== */

      const prompt = `
${context}

User Question:

${text}
`;

      const reply = await aiService.askAi(prompt);

      const aiMessage = {

        id: Date.now() + 1,

        role: "assistant",

        content: reply,

      };

      setMessages((prev) => [

        ...prev,

        aiMessage,

      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [

        ...prev,

        {

          id: Date.now() + 1,

          role: "assistant",

          content:
            "❌ Sorry, I couldn't connect to FinanceAI. Please try again in a few moments.",

        },

      ]);

    } finally {

      setLoading(false);

    }

  }

    /* ======================================================
      UI
  ====================================================== */

  return (
    <Layout>

      <div className="ai-page">

        <div className="ai-card">

          {/* ======================================
              Header
          ====================================== */}

          <div className="ai-chat-hero">

              <div className="hero-logo">
                  <BrainCircuit size={25} />
              </div>

              <h1>FinanceAI Advisor</h1>

              <p>Your Personal Financial Assistant</p>

          </div>

          {/* ======================================
              Chat Area
          ====================================== */}

          <div className="ai-chat-wrapper">

            <ChatBox

              messages={messages}
              onSuggestionClick={handleSend}

            />

            {loading && (

              <TypingIndicator />

            )}

          </div>

          {/* ======================================
              Chat Input
          ====================================== */}

          <ChatInput

            onSend={handleSend}

            disabled={loading}

          />

        </div>

      </div>

    </Layout>

  );

}