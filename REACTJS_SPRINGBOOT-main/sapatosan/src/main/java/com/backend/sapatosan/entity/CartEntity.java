package com.backend.sapatosan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class CartEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;  // Changed to camelCase
    
    @ManyToOne
    @JoinColumn(name = "id", nullable = false)  // Matches UserInfo.id
    private UserInfo userInfo;

    @ManyToOne
    @JoinColumn(name = "productid", nullable = false)  // Matches ShoesEntity.productid
    private ShoesEntity shoes;

    private String status;

    // Getters and Setters
    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public ShoesEntity getShoes() {
        return shoes;
    }

    public void setShoes(ShoesEntity shoes) {
        this.shoes = shoes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}