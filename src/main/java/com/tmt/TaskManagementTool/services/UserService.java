package com.tmt.TaskManagementTool.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.tmt.TaskManagementTool.models.Role;
import com.tmt.TaskManagementTool.models.User;
import com.tmt.TaskManagementTool.repositories.RoleRepository;
import com.tmt.TaskManagementTool.repositories.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByUsername(String username) {
        Optional<User> userOptional = userRepository.getUserByUsername(username);
        User user = userOptional.orElseThrow(()->new IllegalStateException("No user found with username: " + username));
        return user;
    }

    public User createUser(User user) {
        
        return userRepository.insert(user);
    }

    public User updateUser(User user) {
       return userRepository.save(user);
    }

    public void deleteUser(String username) {
        Optional<User> user = userRepository.getUserByUsername(username);
        ObjectId id = user.get().getId();
        userRepository.deleteById(id);
        log.info("User {} deleted", username);
    }


    
}
