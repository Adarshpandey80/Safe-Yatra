// HealthWearables.jsx
import React, { useState } from 'react';
import { Heart, Watch, Wifi, Battery, AlertTriangle, Activity, TrendingUp } from 'lucide-react';

const HealthWearables = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const devices = [
    {
      id: 'DEV-001',
      touristName: 'John Smith',
      touristId: 'T-2847',
      deviceType: 'Smart Watch',
      brand: 'Apple Watch Series 9',
      batteryLevel: 78,
      connectionStatus: 'connected',
      lastSync: '2 mins ago',
      vitals: {
        heartRate: 95,
        steps: 8420,
        caloriesBurned: 312,
        sleepHours: 7.2
      },
      alerts: [
        { type: 'heart_rate', message: 'Elevated heart rate detected', severity: 'warning', time: '5 mins ago' }
      ]
    },
    {
      id: 'DEV-002',
      touristName: 'Sarah Johnson',
      touristId: 'T-1923',
      deviceType: 'Fitness Band',
      brand: 'Fitbit Charge 5',
      batteryLevel: 45,
      connectionStatus: 'connected',
      lastSync: '1 min ago',
      vitals: {
        heartRate: 72,
        steps: 12340,
        caloriesBurned: 485,
        sleepHours: 8.1
      },
      alerts: []
    },
    {
      id: 'DEV-003',
      touristName: 'Raj Patel',
      touristId: 'T-3401',
      deviceType: 'Smart Watch',
      brand: 'Samsung Galaxy Watch',
      batteryLevel: 15,
      connectionStatus: 'disconnected',
      lastSync: '45 mins ago',
      vitals: {
        heartRate: 0,
        steps: 0,
        caloriesBurned: 0,
        sleepHours: 0
      },
      alerts: [
        { type: 'fall_detection', message: 'Fall detected - no response', severity: 'critical', time: '35 mins ago' },
        { type: 'low_battery', message: 'Device battery critically low', severity: 'warning', time: '42 mins ago' }
      ]
    }
  ];

  const getConnectionColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 dark:text-green-400';
      case 'disconnected': return 'text-red-600 dark:text-red-400';
      default: return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getBatteryColor = (level) => {
    if (level <= 20) return 'text-red-600 dark:text-red-400';
    if (level <= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getHeartRateStatus = (rate) => {
    if (rate === 0) return { status: 'No Data', color: 'text-gray-500' };
    if (rate > 100) return { status: 'Elevated', color: 'text-red-600 dark:text-red-400' };
    if (rate < 60) return { status: 'Low', color: 'text-yellow-600 dark:text-yellow-400' };
    return { status: 'Normal', color: 'text-green-600 dark:text-green-400' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Health & Wearables</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor tourist health data from connected devices</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Device Settings
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Health Report
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Watch className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">1,847</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Connected Devices</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Wifi className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">96.3%</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Online Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Health Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">847</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Auto-SOS Triggers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Connected Devices</h3>
        </div>
        
        <div className="divide-y dark:divide-gray-700">
          {devices.map((device) => {
            const heartRateStatus = getHeartRateStatus(device.vitals.heartRate);
            
            return (
              <div 
                key={device.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      device.connectionStatus === 'connected' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <Watch className={`h-6 w-6 ${getConnectionColor(device.connectionStatus)}`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{device.touristName}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{device.touristId}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          device.connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                        }`} />
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{device.brand}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last sync: {device.lastSync}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Battery className={`h-4 w-4 ${getBatteryColor(device.batteryLevel)}`} />
                        <span className={`text-sm font-medium ${getBatteryColor(device.batteryLevel)}`}>
                          {device.batteryLevel}%
                        </span>
                      </div>
                      <p className={`text-xs ${getConnectionColor(device.connectionStatus)}`}>
                        {device.connectionStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vitals Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Heart Rate</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">
                        {device.vitals.heartRate || '--'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">bpm</span>
                    </div>
                    <p className={`text-xs ${heartRateStatus.color}`}>{heartRateStatus.status}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Steps</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">
                        {device.vitals.steps.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Calories</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">
                        {device.vitals.caloriesBurned}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">kcal</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sleep</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">
                        {device.vitals.sleepHours}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">hrs</span>
                    </div>
                  </div>
                </div>

                {/* Health Alerts */}
                {device.alerts.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Alerts</h5>
                    {device.alerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded-lg text-sm ${getAlertSeverityColor(alert.severity)}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{alert.message}</span>
                          <span className="text-xs opacity-75">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Monitoring Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Auto-SOS Configuration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Fall Detection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatic SOS on fall detection</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Heart Rate Monitoring</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alert on abnormal heart rate</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Inactivity Alert</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trigger after 30 minutes inactivity</p>
              </div>
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Health Trends</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Average Heart Rate</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">78</span>
                <span className="text-sm text-blue-700 dark:text-blue-300">bpm</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Daily Steps Average</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">9,247</span>
                <span className="text-sm text-green-700 dark:text-green-300">steps</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Sleep Quality</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">7.8</span>
                <span className="text-sm text-purple-700 dark:text-purple-300">hours avg</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthWearables;