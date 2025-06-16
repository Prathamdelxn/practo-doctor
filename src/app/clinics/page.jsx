'use client'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, ChevronDown, Star, X, Plus, Image as ImageIcon, Clock, Phone, Mail, Globe } from 'lucide-react'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function ClinicsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState([])
  const [locationFilter, setLocationFilter] = useState([])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const clinicTypes = [
    'Multi-specialty',
    'Primary Care',
    'Specialty Clinic',
    'Holistic Health',
    'Pediatrics',
    'Dental',
    'Emergency'
  ]

  const locations = [
    'Sector 12',
    'Sector 15',
    'Sector 20',
    'Sector 8',
    'Downtown',
    'Medical District'
  ]

  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: "City Health Clinic",
      type: "Multi-specialty Clinic",
      address: "123 Main Street, Sector 12",
      rating: 4.7,
      distance: "0.5 km",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
      features: ["24/7 Emergency", "Lab Services", "Pediatrics"],
      hours: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm",
      phone: "+1 (555) 123-4567",
      email: "info@cityhealth.com",
      website: "www.cityhealth.com"
    },
    {
      id: 2,
      name: "Family Care Clinic",
      type: "Primary Care",
      address: "456 Park Avenue, Sector 15",
      rating: 4.5,
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
      features: ["General Medicine", "Dental Care", "Pharmacy"],
      hours: "Mon-Fri: 7am-7pm, Sat: 8am-2pm",
      phone: "+1 (555) 234-5678",
      email: "contact@familycare.com",
      website: "www.familycare.com"
    },
    {
      id: 3,
      name: "Elite Specialist Clinic",
      type: "Specialty Clinic",
      address: "789 Next Gen Building, Sector 20",
      rating: 4.9,
      distance: "2.3 km",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
      features: ["Cardiology", "Orthopedics", "Dermatology"],
      hours: "Mon-Fri: 9am-5pm",
      phone: "+1 (555) 345-6789",
      email: "appointments@elitespecialist.com",
      website: "www.elitespecialist.com"
    },
    {
      id: 4,
      name: "Wellness Centre",
      type: "Holistic Health Clinic",
      address: "101 Green Valley, Sector 8",
      rating: 4.6,
      distance: "1.8 km",
      image: "https://media.istockphoto.com/id/1139755582/photo/medical-equipment-on-the-background-of-group-of-health-workers-in-the-icu.webp?a=1&b=1&s=612x612&w=0&k=20&c=U5oZr7UsC9pOBoostQFuZ2aP2gVE3HGqAn1fUSwU2Lg=",
      features: ["Physiotherapy", "Nutrition", "Mental Health"],
      hours: "Mon-Sat: 7am-9pm",
      phone: "+1 (555) 456-7890",
      email: "wellness@wellnesscentre.com",
      website: "www.wellnesscentre.com"
    },
    {
      id: 5,
      name: "Children's Health Center",
      type: "Pediatrics Clinic",
      address: "234 Sunshine Blvd, Downtown",
      rating: 4.8,
      distance: "3.1 km",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhZWRpYXRyaWN8ZW58MHx8MHx8fDA%3D",
      features: ["Pediatric Care", "Vaccinations", "Child Psychology"]
    },
    {
      id: 6,
      name: "Bright Smile Dental",
      type: "Dental Clinic",
      address: "567 Dental Lane, Medical District",
      rating: 4.4,
      distance: "2.7 km",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVudGFsJTIwY2xpbmljfGVufDB8fDB8fHww",
      features: ["Teeth Cleaning", "Implants", "Orthodontics"]
    }
  ])

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         clinic.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clinic.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = typeFilter.length === 0 || 
                       typeFilter.some(type => clinic.type.toLowerCase().includes(type.toLowerCase()))
    
    const matchesLocation = locationFilter.length === 0 || 
                           locationFilter.some(loc => clinic.address.includes(loc))
    
    const matchesRating = clinic.rating >= ratingFilter
    
    return matchesSearch && matchesType && matchesLocation && matchesRating
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="pt-0" // Add padding-top to account for fixed navbar
      >
       {/* Hero Section with Search */}
