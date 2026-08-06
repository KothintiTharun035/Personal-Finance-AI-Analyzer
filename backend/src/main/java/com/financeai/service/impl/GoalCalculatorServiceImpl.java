package com.financeai.service.impl;

import com.financeai.dto.response.GoalResponse;
import com.financeai.entity.FinancialGoal;
import com.financeai.service.GoalCalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
public class GoalCalculatorServiceImpl implements GoalCalculatorService {

    @Override
    public GoalResponse calculateGoalDetails(FinancialGoal goal) {

        BigDecimal target = goal.getTargetAmount() == null
                ? BigDecimal.ZERO
                : goal.getTargetAmount();

        BigDecimal current = goal.getCurrentSavings() == null
                ? BigDecimal.ZERO
                : goal.getCurrentSavings();

        BigDecimal remaining = target.subtract(current);

        if (remaining.compareTo(BigDecimal.ZERO) < 0) {
            remaining = BigDecimal.ZERO;
        }

        double progress = 0;

        if (target.compareTo(BigDecimal.ZERO) > 0) {
            progress = current
                    .divide(target, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .doubleValue();

            progress = Math.min(progress, 100);
        }

        BigDecimal monthlyInvestment = BigDecimal.ZERO;

        if (goal.getTenureMonths() != null && goal.getTenureMonths() > 0) {

            double annualRate = goal.getExpectedReturn() == null
                    ? 0
                    : goal.getExpectedReturn().doubleValue();

            if (annualRate <= 0) {

                monthlyInvestment = remaining.divide(
                        BigDecimal.valueOf(goal.getTenureMonths()),
                        2,
                        RoundingMode.HALF_UP
                );

            } else {

                double r = annualRate / 100.0 / 12.0;
                int n = goal.getTenureMonths();

                double factor = (Math.pow(1 + r, n) - 1) / r;

                double sip = remaining.doubleValue() / (factor * (1 + r));

                monthlyInvestment = BigDecimal.valueOf(sip)
                        .setScale(2, RoundingMode.HALF_UP);
            }
        }

        return GoalResponse.builder()
                .id(goal.getId())
                .goalName(goal.getGoalName())
                .targetAmount(target)
                .currentSavings(current)
                .expectedReturn(goal.getExpectedReturn())
                .tenureMonths(goal.getTenureMonths())
                .createdAt(goal.getCreatedAt())
                .remainingAmount(remaining)
                .requiredMonthlyInvestment(monthlyInvestment)
                .progress(progress)
                .build();
    }
}