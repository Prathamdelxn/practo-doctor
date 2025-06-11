'use client';
import { useState ,useEffect} from 'react';
import { Search, Plus, Phone, Mail, Star, Calendar, Award, MapPin, Edit, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// const doctors = [
//   {
//     id: 1,
//     name: 'Dr. Sarah Johnson',
//     specialty: 'Cardiologist',
//     experience: '15+ Years',
//     rating: 4.9,
//     location: 'Apollo Hospital, New York',
//     availability: ['Mon', 'Wed', 'Fri'],
//     degrees: ['MBBS', 'MD'],
//     fee: '$100',
//     status: 'Active',
//     phone: '1234567890',
//     email: 'sarah.j@clinic.com',
//     image: '/doctors/doctor-1.jpg',
//     bio: 'Board-certified cardiologist with extensive experience in interventional procedures. Specializes in preventive cardiology and heart failure management.',
//     languages: ['English', 'Spanish']
//   },
//   {
//     id: 2,
//     name: 'Dr. Alan Smith',
//     specialty: 'Dermatologist',
//     experience: '10 Years',
//     rating: 4.6,
//     location: 'City Clinic, LA',
//     availability: ['Tue', 'Thu'],
//     degrees: ['MBBS', 'DDVL'],
//     fee: '$80',
//     status: 'On Leave',
//     phone: '9876543210',
//     email: 'alan.s@clinic.com',
//     image: '/doctors/doctor-2.jpg',
//     bio: 'Cosmetic dermatologist specializing in acne treatments and anti-aging procedures. Certified in laser therapies and skin rejuvenation.',
//     languages: ['English', 'French']
//   }
// ];

const statusColors = {
  Active: 'bg-emerald-100 text-emerald-800',
  'On Leave': 'bg-amber-100 text-amber-800'
};

export default function DoctorsPage() {
  const [query, setQuery] = useState('');
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);
const[doctors,setDoctors]=useState([]);
  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.specialty.toLowerCase().includes(query.toLowerCase()) ||
    d.location.toLowerCase().includes(query.toLowerCase())
  );
useEffect(() => {
    const savedUser = localStorage.getItem('user');
  const data=JSON.parse(savedUser);
    console.log("clinic user",data);
     fetchReceptionists(data.id);
   
    
  }, []);
  const fetchReceptionists = async (id) => {
  try {
    const response = await fetch(`https://practo-backend.vercel.app/api/clinic/fetch-doctor-clinicId/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch receptionists');
    }
    const data = await response.json();
    
    // Transform the API data to match your component's expected structure
    const transformedDoctors = data.doctor.map(doc => ({
      id: doc._id || doc.id, // Use whichever ID field your API returns
      name: `${doc.firstName} ${doc.lastName}`,
      specialty: doc.specialty,
      experience: `${doc.experience} Years`,
      rating: 4.5, // Default value since API doesn't provide this
      location: doc.hospitalAddress,
     availability: doc.available?.days || ['Mon', 'Wed', 'Fri'], // Default value
      degrees: doc.qualifications || [],
      fee: `₹${doc.consultantFee}`,
      status: "Active",
      phone: doc.phone,
      email: doc.email,
      image: doc.profileImage || '/doctors/default-doctor.jpg', // Fallback image
      bio: `Specialist in ${doc.specialty} with ${doc.experience} years of experience at ${doc.hospital}.`,
      languages: ['English'] // Default value
    }));
    
    setDoctors(transformedDoctors);
  } catch (err) {
    console.error('Error fetching receptionists:', err);
  } 
};
  const toggleExpand = (id) => {
    setExpandedDoctor(expandedDoctor === id ? null : id);
  };

  const toggleActionMenu = (id) => {
    setActionMenu(actionMenu === id ? null : id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-500 mt-1">Manage your medical professionals and their profiles</p>
        </div>
        <Link href="/clinic/doctors/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Plus className="w-5 h-5" /> Add Doctor
          </button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6">
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
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <span>Filters</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Doctor List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
          <div className="col-span-4 md:col-span-3">Doctor</div>
          <div className="col-span-3 md:col-span-2">Specialty</div>
          <div className="hidden md:block md:col-span-2">Status</div>
          <div className="hidden md:block md:col-span-2">Availability</div>
          <div className="col-span-5 md:col-span-3 text-right">Actions</div>
        </div>

        {/* Doctor Items */}
        {filtered.length > 0 ? (
          filtered.map((doc) => (
            <div key={doc.id} className="border-b border-gray-200 last:border-b-0">
              {/* Compact View */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-4 md:col-span-3 flex items-center gap-3">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                   
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.degrees.join(', ')}</p>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <p className="text-gray-700">{doc.specialty}</p>
                  <p className="text-sm text-gray-500 md:hidden">{doc.experience}</p>
                </div>
                <div className="hidden md:block md:col-span-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                    {doc.status}
                  </span>
                </div>
                <div className="hidden md:block md:col-span-2">
                  <div className="flex gap-1">
                    {doc.availability.map(day => (
                      <span key={day} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-5 md:col-span-3 flex justify-end gap-2">
                  <button 
                    onClick={() => toggleExpand(doc.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    {expandedDoctor === doc.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => toggleActionMenu(doc.id)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {actionMenu === doc.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <Link href={`/clinic/doctors/${doc.id}/edit`}>
                            <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Profile
                            </a>
                          </Link>
                          <Link href={`/clinic/doctors/${doc.id}`}>
                            <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </a>
                          </Link>
                          <a
                            href={`tel:${doc.phone}`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Doctor
                          </a>
                          <a
                            href={`mailto:${doc.email}`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded View */}
              {expandedDoctor === doc.id && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <h3 className="font-medium text-gray-900 mb-2">Professional Information</h3>
                      <p className="text-gray-700 mb-4">{doc.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Languages</h4>
                          <p className="text-gray-700">{doc.languages.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Consultation Fee</h4>
                          <p className="text-gray-700">{doc.fee}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Experience</h4>
                          <p className="text-gray-700">{doc.experience}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                            <span className="text-gray-700">{doc.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-400 mr-2" />
                          <a href={`tel:${doc.phone}`} className="text-blue-600 hover:underline">{doc.phone}</a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-400 mr-2" />
                          <a href={`mailto:${doc.email}`} className="text-blue-600 hover:underline">{doc.email}</a>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-gray-700">{doc.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Link href={`/clinic/doctors/${doc.id}/edit`}>
                          <button className="w-full bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                            Edit Profile
                          </button>
                        </Link>
                        <Link href={`/clinic/doctors/${doc.id}`}>
                          <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            View Full Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <div className="mt-6">
              <Link href="/clinic/doctors/add">
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Add New Doctor
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}