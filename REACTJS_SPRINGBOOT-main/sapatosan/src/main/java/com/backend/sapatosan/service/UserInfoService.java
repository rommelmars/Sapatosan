package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    public List<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }

    public Optional<UserInfo> getUserById(Long id) {
        return userInfoRepository.findById(id);
    }

    public UserInfo createUser(UserInfo userInfo) {
        // Encode the password before saving
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        return userInfoRepository.save(userInfo);
    }

    public UserInfo updateUser(Long id, UserInfo userInfo) {
        userInfo.setId(id);
        return userInfoRepository.save(userInfo);
    }

    public void deleteUser(Long id) {
        userInfoRepository.deleteById(id);
    }
}
