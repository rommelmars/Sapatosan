package com.backend.sapatosan.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.sapatosan.entity.Admin;
import com.backend.sapatosan.service.AdminAuthService;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    @Autowired
    private AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin adminCredentials) {
        Optional<Admin> admin = adminAuthService.authenticate(adminCredentials.getUsername(), adminCredentials.getPassword());
        
        if (admin.isPresent()) {
            String token = adminAuthService.generateToken(admin.get().getUsername());
            return ResponseEntity.ok(token); // Return JWT token
        }
        return ResponseEntity.status(401).body("Invalid credentials"); // Authentication failed
    }

    @PostMapping("/register")
    public ResponseEntity<Admin> register(@RequestBody Admin admin) {
        Admin createdAdmin = adminAuthService.saveAdmin(admin);
        return ResponseEntity.ok(createdAdmin); // Return created admin
    }
}
