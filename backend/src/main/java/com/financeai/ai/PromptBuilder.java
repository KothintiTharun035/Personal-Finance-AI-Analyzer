package com.financeai.ai;

import com.financeai.entity.FinancialGoal;
import com.financeai.entity.Investment;
import com.financeai.entity.Loan;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromptBuilder {

    public String buildPrompt(
            String userQuestion,
            List<Loan> loans,
            List<Investment> investments,
            List<FinancialGoal> goals) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                You are FinanceAI, an intelligent, friendly and professional AI Financial Advisor.

                Your job is to answer the user's question naturally like ChatGPT.

                Use the user's financial information only when it is relevant to the question.

                Rules:
                - Reply in a friendly conversational tone.
                - Give personalized financial advice.
                - Be practical and realistic.
                - Do not recommend illegal or extremely risky investments.
                - Do NOT generate long reports unless the user specifically asks for one.
                - Do NOT use JSON.
                - Do NOT use Markdown symbols like **, #, ``` or tables.
                - Write normal readable text.
                - Keep answers concise (100-200 words).
                - If appropriate, end with one helpful suggestion or a follow-up question.
                """);

        prompt.append("\n\n========== USER FINANCIAL PROFILE ==========\n");

        // Loans
        prompt.append("\nLoans:\n");

        if (loans.isEmpty()) {
            prompt.append("No active loans.\n");
        } else {
            for (Loan loan : loans) {
                prompt.append(String.format(
                        "- %s | Outstanding: %s | Interest: %s%% | Tenure: %s months%n",
                        loan.getLoanType(),
                        loan.getOutstandingAmount(),
                        loan.getInterestRate(),
                        loan.getTenureMonths()
                ));
            }
        }

        // Investments
        prompt.append("\nInvestments:\n");

        if (investments.isEmpty()) {
            prompt.append("No investments.\n");
        } else {
            for (Investment investment : investments) {
                prompt.append(String.format(
                        "- %s (%s) | Invested: %s | Current: %s | Expected Return: %s%%%n",
                        investment.getInvestmentName(),
                        investment.getType(),
                        investment.getInvestedAmount(),
                        investment.getCurrentValue(),
                        investment.getExpectedReturn()
                ));
            }
        }

        // Goals
        prompt.append("\nFinancial Goals:\n");

        if (goals.isEmpty()) {
            prompt.append("No financial goals.\n");
        } else {
            for (FinancialGoal goal : goals) {
                prompt.append(String.format(
                        "- %s | Target: %s | Saved: %s | Timeline: %s months%n",
                        goal.getGoalName(),
                        goal.getTargetAmount(),
                        goal.getCurrentSavings(),
                        goal.getTenureMonths()
                ));
            }
        }

        prompt.append("\n\n========== USER QUESTION ==========\n");
        prompt.append(userQuestion);

        prompt.append("""

                Answer only the user's question.

                Do not repeat the entire financial profile.

                If the question is about:
                - loans → focus on loans.
                - investments → focus on investments.
                - goals → focus on goals.
                - budgeting → focus on budgeting.
                - savings → focus on savings.
                - financial planning → combine all relevant information.

                Respond naturally like ChatGPT.
                """);

        return prompt.toString();
    }
}