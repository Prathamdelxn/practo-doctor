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
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: 'Dr. Michael Chen',
    date: '',
    time: '',
    reason: '',
    notes: '',
    fees: '$100' // Default fee
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

  // Enhanced status styling
  const statusStyles = {
    confirmed: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600',
      icon: <Check className="w-4 h-4 text-emerald-500" />,
      border: 'border-emerald-500/20'
    },
    pending: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      border: 'border-amber-500/20'
    },
    cancelled: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-600',
      icon: <X className="w-4 h-4 text-rose-500" />,
      border: 'border-rose-500/20'
    }
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    
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
      status: 'pending',
      fees: newAppointment.fees // Include fees
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

  // View patient profile
  const handleViewProfile = (patient) => {
    setCurrentPatient(patient);
    setShowPatientProfile(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
      {/* Blur overlay when modals are open */}
      {(showNewAppointmentModal || showPatientProfile) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism Header */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-6 mb-6 border border-white/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
                <p className="text-sm text-gray-500/90">Manage patient appointments and schedules</p>
              </div>
            </div>
            <button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              onClick={() => setShowNewAppointmentModal(true)}
            >
              <Plus size={18} />
              New Appointment
            </button>
          </div>
        </div>

        {/* Search and Filters - Glass Panel */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-5 mb-6 border border-white/80">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-blue-500/80 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search patients, doctors, or reasons..."
                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-white/80 hover:bg-white rounded-xl transition-all border border-gray-200/70 text-blue-600 text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Filter size={18} />
              Filters
              {filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Expanded Filters */}
          {filtersOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-200/50">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 bg-white/50"
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
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 bg-white/50"
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                >
                  <option value="all">All Doctors</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Modern Table Structure */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-white/80">
          {/* Table Header */}
          <div className="p-5 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
              <div className="text-xs text-blue-600 font-medium bg-blue-100/30 px-3 py-1.5 rounded-full border border-blue-200/50">
                {filteredAppointments.length} {filteredAppointments.length === 1 ? 'appointment' : 'appointments'}
              </div>
            </div>
          </div>

          {/* Column Headers - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-white/50 border-b border-gray-200/50">
            <div className="col-span-3 text-xs font-medium text-blue-600/90 uppercase tracking-wider">Patient</div>
            <div className="col-span-2 text-xs font-medium text-blue-600/90 uppercase tracking-wider">Doctor</div>
            <div className="col-span-2 text-xs font-medium text-blue-600/90 uppercase tracking-wider">Date & Time</div>
            <div className="col-span-3 text-xs font-medium text-blue-600/90 uppercase tracking-wider">Reason</div>
            <div className="col-span-1 text-xs font-medium text-blue-600/90 uppercase tracking-wider">Status</div>
            <div className="col-span-1"></div>
          </div>

          {/* Appointments List */}
          <div className="divide-y divide-gray-200/30">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => (
                <div 
                  key={appointment.id} 
                  className={`transition-all duration-200 ${expandedAppointment === appointment.id ? 'bg-blue-50/20' : 'hover:bg-blue-50/10'}`}
                >
                  {/* Appointment Row */}
                  <div 
                    className="grid grid-cols-12 gap-4 items-center p-4 md:p-5 cursor-pointer"
                    onClick={() => setExpandedAppointment(expandedAppointment === appointment.id ? null : appointment.id)}
                  >
                    {/* Patient Column */}
                    <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-white/80 shadow-sm">
                          <User className="text-blue-600 w-5 h-5" />
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${statusStyles[appointment.status].border}`}></span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{appointment.patient.name}</p>
                        <p className="text-xs text-gray-500/90 flex items-center gap-1.5 mt-1">
                          <Phone className="w-3 h-3 flex-shrink-0 text-blue-500/70" />
                          <span className="truncate">{appointment.patient.phone}</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Doctor Column */}
                    <div className="col-span-6 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="text-indigo-500/80 w-4 h-4 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">
                          {appointment.doctor}
                        </span>
                      </div>
                    </div>
                    
                    {/* Date/Time Column */}
                    <div className="col-span-6 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-blue-500/80 w-4 h-4 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{appointment.date}</p>
                          <p className="text-xs text-gray-500/90 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-500/70" />
                            {appointment.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Reason Column */}
                    <div className="hidden md:block col-span-3">
                      <p className="text-sm text-gray-600/90 truncate">
                        {appointment.reason}
                      </p>
                    </div>
                    
                    {/* Status Column */}
                    <div className="col-span-6 md:col-span-1">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium ${statusStyles[appointment.status].bg} ${statusStyles[appointment.status].text} border ${statusStyles[appointment.status].border}`}>
                        {statusStyles[appointment.status].icon}
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </div>
                    </div>
                    
                    {/* Actions Column */}
                    <div className="col-span-6 md:col-span-1 flex justify-end">
                      <button 
                        className="p-1.5 text-gray-400/90 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedAppointment(appointment.id);
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedAppointment === appointment.id && (
  <div className="px-6 pb-6 pt-2 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {/* Patient Details Card */}
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
        <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
          <User className="w-4 h-4" />
          Patient Information
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500/90">First Name</p>
              <p className="text-sm font-medium text-gray-700">
                {appointment.patient.name.split(' ')[0]}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500/90">Last Name</p>
              <p className="text-sm font-medium text-gray-700">
                {appointment.patient.name.split(' ').slice(1).join(' ')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500/90">Date of Birth</p>
              <p className="text-sm font-medium text-gray-700">
                {appointment.patient.dob ? new Date(appointment.patient.dob).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500/90">Gender</p>
              <p className="text-sm font-medium text-gray-700">
                {appointment.patient.gender || 'N/A'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Blood Type</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.bloodType || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
        <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Contact Information
        </h4>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500/90">Phone</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.phone}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Email</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.email}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Address</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.address || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Medical Information Card */}
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
        <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
          <Stethoscope className="w-4 h-4" />
          Medical Information
        </h4>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500/90">Medical History</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.medicalHistory || 'No significant medical history'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Allergies</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.allergies || 'No known allergies'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Current Medications</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.patient.currentMedications || 'No current medications'}
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Details Card */}
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
        <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Appointment Details
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500/90">Date</p>
              <p className="text-sm font-medium text-gray-700">
                {appointment.date}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500/90">Time</p>
              <p className="text-sm font-medium text-gray-700">
                {appointment.time}
              </p>
            </div>
          </div>
           <div>
            <p className="text-xs text-gray-500/90">Doctor</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.doctor}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Reason</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.reason}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Symptoms</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.symptoms || 'No symptoms reported'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500/90">Notes</p>
            <p className="text-sm font-medium text-gray-700">
              {appointment.notes || 'No additional notes'}
            </p>
          </div>
        </div>
      </div>
    </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200/30">
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Confirm logic here
                          }}
                        >
                          <Check size={16} />
                          Confirm
                        </button>
                        <button 
                          className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProfile(appointment.patient);
                          }}
                        >
                          <User size={16} />
                          View Full Profile
                        </button>
                        <button 
                          className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Reschedule logic here
                          }}
                        >
                          <Calendar size={16} />
                          Reschedule
                        </button>
                        <button 
                          className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-rose-600 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Cancel logic here
                          }}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-xl bg-blue-100/30 border border-blue-200/30 flex items-center justify-center mb-4 shadow-inner">
                  <Search className="text-blue-500/80 w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-gray-700 mb-1">No appointments found</h4>
                <p className="text-sm text-gray-500/90">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* New Appointment Modal */}
       {showNewAppointmentModal && (
  <div className="fixed inset-0 z-20 flex justify-end items-center p-6">
    <div className="bg-white rounded-lg shadow-2xl w-[800px] h-[440px] mr-24 border border-gray-200/70 overflow-y-auto transform transition-all duration-300 scale-[0.98] hover:scale-100 p-6">
      {/* Modal Header */}
      <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm">
              <Plus className="text-white w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">New Patient Appointment</h3>
          </div>
          <button 
            onClick={() => setShowNewAppointmentModal(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-11">Fill in all patient details to create a new appointment</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Personal Information Section */}
          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
            <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={newAppointment.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  required
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={newAppointment.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  required
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Date of Birth*</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={newAppointment.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Gender*</label>
                <select
                  name="gender"
                  value={newAppointment.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Blood Type</label>
                <select
                  name="bloodType"
                  value={newAppointment.bloodType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
            <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={newAppointment.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  required
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={newAppointment.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  required
                  placeholder="patient@example.com"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
            <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={newAppointment.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAppointment.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={newAppointment.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">ZIP/Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={newAppointment.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
            <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Medical Information
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={newAppointment.medicalHistory}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="Previous conditions, surgeries, etc."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Allergies</label>
                <textarea
                  name="allergies"
                  value={newAppointment.allergies}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="Drug, food, or other allergies"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Current Medications</label>
                <textarea
                  name="currentMedications"
                  value={newAppointment.currentMedications}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
                  placeholder="List of current medications with dosages"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details Section */}
<div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 shadow-xs">
  <h4 className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    Appointment Details
  </h4>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Doctor*</label>
      <select
        name="doctor"
        value={newAppointment.doctor}
        onChange={handleInputChange}
        className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
        required
      >
        <option value="">Select Doctor</option>
        <option value="Dr. Michael Chen">Dr. Michael Chen</option>
        <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
        <option value="Dr. James Wilson">Dr. James Wilson</option>
        <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
      </select>
    </div>
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Appointment Date*</label>
      <input
        type="date"
        name="date"
        value={newAppointment.date}
        onChange={handleInputChange}
        className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
        required
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Appointment Time*</label>
      <input
        type="time"
        name="time"
        value={newAppointment.time}
        onChange={handleInputChange}
        className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
        required
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Fees*</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">$</span>
        <input
          type="number"
          name="fees"
          value={newAppointment.fees}
          onChange={handleInputChange}
          className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
          required
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>
    </div>
    <div className="md:col-span-2">
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Reason for Visit*</label>
      <input
        type="text"
        name="reason"
        value={newAppointment.reason}
        onChange={handleInputChange}
        className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
        required
        placeholder="Describe the reason for the appointment"
      />
    </div>
    <div className="md:col-span-2">
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Symptoms</label>
      <textarea
        name="symptoms"
        value={newAppointment.symptoms}
        onChange={handleInputChange}
        rows={2}
        className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
        placeholder="Describe current symptoms if any"
      />
    </div>
    <div className="md:col-span-2">
      <label className="block text-xs font-medium text-gray-700 mb-1.5">Additional Notes</label>
      <textarea
        name="notes"
        value={newAppointment.notes}
        onChange={handleInputChange}
        rows={2}
        className="w-full px-3 py-2.5 text-sm border border-gray-200/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all bg-white/50"
        placeholder="Any additional information for the doctor"
      />
    </div>
  </div>
</div>
        </div>
        
        {/* Form Actions */}
        <div className="p-4 border-t border-gray-200/50 flex justify-between items-center bg-gradient-to-r from-blue-50/30 to-indigo-50/20">
          <div className="text-xs text-gray-500">
            Fields marked with * are required
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100/70 rounded-xl transition-all border border-gray-200/70 shadow-sm hover:shadow-md"
              onClick={() => setShowNewAppointmentModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Create Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
)}

        {/* Patient Profile Modal */}
{showPatientProfile && currentPatient && (
  <div className="fixed inset-0 z-20 flex justify-end items-center p-6">
    <div className="bg-white rounded-lg shadow-2xl w-[800px] h-[440px] mr-24 border border-gray-200/70 overflow-y-auto transform transition-all duration-300 scale-[0.98] hover:scale-100">
      <div className="p-6 border-b border-gray-200/50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <User size={18} />
          Patient Profile
        </h3>
        <button 
          onClick={() => setShowPatientProfile(false)}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="p-6 space-y-6 h-[calc(100%-120px)] overflow-y-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-white/80 shadow-sm">
            <User className="text-blue-600 w-7 h-7" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800">{currentPatient.name}</h4>
            <p className="text-sm text-gray-500/90">{currentPatient.gender}, {new Date().getFullYear() - new Date(currentPatient.dob).getFullYear()} years</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200/50 pb-4">
            <h5 className="text-sm font-medium text-blue-600 mb-3">Contact Information</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100/30 rounded-lg mt-0.5 border border-blue-200/30">
                  <Phone className="text-blue-500/80 w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500/90">Phone</p>
                  <p className="text-sm font-medium text-gray-700">{currentPatient.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100/30 rounded-lg mt-0.5 border border-blue-200/30">
                  <Mail className="text-blue-500/80 w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500/90">Email</p>
                  <p className="text-sm font-medium text-gray-700">{currentPatient.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100/30 rounded-lg mt-0.5 border border-blue-200/30">
                  <MapPin className="text-blue-500/80 w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500/90">Address</p>
                  <p className="text-sm font-medium text-gray-700">{currentPatient.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200/50 pb-4">
            <h5 className="text-sm font-medium text-blue-600 mb-3">Medical Information</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100/30 rounded-lg mt-0.5 border border-blue-200/30">
                  <Calendar className="text-blue-500/80 w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500/90">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(currentPatient.dob).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100/30 rounded-lg mt-0.5 border border-blue-200/30">
                  <User className="text-blue-500/80 w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500/90">Gender</p>
                  <p className="text-sm font-medium text-gray-700">{currentPatient.gender}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100/30 rounded-lg mt-0.5 border border-blue-200/30">
                  <Stethoscope className="text-blue-500/80 w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500/90">Medical History</p>
                  <p className="text-sm font-medium text-gray-700">
                    {currentPatient.medicalHistory || 'No significant medical history'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200/50 flex justify-end">
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
          onClick={() => setShowPatientProfile(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
</div>
</div>
  );
};

export default AppointmentsDashboard;