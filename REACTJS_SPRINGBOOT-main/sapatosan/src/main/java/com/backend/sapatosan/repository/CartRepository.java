package com.backend.sapatosan.repository;

import com.backend.sapatosan.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    // Basic CRUD operations are automatically provided by JpaRepository
    // Custom query methods can be added here if needed
}