package com.financeai.repository;

import com.financeai.entity.ChatHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatHistoryRepository extends MongoRepository<ChatHistory, String> {

    List<ChatHistory> findByUserIdOrderByCreatedAtDesc(String userId);

}