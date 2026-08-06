package com.financeai.service;

import com.financeai.dto.request.LoginRequest;
import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}