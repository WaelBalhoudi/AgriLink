package com.backend.usersTables.auth;


import com.backend.email.EmailService;
import com.backend.email.EmailTemplateName;
import com.backend.security.JwtService;
import com.backend.uploadFile.UploadFileService;
import com.backend.usersTables.user.*;
import io.jsonwebtoken.Claims;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final UploadFileService uploadFileService;


    public void register(RegistrationRequest request) throws MessagingException {
        if (request == null) {
            throw new IllegalArgumentException("Invalid registration request");
        }
        User client= User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .experience(request.getExperience())
                .farmLocation(request.getFarmLocation())
                .farmType(request.getFarmType())
                .role(Role.USER)
                .createdBy("user")
                .createdDate(LocalDate.now())
                .build();
       userRepository.save(client);
       sendValidationEmail(client,"activation account");
//       test
    }



    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }



    private String generateAndSaveActivationToken(User user) {
        // generate a token
        String  generatedToken=generateActivationCode(6);
        var token= Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters="013456789";
        StringBuilder codeBuilder=new StringBuilder();
        SecureRandom secureRandom=new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex=secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        System.out.println(codeBuilder.toString());
        return codeBuilder.toString();

    }

    public void authenticate(AuthenticationRequest request) throws MessagingException {
        // Fetch the user by email from the repository
        User user=userRepository.findByEmail(request.getEmail());

        // Check if user exists
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + request.getEmail());
        }




        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        sendValidationEmail(user,"validate account");
    }

    public void activateAccount(VerificationRequest request) throws AccessDeniedException {
        var  user=userRepository.findByEmail(request.getEmail());
        if (user==null){
            throw new UsernameNotFoundException("User not found ");
        }

        if (user == null || user.getTokens() == null || user.getTokens().isEmpty()) {
            throw new IllegalArgumentException("Invalid request");
        }

        LocalDateTime now = LocalDateTime.now();
        Iterator<Token> iterator = user.getTokens().iterator();
        Token matchedToken = null;

        // Look for the token matching the provided code
        while (iterator.hasNext()) {
            Token vc = iterator.next();

            if (vc.getToken().equals(request.getCode())) {
                matchedToken = vc;
                break;
            }
        }

        if (matchedToken == null) {
            // Optionally: apply attempts to the most recent unvalidated token
            Token lastUnvalidated = user.getTokens().stream()
                    .filter(t -> t.getValidatedAt() == null)
                    .max(Comparator.comparing(Token::getCreatedAt))
                    .orElse(null);

            if (lastUnvalidated != null) {
                lastUnvalidated.setFailedAttempts(lastUnvalidated.getFailedAttempts() + 1);
                if (lastUnvalidated.getFailedAttempts() >= 3) {
                    userRepository.save(user);
                    throw new AccessDeniedException("Maximum verification attempts exceeded\n Try log in again.");
                }
                userRepository.save(user);
            }

            throw new IllegalArgumentException(" Invalid verification code. You have "+ (3-lastUnvalidated.getFailedAttempts())+" retry attempts remaining.");

        }

        // Check if token already used
        if (matchedToken.getValidatedAt() != null) {
            throw new RuntimeException("Verification code has already been used");
        }

        // Check if attempts exceeded
        if (matchedToken.getFailedAttempts() >= 3) {
            throw new AccessDeniedException("Maximum verification attempts exceeded");
        }

        // Check expiration
        if (matchedToken.getExpiredAt().isBefore(now)) {
            throw new AccessDeniedException("Verification code expired");
        }

        // Mark token as used
        matchedToken.setValidatedAt(now);
        matchedToken.setFailedAttempts(0);

        user.setLastModifiedDate(LocalDate.now());
        user.setEnabled(true);
        userRepository.save(user);

    }

    public void deleteAccount(Long id) {

        userRepository.deleteById(id);
    }

    public ResponseEntity<?> verifyToken(String token) {
        try {

            Claims claims = jwtService.verifyToken(token);
            System.out.println(claims.getSubject());
            User user=userRepository.findByEmail(claims.getSubject());
            if (user.isAccountLocked()) {
                throw new SecurityException("User account is locked");
            }
            return ResponseEntity.ok(claims);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid token: " + e.getMessage());
        }
    }

    @Transactional
    public void updateProfile(String email, UserDto updateRequest, MultipartFile image) throws IOException {
        User user =userRepository.findByEmail(email);
        System.out.println("📩 Update Request: " + updateRequest);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        user.setFullName(updateRequest.getFullName());
        user.setEmail(updateRequest.getEmail());
        userRepository.save(user);

    }


    public UserDto getUserInfo(String email) {
        User user=userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return null;

    }

    public void updatePasswordStatus(String email) {
        User user=userRepository.findByEmail(email);
        if (user == null) {
            throw  new RuntimeException("user not found");
        }
        userRepository.save(user);
    }

    public void logout(String email) {
        User user=userRepository.findByEmail(email);
        if (user == null) {
            throw  new RuntimeException("user not found");
        }
        userRepository.save(user);
    }

    public void enableDisableUser(Long id) throws MessagingException {
        User user=userRepository.findById(id).orElseThrow(()->new RuntimeException("user not found"));
        user.setAccountLocked(!user.isAccountLocked());
        userRepository.save(user);

    }
    private void sendValidationEmail(User user,String title) throws MessagingException {
        var newToken=generateAndSaveActivationToken(user);
        //send email 2.05
        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                newToken,
                title
        );


    }
    public AuthenticateResponse verifyCodeAndGenerateToken(VerificationRequest request) throws AccessDeniedException {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null || user.getTokens() == null || user.getTokens().isEmpty()) {
            throw new IllegalArgumentException("Invalid request");
        }

        LocalDateTime now = LocalDateTime.now();
        Iterator<Token> iterator = user.getTokens().iterator();
        Token matchedToken = null;

        // Look for the token matching the provided code
        while (iterator.hasNext()) {
            Token vc = iterator.next();

            if (vc.getToken().equals(request.getCode())) {
                matchedToken = vc;
                break;
            }
        }

        if (matchedToken == null) {
            // Optionally: apply attempts to the most recent unvalidated token
            Token lastUnvalidated = user.getTokens().stream()
                    .filter(t -> t.getValidatedAt() == null)
                    .max(Comparator.comparing(Token::getCreatedAt))
                    .orElse(null);

            if (lastUnvalidated != null) {
                lastUnvalidated.setFailedAttempts(lastUnvalidated.getFailedAttempts() + 1);
                if (lastUnvalidated.getFailedAttempts() >= 3) {
                    userRepository.save(user);
                    throw new AccessDeniedException("Maximum verification attempts exceeded");
                }
                userRepository.save(user);
            }

            throw new IllegalArgumentException(" Invalid verification code. You have "+ (3-lastUnvalidated.getFailedAttempts())+" retry attempts remaining.");
        }

        // Check if token already used
        if (matchedToken.getValidatedAt() != null) {
            throw new RuntimeException("Verification code has already been used");
        }

        // Check if attempts exceede
        if (matchedToken.getFailedAttempts() >= 3) {
            throw new AccessDeniedException("Maximum verification attempts exceeded");
        }

        // Check expiration
        if (matchedToken.getExpiredAt().isBefore(now)) {
            throw new AccessDeniedException("Verification code expired");
        }

        // Mark token as used
        matchedToken.setValidatedAt(now);
        matchedToken.setFailedAttempts(0);
        userRepository.save(user);

        // Prepare JWT
        var claims = new HashMap<String, Object>();
        claims.put("fullName", user.getFullName());
        claims.put("id", user.getId());

        UserDetails userDetailsObj = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getAuthorities()
        );

        var jwtToken = jwtService.generateToken(claims, userDetailsObj);

        return AuthenticateResponse.builder()
                .token(jwtToken)
                .build();
    }


    public boolean isAdmin(String token) {
        try {
            System.out.println("Verify the token");
            // Verify the token and get claims directly from jwtService
            Claims claims = jwtService.verifyToken(token);
            System.out.println(claims.getSubject());

            // Find the user by email (subject)
            User user = userRepository.findByEmail(claims.getSubject());

            if (user.isAccountLocked()) {
                return false; // locked user is not admin
            }

            // Extract role claim (could be List<String> or String)
            Object rolesObj = claims.get("role");

            if (rolesObj instanceof String) {
                return "ADMIN".equalsIgnoreCase((String) rolesObj);
            } else if (rolesObj instanceof List<?>) {
                List<?> roles = (List<?>) rolesObj;
                return roles.stream()
                        .filter(role -> role instanceof String)
                        .map(role -> (String) role)
                        .anyMatch(role -> role.equalsIgnoreCase("ADMIN"));
            }

            return false;
        } catch (Exception e) {
            // Invalid token, user locked, or other error
            return false;
        }
    }
    public  boolean isAuthorized(String token, Role userRole){
        try {
            System.out.println("Verify the token");
            // Verify the token and get claims directly from jwtService
            Claims claims = jwtService.verifyToken(token);
            System.out.println(claims.getSubject());

            // Find the user by email (subject)
            User user = userRepository.findByEmail(claims.getSubject());

            if (user.isAccountLocked()) {
                return false; // locked user is not admin
            }

            // Extract role claim (could be List<String> or String)
            Object rolesObj = claims.get("role");

            if (rolesObj instanceof String) {
                return userRole.toString().equalsIgnoreCase((String) rolesObj);
            } else if (rolesObj instanceof List<?>) {
                List<?> roles = (List<?>) rolesObj;
                return roles.stream()
                        .filter(role -> role instanceof String)
                        .map(role -> (String) role)
                        .anyMatch(role -> role.equalsIgnoreCase(userRole.toString()));
            }

            return false;
        } catch (Exception e) {
            // Invalid token, user locked, or other error
            return false;
        }
    }

}
