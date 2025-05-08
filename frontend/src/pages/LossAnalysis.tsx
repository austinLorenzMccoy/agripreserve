import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Mock data for loss analysis
const lossFactors = [
  { factor: 'Poor Storage Conditions', percentage: 35, color: 'bg-red-500' },
  { factor: 'Transportation Damage', percentage: 25, color: 'bg-orange-500' },
  { factor: 'Pest Infestation', percentage: 15, color: 'bg-yellow-500' },
  { factor: 'Harvest Damage', percentage: 12, color: 'bg-green-500' },
  { factor: 'Processing Inefficiency', percentage: 8, color: 'bg-blue-500' },
  { factor: 'Other Factors', percentage: 5, color: 'bg-purple-500' },
];

const monthlyLossData = [
  { month: 'Jan', loss: 24 },
  { month: 'Feb', loss: 28 },
  { month: 'Mar', loss: 22 },
  { month: 'Apr', loss: 19 },
  { month: 'May', loss: 21 },
  { month: 'Jun', loss: 25 },
];

const LossAnalysis = () => {
  const { darkMode } = useTheme();
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [timeFrame, setTimeFrame] = useState('6months');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Loss Analysis</h1>
        
        <div className="flex space-x-4">
          <div className={`p-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <select 
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className={`rounded px-3 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              <option value="all">All Crops</option>
              <option value="tomatoes">Tomatoes</option>
              <option value="potatoes">Potatoes</option>
              <option value="bananas">Bananas</option>
              <option value="apples">Apples</option>
            </select>
          </div>
          
          <div className={`p-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <select 
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className={`rounded px-3 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              <option value="30days">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-medium text-gray-500">Average Loss Rate</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">23.2%</p>
            <p className="ml-2 text-sm text-green-500">-1.8%</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">Compared to previous period</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-medium text-gray-500">Financial Impact</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">$34,250</p>
            <p className="ml-2 text-sm text-red-500">+2.4%</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">Estimated loss value</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-medium text-gray-500">Preventable Loss</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">68%</p>
            <p className="ml-2 text-sm text-blue-500">+5%</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">Of total loss is preventable</p>
        </div>
      </div>
      
      {/* Loss Factors */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Loss Factors</h2>
        <div className="space-y-4">
          {lossFactors.map((factor) => (
            <div key={factor.factor} className="flex items-center">
              <div className="w-48 text-sm">{factor.factor}</div>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${factor.color}`} 
                  style={{ width: `${factor.percentage}%` }}
                ></div>
              </div>
              <div className="w-12 text-right text-sm">{factor.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Monthly Loss Trend */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Monthly Loss Trend</h2>
        <div className="h-64 flex items-end space-x-4">
          {monthlyLossData.map((item) => (
            <div key={item.month} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-red-500 rounded-t" 
                style={{ height: `${item.loss * 2}px` }}
              ></div>
              <div className="mt-2 text-sm">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-200`}>
            <h3 className="font-medium text-blue-600">Improve Storage Conditions</h3>
            <p className="mt-1 text-sm">Upgrading temperature control systems could reduce losses by up to 15%.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-50'} border border-green-200`}>
            <h3 className="font-medium text-green-600">Optimize Transportation</h3>
            <p className="mt-1 text-sm">Using cushioned crates during transport could reduce damage by 10%.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} border border-purple-200`}>
            <h3 className="font-medium text-purple-600">Pest Management</h3>
            <p className="mt-1 text-sm">Implementing integrated pest management could save 8% of current losses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossAnalysis;
