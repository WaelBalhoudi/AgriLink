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
            DiseaseRequest request
            ) {

        try {

            log.info("Request: crop={}, location={}", request.getCropType(), request.getLocation().getAddress());

            // 1. Call AI Service
            Map aiResult = aiClientService
                    .predictDisease(
                            image.getBytes(),
                            request.getCropType(),
                            request.getLocation().getAddress(),
                            request.getLocation().getLat(),
                            request.getLocation().getLng())
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
                    .plant(request.getCropType())
                    .disease(disease)
                    .confidence(confidence)
                    .severity(severity != null ? severity : treatmentInfo.getDefaultSeverity())
                    .treatment(treatmentInfo.getTreatments())
                    .prevention(treatmentInfo.getPreventions())
                    .demoMode(demoMode);

            if (request.getLocation().getAddress() != null) builder.location(request.getLocation().getAddress());
            if (demoMode) builder.message("Demo mode: Connect trained model for accurate predictions");

            log.info("Response: {} ({}%)", disease,
                    confidence != null ? Math.round(confidence * 100) : 0);

            return builder.build();

        } catch (Exception e) {

            log.error("Error: {}", e.getMessage(), e);

            TreatmentService.TreatmentInfo fallback = treatmentService.getTreatment("UNKNOWN");

            return DiseaseResponse.builder()
                    .plant(request.getCropType())
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