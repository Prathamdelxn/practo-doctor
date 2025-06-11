'use client'

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  MoreVertical,
  User,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

const AppointmentsDashboard = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Form state for new appointment
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: 'Dr. Michael Chen',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  // Sample data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: {
        name: 'Sarah Johnson',
        phone: '(555) 123-4567',
        email: 'sarah.johnson@example.com',
        address: '123 Main St, Apt 4B, New York, NY',
        dob: '1985-04-23',
        gender: 'Female',
        medicalHistory: 'Seasonal allergies, mild asthma'
      },
      doctor: 'Dr. Michael Chen',
      date: 'May 15, 2023',
      time: '10:30 AM',
      duration: 30,
      reason: 'Annual checkup',
      notes: 'Patient has concerns about seasonal allergies',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: {
        name: 'Robert Williams',
        phone: '(555) 987-6543',
        email: 'robert.w@example.com',
        address: '456 Oak Ave, Boston, MA',
        dob: '1978-11-15',
        gender: 'Male',
        medicalHistory: 'Hypertension, high cholesterol'
      },
      doctor: 'Dr. Emily Rodriguez',
      date: 'May 15, 2023',
      time: '2:15 PM',
      duration: 45,
      reason: 'Follow-up visit',
      notes: 'Monitoring blood pressure medication',
      status: 'pending'
    },
    {
      id: 3,
      patient: {
        name: 'Lisa Thompson',
        phone: '(555) 456-7890',
        email: 'lisa.t@example.com',
        address: '789 Pine Rd, Chicago, IL',
        dob: '1990-07-30',
        gender: 'Female',
        medicalHistory: 'Knee surgery (2022), migraines'
      },
      doctor: 'Dr. Michael Chen',
      date: 'May 15, 2023',
      time: '11:45 AM',
      duration: 60,
      reason: 'Physical therapy consultation',
      notes: 'Recovering from knee surgery',
      status: 'confirmed'
    },
    {
      id: 4,
      patient: {
        name: 'David Kim',
        phone: '(555) 234-5678',
        email: 'david.kim@example.com',
        address: '321 Elm St, San Francisco, CA',
        dob: '1982-03-12',
        gender: 'Male',
        medicalHistory: 'None'
      },
      doctor: 'Dr. Emily Rodriguez',
      date: 'May 15, 2023',
      time: '3:30 PM',
      duration: 30,
      reason: 'Vaccination',
      notes: 'Annual flu shot requested',
      status: 'cancelled'
    }
  ]);

  // Status styling
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    confirmed: <Check className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
    cancelled: <X className="w-3 h-3" />
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || appointment.doctor === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  // Handle new appointment form changes
  const handleNewAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new appointment
  const handleSubmitNewAppointment = (e) => {
    e.preventDefault();
    const newId = Math.max(...appointments.map(a => a.id)) + 1;
    
    const newAppt = {
      id: newId,
      patient: {
        name: newAppointment.patientName,
        phone: newAppointment.patientPhone,
        email: newAppointment.patientEmail,
        address: '',
        dob: '',
        gender: '',
        medicalHistory: ''
      },
      doctor: newAppointment.doctor,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: 30,
      reason: newAppointment.reason,
      notes: newAppointment.notes,
      status: 'pending'
    };
    
    setAppointments([...appointments, newAppt]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      doctor: 'Dr. Michael Chen',
      date: '',
      time: '',
      reason: '',
      notes: ''
    });
  };

  // View full patient profile
  const handleViewFullProfile = (patient) => {
    setCurrentPatient(patient);
    setShowPatientProfile(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Elegant Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-sm">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
                <p className="text-sm text-gray-500">Manage patient appointments and schedules</p>
              </div>
            </div>
            <button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow hover:shadow-md"
              onClick={() => setShowNewAppointmentModal(true)}
            >
              <Plus size={18} />
              New Appointment
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-blue-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search patients, doctors, or reasons..."
                className="w-full pl-11 pr-4 py-3 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-blue-50/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 text-blue-700 text-sm font-medium"
            >
              <Filter size={18} />
              Filters
              {filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Expanded Filters */}
          {filtersOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-blue-200">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  className="w-full px-3 py-2.5 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Doctor</label>
                <select
                  className="w-full px-3 py-2.5 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30"
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                >
                  <option value="all">All Doctors</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Date From</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2.5 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Date To</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2.5 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Modern Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
              <div className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span>{filteredAppointments.length}</span>
                <span>{filteredAppointments.length === 1 ? 'appointment' : 'appointments'}</span>
              </div>
            </div>
            
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3.5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg mb-2">
              <div className="col-span-3 text-xs font-semibold text-blue-700 uppercase tracking-wider">Patient</div>
              <div className="col-span-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">Doctor</div>
              <div className="col-span-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</div>
              <div className="col-span-1 text-xs font-semibold text-blue-700 uppercase tracking-wider">Time</div>
              <div className="col-span-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">Reason</div>
              <div className="col-span-1 text-xs font-semibold text-blue-700 uppercase tracking-wider">Status</div>
              <div className="col-span-1"></div>
            </div>

            {/* Appointments List */}
            <div className="space-y-3">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(appointment => (
                  <div key={appointment.id} className="border border-blue-100 rounded-xl overflow-hidden hover:shadow-xs transition-all duration-200 bg-white">
                    {/* Appointment Summary */}
                    <div 
                      className="grid grid-cols-12 gap-3 items-center p-5 hover:bg-blue-50/20 cursor-pointer transition-colors"
                      onClick={() => setExpandedAppointment(expandedAppointment === appointment.id ? null : appointment.id)}
                    >
                      {/* Patient Column */}
                      <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-white shadow-xs">
                            <User className="text-blue-600 w-5 h-5" />
                          </div>
                          <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${appointment.status === 'confirmed' ? 'bg-green-400' : appointment.status === 'pending' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{appointment.patient.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{appointment.patient.phone}</span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Doctor Column */}
                      <div className="col-span-6 md:col-span-2">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="text-indigo-500 w-4 h-4" />
                          <span className="text-sm text-gray-700 font-medium truncate">
                            {appointment.doctor}
                          </span>
                        </div>
                      </div>
                      
                      {/* Date Column */}
                      <div className="col-span-3 md:col-span-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="text-blue-400 w-4 h-4" />
                          <span className="font-medium">{appointment.date}</span>
                        </div>
                      </div>
                      
                      {/* Time Column */}
                      <div className="col-span-3 md:col-span-1 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="text-blue-400 w-4 h-4" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                      </div>
                      
                      {/* Reason Column (Desktop only) */}
                      <div className="hidden md:block col-span-2 text-sm text-gray-600 truncate">
                        {appointment.reason}
                      </div>
                      
                      {/* Enhanced Status Column */}
                      <div className="col-span-6 md:col-span-1">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusColors[appointment.status]} shadow-xs`}>
                          {statusIcons[appointment.status]}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </div>
                      
                      {/* Actions Column */}
                      <div className="col-span-6 md:col-span-1 flex justify-end">
                        <button className="p-1 text-blue-400 hover:text-blue-600 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedAppointment === appointment.id && (
                      <div className="p-5 border-t border-blue-100 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Patient Details */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 text-blue-600">
                              <User className="w-4 h-4" />
                              Patient Details
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-xs">
                                  <Phone className="text-blue-500 w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Phone</p>
                                  <p className="text-sm font-medium text-gray-700">{appointment.patient.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-xs">
                                  <Mail className="text-blue-500 w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Email</p>
                                  <p className="text-sm font-medium text-gray-700">{appointment.patient.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-xs">
                                  <MapPin className="text-blue-500 w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Address</p>
                                  <p className="text-sm font-medium text-gray-700">{appointment.patient.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Appointment Details */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 text-blue-600">
                              <Calendar className="w-4 h-4" />
                              Appointment Details
                            </h4>
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Date</p>
                                  <p className="text-sm font-medium text-gray-700">{appointment.date}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Time</p>
                                  <p className="text-sm font-medium text-gray-700">{appointment.time}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Reason</p>
                                <p className="text-sm font-medium text-gray-700">{appointment.reason}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Notes</p>
                                <p className="text-sm font-medium text-gray-700">{appointment.notes}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-blue-200">
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2">
                            <Check size={16} />
                            Confirm
                          </button>
                          <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-all shadow-xs border border-gray-200 flex items-center gap-2">
                            <Calendar size={16} />
                            Reschedule
                          </button>
                          <button className="px-4 py-2 bg-white hover:bg-gray-50 text-rose-600 rounded-lg text-sm font-medium transition-all shadow-xs border border-rose-200 flex items-center gap-2">
                            <X size={16} />
                            Cancel
                          </button>
                          <button 
                            className="px-4 py-2 bg-white hover:bg-gray-50 text-green-600 rounded-lg text-sm font-medium transition-all shadow-xs border border-green-200 flex items-center gap-2 ml-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewFullProfile(appointment.patient);
                            }}
                          >
                            View Full Profile
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center border border-blue-100 rounded-lg bg-blue-50/30">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Search className="text-blue-500 w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-1">No appointments found</h4>
                  <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Appointment Modal with Blur Background */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-blue-100 animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">New Appointment</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowNewAppointmentModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitNewAppointment}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      value={newAppointment.patientName}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Phone</label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={newAppointment.patientPhone}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Email</label>
                    <input
                      type="email"
                      name="patientEmail"
                      value={newAppointment.patientEmail}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                    <select
                      name="doctor"
                      value={newAppointment.doctor}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                      <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newAppointment.time}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <input
                      type="text"
                      name="reason"
                      value={newAppointment.reason}
                      onChange={handleNewAppointmentChange}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={newAppointment.notes}
                      onChange={handleNewAppointmentChange}
                      rows={3}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-300"
                  onClick={() => setShowNewAppointmentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Profile Modal with Blur Background */}
      {showPatientProfile && currentPatient && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-blue-100 animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Patient Profile</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPatientProfile(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-white shadow-md">
                    <User className="text-blue-600 w-10 h-10" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentPatient.name}</h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>{currentPatient.gender || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{currentPatient.dob ? new Date(currentPatient.dob).toLocaleDateString() : 'DOB not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-blue-700 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-700">{currentPatient.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-700">{currentPatient.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-700">{currentPatient.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-blue-700 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Medical Information
                  </h4>
                  <div>
                    <p className="text-xs text-gray-500">Medical History</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {currentPatient.medicalHistory || 'No medical history recorded'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-blue-700 mb-4">Appointment History</h4>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {appointments.filter(a => a.patient.name === currentPatient.name).length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {appointments
                        .filter(a => a.patient.name === currentPatient.name)
                        .map(appointment => (
                          <div key={appointment.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-gray-800">{appointment.reason}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {appointment.date} at {appointment.time} with {appointment.doctor}
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No previous appointments found
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                onClick={() => setShowPatientProfile(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsDashboard;