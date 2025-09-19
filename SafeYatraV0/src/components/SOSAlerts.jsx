import React, { useState } from 'react';
import { AlertTriangle, Play, Send, CheckCircle, Clock, MapPin, User } from 'lucide-react';

const SOSAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 'SOS-001',
      touristId: 'T-2847',
      name: 'John Smith',
      location: 'Kaziranga National Park',
      coordinates: '26.5775°N, 93.1742°E',
      timestamp: '2024-01-15 14:30:25',
      status: 'active',
      severity: 'high',
      description: 'Tourist reported wildlife encounter - elephant blocking path',
      hasRecording: true,
      recordingDuration: '2:45',
      blockchainVerified: true
    },
    {
      id: 'SOS-002',
      touristId: 'T-1923',
      name: 'Sarah Johnson',
      location: 'Shillong Peak',
      coordinates: '25.5788°N, 91.8933°E',
      timestamp: '2024-01-15 13:45:12',
      status: 'pending',
      severity: 'medium',
      description: 'Weather-related distress - heavy fog, lost visibility',
      hasRecording: true,
      recordingDuration: '1:30',
      blockchainVerified: true
    },
    {
      id: 'SOS-003',
      touristId: 'T-3401',
      name: 'Raj Patel',
      location: 'Majuli Island',
      coordinates: '27.0095°N, 94.2142°E',
      timestamp: '2024-01-15 12:20:08',
      status: 'resolved',
      severity: 'low',
      description: 'Medical assistance - minor injury during trek',
      hasRecording: false,
      recordingDuration: null,
      blockchainVerified: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">SOS Alerts Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and respond to emergency situations</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Filter Alerts
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">7</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">156</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Resolved Today</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">2.3 min</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Active SOS Requests</h3>
        </div>
        
        <div className="divide-y dark:divide-gray-700">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                selectedAlert === alert.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                    <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()} PRIORITY
                    </span>
                    {alert.blockchainVerified && (
                      <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {alert.id} - {alert.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{alert.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {alert.hasRecording && (
                        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                          <Play className="h-4 w-4" />
                          Play Recording ({alert.recordingDuration})
                        </button>
                      )}
                      
                      <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                        <Send className="h-4 w-4" />
                        Forward
                      </button>
                      
                      <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedAlert === alert.id && (
                <div className="mt-4 pt-4 border-t dark:border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-2">Tourist Details</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ID: {alert.touristId}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Coordinates: {alert.coordinates}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-2">Response Actions</h5>
                      <div className="space-y-2">
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm transition-colors">
                          Deploy Emergency Team
                        </button>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm transition-colors">
                          Contact Tourist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOSAlerts;