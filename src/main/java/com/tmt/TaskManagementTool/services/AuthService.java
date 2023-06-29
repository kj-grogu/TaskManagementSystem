package com.tmt.TaskManagementTool.services;

import java.nio.charset.StandardCharsets;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tmt.TaskManagementTool.models.User;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UserService userService;

    public String getBasicAuthenticationHeader(String username, String password) {
        User user = userService.getUserByUsername(username);
        boolean isPwd = user.getPassword().equals(password);
        if (isPwd) {
            String valueToEncode = username + ":" + password;
            long expirationTimeInSeconds = 3600; // 1 hour in seconds

            // Set the current time and calculate the token's expiration date
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime expirationDateTime = currentTime.plusSeconds(expirationTimeInSeconds);
            long expirationTimestamp = expirationDateTime.toEpochSecond(ZoneOffset.UTC);
            String token = Base64.getEncoder().encodeToString(valueToEncode.getBytes(StandardCharsets.UTF_8));
            String random = UUID.randomUUID().toString();
            String authHeader = "Basic " + random + ";" + expirationTimestamp + ";" + token;
            return authHeader;
        }
        return "";
    }

    public String decode(String val) {
        if (val == null) {
            return "";
        }
        String auth = val.replace("Basic ", "");
        String[] parts = auth.split(";");
        String expirationtime = parts[1];
        byte[] credDecoded = Base64.getDecoder().decode(parts[2]);
        String credentials = new String(credDecoded, StandardCharsets.UTF_8);
        // credentials = username:password
        // final String[] values = credentials.split(":", 2);
        String userName = credentials.split(":")[0];
        return userName;
    }

    public User getCurrentUser(HttpSession session) {
        /*try {
            if (session != null) {
                // if (session.getAttribute("user") != null) {
                // String userName = session.getAttribute("user").toString();
                String userName = "nraj";
                return userService.getUserByUsername(userName);
                // }
            }
        } catch (Exception e) {
            log.error("Error getting current user", e);
        }*/
        return null;
    }

}
