package com.backend.PlantDisease;

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
            @RequestParam("cropType") String cropType,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "lat", required = false) Double lat,
            @RequestParam(value = "lng", required = false) Double lng) {

        DiseaseResponse response =
                plantDiseaseService.detectDisease(image, cropType, location, lat, lng);

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