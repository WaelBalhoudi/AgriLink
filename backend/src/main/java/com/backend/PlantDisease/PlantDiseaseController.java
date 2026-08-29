package com.backend.PlantDisease;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("detect-disease")
@RequiredArgsConstructor
public class PlantDiseaseController {

    private final PlantDiseaseService plantDiseaseService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<DiseaseResponse> detectDisease(
            @RequestParam("image") MultipartFile image,
            @RequestParam("data") String jsonData
    ) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        System.out.println(jsonData);
        DiseaseRequest request = mapper.readValue(jsonData, DiseaseRequest.class);

        System.out.println("=================");
        System.out.println(request);
        DiseaseResponse response = plantDiseaseService.detectDisease(image, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
                "status", "healthy",
                "service", "agrilink-backend"
        ));
    }
}