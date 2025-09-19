// LiveMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Map, Filter, Users, AlertTriangle, Layers, Search, X, Maximize, Minimize, ZoomIn, ZoomOut } from 'lucide-react';

const LiveMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [mapLayer, setMapLayer] = useState('street');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);
  const mapRef = useRef(null);
  const fullscreenMapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [fullscreenMap, setFullscreenMap] = useState(null);

  // Tourist data
  const tourists = [
    { id: 'T001', name: 'John Smith', location: 'Kaziranga NP', risk: 'High', group: '4 people', lat: 26.5833, lng: 93.1667 },
    { id: 'T002', name: 'Maria Garcia', location: 'Shillong Peak', risk: 'Low', group: 'Solo', lat: 25.5744, lng: 91.8789 },
    { id: 'T003', name: 'Raj Patel', location: 'Majuli Island', risk: 'Medium', group: '2 people', lat: 26.9500, lng: 94.1667 },
    { id: 'T004', name: 'Chen Wei', location: 'Tawang', risk: 'High', group: '6 people', lat: 27.5833, lng: 91.8667 },
    { id: 'T005', name: 'Sarah Johnson', location: 'Guwahati', risk: 'Low', group: 'Solo', lat: 26.1445, lng: 91.7362 }
  ];

  // Filter tourists based on selected filter and search query
  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tourist.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'high-risk') return matchesSearch && tourist.risk === 'High';
    if (selectedFilter === 'groups') return matchesSearch && tourist.group !== 'Solo';
    if (selectedFilter === 'alerts') return matchesSearch && tourist.risk === 'High';
    
    return matchesSearch;
  });

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
        
        // Add tile layer based on selected map layer
        updateMapLayer(mapInstance, L, mapLayer);
        
        // Add tourist markers
        addTouristMarkers(mapInstance, L, filteredTourists);
        
        setMap(mapInstance);
      }
    };

    initMap();
  }, [map]);

  // Update map when layer changes
  useEffect(() => {
    if (map) {
      const updateLayer = async () => {
        const L = await import('leaflet');
        updateMapLayer(map, L, mapLayer);
      };
      updateLayer();
    }
  }, [mapLayer, map]);

  // Update markers when filter changes
  useEffect(() => {
    if (map) {
      const updateMarkers = async () => {
        const L = await import('leaflet');
        // Clear existing markers
        map.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
        // Add filtered markers
        addTouristMarkers(map, L, filteredTourists);
      };
      updateMarkers();
    }
  }, [filteredTourists, map]);

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
        
        // Add tile layer based on selected map layer
        updateMapLayer(fullMapInstance, L, mapLayer);
        
        // Add tourist markers
        addTouristMarkers(fullMapInstance, L, filteredTourists);
        
        setFullscreenMap(fullMapInstance);
      }
    };

    initFullscreenMap();
  }, [showFullscreenMap, fullscreenMap, mapLayer, filteredTourists]);

  const updateMapLayer = (mapInstance, L, layerType) => {
    // Remove existing tile layers
    mapInstance.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        mapInstance.removeLayer(layer);
      }
    });

    // Add new tile layer based on selection
    if (layerType === 'street') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
      }).addTo(mapInstance);
    } else if (layerType === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: ''
      }).addTo(mapInstance);
    } else if (layerType === 'heatmap') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
      }).addTo(mapInstance);
      
      // Add heatmap overlay (simulated with circles)
      filteredTourists.forEach(tourist => {
        const riskColor = getRiskColor(tourist.risk);
        L.circle([tourist.lat, tourist.lng], {
          color: riskColor,
          fillColor: riskColor,
          fillOpacity: 0.3,
          radius: tourist.risk === 'High' ? 30000 : tourist.risk === 'Medium' ? 20000 : 10000
        }).addTo(mapInstance);
      });
    }
  };

  const addTouristMarkers = (mapInstance, L, touristsData) => {
    touristsData.forEach(tourist => {
      const marker = L.marker([tourist.lat, tourist.lng])
        .addTo(mapInstance)
        .bindPopup(`
          <div class="p-2 min-w-[200px]">
            <h3 class="font-bold text-lg">${tourist.name}</h3>
            <p class="mt-1">ID: ${tourist.id}</p>
            <p class="mt-1">Location: ${tourist.location}</p>
            <p class="mt-1">Risk: <span style="color: ${getRiskColor(tourist.risk)}; font-weight: bold">${tourist.risk}</span></p>
            <p class="mt-1">Group: ${tourist.group}</p>
          </div>
        `);
      
      const riskColor = getRiskColor(tourist.risk);
      marker.setIcon(
        L.divIcon({
          className: 'custom-tourist-marker',
          html: `<div style="background-color: ${riskColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      );
    });
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return '#ef4444'; // red
    if (risk === 'Medium') return '#f59e0b'; // yellow
    return '#10b981'; // green
  };

  const getRiskColorClass = (risk) => {
    if (risk === 'High') return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
    if (risk === 'Medium') return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
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
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreenMap = () => {
    setShowFullscreenMap(false);
    document.body.style.overflow = 'auto';
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Live Map & Tracking</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time tourist positions and alerts</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="all">All Tourists</option>
                <option value="high-risk">High Risk</option>
                <option value="groups">Groups Only</option>
                <option value="alerts">Active Alerts</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select 
                value={mapLayer}
                onChange={(e) => setMapLayer(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="street">Street View</option>
                <option value="satellite">Satellite</option>
                <option value="heatmap">Risk Heatmap</option>
              </select>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Geo-fence Toggle
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
              Assign Response Team
            </button>

            <div className="ml-auto flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2">
              <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tourists..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="text-gray-500 dark:text-gray-400">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="h-[600px] relative">
            <div 
              ref={mapRef} 
              className="w-full h-full"
            />
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
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
                className="p-2 bg-white dark:bg-gray-800 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
              <button 
                onClick={openFullscreenMap}
                className="p-2 bg-white dark:bg-gray-800 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-medium"
              >
                Fullscreen
              </button>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">Moderate Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">High Risk</span>
                </div>
              </div>
            </div>

            {/* Live Stats Overlay */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{filteredTourists.length} tourists shown</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {filteredTourists.filter(t => t.risk === 'High').length} high risk alerts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tourist Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Tourists ({filteredTourists.length} shown)
            </h3>
            <div className="space-y-3">
              {filteredTourists.length > 0 ? (
                filteredTourists.map((tourist) => (
                  <div key={tourist.id} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{tourist.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{tourist.id} • {tourist.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColorClass(tourist.risk)}`}>
                        {tourist.risk}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tourist.group}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No tourists match your search criteria
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
                Send Area Alert
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
                Deploy Response Unit
              </button>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg transition-colors">
                Create Geo-fence
              </button>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition-colors">
                Export Location Data
              </button>
            </div>
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
                <Map className="h-5 w-5 text-blue-500" />
                Live Map - Full View
              </h2>
            </div>
            
            <div 
              ref={fullscreenMapRef} 
              className="w-full h-full"
              style={{ height: 'calc(100% - 73px)' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LiveMap;