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
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import UserContext from '../../../hooks/userContext'; // Adjust the path based on your project structure
import BaseURL from '../../../config/app.config';

const Specializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useContext(UserContext);

  // Function to fetch specializations from the backend
  const fetchSpecializations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseURL}/specializations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSpecializations(response.data.data); // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching specializations:', error);
      if (error.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Your session has expired. Please login again.',
          severity: 'error',
        });
        navigate('/login');
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to fetch specializations.',
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch specializations when the component mounts or when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSpecializations();
    }
  }, [isAuthenticated]);

  // Show a loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to navigate to the update specialization page
  const handleUpdate = (id) => {
    navigate(`/specializations/update/${id}`);
  };

  // Function to handle deletion of a specialization
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this specialization?')) {
      try {
        await axios.delete(`${BaseURL}/specializations/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSnackbar({ open: true, message: 'Specialization deleted successfully.', severity: 'success' });
        fetchSpecializations();
      } catch (error) {
        console.error('Error deleting specialization:', error);
        if (error.response?.status === 401) {
          setSnackbar({
            open: true,
            message: 'Your session has expired. Please login again.',
            severity: 'error',
          });
          navigate('/login');
        } else {
          const errorMessage = error.response?.data?.message || 'Failed to delete specialization.';
          setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
      }
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Specialization Management
        </Typography>

        {/* Disable the Create button if there are already three specializations */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/specializations/create"
          sx={{ mb: 2 }}
          disabled={specializations.length >= 3}
        >
          Create Specialization
        </Button>
      </Box>

      {/* Optional: Display a message when the maximum number of specializations is reached */}
      {specializations.length >= 3 && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          You have reached the maximum number of specializations (3). Please delete an existing specialization before adding a new one.
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={specializations}
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

export default Specializations;