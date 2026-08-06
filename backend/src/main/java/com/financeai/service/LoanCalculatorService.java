package com.financeai.service;

import com.financeai.dto.response.LoanResponse;
import com.financeai.entity.Loan;

public interface LoanCalculatorService {

    LoanResponse calculateLoanDetails(Loan loan);

}