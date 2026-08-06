package com.financeai.controller;

import com.financeai.dto.request.LoanRequest;
import com.financeai.dto.response.LoanResponse;
import com.financeai.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PostMapping
    public ResponseEntity<LoanResponse> createLoan(
            @Valid @RequestBody LoanRequest request) {

        return ResponseEntity.ok(
                loanService.createLoan(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<LoanResponse>> getAllLoans() {

        return ResponseEntity.ok(
                loanService.getAllLoans()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanResponse> getLoanById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                loanService.getLoanById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanResponse> updateLoan(
            @PathVariable String id,
            @Valid @RequestBody LoanRequest request) {

        return ResponseEntity.ok(
                loanService.updateLoan(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLoan(
            @PathVariable String id) {

        loanService.deleteLoan(id);
        return ResponseEntity.ok("Loan deleted successfully");
    }
}