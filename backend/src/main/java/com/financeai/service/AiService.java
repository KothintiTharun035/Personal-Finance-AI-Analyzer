package com.financeai.service;

import com.financeai.dto.request.AiRequest;
import com.financeai.dto.response.AiResponse;

public interface AiService {

    AiResponse askAi(AiRequest request);

}