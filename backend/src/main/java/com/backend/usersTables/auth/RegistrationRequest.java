package com.backend.usersTables.auth;

import com.backend.usersTables.user.Role;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@Getter
@Setter
public class RegistrationRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;

}
