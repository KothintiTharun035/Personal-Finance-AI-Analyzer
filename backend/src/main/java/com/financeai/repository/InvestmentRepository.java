package com.financeai.repository;

import com.financeai.entity.Investment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InvestmentRepository extends MongoRepository<Investment, String> {

    List<Investment> findByUserId(String userId);

}