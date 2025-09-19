// AlertsFeed.jsx
import React from 'react';
import { AlertTriangle, Clock, MapPin, Phone } from 'lucide-react';

const AlertsFeed = () => {
  const alerts = [
    {
      id: 'SOS-001',
      location: 'Kaziranga National Park',
      time: '3 minutes ago',
      severity: 'high',
      description: 'Tourist reported wildlife encounter',
      coordinates: '26.5775°N, 93.1742°E'
    },
    {
      id: 'SOS-002', 
      location: 'Shillong Peak',
      time: '8 minutes ago',
      severity: 'medium',
      description: 'Weather-related distress call',
      coordinates: '25.5788°N, 91.8933°E'
    },
    {
      id: 'SOS-003',
      location: 'Majuli Island',
      time: '15 minutes ago',
      severity: 'low',
      description: 'Medical assistance requested',
      coordinates: '27.0095°N, 94.2142°E'
    },
    {
      id: 'SOS-004',
      location: 'Tawang Monastery',
      time: '22 minutes ago',
      severity: 'high',
      description: 'Tourist lost contact',
      coordinates: '27.5844°N, 91.8650°E'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Alerts Feed</h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Last 10 incidents</span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{alert.id}</span>
                </div>
                
                <p className="text-gray-800 dark:text-white font-medium mb-2">{alert.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
              
              <button className="ml-4 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
          View All Alerts →
        </button>
      </div>
    </div>
  );
};

export default AlertsFeed;