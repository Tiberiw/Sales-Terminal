package com.example.javaserver.service;

import com.example.javaserver.exception.ProductNotFoundException;
import com.example.javaserver.model.Product;
import com.example.javaserver.persistence.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    private final SimpMessagingTemplate template;

    public Product addProduct(Product product) {
        Product newProduct = productRepository.save(product);
        template.convertAndSend("/topic/products", newProduct);
        return newProduct;
    }

    public Product findProductById(Long id) {
        return productRepository.findProductById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found!"));
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Product product) {
        Product updatedProduct = productRepository.save(product);
        template.convertAndSend("/topic/products", updatedProduct);
        return updatedProduct;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteProductById(id);
    }
}
