// TouristManagement.jsx
import React, { useState } from 'react';
import { Search, User, FileText, Ban, Shield, Eye, Download, CheckCircle } from 'lucide-react';

const TouristManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTourist, setSelectedTourist] = useState(null);

  const tourists = [
    {
      id: 'T-2847',
      name: 'John Smith',
      passport: 'US123456789',
      blockchainId: '0x7f3c...8a92',
      country: 'United States',
      phone: '+1-555-0123',
      email: 'john.smith@email.com',
      status: 'active',
      riskScore: 85,
      currentLocation: 'Kaziranga National Park',
      entryDate: '2024-01-10',
      plannedExit: '2024-01-20',
      alertsCount: 3,
      verified: true
    },
    {
      id: 'T-1923',
      name: 'Sarah Johnson',
      passport: 'CA987654321',
      blockchainId: '0xa2b7...4f1e',
      country: 'Canada',
      phone: '+1-416-555-0789',
      email: 'sarah.j@email.com',
      status: 'active',
      riskScore: 42,
      currentLocation: 'Shillong Peak',
      entryDate: '2024-01-12',
      plannedExit: '2024-01-25',
      alertsCount: 1,
      verified: true
    },
    {
      id: 'T-3401',
      name: 'Raj Patel',
      passport: 'IN456789123',
      blockchainId: '0x9e4a...6c3d',
      country: 'India',
      phone: '+91-98765-43210',
      email: 'raj.patel@email.com',
      status: 'blacklisted',
      riskScore: 95,
      currentLocation: 'Unknown',
      entryDate: '2024-01-08',
      plannedExit: '2024-01-18',
      alertsCount: 7,
      verified: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'blacklisted': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'inactive': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-red-600 dark:text-red-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const filteredTourists = tourists.filter(tourist => 
    tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tourist.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tourist.passport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tourist Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Search, verify, and manage tourist profiles</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Export Data
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Bulk Verify
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Tourist ID, Name, or Passport..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
            Advanced Search
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">2,847</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Tourists</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">2,693</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Ban className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">23</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Blacklisted</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">131</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">High Risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tourist List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tourist Registry</h3>
        </div>
        
        <div className="divide-y dark:divide-gray-700">
          {filteredTourists.map((tourist) => (
            <div 
              key={tourist.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                    tourist.verified ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {tourist.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{tourist.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tourist.status)}`}>
                        {tourist.status.toUpperCase()}
                      </span>
                      {tourist.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <p><span className="font-medium">ID:</span> {tourist.id}</p>
                        <p><span className="font-medium">Passport:</span> {tourist.passport}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Country:</span> {tourist.country}</p>
                        <p><span className="font-medium">Phone:</span> {tourist.phone}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Location:</span> {tourist.currentLocation}</p>
                        <p><span className="font-medium">Entry:</span> {tourist.entryDate}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Risk Score:</span> 
                          <span className={`font-bold ${getRiskColor(tourist.riskScore)}`}> {tourist.riskScore}%</span>
                        </p>
                        <p><span className="font-medium">Alerts:</span> {tourist.alertsCount}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        Blockchain ID: {tourist.blockchainId}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View Details">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Verify Identity">
                    <Shield className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Download Report">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Blacklist">
                    <Ban className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain Verification Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Blockchain Verification Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">94.6%</div>
            <div className="text-gray-600 dark:text-gray-400">Verification Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2,693</div>
            <div className="text-gray-600 dark:text-gray-400">Verified Identities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">154</div>
            <div className="text-gray-600 dark:text-gray-400">Pending Verification</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristManagement;