package com.backend.sapatosan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore; // Import this
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryID;

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    // Ignore this field during serialization to prevent "shoes": null in the JSON response
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Add this annotation
    private List<ShoesEntity> shoes;

    // Getters and Setters
    public Long getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<ShoesEntity> getShoes() {
        return shoes;
    }

    public void setShoes(List<ShoesEntity> shoes) {
        this.shoes = shoes;
    }
}
