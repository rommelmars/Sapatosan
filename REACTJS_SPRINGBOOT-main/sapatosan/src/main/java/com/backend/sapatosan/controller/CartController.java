package com.backend.sapatosan.controller;

import com.backend.sapatosan.entity.CartEntity;
import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.service.CartService;
import com.backend.sapatosan.service.OrderService;
import com.backend.sapatosan.service.UserInfoService;
import com.backend.sapatosan.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<CartEntity> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartEntity> getCartById(@PathVariable Long id) {
        Optional<CartEntity> cart = cartService.getCartById(id);
        return cart.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                  .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user")
    public ResponseEntity<List<CartEntity>> getCartsByEmail(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            List<CartEntity> carts = cartService.getCartsByEmail(email);
            return new ResponseEntity<>(carts, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<CartEntity> createCart(@RequestBody CartEntity cart, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            Optional<UserInfo> userInfoOptional = userInfoService.getUserByEmail(email);

            if (userInfoOptional.isPresent()) {
                UserInfo userInfo = userInfoOptional.get();
                cart.setUserInfo(userInfo);
                CartEntity newCart = cartService.createCart(cart);
                return new ResponseEntity<>(newCart, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartEntity> updateCart(@PathVariable Long id, @RequestBody CartEntity cartDetails) {
        try {
            CartEntity updatedCart = cartService.updateCart(id, cartDetails);
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        try {
            cartService.deleteCart(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @DeleteMapping("/user")
    public ResponseEntity<Void> clearCartsByUser(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            Optional<UserInfo> userInfoOptional = userInfoService.getUserByEmail(email);

            if (userInfoOptional.isPresent()) {
                UserInfo userInfo = userInfoOptional.get();
                cartService.deleteCartsByUser(userInfo.getId());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCartById(@PathVariable Long cartId, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractEmail(token);
            Optional<UserInfo> userInfoOptional = userInfoService.getUserByEmail(email);

            if (userInfoOptional.isPresent()) {
                UserInfo userInfo = userInfoOptional.get();
                Optional<CartEntity> cartEntityOptional = cartService.getCartById(cartId);

                if (cartEntityOptional.isPresent()) {
                    CartEntity cartEntity = cartEntityOptional.get();
                    if (cartEntity.getUserInfo().getId().equals(userInfo.getId())) {
                        // Update order status to "Cancel"
                        cartEntity.getOrder().setStatus("Cancel");
                        cartService.deleteCartById(cartId);
                        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                    } else {
                        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                    }
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

