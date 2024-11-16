package com.backend.sapatosan.controller;

import com.backend.sapatosan.model.AuthRequest;
import com.backend.sapatosan.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;  // Use JwtUtil here instead of JwtTokenProvider

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        // Generate JWT token using the email (subject)
        String token = jwtUtil.generateToken(authRequest.getEmail());

        // Return the token in the response
        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/current")
public ResponseEntity<Map<String, String>> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(Collections.singletonMap("error", "Authorization token missing or invalid"));
    }

    String token = authHeader.substring(7);  // Extract token from the header

    try {
        // Extract email from the token and validate
        String email = jwtUtil.extractEmail(token);
        if (email != null && jwtUtil.validateToken(token, email)) {
            Map<String, String> response = new HashMap<>();
            response.put("username", email);  // Return the email as the "username"
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Collections.singletonMap("error", "Invalid or expired token"));
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(Collections.singletonMap("error", "Error extracting or validating token"));
    }
}
}
