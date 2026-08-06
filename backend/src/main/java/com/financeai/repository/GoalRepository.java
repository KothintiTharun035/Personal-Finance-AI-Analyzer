package com.financeai.repository;

import com.financeai.entity.FinancialGoal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GoalRepository extends MongoRepository<FinancialGoal, String> {

    List<FinancialGoal> findByUserId(String userId);

}