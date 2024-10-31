import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BaseURL from '../../config/app.config';

const AproposForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    bullets: [''],
    video: null,
    image: null,
    experience: '',
    section_title: '',
    section_subtitle: '',
    section_description: '',
    section_profile_image: null,
    section_name: '',
  });

  const [previews, setPreviews] = useState({
    video: '',
    image: '',
    section_profile_image: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAproposPage = async () => {
      try {
        const response = await axios.get(`${BaseURL}/apropos-page`);
        if (response.data.status === 'success') {
          const data = response.data.data;
          setFormData({
            title: data.title || '',
            bullets: data.bullets || [''],
            video: null,
            image: null,
            experience: data.experience || '',
            section_title: data.section_title || '',
            section_subtitle: data.section_subtitle || '',
            section_description: data.section_description || '',
            section_profile_image: null,
            section_name: data.section_name || '',
          });

          setPreviews({
            video: `${BaseURL}/storage/` + data.video || '',
            image: `${BaseURL}/storage/` + data.image || '',
            section_profile_image: `${BaseURL}/storage/` + data.section_profile_image || '',
          });
        } else {
          setError(response.data.message || 'Failed to fetch Apropos Page.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the Apropos Page.');
      } finally {
        setFetching(false);
      }
    };

    fetchAproposPage();

    // Cleanup object URLs on unmount
    return () => {
      if (previews.video) URL.revokeObjectURL(previews.video);
      if (previews.image) URL.revokeObjectURL(previews.image);
      if (previews.section_profile_image) URL.revokeObjectURL(previews.section_profile_image);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should be less than 2MB.');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please upload an image (JPEG, PNG, JPG, GIF, SVG, WEBP).');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Generate preview
      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const handleBulletChange = (index, value) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData((prev) => ({
      ...prev,
      bullets: newBullets,
    }));
  };

  const handleAddBullet = () => {
    setFormData((prev) => ({
      ...prev,
      bullets: [...prev.bullets, ''],
    }));
  };

  const handleRemoveBullet = (index) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      bullets: newBullets.length > 0 ? newBullets : [''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const sendData = new FormData();

    sendData.append('title', formData.title);
    formData.bullets.forEach((bullet, index) => {
      sendData.append(`bullets[${index}]`, bullet);
    });
    sendData.append('experience', formData.experience);
    sendData.append('section_title', formData.section_title);
    sendData.append('section_subtitle', formData.section_subtitle);
    sendData.append('section_description', formData.section_description);
    sendData.append('section_name', formData.section_name);

    if (formData.image) {
      sendData.append('image', formData.image);
    }
    if (formData.video) {
      sendData.append('video', formData.video);
    }
    if (formData.section_profile_image) {
      sendData.append('section_profile_image', formData.section_profile_image);
    }

    try {
      const response = await axios.post(`${BaseURL}/apropos-page`, sendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        setSuccess('Apropos Page updated successfully.');

        const data = response.data.data;

        setPreviews({
          video: data.video_url || '',
          image: data.image_url || '',
          section_profile_image: data.section_profile_image_url || '',
        });

        // Optionally, reset file inputs
        setFormData((prev) => ({
          ...prev,
          video: null,
          image: null,
          section_profile_image: null,
        }));
      } else {
        setError(response.data.message || 'Failed to update Apropos Page.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        // Concatenate all error messages
        const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('An error occurred while updating the Apropos Page.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Apropos Page Settings
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              inputProps={{
                maxLength:75
              }}
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Bullets */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Bullets
            </Typography>
            {formData.bullets.map((bullet, index) => (
              <Stack direction="row" spacing={2} alignItems="center" key={index} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={`Bullet ${index + 1}`}
                  value={bullet}
                  inputProps={{
                    maxLength:20
                  }}
                  onChange={(e) => handleBulletChange(index, e.target.value)}
                  required
                />
                <IconButton
                  onClick={() => handleRemoveBullet(index)}
                  disabled={formData.bullets.length === 1}
                >
                  <DeleteIcon color='secondary' />
                </IconButton>
              </Stack>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddBullet}
              variant="outlined"
            >
              Add Bullet
            </Button>
          </Grid>

          {/* Experience */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Experience"
              name="experience"
              inputProps={{
                maxLength:25
              }}
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Section Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Section Title"
              name="section_title"
              inputProps={{
                maxLength:15
              }}
              value={formData.section_title}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Section Subtitle */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Section Subtitle"
              name="section_subtitle"
              inputProps={{
                maxLength:50
              }}
              value={formData.section_subtitle}
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
              InputProps={{
                maxLength:250
              }}
              value={formData.section_description}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Section Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Section Name"
              name="section_name"
              inputProps={{
                maxLength:15
              }}
              value={formData.section_name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12} sm={6}>
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
                name="image"
                onChange={handleFileChange}
              />
            </Button>
            {previews.image && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Current Image:</Typography>
                <img
                  src={previews.image}
                  alt="Current Image"
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

          {/* Video Upload */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Video (Image Format)
              <input
                type="file"
                hidden
                accept="image/*"
                name="video"
                onChange={handleFileChange}
              />
            </Button>
            {previews.video && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Current Video (Image):</Typography>
                <img
                  src={previews.video}
                  alt="Current Video"
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

          {/* Section Profile Image Upload */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Section Profile Image
              <input
                type="file"
                hidden
                accept="image/*"
                name="section_profile_image"
                onChange={handleFileChange}
              />
            </Button>
            {previews.section_profile_image && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Current Section Profile Image:</Typography>
                <img
                  src={previews.section_profile_image}
                  alt="Current Section Profile"
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

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AproposForm;