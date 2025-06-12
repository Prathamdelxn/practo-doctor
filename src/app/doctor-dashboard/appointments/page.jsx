'use client';

import { useState } from 'react';
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Plus,
  Printer,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Video,
  MessageSquare,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  X
} from 'lucide-react';

export default function AppointmentsPage() {
  const [selectedView, setSelectedView] = useState('list'); // 'list', 'calendar'
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'today', 'upcoming', 'completed', 'cancelled'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patient: {
        name: 'John Smith',
        age: 45,
        phone: '+1 (555) 123-4567',
        email: 'john.smith@email.com',
        avatar: 'JS'
      },
      hospital: 'City General Hospital',
      date: '2025-06-02',
      time: '10:00 AM',
      duration: '30 min',
      type: 'Consultation',
      status: 'confirmed',
      notes: 'Regular checkup for hypertension',
      isVirtual: false
    },
    {
      id: 2,
      patient: {
        name: 'Sarah Johnson',
        age: 32,
        phone: '+1 (555) 234-5678',
        email: 'sarah.j@email.com',
        avatar: 'SJ'
      },
      hospital: 'St. Mary\'s Medical Center',
      date: '2025-06-02',
      time: '11:30 AM',
      duration: '45 min',
      type: 'Follow-up',
      status: 'pending',
      notes: 'Post-surgery follow-up appointment',
      isVirtual: true
    },
    {
      id: 3,
      patient: {
        name: 'Mike Davis',
        age: 58,
        phone: '+1 (555) 345-6789',
        email: 'mike.davis@email.com',
        avatar: 'MD'
      },
      hospital: 'Metro Heart Institute',
      date: '2025-06-02',
      time: '2:00 PM',
      duration: '60 min',
      type: 'Cardiology Exam',
      status: 'confirmed',
      notes: 'Comprehensive cardiac evaluation',
      isVirtual: false
    },
    {
      id: 4,
      patient: {
        name: 'Emily Brown',
        age: 28,
        phone: '+1 (555) 456-7890',
        email: 'emily.brown@email.com',
        avatar: 'EB'
      },
      hospital: 'City General Hospital',
      date: '2025-06-02',
      time: '3:30 PM',
      duration: '30 min',
      type: 'Consultation',
      status: 'cancelled',
      notes: 'Patient cancelled due to emergency',
      isVirtual: false
    },
    {
      id: 5,
      patient: {
        name: 'Robert Wilson',
        age: 41,
        phone: '+1 (555) 567-8901',
        email: 'robert.w@email.com',
        avatar: 'RW'
      },
      hospital: 'Sunrise Community Hospital',
      date: '2025-06-03',
      time: '9:00 AM',
      duration: '30 min',
      type: 'Consultation',
      status: 'confirmed',
      notes: 'Initial consultation for chest pain',
      isVirtual: true
    },
    {
      id: 6,
      patient: {
        name: 'Lisa Anderson',
        age: 35,
        phone: '+1 (555) 678-9012',
        email: 'lisa.and@email.com',
        avatar: 'LA'
      },
      hospital: 'St. Mary\'s Medical Center',
      date: '2025-06-03',
      time: '1:00 PM',
      duration: '45 min',
      type: 'Follow-up',
      status: 'completed',
      notes: 'Routine follow-up - patient doing well',
      isVirtual: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'today') return matchesSearch && appointment.date === selectedDate;
    if (selectedFilter === 'upcoming') return matchesSearch && new Date(appointment.date) > new Date();
    return matchesSearch && appointment.status === selectedFilter;
  });

  const todayAppointments = appointments.filter(apt => apt.date === selectedDate);
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) > new Date());

  const openViewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your patient appointments across all hospitals</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{todayAppointments.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{upcomingAppointments.length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{appointments.filter(a => a.status === 'completed').length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{appointments.filter(a => a.status === 'cancelled').length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setSelectedView('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'calendar' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar View
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'today', label: 'Today' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === filter.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients or hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedFilter === 'all' ? 'All Appointments' : 
             selectedFilter === 'today' ? 'Today\'s Appointments' :
             selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) + ' Appointments'}
          </h2>
          <p className="text-gray-600 mt-1">{filteredAppointments.length} appointments found</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No appointments found</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Patient Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {appointment.patient.avatar}
                    </div>
                    
                    {/* Appointment Details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.patient.name}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">Age {appointment.patient.age}</span>
                        {appointment.isVirtual && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Video className="w-3 h-3 mr-1" />
                            Virtual
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {appointment.hospital}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {appointment.type}
                        </span>
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status and Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(appointment.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'confirmed' && (
                        <>
                          {appointment.isVirtual ? (
                            <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                              <Video className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <MapPin className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      <button 
                        onClick={() => openViewModal(appointment)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        {filteredAppointments.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of{' '}
                <span className="font-medium">{filteredAppointments.length}</span> results
              </p>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Appointment Modal */}
{viewModalOpen && selectedAppointment && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b border-blue-200 p-6 sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-100 z-10">
        <div className="flex items-center">
          <Calendar className="text-blue-600 mr-3" size={24} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
            <div className="flex items-center space-x-2 mt-1">
              {getStatusIcon(selectedAppointment.status)}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
              </span>
              {selectedAppointment.isVirtual && (
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                  <Video className="w-3 h-3 mr-1" />
                  Virtual
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setViewModalOpen(false)}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6 space-y-6">
        {/* Patient Information Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 text-green-600" size={20} />
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {selectedAppointment.patient.avatar}
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">{selectedAppointment.patient.name}</p>
                <p className="text-gray-600">Age: {selectedAppointment.patient.age}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{selectedAppointment.patient.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{selectedAppointment.patient.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2 text-blue-600" size={20} />
            Appointment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Date & Time</p>
              <p className="text-gray-800">
                {new Date(selectedAppointment.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
                <span className="ml-2 text-blue-600">{selectedAppointment.time}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Duration</p>
              <p className="text-gray-800">{selectedAppointment.duration}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <p className="text-gray-800 flex items-start">
                <MapPin className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" />
                <span>{selectedAppointment.hospital}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Type</p>
              <p className="text-gray-800">{selectedAppointment.type}</p>
            </div>
          </div>
        </div>

        {/* Notes Card */}
        {selectedAppointment.notes && (
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="mr-2 text-gray-600" size={20} />
              Notes
            </h3>
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs">
              <p className="text-gray-800 whitespace-pre-line">{selectedAppointment.notes}</p>
            </div>
        </div>
        )}
      </div>

      {/* Modal Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-blue-200 flex justify-end space-x-3 sticky bottom-0">
        <button
          className="flex items-center px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors duration-200 shadow-sm"
        >
          <Printer className="mr-2" size={16} /> Print
        </button>
        <button
          className="flex items-center px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors duration-200 shadow-sm"
        >
          <Download className="mr-2" size={16} /> Download
        </button>
        <button
          onClick={() => setViewModalOpen(false)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}