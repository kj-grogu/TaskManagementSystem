import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  TextFieldProps,
  FormControl,
} from "@mui/material";
import {
  Search,
  AddCircleOutline,
  Notifications,
  Assignment,
  Dashboard as DashboardIcon,
  Group,
  Assessment,
  AccountCircle,
  Inventory2,
  Close,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import AddTask from "../addtask/AddTask";
import NotificationPane from "../notification/NotificationPane";
import "./Profile.css";

// Import the background image
import backgroundImage from "../images/background.jpg";
import { Card, Container } from "react-bootstrap";

interface Role {
  name: string;
  permissions: string;
}

interface UserProfile {
  id: {
    timestamp: number;
    date: string;
  };
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role | null;
}

const Profile: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [profileData, setProfileData] = useState<UserProfile>();
  const [roleData, setRoleData] = useState<Role>();
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/users/search-username/${user}`
        );
        const data = await response.json();
        setProfileData(data);
      setRoleData(data.role);  
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

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

  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/home/notifications`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      const bodyElements = data.map((d: any) => d.body);
      console.log(data);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleSubmit = () => {
    console.log("Submit Clicked");
    navigate("/dashboard");

    // Send the profileJson object to the server or perform further processing
  };

  return (
    <div className="dashboard-container" style={{  
    backgroundSize: 'cover', minHeight: '100vh', position: 'relative'}}>
      
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
            Welcome, {profileData?.firstname || ""} {profileData?.lastname || ""}!
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
                { <AddTask onCancel={handleClose} /> }
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
        </Toolbar>
      </AppBar>

      {/* SIDE MENU GRID */}
      <Grid container spacing={3} className="content-container">
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

      

  <Container className="form-container">
        <Card>
          <Box p={2}>
            <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
              Profile
            </Typography>

            <Box flexGrow={1} display="flex" flexDirection="column">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-input col-md-6">
                    <InputLabel id="username-label">Username</InputLabel>
                    <TextField
                      value={profileData?.username || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      style={{ borderColor: 'black' }}
                    />
                  </div>

                  <div className="form-input col-md-6">
                    <InputLabel id="email-label">Email</InputLabel>
                    <TextField
                      value={profileData?.email || ""}
                      fullWidth
                      style={{ borderColor: 'black' }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-input col-md-6">
                    <InputLabel id="firstname-label">First Name</InputLabel>
                    <TextField
                      value={profileData?.firstname || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      style={{ borderColor: 'black' }}
                    />
                  </div>

                  <div className="form-input col-md-6">
                    <InputLabel id="lastname-label">Last Name</InputLabel>
                    <TextField
                      value={profileData?.lastname || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      style={{ borderColor: 'black' }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-input col-md-6">
                    <InputLabel id="role-label">Role</InputLabel>
                    <TextField
                      value={roleData?.name || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      style={{ borderColor: 'black' }}
                    />
                  </div>

                  <div className="form-input col-md-6">
  <InputLabel id="permissions-label">Permissions</InputLabel>
  <TextField
    value={roleData?.permissions || ""}
    fullWidth
    InputProps={{ readOnly: true }}
    style={{ borderColor: 'black' , maxHeight: '70px', overflow: 'auto', backgroundColor: '#f5f5f5' }}
    multiline
    rows={roleData?.permissions?.length || 1}
    variant="outlined"
    
    
    InputLabelProps={{ shrink: true }}
  />
</div>
                </div>

                <Button sx={{
      backgroundColor: "grey",
      color: "#fff",
    }} type="submit">Back</Button>
              </form>
            </Box>
          </Box>
        </Card>
      </Container>

    </div>
  );
};

export default Profile;
