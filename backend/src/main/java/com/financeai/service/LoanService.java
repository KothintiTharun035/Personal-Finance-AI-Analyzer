package com.financeai.service;

import com.financeai.dto.request.LoanRequest;
import com.financeai.dto.response.LoanResponse;

import java.util.List;

public interface LoanService {

    LoanResponse createLoan(LoanRequest request);

    List<LoanResponse> getAllLoans();

    LoanResponse getLoanById(String id);

    LoanResponse updateLoan(String id, LoanRequest request);

    void deleteLoan(String id);

}