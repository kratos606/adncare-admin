// src/components/WelcomeForm.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import axios from 'axios';
import BaseURL from '../../config/app.config';

const WelcomeForm = () => {
  const [formData, setFormData] = useState({
    welcome_title: '',
    welcome_description: '',
    welcome_stitle: '',
    welcome_sdescription: '',
    cta_title: '',
    cta_description: '',
    bullets: [''],
    cta_button: '',
    counter: [''],
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' or 'error'
  });

  useEffect(() => {
    // Fetch existing welcome section data
    axios
      .get(`${BaseURL}/welcome-section`) // Adjust the endpoint as needed
      .then((response) => {
        if (response.data.status === 'success') {
          const data = response.data.data;
          setFormData({
            welcome_title: data.welcome_title || '',
            welcome_description: data.welcome_description || '',
            welcome_stitle: data.welcome_stitle || '',
            welcome_sdescription: data.welcome_sdescription || '',
            cta_title: data.cta_title || '',
            cta_description: data.cta_description || '',
            bullets: data.bullets ? JSON.parse(data.bullets) : [''],
            cta_button: data.cta_button || '',
            counter: data.counter ? JSON.parse(data.counter) : [''],
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching welcome section:', error);
        setSnackbar({
          open: true,
          message: 'Error fetching welcome section data.',
          severity: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, value, field, arrayName) => {
    if (arrayName === 'counter' && field === 'count') {
      // Restrict count to a maximum of 99999
      const validatedValue = Math.min(Number(value), 99999);
      const updatedCounter = [...formData.counter];
      updatedCounter[index] = {
        ...updatedCounter[index],
        [field]: validatedValue
      };
      setFormData({ ...formData, counter: updatedCounter });
    } else if (arrayName === 'counter') {
      // Handle other fields in counter array
      const updatedCounter = [...formData.counter];
      updatedCounter[index] = {
        ...updatedCounter[index],
        [field]: value
      };
      setFormData({ ...formData, counter: updatedCounter });
    } else {
      // Handle other arrays (like bullets)
      const updatedArray = [...formData[arrayName || field]];
      updatedArray[index] = value;
      setFormData({ ...formData, [arrayName || field]: updatedArray });
    }
  };  

  const addField = (field) => {
    if (field === 'counter') {
      setFormData({
        ...formData,
        counter: [...formData.counter, { count: '', label: '' }]
      });
    } else {
      setFormData({ ...formData, [field]: [...formData[field], ''] });
    }
  };

  const removeField = (index, field) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Prepare data for submission
    const submissionData = {
      ...formData,
      // Remove JSON.stringify for arrays
      bullets: formData.bullets,
      counter: formData.counter,
    };

    console.log(submissionData)

    axios
      .post(`${BaseURL}/welcome-section`, submissionData) // Adjust the endpoint and method as needed
      .then((response) => {
        if (response.data.status === 'success') {
          setSnackbar({
            open: true,
            message: 'Welcome section updated successfully!',
            severity: 'success',
          });
        } else {
          setSnackbar({
            open: true,
            message: 'There was an error updating the welcome section.',
            severity: 'error',
          });
          if (response.data.errors) {
            setErrors(response.data.errors);
          }
        }
      })
      .catch((error) => {
        console.error('Error updating welcome section:', error);
        setSnackbar({
          open: true,
          message: 'There was an error updating the welcome section.',
          severity: 'error',
        });
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  // Handler to close the Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Update Welcome Section
      </Typography>
      {/* Removed existing Typography messages */}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Welcome Title */}
          <Grid item xs={12}>
            <TextField
              label="Welcome Title"
              name="welcome_title"
              value={formData.welcome_title}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.welcome_title}
              helperText={
                errors.welcome_title ? errors.welcome_title[0] : ''
              }
            />
          </Grid>

          {/* Welcome Description */}
          <Grid item xs={12}>
            <TextField
              label="Welcome Description"
              name="welcome_description"
              value={formData.welcome_description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              error={!!errors.welcome_description}
              helperText={
                errors.welcome_description
                  ? errors.welcome_description[0]
                  : ''
              }
            />
          </Grid>

          {/* Welcome Sub-Title */}
          <Grid item xs={12}>
            <TextField
              label="Welcome Sub-Title"
              name="welcome_stitle"
              value={formData.welcome_stitle}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.welcome_stitle}
              helperText={
                errors.welcome_stitle ? errors.welcome_stitle[0] : ''
              }
            />
          </Grid>

          {/* Welcome Sub-Description */}
          <Grid item xs={12}>
            <TextField
              label="Welcome Sub-Description"
              name="welcome_sdescription"
              value={formData.welcome_sdescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              error={!!errors.welcome_sdescription}
              helperText={
                errors.welcome_sdescription
                  ? errors.welcome_sdescription[0]
                  : ''
              }
            />
          </Grid>

          {/* CTA Title */}
          <Grid item xs={12}>
            <TextField
              label="CTA Title"
              name="cta_title"
              value={formData.cta_title}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.cta_title}
              helperText={errors.cta_title ? errors.cta_title[0] : ''}
            />
          </Grid>

          {/* CTA Description */}
          <Grid item xs={12}>
            <TextField
              label="CTA Description"
              name="cta_description"
              value={formData.cta_description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              error={!!errors.cta_description}
              helperText={
                errors.cta_description ? errors.cta_description[0] : ''
              }
            />
          </Grid>

          {/* Bullets */}
          <Grid item xs={12}>
            <Typography variant="h6">Bullets</Typography>
            {formData.bullets.map((bullet, index) => (
              <Paper
                key={index}
                style={{ padding: '1rem', marginBottom: '1rem' }}
                variant="outlined"
              >
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={11}>
                    <TextField
                      label={`Bullet ${index + 1}`}
                      value={bullet}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, 'bullets')
                      }
                      fullWidth
                      required
                      error={
                        errors.bullets &&
                        Array.isArray(errors.bullets) &&
                        !!errors.bullets[index]
                      }
                      helperText={
                        errors.bullets &&
                        Array.isArray(errors.bullets) &&
                        errors.bullets[index]
                          ? errors.bullets[index]
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => removeField(index, 'bullets')}
                      disabled={formData.bullets.length === 1}
                    >
                      <RemoveCircle color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircle />}
              onClick={() => addField('bullets')}
            >
              Add Bullet
            </Button>
            {errors.bullets && typeof errors.bullets === 'string' && (
              <Typography variant="body2" color="error">
                {errors.bullets}
              </Typography>
            )}
          </Grid>

          {/* CTA Button */}
          <Grid item xs={12}>
            <TextField
              label="CTA Button Text"
              name="cta_button"
              value={formData.cta_button}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.cta_button}
              helperText={errors.cta_button ? errors.cta_button[0] : ''}
            />
          </Grid>

          {/* Counter */}
          <Grid item xs={12}>
            <Typography variant="h6">Counters</Typography>
            {formData.counter.map((cnt, index) => (
              <Paper
                key={index}
                style={{ padding: '1rem', marginBottom: '1rem' }}
                variant="outlined"
              >
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={5}>
                    <TextField
                      label={`Count ${index + 1}`}
                      value={cnt?.count}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, 'count', 'counter')
                      }
                      fullWidth
                      required
                      type='number'
                      error={
                        errors.counter &&
                        Array.isArray(errors.counter) &&
                        !!errors.counter[index]?.count
                      }
                      helperText={
                        errors.counter &&
                        Array.isArray(errors.counter) &&
                        errors.counter[index]?.count
                          ? errors.counter[index].count
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label={`Label ${index + 1}`}
                      value={cnt?.label}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, 'label', 'counter')
                      }
                      fullWidth
                      required
                      error={
                        errors.counter &&
                        Array.isArray(errors.counter) &&
                        !!errors.counter[index]?.label
                      }
                      helperText={
                        errors.counter &&
                        Array.isArray(errors.counter) &&
                        errors.counter[index]?.label
                          ? errors.counter[index].label
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => removeField(index, 'counter')}
                      disabled={formData.counter.length === 1}
                    >
                      <RemoveCircle color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircle />}
              onClick={() => addField('counter')}
            >
              Add Counter
            </Button>
            {errors.counter && typeof errors.counter === 'string' && (
              <Typography variant="body2" color="error">
                {errors.counter}
              </Typography>
            )}
          </Grid>


          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Update Welcome Section
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WelcomeForm;