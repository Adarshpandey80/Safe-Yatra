import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Ambulance, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Map,
  Users,
  FileText
} from 'lucide-react';

const EFIRSection = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedIncident, setExpandedIncident] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [responseTeams, setResponseTeams] = useState([
    { id: 'RT-007', status: 'Available', members: ['Dr. Rajesh Kumar', 'Paramedic Anita Sharma', 'Driver Mohan'], location: 'Guwahati Base' },
    { id: 'RT-012', status: 'Available', members: ['Paramedic Sunil Das', 'Driver Ramesh'], location: 'Shillong Base' },
    { id: 'RT-015', status: 'On Break', members: ['Dr. Priya Singh', 'Nurse Arjun Mehta'], location: 'Kaziranga Base' }
  ]);

  // Dummy incident data
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-001',
      type: 'Medical Emergency',
      severity: 'Critical',
      status: 'In Progress',
      location: 'Kaziranga National Park, Zone 4',
      timestamp: '2024-01-15 14:30:25',
      coordinates: { lat: 26.5833, lng: 93.1667 },
      tourist: {
        name: 'John Smith',
        id: 'T001',
        nationality: 'USA',
        age: 45,
        phone: '+1-555-0123',
        email: 'john.smith@email.com',
        bloodType: 'O+',
        allergies: 'Peanuts, Penicillin'
      },
      description: 'Tourist experiencing chest pain and difficulty breathing. Suspected heart attack.',
      responseTeam: {
        assigned: true,
        teamId: 'RT-007',
        members: ['Dr. Rajesh Kumar', 'Paramedic Anita Sharma', 'Driver Mohan'],
        eta: '8 minutes',
        status: 'En Route'
      },
      updates: [
        {
          timestamp: '2024-01-15 14:32:10',
          message: 'First responder notified and dispatched',
          officer: 'Control Room Operator'
        },
        {
          timestamp: '2024-01-15 14:35:45',
          message: 'Ambulance en route to location',
          officer: 'Dispatch Center'
        }
      ]
    },
    {
      id: 'INC-002',
      type: 'Wildlife Encounter',
      severity: 'High',
      status: 'Pending',
      location: 'Manas National Park, Elephant Trail',
      timestamp: '2024-01-15 13:15:40',
      coordinates: { lat: 26.7167, lng: 91.0167 },
      tourist: {
        name: 'Maria Garcia',
        id: 'T045',
        nationality: 'Spain',
        age: 32,
        phone: '+34-912-3456',
        email: 'maria.garcia@email.com',
        bloodType: 'A-',
        allergies: 'None'
      },
      description: 'Tourist group encountered wild elephant. One tourist sustained minor injuries while retreating.',
      responseTeam: {
        assigned: false,
        teamId: null,
        members: [],
        eta: 'Not assigned',
        status: 'Awaiting Assignment'
      },
      updates: [
        {
          timestamp: '2024-01-15 13:16:20',
          message: 'Incident reported via SOS button',
          officer: 'Automated System'
        }
      ]
    },
    {
      id: 'INC-003',
      type: 'Vehicle Accident',
      severity: 'Medium',
      status: 'Resolved',
      location: 'Shillong-Guwahati Highway, KM 42',
      timestamp: '2024-01-15 11:20:15',
      coordinates: { lat: 26.1445, lng: 91.7362 },
      tourist: {
        name: 'Chen Wei',
        id: 'T089',
        nationality: 'China',
        age: 28,
        phone: '+86-138-0013',
        email: 'chen.wei@email.com',
        bloodType: 'B+',
        allergies: 'Shellfish'
      },
      description: 'Tour vehicle skidded off road during heavy rain. Minor injuries reported.',
      responseTeam: {
        assigned: true,
        teamId: 'RT-012',
        members: ['Paramedic Sunil Das', 'Driver Ramesh'],
        eta: 'Arrived',
        status: 'Treatment Complete'
      },
      updates: [
        {
          timestamp: '2024-01-15 11:25:30',
          message: 'Response team dispatched',
          officer: 'Dispatch Center'
        },
        {
          timestamp: '2024-01-15 11:45:15',
          message: 'Team arrived at scene. Treating minor injuries',
          officer: 'Paramedic Sunil Das'
        },
        {
          timestamp: '2024-01-15 12:30:00',
          message: 'Incident resolved. Tourists transported to safety',
          officer: 'Team Leader'
        }
      ]
    }
  ]);

  // Filter incidents based on active filter and search query
  const filteredIncidents = incidents.filter(incident => {
    const matchesFilter = activeFilter === 'all' || incident.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Count incidents by status for statistics
  const incidentStats = {
    active: incidents.filter(i => i.status === 'In Progress').length,
    pending: incidents.filter(i => i.status === 'Pending').length,
    resolved: incidents.filter(i => i.status === 'Resolved').length,
    total: incidents.length
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleAssignTeam = (incidentId, teamId) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        const team = responseTeams.find(t => t.id === teamId);
        return {
          ...incident,
          status: 'In Progress',
          responseTeam: {
            assigned: true,
            teamId: teamId,
            members: team.members,
            eta: '15 minutes',
            status: 'En Route'
          },
          updates: [
            ...incident.updates,
            {
              timestamp: new Date().toLocaleString(),
              message: `Response team ${teamId} assigned and en route`,
              officer: 'Dispatch Officer'
            }
          ]
        };
      }
      return incident;
    }));

    // Update team status
    setResponseTeams(prev => prev.map(team => 
      team.id === teamId ? {...team, status: 'Assigned'} : team
    ));
  };

  const handleResolveIncident = (incidentId) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        const teamId = incident.responseTeam.teamId;
        
        // Free up the response team
        setResponseTeams(prev => prev.map(team => 
          team.id === teamId ? {...team, status: 'Available'} : team
        ));
        
        return {
          ...incident,
          status: 'Resolved',
          responseTeam: {
            ...incident.responseTeam,
            status: 'Mission Complete',
            eta: 'Returning to base'
          },
          updates: [
            ...incident.updates,
            {
              timestamp: new Date().toLocaleString(),
              message: 'Incident resolved successfully',
              officer: 'Incident Commander'
            }
          ]
        };
      }
      return incident;
    }));
  };

  const handleAddUpdate = (incidentId, message) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        return {
          ...incident,
          updates: [
            ...incident.updates,
            {
              timestamp: new Date().toLocaleString(),
              message,
              officer: 'System Operator'
            }
          ]
        };
      }
      return incident;
    }));
  };

  const handleCreateNewIncident = () => {
    const newIncidentId = `INC-${String(incidents.length + 1).padStart(3, '0')}`;
    const newIncident = {
      id: newIncidentId,
      type: 'Emergency',
      severity: 'High',
      status: 'Pending',
      location: 'New Location',
      timestamp: new Date().toLocaleString(),
      coordinates: { lat: 26.2006, lng: 92.9376 },
      tourist: {
        name: 'New Tourist',
        id: `T${String(incidents.length + 1).padStart(3, '0')}`,
        nationality: 'Unknown',
        age: 0,
        phone: '000-000-0000',
        email: 'example@email.com',
        bloodType: 'Unknown',
        allergies: 'None'
      },
      description: 'New emergency incident reported',
      responseTeam: {
        assigned: false,
        teamId: null,
        members: [],
        eta: 'Not assigned',
        status: 'Awaiting Assignment'
      },
      updates: [
        {
          timestamp: new Date().toLocaleString(),
          message: 'New incident created',
          officer: 'System Operator'
        }
      ]
    };
    
    setIncidents(prev => [newIncident, ...prev]);
    setExpandedIncident(newIncidentId);
  };

  const availableTeams = responseTeams.filter(team => team.status === 'Available');

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Emergency First Incident Response</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and respond to emergency incidents in real-time</p>
        </div>
        <button 
          onClick={handleCreateNewIncident}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 self-start"
        >
          <Plus className="h-5 w-5" />
          New Incident
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{incidentStats.active}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Incidents</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Ambulance className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{responseTeams.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response Teams</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{incidentStats.resolved}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Resolved Today</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.5min</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <select 
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Incidents</option>
              <option value="in progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 flex-1 min-w-[200px]">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <input 
              type="text" 
              placeholder="Search incidents by ID, name, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-gray-800 dark:text-white w-full"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Response Teams Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Response Teams Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {responseTeams.map(team => (
            <div key={team.id} className={`p-3 rounded-lg border ${
              team.status === 'Available' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
              team.status === 'Assigned' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
              'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">{team.id}</h4>
                  <p className={`text-sm font-medium ${
                    team.status === 'Available' ? 'text-green-600 dark:text-green-400' :
                    team.status === 'Assigned' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {team.status}
                  </p>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                  {team.location}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">Team Members:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {team.members.map((member, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300">{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incidents List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Recent Incidents ({filteredIncidents.length})
          </h3>
          
          {filteredIncidents.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No incidents match your search criteria</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredIncidents.map((incident) => (
                <div key={incident.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-5 w-5 ${
                          incident.severity === 'Critical' ? 'text-red-500' :
                          incident.severity === 'High' ? 'text-orange-500' :
                          'text-yellow-500'
                        }`} />
                        <span className="font-mono text-sm text-gray-800 dark:text-gray-200">{incident.id}</span>
                      </div>
                      
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      {expandedIncident === incident.id ? (
                        <ChevronUp className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{incident.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{incident.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{incident.tourist.name} ({incident.tourist.id})</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{incident.description}</p>
                    
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        {expandedIncident === incident.id ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {incident.status !== 'Resolved' && (
                        <>
                          {!incident.responseTeam.assigned && availableTeams.length > 0 && (
                            <div className="relative group">
                              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                                <Ambulance className="h-3 w-3" />
                                Assign Team
                              </button>
                              <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-10 border border-gray-200 dark:border-gray-700">
                                {availableTeams.map(team => (
                                  <button
                                    key={team.id}
                                    onClick={() => handleAssignTeam(incident.id, team.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    {team.id} - {team.location}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <button 
                            onClick={() => handleResolveIncident(incident.id)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Mark Resolved
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {expandedIncident === incident.id && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-600">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Incident Details</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tourist Information */}
                        <div>
                          <h5 className="font-medium text-gray-800 dark:text-white mb-2">Tourist Information</h5>
                          <div className="space-y-2 text-sm">
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Name:</span> {incident.tourist.name}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">ID:</span> {incident.tourist.id}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Nationality:</span> {incident.tourist.nationality}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Age:</span> {incident.tourist.age}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Blood Type:</span> {incident.tourist.bloodType}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Allergies:</span> {incident.tourist.allergies}</p>
                            
                            <div className="flex gap-2 mt-3">
                              <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm">
                                <Phone className="h-3 w-3" />
                                Call
                              </button>
                              <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm">
                                <Mail className="h-3 w-3" />
                                Email
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Response Team Information */}
                        <div>
                          <h5 className="font-medium text-gray-800 dark:text-white mb-2">Response Team</h5>
                          <div className="space-y-2 text-sm">
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Status:</span> {incident.responseTeam.status}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">ETA:</span> {incident.responseTeam.eta}</p>
                            
                            {incident.responseTeam.assigned && (
                              <>
                                <p className="text-gray-700 dark:text-gray-300"><span className="font-medium text-gray-800 dark:text-white">Team ID:</span> {incident.responseTeam.teamId}</p>
                                <div>
                                  <span className="font-medium text-gray-800 dark:text-white">Members:</span>
                                  <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
                                    {incident.responseTeam.members.map((member, index) => (
                                      <li key={index}>{member}</li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )}
                            
                            <div className="mt-3">
                              <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                Contact Team
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Updates Timeline */}
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-medium text-gray-800 dark:text-white">Updates</h5>
                          <button 
                            onClick={() => handleAddUpdate(incident.id, 'New update added')}
                            className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" />
                            Add Update
                          </button>
                        </div>
                        <div className="space-y-3">
                          {incident.updates.map((update, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                {index < incident.updates.length - 1 && (
                                  <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">{update.message}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {update.timestamp} • {update.officer}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EFIRSection;