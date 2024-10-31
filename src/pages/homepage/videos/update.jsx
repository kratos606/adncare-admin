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
import UserContext from '../../../hooks/userContext';
import BaseURL from '../../../config/app.config';

const UpdateVideo = () => {
  const { id } = useParams(); // Extract video ID from route parameters
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentVideoPath, setCurrentVideoPath] = useState(''); // To store existing video path
  const [newVideoFile, setNewVideoFile] = useState(null); // For optional video replacement
  const [loading, setLoading] = useState(true); // Loading state for fetching existing data
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(UserContext);

  // Function to fetch existing video data
  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${BaseURL}/videos/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      setTitle(data.title);
      setDescription(data.description);
      setCurrentVideoPath(data.video_url); // Assuming the backend returns 'video_path'
    } catch (error) {
      console.error('Error fetching video data:', error);
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
          message: 'Video not found.',
          severity: 'error',
        });
        navigate('/videos');
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to fetch video data.',
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch video data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchVideoData();
    }
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

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

    if (!description.trim()) {
      setSnackbar({
        open: true,
        message: 'Description is required.',
        severity: 'warning',
      });
      return;
    }

    // // Optional: Further validation for video file
    // if (newVideoFile) {
    //   const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mpeg'];
    //   if (!allowedTypes.includes(newVideoFile.type)) {
    //     setSnackbar({
    //       open: true,
    //       message: 'Only MP4, AVI, MOV, and MPEG formats are allowed.',
    //       severity: 'error',
    //     });
    //     return;
    //   }

    //   const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
    //   if (newVideoFile.size > maxSizeInBytes) {
    //     setSnackbar({
    //       open: true,
    //       message: 'Video size should be less than 100MB.',
    //       severity: 'error',
    //     });
    //     return;
    //   }
    // }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (newVideoFile) {
      formData.append('video', newVideoFile);
    }
    formData.append('_method', 'PUT')

    setSubmitting(true);

    try {
      const response = await axios.post(`${BaseURL}/videos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSnackbar({
        open: true,
        message: 'Video updated successfully!',
        severity: 'success',
      });

      // Redirect to Videos list after a short delay to show the success message
      setTimeout(() => {
        navigate('/videos');
      }, 1500);
    } catch (error) {
      console.error('Error updating video:', error);

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
          message: 'Video not found.',
          severity: 'error',
        });
        navigate('/videos');
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to update video.';
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // If data is still loading, show a loader
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
        Update Video
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

        {/* Current Video Display */}
        {currentVideoPath && !newVideoFile && (
          <Box>
            <Typography variant="body2">Current Video:</Typography>
            <img
              src={`${BaseURL}/storage/${currentVideoPath}`} // Adjust the URL based on your storage configuration
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
            />
          </Box>
        )}

        {/* New Video Upload Field */}
        <Button variant="contained" component="label">
          {newVideoFile ? 'Change Video' : 'Replace Video'}
          <input
            type="file"
            hidden
            accept="image/*" // Accept video files only
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewVideoFile(e.target.files[0]);
              }
            }}
          />
        </Button>

        {/* New Video Preview */}
        {newVideoFile && (
          <Box>
            <Typography variant="body2">New Video Preview:</Typography>
            <img
              src={URL.createObjectURL(newVideoFile)}
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
            />
          </Box>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : 'Update'}
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

export default UpdateVideo;