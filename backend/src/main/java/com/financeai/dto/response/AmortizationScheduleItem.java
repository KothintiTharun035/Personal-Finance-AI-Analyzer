package com.financeai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmortizationScheduleItem {

    private Integer month;

    private BigDecimal emi;

    private BigDecimal principal;

    private BigDecimal interest;

    private BigDecimal balance;
}