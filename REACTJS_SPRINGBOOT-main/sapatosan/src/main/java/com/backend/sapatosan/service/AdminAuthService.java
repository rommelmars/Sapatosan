package com.backend.sapatosan.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.sapatosan.entity.Admin;
import com.backend.sapatosan.repository.AdminRepository;
import com.backend.sapatosan.util.AdminJwuUtil;

@Service
public class AdminAuthService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminJwuUtil adminJwuUtil;

    public Optional<Admin> authenticate(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent() && passwordEncoder.matches(password, admin.get().getPassword())) {
            return admin;
        }
        return Optional.empty();
    }

    public String generateToken(String username) {
        return adminJwuUtil.generateToken(username);
    }

    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }
}
