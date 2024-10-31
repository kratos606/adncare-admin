import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Stack,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BaseURL from '../config/app.config';

const SpecialiteForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    buttons: [''],
    description: '',
    image: null,
    image_path: '',
    section_title: '',
    section_description: '',
    cta_button: '',
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, success]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/specialite-page`);
        const result = response.data;
        if (result.status === 'success') {
          const data = result.data;
          setFormData({
            ...data,
            buttons: JSON.parse(data.buttons),
            image: null,
          });
          if (data.image_path) {
            setPreview(`${BaseURL}/storage/${data.image_path}`);
          }
        } else {
          setError('Failed to load existing data');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load existing data');
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2048000) { // 2MB
        setError('Image size should be less than 2MB');
        return;
      }
      if (
        ![
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/gif',
          'image/svg+xml',
        ].includes(file.type)
      ) {
        setError('Invalid file type. Please upload an image (JPEG, PNG, JPG, GIF, SVG)');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleButtonAdd = () => {
    if (formData.buttons.length >= 4) {
      setError('You can only add up to 4 buttons.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      buttons: [...prev.buttons, ''],
    }));
  };

  const handleButtonRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index),
    }));
  };

  const handleButtonChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.map((button, i) => (i === index ? value : button)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'buttons') {
        // Append each button individually
        formData[key].forEach((button) => {
          formDataToSend.append(`${key}[]`, button);
        });
      } else if (key === 'image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'image_path' && key !== 'image') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${BaseURL}/specialite-page`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = response.data;

      if (result.status === 'success') {
        setSuccess('Specialite page updated successfully');
        if (result.data.image_path) {
          setPreview(`${BaseURL}/storage/${result.data.image_path}`);
          setFormData((prev) => ({
            ...prev,
            image_path: result.data.image_path,
            image: null,
          }));
        }
      } else {
        setError('Failed to update specialite page');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the form');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Specialite Page Settings
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              inputProps={{
                maxLength:24
              }}
              required
            />
          </Grid>

          {/* Description Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              inputProps={{
                maxLength:250
              }}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Buttons Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
              Buttons
            </Typography>
            {formData.buttons.length >= 4 && (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Maximum of 4 buttons reached.
              </Typography>
            )}
            {formData.buttons.map((button, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ mb: 2 }}
                alignItems="center"
              >
                <TextField
                  fullWidth
                  label={`Button ${index + 1}`}
                  value={button}
                  inputProps={{
                    maxLength:20
                  }}
                  onChange={(e) => handleButtonChange(index, e.target.value)}
                  required
                />
                <IconButton
                  onClick={() => handleButtonRemove(index)}
                  disabled={formData.buttons.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleButtonAdd}
              variant="outlined"
              sx={{ mb: 2 }}
              disabled={formData.buttons.length >= 4}
            >
              Add Button
            </Button>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {preview && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  {formData.image ? 'New Image Preview:' : 'Current Image:'}
                </Typography>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px',
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Section Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Section Title"
              name="section_title"
              value={formData.section_title}
              inputProps={{
                maxLength:24
              }}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Section Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Section Description"
              name="section_description"
              inputProps={{
                maxLength:250
              }}
              value={formData.section_description}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* CTA Button */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CTA Button"
              name="cta_button"
              inputProps={{
                maxLength:15
              }}
              value={formData.cta_button}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SpecialiteForm;