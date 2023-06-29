package com.tmt.TaskManagementTool.controllers;

import javax.security.auth.login.LoginException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tmt.TaskManagementTool.dtos.LoginResponse;
import com.tmt.TaskManagementTool.models.User;
import com.tmt.TaskManagementTool.services.AuthService;
import com.tmt.TaskManagementTool.services.UserService;

import jakarta.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@Slf4j
public class LoginRegisterConroller {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthService authService;

	/**
	 * Login API
	 * 
	 * @param requestBody
	 * @param session
	 * @return
	 * @throws LoginException
	 */
	@PostMapping("/loginUser")
	public ResponseEntity<LoginResponse> getUserByUsername(@RequestBody String requestBody, HttpSession session)
			throws LoginException {
		// User user = new User();
		HttpHeaders headers = new HttpHeaders();
		log.info("User: " + requestBody);
		ObjectMapper objectMapper = new ObjectMapper();
		ResponseEntity<LoginResponse> responseEntity = null;
		try {
			JsonNode jsonNode = objectMapper.readTree(requestBody);
			String username = jsonNode.get("username").asText();
			String password = jsonNode.get("password").asText();
			String auth = authService.getBasicAuthenticationHeader(username, password);
			if (auth.isEmpty()) {
				return new ResponseEntity<>(new LoginResponse(false, null), HttpStatus.UNAUTHORIZED);
			}else{
				session.setAttribute("user", username);
				headers.add("Authorization", auth);
				LoginResponse loginResponse = new LoginResponse(true, session.getAttribute("user"));
				responseEntity = ResponseEntity.ok().headers(headers).body(loginResponse);
			}
		} catch (Exception e) {
			log.error("Unable to login, error: " , e);
			return new ResponseEntity<>(new LoginResponse(false, null), HttpStatus.UNAUTHORIZED);
		}
		return responseEntity;
	}

	/**
	 * Register API
	 * @param requestBody
	 * @return
	 */
	@PostMapping("/registerUser")
	public ResponseEntity<User> createUser(@RequestBody String requestBody) {
		log.info(requestBody);
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			JsonNode jsonNode = objectMapper.readTree(requestBody);
			String email = jsonNode.get("email").asText();
			String password = jsonNode.get("password").asText();
			String firstName = jsonNode.get("firstname").asText();
			String lastName = jsonNode.get("lastname").asText();
			String userName = jsonNode.get("username").asText();

			User newUser = new User();
			newUser.setUsername(userName);
			newUser.setEmail(email);
			newUser.setPassword(password);
			newUser.setFirstname(firstName);
			newUser.setLastname(lastName);
			// Role role = new Role();
			// newUser.setRole(role);

			return new ResponseEntity<User>(userService.createUser(newUser),
					HttpStatus.CREATED);
		} catch (Exception e) {
			log.error("Error in registering new user", e);
			return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
