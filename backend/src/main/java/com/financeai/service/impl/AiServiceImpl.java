package com.financeai.service.impl;

import com.financeai.ai.GeminiClient;
import com.financeai.ai.PromptBuilder;
import com.financeai.dto.request.AiRequest;
import com.financeai.dto.response.AiResponse;
import com.financeai.entity.User;
import com.financeai.repository.GoalRepository;
import com.financeai.repository.InvestmentRepository;
import com.financeai.repository.LoanRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.AiService;
import com.financeai.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final LoanRepository loanRepository;
    private final InvestmentRepository investmentRepository;
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    private final PromptBuilder promptBuilder;
    private final GeminiClient geminiClient;

    @Override
    public AiResponse askAi(AiRequest request) {

        String email = JwtUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String prompt = promptBuilder.buildPrompt(
                request.getMessage(),
                loanRepository.findByUserId(user.getId()),
                investmentRepository.findByUserId(user.getId()),
                goalRepository.findByUserId(user.getId())
        );

        String response = geminiClient.askGemini(prompt);

        return AiResponse.builder()
                .response(response)
                .build();
    }
}