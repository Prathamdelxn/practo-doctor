'use client'
import { Users, UserPlus, Activity, TrendingUp, Calendar, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      name: 'Total Doctors',
      value: '124',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'New This Month',
      value: '8',
      change: '+23%',
      changeType: 'increase',
      icon: UserPlus,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Active Today',
      value: '89',
      change: '+5%',
      changeType: 'increase',
      icon: Activity,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Specializations',
      value: '15',
      change: '+2',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const recentDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', status: 'Active', joinDate: '2024-01-10' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', status: 'Pending', joinDate: '2024-01-08' },
    { id: 4, name: 'Dr. David Kim', specialty: 'Orthopedics', status: 'Active', joinDate: '2024-01-05' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your doctors today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          {/* <span>Last updated: {new Date().toLocaleDateString()}</span> */}
          <span>Last updated: 11 May 2025</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 card-hover shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Doctors */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Doctors</h2>
            <a href="/admin/doctors" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recentDoctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    doctor.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doctor.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{doctor.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/doctors/add"
              className="flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 card-hover"
            >
              <UserPlus className="h-5 w-5 mr-3" />
              <span className="font-medium">Add New Doctor</span>
            </a>
            <a
              href="/admin/doctors"
              className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5 mr-3 text-gray-600" />
              <span className="text-gray-700 font-medium">Manage Doctors</span>
            </a>
            <a
              href="/admin/analytics"
              className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <TrendingUp className="h-5 w-5 mr-3 text-gray-600" />
              <span className="text-gray-700 font-medium">View Analytics</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
