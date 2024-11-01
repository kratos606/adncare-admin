// src/components/Specializations/CreateSpecialization.jsx

import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../hooks/userContext'; // Adjust the path based on your project structure
import BaseURL from '../../../config/app.config';

const CreateSpecialization = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(UserContext);

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    navigate('/login');
  }

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name.trim()) {
      setSnackbar({ open: true, message: 'Name is required.', severity: 'warning' });
      return;
    }

    if (!description.trim()) {
      setSnackbar({ open: true, message: 'Description is required.', severity: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('description', description.trim());

    setLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/specializations`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is stored securely
        },
      });

      setSnackbar({
        open: true,
        message: 'Specialization created successfully!',
        severity: 'success',
      });

      // Redirect to Specializations list after a short delay to show the success message
      setTimeout(() => {
        navigate('/specializations');
      }, 1500);
    } catch (error) {
      console.error('Error creating specialization:', error);

      if (error.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Your session has expired. Please login again.',
          severity: 'error',
        });
        navigate('/login');
      } else if (error.response?.status === 400) {
        // Handle maximum specializations error
        setSnackbar({
          open: true,
          message: error.response.data.message || 'Cannot create more than three specializations.',
          severity: 'error',
        });
      } else if (error.response?.status === 422) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;
        const firstError = Object.values(validationErrors)[0][0];
        setSnackbar({
          open: true,
          message: firstError || 'Validation failed.',
          severity: 'error',
        });
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to create specialization.';
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Show a loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Specialization
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 600,
        }}
      >
        {/* Name Field */}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        {/* Description Field */}
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
          fullWidth
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ alignSelf: 'flex-start' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </Box>

      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateSpecialization;