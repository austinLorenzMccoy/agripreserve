import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Mock data for storage solutions
const storageOptions = [
  {
    id: 'cold-storage',
    name: 'Cold Storage',
    description: 'Temperature-controlled storage for extending shelf life of perishable crops',
    suitableCrops: ['Apples', 'Potatoes', 'Carrots', 'Cabbage'],
    costRange: '$$$',
    efficiency: 85,
    implementationTime: 'Medium',
    maintenanceCost: 'High',
    image: '🧊'
  },
  {
    id: 'controlled-atmosphere',
    name: 'Controlled Atmosphere Storage',
    description: 'Adjusts oxygen, carbon dioxide, and nitrogen levels to slow ripening',
    suitableCrops: ['Apples', 'Pears', 'Berries', 'Cherries'],
    costRange: '$$$$',
    efficiency: 92,
    implementationTime: 'Long',
    maintenanceCost: 'High',
    image: '🌬️'
  },
  {
    id: 'evaporative-cooling',
    name: 'Evaporative Cooling',
    description: 'Low-cost cooling system using water evaporation to reduce temperature',
    suitableCrops: ['Tomatoes', 'Leafy Greens', 'Cucumbers', 'Peppers'],
    costRange: '$',
    efficiency: 70,
    implementationTime: 'Short',
    maintenanceCost: 'Low',
    image: '💧'
  },
  {
    id: 'zero-energy-cool-chamber',
    name: 'Zero Energy Cool Chamber',
    description: 'Brick and sand structure that maintains coolness without electricity',
    suitableCrops: ['Potatoes', 'Onions', 'Tomatoes', 'Leafy Vegetables'],
    costRange: '$',
    efficiency: 65,
    implementationTime: 'Short',
    maintenanceCost: 'Very Low',
    image: '🧱'
  },
  {
    id: 'modified-atmosphere-packaging',
    name: 'Modified Atmosphere Packaging',
    description: 'Special packaging that alters air composition around produce',
    suitableCrops: ['Berries', 'Cut Vegetables', 'Fresh Herbs', 'Mushrooms'],
    costRange: '$$',
    efficiency: 78,
    implementationTime: 'Short',
    maintenanceCost: 'Medium',
    image: '📦'
  },
  {
    id: 'underground-storage',
    name: 'Underground Storage',
    description: 'Traditional method using natural cooling and insulation of the earth',
    suitableCrops: ['Root Vegetables', 'Potatoes', 'Onions', 'Garlic'],
    costRange: '$$',
    efficiency: 75,
    implementationTime: 'Medium',
    maintenanceCost: 'Low',
    image: '🕳️'
  },
];

// Mock data for current storage conditions
const currentStorageUnits = [
  {
    id: 'unit-a',
    name: 'Storage Unit A',
    type: 'Cold Storage',
    temperature: '4°C',
    humidity: '90%',
    crops: ['Apples', 'Carrots'],
    status: 'Optimal',
    lastCheck: '2 hours ago',
    alertLevel: 'none'
  },
  {
    id: 'unit-b',
    name: 'Storage Unit B',
    type: 'Cold Storage',
    temperature: '12°C',
    humidity: '85%',
    crops: ['Potatoes', 'Onions'],
    status: 'Warning',
    lastCheck: '1 hour ago',
    alertLevel: 'warning'
  },
  {
    id: 'unit-c',
    name: 'Storage Unit C',
    type: 'Evaporative Cooling',
    temperature: '18°C',
    humidity: '75%',
    crops: ['Tomatoes', 'Peppers'],
    status: 'Critical',
    lastCheck: '30 minutes ago',
    alertLevel: 'critical'
  },
];

