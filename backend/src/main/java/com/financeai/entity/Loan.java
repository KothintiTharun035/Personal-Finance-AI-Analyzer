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
@Document(collection = "loans")
public class Loan {

    @Id
    private String id;

    private String userId;

    private String loanName;

    private LoanType loanType;

    private BigDecimal loanAmount;

    @Builder.Default
    private BigDecimal outstandingAmount = BigDecimal.ZERO;

    private Double interestRate;

    private Integer tenureMonths;

    private LocalDate startDate;

    private LocalDate endDate;

    @Builder.Default
    private LoanStatus status = LoanStatus.ACTIVE;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

}