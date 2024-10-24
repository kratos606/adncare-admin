import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:''
    // Add other fields as necessary
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }); // Adjust endpoint
      console.log(response)
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        password:''
        // Populate other fields
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      setSnackbar({ open: true, message: 'Failed to fetch user data.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setSnackbar({ open: true, message: 'Please fill in all fields.', severity: 'warning' });
      return;
    }

    setUpdating(true);
    try {
      await axios.put(`http://localhost:8000/users/${id}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
      // Optionally, navigate back after a delay
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update user.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  // Handle Snackbar Close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Update User
      </Typography>
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
        {/* Add more fields as necessary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={updating}
          >
            {updating ? <CircularProgress size={24} /> : 'Update'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/admin')}
            disabled={updating}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Snackbar for Notifications */}
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

export default Update;