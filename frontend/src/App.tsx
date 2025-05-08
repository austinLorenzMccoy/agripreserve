import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { Box, CircularProgress } from '@mui/material';
import { Suspense, lazy } from 'react';

// Lazy load components for better performance
const Layout = lazy(() => import('./components/layout/Layout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LossAnalysis = lazy(() => import('./pages/LossAnalysis'));
const CropComparison = lazy(() => import('./pages/CropComparison'));
const StorageSolutions = lazy(() => import('./pages/StorageSolutions'));
const MarketConnections = lazy(() => import('./pages/MarketConnections'));
const MLflowDashboard = lazy(() => import('./pages/MLflowDashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading component with animation
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(45deg, #F9FBF7 30%, #E8F5E9 90%)',
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <CircularProgress 
        size={60} 
        thickness={4} 
        color="primary" 
        sx={{ 
          animation: 'pulse 1.5s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(0.95)',
              boxShadow: '0 0 0 0 rgba(46, 125, 50, 0.7)',
            },
            '70%': {
              transform: 'scale(1)',
              boxShadow: '0 0 0 10px rgba(46, 125, 50, 0)',
            },
            '100%': {
              transform: 'scale(0.95)',
              boxShadow: '0 0 0 0 rgba(46, 125, 50, 0)',
            },
          },
        }}
      />
      <Box 
        sx={{ 
          mt: 2, 
          fontWeight: 'bold',
          fontSize: '1.2rem',
          color: '#2E7D32',
          animation: 'fadeIn 1.5s infinite alternate',
          '@keyframes fadeIn': {
            '0%': { opacity: 0.6 },
            '100%': { opacity: 1 },
          },
        }}
      >
        Loading AgriPreserve...
      </Box>
    </Box>
  </Box>
);

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="loss-analysis" element={<LossAnalysis />} />
              <Route path="crop-comparison" element={<CropComparison />} />
              <Route path="storage-solutions" element={<StorageSolutions />} />
              <Route path="market-connections" element={<MarketConnections />} />
              <Route path="mlflow-dashboard" element={<MLflowDashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
