package com.backend.usersTables.auth;

import lombok.Data;

@Data
public class VerificationRequest {
    private String email;
    private String code;
}