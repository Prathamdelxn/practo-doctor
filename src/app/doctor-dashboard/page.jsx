'use client'

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Users, Activity, Clock, TrendingUp, AlertCircle, Heart, Stethoscope } from 'lucide-react';

const DoctorAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Sample data for charts
  const patientVisitsData = [
    { day: 'Mon', visits: 12, consultations: 8 },
    { day: 'Tue', visits: 15, consultations: 12 },
    { day: 'Wed', visits: 18, consultations: 14 },
    { day: 'Thu', visits: 22, consultations: 18 },
    { day: 'Fri', visits: 25, consultations: 20 },
    { day: 'Sat', visits: 10, consultations: 8 },
    { day: 'Sun', visits: 5, consultations: 4 }
  ];

  const conditionsData = [
    { name: 'Hypertension', value: 35, color: '#3B82F6' },
    { name: 'Diabetes', value: 28, color: '#EF4444' },
    { name: 'Common Cold', value: 20, color: '#10B981' },
    { name: 'Anxiety', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 15, color: '#8B5CF6' }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', patients: 145, revenue: 28500 },
    { month: 'Feb', patients: 162, revenue: 31200 },
    { month: 'Mar', patients: 178, revenue: 34600 },
    { month: 'Apr', patients: 195, revenue: 38200 },
    { month: 'May', patients: 210, revenue: 41800 },
    { month: 'Jun', patients: 188, revenue: 37600 }
  ];

  const appointmentStatusData = [
    { status: 'Completed', count: 85, color: '#10B981' },
    { status: 'Scheduled', count: 24, color: '#3B82F6' },
    { status: 'Cancelled', count: 8, color: '#EF4444' },
    { status: 'No Show', count: 5, color: '#6B7280' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Stethoscope className="text-blue-600" />
                Doctor Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive overview of your practice performance</p>
            </div>
            <div className="flex gap-2">
              {['day', 'week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">1,247</p>
                <p className="text-green-600 text-sm font-medium flex items-center gap-1 mt-1">
                  <TrendingUp size={16} />
                  +12% from last month
                </p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Appointments Today</p>
                <p className="text-3xl font-bold text-gray-800">18</p>
                <p className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1">
                  <Calendar size={16} />
                  3 remaining
                </p>
              </div>
              <Calendar className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Wait Time</p>
                <p className="text-3xl font-bold text-gray-800">12m</p>
                <p className="text-green-600 text-sm font-medium flex items-center gap-1 mt-1">
                  <TrendingUp size={16} />
                  -5min improvement
                </p>
              </div>
              <Clock className="text-orange-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Critical Alerts</p>
                <p className="text-3xl font-bold text-gray-800">3</p>
                <p className="text-red-600 text-sm font-medium flex items-center gap-1 mt-1">
                  <AlertCircle size={16} />
                  Requires attention
                </p>
              </div>
              <Heart className="text-red-500" size={32} />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Patient Visits Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Patient Visits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="consultations" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Common Conditions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Most Common Conditions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conditionsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conditionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Patient Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Appointment Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="count"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {appointmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Patient Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-700">Patient</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Condition</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Smith', condition: 'Hypertension', date: '2025-06-03', status: 'Completed', followUp: 'Yes' },
                  { name: 'Sarah Johnson', condition: 'Diabetes Check', date: '2025-06-03', status: 'In Progress', followUp: 'No' },
                  { name: 'Mike Wilson', condition: 'Annual Physical', date: '2025-06-02', status: 'Completed', followUp: 'Yes' },
                  { name: 'Emma Davis', condition: 'Cold Symptoms', date: '2025-06-02', status: 'Completed', followUp: 'No' },
                  { name: 'Robert Brown', condition: 'Back Pain', date: '2025-06-01', status: 'Completed', followUp: 'Yes' }
                ].map((patient, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{patient.name}</td>
                    <td className="py-3 px-4 text-gray-600">{patient.condition}</td>
                    <td className="py-3 px-4 text-gray-600">{patient.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.followUp === 'Yes' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.followUp}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAnalyticsDashboard;