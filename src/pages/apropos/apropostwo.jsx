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

const AproposSectionTwoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    features: [
      { name: '', description: '' },
    ],
    image: null,
    subtitle: '',
    description: '',
    bullets: [
      { name: '', description: '' },
    ],
  });

  const [previews, setPreviews] = useState({
    image: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAproposSectionTwo = async () => {
      try {
        const response = await axios.get(`${BaseURL}/apropos-two`);
        if (response.data.status === 'success') {
          const data = response.data.data;
          setFormData({
            title: data.title || '',
            features: data.features.length > 0 ? data.features : [{ name: '', description: '' }],
            image: null, // File inputs are managed separately
            subtitle: data.subtitle || '',
            description: data.description || '',
            bullets: data.bullets.length > 0 ? data.bullets : [{ name: '', description: '' }],
          });

          setPreviews({
            image: `${BaseURL}/storage/` + data.image || '',
          });
        } else {
          setError(response.data.message || 'Failed to fetch Apropos Section Two.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching Apropos Section Two.');
      } finally {
        setFetching(false);
      }
    };

    fetchAproposSectionTwo();

    // Cleanup object URLs on unmount
    return () => {
      if (previews.image) URL.revokeObjectURL(previews.image);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { name: '', description: '' }],
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures.length > 0 ? updatedFeatures : [{ name: '', description: '' }],
    }));
  };

  const handleBulletChange = (index, field, value) => {
    const updatedBullets = [...formData.bullets];
    updatedBullets[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      bullets: updatedBullets,
    }));
  };

  const addBullet = () => {
    setFormData((prev) => ({
      ...prev,
      bullets: [...prev.bullets, { name: '', description: '' }],
    }));
  };

  const removeBullet = (index) => {
    const updatedBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      bullets: updatedBullets.length > 0 ? updatedBullets : [{ name: '', description: '' }],
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('Image file size should be less than 2MB.');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid image type. Please upload a JPEG, PNG, JPG, GIF, SVG, or WEBP image.');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const sendData = new FormData();

    sendData.append('title', formData.title);
    // Append features as array of objects
    formData.features.forEach((feature, index) => {
      sendData.append(`features[${index}][name]`, feature.name);
      sendData.append(`features[${index}][description]`, feature.description);
    });
    sendData.append('subtitle', formData.subtitle);
    sendData.append('description', formData.description);
    // Append bullets as array of objects
    formData.bullets.forEach((bullet, index) => {
      sendData.append(`bullets[${index}][name]`, bullet.name);
      sendData.append(`bullets[${index}][description]`, bullet.description);
    });

    if (formData.image) {
      sendData.append('image', formData.image);
    }

    try {
      const response = await axios.post(`${BaseURL}/apropos-two`, sendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        setSuccess('Apropos Section Two updated successfully.');

        const data = response.data.data;

        setPreviews({
          image: data.image_url || '',
        });

        // Optionally, reset file inputs
        setFormData((prev) => ({
          ...prev,
          image: null,
        }));
      } else {
        setError(response.data.message || 'Failed to update Apropos Section Two.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        // Concatenate all error messages
        const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('An error occurred while updating Apropos Section Two.');
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
        Apropos Section Two Settings
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

          {/* Features */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            {formData.features.map((feature, index) => (
              <Stack direction="row" spacing={2} alignItems="center" key={index} sx={{ mb: 2 }}>
                <TextField
                  label="Feature Name"
                  value={feature.name}
                  inputProps={{
                    maxLength:25
                  }}
                  onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Feature Description"
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                  inputProps={{
                    maxLength:150
                  }}
                  required
                  fullWidth
                />
                <IconButton
                  onClick={() => removeFeature(index)}
                  disabled={formData.features.length === 1}
                >
                  <DeleteIcon color='secondary'/>
                </IconButton>
              </Stack>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addFeature}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Feature
            </Button>
          </Grid>

          {/* Subtitle */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              inputProps={{
                maxLength:75
              }}
              required
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              inputProps={{
                maxLength:250
              }}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Bullets */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Bullets
            </Typography>
            {formData.bullets.map((bullet, index) => (
              <Stack direction="row" spacing={2} alignItems="center" key={index} sx={{ mb: 2 }}>
                <TextField
                  label="Bullet Name"
                  value={bullet.name}
                  onChange={(e) => handleBulletChange(index, 'name', e.target.value)}
                  required
                  inputProps={{
                    maxLength:50
                  }}
                  fullWidth
                />
                <TextField
                  label="Bullet Description"
                  value={bullet.description}
                  onChange={(e) => handleBulletChange(index, 'description', e.target.value)}
                  required
                  fullWidth
                  inputProps={{
                    maxLength:150
                  }}
                />
                <IconButton
                  onClick={() => removeBullet(index)}
                  disabled={formData.bullets.length === 1}
                >
                  <DeleteIcon color='secondary' />
                </IconButton>
              </Stack>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addBullet}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Bullet
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
                name="image"
                onChange={handleImageChange}
              />
            </Button>
            {previews.image && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Current Image:</Typography>
                <img
                  src={previews.image}
                  alt="Current"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
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

export default AproposSectionTwoForm;