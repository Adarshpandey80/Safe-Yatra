// Reports.jsx
import React, { useState } from 'react';
import { BarChart3, Download, Share, RefreshCw, Calendar, FileText, TrendingUp, Users } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedReport, setSelectedReport] = useState('incident');

  const reportTypes = [
    { id: 'incident', name: 'Incident Reports', icon: FileText },
    { id: 'tourist', name: 'Tourist Flow Analysis', icon: Users },
    { id: 'risk', name: 'Risk Assessment Reports', icon: TrendingUp },
    { id: 'response', name: 'Response Time Analysis', icon: BarChart3 }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      name: 'Weekly Incident Summary',
      type: 'Incident Report',
      period: 'Jan 8-14, 2024',
      generated: '2 hours ago',
      size: '2.4 MB',
      status: 'Ready'
    },
    {
      id: 'RPT-002',
      name: 'Tourist Flow Heatmap',
      type: 'Analytics Report',
      period: 'December 2023',
      generated: '1 day ago',
      size: '5.1 MB',
      status: 'Ready'
    },
    {
      id: 'RPT-003',
      name: 'Emergency Response Analysis',
      type: 'Performance Report',
      period: 'Q4 2023',
      generated: '3 days ago',
      size: '3.8 MB',
      status: 'Processing'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and analyze safety reports</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            New Report
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div 
              key={report.id}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                selectedReport === report.id 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm hover:shadow-md'
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${
                  selectedReport === report.id 
                    ? 'bg-blue-600' 
                    : 'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    selectedReport === report.id ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{report.name}</h3>
              <p className={`text-sm ${
                selectedReport === report.id ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
              }`}>
                Generate detailed analysis and insights
              </p>
            </div>
          );
        })}
      </div>

      {/* Report Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Period
            </label>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-white">Jan 1 - Jan 14, 2024</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
              <option value="json">JSON Data</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </button>
          <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Share className="h-4 w-4" />
            Share Template
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Reports</h3>
        </div>
        
        <div className="divide-y dark:divide-gray-700">
          {recentReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{report.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{report.id} • {report.type}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Ready' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {report.status}
                  </span>
                  
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <Share className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Period:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{report.period}</span>
                </div>
                
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Generated:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{report.generated}</span>
                </div>
                
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Size:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{report.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">247</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reports Generated</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">1.2K</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Downloads</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">84</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Report Subscribers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;