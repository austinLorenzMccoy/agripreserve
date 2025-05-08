import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Typography,
  useTheme as useMuiTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingDown as LossAnalysisIcon,
  CompareArrows as CropComparisonIcon,
  Warehouse as StorageIcon,
  BusinessCenter as MarketIcon,
  Psychology as MLIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

// Navigation items with Material UI icons
const navItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon, color: '#4CAF50' },
  { path: '/loss-analysis', label: 'Loss Analysis', icon: LossAnalysisIcon, color: '#F44336' },
  { path: '/crop-comparison', label: 'Crop Comparison', icon: CropComparisonIcon, color: '#FF9800' },
  { path: '/storage-solutions', label: 'Storage Solutions', icon: StorageIcon, color: '#2196F3' },
  { path: '/market-connections', label: 'Market Connections', icon: MarketIcon, color: '#9C27B0' },
  { path: '/mlflow-dashboard', label: 'ML Dashboard', icon: MLIcon, color: '#00BCD4' },
  { path: '/settings', label: 'Settings', icon: SettingsIcon, color: '#607D8B' },
];

const Sidebar = () => {
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const location = useLocation();
  
  return (
    <Box sx={{ 
      pt: 8, // Space for the fixed AppBar
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* App Logo and Title */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        mb: 2,
      }}>
        <Box 
          component="img"
          src="/assets/logo.svg"
          alt="AgriPreserve Logo"
          sx={{ 
            width: 70,
            height: 70,
            mb: 1,
            filter: darkMode ? 'brightness(0.9)' : 'none',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-5px)' },
              '100%': { transform: 'translateY(0px)' },
            },
          }}
        />
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
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
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            mt: 0.5,
            fontSize: '0.7rem',
            textAlign: 'center',
            maxWidth: '90%',
          }}
        >
          Reducing Post-Harvest Losses in Nigeria
        </Typography>
      </Box>
      
      <Divider sx={{ 
        mx: 2,
        background: darkMode 
          ? alpha(muiTheme.palette.primary.main, 0.2) 
          : alpha(muiTheme.palette.primary.main, 0.1),
      }} />
      
      {/* Navigation Links */}
      <List component="nav" sx={{ px: 1, py: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                         (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <Tooltip title={item.label} placement="right" arrow>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      bgcolor: darkMode 
                        ? alpha(muiTheme.palette.primary.main, 0.2) 
                        : alpha(muiTheme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: darkMode 
                          ? alpha(muiTheme.palette.primary.main, 0.3) 
                          : alpha(muiTheme.palette.primary.main, 0.2),
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '10%',
                        height: '80%',
                        width: 4,
                        borderRadius: '0 4px 4px 0',
                        backgroundColor: item.color,
                        transition: 'all 0.3s ease',
                      },
                    },
                    '&:hover': {
                      bgcolor: darkMode 
                        ? alpha(muiTheme.palette.primary.main, 0.1) 
                        : alpha(muiTheme.palette.primary.main, 0.05),
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? item.color : 'text.secondary',
                    minWidth: 40,
                  }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 'bold' : 'medium',
                      color: isActive ? item.color : 'text.primary',
                    }} 
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
      
      <Divider sx={{ 
        mx: 2,
        background: darkMode 
          ? alpha(muiTheme.palette.primary.main, 0.2) 
          : alpha(muiTheme.palette.primary.main, 0.1),
      }} />
      
      {/* Footer Info */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Tooltip title="About AgriPreserve">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 1,
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: darkMode 
                ? alpha(muiTheme.palette.primary.main, 0.1) 
                : alpha(muiTheme.palette.primary.main, 0.05),
            },
          }}>
            <InfoIcon 
              fontSize="small" 
              color="primary" 
              sx={{ mr: 1, fontSize: '1rem' }} 
            />
            <Typography variant="caption" color="text.secondary">
              v1.0.0
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
