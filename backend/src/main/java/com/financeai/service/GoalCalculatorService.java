package com.financeai.service;

import com.financeai.dto.response.GoalResponse;
import com.financeai.entity.FinancialGoal;

public interface GoalCalculatorService {

    GoalResponse calculateGoalDetails(FinancialGoal goal);

}