'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import DoctorsList from '@/components/DoctorsList';

export default function FindDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const specialties = [
    'Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic',
    'Pediatrician', 'Gynecologist', 'ENT Specialist', 'General Physician'
  ];

  const locations = ['New York', 'Boston', 'Chicago', 'Los Angeles', 'San Francisco', 'Seattle'];

  // Fetch doctors from API
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (searchQuery) params.append('searchQuery', searchQuery);
      specialtyFilter.forEach(spec => params.append('specialty', spec));
      locationFilter.forEach(loc => params.append('location', loc));
      if (availabilityFilter) params.append('availability', availabilityFilter);
      if (ratingFilter) params.append('rating', ratingFilter);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors?${query.toString()}`);
    
      const data = await res.json();

      setDoctors(data.doctors || []);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch on filter change
  useEffect(() => {
    fetchDoctors();
  }, [specialtyFilter, locationFilter, availabilityFilter, ratingFilter]);

  // Manual trigger for search
  const handleSearch = () => {
    fetchDoctors();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Find the Best Doctors Near You</h1>
          <p className="text-xl mb-8">
            Book appointments with top-rated, qualified doctors for all your healthcare needs
          </p>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for doctors, specialties..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="relative flex-grow w-full">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                  value={locationFilter.join(', ')}
                  readOnly
                />
              </div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full md:w-auto"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Doctors List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <h3 className="font-medium text-lg mb-4">Filter Doctors</h3>

              {/* Specialty Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialty</h4>
                <div className="space-y-2">
                  {specialties.map((spec) => (
                    <div key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`spec-${spec}`}
                        checked={specialtyFilter.includes(spec)}
                        onChange={() => 
                          setSpecialtyFilter(prev => 
                            prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
                          )
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`spec-${spec}`} className="ml-2 text-sm text-gray-700">
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <div key={loc} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`loc-${loc}`}
                        checked={locationFilter.includes(loc)}
                        onChange={() =>
                          setLocationFilter(prev =>
                            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
                          )
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`loc-${loc}`} className="ml-2 text-sm text-gray-700">
                        {loc}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">Any Time</option>
                  <option value="today">Available Today</option>
                  <option value="week">This Week</option>
                  <option value="weekend">Weekend</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                        {Array(rating).fill().map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {rating === 4 ? ' & Up' : ''}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {specialtyFilter.length ? `${specialtyFilter.join(', ')} Doctors` : 'All Doctors'}
                {locationFilter.length > 0 && ` in ${locationFilter.join(', ')}`}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border border-gray-300 rounded-md p-2 text-sm">
                  <option>Relevance</option>
                  <option>Rating (High to Low)</option>
                  <option>Experience</option>
                  <option>Price (Low to High)</option>
                </select>
              </div>
            </div>

            
<DoctorsList doctors={doctors} loading={loading} />


          </div>
        </div>
      </div>
    </div>
  );
}
