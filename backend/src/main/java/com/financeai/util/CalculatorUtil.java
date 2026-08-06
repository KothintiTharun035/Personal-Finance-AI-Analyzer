package com.financeai.util;

import java.util.ArrayList;
import java.util.List;

/**
 * Core financial math used across Loan / Investment / Goal calculators.
 * All formulas are the standard, widely-used personal-finance formulas.
 */
public final class CalculatorUtil {

    private CalculatorUtil() {
    }

    /**
     * EMI (Equated Monthly Installment) using the standard reducing-balance formula:
     * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
     */
    public static double calculateEMI(double principal, double annualRate, int tenureMonths) {
        double monthlyRate = annualRate / Constants.PERCENT_DIVISOR / Constants.MONTHS_IN_YEAR;
        if (monthlyRate == 0) {
            return principal / tenureMonths;
        }
        double factor = Math.pow(1 + monthlyRate, tenureMonths);
        return (principal * monthlyRate * factor) / (factor - 1);
    }

    public static double calculateTotalPayment(double emi, int tenureMonths) {
        return emi * tenureMonths;
    }

    public static double calculateTotalInterest(double totalPayment, double principal) {
        return totalPayment - principal;
    }

    /**
     * Full month-by-month loan amortization schedule.
     */
    public static List<double[]> generateAmortizationSchedule(double principal, double annualRate, int tenureMonths) {
        double monthlyRate = annualRate / Constants.PERCENT_DIVISOR / Constants.MONTHS_IN_YEAR;
        double emi = calculateEMI(principal, annualRate, tenureMonths);
        double balance = principal;

        List<double[]> schedule = new ArrayList<>();
        for (int month = 1; month <= tenureMonths; month++) {
            double interestPaid = balance * monthlyRate;
            double principalPaid = emi - interestPaid;
            balance = Math.max(0, balance - principalPaid);
            // { month, principalPaid, interestPaid, remainingBalance }
            schedule.add(new double[]{month, principalPaid, interestPaid, balance});
        }
        return schedule;
    }

    /**
     * SIP (Systematic Investment Plan) future value:
     * FV = P * [(1+r)^n - 1] / r * (1+r)
     * (ordinary annuity due — investment happens at the start of each month)
     */
    public static double calculateSIPFutureValue(double monthlyInvestment, double annualRate, int tenureMonths) {
        double monthlyRate = annualRate / Constants.PERCENT_DIVISOR / Constants.MONTHS_IN_YEAR;
        if (monthlyRate == 0) {
            return monthlyInvestment * tenureMonths;
        }
        double factor = Math.pow(1 + monthlyRate, tenureMonths);
        return monthlyInvestment * ((factor - 1) / monthlyRate) * (1 + monthlyRate);
    }

    /**
     * Compound interest future value for a lump sum (e.g. Fixed Deposit):
     * FV = P * (1 + r/n)^(n*t)
     * compounded quarterly, the common convention for FDs.
     */
    public static double calculateLumpSumFutureValue(double principal, double annualRate, int tenureMonths) {
        double years = tenureMonths / (double) Constants.MONTHS_IN_YEAR;
        int compoundingPerYear = 4; // quarterly compounding
        double rate = annualRate / Constants.PERCENT_DIVISOR;
        return principal * Math.pow(1 + (rate / compoundingPerYear), compoundingPerYear * years);
    }

    /**
     * Required monthly SIP investment to reach a target future value,
     * derived by inverting the SIP future-value formula.
     */
    public static double calculateRequiredMonthlyInvestment(double targetAmount, double currentSavings,
                                                              double annualRate, int tenureMonths) {
        double futureValueOfCurrentSavings = currentSavings > 0
                ? calculateLumpSumFutureValue(currentSavings, annualRate, tenureMonths)
                : 0;

        double remainingTarget = Math.max(0, targetAmount - futureValueOfCurrentSavings);
        double monthlyRate = annualRate / Constants.PERCENT_DIVISOR / Constants.MONTHS_IN_YEAR;

        if (monthlyRate == 0) {
            return remainingTarget / tenureMonths;
        }

        double factor = Math.pow(1 + monthlyRate, tenureMonths);
        double annuityFactor = ((factor - 1) / monthlyRate) * (1 + monthlyRate);
        return remainingTarget / annuityFactor;
    }
}
