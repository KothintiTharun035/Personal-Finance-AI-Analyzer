package com.financeai.service.impl;

import com.financeai.dto.response.AmortizationScheduleItem;
import com.financeai.dto.response.LoanResponse;
import com.financeai.entity.Loan;
import com.financeai.service.LoanCalculatorService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoanCalculatorServiceImpl implements LoanCalculatorService {

    @Override
    public LoanResponse calculateLoanDetails(Loan loan) {

        BigDecimal principal = loan.getLoanAmount();
        double annualRate = loan.getInterestRate();
        int months = loan.getTenureMonths();

        double monthlyRate = annualRate / 12.0 / 100.0;

        double emiDouble =
                (principal.doubleValue() * monthlyRate *
                        Math.pow(1 + monthlyRate, months))
                        /
                        (Math.pow(1 + monthlyRate, months) - 1);

        BigDecimal emi =
                BigDecimal.valueOf(emiDouble)
                        .setScale(2, RoundingMode.HALF_UP);

        BigDecimal balance = principal;
        BigDecimal totalInterest = BigDecimal.ZERO;

        List<AmortizationScheduleItem> schedule = new ArrayList<>();

        for (int month = 1; month <= months; month++) {

            BigDecimal interest =
                    balance.multiply(
                            BigDecimal.valueOf(monthlyRate),
                            MathContext.DECIMAL64)
                            .setScale(2, RoundingMode.HALF_UP);

            BigDecimal principalPaid =
                    emi.subtract(interest)
                            .setScale(2, RoundingMode.HALF_UP);

            balance =
                    balance.subtract(principalPaid)
                            .setScale(2, RoundingMode.HALF_UP);

            if (balance.compareTo(BigDecimal.ZERO) < 0) {
                balance = BigDecimal.ZERO;
            }

            totalInterest = totalInterest.add(interest);

            schedule.add(
                    AmortizationScheduleItem.builder()
                            .month(month)
                            .emi(emi)
                            .principal(principalPaid)
                            .interest(interest)
                            .balance(balance)
                            .build()
            );
        }

        BigDecimal totalPayment =
                principal.add(totalInterest);

        return LoanResponse.fromEntity(
                loan,
                emi,
                totalInterest,
                totalPayment,
                schedule
        );
    }
}