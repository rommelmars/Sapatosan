package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.CartEntity;
import com.backend.sapatosan.entity.OrderEntity;
import com.backend.sapatosan.entity.UserInfo;
import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.repository.CartRepository;
import com.backend.sapatosan.repository.OrderRepository;
import com.backend.sapatosan.repository.UserInfoRepository;
import com.backend.sapatosan.repository.ShoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private ShoesRepository shoesRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<CartEntity> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<CartEntity> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public List<CartEntity> getCartsByUserId(Long userId) {
        return cartRepository.findByUserInfoId(userId);
    }

    public List<CartEntity> getCartsByEmail(String email) {
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByEmail(email);
        if (userInfoOptional.isPresent()) {
            return cartRepository.findByUserInfoId(userInfoOptional.get().getId());
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public CartEntity createCart(CartEntity cart) {
        if (cart.getUserInfo() == null || cart.getUserInfo().getId() == null) {
            throw new RuntimeException("UserInfo cannot be null");
        }
        UserInfo userInfo = userInfoRepository.findById(cart.getUserInfo().getId())
                .orElseThrow(() -> new RuntimeException("UserInfo not found"));
        cart.setUserInfo(userInfo);

        List<ShoesEntity> shoes = cart.getShoes();
        for (int i = 0; i < shoes.size(); i++) {
            ShoesEntity shoe = shoesRepository.findById(shoes.get(i).getProductid())
                    .orElseThrow(() -> new RuntimeException("ShoesEntity not found"));
            shoes.set(i, shoe);
        }
        cart.setShoes(shoes);

        // Ensure the OrderEntity is correctly created and associated
        if (cart.getOrder() == null || cart.getOrder().getOrderID() == null) {
            OrderEntity order = new OrderEntity();
            order.setUserInfo(userInfo);
            order.setOrderDate(new Date());
            order.setTotalAmount(0.0); // Set initial total amount
            order.setStatus("Pending");
            order.setQuantity(0); // Set initial quantity
            order.setPrice(0.0); // Set initial price
            OrderEntity savedOrder = orderRepository.save(order);
            cart.setOrder(savedOrder);
        }

        return cartRepository.save(cart);
    }

    public CartEntity updateCart(Long id, CartEntity cartDetails) {
        Optional<CartEntity> optionalCart = cartRepository.findById(id);
        if (optionalCart.isPresent()) {
            CartEntity cart = optionalCart.get();
            UserInfo userInfo = userInfoRepository.findById(cartDetails.getUserInfo().getId())
                    .orElseThrow(() -> new RuntimeException("UserInfo not found"));
            cart.setUserInfo(userInfo);

            List<ShoesEntity> shoes = cartDetails.getShoes();
            for (int i = 0; i < shoes.size(); i++) {
                ShoesEntity shoe = shoesRepository.findById(shoes.get(i).getProductid())
                        .orElseThrow(() -> new RuntimeException("ShoesEntity not found"));
                shoes.set(i, shoe);
            }
            cart.setShoes(shoes);

            cart.setStatus(cartDetails.getStatus());
            return cartRepository.save(cart);
        } else {
            throw new RuntimeException("Cart not found with id " + id);
        }
    }

    public void deleteCartsByUser(Long userId) {
        List<CartEntity> userCarts = cartRepository.findByUserInfoId(userId);
        cartRepository.deleteAll(userCarts);
    }

    public void clearCartsByUser(Long userId) {
        List<CartEntity> userCarts = cartRepository.findByUserInfoId(userId);
        for (CartEntity cart : userCarts) {
            cart.setShoes(null); // Clear the shoes from the cart
            cartRepository.save(cart);
        }
    }

        public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    public void deleteCartById(Long cartId) {
        Optional<CartEntity> cartEntityOptional = cartRepository.findById(cartId);
        if (cartEntityOptional.isPresent()) {
            CartEntity cartEntity = cartEntityOptional.get();
            OrderEntity order = cartEntity.getOrder();
            order.setStatus("Cancel");
            orderRepository.save(order);
            cartRepository.deleteById(cartId);
        } else {
            throw new RuntimeException("Cart not found with id " + cartId);
        }
    }
}