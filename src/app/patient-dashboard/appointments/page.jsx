'use client';

import { useEffect, useState } from 'react';
import { FiCalendar, FiPlus, FiX, FiClock, FiUser, FiMapPin, FiPhone, FiMail, FiInfo } from 'react-icons/fi';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    location: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [userId,setId]=useState("");
  const [appointments,setAppointment]=useState([
    { 
      id: 1, 
      doctor: 'Dr. Sarah Johnson', 
      specialty: 'Cardiology', 
      date: '2023-06-15', 
      time: '10:30 AM', 
      status: 'confirmed',
      location: 'Cardio Center, Room 302',
      phone: '(555) 123-4567',
      email: 's.johnson@medicalcenter.com',
      notes: 'Please bring your recent test results and arrive 15 minutes early for paperwork.'
    },
    { 
      id: 2, 
      doctor: 'Dr. Michael Chen', 
      specialty: 'Dermatology', 
      date: '2023-06-20', 
      time: '2:15 PM', 
      status: 'pending',
      location: 'Dermatology Clinic, Suite 105',
      phone: '(555) 987-6543',
      email: 'm.chen@dermclinic.org'
    },
    { 
      id: 3, 
      doctor: 'Dr. Emily Wilson', 
      specialty: 'Pediatrics', 
      date: '2023-05-28', 
      time: '9:00 AM', 
      status: 'completed',
      location: "Children's Hospital, Wing B",
      phone: '(555) 456-7890'
    },
    { 
      id: 4, 
      doctor: 'Dr. Robert Garcia', 
      specialty: 'Orthopedics', 
      date: '2023-05-15', 
      time: '11:45 AM', 
      status: 'completed',
      location: 'Orthopedic Center, Floor 3',
      phone: '(555) 789-0123',
      notes: 'Follow-up for knee surgery recovery'
    },
  ])
