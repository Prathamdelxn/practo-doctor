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
  GraduationCap
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
              className="bg-white  rounded-2xl p-6 border border-slate-200  shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Doctor Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative h-14 w-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 flex items-center justify-center overflow-hidden shadow-md">
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
                    {/* Online status indicator */}
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900  capitalize group-hover:text-cyan-600  transition-colors">
                      {doctor.firstName} {doctor.lastName}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-sm text-cyan-600  font-medium">
                        {doctor.specialty}
                      </p>
                      {doctor.supSpeciality && (
                        <span className="ml-2 text-xs bg-cyan-100  text-cyan-800  px-2 py-0.5 rounded-full">
                          {doctor.supSpeciality}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium text-slate-900 ">
                      {getAverageRating(doctor)}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-slate-100  rounded-lg transition-colors">
                    <MoreVertical className="h-4 w-4 text-slate-500 " />
                  </button>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-slate-600 ">
                  <Mail className="h-4 w-4 mr-2 text-slate-400  flex-shrink-0" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600 ">
                  <Phone className="h-4 w-4 mr-2 text-slate-400  flex-shrink-0" />
                  {doctor.phone}
                </div>
                {doctor.hospitalAddress && (
                  <div className="flex items-center text-sm text-slate-600 ">
                    <MapPin className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{doctor.hospitalAddress}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-slate-600 ">
                  <Stethoscope className="h-4 w-4 mr-2 text-slate-400  flex-shrink-0" />
                  <span>{doctor.hospital}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-slate-50  rounded-xl">
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-900 ">
                    {doctor.patients || Math.floor(Math.random() * 200) + 50}
                  </p>
                  <p className="text-xs text-slate-500  flex items-center justify-center">
                    <User className="h-3 w-3 mr-1" /> Patients
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-900 ">
                    {formatExperience(doctor.experience)}
                  </p>
                  <p className="text-xs text-slate-500  flex items-center justify-center">
                    <Calendar className="h-3 w-3 mr-1" /> Experience
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-900 ">
                    ₹{doctor.consultantFee || Math.floor(Math.random() * 200) + 50}
                  </p>
                  <p className="text-xs text-slate-500  flex items-center justify-center">
                    <BadgeDollarSign className="h-3 w-3 mr-1" /> Fee
                  </p>
                </div>
              </div>

              {/* Qualifications */}
              {doctor.qualifications?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-500  uppercase tracking-wider mb-1 flex items-center">
                    <GraduationCap className="h-3 w-3 mr-1" /> Qualifications
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.qualifications.map((qual, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-cyan-100  text-cyan-800  px-2 py-1 rounded-full"
                      >
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-500  uppercase tracking-wider mb-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Availability
                </h4>
                <p className="text-sm text-slate-700 ">
                  {formatAvailability(doctor)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 ">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  doctor.isVerified 
                    ? 'bg-emerald-100  text-emerald-800 '
                    : 'bg-amber-100  text-amber-800 '
                }`}>
                  {doctor.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 hover:bg-cyan-50  text-cyan-600  rounded-lg transition-colors tooltip"
                    data-tooltip="View Profile"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 hover:bg-blue-50  text-blue-600 rounded-lg transition-colors tooltip"
                    data-tooltip="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 hover:bg-rose-50  text-rose-600  rounded-lg transition-colors tooltip"
                    data-tooltip="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results state */}
      {!loading && filteredDoctors.length === 0 && newdoctors.length > 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-slate-100  rounded-full flex items-center justify-center">
            <Search className="h-12 w-12 text-slate-400 " />
          </div>
          <h3 className="text-lg font-medium text-slate-900  mt-4">No matching doctors found</h3>
          <p className="text-slate-500  mt-2">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterSpecialty('all');
            }}
            className="mt-4 px-4 py-2 bg-cyan-100  text-cyan-700  rounded-lg hover:bg-cyan-200  transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && newdoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-slate-100  rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-slate-400 " />
          </div>
          <h3 className="text-lg font-medium text-slate-900  mt-4">No doctors registered yet</h3>
          <p className="text-slate-500 mt-2">
            Get started by adding your first doctor
          </p>
          <a
            href="/admin/doctors/add"
            className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-xl hover:from-teal-700 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Doctor
          </a>
        </div>
      )}
    </div>
  )
}