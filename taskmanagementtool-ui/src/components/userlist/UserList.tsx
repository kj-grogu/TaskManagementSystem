import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Select,
  Typography,
  MenuItem,
  IconButton,
  AppBar,
  SelectChangeEvent,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Search,
  AddCircleOutline,
  Notifications,
  Dashboard as DashboardIcon,
  Group,
  Assessment,
  AccountCircle,
  Logout,
  Inventory2,
  Save,
  Menu as MenuIcon,
} from "@mui/icons-material";

import AddTask from "../addtask/AddTask";
import NotificationPane from "../notification/NotificationPane";
import "./UserList.css";

interface User {
  id: {
    timestamp: number;
    date: string;
  };
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string | null;
  permission: string | null;
}
interface Role {
  rid: string;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const user = sessionStorage.getItem("user");
  const [rid, setRid] = useState<String>();
  const [ridRoles, setRIDRoles] = useState<Role[]>([]);
  const [selectedRid, setSelectedRid] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  const drawerItems = [
    { text: "Profile", icon: <AccountCircle />, route: "/profile" },
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { text: "Report", icon: <Assessment />, route: "/report" },
    { text: "All Users", icon: <Group />, route: "/userList" },
    { text: "All Tasks", icon: <Inventory2 />, route: "/taskList" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationPaneOpen, setNotificationPaneOpen] = useState(false);

  const handleAddButtonClick = () => {
    // Handle the button click event here
    console.log("Button clicked!");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log("Submit Clicked");
    // Handle form submission logic here
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked!");
    setNotificationPaneOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationPaneOpen(false);
  };

  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked!");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userAuth");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  /*const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/roles", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      const rolesList = data.map((role: any) => role.name);
      const permissionsList = data.map((role: any) => role.permissions);
      setRoles(rolesList);
      setPermissions(permissionsList);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/roles/${rid}/permissions",
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      //const data = await response.json();
      //const permissionsList = data.map((permission: any) => permission.name);
      const permissionsList = ["Read", "Write", "All"];
      //setPermissions(permissionsList);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };*/

  const roleMap: { [name: string]: string } = {};

  const populateRoleMap = (data: any[]) => {
    data.forEach((role: any) => {
      roleMap[role.name] = role.rid;
    });
  };
  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/roles", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      const rolesList = data.map((role: any) => role.name);
      const ridNameArray = data.map((item: any) => ({
        rid: item.rid,
        name: item.name,
      }));
      setRIDRoles(ridNameArray);

      populateRoleMap(data);
      console.log(roleMap);
      setRoles(rolesList);
      const uniquePermissions: string[] = [];

      data.forEach((obj: any) => {
        // Step 3: Access the 'permissions' property of each object
        const permissions = obj.permissions;

        // Step 4: Iterate over the 'permissions' array
        permissions.forEach((permission: string) => {
          // Step 5: Check if the permission is already present in the unique permissions array
          if (!uniquePermissions.includes(permission)) {
            // If not present, add it to the unique permissions array
            uniquePermissions.push(permission);
          }
        });
      });

      // 'uniquePermissions' now contains the list of all unique permissions
      console.log(uniquePermissions);
      setPermissions(uniquePermissions);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleRoleChange = (
    event: SelectChangeEvent<string>,
    userName: string
  ) => {
    const selectedRole = event.target.value;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === userName ? { ...user, role: selectedRole } : user
      )
    );
  };
  
  const handlePermissionChange = (
    event: SelectChangeEvent<string>,
    userName: string
  ) => {
    const selectedPermission = event.target.value;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === userName
          ? { ...user, permission: selectedPermission }
          : user
      )
    );
  };

  const handleSaveUser = async (username: string) => {
    const userToUpdate = users.find((user) => user.username === username);
    if (userToUpdate) {
      try {
        //edit-user/
        await fetch(
          `http://localhost:8080/api/v1/users/assign-role/${userToUpdate.username}`,
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(userToUpdate),
          }
        );
        // You can add a success message or perform any necessary actions after saving the user
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <AppBar className="app-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={toggleDrawer(true)}
            edge="start"
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Welcome, {user}!
          </Typography>

          <div>
            <IconButton
              color="inherit"
              size="large"
              onClick={handleAddButtonClick}
            >
              <AddCircleOutline />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={handleClose}>
              <Box sx={{ width: 700, padding: "1rem" }}>
                {<AddTask onCancel={handleClose} /> }
              </Box>
            </Drawer>
          </div>

          <div className="search-bar">
            

            <IconButton color="inherit" size="large">
              <Search />
            </IconButton>
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, color: "inherit", width: "100px" }}
            />
          </div>
          <IconButton color="inherit" size="large" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* SIDE MENU GRID */}
      <Grid container spacing={2} className="content-container">
        <Grid item xs={3} className="drawer-container">
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box sx={{ width: 300, padding: "1rem" }}>
              <List>
                {drawerItems.map((item, index) => (
                  <ListItem button key={index} component={Link} to={item.route}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: "#f5f5f5", padding: "100px",   paddingLeft:"80px", paddingRight:"80px"}}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", color: "darkgray" }}
          >
            User List
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>USERNAME</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>EMAIL</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>FIRST NAME</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>LAST NAME</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>ROLE</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>PERMISSIONS</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>UPDATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.username} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                    <TableCell sx={{ textAlign: "center" }}>{user.username}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.firstname}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.lastname}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role || ""}
                        onChange={(event) =>
                          handleRoleChange(event, user.username)
                        }
                        sx={{ width: "100%" }}
                      >
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    
                    <TableCell>
                      <Select
                        value={user.permission || ""}
                        onChange={(event) =>
                          handlePermissionChange(event, user.username)
                        }
                        sx={{ width: "100%" }}
                      >
                        {permissions.map((permission) => (
                          <MenuItem key={permission} value={permission}>
                            {permission}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    
                    
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => handleSaveUser(user.username)}>
                        <Save color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserList;
