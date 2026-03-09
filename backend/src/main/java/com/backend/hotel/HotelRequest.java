package com.backend.hotel;

import com.backend.location.Location;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HotelRequest {
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotNull(message = "Location is mandatory")
    private Location location;
    @NotBlank(message = "description is mandatory")
    private String description;
    @NotBlank(message = "city  is mandatory")
    private String city;
    @NotBlank(message = "phone is mandatory")
    private String phone;
    @NotBlank(message = "email is mandatory")
    @NotEmpty(message = "email is mandatory")
    private String email;
}
