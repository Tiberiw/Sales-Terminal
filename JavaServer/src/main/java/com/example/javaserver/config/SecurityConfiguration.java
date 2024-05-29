package com.example.javaserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.example.javaserver.model.Permission.*;
import static com.example.javaserver.model.Role.ADMIN;
import static com.example.javaserver.model.Role.USER;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                        .authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**")
                                .permitAll()
                                .requestMatchers("/ws/**").permitAll()
                                .requestMatchers("/orders/**").permitAll()
                                .requestMatchers("/products/**").hasAnyRole(ADMIN.name(), USER.name())
                                .requestMatchers(GET, "/products/**").hasAuthority(PRODUCT_READ.name())
                                .requestMatchers(POST, "/products/**").hasAuthority(PRODUCT_CREATE.name())
                                .requestMatchers(PUT, "/products/**").hasAuthority(PRODUCT_UPDATE.name())
                                .requestMatchers(DELETE, "/products/**").hasAuthority(PRODUCT_DELETE.name())
                                .anyRequest()
                                .authenticated())
                                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
