// src/components/HeroSection/UpdateHeroForm.jsx
import React, { useState, useEffect } from 'react';
import {Box,TextField,Button,Typography,Paper,Grid,IconButton,List,ListItem,ListItemText,ListItemSecondaryAction,Divider,Snackbar,Alert,CircularProgress,Drawer,Toolbar,ListItemIcon,Collapse
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationIcon from '@mui/icons-material/LocationOn';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BaseURL from '../../config/app.config';

// API Service
const heroSectionAPI = {
    get: () => axios.get(`${BaseURL}/hero-section`),
    update: (data) => axios.post(`${BaseURL}/hero-section`, data)
  };
  
  // Custom Hook - useNotification
  const useNotification = () => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
    });
  
    const showNotification = (message, severity = 'success') => {
      setSnackbar({
        open: true,
        message,
        severity
      });
    };
  
    const handleCloseSnackbar = () => {
      setSnackbar(prev => ({ ...prev, open: false }));
    };
  
    return { snackbar, showNotification, handleCloseSnackbar };
  };
  
  // Custom Hook - useFormValidation
  const useFormValidation = () => {
    const [errors, setErrors] = useState({});
  
    const validateForm = (formData) => {
      const newErrors = {};
      const requiredFields = [
        'title',
        'subtitle',
        'cta_text',
        'cta_button_text',
        'call_us_text'
      ];
  
      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
  
      if (formData.benefits.length === 0) {
        newErrors.benefits = 'At least one benefit is required';
      } else if (formData.benefits.length > 4) {
        newErrors.benefits = 'Maximum of 4 benefits allowed';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const clearError = (fieldName) => {
      if (errors[fieldName]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    };
  
    return { errors, validateForm, clearError };
  };


  
  // BenefitsList Component
  const BenefitsList = ({ benefits, onDelete, onReorder }) => {
    return (
      <DragDropContext onDragEnd={onReorder}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                minHeight: '100px',
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {benefits.map((benefit, index) => (
                <Draggable
                  key={index.toString()}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        mb: 1,
                        bgcolor: snapshot.isDragging ? 'action.hover' : 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: snapshot.isDragging ? 'primary.main' : 'divider',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <DragIndicatorIcon color="action" sx={{ mr: 2 }} />
                      <ListItemText primary={benefit} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => onDelete(index)}
                          color="error"
                        >
                          <DeleteIcon color='secondary' />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const FormSections = ({
    formData,
    errors,
    handleChange,
    newBenefit,
    setNewBenefit,
    handleAddBenefit,
    maxBenefits
  }) => {
    return (
      <Grid container spacing={3}>
        {/* Main Content Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Main Content
          </Typography>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            margin="normal"
            inputProps={{
              maxLength: 70,
            }}
            required
          />
          <TextField
            fullWidth
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            error={!!errors.subtitle}
            helperText={errors.subtitle}
            margin="normal"
            inputProps={{
              maxLength: 35,
            }}
            required
            multiline
            rows={2}
          />
        </Grid>
  
        {/* CTA Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Call to Action
          </Typography>
          <TextField
            fullWidth
            label="CTA Text"
            name="cta_text"
            value={formData.cta_text}
            onChange={handleChange}
            error={!!errors.cta_text}
            helperText={errors.cta_text}
            margin="normal"
            inputProps={{
              maxLength:22
            }}
            required
          />
          <TextField
            fullWidth
            label="CTA Button Text"
            name="cta_button_text"
            value={formData.cta_button_text}
            onChange={handleChange}
            error={!!errors.cta_button_text}
            helperText={errors.cta_button_text}
            margin="normal"
            inputProps={{
              maxLength:12
            }}
            required
          />
          <TextField
            fullWidth
            label="Call Us Text"
            name="call_us_text"
            value={formData.call_us_text}
            onChange={handleChange}
            error={!!errors.call_us_text}
            helperText={errors.call_us_text}
            margin="normal"
            required
          />
        </Grid>
  
        {/* Social Links Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Social Links
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook"
                name="facebook_social"
                value={formData.facebook_social}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: <FacebookIcon color='primary' sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagram_social"
                value={formData.instagram_social}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: <InstagramIcon color='primary' sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email_social"
                value={formData.email_social}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: <EmailIcon color='primary' sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="tel_social"
                value={formData.tel_social}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: <PhoneIcon color='primary' sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="local_social"
                value={formData.local_social}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: <LocationIcon color='primary' sx={{ mr: 1 }} />
                }}
              />
            </Grid>
          </Grid>
        </Grid>
  
        {/* Benefits Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Benefits
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Add New Benefit"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              error={!!errors.benefits}
              helperText={errors.benefits || `${formData.benefits.length}/${maxBenefits} benefits added`}
              inputProps={{
                maxLength:22
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddBenefit();
                }
              }}
              disabled={formData.benefits.length >= maxBenefits}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleAddBenefit}
                    disabled={!newBenefit.trim() || formData.benefits.length >= maxBenefits}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };
  

const INITIAL_STATE = {
  title: '',
  subtitle: '',
  cta_text: '',
  cta_button_text: '',
  call_us_text: '',
  facebook_social: '',
  instagram_social: '',
  email_social: '',
  tel_social: '',
  local_social: '',
  benefits: []
};

const MAX_BENEFITS = 4;

const UpdateHeroForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');
  
  const { snackbar, showNotification, handleCloseSnackbar } = useNotification();
  const { errors, validateForm, clearError } = useFormValidation();

  const [openHomepage,setOpenHomepage] = useState(false)

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const response = await heroSectionAPI.get();
      if (response.data.data) {
        const data = response.data.data;
        const benefits = parseBenefits(data.benefits);
        setFormData({ ...data, benefits });
      }
    } catch (error) {
      showNotification('Failed to load hero section data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const parseBenefits = (benefits) => {
    let parsedBenefits = typeof benefits === 'string' 
      ? JSON.parse(benefits) 
      : (Array.isArray(benefits) ? benefits : []);

    if (parsedBenefits.length > MAX_BENEFITS) {
      parsedBenefits = parsedBenefits.slice(0, MAX_BENEFITS);
      showNotification(`Benefits have been limited to ${MAX_BENEFITS} items`, 'info');
    }
    return parsedBenefits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      if (formData.benefits.length >= MAX_BENEFITS) {
        showNotification(`Maximum of ${MAX_BENEFITS} benefits allowed`, 'warning');
        return;
      }
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleBenefitsReorder = (result) => {
    if (!result.destination) return;

    const benefits = Array.from(formData.benefits);
    const [reorderedItem] = benefits.splice(result.source.index, 1);
    benefits.splice(result.destination.index, 0, reorderedItem);

    setFormData(prev => ({ ...prev, benefits }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      setLoading(true);
      await heroSectionAPI.update(formData);
      showNotification('Hero section updated successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update hero section';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex',flexDirection:'column' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Hero Section
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormSections 
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          newBenefit={newBenefit}
          setNewBenefit={setNewBenefit}
          handleAddBenefit={handleAddBenefit}
          maxBenefits={MAX_BENEFITS}
        />

        <BenefitsList
          benefits={formData.benefits}
          onDelete={handleRemoveBenefit}
          onReorder={handleBenefitsReorder}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Update Hero Section'}
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

export default UpdateHeroForm;