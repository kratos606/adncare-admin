import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseURL from '../../config/app.config';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    cta_button: '',
    bullets: [''],
    image: null,
  });

  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${BaseURL}/product`);
      if (response.data.status === 'success' && response.data.data) {
        setProduct({
            title:response.data.data.title,
            description: response.data.data.description,
            cta_button: response.data.data.cta_button,
            bullets: response.data.data.bullets,
            image: `${BaseURL}/storage/` + response.data.data.image_path,
        })
      }
    } catch (error) {
      console.error('Error fetching product data', error);
    }
  };

  const handleRemoveBullet = (index) => {
    const updatedBullets = product.bullets.filter((_, i) => i !== index);
    setProduct({ ...product, bullets: updatedBullets });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleBulletsChange = (index, value) => {
    const updatedBullets = [...product.bullets];
    updatedBullets[index] = value;
    setProduct({ ...product, bullets: updatedBullets });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleAddBullet = () => {
    setProduct({ ...product, bullets: [...product.bullets, ''] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('cta_button', product.cta_button);
    formData.append('bullets', JSON.stringify(product.bullets));
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await axios.post(`${BaseURL}/product/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchProductData()
      setImageFile(null)
    } catch (error) {
      console.error('Error updating product data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
        <Typography variant="h4" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="CTA Button"
            name="cta_button"
            value={product.cta_button}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <Box mt={2} mb={2}>
            <Typography variant="subtitle1">Bullets</Typography>
            {product.bullets.map((bullet, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                <TextField
                  fullWidth
                  value={bullet}
                  onChange={(e) => handleBulletsChange(index, e.target.value)}
                  required
                />
                <IconButton onClick={() => handleRemoveBullet(index)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" color="primary" onClick={handleAddBullet}>
              Add Bullet
            </Button>
          </Box>
          <Box mt={2} mb={2}>
            {product.image && (
                <Box>
                    <Typography variant="body2">Image :</Typography>
                    <img
                    src={product.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                    />
                </Box>
            )}
          </Box>
          <Box mt={2} mb={2}>
          <Button variant="contained" component="label">
            Upload Image
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                }
                }}
                required
            />
            </Button>

            {imageFile && (
            <Box>
                <Typography variant="body2">Image Preview:</Typography>
                <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
            </Box>
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Product'}
          </Button>
        </form>
    </Box>
  );
};

export default ProductForm;