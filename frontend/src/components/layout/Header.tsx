import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
  useTheme as useMuiTheme,
  alpha,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onDrawerToggle?: () => void;
}

const Header = ({ onDrawerToggle }: HeaderProps) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Profile menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  
  // Notification menu state
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  
  // Handle profile menu open
  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Handle notification menu open
  const handleNotificationMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle notification menu close
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };
  
  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };
  
  return (
    <AppBar 
      position="fixed"
      sx={{
        zIndex: muiTheme.zIndex.drawer + 1,
        background: darkMode 
          ? 'linear-gradient(90deg, #1E2723 0%, #263238 100%)'
          : 'linear-gradient(90deg, #F9FBF7 0%, #E8F5E9 100%)',
        boxShadow: darkMode 
          ? '0 4px 8px rgba(0,0,0,0.3)'
          : '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar>
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* Logo and title */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          background: darkMode 
            ? alpha(muiTheme.palette.primary.main, 0.1) 
            : alpha(muiTheme.palette.primary.main, 0.05),
          borderRadius: 2,
          px: 2,
          py: 0.5,
        }}>
          <Box 
            component="img"
            src="/assets/logo.svg"
            alt="AgriPreserve Logo"
            sx={{ 
              mr: 1, 
              width: 32,
              height: 32,
              animation: 'pulse 2s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                },
                '50%': {
                  transform: 'scale(1.1)',
                },
                '100%': {
                  transform: 'scale(1)',
                },
              },
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold',
              background: darkMode
                ? 'linear-gradient(45deg, #81C784 30%, #4CAF50 90%)'
                : 'linear-gradient(45deg, #2E7D32 30%, #388E3C 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
            }}
          >
            AgriPreserve
          </Typography>
        </Box>
        
        {/* Dashboard button (visible on non-mobile) */}
        {!isMobile && (
          <Button
            startIcon={<DashboardIcon />}
            variant="text"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ 
              ml: 3,
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            Dashboard
          </Button>
        )}
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Theme toggle */}
        <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton
            onClick={toggleDarkMode}
            color="primary"
            sx={{
              p: 1,
              background: darkMode 
                ? alpha(muiTheme.palette.primary.main, 0.1) 
                : alpha(muiTheme.palette.primary.main, 0.05),
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(30deg)',
                background: darkMode 
                  ? alpha(muiTheme.palette.primary.main, 0.2) 
                  : alpha(muiTheme.palette.primary.main, 0.1),
              },
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
        
        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            color="primary"
            onClick={handleNotificationMenuOpen}
            sx={{
              ml: 2,
              p: 1,
              background: darkMode 
                ? alpha(muiTheme.palette.primary.main, 0.1) 
                : alpha(muiTheme.palette.primary.main, 0.05),
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: darkMode 
                  ? alpha(muiTheme.palette.primary.main, 0.2) 
                  : alpha(muiTheme.palette.primary.main, 0.1),
              },
            }}
          >
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        
        {/* Profile */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              ml: 2,
              p: 0.5,
              border: `2px solid ${muiTheme.palette.primary.main}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Avatar 
              alt="User Profile"
              src="/assets/avatar.jpg" 
              sx={{ 
                width: 32, 
                height: 32,
                background: darkMode 
                  ? 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)'
                  : 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
              }}
            >
              A
            </Avatar>
          </IconButton>
        </Tooltip>
        
        {/* Profile menu */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={isMenuOpen}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 180,
              background: darkMode 
                ? 'linear-gradient(180deg, #263238 0%, #1E2723 100%)'
                : 'linear-gradient(180deg, #FFFFFF 0%, #F9FBF7 100%)',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: darkMode ? '#263238' : '#FFFFFF',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={() => handleNavigation('/profile')}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, background: muiTheme.palette.primary.main }} />
            <Typography variant="subtitle2">My Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings')}>
            <SettingsIcon fontSize="small" sx={{ mr: 1, color: muiTheme.palette.primary.main }} />
            <Typography variant="subtitle2">Settings</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: muiTheme.palette.error.main }}>
            <Typography variant="subtitle2">Logout</Typography>
          </MenuItem>
        </Menu>
        
        {/* Notifications menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          id="notifications-menu"
          open={isNotificationMenuOpen}
          onClose={handleNotificationMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 280,
              maxWidth: 320,
              background: darkMode 
                ? 'linear-gradient(180deg, #263238 0%, #1E2723 100%)'
                : 'linear-gradient(180deg, #FFFFFF 0%, #F9FBF7 100%)',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: darkMode ? '#263238' : '#FFFFFF',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" color="primary" fontWeight="bold">New Market Opportunity</Typography>
              <Typography variant="body2">A new buyer is interested in your maize produce</Typography>
              <Typography variant="caption" color="text.secondary">5 minutes ago</Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" color="primary" fontWeight="bold">Storage Alert</Typography>
              <Typography variant="body2">Temperature rising in Storage Unit #3</Typography>
              <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" color="primary" fontWeight="bold">ML Model Update</Typography>
              <Typography variant="body2">New prediction model available for rice crops</Typography>
              <Typography variant="caption" color="text.secondary">Yesterday</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
