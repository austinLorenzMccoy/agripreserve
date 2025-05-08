import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-9xl font-bold text-gray-300">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className={`px-6 py-3 rounded-lg ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
