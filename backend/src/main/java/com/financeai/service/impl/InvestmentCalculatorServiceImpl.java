package com.financeai.service.impl;

import com.financeai.dto.response.GrowthProjectionItem;
import com.financeai.dto.response.InvestmentResponse;
import com.financeai.entity.Investment;
import com.financeai.entity.InvestmentType;
import com.financeai.service.InvestmentCalculatorService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvestmentCalculatorServiceImpl implements InvestmentCalculatorService {

    @Override
    public InvestmentResponse calculateInvestmentDetails(Investment investment) {

        BigDecimal investmentAmount = investment.getInvestedAmount();
        double annualRate = investment.getExpectedReturn().doubleValue();

        int tenureMonths = investment.getTenureMonths() == null
                ? 12
                : investment.getTenureMonths();

        List<GrowthProjectionItem> growthProjection = new ArrayList<>();

        BigDecimal maturityValue;
        BigDecimal totalInvested;
        BigDecimal estimatedReturns;

        // ==========================
        // FIXED DEPOSIT
        // ==========================
        if (investment.getType() == InvestmentType.FIXED_DEPOSIT) {

            double years = tenureMonths / 12.0;

            // Quarterly compounding
            double quarterlyRate = annualRate / 100.0 / 4.0;

                double maturity = investmentAmount.doubleValue()
                        * Math.pow(1 + quarterlyRate, years * 4.0);

                maturityValue = BigDecimal.valueOf(maturity)
                        .setScale(2, RoundingMode.HALF_UP);

                totalInvested = investmentAmount;

                estimatedReturns = maturityValue.subtract(totalInvested);

                /* ---------- Generate yearly projection ---------- */


                for (int month = 1; month <= tenureMonths; month++) {

                double currentYears =  month / 12.0;

                double currentValue =
                        investmentAmount.doubleValue()
                                * Math.pow(
                                        1 + quarterlyRate,
                                        currentYears * 4.0
                                );

                BigDecimal value =
                        BigDecimal.valueOf(currentValue)
                                .setScale(2, RoundingMode.HALF_UP);

                growthProjection.add(

                        GrowthProjectionItem.builder()

                                .month(month)
                                .investedAmount(totalInvested)
                                .estimatedReturns(
                                        value.subtract(totalInvested)
                                )
                                .totalValue(value)
                                .build()

                );
                }

        }

        // ==========================
        // SIP / MUTUAL FUND
        // ==========================
        else if (investment.getType() == InvestmentType.MUTUAL_FUND) {

            BigDecimal monthlyInvestment = investmentAmount;

            totalInvested = monthlyInvestment.multiply(
                    BigDecimal.valueOf(tenureMonths));

            double monthlyRate = annualRate / 12.0 / 100.0;

            double maturity =
                    monthlyInvestment.doubleValue()
                            * ((Math.pow(1 + monthlyRate, tenureMonths) - 1)
                            / monthlyRate)
                            * (1 + monthlyRate);

            maturityValue = BigDecimal.valueOf(maturity)
                    .setScale(2, RoundingMode.HALF_UP);

            estimatedReturns = maturityValue.subtract(totalInvested);

            for (int month = 1; month <= tenureMonths; month++) {

                BigDecimal invested = monthlyInvestment.multiply(
                        BigDecimal.valueOf(month));

                double future =
                        monthlyInvestment.doubleValue()
                                * ((Math.pow(1 + monthlyRate, month) - 1)
                                / monthlyRate)
                                * (1 + monthlyRate);

                BigDecimal value = BigDecimal.valueOf(future)
                        .setScale(2, RoundingMode.HALF_UP);

                growthProjection.add(
                        GrowthProjectionItem.builder()
                                .month(month)
                                .investedAmount(invested)
                                .estimatedReturns(value.subtract(invested))
                                .totalValue(value)
                                .build()
                );
                }

        } else {
            throw new IllegalArgumentException(
                    "Unsupported investment type: " + investment.getType());
        }

        return InvestmentResponse.fromEntity(
                investment,
                totalInvested,
                maturityValue,
                estimatedReturns,
                growthProjection
        );
    }
}