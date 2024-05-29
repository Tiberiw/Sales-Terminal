package com.example.javaserver.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.javaserver.model.Permission.EMPLOYEE_CREATE;
import static com.example.javaserver.model.Permission.EMPLOYEE_DELETE;
import static com.example.javaserver.model.Permission.EMPLOYEE_READ;
import static com.example.javaserver.model.Permission.EMPLOYEE_UPDATE;
import static com.example.javaserver.model.Permission.PRODUCT_CREATE;
import static com.example.javaserver.model.Permission.PRODUCT_DELETE;
import static com.example.javaserver.model.Permission.PRODUCT_READ;
import static com.example.javaserver.model.Permission.PRODUCT_UPDATE;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER(
            Set.of(
                    PRODUCT_READ,
                    PRODUCT_UPDATE
            )
    ),
    ADMIN(
            Set.of(
                    EMPLOYEE_CREATE,
                    EMPLOYEE_READ,
                    EMPLOYEE_UPDATE,
                    EMPLOYEE_DELETE,
                    PRODUCT_CREATE,
                    PRODUCT_READ,
                    PRODUCT_UPDATE,
                    PRODUCT_DELETE
            )
    );

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = new java.util.ArrayList<>(getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));

        return authorities;
    }
}
