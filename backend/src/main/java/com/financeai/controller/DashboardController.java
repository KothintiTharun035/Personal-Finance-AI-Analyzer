package com.financeai.controller;

import com.financeai.dto.response.ApiResponse;
import com.financeai.entity.User;
import com.financeai.repository.UserRepository;
import com.financeai.service.DashboardService;
import com.financeai.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    @GetMapping("/summary")
    public ApiResponse<Map<String, Object>> getSummary() {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> summary =
                dashboardService.getDashboardSummary(user.getId());

        return ApiResponse.success("Dashboard summary fetched", summary);
    }
}