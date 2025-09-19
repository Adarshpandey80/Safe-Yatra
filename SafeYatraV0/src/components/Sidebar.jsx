// Sidebar.jsx
import React from 'react';
import { 
  Home, 
  Map, 
  AlertTriangle, 
  Users, 
  Brain, 
  Heart, 
  BarChart3, 
  Settings,
  ChevronLeft,
  Shield,
  AlertCircle
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'map', label: 'Live Map & Tracking', icon: Map },
    { id: 'sos', label: 'SOS Alerts', icon: AlertTriangle },
    { id: 'tourists', label: 'Tourist Management', icon: Users },
    { id: 'risk', label: 'Predictive Risk Engine', icon: Brain },
    { id: 'health', label: 'Health & Wearables', icon: Heart },
    { id: 'efir', label: 'E-FIR ', icon: AlertCircle },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Users', icon: Settings }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} z-50`}>
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        {isOpen && (
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />

            <span className="text-xl font-bold text-gray-800 dark:text-white">AuthorityHub</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform ${!isOpen && 'rotate-180'}`} />
        </button>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;