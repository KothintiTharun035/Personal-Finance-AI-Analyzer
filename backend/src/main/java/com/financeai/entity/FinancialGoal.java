package com.financeai.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "financial_goals")
public class FinancialGoal {

    @Id
    private String id;

    private String userId;

    // Goal name
    private String goalName;

    // User target amount
    private BigDecimal targetAmount;

    // Already saved amount
    @Builder.Default
    private BigDecimal currentSavings = BigDecimal.ZERO;

    // Expected annual return (%)
    private BigDecimal expectedReturn;

    // Goal duration
    private Integer tenureMonths;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}