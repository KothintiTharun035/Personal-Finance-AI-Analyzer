package com.financeai.repository;

import com.financeai.entity.Loan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LoanRepository extends MongoRepository<Loan, String> {

    List<Loan> findByUserId(String email);

}