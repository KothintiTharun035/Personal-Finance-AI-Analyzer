package com.financeai.dto.response;

import com.financeai.entity.FinancialGoal;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Data
@Builder
public class GoalResponse {

    private String id;

    private String goalName;

    private BigDecimal targetAmount;

    private BigDecimal currentSavings;

    private BigDecimal expectedReturn;

    private Integer tenureMonths;

    private LocalDateTime createdAt;

    // Calculated Fields
    private BigDecimal remainingAmount;

    private BigDecimal requiredMonthlyInvestment;

    private double progress;

    public static GoalResponse fromEntity(FinancialGoal goal) {

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

            monthlyInvestment = remaining.divide(
                    BigDecimal.valueOf(goal.getTenureMonths()),
                    2,
                    RoundingMode.HALF_UP
            );
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