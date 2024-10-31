import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import BaseURL from '../../config/app.config';

const UpdateGalleryForm = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    stitle: "",
    sdescription: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/galerie-page`);
        setFormValues(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseURL}/galerie-page`, formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Data updated successfully!");
      } else {
        console.error("Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '0 auto' }}
    >
      <Typography variant="h4" gutterBottom>
        Update Gallery Page
      </Typography>

      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formValues.title}
        onChange={handleChange}
        margin="normal"
        inputProps={{
          maxLength:24
        }}
        required
        />

      <TextField
        label="Description"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        multiline
        rows={4}
        margin="normal"
        inputProps={{
          maxLength:250
        }}
        required
        fullWidth
      />

      <TextField
        label="Second Title"
        name="stitle"
        value={formValues.stitle}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{
          maxLength:24
        }}
        required
      />

      <TextField
        label="Second Description"
        name="sdescription"
        value={formValues.sdescription}
        onChange={handleChange}
        multiline
        rows={4}
        margin="normal"
        inputProps={{
          maxLength:250
        }}
        required
        fullWidth
      />

      <Button variant="contained" type="submit" color="primary" fullWidth>
        Update
      </Button>
    </Box>
  );
};

export default UpdateGalleryForm;