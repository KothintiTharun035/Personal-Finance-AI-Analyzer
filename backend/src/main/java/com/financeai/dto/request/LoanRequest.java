package com.financeai.dto.request;

import com.financeai.entity.LoanType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class LoanRequest {

    @NotBlank
    private String loanName;

    @NotNull
    private LoanType loanType;

    @NotNull
    @DecimalMin("1.0")
    private BigDecimal loanAmount;

    private BigDecimal outstandingAmount;

    @NotNull
    private Double interestRate;

    @NotNull
    private Integer tenureMonths;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

}