package com.backend.usersTables.auth;

import com.backend.location.Location;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Minimum 8 characters")
    private String password;

    @NotBlank(message = "Phone number is mandatory")
    private String phoneNumber;

    private int experience;

    @Valid
    private Location farmLocation;

    private List<String> farmType;
}