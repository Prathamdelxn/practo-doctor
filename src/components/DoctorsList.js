'use client';

import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15+ Years Experience',
    rating: 4.9,
    reviews: 124,
    location: 'Apollo Hospital, New York',
    availableToday: true,
    consultationFee: '$150',
    image: '/doctor1.jpg',
    languages: ['English', 'Spanish'],
    availability: ['Mon, Wed, Fri: 9am-5pm', 'Tue, Thu: 11am-7pm']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12+ Years Experience',
    rating: 4.8,
    reviews: 98,
    location: 'Memorial Hospital, Boston',
    availableToday: true,
    consultationFee: '$180',
    image: '/doctor2.jpg',
    languages: ['English', 'Mandarin'],
    availability: ['Mon-Fri: 8am-4pm']
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Dermatologist',
    experience: '8+ Years Experience',
    rating: 4.7,
    reviews: 86,
    location: 'City Medical Center, Chicago',
    availableToday: false,
    consultationFee: '$130',
    image: '/doctor3.jpg',
    languages: ['English'],
    availability: ['Mon, Tue, Thu: 10am-6pm', 'Sat: 9am-1pm']
  },
  {
    id: 4,
    name: 'Dr. David Rodriguez',
    specialty: 'Orthopedic Surgeon',
    experience: '20+ Years Experience',
    rating: 4.9,
    reviews: 215,
    location: 'General Hospital, Los Angeles',
    availableToday: true,
    consultationFee: '$200',
    image: '/doctor4.jpg',
    languages: ['English', 'Spanish'],
    availability: ['Mon, Wed, Fri: 8am-5pm']
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Gynecologist',
    experience: '10+ Years Experience',
    rating: 4.6,
    reviews: 74,
    location: 'Women\'s Clinic, San Francisco',
    availableToday: true,
    consultationFee: '$170',
    image: '/doctor5.jpg',
    languages: ['English', 'French'],
    availability: ['Tue, Thu: 9am-5pm', 'Wed: 12pm-8pm']
  },
  {
    id: 6,
    name: 'Dr. James Wilson',
    specialty: 'Pediatrician',
    experience: '14+ Years Experience',
    rating: 4.7,
    reviews: 143,
    location: 'Children\'s Hospital, Seattle',
    availableToday: true,
    consultationFee: '$140',
    image: '/doctor6.jpg',
    languages: ['English'],
    availability: ['Mon-Fri: 8am-4pm']
  }
];

export default function DoctorsList({ 
  searchQuery, 
  specialtyFilter = [], 
  locationFilter = [], 
  availabilityFilter, 
  ratingFilter 
}) {
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      !searchQuery ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      specialtyFilter.length === 0 ||
      specialtyFilter.some(s => doctor.specialty.toLowerCase().includes(s.toLowerCase()));

    const matchesLocation =
      locationFilter.length === 0 ||
      locationFilter.some(l => doctor.location.toLowerCase().includes(l.toLowerCase()));

    const matchesAvailability =
      !availabilityFilter ||
      (availabilityFilter === 'today' && doctor.availableToday);

    const matchesRating =
      !ratingFilter || doctor.rating >= ratingFilter;

    return (
      matchesSearch &&
      matchesSpecialty &&
      matchesLocation &&
      matchesAvailability &&
      matchesRating
    );
  });

  return (
    <div className="space-y-6">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="h-32 w-32 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                      Doctor
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600">{doctor.specialty}</p>
                      <p className="text-gray-500 text-sm mt-1">{doctor.experience}</p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-sm font-medium text-gray-900">{doctor.rating}</span>
                        </div>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{doctor.reviews} reviews</span>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{doctor.languages.join(', ')}</span>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{doctor.availability[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <span className="text-lg font-medium text-gray-900">{doctor.consultationFee}</span>
                      {doctor.availableToday && (
                        <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available Today
                        </span>
                      )}
                      <Link
                        href={`/doctors/${doctor.id}`}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}