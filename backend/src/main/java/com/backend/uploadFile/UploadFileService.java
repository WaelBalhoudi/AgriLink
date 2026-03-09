package com.backend.uploadFile;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UploadFileService {
    private final WebClient webClient;

    private final String supabaseUrl = "https://nlgbkgzdfqzvqzvwdcuu.storage.supabase.co"; // Your Supabase URL
    private final String supabaseApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2JrZ3pkZnF6dnF6dndkY3V1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDM4ODM1MiwiZXhwIjoyMDY5OTY0MzUyfQ.h27HWG-2lMbrFfF0mlIdbwhbq3O1O2KpOnz9k_hexqM"; // Your API key
    private final String bucketId = "uploads"; // Your bucket name

    public UploadFileService() {
        this.webClient = WebClient.builder()
                .baseUrl(supabaseUrl + "/storage/v1/object")
                .defaultHeader("apikey", supabaseApiKey)
                .defaultHeader("Authorization", "Bearer " + supabaseApiKey)
                .build();
    }
    public String uploadFile(MultipartFile file) throws IOException{
      return "test";
    }
//    public Mono<String> uploadFile(MultipartFile file) throws IOException {
//        // Generate a timestamp string — e.g., 20250809T091530Z format (UTC time)
//        String timestamp = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'")
//                .withZone(ZoneOffset.UTC)
//                .format(Instant.now());
//
//        // Optionally, keep original file extension
//        String originalFilename = file.getOriginalFilename();
//        String extension = "";
//        if (originalFilename != null && originalFilename.contains(".")) {
//            extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
//        }
//
//        String newFileName = timestamp + extension;
//
//        String path = "my-folder/" + newFileName;
//        byte[] fileBytes = file.getBytes();
//        String contentType = file.getContentType();
//
//        return webClient.put()
//                .uri("/{bucket}/{path}", bucketId, path)
//                .contentType(MediaType.parseMediaType(contentType))
//                .body(BodyInserters.fromValue(fileBytes))
//                .retrieve()
//                .bodyToMono(String.class)
//                // Return the new filename instead of the original one
//                .thenReturn(newFileName);
//    }
//
//    public Mono<byte[]> getFileByName(String fileName) {
//        String path = "my-folder/" + fileName;
//        return webClient.get()
//                .uri("/{bucket}/{path}", bucketId, path)
//                .retrieve()
//                .bodyToMono(byte[].class)
//
//                .onErrorResume(e -> Mono.empty()); // Handle errors gracefully
//    }
//
//    public void deleteFile(String filePathOrUrl) {
//        String path;
//        try {
//            if (filePathOrUrl.startsWith("http")) {
//                // It's a full URL, extract the relative path inside bucket
//                URI uri = new URI(filePathOrUrl);
//                String fullPath = uri.getPath(); // e.g. "/storage/v1/object/uploads/my-folder/filename.svg"
//                String prefix = "/storage/v1/object/uploads/";
//                if (fullPath.startsWith(prefix)) {
//                    path = fullPath.substring(prefix.length());
//                } else {
//                    path = fullPath;
//                }
//            } else {
//                // Only filename provided, prepend your folder
//                path = "my-folder/" + filePathOrUrl;
//            }
//
//
//            webClient.delete()
//                    .uri("/{bucket}/{path}", bucketId, path)
//                    .retrieve()
//                    .bodyToMono(Void.class)
//                    .block();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

}
