package com.tmt.TaskManagementTool.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tmt.TaskManagementTool.models.Notification;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, ObjectId>{
    
    List<Notification> getAllNotificationsByTaskId(String taskId);
    List<Notification> getAllNotificationsByUserId(String userId);
}
