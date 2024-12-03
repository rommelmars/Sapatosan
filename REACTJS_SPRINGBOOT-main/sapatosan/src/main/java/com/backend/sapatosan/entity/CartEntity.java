package com.backend.sapatosan.entity;

import jakarta.persistence.*;
import java.util.List;



@Entity
@Table(name = "cart")
public class CartEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;  // Changed to camelCase
    
    @ManyToOne
    @JoinColumn(name = "id", nullable = false)  // Matches UserInfo.id
    
    private UserInfo userInfo;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)  // Matches OrderEntity.orderID
    
    private OrderEntity order;

    @ManyToMany
    @JoinTable(
        name = "cart_shoes",
        joinColumns = @JoinColumn(name = "cart_id"),
        inverseJoinColumns = @JoinColumn(name = "productid")
    )
    private List<ShoesEntity> shoes;

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

    public List<ShoesEntity> getShoes() {
        return shoes;
    }

    public void setShoes(List<ShoesEntity> shoes) {
        this.shoes = shoes;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}