'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, MapPin, Clock, Award, HeartPulse, Calendar, ChevronLeft, User, MessageCircle, Shield, TrendingUp, Users, CheckCircle, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        let res = await fetch(`https://practo-backend.vercel.app/api/doctor/fetchOne/${id}`);
        
        if (!res.ok) {
          console.log('Specific endpoint failed, trying fetchAll...');
          const allRes = await fetch('https://practo-backend.vercel.app/api/doctor/fetchAll');
          
          if (!allRes.ok) {
            throw new Error(`API request failed with status ${allRes.status}`);
          }
          
          const data = await allRes.json();
          const foundDoctor = data.doctors?.find(doc => doc._id === id);
          
          if (!foundDoctor) {
            throw new Error('Doctor not found in fetchAll response');
          }
          
          setDoctor(foundDoctor);
        } else {
          const data = await res.json();
          if (!data.doctor) {
            throw new Error('Doctor data not found in response');
          }
          setDoctor(data.doctor);
        }
      } catch (err) {
        console.error('Error fetching doctor:', err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  useEffect(() => {
    if (doctor?.available?.days?.length) {
      const today = new Date().toLocaleString('en-us', { weekday: 'long' });
      setSelectedDay(
        doctor.available.days.includes(today)
          ? today
          : doctor.available.days[0]
      );
    }
  }, [doctor]);

  const generateTimeSlots = () => {
    try {
      if (!doctor?.available?.time) return [];
      
      const timeString = doctor.available.time || '09:00 - 17:00';
      const [start, end] = timeString.split(' - ');
      
      if (!start || !end) return [];
      
      const [startHour, startMin] = start.split(':').map(Number);
      const [endHour, endMin] = end.split(':').map(Number);
      
      if (isNaN(startHour)) return [];
      
      const slots = [];
      let currentHour = startHour || 9;
      let currentMin = startMin || 0;
      const finalEndHour = endHour || 17;
      const finalEndMin = endMin || 0;
      
      while (currentHour < finalEndHour || (currentHour === finalEndHour && currentMin < finalEndMin)) {
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
        slots.push(timeString);
        
        currentMin += 30;
        if (currentMin >= 60) {
          currentMin -= 60;
          currentHour += 1;
        }
      }
      
      return slots;
    } catch (error) {
      console.error('Error generating time slots:', error);
      return [];
    }
  };

  const timeSlots = generateTimeSlots();

  // Mock data for enhanced components
  const reviews = [
    { name: "Sarah Johnson", rating: 5, comment: "Excellent doctor! Very thorough and caring.", date: "2 weeks ago" },
    { name: "Michael Chen", rating: 5, comment: "Professional service and accurate diagnosis. Highly recommended!", date: "1 month ago" },
    { name: "Emma Davis", rating: 4, comment: "Great experience. The doctor explained everything clearly.", date: "3 weeks ago" }
  ];

  const achievements = [
    { title: "Best Doctor Award", year: "2023", organization: "Medical Excellence Board" },
    { title: "Patient Care Excellence", year: "2022", organization: "Healthcare Association" },
    { title: "Research Publication", year: "2021", organization: "Medical Journal" }
  ];

  const services = [
    "General Consultation",
    "Preventive Care",
    "Health Screenings",
    "Treatment Planning",
    "Follow-up Care",
    "Emergency Consultation"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 space-y-4">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="h-8 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <div className="h-10 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <HeartPulse className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{error || 'Doctor not found'}</h3>
            <button
              onClick={() => router.push('/doctors')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

  const simulatedRating = Math.min(5, Math.max(1, Math.floor(doctor.experience / 2)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Back Arrow */}
          <button
            onClick={() => router.push('/doctors')}
            className="mb-4 lg:mb-0 lg:ml-0 text-gray-600 hover:text-blue-600 transition-colors duration-200 self-start p-2 rounded-full hover:bg-white/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Doctor Profile Card - Static, Enhanced */}
          <div className="lg:w-1/3 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-36 w-36 rounded-2xl overflow-hidden border-4 border-blue-100 mb-6 relative shadow-lg">
                    {doctor.profileImage ? (
                      <Image
                        src={doctor.profileImage}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl">
                        {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center capitalize mb-2">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h2>
                
                <p className="text-blue-600 text-lg font-medium mb-1">{doctor.specialty}</p>
                
                {doctor.supSpeciality && (
                  <p className="text-sm text-gray-500 text-center mb-4">({doctor.supSpeciality})</p>
                )}
                
                <div className="flex items-center mb-2">
                  {Array(simulatedRating).fill().map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-2 text-gray-700 text-base font-medium">
                    {simulatedRating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-gray-500 text-sm">(127 reviews)</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 bg-gray-50 px-3 py-1 rounded-full">
                  {doctor.experience}+ Years Experience
                </p>
                
                <div className="w-full space-y-4">
                  <div className="flex items-start p-3 bg-blue-50 rounded-xl">
                    <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-gray-900">Qualifications</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {doctor.qualifications.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-green-50 rounded-xl">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-gray-900">Location</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {doctor.hospital}, {doctor.hospitalAddress}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-purple-50 rounded-xl">
                    <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-gray-900">Availability</h4>
                      <p className="text-sm text-gray-600">
                        {doctor.available?.time || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/doctors/${doctor._id}/book`}
                  className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Doctor Details - Scrollable with Enhanced Components */}
          <div className="lg:w-2/3 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded pr-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-blue-600" />
                  About Dr. {doctor.lastName}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {doctor.bio || `Dr. ${doctor.lastName} is a highly skilled ${doctor.specialty} with over ${doctor.experience} years of experience. ${doctor.gender === 'female' ? 'She' : 'He'} specializes in ${doctor.supSpeciality || doctor.specialty} and provides exceptional care at ${doctor.hospital}. Known for a patient-centered approach and commitment to excellence in healthcare delivery.`}
                </p>
              </div>

                        

              {/* Availability Section */}
<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
    <Calendar className="h-6 w-6 mr-3 text-blue-600" />
    Availability & Booking
  </h3>

  <div>
    <h4 className="text-lg font-semibold text-gray-900 mb-4">Select a Day</h4>
    <div className="flex flex-wrap gap-3">
      {doctor.available?.days?.map(day => (
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            selectedDay === day
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  </div>
</div>


              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-green-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center p-4 bg-green-50 rounded-xl">
                    <Phone className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                    <Mail className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">doctor@hospital.com</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                    <Globe className="h-6 w-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <p className="font-semibold text-gray-900">www.hospital.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <HeartPulse className="h-6 w-6 mr-3" />
                  Consultation Fee
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">₹{doctor.consultantFee}</p>
                    <p className="text-blue-100 text-sm">Per consultation</p>
                    <p className="text-blue-100 text-xs mt-1">*Includes digital prescription</p>
                  </div>
                  <Link
                    href={`/doctors/${doctor._id}/book`}
                    
                  >
                
                  </Link>
                    </div>
              </div>

                   {/* Patient Reviews */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageCircle className="h-6 w-6 mr-3 text-purple-600" />
                  Patient Reviews
                </h3>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center">
                              {Array(review.rating).fill().map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 italic">"{review.comment}"</p>
                    </div>
                  ))}
              
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}