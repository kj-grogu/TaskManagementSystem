package com.tmt.TaskManagementTool.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tmt.TaskManagementTool.models.Role;

@Repository
public interface RoleRepository extends MongoRepository<Role, ObjectId>{
    Optional<Role> getRoleById(String id);
    Optional<Role> getRoleByRid(String rid);
    Optional<Role> getRoleByName(String name);
     
}
