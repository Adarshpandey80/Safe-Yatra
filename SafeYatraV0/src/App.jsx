   
   // App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LiveMap from './components/LiveMap';
import SOSAlerts from './components/SOSAlerts';
import TouristManagement from './components/TouristManagement';
import RiskEngine from './components/RiskEngine';
import HealthWearables from './components/HealthWearables';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <LiveMap />;
      case 'sos':
        return <SOSAlerts />;
      case 'tourists':
        return <TouristManagement />;
      case 'risk':
        return <RiskEngine />;
      case 'health':
        return <HealthWearables />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className="p-6">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;