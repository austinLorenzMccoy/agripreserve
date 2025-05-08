
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Grid, 
  TextField, 
  Button, 
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Agriculture as AgricultureIcon,
  Settings as SettingsIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

const Profile = () => {
  const muiTheme = useTheme();
  const { darkMode } = useCustomTheme();
  
  // Mock user data - in a real app, this would come from an API or context
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 123 456 7890',
    location: 'Lagos, Nigeria',
    role: 'Farm Manager',
    avatar: '/assets/logo.svg', // Using our logo as a placeholder
    bio: 'Experienced agricultural professional focused on reducing post-harvest losses through innovative storage solutions and data-driven insights.',
    joinDate: 'May 2023',
    crops: ['Maize', 'Cassava', 'Rice', 'Tomatoes'],
    storageUnits: 4,
    dataPoints: 1250
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          color: darkMode ? muiTheme.palette.primary.light : muiTheme.palette.primary.dark,
          borderBottom: `2px solid ${muiTheme.palette.primary.main}`,
          pb: 1
        }}
      >
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column - User Info */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: darkMode 
                ? 'linear-gradient(45deg, #1b5e20 0%, #2e7d32 100%)' 
                : 'linear-gradient(45deg, #e8f5e9 0%, #c8e6c9 100%)',
              color: darkMode ? '#fff' : 'inherit',
              borderRadius: 2
            }}
          >
            <Avatar 
              src={userData.avatar} 
              alt={userData.name}
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2,
                border: `4px solid ${muiTheme.palette.primary.main}`,
                backgroundColor: '#fff'
              }}
            />
            <Typography variant="h5" fontWeight="bold">{userData.name}</Typography>
            <Typography variant="subtitle1" color={darkMode ? '#e0e0e0' : 'text.secondary'}>
              {userData.role}
            </Typography>
            
            <Divider sx={{ my: 2, width: '100%', borderColor: darkMode ? '#ffffff40' : 'divider' }} />
            
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color={darkMode ? 'inherit' : 'primary'} />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={userData.email} 
                  secondaryTypographyProps={{ color: darkMode ? '#e0e0e0' : 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color={darkMode ? 'inherit' : 'primary'} />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary={userData.phone}
                  secondaryTypographyProps={{ color: darkMode ? '#e0e0e0' : 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon color={darkMode ? 'inherit' : 'primary'} />
                </ListItemIcon>
                <ListItemText 
                  primary="Location" 
                  secondary={userData.location}
                  secondaryTypographyProps={{ color: darkMode ? '#e0e0e0' : 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color={darkMode ? 'inherit' : 'primary'} />
                </ListItemIcon>
                <ListItemText 
                  primary="Member Since" 
                  secondary={userData.joinDate}
                  secondaryTypographyProps={{ color: darkMode ? '#e0e0e0' : 'text.secondary' }}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Stats Card */}
          <Card 
            elevation={3} 
            sx={{ 
              mt: 3, 
              borderRadius: 2,
              background: darkMode 
                ? 'linear-gradient(45deg, #1b5e20 0%, #2e7d32 100%)' 
                : 'linear-gradient(45deg, #e8f5e9 0%, #c8e6c9 100%)',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Your AgriPreserve Stats
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">{userData.crops.length}</Typography>
                  <Typography variant="body2" color={darkMode ? '#e0e0e0' : 'text.secondary'}>Crops</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">{userData.storageUnits}</Typography>
                  <Typography variant="body2" color={darkMode ? '#e0e0e0' : 'text.secondary'}>Storage Units</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">{userData.dataPoints}</Typography>
                  <Typography variant="body2" color={darkMode ? '#e0e0e0' : 'text.secondary'}>Data Points</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Edit Profile */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SettingsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Edit Profile
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue={userData.name}
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter your full name"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={userData.email}
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter your email address"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue={userData.phone}
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter your phone number"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  defaultValue={userData.location}
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter your location"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  defaultValue={userData.role}
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter your role"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  defaultValue={userData.bio}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself and your agricultural experience"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<SaveIcon />}
                sx={{ 
                  px: 4, 
                  py: 1,
                  background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1B5E20 30%, #388E3C 90%)',
                  }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Crops Section */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mt: 2, 
              borderRadius: 2 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AgricultureIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Your Crops
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              {userData.crops.map((crop, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      py: 2,
                      background: darkMode 
                        ? 'linear-gradient(45deg, #1b5e20 0%, #2e7d32 100%)' 
                        : 'linear-gradient(45deg, #e8f5e9 0%, #c8e6c9 100%)',
                      color: darkMode ? '#fff' : 'inherit',
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{crop}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    textAlign: 'center', 
                    py: 2,
                    borderRadius: 2,
                    border: `2px dashed ${muiTheme.palette.primary.main}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      background: darkMode ? 'rgba(46, 125, 50, 0.1)' : 'rgba(200, 230, 201, 0.5)',
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" color="primary">+ Add Crop</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
