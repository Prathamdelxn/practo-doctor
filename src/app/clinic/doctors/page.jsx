'use client'
import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Star, 
  Calendar, 
  Award, 
  MapPin, 
  Edit, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  Filter,
  MoreVertical,
  Stethoscope,
  BadgePlus,
  FileText,
  UserCheck,
  Clock
} from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  Active: 'bg-emerald-100 text-emerald-800',
  'On Leave': 'bg-amber-100 text-amber-800',
  'In Surgery': 'bg-purple-100 text-purple-800',
  'On Vacation': 'bg-blue-100 text-blue-800'
};

export default function DoctorsPage() {
  const [query, setQuery] = useState('');
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const filters = ['All', 'Active', 'On Leave', 'Cardiologist', 'Dermatologist'];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const data = JSON.parse(savedUser);
    fetchDoctors(data.id);
  }, []);

  const fetchDoctors = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://practo-backend.vercel.app/api/clinic/fetch-doctor-clinicId/${id}`);
      if (!response.ok) throw new Error('Failed to fetch doctors');
      const data = await response.json();
      
      const transformedDoctors = data.doctor.map(doc => ({
        id: doc._id || doc.id,
        name: `${doc.firstName} ${doc.lastName}`,
        specialty: doc.specialty,
        experience: `${doc.experience} Years`,
        rating: 4.5,
        location: doc.hospitalAddress,
        availability: doc.available?.days || ['Mon', 'Wed', 'Fri'],
        degrees: doc.qualifications || [],
        fee: `₹${doc.consultantFee}`,
        status: doc.status || "Active",
        phone: doc.phone,
        email: doc.email,
        image: doc.profileImage || '/doctors/default-doctor.jpg',
        bio: `Specialist in ${doc.specialty} with ${doc.experience} years of experience at ${doc.hospital}.`,
        languages: ['English', 'Hindi']
      }));
      
      setDoctors(transformedDoctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch = 
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.location.toLowerCase().includes(query.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'All' || 
      d.status === activeFilter || 
      d.specialty === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleExpand = (id) => {
    setExpandedDoctor(expandedDoctor === id ? null : id);
  };

  const toggleActionMenu = (id) => {
    setActionMenu(actionMenu === id ? null : id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-gray-500 mt-1">Manage your medical professionals and their profiles</p>
          </div>
          <div className="flex gap-3">
            <Link href="/clinic/doctors/schedule">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-xs">
                <Calendar className="w-5 h-5" />
                <span>View Schedules</span>
              </button>
            </Link>
            <Link href="/clinic/doctors/add">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                <BadgePlus className="w-5 h-5" />
                <span>Add Doctor</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-xs">
            <p className="text-sm text-blue-600">Total Doctors</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{doctors.length}</h3>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-xs">
            <p className="text-sm text-green-600">Active Today</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {doctors.filter(d => d.status === 'Active').length}
            </h3>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-xs">
            <p className="text-sm text-purple-600">Specialties</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {[...new Set(doctors.map(d => d.specialty))].length}
            </h3>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 shadow-xs">
            <p className="text-sm text-amber-600">On Leave</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {doctors.filter(d => d.status === 'On Leave').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name, specialty or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <button 
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 w-full md:w-auto"
              onClick={() => setActiveFilter('All')}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 hidden">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`w-full text-left px-4 py-2 text-sm ${activeFilter === filter ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.map(filter => (
            <button
              key={filter}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${activeFilter === filter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="space-y-4">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:shadow-sm">
              {/* Compact View */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/doctors/default-doctor.jpg';
                      }}
                    />
                    <span className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                      {doc.status}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 font-medium">{doc.specialty}</span>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-gray-700 ml-1">{doc.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleExpand(doc.id)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          {expandedDoctor === doc.id ? 
                            <ChevronUp className="w-5 h-5" /> : 
                            <ChevronDown className="w-5 h-5" />
                          }
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => toggleActionMenu(doc.id)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          {actionMenu === doc.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                              <div className="py-1">
                                <Link href={`/clinic/doctors/${doc.id}/edit`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                  <Edit className="w-4 h-4 mr-2 text-blue-600" />
                                  Edit Profile
                                </Link>
                                <Link href={`/clinic/doctors/${doc.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                  <Eye className="w-4 h-4 mr-2 text-blue-600" />
                                  View Details
                                </Link>
                                <a
                                  href={`tel:${doc.phone}`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                >
                                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                                  Call Doctor
                                </a>
                                <a
                                  href={`mailto:${doc.email}`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                >
                                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                                  Send Email
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {doc.availability.map(day => (
                        <span key={day} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {day}
                        </span>
                      ))}
                      <span className="bg-green-50 text-green-600 text-xs px-2.5 py-1 rounded-full">
                        {doc.fee} consultation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded View */}
              {expandedDoctor === doc.id && (
                <div className="border-t border-gray-200 bg-blue-50/30 p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="text-blue-600" />
                        Professional Information
                      </h3>
                      <p className="text-gray-700 mb-4">{doc.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Qualifications</h4>
                          <p className="text-gray-700">{doc.degrees.join(', ')}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Experience</h4>
                          <p className="text-gray-700">{doc.experience}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Languages</h4>
                          <p className="text-gray-700">{doc.languages.join(', ')}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                            <span className="text-gray-700">{doc.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <UserCheck className="text-blue-600" />
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-blue-500 mr-2" />
                            <a href={`tel:${doc.phone}`} className="text-blue-600 hover:underline">{doc.phone}</a>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 text-blue-500 mr-2" />
                            <a href={`mailto:${doc.email}`} className="text-blue-600 hover:underline">{doc.email}</a>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="text-gray-700">{doc.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <Link href={`/clinic/doctors/${doc.id}/edit`}>
                          <button className="w-full flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                            <Edit className="w-5 h-5" />
                            Edit Profile
                          </button>
                        </Link>
                        <Link href={`/clinic/doctors/${doc.id}`}>
                          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                            <Eye className="w-5 h-5" />
                            View Full Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xs text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-3 text-lg font-medium text-gray-900">No doctors found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <div className="mt-6">
            <Link href="/clinic/doctors/add">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="w-5 h-5" />
                Add New Doctor
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}