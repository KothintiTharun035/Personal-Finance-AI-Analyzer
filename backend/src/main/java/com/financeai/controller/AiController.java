package com.financeai.controller;

import com.financeai.dto.request.AiRequest;
import com.financeai.dto.response.AiResponse;
import com.financeai.service.AiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<AiResponse> chat(
            @Valid @RequestBody AiRequest request) {

        return ResponseEntity.ok(
                aiService.askAi(request)
        );
    }
}