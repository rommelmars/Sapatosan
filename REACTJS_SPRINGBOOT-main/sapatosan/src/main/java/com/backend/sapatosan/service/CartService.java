package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.CartEntity;
import com.backend.sapatosan.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    public List<CartEntity> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<CartEntity> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public CartEntity createCart(CartEntity cart) {
        return cartRepository.save(cart);
    }

    public CartEntity updateCart(Long id, CartEntity cartDetails) {
        Optional<CartEntity> optionalCart = cartRepository.findById(id);
        if (optionalCart.isPresent()) {
            CartEntity cart = optionalCart.get();
            cart.setUserInfo(cartDetails.getUserInfo());
            cart.setShoes(cartDetails.getShoes());
            cart.setStatus(cartDetails.getStatus());
            return cartRepository.save(cart);
        } else {
            throw new RuntimeException("Cart not found with id " + id);
        }
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}