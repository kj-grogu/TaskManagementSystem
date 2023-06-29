## Users Table:

### Field	        Type	            Key	                                Constraints

    user_id	        int	                Primary	                            Autoincrement, Unique
    username	    varchar(50)		                                        Not null
    password	    varchar(255)		                                    Not null
    email	        varchar(255)		                                    Not null
    rid	        int	                Foreign	References Roles(role_id)


## Roles Table

### Field	        Type	            Key	Constraints

rid	int	Primary	Autoincrement, Unique
name	varchar(50)		Not null
permission	varchar(255)		Not null



Tasks table:
Field	Type	Key	Constraints
tid	int	Primary	Autoincrement, Unique
title	varchar(255)		Not null
description	text		
assignedTo	int	Foreign	References Users(user_id)
createdBy	int	Foreign	References Users(user_id)
status	varchar(50)		Not null
deadline	datetime		Not null
createdAt	datetime		Not null
updatedAt	datetime		Not null



Comments table:
Field	Type	Key	Constraints
comment_id	int	Primary	Autoincrement, Unique
taskId	int	Foreign	References Tasks(task_id)
createdBy	int	Foreign	References Users(user_id)
body	text		Not null
createdAt	datetime		Not null




Attachments table:
Field	Type	Key	Constraints
attachment_id	int	Primary	Autoincrement, Unique
task_id	int	Foreign	References Tasks(task_id)

Notifications table:
Field	Type	Key	Constraints
notificationId	int	Primary	Autoincrement, Unique
userId	int	Foreign	References Users(user_id)
taskId	int	Foreign	References Tasks(task_id)
message	text		Not null
createdAt	datetime		Not null

