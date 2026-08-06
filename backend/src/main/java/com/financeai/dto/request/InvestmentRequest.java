package com.financeai.dto.request;

import com.financeai.entity.InvestmentType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class InvestmentRequest {

    @NotBlank
    private String investmentName;

    @NotNull
    private InvestmentType type;

    @NotNull
    @DecimalMin("1.0")
    private BigDecimal investedAmount;

    private BigDecimal currentValue;

    private BigDecimal expectedReturn;

    @NotNull
    @Min(1)
    private Integer tenureMonths;

    @NotNull
    private LocalDate investmentDate;

}