import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../context/ThemeContext';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Chip,
  LinearProgress,
  Stack,
  Divider,
  IconButton,
  Button,
  useMediaQuery,
  alpha,
  Tooltip,
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Info as InfoIcon,
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Mock data for top crops with highest loss
const topCrops = [
  { name: 'Tomatoes', lossPercentage: 18, color: '#F44336' },
  { name: 'Potatoes', lossPercentage: 15, color: '#FF9800' },
  { name: 'Bananas', lossPercentage: 14, color: '#FFEB3B' },
  { name: 'Apples', lossPercentage: 10, color: '#4CAF50' },
  { name: 'Mangoes', lossPercentage: 9, color: '#FF5722' },
];

// Mock data for quick stats
const quickStats = [
  { 
    title: 'Total Crop Loss', 
    value: '28.5%', 
    change: -2.3, 
    icon: TrendingDown,
    color: '#F44336',
    bgColor: '#FFEBEE',
  },
  { 
    title: 'Storage Efficiency', 
    value: '72.1%', 
    change: 4.5, 
    icon: TrendingUp,
    color: '#4CAF50',
    bgColor: '#E8F5E9',
  },
  { 
    title: 'Market Connections', 
    value: '18', 
    change: 3, 
    icon: TrendingUp,
    color: '#2196F3',
    bgColor: '#E3F2FD',
  },
  { 
    title: 'Prediction Accuracy', 
    value: '89.7%', 
    change: 1.2, 
    icon: TrendingUp,
    color: '#9C27B0',
    bgColor: '#F3E5F5',
  },
];

