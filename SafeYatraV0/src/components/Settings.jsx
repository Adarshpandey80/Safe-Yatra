// Settings.jsx
import React, { useState } from 'react';
import { Save, RefreshCw, Download, Upload, Shield, Bell, Users, Globe } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      alerts: true
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      locationTracking: true
    },
    system: {
      autoUpdate: true,
      backup: true,
      performanceMode: false
    }
  });

  const handleToggle = (category, field) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }));
  };

  const settingSections = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Manage how you receive alerts and updates',
      settings: [
        { id: 'email', label: 'Email Notifications', description: 'Receive important updates via email' },
        { id: 'push', label: 'Push Notifications', description: 'Get instant alerts on your device' },
        { id: 'sms', label: 'SMS Alerts', description: 'Critical alerts via text message' },
        { id: 'alerts', label: 'Emergency Alerts', description: 'High-priority emergency notifications' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      icon: Shield,
      description: 'Control your data collection preferences',
      settings: [
        { id: 'dataCollection', label: 'Data Collection', description: 'Allow collection of usage data' },
        { id: 'analytics', label: 'Analytics', description: 'Help us improve by sharing analytics' },
        { id: 'locationTracking', label: 'Location Tracking', description: 'Enable GPS tracking for safety' }
      ]
    },
    {
      id: 'system',
      title: 'System Settings',
      icon: Users,
      description: 'Configure system preferences and performance',
      settings: [
        { id: 'autoUpdate', label: 'Auto Update', description: 'Automatically install updates' },
        { id: 'backup', label: 'Auto Backup', description: 'Backup data automatically' },
        { id: 'performanceMode', label: 'Performance Mode', description: 'Optimize for low-resource devices' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your system preferences and configuration</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
          <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <RefreshCw className="h-4 w-4" />
            Reset to Default
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">{setting.label}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                  </div>
                  
                  <div 
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                      settings[section.id][setting.id] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => handleToggle(section.id, setting.id)}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings[section.id][setting.id] ? 'right-1' : 'left-1'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Data Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Export or backup your system data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border dark:border-gray-700 rounded-lg text-center">
            <Download className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Export Data</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Download all your data in JSON format</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
              Export Now
            </button>
          </div>

          <div className="p-6 border dark:border-gray-700 rounded-lg text-center">
            <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Import Data</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Restore from a previous backup</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
              Import Data
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">System Information</h3>
            <p className="text-gray-600 dark:text-gray-400">Current system status and version</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">System Version</span>
              <span className="font-medium text-gray-800 dark:text-white">v2.4.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
              <span className="font-medium text-gray-800 dark:text-white">Jan 12, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Database Size</span>
              <span className="font-medium text-gray-800 dark:text-white">2.4 GB</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Active Users</span>
              <span className="font-medium text-gray-800 dark:text-white">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Server Status</span>
              <span className="font-medium text-green-600 dark:text-green-400">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="font-medium text-gray-800 dark:text-white">99.98%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dangerous Actions */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Reset All Data</h4>
              <p className="text-red-600 dark:text-red-300 text-sm">Permanently delete all data and settings</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
              Reset Data
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Delete Account</h4>
              <p className="text-red-600 dark:text-red-300 text-sm">Permanently delete your account</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;