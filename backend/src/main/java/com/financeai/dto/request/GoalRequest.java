package com.financeai.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class GoalRequest {

    @NotBlank
    private String goalName;

    @NotNull
    @DecimalMin("1.0")
    private BigDecimal targetAmount;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal currentSavings;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal expectedReturn;

    @NotNull
    @Min(1)
    private Integer tenureMonths;
}