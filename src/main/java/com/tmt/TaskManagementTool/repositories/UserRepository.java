package com.tmt.TaskManagementTool.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tmt.TaskManagementTool.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    //mongodb and spring boot allows to search by property names by dynamically creating queries
    Optional<User> getUserByUsername(String username);
    Optional<User> findByEmail(String email);
    
    
}
