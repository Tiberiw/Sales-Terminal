package com.example.javaserver.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.nio.file.AccessDeniedException;

@Component
public class AuthChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

//        if (StompHeaderAccessor.CONNECT_MESSAGE_HEADER.equals(accessor.getCommand())) {
//            String token = (String) accessor.getSessionAttributes().get("token");
//            //validate the token
//            if (token != null && jwtTo) {
//
//            }
//        }
        return message;
    }

    private boolean isValidToken(String token) {
        //Implement logic
        return true;
    }
}
