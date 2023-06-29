/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('taskmanagementdb');


// Insert a few documents into the sales collection.
db.getCollection('User').insertMany([
  { 
    'firstname': 'Neha', 
    'lastname': 'Raj', 
    'username': 'nraj', 
    'password': 'nraj@123', 
    'email': 'nraj@xyz.com', 
    'role':[
      { 
        'rid': 'R1', 
        'name': 'Administrator', 
        'permissions': [
          {
            'pid': 'P1',
            'name': 'Create User'
          }],
        }
    ]
  },
  { 
    'firstname': 'Bharti', 
    'lastname': 'Prakash', 
    'username': 'bprak', 
    'password': 'bprak@123', 
    'email': 'bprak@xyz.com',
    'role':[
      { 
        'rid': 'R1', 
        'name': 'Administrator', 
        'permissions': [
          {
            'pid': 'P1',
            'name': 'Create User'
          }],
        }
    ]
  },
  { 
    'firstname': 'Silvi', 
    'lastname': 'Monga', 
    'username': 'smong', 
    'password': 'smong@123', 
    'email': 'smong@xyz.com',
    'role':[
      { 
      'rid': 'R1', 
      'name': 'Administrator', 
      'permissions': [
        {
          'pid': 'P1',
          'name': 'Create User'
        }],
      }
    ]
  },
]);
db.User.createIndex( { "username": 1, "email": 1 } , { unique: true , required : true} )

db.createCollection('permissions');

// Insert a few documents into the sales collection.
db.Role.insertOne({
  "_id": ObjectId("role_id_1"),
  "rid": "R1",
"name": "Administrator",
  "permissions": ["assignTasks", "updateTaskStatus", "addComments"]
});

db.Role.insertOne({
  "_id": ObjectId("role_id_2"),
  "rid": "R2",
  "name": "Manager",
  "permissions": ["assignTasks", "updateTaskStatus"]
});

db.Role.insertOne({
  "_id": ObjectId("role_id_3"),
  "rid": "R3",
  "name": "Team Member",
  "permissions": ["updateTaskStatus", "addComments"]
});


db.getCollection('Comment').insertMany([
  { 
    'taskId': 'T1', 
    'body': 'test comment', 
    'createdAt': '', 
    'createdBy': 'nraj' 
  },
]);

db.getCollection('Notification').insertMany([
  {  
    'taskId': 'T1', 
    'body':'test notification', 
    'userId': 'nraj'
  },
]);


db.getCollection('Task').insertMany([

  {
    'tid': 'T1',
    'title': 'Finish project proposal',
    'description': 'Write up the final version of the project proposal document',
    'status': 'In progress',
    'priority': 'High',
    'createdBy': 'nraj',
    'createdAt': '2023-05-13',
    'assignedTo': 'pbuf',
    'assignedBy': 'smong',
    'assignedDate': '2023-05-13',
    'assignedTime': '09:00 AM',
    'dueDate': '2023-06-01',
    'dueTime': '05:00 PM',
    'taskType': 'Document',
    'taskCategory': 'Project Management',
    'comments' : [
      {
        'commentId': 'C1', 
        'taskId': 'T1', 
        'body': 'test comment', 
        'createdAt': '', 
        'createdBy': 'nraj'
      }
    ],
    'attachments' : [
      {
        'attachmentId': 'A1'
      }
    ]
},
]);

db.Task.createIndex( {"tid": 1} , { unique: true, required : true} )


db.getCollection('UserTask').insertMany([
  { 
    'taskId': 'T1', 
    'assignedTo': 'nraj', 
    'createdBy': 'nraj' 
  },
]);

db.getCollection('Attachment').insertMany([
  { 
    'id': 'A1', 
    'taskId': 'T1', 
    'filename': 'pic.jpeg', 
  },
]);


// Run a find command to view items sold on April 4th, 2014.
//const salesOnApril4th = db.getCollection('sales').find({
 // date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
//}).count();

// Print a message to the output window.
//onsole.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
//db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
//  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
//  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
//]);
