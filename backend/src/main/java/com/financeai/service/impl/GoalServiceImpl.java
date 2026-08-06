package com.financeai.service.impl;

import com.financeai.dto.request.GoalRequest;
import com.financeai.dto.response.GoalResponse;
import com.financeai.entity.FinancialGoal;
import com.financeai.entity.User;
import com.financeai.exception.GoalNotFoundException;
import com.financeai.repository.GoalRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.GoalCalculatorService;
import com.financeai.service.GoalService;
import com.financeai.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.financeai.service.GoalCalculatorService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final GoalCalculatorService goalCalculatorService;
    

    @Override
    public GoalResponse createGoal(GoalRequest request) {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FinancialGoal goal = FinancialGoal.builder()
                .userId(user.getId())
                .goalName(request.getGoalName())
                .targetAmount(request.getTargetAmount())
                .currentSavings(request.getCurrentSavings())
                .expectedReturn(request.getExpectedReturn())
                .tenureMonths(request.getTenureMonths())
                .build();

        return goalCalculatorService.calculateGoalDetails(goalRepository.save(goal));
    }

    @Override
    public List<GoalResponse> getAllGoals() {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return goalRepository.findByUserId(user.getId())
                .stream()
                .map(goalCalculatorService::calculateGoalDetails)
                .toList();
    }

    @Override
    public GoalResponse getGoalById(String id) {

        FinancialGoal goal = goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException("Goal not found"));

        return goalCalculatorService.calculateGoalDetails(goal);
    }

    @Override
    public GoalResponse updateGoal(String id, GoalRequest request) {

        FinancialGoal goal = goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException("Goal not found"));

        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setCurrentSavings(request.getCurrentSavings());
        goal.setExpectedReturn(request.getExpectedReturn());
        goal.setTenureMonths(request.getTenureMonths());

        return goalCalculatorService.calculateGoalDetails(goalRepository.save(goal));
    }

    @Override
    public void deleteGoal(String id) {

        FinancialGoal goal = goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException("Goal not found"));

        goalRepository.delete(goal);
    }
}