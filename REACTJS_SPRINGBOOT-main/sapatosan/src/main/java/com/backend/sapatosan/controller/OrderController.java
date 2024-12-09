package com.backend.sapatosan.controller;

import com.backend.sapatosan.entity.OrderEntity;
import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.service.CartService;
import com.backend.sapatosan.service.OrderService;
import com.backend.sapatosan.service.UserInfoService;
import com.backend.sapatosan.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    // Get all orders
    @GetMapping
    public List<OrderEntity> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable Long id) {
        Optional<OrderEntity> order = orderService.getOrderById(id);
        return order.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get orders by email
    @GetMapping("/user")
    public ResponseEntity<List<OrderEntity>> getOrdersByEmail(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            List<OrderEntity> orders = orderService.getOrdersByEmail(email);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create new order
    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@RequestBody OrderEntity order) {
        OrderEntity newOrder = orderService.createOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    // Update order by user
    @PutMapping("/user")
    public ResponseEntity<List<OrderEntity>> updateOrdersByUserId(HttpServletRequest request, @RequestBody OrderEntity orderDetails) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            Optional<UserInfo> userInfoOptional = userInfoService.getUserByEmail(email);

            if (userInfoOptional.isPresent()) {
                UserInfo userInfo = userInfoOptional.get();
                orderDetails.setUserInfo(userInfo);
                List<OrderEntity> updatedOrders = orderService.updateOrdersByUserId(userInfo.getId(), orderDetails);
                cartService.clearCartsByUser(userInfo.getId()); // Clear all cart items for the user
                return new ResponseEntity<>(updatedOrders, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable Long id, @RequestBody OrderEntity orderDetails) {
        try {
            Optional<OrderEntity> existingOrderOpt = orderService.getOrderById(id);
            if (!existingOrderOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            OrderEntity existingOrder = existingOrderOpt.get();
            existingOrder.setOrderDate(orderDetails.getOrderDate());
            existingOrder.setTotalAmount(orderDetails.getTotalAmount());
            existingOrder.setStatus(orderDetails.getStatus());
            existingOrder.setQuantity(orderDetails.getQuantity());
            existingOrder.setPrice(orderDetails.getPrice());

            OrderEntity updatedOrder = orderService.updateOrder(existingOrder);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}