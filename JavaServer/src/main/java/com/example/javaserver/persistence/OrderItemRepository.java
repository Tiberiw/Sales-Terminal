package com.example.javaserver.persistence;

import com.example.javaserver.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderProduct, Long> {
}
