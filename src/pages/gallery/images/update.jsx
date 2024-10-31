import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../hooks/userContext';
import BaseURL from '../../../config/app.config';

const UpdateGalleryImage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [currentImagePath, setCurrentImagePath] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(UserContext);

  const fetchImageData = async () => {
    try {
      const response = await axios.get(`${BaseURL}/galerie-image/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      setTitle(data.title);
      setCurrentImagePath(data.image_path);
    } catch (error) {
      console.error('Error fetching image data:', error);
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
          message: 'Image not found.',
          severity: 'error',
        });
        navigate('galerie/images');
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to fetch image data.',
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchImageData();
    }
  }, [isAuthenticated]);

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

    if (!title.trim()) {
      setSnackbar({
        open: true,
        message: 'Title is required.',
        severity: 'warning',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    if (newImageFile) {
      formData.append('image', newImageFile);
    }
    formData.append('_method', 'PUT');

    setSubmitting(true);

    try {
      const response = await axios.post(`${BaseURL}/galerie-image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSnackbar({
        open: true,
        message: 'Image updated successfully!',
        severity: 'success',
      });

      setTimeout(() => {
        navigate('/galerie/images');
      }, 1500);
    } catch (error) {
      console.error('Error updating image:', error);

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
          message: 'Image not found.',
          severity: 'error',
        });
        navigate('/galerie/images');
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to update image.';
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
        Update Image
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 500,
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={`${BaseURL}/storage/${currentImagePath}`}
            variant="square"
            sx={{ width: 100, height: 60, objectFit: 'cover' }}
          />
          <Button variant="contained" component="label">
            Replace Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewImageFile(e.target.files[0]);
                }
              }}
            />
          </Button>
        </Box>

        {newImageFile && (
          <Box>
            <Typography variant="body2">Selected File: {newImageFile.name}</Typography>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="body2">Image Preview:</Typography>
              <Avatar
                src={URL.createObjectURL(newImageFile)}
                variant="square"
                sx={{ width: 100, height: 60, objectFit: 'cover' }}
              />
            </Box>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : 'Update'}
        </Button>
      </Box>

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

export default UpdateGalleryImage;