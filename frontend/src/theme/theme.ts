import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Vibrant color palette for agriculture theme
const lightPalette = {
  primary: {
    main: '#2E7D32', // Green - representing growth and agriculture
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF8F00', // Amber - representing harvest and sunlight
    light: '#FFA726',
    dark: '#EF6C00',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#43A047',
    light: '#66BB6A',
    dark: '#2E7D32',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  warning: {
    main: '#FFA000',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
  },
  background: {
    default: '#F9FBF7', // Light green-tinted white
    paper: '#FFFFFF',
  },
  text: {
    primary: '#263238',
    secondary: '#546E7A',
    disabled: '#90A4AE',
  },
};

// Dark mode palette
const darkPalette = {
  primary: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFA726',
    light: '#FFB74D',
    dark: '#FF8F00',
    contrastText: '#000000',
  },
  success: {
    main: '#66BB6A',
    light: '#81C784',
    dark: '#388E3C',
  },
  error: {
    main: '#EF5350',
    light: '#E57373',
    dark: '#D32F2F',
  },
  warning: {
    main: '#FFB74D',
    light: '#FFCC80',
    dark: '#FFA000',
  },
  info: {
    main: '#42A5F5',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  background: {
    default: '#1E2723', // Dark green-tinted black
    paper: '#263238',
  },
  text: {
    primary: '#ECEFF1',
    secondary: '#B0BEC5',
    disabled: '#78909C',
  },
};

// Create theme with custom typography and shape
const createAppTheme = (darkMode: boolean) => {
  let theme = createTheme({
    palette: darkMode ? darkPalette : lightPalette,
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode ? '0 6px 10px rgba(0,0,0,0.4)' : '0 6px 10px rgba(0,0,0,0.15)',
            },
          },
          containedPrimary: {
            background: darkMode 
              ? 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)'
              : 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          },
          containedSecondary: {
            background: darkMode
              ? 'linear-gradient(45deg, #FF8F00 30%, #FFA726 90%)'
              : 'linear-gradient(45deg, #EF6C00 30%, #FF8F00 90%)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode 
              ? '0 8px 16px rgba(0,0,0,0.4)'
              : '0 8px 16px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: darkMode 
                ? '0 12px 20px rgba(0,0,0,0.5)'
                : '0 12px 20px rgba(0,0,0,0.15)',
            },
            overflow: 'hidden',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: darkMode 
              ? '0 4px 8px rgba(0,0,0,0.3)'
              : '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 500,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'background-color 0.2s ease',
          },
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
          },
        },
      },
    },
  });

  // Make typography responsive
  theme = responsiveFontSizes(theme);

  return theme;
};

export default createAppTheme;
