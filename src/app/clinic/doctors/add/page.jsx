'use client'

import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Clock, Award, Stethoscope, Building, FileText, Eye, EyeOff } from 'lucide-react';

export default function AddDoctorPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profileImage: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    password: '',
    phone: '',
    specialty: '',
    supSpeciality: '',
    experience: '',
    consultantFee: '',
    qualifications: [''],
    licenseNumber: '',
    hospital: '',
    hospitalAddress: '',
    hospitalNumber: '',
    availableDays: [],
    availableTime: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQualificationChange = (index, value) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index] = value;
    setFormData(prev => ({
      ...prev,
      qualifications: newQualifications
    }));
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }));
  };

  const removeQualification = (index) => {
    const newQualifications = formData.qualifications.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      qualifications: newQualifications
    }));
  };

  const handleDayToggle = (day) => {
    const newDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter(d => d !== day)
      : [...formData.availableDays, day];
    
    setFormData(prev => ({
      ...prev,
      availableDays: newDays
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission here
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const specialties = [
    'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Hematology',
    'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Radiology',
    'Surgery', 'Urology', 'Gynecology', 'Ophthalmology', 'ENT', 'Anesthesiology'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Add New Doctor
          </h1>
          <p className="text-gray-600">Complete the form to register a new doctor in the system</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">
              {currentStep === 1 && 'Personal Information'}
              {currentStep === 2 && 'Professional Details'}
              {currentStep === 3 && 'Hospital & Availability'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <div className="space-y-6">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="https://example.com/profile.jpg"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="doctor@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Enter secure password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Stethoscope className="inline w-4 h-4 mr-2" />
                      Specialty
                    </label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      required
                    >
                      <option value="">Select specialty</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sub-Specialty
                    </label>
                    <input
                      type="text"
                      name="supSpeciality"
                      value={formData.supSpeciality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Enter sub-specialty (optional)"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Award className="inline w-4 h-4 mr-2" />
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Years of experience"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Consultant Fee ($)
                    </label>
                    <input
                      type="number"
                      name="consultantFee"
                      value={formData.consultantFee}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Consultation fee"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="Medical license number"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Award className="inline w-4 h-4 mr-2" />
                    Qualifications
                  </label>
                  {formData.qualifications.map((qualification, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={qualification}
                        onChange={(e) => handleQualificationChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                        placeholder="Enter qualification (e.g., MBBS, MD)"
                      />
                      {formData.qualifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addQualification}
                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
                  >
                    + Add Another Qualification
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Hospital & Availability */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building className="inline w-4 h-4 mr-2" />
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="Hospital or clinic name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Hospital Address
                  </label>
                  <textarea
                    name="hospitalAddress"
                    value={formData.hospitalAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="Complete hospital address"
                    rows="3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Hospital Phone Number
                  </label>
                  <input
                    type="tel"
                    name="hospitalNumber"
                    value={formData.hospitalNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="Hospital contact number"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Clock className="inline w-4 h-4 mr-2" />
                    Available Days
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {days.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all font-medium ${
                          formData.availableDays.includes(day)
                            ? 'border-purple-500 bg-purple-500 text-white'
                            : 'border-gray-200 hover:border-purple-300 text-gray-700'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Time
                  </label>
                  <input
                    type="text"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Add Doctor
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}