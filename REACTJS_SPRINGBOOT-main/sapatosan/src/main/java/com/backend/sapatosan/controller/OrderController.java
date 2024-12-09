package com.backend.sapatosan.controller;

import com.backend.sapatosan.entity.OrderEntity;
import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.service.OrderService;
import com.backend.sapatosan.service.UserInfoService;
import com.backend.sapatosan.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest; // Add this import statement
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

    // Update order
    @PutMapping("/user")
    public ResponseEntity<OrderEntity> updateOrderByUser(@RequestBody OrderEntity orderDetails, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            Optional<UserInfo> userInfoOptional = userInfoService.getUserByEmail(email);

            if (userInfoOptional.isPresent()) {
                UserInfo userInfo = userInfoOptional.get();
                orderDetails.setUserInfo(userInfo);
                OrderEntity updatedOrder = orderService.updateOrderByUser(email, orderDetails);
                return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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