const StorageSolutions = () => {
  const { darkMode } = useTheme();
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [costFilter, setCostFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter storage options based on selections
  const filteredOptions = storageOptions.filter(option => {
    // Filter by crop if a specific crop is selected
    if (selectedCrop !== 'all' && !option.suitableCrops.some(crop => 
      crop.toLowerCase().includes(selectedCrop.toLowerCase()))) {
      return false;
    }
    
    // Filter by cost
    if (costFilter !== 'all') {
      if (costFilter === 'low' && option.costRange.length > 2) return false;
      if (costFilter === 'medium' && (option.costRange.length < 2 || option.costRange.length > 3)) return false;
      if (costFilter === 'high' && option.costRange.length < 3) return false;
    }
    
    // Filter by search query
    if (searchQuery && !option.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !option.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Storage Solutions</h1>
      </div>
      
      {/* Filter and Search */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Crop Type</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Crops</option>
              <option value="apples">Apples</option>
              <option value="tomatoes">Tomatoes</option>
              <option value="potatoes">Potatoes</option>
              <option value="onions">Onions</option>
              <option value="leafy">Leafy Greens</option>
              <option value="berries">Berries</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Cost Range</label>
            <select
              value={costFilter}
              onChange={(e) => setCostFilter(e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Price Ranges</option>
              <option value="low">Low Cost ($)</option>
              <option value="medium">Medium Cost ($$)</option>
              <option value="high">High Cost ($$$+)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solutions..."
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>
      </div>
      
      {/* Current Storage Units */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Current Storage Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentStorageUnits.map(unit => (
            <div 
              key={unit.id} 
              className={`p-4 rounded-lg border ${
                unit.alertLevel === 'none' 
                  ? darkMode ? 'border-gray-700' : 'border-gray-200'
                  : unit.alertLevel === 'warning'
                    ? 'border-yellow-500'
                    : 'border-red-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{unit.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  unit.alertLevel === 'none' 
                    ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                    : unit.alertLevel === 'warning'
                      ? darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                      : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                }`}>
                  {unit.status}
                </span>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm">{unit.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Temperature:</span>
                  <span className="text-sm">{unit.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Humidity:</span>
                  <span className="text-sm">{unit.humidity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Crops:</span>
                  <span className="text-sm">{unit.crops.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Check:</span>
                  <span className="text-sm">{unit.lastCheck}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <button className={`w-full py-2 rounded-lg text-center ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Storage Solutions */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Recommended Storage Solutions</h2>
        
        {filteredOptions.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No storage solutions match your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOptions.map(option => (
              <div 
                key={option.id} 
                className={`p-5 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{option.image}</div>
                  <div>
                    <h3 className="text-lg font-medium">{option.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 mr-2">Cost: {option.costRange}</span>
                      <span className="text-sm text-gray-500">Efficiency: {option.efficiency}%</span>
                    </div>
                  </div>
                </div>
                
                <p className="mt-3 text-sm">{option.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Suitable for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {option.suitableCrops.map(crop => (
                      <span 
                        key={crop} 
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Implementation:</span>
                    <span className="ml-2">{option.implementationTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Maintenance:</span>
                    <span className="ml-2">{option.maintenanceCost}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className={`flex-1 py-2 rounded-lg text-center ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}>
                    Details
                  </button>
                  <button className={`flex-1 py-2 rounded-lg text-center border ${
                    darkMode 
                      ? 'border-blue-600 text-blue-400 hover:bg-blue-900/30' 
                      : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                  }`}>
                    ROI Calculator
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Implementation Guide */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Implementation Guide</h2>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="font-medium mb-2">1. Assess Your Needs</h3>
            <p className="text-sm">Evaluate your crop types, volumes, and current loss rates to determine the most suitable storage solution.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="font-medium mb-2">2. Calculate ROI</h3>
            <p className="text-sm">Use our ROI calculator to estimate the return on investment for each storage solution based on your specific situation.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="font-medium mb-2">3. Plan Implementation</h3>
            <p className="text-sm">Consider space requirements, power availability, and technical expertise needed for installation and maintenance.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="font-medium mb-2">4. Monitor and Optimize</h3>
            <p className="text-sm">Continuously track performance and make adjustments to achieve optimal conditions for your crops.</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className={`px-4 py-2 rounded-lg ${
            darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white`}>
            Request Expert Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageSolutions;
