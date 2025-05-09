import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Box, Typography, Paper, Grid } from '@mui/material';

// Import a more robust charting library
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for loss analysis
const lossFactors = [
  { factor: 'Poor Storage Conditions', percentage: 35, color: 'bg-red-500', barColor: '#F44336' },
  { factor: 'Transportation Damage', percentage: 25, color: 'bg-orange-500', barColor: '#FF9800' },
  { factor: 'Pest Infestation', percentage: 15, color: 'bg-yellow-500', barColor: '#FFEB3B' },
  { factor: 'Harvest Damage', percentage: 12, color: 'bg-green-500', barColor: '#4CAF50' },
  { factor: 'Processing Inefficiency', percentage: 8, color: 'bg-blue-500', barColor: '#2196F3' },
  { factor: 'Other Factors', percentage: 5, color: 'bg-purple-500', barColor: '#9C27B0' },
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
  
  // Prepare data for recharts
  const chartData = monthlyLossData.map(item => ({
    name: item.month,
    loss: item.loss
  }));
  
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
            <p className="text-3xl font-semibold">₦15,750,000</p>
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
      
      {/* Monthly Loss Trend - Using Recharts for better visualization */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Monthly Loss Trend</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: darkMode ? '#e0e0e0' : '#333' }}
              />
              <YAxis 
                tick={{ fill: darkMode ? '#e0e0e0' : '#333' }}
                label={{ 
                  value: 'Loss %', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: darkMode ? '#e0e0e0' : '#333' }
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: darkMode ? '#e0e0e0' : '#333',
                  border: `1px solid ${darkMode ? '#555' : '#ccc'}`
                }}
              />
              <Legend wrapperStyle={{ color: darkMode ? '#e0e0e0' : '#333' }} />
              <Bar 
                dataKey="loss" 
                name="Loss %" 
                fill="#F44336" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recommendations - Fixed layout to prevent overlapping */}
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
