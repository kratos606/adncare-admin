import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import './App.css'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true;

// Request interceptor to add token from localStorage
axios.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401) {
          localStorage.removeItem('token');
          // Optionally redirect to login page
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const PrivateRoute = lazy(() => import('./pages/privateRoute'));
const Users = lazy(() => import('./pages/users'));
const Create = lazy(() => import('./pages/users/create'));
const Update = lazy(() => import('./pages/users/update'));
const UpdateHeroForm = lazy(() => import('./pages/homepage/herosection'));
const WelcomeForm = lazy(() => import('./pages/homepage/welcomesection'));
const Images = lazy(() => import('./pages/homepage/images/images'));
const Videos = lazy(() => import('./pages/homepage/videos/video'));
const CreateImage = lazy(() => import('./pages/homepage/images/create'));
const UpdateImage = lazy(() => import('./pages/homepage/images/update'));
const CreateVideo = lazy(() => import('./pages/homepage/videos/create'));
const UpdateVideo = lazy(() => import('./pages/homepage/videos/update'));
const Specialisations = lazy(() => import('./pages/homepage/specialisations/specialisations'));
const CreateSpecialization = lazy(() => import('./pages/homepage/specialisations/create'));
const UpdateSpecialization = lazy(() => import('./pages/homepage/specialisations/update'));
const ProductForm = lazy(() => import('./pages/homepage/productsection'));
const UpdateGalleryForm = lazy(() => import('./pages/gallery/gallery'));
const CreateGalleryVideo = lazy(() => import('./pages/gallery/videos/create'));
const GalleryVideos = lazy(() => import('./pages/gallery/videos/video'));
const UpdateGalleryVideo = lazy(() => import('./pages/gallery/videos/update'));
const GalleryImages = lazy(() => import('./pages/gallery/images/images'));
const CreateGalleryImage = lazy(() => import('./pages/gallery/images/create'));
const UpdateGalleryImage = lazy(() => import('./pages/gallery/images/update'));
const SpecialiteForm = lazy(() => import('./pages/specialite'));
const AproposForm = lazy(() => import('./pages/apropos/apropos'));
const AproposSectionTwoForm = lazy(() => import('./pages/apropos/apropostwo'));
const ContactSubmissionsPage = lazy(() => import('./pages/contact'));
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

// Define your color palette
const palette = {
  primary: {
    main: '#5662f9', // Soft Indigo
    light: '#8E99F3',
    dark: '#3949AB',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF7043', // Warm Orange
    light: '#FFAB91',
    dark: '#D84315',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F5F5F5', // Light Gray
    paper: '#FFFFFF', // White
  },
  text: {
    primary: '#333333', // Dark Grey
    secondary: '#757575', // Medium Grey
  },
};

// Customize typography
const typography = {
  fontFamily: "'Anta', sans-serif",
  h1: {
    fontSize: '2.4rem',
    fontWeight: 700,
    color: '#333333',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#333333',
  },
  body1: {
    fontSize: '1rem',
    color: '#555555',
  },
  button: {
    textTransform: 'none', // Remove uppercase from buttons
    fontWeight: 600,
  },
};

// Customize component styles
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: palette.primary.main,
        boxShadow: 'none',
        borderBottom: `1px solid ${palette.divider}`,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  // Add more component overrides as needed
};

// Create the theme
const theme = createTheme({
  palette,
  typography,
  components,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path='users' element={<Users />} />
              <Route path='create' element={<Create />} />
              <Route path='update/:id' element={<Update />} />
              <Route path='hero-section' element={<UpdateHeroForm />} />
              <Route path='welcome-section' element={<WelcomeForm />} />
              <Route path='images' element={<Images />} />
              <Route path='images/create' element={<CreateImage />} />
              <Route path='images/update/:id' element={<UpdateImage />} />
              <Route path='videos' element={<Videos />} />
              <Route path='videos/create' element={<CreateVideo />} />
              <Route path='videos/update/:id' element={<UpdateVideo />} />
              <Route path='specializations' element={<Specialisations />} />
              <Route path='specializations/create' element={<CreateSpecialization />} />
              <Route path='specializations/update/:id' element={<UpdateSpecialization />} />
              <Route path='product' element={<ProductForm />} />
              <Route path='galerie' element={<UpdateGalleryForm />} />
              <Route path='galerie/videos' element={<GalleryVideos />} />
              <Route path='galerie/videos/create' element={<CreateGalleryVideo />} />
              <Route path='galerie/videos/update/:id' element={<UpdateGalleryVideo />} />
              <Route path='galerie/images' element={<GalleryImages />} />
              <Route path='galerie/images/create' element={<CreateGalleryImage />} />
              <Route path='galerie/images/update/:id' element={<UpdateGalleryImage />} />
              <Route path='specialite' element={<SpecialiteForm />} />
              <Route path='apropos' element={<AproposForm />} />
              <Route path='apropos-second' element={<AproposSectionTwoForm />} />
              <Route path='contact' element={<ContactSubmissionsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App