package com.backend.uploadFile;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;
@RestController
@RequestMapping("files")
@RequiredArgsConstructor
@Tag(name = "files")
public class UploadFileController {
    private  final  UploadFileService service ;
//    @PostMapping("/upload")
//    public Mono<ResponseEntity<String>> uploadFile(@RequestParam("file") MultipartFile file) {
//        try {
//            return service.uploadFile(file)
//                    .map(url -> ResponseEntity.ok(url)) // Return the URL directly
//                    .onErrorReturn(ResponseEntity.status(500).body("Upload failed"));
//        } catch (Exception e) {
//            return Mono.just(ResponseEntity.status(500).body("Upload failed: " + e.getMessage()));
//        }
//    }
//
//
//    @GetMapping("/file")
//    public Mono<ResponseEntity<byte[]>> getFileName(@RequestParam String name) {
//        return service.getFileByName(name)
//                .map(content -> ResponseEntity.ok()
//                        .contentType(MediaType.IMAGE_PNG) // Adjust based on file type
//                        .body(content))
//                .defaultIfEmpty(ResponseEntity.status(404).body(null));
//    }


}
