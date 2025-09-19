// RiskHeatmapPreview.jsx
import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, MapPin, AlertTriangle, ZoomIn, ZoomOut, X, Maximize, Minimize } from 'lucide-react';

const RiskHeatmapPreview = () => {
  const mapRef = useRef(null);
  const fullscreenMapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [fullscreenMap, setFullscreenMap] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);

  const riskZones = [
    { 
      location: 'Kaziranga NP', 
      risk: 85, 
      trend: 'up',
      lat: 26.5833, 
      lng: 93.1667,
      details: 'High flood risk due to Brahmaputra river overflow'
    },
    { 
      location: 'Tawang', 
      risk: 72, 
      trend: 'down',
      lat: 27.5833, 
      lng: 91.8667,
      details: 'Landslide risk in monsoon season'
    },
    { 
      location: 'Majuli Island', 
      risk: 68, 
      trend: 'up',
      lat: 26.9500, 
      lng: 94.1667,
      details: 'Erosion and flood threats to the river island'
    },
    { 
      location: 'Shillong', 
      risk: 45, 
      trend: 'stable',
      lat: 25.5744, 
      lng: 91.8789,
      details: 'Moderate earthquake risk in the region'
    }
  ];

  const getRiskColor = (risk) => {
    if (risk >= 80) return '#ef4444'; // red
    if (risk >= 60) return '#f59e0b'; // yellow
    return '#10b981'; // green
  };

  const getRiskColorClass = (risk) => {
    if (risk >= 80) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
    if (risk >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
  };

  // Initialize the preview map
  useEffect(() => {
    const initMap = async () => {
      if (typeof window !== 'undefined' && mapRef.current && !map) {
        const L = await import('leaflet');
        
        // Fix for default markers in Leaflet with Webpack
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const mapInstance = L.map(mapRef.current).setView([26.2006, 92.9376], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        addRiskDataToMap(mapInstance, L);
        setMap(mapInstance);
      }
    };

    initMap();
  }, [map]);

  // Initialize the fullscreen map when needed
  useEffect(() => {
    const initFullscreenMap = async () => {
      if (typeof window !== 'undefined' && fullscreenMapRef.current && showFullscreenMap && !fullscreenMap) {
        const L = await import('leaflet');
        
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const fullMapInstance = L.map(fullscreenMapRef.current).setView([26.2006, 92.9376], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(fullMapInstance);

        addRiskDataToMap(fullMapInstance, L);
        setFullscreenMap(fullMapInstance);
      }
    };

    initFullscreenMap();
  }, [showFullscreenMap, fullscreenMap]);

  const addRiskDataToMap = (mapInstance, L) => {
    // Clear existing layers
    mapInstance.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        mapInstance.removeLayer(layer);
      }
    });

    // Add risk zone markers
    riskZones.forEach(zone => {
      const marker = L.marker([zone.lat, zone.lng])
        .addTo(mapInstance)
        .bindPopup(`
          <div class="p-2 min-w-[200px]">
            <h3 class="font-bold text-lg">${zone.location}</h3>
            <p class="mt-1">Risk Level: <span style="color: ${getRiskColor(zone.risk)}; font-weight: bold">${zone.risk}%</span></p>
            <p class="text-sm mt-2">${zone.details}</p>
            <p class="text-xs mt-2 text-gray-500">Trend: ${zone.trend}</p>
          </div>
        `);
      
      const riskColor = getRiskColor(zone.risk);
      marker.setIcon(
        L.divIcon({
          className: 'custom-risk-marker',
          html: `<div style="background-color: ${riskColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      );
    });

    // Add risk heatmap layer
    riskZones.forEach(zone => {
      const riskColor = getRiskColor(zone.risk);
      L.circle([zone.lat, zone.lng], {
        color: riskColor,
        fillColor: riskColor,
        fillOpacity: 0.2,
        radius: zone.risk * 200
      }).addTo(mapInstance);
    });
  };

  const zoomIn = () => {
    if (map) map.zoomIn();
    if (fullscreenMap) fullscreenMap.zoomIn();
  };

  const zoomOut = () => {
    if (map) map.zoomOut();
    if (fullscreenMap) fullscreenMap.zoomOut();
  };

  const toggleFullscreenView = () => {
    if (map) {
      if (isFullscreen) {
        map.setView([26.2006, 92.9376], 7);
      } else {
        map.setView([26.2006, 92.9376], 8);
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const openFullscreenMap = () => {
    setShowFullscreenMap(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeFullscreenMap = () => {
    setShowFullscreenMap(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Cleanup maps on component unmount
  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
      }
      if (fullscreenMap) {
        fullscreenMap.remove();
      }
    };
  }, [map, fullscreenMap]);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Risk Heatmap</h3>
          </div>
          <button 
            onClick={openFullscreenMap}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
          >
            <Maximize className="h-4 w-4" />
            View Full Map
          </button>
        </div>

        {/* Leaflet Map Container */}
        <div className="mb-6 h-64 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div 
            ref={mapRef} 
            className="w-full h-full"
          />
          
          {/* Map Controls */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button 
              onClick={zoomIn}
              className="p-2 bg-white dark:bg-gray-800 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button 
              onClick={zoomOut}
              className="p-2 bg-white dark:bg-gray-800 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button 
              onClick={toggleFullscreenView}
              className="p-2 bg-white dark:bg-gray-800 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-medium"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
          
          {/* Map Legend */}
          <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 p-2 rounded shadow-md text-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="dark:text-white">Low Risk</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="dark:text-white">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="dark:text-white">High Risk</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {riskZones.map((zone) => (
            <div key={zone.location} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-800 dark:text-white font-medium">{zone.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${getRiskColorClass(zone.risk)}`}>
                  {zone.risk}%
                </span>
                <TrendingUp className={`h-3 w-3 ${
                  zone.trend === 'up' ? 'text-red-500' : 
                  zone.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
              3 zones above critical threshold
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {showFullscreenMap && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button 
                onClick={zoomIn}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button 
                onClick={zoomOut}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button 
                onClick={closeFullscreenMap}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close fullscreen map"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Risk Heatmap - Full View
              </h2>
            </div>
            
            <div 
              ref={fullscreenMapRef} 
              className="w-full h-full"
              style={{ height: 'calc(100% - 73px)' }}
            />
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded shadow-md text-sm z-10">
              <h3 className="font-medium mb-2 dark:text-white">Risk Legend</h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="dark:text-white">Low Risk (0-59%)</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="dark:text-white">Medium Risk (60-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="dark:text-white">High Risk (80-100%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RiskHeatmapPreview;