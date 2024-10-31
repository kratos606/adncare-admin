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
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../hooks/userContext';
import BaseURL from '../config/app.config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useContext(UserContext);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseURL}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
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
          message: 'Failed to fetch users.', 
          severity: 'error' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${BaseURL}/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSnackbar({ open: true, message: 'User deleted successfully.', severity: 'success' });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.response?.status === 401) {
          setSnackbar({ 
            open: true, 
            message: 'Your session has expired. Please login again.', 
            severity: 'error' 
          });
          navigate('/login');
        } else {
          const errorMessage = error.response?.data?.message || 'Failed to delete user.';
          setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 }, 
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'email', headerName: 'Email', flex: 1 },
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
            User Management
        </Typography>

        <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create"
            sx={{ mb: 2 }}
        >
            Create User
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={users}
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

export default Users;