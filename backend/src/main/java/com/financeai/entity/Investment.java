package com.financeai.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "investments")
public class Investment {

    @Id
    private String id;

    private String userId;

    private String investmentName;

    private InvestmentType type;

    private BigDecimal investedAmount;

    @Builder.Default
    private BigDecimal currentValue = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal expectedReturn = BigDecimal.ZERO;

    private Integer tenureMonths;

    private LocalDate investmentDate;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

}