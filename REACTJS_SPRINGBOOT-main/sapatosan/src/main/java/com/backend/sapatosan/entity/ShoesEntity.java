package com.backend.sapatosan.entity;

import com.fasterxml.jackson.annotation.JsonBackReference; // Import this
import jakarta.persistence.*;

@Entity
@Table(name = "shoes")
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
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "categoryID", nullable = false) // Foreign key column
    @JsonBackReference // This will prevent circular serialization
    private CategoryEntity category;

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

    public String getCategoryName() {
        return category != null ? category.getCategoryName() : null;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }
}
