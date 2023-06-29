use('taskmanagementdb');

db.createCollection("users");

db.users.insertOne({
  "_id": ObjectId("user_id_1"),
  "username": "john.doe",
  "password": "hashed_password_1",
  "email": "john.doe@example.com"
});

db.users.insertOne({
  "_id": ObjectId("user_id_2"),
  "username": "jane.smith",
  "password": "hashed_password_2",
  "email": "jane.smith@example.com"
});

db.createCollection("tasks");

db.tasks.insertOne({
  "_id": ObjectId("task_id_1"),
  "title": "Complete Project Proposal",
  "description": "Write and submit the project proposal by end of the week",
  "deadline": ISODate("2023-06-05T23:59:59Z"),
  "status": "in progress",
  "assignedTo": ObjectId("user_id_1"),
  "createdBy": ObjectId("user_id_2"),
  "comments": [
    {
      "_id": ObjectId("comment_id_1"),
      "text": "Do we need to include the cost estimation?",
      "createdAt": ISODate("2023-06-01T14:30:00Z"),
      "createdBy": ObjectId("user_id_1")
    },
    {
      "_id": ObjectId("comment_id_2"),
      "text": "Yes, please include the cost estimation as well.",
      "createdAt": ISODate("2023-06-01T15:00:00Z"),
      "createdBy": ObjectId("user_id_2")
    }
  ],
  "attachments": [
    {
      "_id": ObjectId("attachment_id_1"),
      "filename": "project_requirements.pdf",
      "path": "/attachments/project_requirements.pdf"
    }
  ]
});

db.createCollection("roles");

db.roles.insertOne({
  "_id": ObjectId("role_id_1"),
  "name": "Administrator",
  "permissions": ["assignTasks", "updateTaskStatus", "addComments"]
});

db.roles.insertOne({
  "_id": ObjectId("role_id_2"),
  "name": "Manager",
  "permissions": ["assignTasks", "updateTaskStatus"]
});

db.roles.insertOne({
  "_id": ObjectId("role_id_3"),
  "name": "Team Member",
  "permissions": ["updateTaskStatus", "addComments"]
});

db.createCollection("userRoles");

db.userRoles.insertOne({
  "_id": ObjectId("user_role_id_1"),
  "user": ObjectId("user_id_1"),
  "role": ObjectId("role_id_1")
});

db.userRoles.insertOne({
  "_id": ObjectId("user_role_id_2"),
  "user": ObjectId("user_id_2"),
  "role": ObjectId("role_id_3")
});

db.createCollection("notifications");

db.getCollection('Notification').insertOne([
  {  
    "_id": ObjectId("notification_id_1"),
    'taskId': ObjectId("task_id_1"), 
    'body':'test notification', 
    'userId': ObjectId("user_id_2"),
  },
]);
db.Notification.createIndex( { "notificationId": 1, "userId": 1, "taskId": 1} , { unique: true , required : true} )



