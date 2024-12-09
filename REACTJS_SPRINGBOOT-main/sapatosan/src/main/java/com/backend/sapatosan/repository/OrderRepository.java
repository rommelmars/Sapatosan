package com.backend.sapatosan.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.sapatosan.entity.OrderEntity;
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    // Add custom query methods if needed
    List<OrderEntity> findByUserInfoId(Long userId);
}