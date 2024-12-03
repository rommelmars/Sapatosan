package com.backend.sapatosan.repository;
import com.backend.sapatosan.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    // Add custom query methods if needed
}