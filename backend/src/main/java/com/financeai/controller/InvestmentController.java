package com.financeai.controller;

import com.financeai.dto.request.InvestmentRequest;
import com.financeai.dto.response.InvestmentResponse;
import com.financeai.service.InvestmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;

    @PostMapping
    public ResponseEntity<InvestmentResponse> createInvestment(
            @Valid @RequestBody InvestmentRequest request) {

        return ResponseEntity.ok(
                investmentService.createInvestment(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<InvestmentResponse>> getAllInvestments() {

        return ResponseEntity.ok(
                investmentService.getAllInvestments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentResponse> getInvestmentById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                investmentService.getInvestmentById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentResponse> updateInvestment(
            @PathVariable String id,
            @Valid @RequestBody InvestmentRequest request) {

        return ResponseEntity.ok(
                investmentService.updateInvestment(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvestment(
            @PathVariable String id) {

        investmentService.deleteInvestment(id);
        return ResponseEntity.ok("Investment deleted successfully");
    }

}