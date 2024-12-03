package com.backend.sapatosan.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "shoes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "carts"})
public class ShoesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productid;
    
    private String name;
    private String description;
    private Double price;
    private Integer stock_quantity;
    private String image;

    // Foreign key reference to Category
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "categoryID", nullable = false) 
    @JsonBackReference // Prevent circular serialization for bidirectional relationship
    private CategoryEntity category;

    @ManyToMany(mappedBy = "shoes")
    private List<CartEntity> carts;
    // Getters and Setters
    public Long getProductid() {
        return productid;
    }

    public void setProductid(Long productid) {
        this.productid = productid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock_quantity() {
        return stock_quantity;
    }

    public void setStock_quantity(Integer stock_quantity) {
        this.stock_quantity = stock_quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Getter for category to avoid circular serialization issues
    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    // Method to get the category name for display purposes
    @JsonProperty("categoryName")
    public String getCategoryName() {
        return category != null ? category.getCategoryName() : null;
    }

    public List<CartEntity> getCarts() {
        return carts;
    }

    public void setCarts(List<CartEntity> carts) {
        this.carts = carts;
    }
}
