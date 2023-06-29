import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Toolbar,
  AppBar,
  Paper,
  Drawer,
  List,
  ListItem,
  InputBase,
  Badge,
  IconButton,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Box,
  TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
 
} from "@mui/material";
import {
  Search,
  AddCircleOutline,
  Notifications,
  Dashboard as DashboardIcon,
  Group,
  Assessment,
  AccountCircle,
  Inventory2,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import AddTask from "../addtask/AddTask";
import NotificationPane from "../notification/NotificationPane";

interface Task {
  id: number;
  tid:number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  dueDate: string;
}

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

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
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
      console.log("users: ",data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Simulating fetching tasks from an API with a stub data
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/tasks/all-tasks",
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const data = await response.json();
        setTasks(data);
        console.log("task: ",data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Apply filters when any of the filter values change
    const filteredTasks = tasks.filter((task) => {
      const statusMatch =
        statusFilter === "" ||
        task.status.toLowerCase() === statusFilter.toLowerCase();
      const assignedToMatch =
        assignedToFilter === "All" ||
        task.assignedTo.toLowerCase().includes(assignedToFilter.toLowerCase());
      const dueDateMatch =
        dueDateFilter === "" || task.dueDate === dueDateFilter;

      return statusMatch && assignedToMatch && dueDateMatch;
    });

    setFilteredTasks(filteredTasks);
  }, [tasks, statusFilter, assignedToFilter, dueDateFilter]);

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

  const handleNotificationClick = () => {
    console.log("Notification clicked!");
    setNotificationPaneOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationPaneOpen(false);
  };

  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  return (
    <div className="dashboard-container">
      <AppBar position="static" className="app-bar">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {user}!
          </Typography>

          <div>
           
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

      <Grid container spacing={2} className="custom-content-container">
        <Grid item xs={12}>
          <Paper>
          <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", color: "darkgray" , padding: "2rem"}}
          >
            Task List
          </Typography>
        </Grid>

            <div style={{ paddingLeft: "5rem" , paddingRight: "5rem", paddingBottom:"1rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <InputLabel id="priority-label">Status</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="status-filter-label"
                      value={statusFilter}
                      sx={{ width: "100%"}}
                      onChange={(e) =>
                        setStatusFilter(e.target.value as string)
                      }
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="NEW">NEW</MenuItem>
                      <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
                      <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  {/* <TextField
                    fullWidth
                    label="Assigned To"
                    value={assignedToFilter}
                    onChange={(e) => setAssignedToFilter(e.target.value)}
                  /> */}

                  <InputLabel id="priority-label">AssingedTo</InputLabel>
                  <Select
                    labelId="user-label"
                    value={assignedToFilter}
                    onChange={(e) => {
                      setAssignedToFilter(e.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="All">All</MenuItem>
                    {users.map((user) => (
                      <MenuItem value={user.username}>{user.username}</MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={4}>
                  <InputLabel id="priority-label">Due Date</InputLabel>
                  <TextField
                    fullWidth
                    type="date"
                    value={dueDateFilter}
                    onChange={(e) => setDueDateFilter(e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>

            <TableContainer component={Paper} style={{ paddingLeft: "5rem" , paddingRight: "5rem", paddingBottom:"1rem"}}>
  <Table>
    <TableHead>
      <TableRow>
      <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>TASK ID</TableCell>
        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>TITLE</TableCell>
        <TableCell sx={{ fontWeight: "bold", textAlign: "center" , wordWrap: "break-word"}}>DESCRIPTION</TableCell>
        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>STATUS</TableCell>
        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>ASSIGNEE</TableCell>
        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>DEADLINE</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredTasks.map((task, index) => (
        <TableRow key={task.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
          <TableCell sx={{ textAlign: "center" }}>{task.tid}</TableCell>
          <TableCell>{task.title}</TableCell>
          <TableCell>{task.description}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>{task.status}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>{task.assignedTo}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>{task.dueDate}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>






          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskList;
