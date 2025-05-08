import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Mock data for ML models
const mlModels = [
  {
    id: 'model-1',
    name: 'Crop Loss Predictor',
    type: 'Random Forest',
    accuracy: 87.5,
    lastUpdated: '2025-04-28',
    status: 'Production',
    features: ['Temperature', 'Humidity', 'Storage Type', 'Crop Type', 'Harvest Method'],
    creator: 'AI Team',
    description: 'Predicts potential crop loss based on environmental and handling factors'
  },
  {
    id: 'model-2',
    name: 'Optimal Storage Recommender',
    type: 'Gradient Boosting',
    accuracy: 92.3,
    lastUpdated: '2025-05-01',
    status: 'Production',
    features: ['Crop Type', 'Quantity', 'Target Storage Duration', 'Budget Constraints'],
    creator: 'Storage Solutions Team',
    description: 'Recommends optimal storage solutions based on crop characteristics and constraints'
  },
  {
    id: 'model-3',
    name: 'Market Price Forecaster',
    type: 'LSTM Neural Network',
    accuracy: 83.7,
    lastUpdated: '2025-04-15',
    status: 'Production',
    features: ['Historical Prices', 'Season', 'Weather Forecast', 'Production Volumes'],
    creator: 'Market Analysis Team',
    description: 'Forecasts market prices for various crops to optimize selling decisions'
  },
  {
    id: 'model-4',
    name: 'Harvest Quality Classifier',
    type: 'CNN',
    accuracy: 94.1,
    lastUpdated: '2025-05-05',
    status: 'Testing',
    features: ['Image Data', 'Color Analysis', 'Size Measurements', 'Texture Analysis'],
    creator: 'Quality Control Team',
    description: 'Classifies harvest quality based on visual characteristics from images'
  },
  {
    id: 'model-5',
    name: 'Transportation Loss Estimator',
    type: 'XGBoost',
    accuracy: 85.9,
    lastUpdated: '2025-04-10',
    status: 'Development',
    features: ['Distance', 'Transport Type', 'Packaging Method', 'Temperature Control', 'Road Quality'],
    creator: 'Logistics Team',
    description: 'Estimates potential losses during transportation based on logistics factors'
  }
];

// Mock data for model performance metrics
const performanceMetrics = [
  { date: '2025-01', accuracy: 82.1, precision: 80.5, recall: 79.8 },
  { date: '2025-02', accuracy: 83.4, precision: 81.2, recall: 80.5 },
  { date: '2025-03', accuracy: 84.7, precision: 82.8, recall: 81.9 },
  { date: '2025-04', accuracy: 86.2, precision: 84.5, recall: 83.7 },
  { date: '2025-05', accuracy: 87.5, precision: 85.3, recall: 84.9 },
];

// Mock data for feature importance
const featureImportance = [
  { feature: 'Temperature', importance: 0.35 },
  { feature: 'Storage Type', importance: 0.25 },
  { feature: 'Humidity', importance: 0.20 },
  { feature: 'Crop Type', importance: 0.15 },
  { feature: 'Harvest Method', importance: 0.05 },
];

