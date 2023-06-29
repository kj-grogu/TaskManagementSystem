package com.tmt.TaskManagementTool.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tmt.TaskManagementTool.models.Attachment;

public interface AttachmentRepository extends MongoRepository<Attachment, String>{
    List<Attachment> findAttachmentsByTaskid(String taskid);
    
}
