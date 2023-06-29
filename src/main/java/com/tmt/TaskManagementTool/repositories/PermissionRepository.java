package com.tmt.TaskManagementTool.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tmt.TaskManagementTool.models.Permission;

@Repository
public interface PermissionRepository extends MongoRepository<Permission, ObjectId>{

    Optional<Permission> getPermissionById(String id);
    Optional<Permission> getPermissionByPid(String pid);
    Optional<Permission> getPermissionByName(String name); 
    boolean existsPermissionByName(String name);
}
