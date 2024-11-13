package com.backend.sapatosan.controller;

import com.backend.sapatosan.entity.CategoryEntity;
import com.backend.sapatosan.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories with pagination (limiting to 5)
    @GetMapping("/getall")
    public Page<CategoryEntity> getAllCategories(Pageable pageable) {
        return categoryRepository.findAll(PageRequest.of(0, 5));  // Adjust this to limit to 5 categories
    }

    // Get category by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable Long id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new category
    @PostMapping("/create")
    public ResponseEntity<CategoryEntity> createCategory(@RequestBody CategoryEntity category) {
        // Add validation here if necessary
        if (category.getCategoryName() == null || category.getCategoryName().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        CategoryEntity savedCategory = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    // Update an existing category
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryEntity> updateCategory(@PathVariable Long id, @RequestBody CategoryEntity categoryDetails) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        
        if (category.isPresent()) {
            CategoryEntity updatedCategory = category.get();
            updatedCategory.setCategoryName(categoryDetails.getCategoryName());
            categoryRepository.save(updatedCategory);
            return ResponseEntity.ok(updatedCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a category
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        
        if (category.isPresent()) {
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
