import { Outlet } from 'react-router-dom';
import { Box, useTheme as useMuiTheme, Drawer, useMediaQuery, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

const Layout = () => {
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Handle drawer toggle for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #1E2723 0%, #263238 100%)' 
        : 'linear-gradient(135deg, #F9FBF7 0%, #E8F5E9 100%)',
      transition: 'all 0.3s ease',
    }}>
      <Header onDrawerToggle={handleDrawerToggle} />
      
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { 
              width: 280,
              boxSizing: 'border-box',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              background: darkMode 
                ? 'linear-gradient(180deg, #263238 0%, #1E2723 100%)' 
                : 'linear-gradient(180deg, #FFFFFF 0%, #F9FBF7 100%)',
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}
      
      {/* Desktop drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: 280,
              boxSizing: 'border-box',
              border: 'none',
              boxShadow: darkMode ? '2px 0 8px rgba(0,0,0,0.2)' : '2px 0 8px rgba(0,0,0,0.05)',
              background: darkMode 
                ? 'linear-gradient(180deg, #263238 0%, #1E2723 100%)' 
                : 'linear-gradient(180deg, #FFFFFF 0%, #F9FBF7 100%)',
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      )}
      
      {/* Main content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        pt: { xs: 10, sm: 9 },
        overflow: 'auto',
        transition: 'all 0.3s ease',
      }}>
        <Outlet />
      </Box>
      
      {/* Scroll to top button */}
      <Zoom in={showScrollTop}>
        <Fab 
          color="primary" 
          size="medium" 
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: darkMode 
              ? 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)'
              : 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 10px rgba(0,0,0,0.2)',
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default Layout;
