package com.backend.sapatosan.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
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

import com.backend.sapatosan.entity.CategoryEntity;
import com.backend.sapatosan.entity.ShoesEntity;
import com.backend.sapatosan.service.CategoryService;
import com.backend.sapatosan.service.ShoesService;

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
        //Joseph
        //File imageFile = new File("C:\\Users\\Hp\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);
        
        //Rommel
        //File imageFile = new File("C:\\Users\\User\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);

        //Mikhail
        File imageFile = new File("E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);
        
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
            //Joseph
            //File imageFile = new File("C:\\Users\\Hp\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);

            //Rommel
            //File imageFile = new File("C:\\Users\\User\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);

            //Mikhail
            File imageFile = new File("E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);
             
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
// Delete a shoe and its image
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteShoe(@PathVariable Long id) {
    Optional<ShoesEntity> shoeOpt = shoesService.getShoeById(id);
    if (!shoeOpt.isPresent()) {
        return ResponseEntity.notFound().build(); // Return 404 if the shoe doesn't exist
    }

    ShoesEntity shoe = shoeOpt.get();
    // Delete the image file if it exists
            //Joseph
            //String imagePath = "C:\\Users\\Hp\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + shoe.getImage();

            //Rommel
            //String imagePath = "C:\\Users\\User\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + shoe.getImage();
            
            //Mikhail
            String imagePath = "E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + shoe.getImage();
    File imageFile = new File(imagePath);
    if (imageFile.exists() && imageFile.isFile()) {
        if (!imageFile.delete()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 if the file couldn't be deleted
        }
    }

    // Delete the shoe record
    shoesService.deleteShoe(id);
    return ResponseEntity.noContent().build(); // Return 204 No Content
}


    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            // Define the path where images are stored
            //MIKHAIL
            File imageFile = new File("E:\\ALL PROJECTS AND DEMOS FOR LEARNING\\Github_Repos\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);
            
            //JOSEPH
            //File imageFile = new File("C:\\Users\\Hp\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + imageName);
            //Rommel
            //File imageFile = new File("C:\\Users\\User\\Documents\\GitHub\\Sapatosan\\REACTJS_SPRINGBOOT-main\\sapatosan-frontend\\src\\shoes\\" + image
            
            if (!imageFile.exists()) {

                return ResponseEntity.notFound().build();

            }
            
            // Return the image as a resource
            Resource resource = new FileSystemResource(imageFile);
            
            // Determine the content type based on the file extension
            MediaType mediaType = MediaType.IMAGE_JPEG; // Default to JPEG
            String fileExtension = imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase();
            if (fileExtension.equals("png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else if (fileExtension.equals("gif")) {
                mediaType = MediaType.IMAGE_GIF;
            }
            else if (fileExtension.equals("jpg")) {
                mediaType = MediaType.IMAGE_JPEG;
            }
            
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
