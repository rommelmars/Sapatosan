package com.backend.sapatosan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shoes")  // Set the table name to "shoes"
public class ShoesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productid;  // Changed the variable name for consistency

    private String name;
    private String description;
    private Double price;
    private Integer stock_quantity;  // Keeping the snake_case as per your requirement

    private String image;

    // Getters and Setters
    public Long getProductid() {  // Changed from getProductId to getProductid
        return productid;  // Ensure it returns the snake_case field
    }

    public void setProductid(Long productid) {  // Changed from setProductId to setProductid
        this.productid = productid;  // Ensure it sets the snake_case field
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

    public Integer getStock_quantity() {  // Keeping the snake_case
        return stock_quantity;
    }

    public void setStock_quantity(Integer stock_quantity) {  // Keeping the snake_case
        this.stock_quantity = stock_quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