<div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-6">Find Quality Clinics Near You</h1>
      <p className="text-xl mb-8 max-w-3xl">
        Discover top-rated healthcare facilities with specialized services for all your needs
      </p>

      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl text-left">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for clinics, specialties..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={locationFilter.join(', ')}
              readOnly
            />
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                  multiple
                  value={typeFilter}
                  onChange={(e) =>
                    setTypeFilter(Array.from(e.target.selectedOptions, (opt) => opt.value))
                  }
                >
                  {clinicTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                  multiple
                  value={locationFilter}
                  onChange={(e) =>
                    setLocationFilter(Array.from(e.target.selectedOptions, (opt) => opt.value))
                  }
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`mr-1 ${ratingFilter >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => setRatingFilter(star)}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                  <button 
                    className="ml-2 text-sm text-blue-600"
                    onClick={() => setRatingFilter(0)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col">
            {/* Clinic Cards */}
<div className="flex-1">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      {typeFilter.length ? `${typeFilter.join(', ')} Clinics` : 'All Clinics'}
      {locationFilter.length > 0 && ` in ${locationFilter.join(', ')}`}
    </h2>
    <div className="flex items-center">
      <span className="text-sm text-gray-600 mr-2">Sort by:</span>
      <select className="border border-gray-300 rounded-md p-2 text-sm">
        <option>Relevance</option>
        <option>Rating (High to Low)</option>
        <option>Distance (Near to Far)</option>
      </select>
    </div>
  </div>

  {filteredClinics.length === 0 ? (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h3 className="text-xl font-medium text-gray-700 mb-2">No clinics found</h3>
      <p className="text-gray-500">Try adjusting your search or filters</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredClinics.map(clinic => (
        <motion.div
          key={clinic.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
          }}
          viewport={{ once: true }}
          transition={{ 
            delay: clinic.id * 0.05,
            duration: 0.5,
            hover: { duration: 0.2 }
          }}
          className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 flex flex-col"
        >
          <div className="relative h-32"> {/* Reduced from h-48 */}
            <img
              src={clinic.image}
              alt={clinic.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-sm">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-xs font-medium">{clinic.rating}</span>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col"> {/* Reduced padding from p-5 to p-4 */}
            <div className="flex justify-between items-start mb-1"> {/* Reduced margin from mb-2 to mb-1 */}
              <h3 className="text-md font-bold text-gray-900 line-clamp-1">{clinic.name}</h3> {/* Reduced text-lg to text-md */}
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                {clinic.distance} away
              </span>
            </div>
            <p className="text-blue-600 text-sm font-medium mb-2">{clinic.type}</p> {/* Reduced margin from mb-3 to mb-2 */}
            <p className="text-gray-600 text-xs mb-3 flex items-center"> {/* Reduced text-sm to text-xs */}
              <MapPin className="h-3 w-3 mr-1 text-gray-400" /> {/* Reduced icon size */}
              <span className="line-clamp-1">{clinic.address}</span>
            </p>
            <div className="mb-3"> {/* Reduced margin from mb-4 to mb-3 */}
              <p className="text-xs text-gray-500 mb-1">Services:</p> {/* Reduced text-sm to text-xs */}
              <div className="flex flex-wrap gap-1"> {/* Reduced gap from gap-2 to gap-1 */}
                {clinic.features.slice(0, 3).map((feature, index) => ( // Show only first 3 features
                  <span 
                    key={index} 
                    className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" // Smaller text and padding
                  >
                    {feature}
                  </span>
                ))}
                {clinic.features.length > 3 && (
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                    +{clinic.features.length - 3}
                  </span>
                )}
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href={`/clinics/${clinic.id}`}
              className="mt-auto text-sm py-1.5 px-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200" // Smaller button
            >
              View Clinic
            </motion.a>
          </div>
        </motion.div>
      ))}
    </div>
  )}
</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}