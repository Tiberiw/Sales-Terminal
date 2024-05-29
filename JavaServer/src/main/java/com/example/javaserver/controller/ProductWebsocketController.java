package com.example.javaserver.controller;

import com.example.javaserver.model.Product;
import com.example.javaserver.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ProductWebsocketController {

    private final ProductService productService;

    @MessageMapping("/updateProduct")
    @SendTo("/topic/products")
//    maybr @Payload to product
    public Product updateProduct(Product product) {
        Product newProduct = productService.updateProduct(product);
        return newProduct;
    }
}
