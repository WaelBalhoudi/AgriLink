package com.backend.PlantDisease;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TreatmentService {

    // Simple in-memory "database" of treatments
    private final Map<String, TreatmentInfo> treatments = new HashMap<>();

    public TreatmentService() {
        // Olive diseases
        treatments.put("Peacock Spot", new TreatmentInfo(
                Arrays.asList("Apply copper-based fungicide in autumn", "Prune infected branches"),
                Arrays.asList("Prune for airflow", "Collect fallen leaves"),
                "medium"
        ));
        treatments.put("Olive Knot", new TreatmentInfo(
                Arrays.asList("Prune and destroy infected branches", "Disinfect tools"),
                Arrays.asList("Avoid pruning in wet weather", "Protect from frost"),
                "medium"
        ));

        // Tomato diseases
        treatments.put("Early Blight", new TreatmentInfo(
                Arrays.asList("Remove infected leaves", "Apply copper fungicide"),
                Arrays.asList("Avoid overhead watering", "Improve air circulation"),
                "high"
        ));
        treatments.put("Late Blight", new TreatmentInfo(
                Arrays.asList("Remove infected plants", "Apply chlorothalonil"),
                Arrays.asList("Plant resistant varieties", "Monitor weather"),
                "high"
        ));

        // Default
        treatments.put("UNKNOWN", new TreatmentInfo(
                Arrays.asList("Consult local agricultural expert"),
                Arrays.asList("Regular monitoring", "Good plant hygiene"),
                "low"
        ));
    }

    public TreatmentInfo getTreatment(String disease) {
        if (disease == null) return treatments.get("UNKNOWN");

        // Simple matching
        for (String key : treatments.keySet()) {
            if (disease.toLowerCase().contains(key.toLowerCase())) {
                return treatments.get(key);
            }
        }
        return treatments.get("UNKNOWN");
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class TreatmentInfo {
        private List<String> treatments;
        private List<String> preventions;
        private String defaultSeverity;
    }
}