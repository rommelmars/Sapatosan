package com.backend.sapatosan.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all paths
                .allowedOrigins("http://localhost:3000") // Replace with your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (if needed)
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                //Joseph
                //.addResourceLocations("file:/C:/Users/Hp/Documents/GitHub/Sapatosan/REACTJS_SPRINGBOOT-main/sapatosan-frontend/src/shoes/");
                //Rommel
                .addResourceLocations("file:/C:/Users/User/Documents/GitHub/Sapatosan/REACTJS_SPRINGBOOT-main/sapatosan-frontend/src/shoes/");
    }
}