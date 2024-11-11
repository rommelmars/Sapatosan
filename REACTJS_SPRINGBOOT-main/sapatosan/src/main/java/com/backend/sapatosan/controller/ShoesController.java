package com.backend.sapatosan.controller;

import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.service.ShoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shoes")
public class ShoesController {

    @Autowired
    private ShoesService shoesService;

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
            @RequestParam("stock_quantity") Integer stock_quantity) { 

        // Validate that the uploaded file is not empty
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        String imageName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File imageFile = new File("E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\components\\customer-images\\" + imageName);
        
        try {
            file.transferTo(imageFile);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        ShoesEntity shoe = new ShoesEntity();
        shoe.setName(name);
        shoe.setDescription(description);
        shoe.setPrice(price);
        shoe.setStock_quantity(stock_quantity);
        shoe.setImage(imageName);

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
