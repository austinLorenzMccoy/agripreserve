import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dataRefreshInterval, setDataRefreshInterval] = useState('15');
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [language, setLanguage] = useState('english');
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to backend or localStorage
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Appearance</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">Switch between light and dark themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer ${
                darkMode 
                  ? 'bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white' 
                  : 'bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white'
              } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
            </label>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Language</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full md:w-64 p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              aria-label="Select language preference"
              title="Choose your preferred language for the application interface"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="portuguese">Portuguese</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-gray-500">Receive alerts about important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer ${
                darkMode 
                  ? 'bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white' 
                  : 'bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white'
              } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
            </label>
          </div>
          
          {notificationsEnabled && (
            <>
              <div className="flex items-center justify-between pl-6">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${
                    darkMode 
                      ? 'bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white' 
                      : 'bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white'
                  } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between pl-6">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive alerts in browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${
                    darkMode 
                      ? 'bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white' 
                      : 'bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white'
                  } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
            </>
          )}
          
          <div>
            <h3 className="font-medium mb-2">Data Refresh Interval</h3>
            <select
              value={dataRefreshInterval}
              onChange={(e) => setDataRefreshInterval(e.target.value)}
              className={`w-full md:w-64 p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              aria-label="Select data refresh interval"
              title="Choose how frequently the dashboard data should automatically refresh"
            >
              <option value="5">Every 5 minutes</option>
              <option value="15">Every 15 minutes</option>
              <option value="30">Every 30 minutes</option>
              <option value="60">Every hour</option>
              <option value="manual">Manual refresh only</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Units & Formats</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Temperature Unit</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="temperatureUnit"
                  value="celsius"
                  checked={temperatureUnit === 'celsius'}
                  onChange={() => setTemperatureUnit('celsius')}
                  className="mr-2"
                />
                Celsius (°C)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="temperatureUnit"
                  value="fahrenheit"
                  checked={temperatureUnit === 'fahrenheit'}
                  onChange={() => setTemperatureUnit('fahrenheit')}
                  className="mr-2"
                />
                Fahrenheit (°F)
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Weight Unit</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="weightUnit"
                  value="kg"
                  checked={weightUnit === 'kg'}
                  onChange={() => setWeightUnit('kg')}
                  className="mr-2"
                />
                Kilograms (kg)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="weightUnit"
                  value="lb"
                  checked={weightUnit === 'lb'}
                  onChange={() => setWeightUnit('lb')}
                  className="mr-2"
                />
                Pounds (lb)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Account</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Email Address</h3>
            <input
              type="email"
              defaultValue="user@example.com"
              className={`w-full md:w-64 p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Change Password</h3>
            <button className={`px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}>
              Change Password
            </button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
            <button className={`px-4 py-2 rounded-lg ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}>
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button className={`px-4 py-2 rounded-lg ${
          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
        }`}>
          Cancel
        </button>
        <button 
          onClick={handleSaveSettings}
          className={`px-4 py-2 rounded-lg ${
            darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
