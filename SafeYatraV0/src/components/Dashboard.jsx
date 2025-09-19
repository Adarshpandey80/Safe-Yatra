// Dashboard.jsx
import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Activity,
  Clock,
  Zap
} from 'lucide-react';
import StatCard from './common/StatCard';
import AlertsFeed from './common/AlertsFeed';
import RiskHeatmapPreview from './common/RiskHeatmapPreview';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Active Tourists', 
      value: '2,847', 
      change: '+12%', 
      trend: 'up', 
      icon: Users,
      color: 'blue'
    },
    { 
      title: 'Ongoing SOS Alerts', 
      value: '7', 
      change: '-3%', 
      trend: 'down', 
      icon: AlertTriangle,
      color: 'red'
    },
    { 
      title: 'High-Risk Zones', 
      value: '23', 
      change: '+8%', 
      trend: 'up', 
      icon: MapPin,
      color: 'yellow'
    },
    { 
      title: 'Response Units Available', 
      value: '156', 
      change: '+2%', 
      trend: 'up', 
      icon: Shield,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time monitoring and control center</p>
        </div>
        
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Mass Alert
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Alerts Feed */}
        <div className="xl:col-span-2">
          <AlertsFeed />
        </div>
        
        {/* Risk Heatmap Preview */}
        <div>
          <RiskHeatmapPreview />
        </div>
      </div>

      {/* Activity Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
          <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            { time: '2 min ago', event: 'High-risk alert triggered in Guwahati', type: 'warning' },
            { time: '5 min ago', event: 'Tourist group successfully evacuated', type: 'success' },
            { time: '12 min ago', event: 'New tourist registered via blockchain ID', type: 'info' },
            { time: '18 min ago', event: 'Response unit deployed to Shillong', type: 'info' },
            { time: '25 min ago', event: 'Health alert: Abnormal vitals detected', type: 'warning' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'warning' ? 'bg-yellow-500' : 
                activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-gray-800 dark:text-white">{activity.event}</p>
                <p className="text-sm text-black -500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </p>
              </div>
              <Activity className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;