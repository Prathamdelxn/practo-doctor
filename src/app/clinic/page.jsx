'use client'
import { Users, UserPlus, Activity, Calendar, Stethoscope, ClipboardList, Clock, Bell, BadgePlus } from 'lucide-react'

export default function ClinicDashboard() {
  const stats = [
    {
      name: 'Total Doctors',
      value: '18',
      change: '+2 this month',
      icon: Stethoscope,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Reception Staff',
      value: '6',
      change: '+1 new hire',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Today\'s Appointments',
      value: '47',
      change: '12 upcoming',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Pending Tasks',
      value: '9',
      change: '3 high priority',
      icon: ClipboardList,
      color: 'bg-amber-100 text-amber-600'
    }
  ]

  const staffActions = [
    {
      title: 'Manage Doctors',
      description: 'View and edit doctor profiles',
      icon: Stethoscope,
      link: '/clinic/doctors',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Manage Receptionists',
      description: 'Handle front desk staff',
      icon: BadgePlus,
      link: '/clinic/receptionists',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Schedule Management',
      description: 'Set working hours',
      icon: Clock,
      link: '/clinic/schedule',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Staff Directory',
      description: 'All clinic personnel',
      icon: Users,
      link: '/clinic/staff',
      color: 'bg-amber-50 text-amber-600'
    }
  ]

  const recentActivity = [
    { 
      id: 1, 
      type: 'Appointment', 
      description: 'Dr. Chen added new patient', 
      time: '10 mins ago',
      icon: Calendar,
      color: 'text-purple-500'
    },
    { 
      id: 2, 
      type: 'Staff', 
      description: 'New receptionist onboarded', 
      time: '2 hours ago',
      icon: UserPlus,
      color: 'text-green-500'
    },
    { 
      id: 3, 
      type: 'Doctor', 
      description: 'Dr. Rodriguez updated availability', 
      time: 'Yesterday',
      icon: Stethoscope,
      color: 'text-blue-500'
    },
    { 
      id: 4, 
      type: 'System', 
      description: 'Monthly backup completed', 
      time: '2 days ago',
      icon: ClipboardList,
      color: 'text-amber-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Clinic Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Clinic Overview</h1>
          <p className="text-blue-600 mt-1">Welcome to your clinic management dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm bg-white px-3 py-1.5 rounded-lg border">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <button className="p-2 rounded-full bg-white border hover:bg-gray-50 relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>

      {/* Clinic Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Management Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Staff Actions */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Staff Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staffActions.map((action, index) => (
                <a 
                  key={index}
                  href={action.link}
                  className="group p-4 border rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${action.color} group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Appointments (Simplified) */}
          <div className="bg-white rounded-xl border p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>
              <a href="/clinic/appointments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </a>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Dr. {['Smith', 'Johnson', 'Lee'][item-1]}</p>
                      <p className="text-sm text-gray-500">{['10:00 AM', '11:30 AM', '2:15 PM'][item-1]} • {['Checkup', 'Follow-up', 'Consultation'][item-1]}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Confirmed</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity and Quick Links */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className={`p-2 rounded-lg ${activity.color} bg-opacity-20`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{activity.type}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <a href="/clinic/doctors/schedule" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="font-medium">Doctor Schedules</span>
              </a>
              <a href="/clinic/receptionists/shifts" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="font-medium">Reception Shifts</span>
              </a>
              <a href="/clinic/reports/monthly" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <span className="font-medium">Monthly Reports</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}