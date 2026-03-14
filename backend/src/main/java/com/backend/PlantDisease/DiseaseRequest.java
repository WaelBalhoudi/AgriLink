package com.backend.PlantDisease;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DiseaseRequest {
    private MultipartFile image;
    private String cropType;
    private String location;
    private Double lat;
    private Double lng;
}