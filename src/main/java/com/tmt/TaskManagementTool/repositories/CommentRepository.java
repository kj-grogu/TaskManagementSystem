package com.tmt.TaskManagementTool.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tmt.TaskManagementTool.models.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, ObjectId>{
    //show all comments
    List<Comment> findCommentsByTaskId(String taskId);
}
