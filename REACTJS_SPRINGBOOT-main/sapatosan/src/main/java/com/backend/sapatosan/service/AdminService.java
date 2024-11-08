package com.backend.sapatosan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.sapatosan.entity.Admin;
import com.backend.sapatosan.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Save or register a new admin
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Authenticate admin by checking username and password
    public boolean authenticateAdmin(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        return admin.isPresent() && admin.get().getPassword().equals(password);
    }

    // Method to fetch all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
