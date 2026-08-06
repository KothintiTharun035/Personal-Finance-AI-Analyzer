package com.financeai.service;

import com.financeai.dto.request.InvestmentRequest;
import com.financeai.dto.response.InvestmentResponse;

import java.util.List;

public interface InvestmentService {

    InvestmentResponse createInvestment(InvestmentRequest request);

    List<InvestmentResponse> getAllInvestments();

    InvestmentResponse getInvestmentById(String id);

    InvestmentResponse updateInvestment(String id, InvestmentRequest request);

    void deleteInvestment(String id);

}