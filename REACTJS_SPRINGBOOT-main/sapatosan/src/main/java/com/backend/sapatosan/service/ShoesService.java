package com.backend.sapatosan.service;

import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.repository.CategoryRepository;
import com.backend.sapatosan.repository.ShoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoesService {

    @Autowired
    private ShoesRepository shoesRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    // Get all shoes
    public List<ShoesEntity> getAllShoes() {
        List<ShoesEntity> shoes = shoesRepository.findAll();
        return shoes;
    }
    
    // Get shoe by ID
    public Optional<ShoesEntity> getShoeById(Long id) {
        return shoesRepository.findById(id);
    }

    // Create a new shoe
    public ShoesEntity createShoe(ShoesEntity shoe) {
        return shoesRepository.save(shoe);
    }

    // Update an existing shoe
    public ShoesEntity updateShoe(Long id, ShoesEntity shoe) {
        shoe.setProductid(id);
        return shoesRepository.save(shoe);
    }

    // Delete a shoe by ID
    public void deleteShoe(Long id) {
        shoesRepository.deleteById(id);
    }
    
    
}
