'use client';
import { useState } from 'react';
import { Search, Plus, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const receptionists = [
  {
    id: 1,
    name: 'Lisa Wong',
    email: 'lisa.wong@clinic.com',
    phone: '9876543210',
    shift: 'Morning (8AM-4PM)',
    status: 'Active',
    image: '/staff/receptionist-1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@clinic.com',
    phone: '8765432109',
    shift: 'Evening (4PM-12AM)',
    status: 'Active',
    image: '/staff/receptionist-2.jpg'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah.j@clinic.com',
    phone: '7654321098',
    shift: 'Night (12AM-8AM)',
    status: 'On Leave',
    image: '/staff/receptionist-3.jpg'
  }
];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  'On Leave': 'bg-yellow-100 text-yellow-800'
};

export default function ReceptionistsPage() {
  const [query, setQuery] = useState('');

  const filtered = receptionists.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.email.toLowerCase().includes(query.toLowerCase()) ||
    r.phone.includes(query)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Receptionist Management</h2>
        <Link href="/clinic/receptionists/add">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
            <Plus className="w-5 h-5" /> Add Receptionist
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search receptionist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-indigo-100 hover:bg-indigo-200 rounded-lg p-4 shadow-sm transition-colors duration-200"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={r.image}
                alt={r.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/staff/default.jpg';
                }}
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{r.name}</h3>
                <p className="text-sm text-gray-600">{r.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Phone:</span> {r.phone}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Shift:</span> {r.shift}
            </p>
            <p className={`inline-block text-xs px-2 py-1 rounded ${statusColors[r.status]}`}>
              {r.status}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${r.phone}`}
                className="bg-white hover:bg-gray-100 border text-indigo-700 text-sm px-3 py-1 rounded flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`mailto:${r.email}`}
                className="bg-white hover:bg-gray-100 border text-indigo-700 text-sm px-3 py-1 rounded flex items-center gap-1"
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
        <p className="text-gray-500 mt-8 text-center">No receptionists found.</p>
      )}
    </div>
  );
}
