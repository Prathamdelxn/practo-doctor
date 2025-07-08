'use client'
import { Users, UserPlus, Activity, TrendingUp, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [doctorsCount, setDoctorsCount] = useState(0)
  const [clinicsCount, setClinicsCount] = useState(0)
  const [recentClinics, setRecentClinics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch doctors count
        const doctorsResponse = await axios.get('https://practo-backend.vercel.app/api/doctor/fetchAll')
        setDoctorsCount(doctorsResponse.data.doctors.length)
        
        // Fetch clinics count and recent clinics
        const clinicsResponse = await axios.get('https://practo-backend.vercel.app/api/clinic/fetch-all-clinics')
        setClinicsCount(clinicsResponse.data.clinics.length)
        
        // Get the 4 most recently added clinics (sorted by creation date)
        const sortedClinics = [...clinicsResponse.data.clinics]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
        
        setRecentClinics(sortedClinics)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = [
    {
      name: 'Total Doctors',
      value: loading ? '...' : doctorsCount.toString(),
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Total Clinics',
      value: loading ? '...' : clinicsCount.toString(),
      change: '+23%',
      changeType: 'increase',
      icon: UserPlus,
      color: 'from-green-500 to-green-600'
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your clinics today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Clinics - Now taking full width */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Clinics</h2>
          <a 
            href="/admin/clinics" 
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
          >
            View all clinics
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : recentClinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentClinics.map((clinic) => (
              <div 
                key={clinic._id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-sm">
                      {clinic.clinicName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{clinic.clinicName}</p>
                    <p className="text-sm text-gray-500">{clinic.city}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate max-w-[180px]">{clinic.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{clinic.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-gray-200 rounded-lg">
            <p className="text-gray-500">No clinics found</p>
          </div>
        )}
      </div>
    </div>
  )
}