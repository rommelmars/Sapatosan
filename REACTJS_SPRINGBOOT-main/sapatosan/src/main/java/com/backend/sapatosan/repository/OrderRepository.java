package com.backend.sapatosan.repository;
import com.backend.sapatosan.entity.OrderEntity;
import com.backend.sapatosan.entity.UserInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    // Add custom query methods if needed
    List<OrderEntity> findByUserInfoId(Long userId);
    Optional<UserInfo> findByUsername(String username); // Add this method
}