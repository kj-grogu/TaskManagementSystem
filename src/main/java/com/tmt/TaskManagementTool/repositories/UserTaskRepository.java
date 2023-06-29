package com.tmt.TaskManagementTool.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tmt.TaskManagementTool.models.UserTask;

@Repository
public interface UserTaskRepository extends MongoRepository<UserTask, String>{
    
}
