
'use client'
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Stethoscope,
  BadgeDollarSign,
  Clock,
  Star,
  User,
  GraduationCap,
  AlertTriangle,
  X
} from 'lucide-react'

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [newdoctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://practo-backend.vercel.app/api/doctor/fetchAll');
      setDoctors(response.data.doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

// Add these states to your component
const [selectedDoctor, setSelectedDoctor] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditMode, setIsEditMode] = useState(false);
const [deleteModal, setDeleteModal] = useState({ isOpen: false, doctor: null });
const [isDeleting, setIsDeleting] = useState(false);
const [isUpdating, setIsUpdating] = useState(false);
const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

// Modern Delete Confirmation Modal
const DeleteConfirmationModal = ({ doctor, onClose, onConfirm, isDeleting }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay with blur effect */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in zoom-in-95">
        {/* Modal content */}
        <div className="p-8">
          {/* Icon and header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Delete Doctor Profile
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Are you sure you want to delete Dr. {doctor?.firstName} {doctor?.lastName}'s profile? 
              This action cannot be undone and will permanently remove all associated data.
            </p>
          </div>

          {/* Doctor info card */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-pink-400 flex items-center justify-center">
                {doctor?.profileImage ? (
                  <img 
                    src={doctor.profileImage} 
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    className='h-full w-full object-cover rounded-full' 
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {doctor?.firstName?.[0]}{doctor?.lastName?.[0]}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Dr. {doctor?.firstName} {doctor?.lastName}
                </p>
                <p className="text-sm text-gray-500">{doctor?.specialty}</p>
                <p className="text-xs text-gray-400">{doctor?.email}</p>
              </div>
            </div>
          </div>

          {/* Warning message */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Warning</p>
                <p className="text-xs text-amber-700 mt-1">
                  This will also delete all appointments, patient records, and reviews associated with this doctor.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Doctor</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Handle delete function
const handleDeleteDoctor = async (doctor) => {
  setIsDeleting(true);
  console.log(doctor);
  try {
    // Replace with your actual delete API endpoint
    await axios.delete(`https://practo-backend.vercel.app/api/doctor/delete-by-id/${doctor._id}`);
    
    // Remove from local state
    setDoctors(prev => prev.filter(d => d._id !== doctor._id));
    
    // Show success message (you can add a toast notification here)
    console.log('Doctor deleted successfully');
    
    // Close modal
    setDeleteModal({ isOpen: false, doctor: null });
    
  } catch (error) {
    console.error('Error deleting doctor:', error);
    // Show error message (you can add error handling here)
  } finally {
    setIsDeleting(false);
  }
};
 const handleUpdateDoctor = async (doctorId, formattedData) => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      // Make API call to update doctor
      const response = await axios.put(
        `https://practo-backend.vercel.app/api/doctor/update-by-id/${doctorId}`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      // Update local state with the updated doctor data
      setDoctors(prev => prev.map(d => 
        d._id === doctorId ? { ...d, ...formattedData } : d
      ));
      
      // Update selected doctor for modal
      setSelectedDoctor(prev => ({ ...prev, ...formattedData }));
      
      // Show success feedback
      setUpdateSuccess(true);
      
      // Exit edit mode after a short delay
      setTimeout(() => {
        setIsEditMode(false);
        setUpdateSuccess(false);
      }, 1500);
      
      console.log('Doctor updated successfully:', response.data);
      
    } catch (error) {
      console.error('Error updating doctor:', error);
      
      // Set error message based on the error response
      if (error.response?.data?.message) {
        setUpdateError(error.response.data.message);
      } else if (error.response?.status === 404) {
        setUpdateError('Doctor not found. Please refresh the page and try again.');
      } else if (error.response?.status === 400) {
        setUpdateError('Invalid data provided. Please check all fields and try again.');
      } else {
        setUpdateError('Failed to update doctor. Please try again.');
      }
    } finally {
      setIsUpdating(false);
    }
  };
// Doctor Details Modal Component (keeping your existing modal)
const DoctorDetailsModal = ({ doctor, onClose, onEdit, onSave, isEditMode, setIsEditMode }) => {
  const [formData, setFormData] = useState({
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    email: doctor.email,
    phone: doctor.phone,
    specialty: doctor.specialty,
    supSpeciality: doctor.supSpeciality || '',
    hospital: doctor.hospital || '',
    hospitalAddress: doctor.hospitalAddress || '',
    experience: doctor.experience || '',
    consultantFee: doctor.consultantFee || '',
    qualifications: doctor.qualifications?.join(', ') || '',
    available: {
      days: doctor.available?.days?.join(', ') || '',
      time: doctor.available?.time || ''
    },
    isVerified: doctor.isVerified || false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      available: {
        ...prev.available,
        [name]: value
      }
    }));
  };

//   const handleSave = () => {
//     // Format data back to original structure
//     const formattedData = {
//       ...formData,
//       qualifications: formData.qualifications.split(',').map(q => q.trim()),
//       available: {
//         ...formData.available,
//         days: formData.available.days.split(',').map(d => d.trim())
//       }
//     };
//     onSave(formattedData);
//   };

 const handleSave = () => {
      // Format data back to original structure
      const formattedData = {
        ...formData,
        qualifications: formData.qualifications 
          ? formData.qualifications.split(',').map(q => q.trim()).filter(q => q.length > 0)
          : [],
        available: {
          ...formData.available,
          days: formData.available.days 
            ? formData.available.days.split(',').map(d => d.trim()).filter(d => d.length > 0)
            : []
        }
      };
      
      // Call the enhanced update function
      handleUpdateDoctor(doctor._id, formattedData);
    };
  return (
   
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal container - medium size */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-start justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 flex items-center justify-center overflow-hidden shadow-md">
              {doctor.profileImage ? (
                <img 
                  src={doctor.profileImage} 
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className='h-full w-full object-cover' 
                />
              ) : (
                <span className="text-white font-semibold text-lg">
                  {doctor.firstName?.[0]}{doctor.lastName?.[0]}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditMode ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-28 px-2 py-1 border border-gray-200 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-28 px-2 py-1 border border-gray-200 rounded-md text-sm"
                    />
                  </div>
                ) : (
                  `${doctor.firstName} ${doctor.lastName}`
                )}
              </h3>
              <p className="text-cyan-600 text-sm font-medium">
                {isEditMode ? (
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm"
                  />
                ) : (
                  doctor.specialty
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-500"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">Contact Information</h4>
            {/* ... contact info fields ... */}
              {isEditMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-700">
                      <Mail className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span>{doctor.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Phone className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>
                )}
          </div>

          {/* Hospital Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">Hospital Details</h4>
            {/* ... hospital info fields ... */}
             {isEditMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Hospital Name</label>
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Hospital Address</label>
                      <input
                        type="text"
                        name="hospitalAddress"
                        value={formData.hospitalAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-700">
                      <Stethoscope className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span>{doctor.hospital || 'Not specified'}</span>
                    </div>
                    {doctor.hospitalAddress && (
                      <div className="flex items-start text-sm text-slate-700">
                        <MapPin className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{doctor.hospitalAddress}</span>
                      </div>
                    )}
                  </div>
                )}
          </div>

          {/* Professional Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">Professional Details</h4>
            {/* ... professional info fields ... */}
              {isEditMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Experience (years)</label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        name="consultantFee"
                        value={formData.consultantFee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 text-xs text-slate-500">
                        <input
                          type="checkbox"
                          name="isVerified"
                          checked={formData.isVerified}
                          onChange={handleInputChange}
                          className="rounded text-cyan-600"
                        />
                        <span>Verified Doctor</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-700">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span>{formatExperience(doctor.experience)} experience</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <BadgeDollarSign className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span>₹{doctor.consultantFee || 'Not specified'} consultation fee</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        doctor.isVerified 
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doctor.isVerified ? 'Verified' : 'Pending Verification'}
                      </span>
                    </div>
                  </div>
                )}
          </div>

          {/* Qualifications */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">Qualifications</h4>
            {/* ... qualifications fields ... */}
            {isEditMode ? (
                  <div>
                    <label className="text-xs text-slate-500">Comma separated list</label>
                    <input
                      type="text"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg mt-1"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {doctor.qualifications?.length > 0 ? (
                      doctor.qualifications.map((qual, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full"
                        >
                          {qual}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No qualifications added</p>
                    )}
                  </div>
                )}
          </div>

          {/* Availability */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">Availability</h4>
            {/* ... availability fields ... */}
             {isEditMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Days (comma separated)</label>
                      <input
                        type="text"
                        name="days"
                        value={formData.available.days}
                        onChange={handleAvailabilityChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                        placeholder="Monday, Wednesday, Friday"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Time</label>
                      <input
                        type="text"
                        name="time"
                        value={formData.available.time}
                        onChange={handleAvailabilityChange}
                        className="w-full px-3 py-1 text-sm border border-slate-200 rounded-lg"
                        placeholder="9:00 AM - 5:00 PM"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-700">
                        {formatAvailability(doctor)}
                      </p>
                    </div>
                  </div>
                )}
          </div>
        </div>

        {/* Modal footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          {isEditMode ? (
            <>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditMode(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

  // Get unique specialties from the fetched doctors data
  const specialties = useMemo(() => {
    const uniqueSpecialties = [...new Set(newdoctors.map(doctor => doctor.specialty))];
    return ['all', ...uniqueSpecialties];
  }, [newdoctors]);

  // Filter and search logic
  const filteredDoctors = useMemo(() => {
    return newdoctors.filter(doctor => {
      // Search filter - check name, email, specialty, and location
      const matchesSearch = searchTerm === '' || 
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.hospitalAddress && doctor.hospitalAddress.toLowerCase().includes(searchTerm.toLowerCase()));

      // Specialty filter
      const matchesSpecialty = filterSpecialty === 'all' || 
        doctor.specialty === filterSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [newdoctors, searchTerm, filterSpecialty]);

  // Calculate average rating (mock data since not in schema)
  const getAverageRating = (doctor) => {
    // In a real app, this would come from reviews data
    const baseRating = 3 + Math.random() * 2; // Random between 3-5
    return baseRating.toFixed(1);
  };

  // Format experience text
  const formatExperience = (years) => {
    if (years === 1) return '1 year';
    return `${years} years`;
  };

  // Format availability
  const formatAvailability = (doctor) => {
    if (!doctor.available) return 'Not specified';
    return `${doctor.available.days?.join(', ')} at ${doctor.available.time}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 ">Doctor Management</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Loading...' : 
              filteredDoctors.length !== newdoctors.length 
                ? `Showing ${filteredDoctors.length} of ${newdoctors.length} doctors` 
                : `Managing ${newdoctors.length} doctors`
            }
          </p>
        </div>
        <a
          href="/admin/doctors/add"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-xl hover:from-teal-700 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Doctor
        </a>
      </div>

      {/* Filters */}
      <div className="bg-white  rounded-2xl p-6 border border-slate-200  shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 " />
            <input
              type="text"
              placeholder="Search by name, specialty, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50  border border-slate-200  rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                       transition-all duration-200 text-slate-900  placeholder-slate-400 "
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500 " />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="px-3 py-2 bg-slate-50  border border-slate-200  rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                       transition-all duration-200 text-slate-900 "
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
          {(searchTerm || filterSpecialty !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterSpecialty('all');
              }}
              className="px-3 py-2 text-sm text-slate-600  hover:text-slate-800  bg-slate-100  hover:bg-slate-200  rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-slate-100  rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
          <h3 className="text-lg font-medium text-slate-900  mt-4">Loading Doctors</h3>
          <p className="text-slate-500  mt-2">Please wait while we fetch the latest data</p>
        </div>
      )}

      {/* Doctors Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 group"
            >
              {/* Doctor Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 flex items-center justify-center overflow-hidden shadow-md">
                    {doctor.profileImage ? (
                      <img 
                        src={doctor.profileImage} 
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                        className='h-full w-full object-cover' 
                      />
                    ) : (
                      <span className="text-white font-semibold text-lg">
                        {doctor.firstName?.[0]}{doctor.lastName?.[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-sm text-cyan-600 font-medium">{doctor.specialty}</p>
                    {doctor.supSpeciality && (
                      <p className="text-xs text-slate-500">{doctor.supSpeciality}</p>
                    )}
                  </div>
                </div>

                {/* Actions Dropdown */}
                <div className="relative">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-2 text-slate-400" />
                  <span>{doctor.phone}</span>
                </div>
                {doctor.hospital && (
                  <div className="flex items-center text-sm text-slate-600">
                    <Stethoscope className="h-4 w-4 mr-2 text-slate-400" />
                    <span className="truncate">{doctor.hospital}</span>
                  </div>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {/* Experience */}
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                    <span>{formatExperience(doctor.experience)}</span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="h-4 w-4 mr-1 text-amber-400 fill-current" />
                    <span>{getAverageRating(doctor)}</span>
                  </div>
                </div>

                {/* Verification Badge */}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doctor.isVerified 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {doctor.isVerified ? 'Verified' : 'Pending'}
                </span>
              </div>

              {/* Fee */}
              {doctor.consultantFee && (
                <div className="flex items-center text-sm text-slate-600 mb-4">
                  <BadgeDollarSign className="h-4 w-4 mr-2 text-slate-400" />
                  <span>₹{doctor.consultantFee} consultation fee</span>
                </div>
              )}

              {/* Qualifications Pills */}
              {doctor.qualifications && doctor.qualifications.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {doctor.qualifications.slice(0, 3).map((qual, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                    >
                      {qual}
                    </span>
                  ))}
                  {doctor.qualifications.length > 3 && (
                    <span className="text-xs text-slate-500 px-2 py-1">
                      +{doctor.qualifications.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsModalOpen(true);
                    setIsEditMode(false);
                  }}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsModalOpen(true);
                    setIsEditMode(true);
                  }}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteModal({ isOpen: true, doctor })}
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredDoctors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <div className="h-24 w-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchTerm || filterSpecialty !== 'all' ? 'No doctors found' : 'No doctors yet'}
          </h3>
          <p className="text-slate-500 mb-6">
            {searchTerm || filterSpecialty !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first doctor to the system'
            }
          </p>
          {(!searchTerm && filterSpecialty === 'all') && (
            <a
              href="/admin/doctors/add"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-xl hover:from-teal-700 hover:to-cyan-600 transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add First Doctor
            </a>
          )}
        </div>
      )}

      {/* Doctor Details Modal */}
      {isModalOpen && selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDoctor(null);
            setIsEditMode(false);
          }}
          onEdit={() => setIsEditMode(true)}
          onSave={async (formattedData) => {
            try {
              // Update doctor via API
              await axios.put(
                `https://practo-backend.vercel.app/api/doctor/update/${selectedDoctor._id}`,
                formattedData
              );
              
              // Update local state
              setDoctors(prev => prev.map(d => 
                d._id === selectedDoctor._id ? { ...d, ...formattedData } : d
              ));
              
              // Update selected doctor for modal
              setSelectedDoctor({ ...selectedDoctor, ...formattedData });
              
              // Exit edit mode
              setIsEditMode(false);
              
              console.log('Doctor updated successfully');
            } catch (error) {
              console.error('Error updating doctor:', error);
              // Handle error (you can add error state/toast here)
            }
          }}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <DeleteConfirmationModal
          doctor={deleteModal.doctor}
          onClose={() => setDeleteModal({ isOpen: false, doctor: null })}
          onConfirm={() => handleDeleteDoctor(deleteModal.doctor)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}