const Dashboard = () => {
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [timeRange, setTimeRange] = useState('6months');
  const navigate = useNavigate();
  
  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };
  
  return (
    <Box sx={{ 
      animation: 'fadeIn 0.5s ease-in-out',
      '@keyframes fadeIn': {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    }}>
      {/* Header with title and time range selector */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
      }}>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold"
            sx={{ 
              background: darkMode
                ? 'linear-gradient(45deg, #81C784 30%, #4CAF50 90%)'
                : 'linear-gradient(45deg, #2E7D32 30%, #388E3C 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
              mb: 0.5,
            }}
          >
            AgriPreserve Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Overview of post-harvest losses and opportunities
          </Typography>
        </Box>
        
        <FormControl 
          size="small" 
          variant="outlined"
          sx={{ 
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: darkMode 
                ? alpha(muiTheme.palette.primary.main, 0.1) 
                : alpha(muiTheme.palette.primary.main, 0.05),
            },
          }}
        >
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="Time Range"
          >
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="6months">Last 6 Months</MenuItem>
            <MenuItem value="1year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Quick Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                borderRadius: 3,
                background: darkMode 
                  ? alpha(stat.color, 0.15)
                  : stat.bgColor,
                border: `1px solid ${alpha(stat.color, darkMode ? 0.2 : 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 8px 16px ${alpha(stat.color, 0.15)}`,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color={stat.color}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: alpha(stat.color, 0.2),
                  }}
                >
                  <stat.icon sx={{ color: stat.color }} />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip
                  size="small"
                  label={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                  sx={{
                    bgcolor: alpha(stat.change > 0 ? '#4CAF50' : '#F44336', 0.1),
                    color: stat.change > 0 ? '#4CAF50' : '#F44336',
                    fontWeight: 'bold',
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs previous period
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Top Crops with Highest Loss */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              height: '100%',
              overflow: 'hidden',
              border: `1px solid ${alpha(muiTheme.palette.divider, 0.1)}`,
              boxShadow: darkMode 
                ? '0 4px 20px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: darkMode 
                  ? '0 8px 30px rgba(0,0,0,0.25)'
                  : '0 8px 30px rgba(0,0,0,0.1)',
              },
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Top Crops with Highest Loss
                </Typography>
              }
              action={
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              }
              sx={{ 
                pb: 0,
                '& .MuiCardHeader-action': { alignSelf: 'center' },
              }}
            />
            <CardContent>
              <Stack spacing={2}>
                {topCrops.map((crop, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="medium">{crop.name}</Typography>
                      <Typography variant="body2" fontWeight="bold" color={crop.color}>
                        {crop.lossPercentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={crop.lossPercentage * 5} // Scale to make bar longer (max would be 100)
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: alpha(crop.color, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: crop.color,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/loss-analysis')}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3,
                  }}
                >
                  View Detailed Analysis
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Loss Factors */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              height: '100%',
              overflow: 'hidden',
              border: `1px solid ${alpha(muiTheme.palette.divider, 0.1)}`,
              boxShadow: darkMode 
                ? '0 4px 20px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: darkMode 
                  ? '0 8px 30px rgba(0,0,0,0.25)'
                  : '0 8px 30px rgba(0,0,0,0.1)',
              },
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Loss Factors Analysis
                </Typography>
              }
              action={
                <Tooltip title="Refresh data">
                  <IconButton size="small">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              }
              sx={{ 
                pb: 0,
                '& .MuiCardHeader-action': { alignSelf: 'center' },
              }}
            />
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 2,
              }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Primary loss factors in the selected period
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  justifyContent: 'center',
                  mt: 2,
                  mb: 3,
                }}>
                  <Chip 
                    label="Poor Storage (38%)" 
                    sx={{ 
                      bgcolor: alpha('#FF9800', darkMode ? 0.2 : 0.1),
                      color: '#FF9800',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 2,
                    }} 
                  />
                  <Chip 
                    label="Transportation (24%)" 
                    sx={{ 
                      bgcolor: alpha('#2196F3', darkMode ? 0.2 : 0.1),
                      color: '#2196F3',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 2,
                    }} 
                  />
                  <Chip 
                    label="Pests (18%)" 
                    sx={{ 
                      bgcolor: alpha('#F44336', darkMode ? 0.2 : 0.1),
                      color: '#F44336',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 2,
                    }} 
                  />
                  <Chip 
                    label="Processing (12%)" 
                    sx={{ 
                      bgcolor: alpha('#9C27B0', darkMode ? 0.2 : 0.1),
                      color: '#9C27B0',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 2,
                    }} 
                  />
                  <Chip 
                    label="Market Access (8%)" 
                    sx={{ 
                      bgcolor: alpha('#4CAF50', darkMode ? 0.2 : 0.1),
                      color: '#4CAF50',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 2,
                    }} 
                  />
                </Box>
                
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/loss-analysis')}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3,
                    }}
                  >
                    View Detailed Factors
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Storage Solutions */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              height: '100%',
              overflow: 'hidden',
              border: `1px solid ${alpha(muiTheme.palette.divider, 0.1)}`,
              boxShadow: darkMode 
                ? '0 4px 20px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: darkMode 
                  ? '0 8px 30px rgba(0,0,0,0.25)'
                  : '0 8px 30px rgba(0,0,0,0.1)',
              },
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(33, 150, 243, 0.02) 100%)',
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Storage Solutions
                </Typography>
              }
              action={
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              }
              sx={{ 
                pb: 0,
                '& .MuiCardHeader-action': { alignSelf: 'center' },
              }}
            />
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                py: 1,
              }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Recommended storage solutions based on your crops
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Stack spacing={2}>
                    <Paper elevation={0} sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      bgcolor: alpha('#2196F3', 0.05),
                      border: `1px solid ${alpha('#2196F3', 0.1)}`,
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#2196F3">
                        Cold Storage Units
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ideal for tomatoes and mangoes. Reduces loss by up to 23%.
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          label="High Impact" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#4CAF50', 0.1),
                            color: '#4CAF50',
                            fontWeight: 'bold',
                          }} 
                        />
                      </Box>
                    </Paper>
                    
                    <Paper elevation={0} sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      bgcolor: alpha('#FF9800', 0.05),
                      border: `1px solid ${alpha('#FF9800', 0.1)}`,
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#FF9800">
                        Hermetic Storage Bags
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Perfect for potatoes and grains. Cost-effective solution.
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          label="Medium Cost" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#FF9800', 0.1),
                            color: '#FF9800',
                            fontWeight: 'bold',
                          }} 
                        />
                      </Box>
                    </Paper>
                  </Stack>
                </Box>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/storage-solutions')}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3,
                      background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                      boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
                    }}
                  >
                    Explore All Solutions
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Market Opportunities */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              height: '100%',
              overflow: 'hidden',
              border: `1px solid ${alpha(muiTheme.palette.divider, 0.1)}`,
              boxShadow: darkMode 
                ? '0 4px 20px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: darkMode 
                  ? '0 8px 30px rgba(0,0,0,0.25)'
                  : '0 8px 30px rgba(0,0,0,0.1)',
              },
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Market Opportunities
                </Typography>
              }
              action={
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              }
              sx={{ 
                pb: 0,
                '& .MuiCardHeader-action': { alignSelf: 'center' },
              }}
            />
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                py: 1,
              }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Recent market opportunities in your area
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Stack spacing={2}>
                    <Paper elevation={0} sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      bgcolor: alpha('#4CAF50', 0.05),
                      border: `1px solid ${alpha('#4CAF50', 0.1)}`,
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" color="#4CAF50">
                            Tomato Processing Plant
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Looking for 2 tons of fresh tomatoes weekly
                          </Typography>
                        </Box>
                        <Chip 
                          label="New" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#F44336', 0.1),
                            color: '#F44336',
                            fontWeight: 'bold',
                          }} 
                        />
                      </Box>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Chip 
                          label="5km away" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#4CAF50', 0.1),
                            color: '#4CAF50',
                            fontWeight: 'bold',
                          }} 
                        />
                        <Chip 
                          label="₦120/kg" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#FF9800', 0.1),
                            color: '#FF9800',
                            fontWeight: 'bold',
                          }} 
                        />
                      </Box>
                    </Paper>
                    
                    <Paper elevation={0} sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      bgcolor: alpha('#9C27B0', 0.05),
                      border: `1px solid ${alpha('#9C27B0', 0.1)}`,
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" color="#9C27B0">
                            Export Opportunity
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Mangoes for export to Europe (organic certified)
                          </Typography>
                        </Box>
                        <Chip 
                          label="Premium" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#9C27B0', 0.1),
                            color: '#9C27B0',
                            fontWeight: 'bold',
                          }} 
                        />
                      </Box>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Chip 
                          label="15km away" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#4CAF50', 0.1),
                            color: '#4CAF50',
                            fontWeight: 'bold',
                          }} 
                        />
                        <Chip 
                          label="₦350/kg" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#FF9800', 0.1),
                            color: '#FF9800',
                            fontWeight: 'bold',
                          }} 
                        />
                      </Box>
                    </Paper>
                  </Stack>
                </Box>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/market-connections')}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3,
                      background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
                      boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    View All Opportunities
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
