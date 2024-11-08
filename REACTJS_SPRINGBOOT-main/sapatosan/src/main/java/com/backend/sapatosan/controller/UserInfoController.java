package com.backend.sapatosan.controller;

import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.service.UserInfoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserInfoController {

    // Injecting the UserInfoService dependency to handle business logic
    @Autowired
    private UserInfoService userInfoService;

    // GET method to fetch all users
    @GetMapping("/all")
    public List<UserInfo> getAllUsers() {
        return userInfoService.getAllUsers();
    }

    // GET method to fetch a user by their ID
    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUserById(@PathVariable Long id) {
        return userInfoService.getUserById(id)
                .map(userInfo -> ResponseEntity.ok().body(userInfo))
                .orElse(ResponseEntity.notFound().build());
    }

    // POST method to create a new user
    // @Valid ensures that the input data complies with validation constraints
    @PostMapping("/create")
    public ResponseEntity<UserInfo> createUser(@Valid @RequestBody UserInfo userInfo) {
        // Call service to create a new user
        UserInfo createdUser = userInfoService.createUser(userInfo);
        // Return HTTP status 201 Created with the new user's details
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // PUT method to update an existing user by their ID
    @PutMapping("/{id}")
    public ResponseEntity<UserInfo> updateUser(@PathVariable Long id, @Valid @RequestBody UserInfo userInfo) {
        // Update the user and return the updated user
        return ResponseEntity.ok(userInfoService.updateUser(id, userInfo));
    }

    // DELETE method to remove a user by their ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        // Delete the user and return no content status
        userInfoService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