useEffect(() => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      const user=JSON.parse(userStr);
      console.log("userDAta",user)
      setId(user?.id)
      
},[])
  useEffect(()=>{
    const fetchAppointments=async()=>{
      try{
        if (!userId) return; 
        const res=await fetch(`https://practo-backend.vercel.app/api/appointment/fetch-by-patient/${userId}`)
        const data= await res.json();
        console.log("response is",data.data)
        setAppointment(data.data)

      }catch(err){
        console.log("Internal Server Error",err)

      }
    }
    fetchAppointments();

  },[userId])




  //  useEffect(()=>{
  //   const fetchDoctor=async()=>{
  //     try{
  //       if (!appointments?.doctorId) return; 
  //       const res=await fetch(`http://localhost:3001/api/doctor/fetch-by-id/${appointments?.doctorId}`)
  //       const data= await res.json();
  //       console.log("response  docis",data.data)
       

  //     }catch(err){
  //       console.log("Internal Server Error",err)

  //     }
  //   }
  //   fetchDoctor();

  // },[appointments])
  // const appointments = [
  //   { 
  //     id: 1, 
  //     doctor: 'Dr. Sarah Johnson', 
  //     specialty: 'Cardiology', 
  //     date: '2023-06-15', 
  //     time: '10:30 AM', 
  //     status: 'confirmed',
  //     location: 'Cardio Center, Room 302',
  //     phone: '(555) 123-4567',
  //     email: 's.johnson@medicalcenter.com',
  //     notes: 'Please bring your recent test results and arrive 15 minutes early for paperwork.'
  //   },
  //   { 
  //     id: 2, 
  //     doctor: 'Dr. Michael Chen', 
  //     specialty: 'Dermatology', 
  //     date: '2023-06-20', 
  //     time: '2:15 PM', 
  //     status: 'pending',
  //     location: 'Dermatology Clinic, Suite 105',
  //     phone: '(555) 987-6543',
  //     email: 'm.chen@dermclinic.org'
  //   },
  //   { 
  //     id: 3, 
  //     doctor: 'Dr. Emily Wilson', 
  //     specialty: 'Pediatrics', 
  //     date: '2023-05-28', 
  //     time: '9:00 AM', 
  //     status: 'completed',
  //     location: "Children's Hospital, Wing B",
  //     phone: '(555) 456-7890'
  //   },
  //   { 
  //     id: 4, 
  //     doctor: 'Dr. Robert Garcia', 
  //     specialty: 'Orthopedics', 
  //     date: '2023-05-15', 
  //     time: '11:45 AM', 
  //     status: 'completed',
  //     location: 'Orthopedic Center, Floor 3',
  //     phone: '(555) 789-0123',
  //     notes: 'Follow-up for knee surgery recovery'
  //   },
  // ];

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const validateForm = () => {
    const errors = {};
    if (!newAppointment.doctor.trim()) errors.doctor = 'Doctor name is required';
    if (!newAppointment.specialty) errors.specialty = 'Specialty is required';
    if (!newAppointment.date) errors.date = 'Date is required';
    if (!newAppointment.time) errors.time = 'Time is required';
    
    // Validate future date
    if (newAppointment.date) {
      const selectedDate = new Date(newAppointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = 'Date must be in the future';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Here you would typically send the data to your backend
    console.log('New appointment:', newAppointment);
    
    // For demo purposes, we'll just close the modal and reset the form
    setShowNewAppointmentModal(false);
    setNewAppointment({
      doctor: '',
      specialty: '',
      date: '',
      time: '',
      location: '',
      phone: '',
      email: '',
      notes: ''
    });
    
    // Show success message (you could use a toast notification here)
    alert('Appointment scheduled successfully!');
  };

  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return '';
    
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>
          <p className="text-blue-600 mt-1">Manage your upcoming medical visits</p>
        </div>
        {/* <Button 
          icon={<FiPlus className="text-white" />} 
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          onClick={() => setShowNewAppointmentModal(true)}
        >
          New Appointment
        </Button> */}
      </div>

      {/* Appointments Table */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-600">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {appointments.map((appointment,index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiUser className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-blue-900">Dr. {appointment.doctorName}</div>
                        <div className="text-xs text-blue-500">{appointment.doctorDetails?.specialty}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-blue-700 font-medium">{appointment.doctorDetails?.specialty}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-blue-900">
                          {new Date(appointment.appointmentDate).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-sm text-blue-500">{appointment.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => openModal(appointment)}
                      className="text-blue-600 hover:text-blue-800 mr-4 font-medium"
                    >
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 font-medium">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Appointment Modal */}
      {selectedAppointment && (
        <>
          <div className="fixed inset-0 bg-black/40 bg-opacity-30 backdrop-blur-sm z-40"></div>
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 rounded-t-xl flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Appointment Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-white hover:text-blue-100 transition-colors"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedAppointment?.doctorName}</h3>
                    <p className="text-blue-600">{selectedAppointment.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <FiCalendar className="flex-shrink-0 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FiClock className="flex-shrink-0 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium text-gray-900">{selectedAppointment.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FiMapPin className="flex-shrink-0 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">
                        {selectedAppointment.location || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FiPhone className="flex-shrink-0 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {selectedAppointment.patientNumber || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedAppointment.email && (
                  <div className="flex items-start space-x-3">
                    <FiMail className="flex-shrink-0 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{selectedAppointment.email}</p>
                    </div>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-blue-600">
                      <FiInfo />
                      <p className="text-sm font-medium">Additional Notes</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
  <>
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"></div>
    
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-5 rounded-t-xl flex justify-between items-center shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-white">Schedule New Appointment</h2>
            <p className="text-blue-100 text-sm mt-1">Fill in the details to book your appointment</p>
          </div>
          <button 
            onClick={() => setShowNewAppointmentModal(false)}
            className="text-blue-100 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-700/30"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Doctor Name */}
            <div className="space-y-2">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiUser className="mr-2 text-blue-600" />
                Doctor's Name <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="doctor"
                  name="doctor"
                  value={newAppointment.doctor}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 pl-10 border ${formErrors.doctor ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all`}
                  placeholder="Dr. John Smith"
                />
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {formErrors.doctor && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiInfo className="mr-1" /> {formErrors.doctor}
                </p>
              )}
            </div>

            {/* Specialty */}
            <div className="space-y-2">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiInfo className="mr-2 text-blue-600" />
                Specialty <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  id="specialty"
                  name="specialty"
                  value={newAppointment.specialty}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 pl-10 appearance-none border ${formErrors.specialty ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all bg-white`}
                >
                  <option value="">Select a specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Practice">General Practice</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              {formErrors.specialty && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiInfo className="mr-1" /> {formErrors.specialty}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                Date <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={`block w-full px-4 py-3 pl-10 border ${formErrors.date ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all`}
                />
                <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {formErrors.date && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiInfo className="mr-1" /> {formErrors.date}
                </p>
              )}
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiClock className="mr-2 text-blue-600" />
                Time <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 pl-10 border ${formErrors.time ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all`}
                />
                <FiClock className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {formErrors.time && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiInfo className="mr-1" /> {formErrors.time}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiMapPin className="mr-2 text-blue-600" />
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newAppointment.location}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
                  placeholder="Clinic address"
                />
                <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiPhone className="mr-2 text-blue-600" />
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newAppointment.phone}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
                  placeholder="(123) 456-7890"
                />
                <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiMail className="mr-2 text-blue-600" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={newAppointment.email}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
                placeholder="doctor@clinic.com"
              />
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiInfo className="mr-2 text-blue-600" />
              Additional Notes
            </label>
            <div className="relative">
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={newAppointment.notes}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
                placeholder="Any special requirements or notes..."
              />
              <FiInfo className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowNewAppointmentModal(false)}
              className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-md"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)}
    </div>
  );
}