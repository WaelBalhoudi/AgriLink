package com.backend.hotel;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
@AllArgsConstructor
public class HotelMapper {
    public Hotel toEntity(HotelRequest request) {
        return Hotel.builder()
                .name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .phone(request.getPhone())
                .city(request.getCity())
                .email(request.getEmail())
                .createdBy("admin")
                .createdDate(LocalDate.now())
                .build();
    }
}
