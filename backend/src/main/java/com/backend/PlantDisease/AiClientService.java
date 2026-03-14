package com.backend.PlantDisease;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiClientService {

    private final WebClient.Builder webClientBuilder;

    // 🔗 Inject from application.yml
    @Value("${ai.service.url:http://localhost:8000}")
    private String aiServiceUrl;

    @Value("${ai.service.endpoint:/predict}")
    private String predictEndpoint;

    @Value("${ai.service.health-endpoint:/health}")
    private String healthEndpoint;

    @Value("${ai.service.timeout:30}")
    private int timeoutSeconds;

    /**
     * Call Python AI service for disease prediction
     */
    public Mono<Map> predictDisease(
            byte[] imageBytes,
            String cropType,
            String location,
            Double lat,
            Double lng) {

        log.debug("Calling AI service: {}{}", aiServiceUrl, predictEndpoint);

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("file", imageBytes)
                .header("Content-Disposition",
                        "form-data; name=\"file\"; filename=\"plant.jpg\"")
                .contentType(MediaType.IMAGE_JPEG);
        bodyBuilder.part("crop_type", cropType);

        if (location != null) bodyBuilder.part("location", location);
        if (lat != null) bodyBuilder.part("lat", lat);
        if (lng != null) bodyBuilder.part("lng", lng);

        return webClientBuilder.build()
                .post()
                .uri(aiServiceUrl + predictEndpoint)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(bodyBuilder.build())
                .retrieve()
                .bodyToMono(Map.class)
                .timeout(Duration.ofSeconds(timeoutSeconds)); // ⏱️ Add timeout
    }

    /**
     * Check if AI service is healthy
     */
    public boolean isHealthy() {
        try {
            Map response = webClientBuilder.build()
                    .get()
                    .uri(aiServiceUrl + healthEndpoint)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .timeout(Duration.ofSeconds(5))
                    .block();

            return response != null && Boolean.TRUE.equals(response.get("model_loaded"));
        } catch (Exception e) {
            log.warn("⚠️  AI health check failed: {}", e.getMessage());
            return false;
        }
    }
}