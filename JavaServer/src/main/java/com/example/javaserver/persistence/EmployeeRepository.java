package com.example.javaserver.persistence;


import com.example.javaserver.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findEmployeeById(Long id);

    Optional<Employee> findEmployeeByUsername(String username);

    void deleteEmployeeById(Long id);

}
