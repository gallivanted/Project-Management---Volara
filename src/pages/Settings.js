import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Avatar,
  IconButton,
  Tab,
  Tabs,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Stack
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  PhotoCamera as PhotoCameraIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import anime from 'animejs';
import styled from 'styled-components';

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyledPaper = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const Settings = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Profile state
  const [profile, setProfile] = useState({
    name: 'Amirul',
    email: 'amirul@example.com',
    role: 'Project Manager',
    bio: 'Experienced project manager with a passion for team collaboration and efficient workflows.',
    phone: '+1 (555) 123-4567'
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskAssigned: true,
    taskCompleted: true,
    deadlineReminder: true,
    weeklyDigest: false
  });
  
  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    darkMode: false,
    colorScheme: 'green',
    fontSize: 'medium',
    compactMode: false
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordLastChanged: '2024-03-15'
  });
  
  // Edit mode for profile
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    // Animate settings sections on mount
    anime({
      targets: '.settings-section',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, [tabValue]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
    
    showSnackbar(`${name.charAt(0).toUpperCase() + name.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleThemeChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === 'darkMode' || name === 'compactMode' ? checked : value;
    
    setThemeSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (name === 'darkMode') {
      showSnackbar(`${checked ? 'Dark' : 'Light'} mode activated`);
    } else if (name === 'colorScheme') {
      showSnackbar(`Color scheme changed to ${value}`);
    }
  };
  
  const handleSecurityChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === 'twoFactorAuth' ? checked : value;
    
    setSecuritySettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (name === 'twoFactorAuth') {
      showSnackbar(`Two-factor authentication ${checked ? 'enabled' : 'disabled'}`);
    }
  };
  
  const handleSaveProfile = () => {
    setEditMode(false);
    showSnackbar('Profile updated successfully');
  };
  
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Settings</Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<PaletteIcon />} label="Theme" />
          <Tab icon={<SecurityIcon />} label="Security" />
        </Tabs>
        
        {/* Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <StyledPaper elevation={0} className="settings-section">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button 
                variant={editMode ? "contained" : "outlined"}
                color={editMode ? "primary" : "secondary"}
                startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
              >
                {editMode ? 'Save' : 'Edit'}
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mb: 2,
                    bgcolor: theme.palette.primary.main
                  }}
                >
                  {profile.name.charAt(0)}
                </Avatar>
                {editMode && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PhotoCameraIcon />}
                    sx={{ mt: 1 }}
                  >
                    Change Photo
                  </Button>
                )}
              </Box>
              
              <Grid container spacing={2} flex={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    fullWidth
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    fullWidth
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role"
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                    fullWidth
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    fullWidth
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    fullWidth
                    multiline
                    rows={4}
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </TabPanel>
        
        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={1}>
          <StyledPaper elevation={0} className="settings-section">
            <Typography variant="h6" sx={{ mb: 3 }}>Notification Preferences</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Notification Channels</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.email}
                      onChange={handleNotificationChange}
                      name="email"
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.push}
                      onChange={handleNotificationChange}
                      name="push"
                      color="primary"
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Notification Types</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.taskAssigned}
                      onChange={handleNotificationChange}
                      name="taskAssigned"
                      color="primary"
                    />
                  }
                  label="Task Assigned"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.taskCompleted}
                      onChange={handleNotificationChange}
                      name="taskCompleted"
                      color="primary"
                    />
                  }
                  label="Task Completed"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.deadlineReminder}
                      onChange={handleNotificationChange}
                      name="deadlineReminder"
                      color="primary"
                    />
                  }
                  label="Deadline Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.weeklyDigest}
                      onChange={handleNotificationChange}
                      name="weeklyDigest"
                      color="primary"
                    />
                  }
                  label="Weekly Digest"
                />
              </Grid>
            </Grid>
          </StyledPaper>
        </TabPanel>
        
        {/* Theme Tab */}
        <TabPanel value={tabValue} index={2}>
          <StyledPaper elevation={0} className="settings-section">
            <Typography variant="h6" sx={{ mb: 3 }}>Appearance Settings</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: themeSettings.darkMode ? '#333' : '#f5f5f5',
                  borderRadius: 1,
                  color: themeSettings.darkMode ? '#fff' : 'inherit',
                  transition: 'all 0.3s ease'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {themeSettings.darkMode ? 
                      <DarkModeIcon sx={{ mr: 1 }} /> : 
                      <LightModeIcon sx={{ mr: 1 }} />
                    }
                    <Typography>
                      {themeSettings.darkMode ? 'Dark Mode' : 'Light Mode'}
                    </Typography>
                  </Box>
                  <Switch
                    checked={themeSettings.darkMode}
                    onChange={handleThemeChange}
                    name="darkMode"
                    color="primary"
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Color Scheme</InputLabel>
                  <Select
                    value={themeSettings.colorScheme}
                    onChange={handleThemeChange}
                    name="colorScheme"
                    label="Color Scheme"
                  >
                    <MenuItem value="green">Green (Default)</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Font Size</InputLabel>
                  <Select
                    value={themeSettings.fontSize}
                    onChange={handleThemeChange}
                    name="fontSize"
                    label="Font Size"
                  >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium (Default)</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={themeSettings.compactMode}
                      onChange={handleThemeChange}
                      name="compactMode"
                      color="primary"
                    />
                  }
                  label="Compact Mode"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => showSnackbar('Theme settings saved')}
                  >
                    Save Theme Settings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </TabPanel>
        
        {/* Security Tab */}
        <TabPanel value={tabValue} index={3}>
          <StyledPaper elevation={0} className="settings-section">
            <Typography variant="h6" sx={{ mb: 3 }}>Security Settings</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecurityChange}
                      name="twoFactorAuth"
                      color="primary"
                    />
                  }
                  label="Two-Factor Authentication"
                />
                {securitySettings.twoFactorAuth && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    Two-factor authentication is enabled for your account.
                  </Alert>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Session Timeout (minutes)</InputLabel>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    name="sessionTimeout"
                    label="Session Timeout (minutes)"
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1">Password</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Last changed: {new Date(securitySettings.passwordLastChanged).toLocaleDateString()}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => showSnackbar('Password change functionality would be implemented here')}
                  >
                    Change Password
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => showSnackbar('Security settings saved')}
                  >
                    Save Security Settings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </TabPanel>
      </Paper>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

// Wrap with React.memo for performance optimization
export default React.memo(Settings);