package com.financeai.dto.response;

import com.financeai.entity.Loan;
import com.financeai.entity.LoanStatus;
import com.financeai.entity.LoanType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class LoanResponse {

    private String id;

    private String loanName;

    private LoanType loanType;

    private BigDecimal loanAmount;

    private BigDecimal outstandingAmount;

    private Double interestRate;

    private Integer tenureMonths;

    private LocalDate startDate;

    private LocalDate endDate;

    private LoanStatus status;

    private LocalDateTime createdAt;

    // ==========================
    // Calculated Fields
    // ==========================

    private BigDecimal emiAmount;

    private BigDecimal totalInterest;

    private BigDecimal totalPayment;

    private List<AmortizationScheduleItem> schedule;

    public static LoanResponse fromEntity(Loan loan) {

        return LoanResponse.builder()
                .id(loan.getId())
                .loanName(loan.getLoanName())
                .loanType(loan.getLoanType())
                .loanAmount(loan.getLoanAmount())
                .outstandingAmount(loan.getOutstandingAmount())
                .interestRate(loan.getInterestRate())
                .tenureMonths(loan.getTenureMonths())
                .startDate(loan.getStartDate())
                .endDate(loan.getEndDate())
                .status(loan.getStatus())
                .createdAt(loan.getCreatedAt())
                .build();
    }

    public static LoanResponse fromEntity(
            Loan loan,
            BigDecimal emiAmount,
            BigDecimal totalInterest,
            BigDecimal totalPayment,
            List<AmortizationScheduleItem> schedule) {

        return LoanResponse.builder()
                .id(loan.getId())
                .loanName(loan.getLoanName())
                .loanType(loan.getLoanType())
                .loanAmount(loan.getLoanAmount())
                .outstandingAmount(loan.getOutstandingAmount())
                .interestRate(loan.getInterestRate())
                .tenureMonths(loan.getTenureMonths())
                .startDate(loan.getStartDate())
                .endDate(loan.getEndDate())
                .status(loan.getStatus())
                .createdAt(loan.getCreatedAt())
                .emiAmount(emiAmount)
                .totalInterest(totalInterest)
                .totalPayment(totalPayment)
                .schedule(schedule)
                .build();
    }

}