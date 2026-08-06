package com.financeai.service;

import com.financeai.dto.request.GoalRequest;
import com.financeai.dto.response.GoalResponse;

import java.util.List;

public interface GoalService {

    GoalResponse createGoal(GoalRequest request);

    List<GoalResponse> getAllGoals();

    GoalResponse getGoalById(String id);

    GoalResponse updateGoal(String id, GoalRequest request);

    void deleteGoal(String id);
}