package com.backend.sapatosan.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.entity.CategoryEntity;
import com.backend.sapatosan.service.ShoesService;
import com.backend.sapatosan.service.CategoryService;

@RestController
@RequestMapping("/api/shoes")
public class ShoesController {

    @Autowired
    private ShoesService shoesService;

    @Autowired
    private CategoryService categoryService;

    // Get all shoes
    @GetMapping
    public List<ShoesEntity> getAllShoes() {
    return shoesService.getAllShoes();
    }

    // Get shoe by ID
    @GetMapping("/{id}")
    public ResponseEntity<ShoesEntity> getShoeById(@PathVariable Long id) {
        Optional<ShoesEntity> shoe = shoesService.getShoeById(id);
        return shoe.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // Create a new shoe with image and category association
    @PostMapping("/upload")
    public ResponseEntity<ShoesEntity> createShoeWithImage(
            @RequestParam("image") MultipartFile file,  
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stock_quantity") Integer stock_quantity,
            @RequestParam("categoryID") Long categoryID) {

        // Validate request parameters
        if (file.isEmpty() || name.isEmpty() || description.isEmpty() || price == null || stock_quantity == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Store the image
        String imageName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File imageFile = new File("E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\components\\customer-images\\" + imageName);
        
        try {
            file.transferTo(imageFile);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Fetch the category entity
        Optional<CategoryEntity> categoryOpt = categoryService.getCategoryById(categoryID);
        if (!categoryOpt.isPresent()) {
            return ResponseEntity.badRequest().body(null);  // Return if category not found
        }

        // Create and save new shoe with category
        ShoesEntity shoe = new ShoesEntity();
        shoe.setName(name);
        shoe.setDescription(description);
        shoe.setPrice(price);
        shoe.setStock_quantity(stock_quantity);
        shoe.setImage(imageName);
        shoe.setCategory(categoryOpt.get());  // Set category

        ShoesEntity savedShoe = shoesService.createShoe(shoe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedShoe);
    }

    // Update an existing shoe, with optional image update
    @PutMapping("/{id}/update")
    public ResponseEntity<ShoesEntity> updateShoeWithImage(
            @PathVariable Long id, 
            @RequestParam(required = false) MultipartFile image, 
            @RequestParam String name, 
            @RequestParam String description, 
            @RequestParam Double price, 
            @RequestParam Integer stock_quantity,
            @RequestParam Long categoryID) {

        Optional<ShoesEntity> existingShoeOpt = shoesService.getShoeById(id);
        if (!existingShoeOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ShoesEntity existingShoe = existingShoeOpt.get();
        existingShoe.setName(name);
        existingShoe.setDescription(description);
        existingShoe.setPrice(price);
        existingShoe.setStock_quantity(stock_quantity);

        // Fetch category by ID and set it
        Optional<CategoryEntity> categoryOpt = categoryService.getCategoryById(categoryID);
        if (!categoryOpt.isPresent()) {
            return ResponseEntity.badRequest().body(null); // Return if category not found
        }
        existingShoe.setCategory(categoryOpt.get());

        // Handle optional image update
        if (image != null && !image.isEmpty()) {
            String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            File imageFile = new File("E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\components\\customer-images\\" + imageName);
             
            try {
                image.transferTo(imageFile);
                existingShoe.setImage(imageName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        ShoesEntity updatedShoe = shoesService.updateShoe(id, existingShoe);
        return ResponseEntity.ok(updatedShoe);
    }

    // Delete a shoe
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShoe(@PathVariable Long id) {
        shoesService.deleteShoe(id);
        return ResponseEntity.noContent().build();
    }
}
