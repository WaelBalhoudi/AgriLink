package com.backend.PlantDisease;

import com.backend.location.Location;
import jakarta.persistence.Embedded;
import lombok.Data;

@Data
public class DiseaseRequest {
    private String cropType;
    @Embedded
    private Location location;
}