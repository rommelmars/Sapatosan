package com.backend.sapatosan.repository;

import com.backend.sapatosan.entity.OrderEntity;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUserInfoId(Long userId);
}