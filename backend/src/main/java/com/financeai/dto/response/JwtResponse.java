package com.financeai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {

    @Builder.Default
    private String tokenType = "Bearer";

    private String token;
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
}
