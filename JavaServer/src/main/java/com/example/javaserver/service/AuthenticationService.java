package com.example.javaserver.service;

import com.example.javaserver.config.AuthenticationRequest;
import com.example.javaserver.config.AuthenticationResponse;
import com.example.javaserver.config.JwtService;
import com.example.javaserver.config.RegisterRequest;
import com.example.javaserver.model.Employee;
import com.example.javaserver.model.Role;
import com.example.javaserver.persistence.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        Employee employee = new Employee(request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getImageUrl(),
                request.getRole());

        employeeRepository.save(employee);
        System.out.println(employee.getId());
        String jwtToken = jwtService.generateToken(convertToMap(employee),employee);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        ///TODO Handle Exceptions!!
        Employee employee = employeeRepository.findEmployeeByUsername(request.getUsername())
                .orElseThrow();
        System.out.println(employee);
        String jwtToken = jwtService.generateToken(convertToMap(employee) ,employee);
        System.out.println(jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public static Map<String, Object> convertToMap(Object obj) {
        Map<String, Object> resultMap = new HashMap<>();
        Class<?> objClass = obj.getClass();

        // Iterate through the fields of the class
        for (Field field : objClass.getDeclaredFields()) {
            field.setAccessible(true); // Allow access to private fields
            try {
                String fieldName = field.getName();
                Object fieldValue = field.get(obj);
                resultMap.put(fieldName, fieldValue);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return resultMap;
    }
}
