package com.tmt.TaskManagementTool.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "User")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;
    private String username;
    private String password;
    private String email;
    private String firstname;
    private String lastname;
    @DocumentReference
    private Role role;

}
