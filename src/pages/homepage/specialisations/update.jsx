// src/components/Specializations/UpdateSpecialization.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../hooks/userContext'; // Adjust the path based on your project structure
import BaseURL from '../../../config/app.config';

const UpdateSpecialization = () => {
  const { id } = useParams(); // Extract specialization ID from URL parameters
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentSpecialization, setCurrentSpecialization] = useState(null); // To store existing specialization data
  const [loading, setLoading] = useState(true); // Loading state for fetching existing data
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(UserContext);

  // Function to fetch existing specialization data
  const fetchSpecialization = async () => {
    try {
      const response = await axios.get(`${BaseURL}/specializations/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data.data; // Adjust based on your API response structure
      setCurrentSpecialization(data);
      setName(data.name);
      setDescription(data.description);
    } catch (error) {
      console.error('Error fetching specialization:', error);
      if (error.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Your session has expired. Please login again.',
          severity: 'error',
        });
        navigate('/login');
      } else if (error.response?.status === 404) {
        setSnackbar({
          open: true,
          message: 'Specialization not found.',
          severity: 'error',
        });
        navigate('/specializations');
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to fetch specialization.',
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch specialization data when the component mounts or when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSpecialization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to handle form submission for updating specialization
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

    setSubmitting(true);

    try {
      const response = await axios.put(`${BaseURL}/specializations/${id}`, {
        name:name,
        description:description
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSnackbar({
        open: true,
        message: 'Specialization updated successfully!',
        severity: 'success',
      });

      // Redirect to Specializations list after a short delay to show the success message
      setTimeout(() => {
        navigate('/specializations');
      }, 1500);
    } catch (error) {
      console.error('Error updating specialization:', error);

      if (error.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Your session has expired. Please login again.',
          severity: 'error',
        });
        navigate('/login');
      } else if (error.response?.status === 404) {
        setSnackbar({
          open: true,
          message: 'Specialization not found.',
          severity: 'error',
        });
        navigate('/specializations');
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
        const errorMessage = error.response?.data?.message || 'Failed to update specialization.';
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Show a loading spinner while fetching data
  if (loading || isLoading) {
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
        Update Specialization
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
          inputProps={{
            maxLength:30
          }}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        {/* Description Field */}
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          inputProps={{
            maxLength:234
          }}
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
          disabled={submitting}
          sx={{ alignSelf: 'flex-start' }}
        >
          {submitting ? <CircularProgress size={24} /> : 'Update'}
        </Button>
      </Box>

      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateSpecialization;