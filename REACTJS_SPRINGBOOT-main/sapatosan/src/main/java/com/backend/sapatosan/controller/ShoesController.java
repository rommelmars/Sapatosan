package com.backend.sapatosan.controller;

<<<<<<< Updated upstream
import com.backend.sapatosan.entity.CategoryEntity;
import com.backend.sapatosan.service.CategoryService;
import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.service.ShoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

=======
>>>>>>> Stashed changes
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.service.ShoesService;

@RestController
@RequestMapping("/api/shoes")
public class ShoesController {

    @Autowired
    private ShoesService shoesService;

    @Autowired
    private CategoryService categoryService;  // Inject CategoryService

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

    // Create a new shoe with image
    @PostMapping("/upload")
    public ResponseEntity<ShoesEntity> createShoeWithImage(
            @RequestParam("image") MultipartFile file,  
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stock_quantity") Integer stock_quantity,
            @RequestParam("categoryID") Long categoryID) { 

        // Validate that the uploaded file and other fields are not empty
        if (file.isEmpty() || name.isEmpty() || description.isEmpty() || price == null || stock_quantity == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Store the image
        String imageName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File imageFile = new File("C:\\Users\\User\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\components\\customer-images\\" + imageName);
        
        try {
            file.transferTo(imageFile);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Fetch category from the database using categoryID
        Optional<CategoryEntity> categoryOpt = categoryService.getCategoryById(categoryID);
        if (!categoryOpt.isPresent()) {
            System.out.println("Category not found with ID: " + categoryID);
            return ResponseEntity.badRequest().body(null);  // Category not found
        }

        // Create and save the new shoe
        ShoesEntity shoe = new ShoesEntity();
        shoe.setName(name);
        shoe.setDescription(description);
        shoe.setPrice(price);
        shoe.setStock_quantity(stock_quantity);
        shoe.setImage(imageName);
        shoe.setCategory(categoryOpt.get());  // Associate category with the shoe

        ShoesEntity savedShoe = shoesService.createShoe(shoe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedShoe);
    }

    // Update an existing shoe with optional image
    @PutMapping("/{id}/update")
    public ResponseEntity<ShoesEntity> updateShoeWithImage(
            @PathVariable Long id, 
            @RequestParam(required = true) MultipartFile image, 
            @RequestParam String name, 
            @RequestParam String description, 
            @RequestParam Double price, 
            @RequestParam Integer stock_quantity) {
        
        Optional<ShoesEntity> existingShoeOpt = shoesService.getShoeById(id);
        if (!existingShoeOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ShoesEntity existingShoe = existingShoeOpt.get();
        existingShoe.setName(name);
        existingShoe.setDescription(description);
        existingShoe.setPrice(price);
        existingShoe.setStock_quantity(stock_quantity);
        
        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            File imageFile = new File("C:\\Users\\User\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\components\\customer-images\\" + imageName);
             
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
