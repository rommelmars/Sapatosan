package com.backend.sapatosan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.sapatosan.entity.Admin;
import com.backend.sapatosan.service.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Endpoint for registering a new admin
    @PostMapping("/register")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        Admin createdAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
    }

    // Endpoint for logging in an admin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        boolean isAuthenticated = adminService.authenticateAdmin(admin.getUsername(), admin.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // New endpoint to fetch all admin users
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }
}
