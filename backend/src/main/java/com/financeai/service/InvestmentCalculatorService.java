package com.financeai.service;

import com.financeai.dto.response.InvestmentResponse;
import com.financeai.entity.Investment;

public interface InvestmentCalculatorService {

    InvestmentResponse calculateInvestmentDetails(Investment investment);

}