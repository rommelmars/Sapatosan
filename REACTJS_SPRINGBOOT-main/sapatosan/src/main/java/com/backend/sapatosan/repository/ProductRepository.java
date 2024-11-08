package com.backend.sapatosan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.sapatosan.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
