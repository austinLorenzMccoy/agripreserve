import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Mock data for crop comparison
const cropData = [
  { 
    id: 'tomatoes',
    name: 'Tomatoes', 
    lossRate: 18, 
    storageLife: 14, 
    optimalTemp: '10-12°C',
    optimalHumidity: '85-90%',
    costPerKg: 1.2,
    marketValue: 2.5
  },
  { 
    id: 'potatoes',
    name: 'Potatoes', 
    lossRate: 15, 
    storageLife: 120, 
    optimalTemp: '7-10°C',
    optimalHumidity: '90-95%',
    costPerKg: 0.8,
    marketValue: 1.5
  },
  { 
    id: 'bananas',
    name: 'Bananas', 
    lossRate: 14, 
    storageLife: 14, 
    optimalTemp: '13-14°C',
    optimalHumidity: '90-95%',
    costPerKg: 1.0,
    marketValue: 1.8
  },
  { 
    id: 'apples',
    name: 'Apples', 
    lossRate: 10, 
    storageLife: 90, 
    optimalTemp: '0-4°C',
    optimalHumidity: '90-95%',
    costPerKg: 1.5,
    marketValue: 2.2
  },
  { 
    id: 'mangoes',
    name: 'Mangoes', 
    lossRate: 20, 
    storageLife: 14, 
    optimalTemp: '13°C',
    optimalHumidity: '85-90%',
    costPerKg: 2.0,
    marketValue: 3.5
  },
];

const CropComparison = () => {
  const { darkMode } = useTheme();
  const [selectedCrops, setSelectedCrops] = useState(['tomatoes', 'potatoes', 'bananas']);
  
  const handleCropToggle = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      setSelectedCrops(selectedCrops.filter(id => id !== cropId));
    } else {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };
  
  const filteredCrops = cropData.filter(crop => selectedCrops.includes(crop.id));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crop Comparison</h1>
        
        <div className="flex space-x-2">
          {cropData.map(crop => (
            <button
              key={crop.id}
              onClick={() => handleCropToggle(crop.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCrops.includes(crop.id)
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              {crop.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Loss Rate Comparison */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Loss Rate Comparison</h2>
        <div className="space-y-6">
          {filteredCrops.map(crop => (
            <div key={crop.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{crop.name}</span>
                <span>{crop.lossRate}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500" 
                  style={{ width: `${crop.lossRate * 5}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detailed Comparison Table */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Detailed Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <th className="px-4 py-2 text-left">Crop</th>
                <th className="px-4 py-2 text-left">Loss Rate</th>
                <th className="px-4 py-2 text-left">Storage Life (days)</th>
                <th className="px-4 py-2 text-left">Optimal Temperature</th>
                <th className="px-4 py-2 text-left">Optimal Humidity</th>
                <th className="px-4 py-2 text-left">Cost ($/kg)</th>
                <th className="px-4 py-2 text-left">Market Value ($/kg)</th>
                <th className="px-4 py-2 text-left">Profit Margin</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map(crop => (
                <tr key={crop.id} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <td className="px-4 py-3">{crop.name}</td>
                  <td className="px-4 py-3">{crop.lossRate}%</td>
                  <td className="px-4 py-3">{crop.storageLife}</td>
                  <td className="px-4 py-3">{crop.optimalTemp}</td>
                  <td className="px-4 py-3">{crop.optimalHumidity}</td>
                  <td className="px-4 py-3">${crop.costPerKg.toFixed(2)}</td>
                  <td className="px-4 py-3">${crop.marketValue.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {((crop.marketValue - crop.costPerKg) / crop.costPerKg * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Economic Impact */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Economic Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCrops.map(crop => {
            const lossValue = (crop.marketValue * crop.lossRate / 100 * 1000).toFixed(2);
            const potentialSavings = (parseFloat(lossValue) * 0.7).toFixed(2);
            
            return (
              <div 
                key={crop.id} 
                className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-medium">{crop.name}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Loss Value:</span>
                    <span className="font-medium">${lossValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Potential Monthly Savings:</span>
                    <span className="font-medium text-green-500">${potentialSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ROI on Prevention:</span>
                    <span className="font-medium text-blue-500">215%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Recommendations */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="space-y-4">
          {filteredCrops.map(crop => (
            <div 
              key={crop.id}
              className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-200`}
            >
              <h3 className="font-medium text-blue-600">{crop.name}</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• Maintain storage at {crop.optimalTemp} with {crop.optimalHumidity} humidity</li>
                <li>• Implement gentle handling during harvest to reduce physical damage</li>
                <li>• Use modified atmosphere packaging to extend shelf life</li>
                <li>• Consider processing surplus into value-added products</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropComparison;
