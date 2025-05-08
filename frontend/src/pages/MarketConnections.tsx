import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Mock data for market connections
const marketOpportunities = [
  {
    id: 'opp-1',
    buyer: 'FreshMart Supermarkets',
    cropType: 'Tomatoes',
    quantity: '500 kg',
    price: '$2.30/kg',
    location: 'Urban',
    distance: '15 km',
    deadline: '3 days',
    requirements: 'Grade A, Organic certification preferred',
    contactPerson: 'Sarah Johnson',
    contactEmail: 'purchasing@freshmart.com',
    type: 'retail'
  },
  {
    id: 'opp-2',
    buyer: 'GreenLeaf Restaurants',
    cropType: 'Mixed Vegetables',
    quantity: '200 kg',
    price: '$2.80/kg',
    location: 'Urban',
    distance: '8 km',
    deadline: '2 days',
    requirements: 'Fresh, locally grown',
    contactPerson: 'Michael Chen',
    contactEmail: 'chef@greenleaf.com',
    type: 'restaurant'
  },
  {
    id: 'opp-3',
    buyer: 'HarvestCo Processing',
    cropType: 'Potatoes',
    quantity: '2000 kg',
    price: '$0.95/kg',
    location: 'Rural',
    distance: '35 km',
    deadline: '7 days',
    requirements: 'Minimum size 5cm diameter',
    contactPerson: 'Robert Miller',
    contactEmail: 'procurement@harvestco.com',
    type: 'processor'
  },
  {
    id: 'opp-4',
    buyer: 'FarmFresh Co-op',
    cropType: 'Various Fruits',
    quantity: '300 kg',
    price: 'Market rate + 5%',
    location: 'Semi-urban',
    distance: '20 km',
    deadline: '5 days',
    requirements: 'Community supported agriculture',
    contactPerson: 'Lisa Wong',
    contactEmail: 'members@farmfresh.org',
    type: 'cooperative'
  },
  {
    id: 'opp-5',
    buyer: 'EcoJuice Company',
    cropType: 'Apples (Seconds)',
    quantity: '800 kg',
    price: '$0.75/kg',
    location: 'Urban',
    distance: '12 km',
    deadline: '4 days',
    requirements: 'Cosmetically imperfect but sound fruit accepted',
    contactPerson: 'David Smith',
    contactEmail: 'supply@ecojuice.com',
    type: 'processor'
  },
  {
    id: 'opp-6',
    buyer: 'School District #5',
    cropType: 'Various Vegetables',
    quantity: '450 kg',
    price: 'Fixed contract',
    location: 'Urban',
    distance: '10 km',
    deadline: '10 days',
    requirements: 'Food safety certification required',
    contactPerson: 'Patricia Garcia',
    contactEmail: 'nutrition@sd5.edu',
    type: 'institutional'
  },
];

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 'trans-1',
    date: '2025-05-05',
    buyer: 'FreshMart Supermarkets',
    cropType: 'Tomatoes',
    quantity: '450 kg',
    totalValue: '$1,035',
    status: 'Completed'
  },
  {
    id: 'trans-2',
    date: '2025-05-02',
    buyer: 'GreenLeaf Restaurants',
    cropType: 'Mixed Vegetables',
    quantity: '180 kg',
    totalValue: '$504',
    status: 'Completed'
  },
  {
    id: 'trans-3',
    date: '2025-04-28',
    buyer: 'EcoJuice Company',
    cropType: 'Apples',
    quantity: '750 kg',
    totalValue: '$562.50',
    status: 'Completed'
  },
];

// Mock data for market price trends
const marketPriceTrends = [
  { crop: 'Tomatoes', currentPrice: 2.30, lastWeek: 2.25, lastMonth: 2.40 },
  { crop: 'Potatoes', currentPrice: 0.95, lastWeek: 0.90, lastMonth: 0.85 },
  { crop: 'Apples', currentPrice: 1.75, lastWeek: 1.80, lastMonth: 1.90 },
  { crop: 'Bananas', currentPrice: 1.20, lastWeek: 1.15, lastMonth: 1.10 },
  { crop: 'Carrots', currentPrice: 1.05, lastWeek: 1.10, lastMonth: 1.15 },
];

