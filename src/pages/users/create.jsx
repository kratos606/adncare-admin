// src/pages/Create.jsx

import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseURL from '../../config/app.config';

// Form validation
const validateForm = (formData) => {
  const errors = {};
  if (!formData.name) errors.name = 'Name is required';
  if (!formData.email) errors.email = 'Email is required';
  if (!formData.password) errors.password = 'Password is required';
  return errors;
};

// User form component
const UserForm = ({ formData, handleChange, handleSubmit, loading, onCancel }) => (
  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <TextField
      label="Name"
      name="name"
      fullWidth
      margin="normal"
      required
      value={formData.name}
      onChange={handleChange}
    />
    <TextField
      label="Email"
      name="email"
      type="email"
      fullWidth
      margin="normal"
      required
      value={formData.email}
      onChange={handleChange}
    />
    <TextField
      label="Password"
      name="password"
      type="password"
      fullWidth
      margin="normal"
      required
      value={formData.password}
      onChange={handleChange}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Create'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </Button>
    </Box>
  </Box>
);

// Notification component
const Notification = ({ snackbar, handleClose }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  >
    <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
      {snackbar.message}
    </Alert>
  </Snackbar>
);

// Main component
const Create = () => {
  const navigate = useNavigate();
  const [openHomepage, setOpenHomepage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      showNotification('Please fill in all required fields.', 'warning');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BaseURL}/register`, formData);
      showNotification('User created successfully!');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create user. Please try again.';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: 'flex',flexDirection:'column' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New User
        </Typography>
        
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate('/users')}
        />

        <Notification 
          snackbar={snackbar}
          handleClose={handleCloseSnackbar}
        />
    </Box>
  );
};

export default Create;