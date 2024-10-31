// PrivateRoute.js
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import HeroIcon from '@mui/icons-material/Landscape';
import WelcomeIcon from '@mui/icons-material/EmojiPeople';
import ImagesIcon from '@mui/icons-material/Image';
import AllImagesIcon from '@mui/icons-material/Collections';
import UploadIcon from '@mui/icons-material/CloudUpload';
import VideosIcon from '@mui/icons-material/VideoLibrary';
import AllVideosIcon from '@mui/icons-material/PlaylistPlay';
import SpecializationsIcon from '@mui/icons-material/Category';
import ProductIcon from '@mui/icons-material/ShoppingCart';
import GalerieIcon from '@mui/icons-material/PhotoLibrary';
import AboutIcon from '@mui/icons-material/Info';
import ContactIcon from '@mui/icons-material/ContactMail';
import GradeIcon from '@mui/icons-material/Grade';
import axios from 'axios';
import BaseURL from '../config/app.config';

const drawerWidth = 240;

function PrivateRoute() {
  const { user, isLoading, setUser } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [openVideos, setOpenVideos] = useState(false);
  const [openGalerie, setOpenGalerie] = useState(false);
  const [openGalerieImages, setOpenGalerieImages] = useState(false);
  const [openGalerieVideos, setOpenGalerieVideos] = useState(false);
  const [openApropos, setOpenApropos] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleHomeClick = () => {
    setOpenHome(!openHome);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      localStorage.removeItem('token');
      setUser({});
      await axios.get(`${BaseURL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
      navigate('/login');
    }
  };

  const menuItems = [
    { text: 'Users', icon: <PersonIcon />, path: '/users' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" key="Dashboard">
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Home Section */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleHomeClick}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
            {openHome ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openHome} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/hero-section" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <HeroIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Hero Section" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/welcome-section" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WelcomeIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Welcome Section" />
              </ListItemButton>
            </ListItem>

            {/* Images Sub-section */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenImages(!openImages)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ImagesIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Images" />
                {openImages ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={openImages} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/images" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <AllImagesIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="All Images" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/images/create" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <UploadIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="Upload Image" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Videos Sub-section */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenVideos(!openVideos)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <VideosIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Videos" />
                {openVideos ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={openVideos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/videos" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <AllVideosIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="All Videos" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/videos/create" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <UploadIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="Upload Video" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Specializations */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/specializations" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SpecializationsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Specializations" />
              </ListItemButton>
            </ListItem>

            {/* Product */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/product" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ProductIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Bullet Section" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Galerie */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenGalerie(!openGalerie)}>
            <ListItemIcon>
              <GalerieIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Galerie" />
            {openGalerie ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openGalerie} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="galerie/" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <HeroIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Gallery Page" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenGalerieImages(!openGalerieImages)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ImagesIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Images" />
                {openGalerieImages ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={openGalerieImages} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="galerie/images" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <AllImagesIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="All Images" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="galerie/images/create" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <UploadIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="Upload Image" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Videos Sub-section */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenGalerieVideos(!openGalerieVideos)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <VideosIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Videos" />
                {openGalerieVideos ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={openGalerieVideos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="galerie/videos" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <AllVideosIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="All Videos" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="galerie/videos/create" sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <UploadIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText primary="Upload Video" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* Galerie */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/specialite">
            <ListItemIcon>
              <GradeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Specialite" />
          </ListItemButton>
        </ListItem>

        {/* About and Contact */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenApropos(!openApropos)}>
            <ListItemIcon>
              <AboutIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="À Propos" />
            {openApropos ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openApropos} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="apropos" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AboutIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="À Propos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="apropos-second" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AboutIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="À Propos Second" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="contact">
            <ListItemIcon>
              <ContactIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>

        {/* Other dynamic menu items */}
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>
                {React.cloneElement(item.icon, { color: 'primary' })}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    );
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
              <img src="/logo.svg" alt="logo" style={{ height: '30px' }} />
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
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
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
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
            backgroundColor: '#f4f6f8',
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