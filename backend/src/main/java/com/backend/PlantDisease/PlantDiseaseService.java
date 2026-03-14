package com.backend.PlantDisease;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlantDiseaseService {

    private final AiClientService aiClientService;
    private final TreatmentService treatmentService;

    public DiseaseResponse detectDisease(
            MultipartFile image,
            String cropType,
            String location,
            Double lat,
            Double lng) {

        try {

            log.info("Request: crop={}, location={}", cropType, location);

            // 1. Call AI Service
            Map<String, Object> aiResult = aiClientService
                    .predictDisease(image.getBytes(), cropType, location, lat, lng)
                    .block();

            if (aiResult == null) {
                throw new RuntimeException("AI service returned null");
            }

            // 2. Extract results
            String disease = (String) aiResult.get("disease");
            Double confidence = (Double) aiResult.get("confidence");
            String severity = (String) aiResult.get("severity");
            Boolean demoMode = (Boolean) aiResult.getOrDefault("demo_mode", false);

            // 3. Get treatment
            TreatmentService.TreatmentInfo treatmentInfo =
                    treatmentService.getTreatment(disease);

            // 4. Build response
            DiseaseResponse.DiseaseResponseBuilder builder = DiseaseResponse.builder()
                    .plant(cropType)
                    .disease(disease)
                    .confidence(confidence)
                    .severity(severity != null ? severity : treatmentInfo.getDefaultSeverity())
                    .treatment(treatmentInfo.getTreatments())
                    .prevention(treatmentInfo.getPreventions())
                    .demoMode(demoMode);

            if (location != null) builder.location(location);
            if (demoMode) builder.message("Demo mode: Connect trained model for accurate predictions");

            log.info("Response: {} ({}%)", disease,
                    confidence != null ? Math.round(confidence * 100) : 0);

            return builder.build();

        } catch (Exception e) {

            log.error("Error: {}", e.getMessage(), e);

            TreatmentService.TreatmentInfo fallback = treatmentService.getTreatment("UNKNOWN");

            return DiseaseResponse.builder()
                    .plant(cropType)
                    .disease("Analysis Error")
                    .confidence(0.0)
                    .severity("unknown")
                    .treatment(fallback.getTreatments())
                    .prevention(fallback.getPreventions())
                    .message("Error: " + e.getMessage())
                    .build();
        }
    }
}