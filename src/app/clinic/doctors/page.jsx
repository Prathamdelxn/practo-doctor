'use client';
import { useState } from 'react';
import { Search, Plus, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15+ Years',
    rating: 4.9,
    location: 'Apollo Hospital, New York',
    availability: ['Mon', 'Wed', 'Fri'],
    degrees: ['MBBS', 'MD'],
    fee: '$100',
    status: 'Active',
    phone: '1234567890',
    email: 'sarah.j@clinic.com',
    image: '/doctors/doctor-1.jpg'
  },
  {
    id: 2,
    name: 'Dr. Alan Smith',
    specialty: 'Dermatologist',
    experience: '10 Years',
    rating: 4.6,
    location: 'City Clinic, LA',
    availability: ['Tue', 'Thu'],
    degrees: ['MBBS', 'DDVL'],
    fee: '$80',
    status: 'On Leave',
    phone: '9876543210',
    email: 'alan.s@clinic.com',
    image: '/doctors/doctor-2.jpg'
  }
];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  'On Leave': 'bg-yellow-100 text-yellow-800'
};

export default function DoctorsPage() {
  const [query, setQuery] = useState('');

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.specialty.toLowerCase().includes(query.toLowerCase()) ||
    d.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Doctor Management</h2>
        <Link href="/clinic/doctors/add">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700">
            <Plus className="w-5 h-5" /> Add Doctor
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-md px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-indigo-100 hover:bg-indigo-200 rounded-lg p-4 shadow-sm transition-colors duration-200"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
                onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/doctors/default.jpg';
            }}
              loading="lazy"
            />

              <div>
                <h3 className="font-semibold text-lg text-gray-800">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.specialty}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Location:</span> {doc.location}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Experience:</span> {doc.experience}
            </p>
            <p className={`inline-block text-xs px-2 py-1 rounded ${statusColors[doc.status]}`}>
              {doc.status}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${doc.phone}`}
                className="bg-white hover:bg-gray-100 border text-teal-700 text-sm px-3 py-1 rounded flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`mailto:${doc.email}`}
                className="bg-white hover:bg-gray-100 border text-teal-700 text-sm px-3 py-1 rounded flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-gray-500 mt-8 text-center">No doctors found.</p>
      )}
    </div>
  );
}
