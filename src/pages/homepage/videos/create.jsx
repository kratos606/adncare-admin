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
import UserContext from '../../../hooks/userContext';
import BaseURL from '../../../config/app.config';

const CreateVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Added Description State
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(UserContext);

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    navigate('/login');
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title.trim()) {
      setSnackbar({
        open: true,
        message: 'Title is required.',
        severity: 'warning',
      });
      return;
    }

    if (!description.trim()) { // Validate Description
      setSnackbar({
        open: true,
        message: 'Description is required.',
        severity: 'warning',
      });
      return;
    }

    if (!videoFile) {
      setSnackbar({
        open: true,
        message: 'Video file is required.',
        severity: 'warning',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description); // Append Description
    formData.append('video', videoFile);

    setLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSnackbar({
        open: true,
        message: 'Video uploaded successfully!',
        severity: 'success',
      });

      // Redirect to Videos list after a short delay to show the success message
      setTimeout(() => {
        navigate('/videos');
      }, 1500);
    } catch (error) {
      console.error('Error uploading video:', error);

      if (error.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Your session has expired. Please login again.',
          severity: 'error',
        });
        navigate('/login');
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to upload video.';
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // If user data is still loading, show a loader
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
        Upload New Video
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 600, // Increased maxWidth for better layout
        }}
      >
        {/* Title Field */}
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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
        />

        {/* Video Upload Field */}
        <Button variant="contained" component="label">
          Upload Video
          <input
            type="file"
            hidden
            accept="image/*" // Updated to accept video files
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setVideoFile(e.target.files[0]);
              }
            }}
            required
          />
        </Button>

        {/* Video Preview */}
        {videoFile && (
          <Box>
            <Typography variant="body2">Video Preview:</Typography>
            <img
              src={URL.createObjectURL(videoFile)} // Changed from img to video tag
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
            />
          </Box>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </Box>

      {/* Snackbar for Feedback */}
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

export default CreateVideo;