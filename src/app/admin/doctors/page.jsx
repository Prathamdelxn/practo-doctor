'use client'
import { useState } from 'react'
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
  MapPin
} from 'lucide-react'

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('all')

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      email: 'sarah.johnson@hospital.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'Active',
      patients: 145,
      experience: '12 years',
      joinDate: '2020-03-15',
      avatar: null
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      email: 'michael.chen@hospital.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      status: 'Active',
      patients: 98,
      experience: '8 years',
      joinDate: '2021-07-22',
      avatar: null
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      email: 'emily.rodriguez@hospital.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      status: 'Pending',
      patients: 67,
      experience: '5 years',
      joinDate: '2023-01-10',
      avatar: null
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Orthopedics',
      email: 'david.kim@hospital.com',
      phone: '+1 (555) 456-7890',
      location: 'Houston, TX',
      status: 'Active',
      patients: 112,
      experience: '15 years',
      joinDate: '2019-11-05',
      avatar: null
    }
  ]

  const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics']

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600 mt-1">Manage all doctors in your system</p>
        </div>
        <a
          href="/admin/doctors/add"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 card-hover"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Doctor
        </a>
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                       transition-all duration-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                       transition-all duration-200"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{doctor.specialty}</p>
                </div>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100/50 rounded-lg transition-colors">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {doctor.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {doctor.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {doctor.location}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50/50 rounded-xl">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{doctor.patients}</p>
                <p className="text-xs text-gray-500">Patients</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{doctor.experience}</p>
                <p className="text-xs text-gray-500">Experience</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                doctor.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {doctor.status}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mt-4">No doctors found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}