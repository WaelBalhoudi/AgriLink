package com.backend.usersTables.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {
    @Email(message = "Email is not formatted")
    @NotBlank(message = "email is mandatory ")
    @NotEmpty(message = "email is mandatory")
    private String email;
    @NotEmpty(message = "password is mandatory")
    @NotBlank(message = "password is mandatory ")
    @Size(min = 8,message = "Password should be 8 characters long minimum")
    private String password;
}
