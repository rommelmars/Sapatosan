package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.CategoryEntity;
import com.backend.sapatosan.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<CategoryEntity> getCategoryById(Long categoryID) {
        return categoryRepository.findById(categoryID);
    }

    public CategoryEntity createCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    public CategoryEntity updateCategory(Long id, CategoryEntity updatedCategory) {
        Optional<CategoryEntity> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            CategoryEntity category = existingCategory.get();
            category.setCategoryName(updatedCategory.getCategoryName());
            return categoryRepository.save(category);
        }
        return null;
    }

    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
