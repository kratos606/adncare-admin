import React, { useEffect, useState, useContext } from 'react';
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import UserContext from '../../../hooks/userContext';
import BaseURL from '../../../config/app.config';

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useContext(UserContext);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseURL}/images`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      if (error.response?.status === 401) {
        setSnackbar({ 
          open: true, 
          message: 'Your session has expired. Please login again.', 
          severity: 'error' 
        });
        navigate('/login');
      } else {
        setSnackbar({ 
          open: true, 
          message: 'Failed to fetch images.', 
          severity: 'error' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdate = (id) => {
    navigate(`/images/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`${BaseURL}/images/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSnackbar({ open: true, message: 'Image deleted successfully.', severity: 'success' });
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
        if (error.response?.status === 401) {
          setSnackbar({ 
            open: true, 
            message: 'Your session has expired. Please login again.', 
            severity: 'error' 
          });
          navigate('/login');
        } else {
          const errorMessage = error.response?.data?.message || 'Failed to delete image.';
          setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'slider', headerName: 'Slider', flex: 1 },
    { 
      field: 'image_path', 
      headerName: 'Image', 
      flex: 1,
      renderCell: (params) => (
        <Avatar
          src={`${BaseURL}/storage/` + params.value}
          variant="square"
          sx={{ width: 100, height: 60, objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleUpdate(params.row.id)}
            aria-label="update"
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{display:'flex', justifyContent:'space-between',width:'100%'}}>
        <Typography variant="h4" gutterBottom>
            Image Management
        </Typography>

        <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/images/create"
            sx={{ mb: 2 }}
        >
            Upload Image
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={images}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            components={{
              Toolbar: GridToolbar,
            }}
            getRowId={(row) => row.id}
          />
        </Box>
      )}

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

export default Images;