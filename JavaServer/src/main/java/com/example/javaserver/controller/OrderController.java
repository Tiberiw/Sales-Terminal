package com.example.javaserver.controller;

import com.example.javaserver.exception.InsufficientStockException;
import com.example.javaserver.exception.ProductNotFoundException;
import com.example.javaserver.model.Order;
import com.example.javaserver.model.OrderProduct;
import com.example.javaserver.model.Product;
import com.example.javaserver.service.OrderService;
import com.example.javaserver.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
//@PreAuthorize("hasRole('USER')")
public class OrderController {
    private final OrderService orderService;

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> Orders = orderService.findAllOrders();
        return new ResponseEntity<>(Orders, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        try {
            for (OrderProduct item : order.getProducts()) {
                Product product = item.getProduct();
                Product repoProduct = productService.findProductById(product.getId());
                if (repoProduct.getQuantity() < item.getQuantity()) {
                    throw new InsufficientStockException("Insufficient stock for product " + product.getName());
                }
            }

            // Link OrderProducts to Order
            for (OrderProduct item : order.getProducts()) {
                item.setOrder(order);
            }

            Order newOrder = orderService.addOrder(order);


            for (OrderProduct item : order.getProducts()) {
                Product product = item.getProduct();
                Product repoProduct = productService.findProductById(product.getId());
                product.setQuantity(repoProduct.getQuantity() - item.getQuantity());
                productService.updateProduct(product);
            }


            return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
        } catch (ProductNotFoundException | InsufficientStockException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the order.");
        }

    }
}