const MarketConnections = () => {
  const { darkMode } = useTheme();
  const [cropFilter, setCropFilter] = useState('all');
  const [buyerTypeFilter, setBuyerTypeFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  
  // Filter market opportunities based on selections
  const filteredOpportunities = marketOpportunities.filter(opp => {
    if (cropFilter !== 'all' && !opp.cropType.toLowerCase().includes(cropFilter.toLowerCase())) {
      return false;
    }
    
    if (buyerTypeFilter !== 'all' && opp.type !== buyerTypeFilter) {
      return false;
    }
    
    if (distanceFilter !== 'all') {
      const distance = parseInt(opp.distance);
      if (distanceFilter === 'near' && distance > 15) return false;
      if (distanceFilter === 'medium' && (distance <= 15 || distance > 30)) return false;
      if (distanceFilter === 'far' && distance <= 30) return false;
    }
    
    return true;
  });
  
  const handleContactClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowContactModal(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Market Connections</h1>
        
        <button className={`px-4 py-2 rounded-lg ${
          darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } text-white`}>
          List Your Produce
        </button>
      </div>
      
      {/* Filter Options */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Crop Type</label>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Crops</option>
              <option value="tomatoes">Tomatoes</option>
              <option value="potatoes">Potatoes</option>
              <option value="apples">Apples</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Buyer Type</label>
            <select
              value={buyerTypeFilter}
              onChange={(e) => setBuyerTypeFilter(e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Buyers</option>
              <option value="retail">Retail</option>
              <option value="restaurant">Restaurants</option>
              <option value="processor">Processors</option>
              <option value="cooperative">Cooperatives</option>
              <option value="institutional">Institutional</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Distance</label>
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="all">Any Distance</option>
              <option value="near">Nearby (&lt; 15 km)</option>
              <option value="medium">Medium (15-30 km)</option>
              <option value="far">Far (&gt; 30 km)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Market Opportunities */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Market Opportunities</h2>
        
        {filteredOpportunities.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No market opportunities match your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpportunities.map(opportunity => (
              <div 
                key={opportunity.id} 
                className={`p-5 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">{opportunity.buyer}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                  </span>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Crop:</span>
                    <span className="text-sm font-medium">{opportunity.cropType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Quantity:</span>
                    <span className="text-sm">{opportunity.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price:</span>
                    <span className="text-sm">{opportunity.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Location:</span>
                    <span className="text-sm">{opportunity.location} ({opportunity.distance})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Deadline:</span>
                    <span className="text-sm">{opportunity.deadline}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-500">Requirements:</p>
                  <p className="text-sm mt-1">{opportunity.requirements}</p>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => handleContactClick(opportunity)}
                    className={`flex-1 py-2 rounded-lg text-center ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    Contact Buyer
                  </button>
                  <button className={`flex-1 py-2 rounded-lg text-center border ${
                    darkMode 
                      ? 'border-blue-600 text-blue-400 hover:bg-blue-900/30' 
                      : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                  }`}>
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Market Price Trends */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Market Price Trends</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <th className="px-4 py-2 text-left">Crop</th>
                <th className="px-4 py-2 text-left">Current Price ($/kg)</th>
                <th className="px-4 py-2 text-left">Last Week</th>
                <th className="px-4 py-2 text-left">Last Month</th>
                <th className="px-4 py-2 text-left">Trend</th>
              </tr>
            </thead>
            <tbody>
              {marketPriceTrends.map(trend => {
                const weekChange = ((trend.currentPrice - trend.lastWeek) / trend.lastWeek * 100).toFixed(1);
                const monthChange = ((trend.currentPrice - trend.lastMonth) / trend.lastMonth * 100).toFixed(1);
                const isPositiveWeek = parseFloat(weekChange) > 0;
                const isPositiveMonth = parseFloat(monthChange) > 0;
                
                return (
                  <tr key={trend.crop} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <td className="px-4 py-3">{trend.crop}</td>
                    <td className="px-4 py-3">${trend.currentPrice.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={isPositiveWeek ? 'text-green-500' : 'text-red-500'}>
                        {isPositiveWeek ? '↑' : '↓'} {weekChange}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={isPositiveMonth ? 'text-green-500' : 'text-red-500'}>
                        {isPositiveMonth ? '↑' : '↓'} {monthChange}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-6 w-20 bg-gray-200 rounded-sm overflow-hidden">
                        <div 
                          className={`h-full ${isPositiveMonth ? 'bg-green-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.abs(parseFloat(monthChange)) * 5}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Buyer</th>
                <th className="px-4 py-2 text-left">Crop</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total Value</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(transaction => (
                <tr key={transaction.id} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">{transaction.buyer}</td>
                  <td className="px-4 py-3">{transaction.cropType}</td>
                  <td className="px-4 py-3">{transaction.quantity}</td>
                  <td className="px-4 py-3">{transaction.totalValue}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Contact {selectedOpportunity.buyer}</h2>
            
            <div className="mb-4">
              <p className="text-sm">
                <span className="text-gray-500">Contact Person:</span> {selectedOpportunity.contactPerson}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Email:</span> {selectedOpportunity.contactEmail}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Message</label>
              <textarea 
                rows={4} 
                className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                placeholder="Introduce yourself and your produce..."
              ></textarea>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className={`flex-1 py-2 rounded-lg text-center ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                Send Message
              </button>
              <button 
                onClick={() => setShowContactModal(false)}
                className={`flex-1 py-2 rounded-lg text-center border ${
                  darkMode 
                    ? 'border-gray-600 text-gray-400 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketConnections;
