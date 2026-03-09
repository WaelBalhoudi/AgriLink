package com.backend.usersTables.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.Map;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {
    private final AuthenticationService service;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        System.out.println("registration request "+request);
        service.register(request);
        return ResponseEntity.accepted().build();
    }
    @PutMapping("/activate-account")
    public ResponseEntity<?> activateAccount(@RequestBody VerificationRequest verificationRequest) throws AccessDeniedException {
        service.activateAccount(verificationRequest);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationRequest request) throws MessagingException {
        service.authenticate(request);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/verify-login")
    public ResponseEntity<AuthenticateResponse> verifyCode(@RequestBody VerificationRequest verificationRequest) throws AccessDeniedException {
        AuthenticateResponse response = service.verifyCodeAndGenerateToken(verificationRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping("log-out")
    public ResponseEntity<?> logout(@RequestParam String email){
        service.logout(email);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-account/{user-id}")
    public ResponseEntity<?> deleteAccount(
            @PathVariable("user-id") Long id

    ){
        service.deleteAccount(id);
        return  ResponseEntity.ok().build();
    }

    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> requestBody) {
        String jwtToken = requestBody.get("token");
        System.out.println(jwtToken);
        return service.verifyToken(jwtToken);
    }


    @PostMapping("/update-password-status")
    public ResponseEntity<?> updatePasswordStatus(@RequestParam String email){

         service.updatePasswordStatus(email);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(
            @RequestParam String email,
            @RequestPart("data") @Valid UserDto updateRequest,
            @RequestPart(value ="image",required = false)MultipartFile image
            ) throws IOException {

        service.updateProfile(email,updateRequest,image);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/userInfo")
    public ResponseEntity<UserDto> getUserInfo(@RequestParam String email){
        UserDto userInfo=service.getUserInfo(email);
        return ResponseEntity.ok(userInfo);
    }



    @PutMapping("/enableDisableUser/{id}")
    public ResponseEntity<?> enableDisableUser(@PathVariable Long id) throws MessagingException {
        service.enableDisableUser(id);
        return  ResponseEntity.ok().build();
    }

/*
    @GetMapping("/device-info")
    public String getDeviceInfo(HttpServletRequest request) {
        // Get User-Agent header to determine device type
        String userAgent = request.getHeader("User-Agent");

        // Other request details
        String remoteAddr = request.getRemoteAddr(); // Client IP address
        String method = request.getMethod(); // HTTP method (GET, POST, etc.)
        String uri = request.getRequestURI(); // Request URI
        String queryString = request.getQueryString(); // Query parameters

        // Simple device type detection based on User-Agent
        String deviceType = detectDeviceType(userAgent);

        return String.format("Device Type: %s\nUser-Agent: %s\nIP: %s\nMethod: %s\nURI: %s\nQuery: %s",
                deviceType, userAgent, remoteAddr, method, uri, queryString);
    }

    private String detectDeviceType(String userAgent) {
        if (userAgent == null) return "Unknown";
        userAgent = userAgent.toLowerCase();
        if (userAgent.contains("mobile") || userAgent.contains("android") || userAgent.contains("iphone")) {
            return "Mobile";
        } else if (userAgent.contains("tablet") || userAgent.contains("ipad")) {
            return "Tablet";
        } else {
            return "Desktop";
        }
    }



    */

}
