package com.financeai.service.impl;

import com.financeai.dto.request.LoanRequest;
import com.financeai.dto.response.LoanResponse;
import com.financeai.entity.Loan;
import com.financeai.entity.User;
import com.financeai.exception.LoanNotFoundException;
import com.financeai.repository.LoanRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.LoanCalculatorService;
import com.financeai.service.LoanService;
import com.financeai.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final LoanCalculatorService loanCalculatorService;

    @Override
    public LoanResponse createLoan(LoanRequest request) {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Loan loan = Loan.builder()
                .userId(user.getId())
                .loanName(request.getLoanName())
                .loanType(request.getLoanType())
                .loanAmount(request.getLoanAmount())
                .outstandingAmount(
                        request.getOutstandingAmount() == null
                                ? request.getLoanAmount()
                                : request.getOutstandingAmount())
                .interestRate(request.getInterestRate())
                .tenureMonths(request.getTenureMonths())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Loan savedLoan = loanRepository.save(loan);

        return loanCalculatorService.calculateLoanDetails(savedLoan);
    }

    @Override
    public List<LoanResponse> getAllLoans() {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return loanRepository.findByUserId(user.getId())
                .stream()
                .map(loanCalculatorService::calculateLoanDetails)
                .toList();
    }

    @Override
    public LoanResponse getLoanById(String id) {

        Loan loan = loanRepository.findById(id)
                .orElseThrow(() ->
                        new LoanNotFoundException("Loan not found"));

        return loanCalculatorService.calculateLoanDetails(loan);
    }

    @Override
    public LoanResponse updateLoan(String id, LoanRequest request) {

        Loan loan = loanRepository.findById(id)
                .orElseThrow(() ->
                        new LoanNotFoundException("Loan not found"));

        loan.setLoanName(request.getLoanName());
        loan.setLoanType(request.getLoanType());
        loan.setLoanAmount(request.getLoanAmount());
        loan.setOutstandingAmount(
                request.getOutstandingAmount() == null
                        ? request.getLoanAmount()
                        : request.getOutstandingAmount());
        loan.setInterestRate(request.getInterestRate());
        loan.setTenureMonths(request.getTenureMonths());
        loan.setStartDate(request.getStartDate());
        loan.setEndDate(request.getEndDate());

        Loan updatedLoan = loanRepository.save(loan);

        return loanCalculatorService.calculateLoanDetails(updatedLoan);
    }

    @Override
    public void deleteLoan(String id) {

        Loan loan = loanRepository.findById(id)
                .orElseThrow(() ->
                        new LoanNotFoundException("Loan not found"));

        loanRepository.delete(loan);
    }
}