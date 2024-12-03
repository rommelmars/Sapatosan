package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.OrderEntity;
import com.backend.sapatosan.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<OrderEntity> getOrderById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        return orderRepository.findById(id);
    }

    public OrderEntity createOrder(OrderEntity order) {
        if (order == null) {
            throw new IllegalArgumentException("Order cannot be null");
        }
        if (order.getUserInfo() == null) {
            throw new IllegalArgumentException("User info cannot be null");
        }
        return orderRepository.save(order);
    }

    public OrderEntity updateOrder(Long id, OrderEntity orderDetails) {
        if (id == null || orderDetails == null) {
            throw new IllegalArgumentException("Order ID and details cannot be null");
        }

        Optional<OrderEntity> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            OrderEntity existingOrder = optionalOrder.get();
            
            // Update user info if provided
            if (orderDetails.getUserInfo() != null) {
                existingOrder.setUserInfo(orderDetails.getUserInfo());
            }
            
            // Update other fields if provided
            if (orderDetails.getOrderDate() != null) {
                existingOrder.setOrderDate(orderDetails.getOrderDate());
            }
            if (orderDetails.getTotalAmount() != null) {
                existingOrder.setTotalAmount(orderDetails.getTotalAmount());
            }
            if (orderDetails.getStatus() != null) {
                existingOrder.setStatus(orderDetails.getStatus());
            }
            if (orderDetails.getQuantity() != null) {
                existingOrder.setQuantity(orderDetails.getQuantity());
            }
            if (orderDetails.getPrice() != null) {
                existingOrder.setPrice(orderDetails.getPrice());
            }

            return orderRepository.save(existingOrder);
        } else {
            throw new RuntimeException("Order not found with id: " + id);
        }
    }

    public void deleteOrder(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }
}