const MLflowDashboard = () => {
  const { darkMode } = useTheme();
  const [selectedModel, setSelectedModel] = useState(mlModels[0]);
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MLflow Dashboard</h1>
        
        <div className="flex space-x-2">
          <button className={`px-4 py-2 rounded-lg ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}>
            View MLflow Server
          </button>
          <button className={`px-4 py-2 rounded-lg border ${
            darkMode 
              ? 'border-blue-600 text-blue-400 hover:bg-blue-900/30' 
              : 'border-blue-500 text-blue-600 hover:bg-blue-50'
          }`}>
            Create New Model
          </button>
        </div>
      </div>
      
      {/* Model Selection */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">ML Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mlModels.map(model => (
            <div 
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`p-4 rounded-lg cursor-pointer border ${
                selectedModel.id === model.id
                  ? darkMode ? 'border-blue-600 bg-blue-900/20' : 'border-blue-500 bg-blue-50'
                  : darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{model.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  model.status === 'Production'
                    ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                    : model.status === 'Testing'
                      ? darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                      : darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>
                  {model.status}
                </span>
              </div>
              
              <p className="mt-2 text-sm">{model.type}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">Accuracy:</span>
                <span className="text-sm font-medium">{model.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected Model Details */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{selectedModel.name}</h2>
          <div className="flex space-x-2">
            <button className={`px-3 py-1 rounded-lg text-sm ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}>
              Run Model
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}>
              Download
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b mb-6 flex space-x-6">
          {['overview', 'performance', 'features', 'logs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 ${
                activeTab === tab 
                  ? `border-b-2 ${darkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'}`
                  : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="text-sm font-medium text-gray-500">Model Type</h3>
                  <p className="mt-1 text-lg">{selectedModel.type}</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="text-sm font-medium text-gray-500">Accuracy</h3>
                  <p className="mt-1 text-lg">{selectedModel.accuracy}%</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="mt-1 text-lg">{selectedModel.lastUpdated}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p>{selectedModel.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedModel.features.map(feature => (
                    <span 
                      key={feature} 
                      className={`px-3 py-1 text-sm rounded-full ${
                        darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Created By</h3>
                <p>{selectedModel.creator}</p>
              </div>
            </div>
          )}
          
          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Performance Metrics Over Time</h3>
                <div className="h-64 flex items-end space-x-2">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.date} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex items-end justify-center space-x-1">
                        <div 
                          className="w-3 bg-blue-500 rounded-t" 
                          style={{ height: `${metric.accuracy * 2}px` }}
                        ></div>
                        <div 
                          className="w-3 bg-green-500 rounded-t" 
                          style={{ height: `${metric.precision * 2}px` }}
                        ></div>
                        <div 
                          className="w-3 bg-purple-500 rounded-t" 
                          style={{ height: `${metric.recall * 2}px` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs">{metric.date}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Accuracy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Precision</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm">Recall</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className="text-lg font-medium mb-2">Confusion Matrix</h3>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Interactive confusion matrix visualization would be displayed here</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="text-lg font-medium mb-2">ROC Curve</h3>
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-500">ROC curve visualization would be displayed here</p>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="text-lg font-medium mb-2">Precision-Recall Curve</h3>
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-500">Precision-Recall curve visualization would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Feature Importance</h3>
                <div className="space-y-4">
                  {featureImportance.map((feature) => (
                    <div key={feature.feature} className="flex items-center">
                      <div className="w-40 text-sm">{feature.feature}</div>
                      <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${feature.importance * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-right text-sm">{(feature.importance * 100).toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className="text-lg font-medium mb-2">Feature Correlation</h3>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Feature correlation heatmap would be displayed here</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Feature Engineering</h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Temperature Normalization:</span> Scaled to range [0,1]
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Storage Type:</span> One-hot encoded
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Crop Type:</span> Embedded using pre-trained embeddings
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Humidity:</span> Binned into 5 categories
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Harvest Method:</span> Label encoded
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg font-mono text-sm ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                <p>[2025-05-08 09:15:23] INFO: Model training started</p>
                <p>[2025-05-08 09:15:25] INFO: Loading dataset with 12,450 samples</p>
                <p>[2025-05-08 09:15:28] INFO: Data preprocessing completed</p>
                <p>[2025-05-08 09:15:30] INFO: Training split: 80%, Validation split: 20%</p>
                <p>[2025-05-08 09:15:45] INFO: Epoch 1/50, Loss: 0.3245, Accuracy: 0.7823</p>
                <p>[2025-05-08 09:15:58] INFO: Epoch 2/50, Loss: 0.2876, Accuracy: 0.8012</p>
                <p>...</p>
                <p>[2025-05-08 10:25:12] INFO: Training completed</p>
                <p>[2025-05-08 10:25:15] INFO: Final model accuracy: 87.5%</p>
                <p>[2025-05-08 10:25:18] INFO: Model saved to MLflow registry</p>
                <p>[2025-05-08 10:25:20] INFO: Model metadata updated</p>
              </div>
              
              <div className="flex justify-between">
                <button className={`px-3 py-1 rounded-lg text-sm ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  Download Logs
                </button>
                <button className={`px-3 py-1 rounded-lg text-sm ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  View Full Logs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Model Prediction Interface */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Model Prediction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Input Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Crop Type</label>
                <select 
                  className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  aria-label="Select crop type for prediction"
                  title="Choose the crop type to predict post-harvest losses"
                >
                  <option>Tomatoes</option>
                  <option>Potatoes</option>
                  <option>Apples</option>
                  <option>Bananas</option>
                  <option>Carrots</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Temperature (°C)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  defaultValue="20"
                  className="w-full"
                  aria-label="Set storage temperature in Celsius"
                  title="Adjust the storage temperature between 0°C and 40°C"
                />
                <div className="flex justify-between text-xs">
                  <span>0°C</span>
                  <span>20°C</span>
                  <span>40°C</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Humidity (%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="65"
                  className="w-full"
                  aria-label="Set storage humidity percentage"
                  title="Adjust the storage humidity between 0% and 100%"
                />
                <div className="flex justify-between text-xs">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Storage Type</label>
                <select 
                  className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  aria-label="Select storage type for prediction"
                  title="Choose the type of storage facility used for the crop"
                >
                  <option>Cold Storage</option>
                  <option>Controlled Atmosphere</option>
                  <option>Ambient Storage</option>
                  <option>Evaporative Cooling</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Harvest Method</label>
                <select 
                  className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  aria-label="Select harvest method for prediction"
                  title="Choose the method used to harvest the crop"
                >
                  <option>Manual</option>
                  <option>Semi-Mechanical</option>
                  <option>Fully Mechanical</option>
                </select>
              </div>
              
              <button className={`w-full py-2 rounded-lg ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}>
                Run Prediction
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Prediction Results</h3>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} h-full`}>
              <div className="text-center p-6">
                <div className="text-6xl mb-4">🔮</div>
                <p className="text-gray-500">Enter parameters and run prediction to see results</p>
              </div>
              
              {/* This would be shown after prediction is run */}
              {/*
              <div>
                <h4 className="font-medium mb-2">Predicted Loss Rate</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500">18.3%</div>
                  <p className="mt-1 text-sm text-gray-500">±2.5% margin of error</p>
                </div>
                
                <h4 className="font-medium mt-6 mb-2">Contributing Factors</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">High Temperature</span>
                    <span className="text-sm text-red-500">+5.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Suboptimal Storage</span>
                    <span className="text-sm text-red-500">+4.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Crop Sensitivity</span>
                    <span className="text-sm text-red-500">+3.5%</span>
                  </div>
                </div>
                
                <h4 className="font-medium mt-6 mb-2">Recommendations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Reduce storage temperature by 5°C</li>
                  <li>• Increase humidity to 85-90%</li>
                  <li>• Consider controlled atmosphere storage</li>
                </ul>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLflowDashboard;
