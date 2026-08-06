package com.financeai.service.impl;

import com.financeai.dto.response.InvestmentResponse;
import com.financeai.entity.FinancialGoal;
import com.financeai.entity.Investment;
import com.financeai.entity.Loan;
import com.financeai.repository.GoalRepository;
import com.financeai.repository.InvestmentRepository;
import com.financeai.repository.LoanRepository;
import com.financeai.service.DashboardService;
import com.financeai.service.InvestmentCalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final LoanRepository loanRepository;
    private final InvestmentRepository investmentRepository;
    private final GoalRepository goalRepository;
    private final InvestmentCalculatorService investmentCalculatorService;

    @Override
    public Map<String, Object> getDashboardSummary(String userId) {

        List<Loan> loans = loanRepository.findByUserId(userId);
        List<Investment> investments = investmentRepository.findByUserId(userId);
        List<FinancialGoal> goals = goalRepository.findByUserId(userId);

        BigDecimal totalLoanAmount = loans.stream()
                .map(Loan::getLoanAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalOutstanding = loans.stream()
                .map(Loan::getOutstandingAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalInvested = BigDecimal.ZERO;
        BigDecimal totalCurrentValue = BigDecimal.ZERO;

        for (Investment investment : investments) {

            InvestmentResponse response =
                    investmentCalculatorService.calculateInvestmentDetails(investment);

            totalInvested = totalInvested.add(response.getTotalInvested());
            totalCurrentValue = totalCurrentValue.add(response.getMaturityValue());
        }

        BigDecimal totalProfit = totalCurrentValue.subtract(totalInvested);

        long activeGoals = goals.size();

        long achievedGoals = goals.stream()
                .filter(g -> g.getCurrentSavings() != null
                        && g.getTargetAmount() != null
                        && g.getCurrentSavings().compareTo(g.getTargetAmount()) >= 0)
                .count();

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalLoans", loans.size());
        summary.put("loanAmount", totalLoanAmount);
        summary.put("outstandingAmount", totalOutstanding);

        summary.put("totalInvestments", investments.size());
        summary.put("investedAmount", totalInvested);
        summary.put("currentValue", totalCurrentValue);

        summary.put("profit", totalProfit);
        summary.put("projectedGains", totalProfit);

        summary.put("totalGoals", goals.size());
        summary.put("activeGoals", activeGoals);
        summary.put("achievedGoals", achievedGoals);

        return summary;
    }
}