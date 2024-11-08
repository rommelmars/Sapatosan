package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.repository.UserInfoRepository;
import com.backend.sapatosan.util.JwtUtil; // Import the JwtUtil
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // Inject JwtUtil

    public Optional<UserInfo> authenticate(String email, String password) {
        Optional<UserInfo> user = userInfoRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            
            return user; // User is authenticated
        }
        return Optional.empty(); // Authentication failed
    }

    public String generateToken(String email) {
        return jwtUtil.generateToken(email); // Generate a JWT token
    }
}
