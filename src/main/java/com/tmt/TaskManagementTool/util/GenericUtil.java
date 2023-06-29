package com.tmt.TaskManagementTool.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.tmt.TaskManagementTool.models.Role;
import com.tmt.TaskManagementTool.models.User;

@Component("genericUtil")
public class GenericUtil {

    public User registerUser(JsonNode jsonNode){
		return newUserForm(jsonNode);	
    }

    public User createUser(JsonNode jsonNode){
        User user = newUserForm(jsonNode);
        String roleid = jsonNode.get("roleid").asText();
        String roleName = jsonNode.get("rolename").asText();
        Role role = new Role();
        role.setRid(roleid);
        role.setName(roleName);
        // TODO create list of permissions and assign it to role and then to user
        user.setRole(role);
        return user;	
    }

    public User updateUserForm(JsonNode jsonNode, User user){
      String email = jsonNode.get("email").asText();
		  String password = jsonNode.get("password").asText();
		  String firstName = jsonNode.get("firstname").asText();
		  String lastName = jsonNode.get("lastname").asText();
		  String userName = jsonNode.get("username").asText();
      String roleid = jsonNode.get("roleid").asText();
      String roleName = jsonNode.get("rolename").asText();
      //TODO update permissions
      user.setEmail(email);
      user.setFirstname(firstName);
      user.setLastname(lastName);
      user.setUsername(userName);
      user.setPassword(password);
      Role role = user.getRole();
      //role.setRid(roleid);
      //role.setName(roleName);
      user.setRole(role);
      return user;

    }

    public void createTaskForm(){}

    public void updateTaskForm(){}

    private User newUserForm(JsonNode jsonNode){
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
      return newUser;
	  }

    public String getCurrentDateTime(){
      LocalDateTime dateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm");
        return dateTime.format(formatter);
    }
}
