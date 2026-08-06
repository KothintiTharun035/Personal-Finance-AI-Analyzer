package com.financeai.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat_history")
public class ChatHistory {

    @Id
    private String id;

    private String userId;

    private String userMessage;

    private String aiResponse;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

}