package com.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final PrivateKey privateKey;
    private final PublicKey publicKey;

    public JwtService() throws IOException, GeneralSecurityException {
        // Load keys from classpath resources
        try {
            this.privateKey = loadPrivateKey("/private.pem");
            this.publicKey = loadPublicKey("/public.pem");
        } catch (Exception e) {
            throw new IllegalStateException("Failed to initialize JWT keys. Check that key files exist in resources and are correctly formatted.", e);
        }
    }

    public String generateToken(Map<String, Object> claims, UserDetails user) {
        if (privateKey == null) {
            throw new IllegalStateException("Private key is not initialized!");
        }

        var authorities = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .claim("role", authorities)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 *7)) // 7 days expiration
                .signWith(privateKey, SignatureAlgorithm.RS256)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    /**
     * Loads a public key from a PEM file located in the classpath.
     *
     * @param resourcePath the classpath resource path (e.g., "/public.pem")
     * @return the PublicKey
     * @throws Exception if any error occurs during loading/parsing
     */
    private PublicKey loadPublicKey(String resourcePath) throws Exception {
        try (InputStream is = getClass().getResourceAsStream(resourcePath)) {
            if (is == null) {
                throw new IOException("Public key resource not found: " + resourcePath);
            }
            byte[] keyBytes = is.readAllBytes();
            String publicKeyPEM = new String(keyBytes)
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(publicKeyPEM);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePublic(spec);
        } catch (IOException e) {
            throw new Exception("Error reading the public key resource", e);
        }
    }

    /**
     * Loads a private key from a PEM file located in the classpath.
     *
     * @param resourcePath the classpath resource path (e.g., "/private.pem")
     * @return the PrivateKey
     * @throws Exception if any error occurs during loading/parsing
     */
    private PrivateKey loadPrivateKey(String resourcePath) throws Exception {
        try (InputStream is = getClass().getResourceAsStream(resourcePath)) {
            if (is == null) {
                throw new IOException("Private key resource not found: " + resourcePath);
            }
            byte[] keyBytes = is.readAllBytes();
            String privateKeyPEM = new String(keyBytes)
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(privateKeyPEM);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePrivate(spec);
        } catch (IOException e) {
            throw new Exception("Error reading the private key resource", e);
        }
    }

    /**
     * Verifies and parses a JWT token using the public key.
     *
     * @param token the JWT token to verify
     * @return the Claims contained in the token
     * @throws Exception if verification fails
     */
    public Claims verifyToken(String token) throws Exception {
        // Clean token from unwanted characters
        token = token.replaceAll("[^A-Za-z0-9\\-\\._~]", "");
        return Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


}
