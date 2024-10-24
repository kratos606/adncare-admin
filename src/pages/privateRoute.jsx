import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import UserContext from '../hooks/userContext';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WebIcon from '@mui/icons-material/Web';
import WelcomeIcon from '@mui/icons-material/EmojiPeople';
import {
  Dashboard,
  Image as ImageIcon,
  VideoLibrary,
  AddPhotoAlternate,
  Add as AddIcon,
  PhotoLibrary,
  OndemandVideo,
} from '@mui/icons-material';
import axios from 'axios';

const drawerWidth = 240;

function PrivateRoute() {
  const { user, isLoading, setUser } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [openVideos, setOpenVideos] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleHomeClick = () => {
    setOpenHome(!openHome);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setUser({});
      await axios.get('http://127.0.0.1:8000/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log('Unauthorized access, redirecting to login...');
      } else {
        console.log(err);
      }
      navigate('/login');
    }
  };

  const menuItems = [
    { text: 'Users', icon: <PersonIcon />, path: '/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {/* Dashboard */}
        <ListItem 
          button 
          component={Link}
          to={'/'}
          key={'Dashboard'}
        >
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>

        {/* Home Section */}
        <ListItem button onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
          {openHome ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openHome} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Existing Home Sub-items */}
            <ListItem 
              button 
              component={Link} 
              to="/hero-section"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Hero Section" />
            </ListItem>
            <ListItem 
              button 
              component={Link} 
              to="/welcome-section"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <WelcomeIcon />
              </ListItemIcon>
              <ListItemText primary="Welcome Section" />
            </ListItem>

            {/* Images Sub-section */}
            <ListItem button onClick={() => setOpenImages(!openImages)} sx={{ pl: 4 }}>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Images" />
              {openImages ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openImages} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  component={Link} 
                  to="/images"
                  sx={{ pl: 8 }}
                >
                  <ListItemIcon>
                    <PhotoLibrary />
                  </ListItemIcon>
                  <ListItemText primary="All Images" />
                </ListItem>
                <ListItem 
                  button 
                  component={Link} 
                  to="/images/create"
                  sx={{ pl: 8 }}
                >
                  <ListItemIcon>
                    <AddPhotoAlternate />
                  </ListItemIcon>
                  <ListItemText primary="Upload Image" />
                </ListItem>
              </List>
            </Collapse>

            {/* Videos Sub-section */}
            <ListItem button onClick={() => setOpenVideos(!openVideos)} sx={{ pl: 4 }}>
              <ListItemIcon>
                <VideoLibrary />
              </ListItemIcon>
              <ListItemText primary="Videos" />
              {openVideos ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openVideos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  component={Link} 
                  to="/videos"
                  sx={{ pl: 8 }}
                >
                  <ListItemIcon>
                    <OndemandVideo />
                  </ListItemIcon>
                  <ListItemText primary="All Videos" />
                </ListItem>
                <ListItem 
                  button 
                  component={Link} 
                  to="/videos/create"
                  sx={{ pl: 8 }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload Video" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* Other menu items */}
        {menuItems.map((item) => (
          <ListItem 
            button 
            component={Link}
            to={item.path}
            key={item.text}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && Object.keys(user).length !== 0) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Navbar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              <img src="/logo.svg" alt="logo" style={{height:'30px'}} />
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;