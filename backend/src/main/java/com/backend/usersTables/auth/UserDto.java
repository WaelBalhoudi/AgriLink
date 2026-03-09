package com.backend.usersTables.auth;

import com.backend.usersTables.user.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String uid;
    private Integer id;
    @NotBlank(message = "Full name is required")
    private String fullName;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotNull(message = "CIN is required")
    @Positive(message = "CIN must be a positive number")
    @Digits(integer =8,fraction = 0,message = "CIN must be exactly 8 digits")
    private int cin;
    @NotNull(message = "Phone number is required")
    @Positive(message = "Phone number must be a positive number")
    @Digits(integer = 8, fraction = 0,message = "Phone number must be exactly 8 digits")
    private int phoneNumber;
    @NotBlank(message = "Address is required")
    @Size(min = 5, max = 255, message = "Address must be between 5 and 255 characters")
    private String address;
    @NotBlank(message = "date of birth is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}",message = "Date of Birth must be in format yyyy-mm-dd")
    private String dateOfBirth;
    private String image;
    private boolean accountLocked;
    private Boolean enable;
    private Timestamp createdDate;
    private Timestamp lastModifiedDate;
    private Gender gender;

}
