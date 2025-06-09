import { FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi'
import { FaHeartbeat, FaClinicMedical } from 'react-icons/fa'
import Card from '@/components/Card'
import StatCard from '@/components/StatCard'
import AppointmentCard from '@/components/AppointmentCard'

export default function DashboardPage() {
  const stats = [
    { title: 'Upcoming Appointments', value: 2, icon: <FiCalendar className="text-blue-500" />, trend: 'up' },
    { title: 'Active Prescriptions', value: 3, icon: <FaClinicMedical className="text-green-500" />, trend: 'same' },
    { title: 'Health Metrics', value: 'Normal', icon: <FaHeartbeat className="text-purple-500" />, trend: 'down' },
    { title: 'Pending Actions', value: 1, icon: <FiAlertCircle className="text-yellow-500" />, trend: 'up' },
  ]

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2023-06-15', time: '10:30 AM', status: 'confirmed' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2023-06-20', time: '2:15 PM', status: 'pending' },
  ]

  const healthTips = [
    'Remember to take your medication at the same time every day',
    'Stay hydrated - aim for 8 glasses of water daily',
    'Schedule your annual physical exam',
    'Practice deep breathing exercises for stress management'
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiClock className="text-gray-400" />
          <span>Last updated: Today, 10:45 AM</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <Card title="Upcoming Appointments" action={{ text: 'View All', href: '/dashboard/appointments' }}>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} {...appointment} />
              ))}
            </div>
          </Card>
        </div>

        {/* Health Tips */}
        <div>
          <Card title="Health Tips">
            <ul className="space-y-3">
              {healthTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}