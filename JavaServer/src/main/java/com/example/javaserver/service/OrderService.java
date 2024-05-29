package com.example.javaserver.service;

import com.example.javaserver.exception.OrderNotFoundException;
import com.example.javaserver.model.Order;
import com.example.javaserver.persistence.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;

    public Order addOrder(Order Order) {
        return orderRepository.save(Order);
    }


    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }
}
