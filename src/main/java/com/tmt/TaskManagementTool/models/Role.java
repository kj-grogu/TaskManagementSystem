package com.tmt.TaskManagementTool.models;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document( collection = "Role")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    private ObjectId id;
    private String rid;
    private String name;
    private List<String> permissions;
    
}
