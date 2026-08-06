package com.financeai.dto.response;

import com.financeai.entity.Investment;
import com.financeai.entity.InvestmentType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class InvestmentResponse {

    private String id;

    private String investmentName;

    private InvestmentType type;

    private BigDecimal investedAmount;

    private BigDecimal currentValue;

    private BigDecimal expectedReturn;

    // NEW
    private Integer tenureMonths;

    private LocalDate investmentDate;

    private LocalDateTime createdAt;

    private BigDecimal profitOrLoss;

    private BigDecimal totalInvested;

    private BigDecimal maturityValue;

    private BigDecimal estimatedReturns;

    private List<GrowthProjectionItem> growthProjection;

    public static InvestmentResponse fromEntity(Investment investment) {

        BigDecimal current = investment.getCurrentValue() == null
                ? BigDecimal.ZERO
                : investment.getCurrentValue();

        BigDecimal invested = investment.getInvestedAmount() == null
                ? BigDecimal.ZERO
                : investment.getInvestedAmount();

        return InvestmentResponse.builder()
                .id(investment.getId())
                .investmentName(investment.getInvestmentName())
                .type(investment.getType())
                .investedAmount(investment.getInvestedAmount())
                .currentValue(current)
                .expectedReturn(investment.getExpectedReturn())
                .tenureMonths(investment.getTenureMonths())
                .investmentDate(investment.getInvestmentDate())
                .createdAt(investment.getCreatedAt())
                .profitOrLoss(current.subtract(invested))
                .build();
    }

    public static InvestmentResponse fromEntity(
            Investment investment,
            BigDecimal totalInvested,
            BigDecimal maturityValue,
            BigDecimal estimatedReturns,
            List<GrowthProjectionItem> growthProjection) {

        BigDecimal current = investment.getCurrentValue() == null
                ? BigDecimal.ZERO
                : investment.getCurrentValue();

        BigDecimal invested = investment.getInvestedAmount() == null
                ? BigDecimal.ZERO
                : investment.getInvestedAmount();

        return InvestmentResponse.builder()
                .id(investment.getId())
                .investmentName(investment.getInvestmentName())
                .type(investment.getType())
                .investedAmount(investment.getInvestedAmount())
                .currentValue(current)
                .expectedReturn(investment.getExpectedReturn())
                .tenureMonths(investment.getTenureMonths())
                .investmentDate(investment.getInvestmentDate())
                .createdAt(investment.getCreatedAt())
                .profitOrLoss(current.subtract(invested))
                .totalInvested(totalInvested)
                .maturityValue(maturityValue)
                .estimatedReturns(estimatedReturns)
                .growthProjection(growthProjection)
                .build();
    }
}