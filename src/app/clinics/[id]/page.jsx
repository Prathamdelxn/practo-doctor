'use client'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Phone, Mail, Globe, ChevronLeft, HeartPulse, Stethoscope, Pill } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function ClinicDetailsPage({ params }) {
  const router = useRouter()
  const [clinicId, setClinicId] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (params?.id) {
      setClinicId(params.id)
    }
  }, [params])

  const clinic = {
    id: clinicId || 1,
    name: "City Health Clinic",
    type: "Multi-specialty Clinic",
    address: "123 Main Street, Sector 12",
    rating: 4.7,
    reviews: 128,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60",
      "https://media.istockphoto.com/id/1139755582/photo/medical-equipment-on-the-background-of-group-of-health-workers-in-the-icu.webp?a=1&b=1&s=612x612&w=0&k=20&c=U5oZr7UsC9pOBoostQFuZ2aP2gVE3HGqAn1fUSwU2Lg=",
      "https://images.unsplash.com/photo-1579684385127-1ff15d508118?w=600&auto=format&fit=crop&q=60"
    ],
    features: ["24/7 Emergency", "Lab Services", "Pediatrics", "Cardiology", "Orthopedics", "Radiology", "Pharmacy", "Physiotherapy"],
    description: "City Health Clinic is a leading multi-specialty healthcare provider offering comprehensive medical services. We are committed to delivering high-quality care with a patient-first approach.",
    overview: "City Health Clinic provides a wide range of medical services with state-of-the-art facilities. Our experienced medical staff ensures the best outcomes for our patients, focusing on preventive care, diagnostics, and advanced treatments.",
    doctors: [
      { 
        name: "Dr. John Smith", 
        specialty: "Cardiologist", 
        experience: "15 years", 
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60",
        education: "MD, Cardiology",
        languages: ["English", "Spanish"]
      },
      { 
        name: "Dr. Emily Johnson", 
        specialty: "Pediatrician", 
        experience: "12 years", 
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&auto=format&fit=crop&q=60",
        education: "MD, Pediatrics",
        languages: ["English", "French"]
      },
      { 
        name: "Dr. Michael Brown", 
        specialty: "Orthopedic Surgeon", 
        experience: "18 years", 
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=60",
        education: "MD, Orthopedics",
        languages: ["English", "German"]
      }
    ],
    hours: {
      weekdays: "8:00 AM - 8:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "9:00 AM - 5:00 PM"
    },
    phone: "+1 (555) 123-4567",
    email: "info@cityhealth.com",
    website: "www.cityhealth.com"
  }

  const handleBackClick = () => {
    router.push('/clinics')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'doctors':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Our Specialist Doctors ({clinic.doctors.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinic.doctors.map((doctor, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all"
                >
                  <div className="relative h-48">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                      <p className="text-blue-300">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{doctor.experience} experience</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{doctor.education}</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      case 'services':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Available Services ({clinic.features.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <HeartPulse className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">Medical Services</h4>
                </div>
                <ul className="space-y-3">
                  {clinic.features.slice(0, 4).map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <Stethoscope className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">Specialized Care</h4>
                </div>
                <ul className="space-y-3">
                  {clinic.features.slice(4, 8).map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About {clinic.name}</h3>
              <p className="text-gray-600 leading-relaxed">{clinic.overview}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Opening Hours</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Mon-Fri</span>
                    <span className="font-medium">{clinic.hours.weekdays}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">{clinic.hours.saturday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">{clinic.hours.sunday}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-3">
                  <Pill className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Key Services</h4>
                </div>
                <ul className="space-y-2">
                  {clinic.features.slice(0, 3).map((service, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-600">{service}</span>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => setActiveTab('services')}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View all {clinic.features.length} services →
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-3">
                  <Stethoscope className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Our Specialists</h4>
                </div>
                <ul className="space-y-2">
                  {clinic.doctors.slice(0, 2).map((doctor, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-600">{doctor.specialty}</span>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => setActiveTab('doctors')}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Meet all {clinic.doctors.length} doctors →
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="pt-0"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={handleBackClick}
              className="flex items-center text-white hover:text-blue-200 mb-6 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Clinics
            </button>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{clinic.name}</h1>
                <p className="text-blue-200 text-lg mt-1">{clinic.type}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 text-yellow-300 fill-yellow-300 mr-1" />
                  <span className="font-medium">{clinic.rating}</span>
                  <span className="text-blue-100 ml-1">({clinic.reviews} reviews)</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <MapPin className="h-5 w-5 text-blue-200 mr-1" />
                  <span>{clinic.distance} away</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Image and Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Images */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src={clinic.image}
                  alt={`${clinic.name} main view`}
                  className="w-full h-96 object-cover"
                />
              </motion.div>
              
              {/* Thumbnail Images */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="grid grid-cols-4 gap-4"
              >
                {clinic.images.slice(1).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative rounded-lg overflow-hidden shadow-md h-28 cursor-pointer hover:shadow-lg transition-all"
                  >
                    <img
                      src={image}
                      alt={`${clinic.name} view ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Clinic Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-xl p-6 h-full border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Clinic Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">Address</p>
                      <p className="text-gray-600">{clinic.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">Opening Hours</p>
                      <p className="text-gray-600">
                        <span className="block">Weekdays: {clinic.hours.weekdays}</span>
                        <span className="block">Weekend: {clinic.hours.saturday}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">Phone</p>
                      <a href={`tel:${clinic.phone}`} className="text-blue-600 hover:underline">
                        {clinic.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">Email</p>
                      <a href={`mailto:${clinic.email}`} className="text-blue-600 hover:underline">
                        {clinic.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">Website</p>
                      <a 
                        href={`https://${clinic.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        {clinic.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Clinic Details Sections */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-4 font-medium text-lg ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`pb-3 px-4 font-medium text-lg ${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Doctors ({clinic.doctors.length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`pb-3 px-4 font-medium text-lg ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Services ({clinic.features.length})
              </button>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </motion.div>
    </div>
  )
}