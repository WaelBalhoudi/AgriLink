package com.backend.PlantDisease;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiseaseResponse {
    private String plant;
    private String disease;
    private Double confidence;
    private String severity;
    private List<String> treatment;
    private List<String> prevention;
    private String location;
    private Boolean demoMode;
    private String message;
}
