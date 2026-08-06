package com.financeai.service.impl;

import com.financeai.dto.request.InvestmentRequest;
import com.financeai.dto.response.InvestmentResponse;
import com.financeai.entity.Investment;
import com.financeai.entity.User;
import com.financeai.exception.InvestmentNotFoundException;
import com.financeai.repository.InvestmentRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.InvestmentCalculatorService;
import com.financeai.service.InvestmentService;
import com.financeai.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestmentServiceImpl implements InvestmentService {

    private final InvestmentRepository investmentRepository;
    private final UserRepository userRepository;
    private final InvestmentCalculatorService investmentCalculatorService;

    @Override
    public InvestmentResponse createInvestment(InvestmentRequest request) {

        // Temporary Debug
        System.out.println("========== Investment Request ==========");
        System.out.println("Investment Name : " + request.getInvestmentName());
        System.out.println("Invested Amount : " + request.getInvestedAmount());
        System.out.println("Current Value   : " + request.getCurrentValue());
        System.out.println("Expected Return : " + request.getExpectedReturn());
        System.out.println("========================================");

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Investment investment = Investment.builder()
                .userId(user.getId())
                .investmentName(request.getInvestmentName())
                .type(request.getType())
                .investedAmount(request.getInvestedAmount())
                .currentValue(
                        request.getCurrentValue() == null
                                ? BigDecimal.ZERO
                                : request.getCurrentValue())
                .expectedReturn(
                        request.getExpectedReturn() == null
                                ? BigDecimal.ZERO
                                : request.getExpectedReturn())
                .tenureMonths(request.getTenureMonths())
                .investmentDate(request.getInvestmentDate())
                .build();

        Investment savedInvestment = investmentRepository.save(investment);

        return investmentCalculatorService.calculateInvestmentDetails(savedInvestment);
    }

    @Override
    public List<InvestmentResponse> getAllInvestments() {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return investmentRepository.findByUserId(user.getId())
                .stream()
                .map(investmentCalculatorService::calculateInvestmentDetails)
                .toList();
    }

    @Override
    public InvestmentResponse getInvestmentById(String id) {

        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() ->
                        new InvestmentNotFoundException("Investment not found"));

        return investmentCalculatorService.calculateInvestmentDetails(investment);
    }

    @Override
    public InvestmentResponse updateInvestment(String id, InvestmentRequest request) {

        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() ->
                        new InvestmentNotFoundException("Investment not found"));

        investment.setInvestmentName(request.getInvestmentName());
        investment.setType(request.getType());
        investment.setInvestedAmount(request.getInvestedAmount());
        investment.setCurrentValue(
                request.getCurrentValue() == null
                        ? BigDecimal.ZERO
                        : request.getCurrentValue());
        investment.setExpectedReturn(
                request.getExpectedReturn() == null
                        ? BigDecimal.ZERO
                        : request.getExpectedReturn());
        investment.setTenureMonths(request.getTenureMonths());
        investment.setInvestmentDate(request.getInvestmentDate());

        Investment updatedInvestment = investmentRepository.save(investment);

        return investmentCalculatorService.calculateInvestmentDetails(updatedInvestment);
    }

    @Override
    public void deleteInvestment(String id) {

        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() ->
                        new InvestmentNotFoundException("Investment not found"));

        investmentRepository.delete(investment);
    }
}