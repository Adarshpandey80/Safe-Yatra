// RiskEngine.jsx
import React, { useState } from 'react';
import { Shield, AlertTriangle, Settings, TrendingUp, Activity, Zap, RefreshCw } from 'lucide-react';

const RiskEngine = () => {
  const [riskLevel, setRiskLevel] = useState('high');
  const [autoResponse, setAutoResponse] = useState(true);

  const riskFactors = [
    { name: 'Weather Conditions', level: 'High', value: 85, trend: 'up' },
    { name: 'Crowd Density', level: 'Medium', value: 65, trend: 'up' },
    { name: 'Time of Day', level: 'High', value: 90, trend: 'up' },
    { name: 'Historical Incidents', level: 'Low', value: 30, trend: 'down' },
    { name: 'Emergency Response Time', level: 'Medium', value: 55, trend: 'stable' },
    { name: 'Tourist Experience Level', level: 'High', value: 80, trend: 'up' }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-red-600 dark:text-red-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'Low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 dark:bg-red-900/30';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low': return 'bg-green-100 dark:bg-green-900/30';
      default: return 'bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Risk Engine</h1>
          <p className="text-gray-600 dark:text-gray-400">AI-powered risk assessment and prediction</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Recalculate Risk
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Engine Settings
          </button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">23</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">High-Risk Zones</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">156</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Prevented Incidents</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">94.7%</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Risk Factor Analysis</h3>
        
        <div className="space-y-4">
          {riskFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRiskBgColor(factor.level)}`}>
                  <span className={`text-sm font-semibold ${getRiskColor(factor.level)}`}>
                    {factor.level.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">{factor.name}</h4>
                  <p className={`text-sm ${getRiskColor(factor.level)}`}>{factor.level} Risk</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      factor.level === 'High' ? 'bg-red-500' :
                      factor.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  {getTrendIcon(factor.trend)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">{factor.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engine Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Engine Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Auto Response System</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatically trigger safety protocols</p>
              </div>
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  autoResponse ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setAutoResponse(!autoResponse)}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  autoResponse ? 'right-1' : 'left-1'
                }`} />
              </div>
            </div>

            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Risk Sensitivity</h4>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Low</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: '75%' }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">High</span>
              </div>
            </div>

            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Alert Threshold</h4>
              <select 
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="low">Low Risk (80% confidence)</option>
                <option value="medium">Medium Risk (65% confidence)</option>
                <option value="high">High Risk (50% confidence)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Prediction Accuracy</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Incident Prediction</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">92.3%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '92.3%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">False Positive Rate</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">5.2%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-yellow-500" style={{ width: '5.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Response Time Prediction</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">87.6%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: '87.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tourist Behavior Analysis</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">95.1%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: '95.1%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex-1">
          Run Risk Simulation
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex-1">
          Export Risk Data
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors flex-1">
          Train AI Model
        </button>
      </div>
    </div>
  );
};

export default RiskEngine;