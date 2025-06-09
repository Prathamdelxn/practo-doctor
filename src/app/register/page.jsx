'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegistrationPortal() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const roles = [
    {
      id: 'patient-registration',
      title: 'Patient',
      description: 'Register to book appointments and manage your health records',
      icon: '👨‍⚕️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'doctor-registration',
      title: 'Doctor',
      description: 'Join our network of healthcare professionals',
      icon: '🩺',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'clinic-registration',
      title: 'Clinic',
      description: 'Register your healthcare facility with our platform',
      icon: '🏥',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const handleCardClick = (roleId) => {
    router.push(`/register/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Healthcare Network</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to begin your registration journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${hoveredCard === role.id ? 'scale-105' : 'scale-100'}`}
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(role.id)}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-10`}></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="text-5xl mb-6">{role.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{role.description}</p>
                <div className="mt-auto">
                  <button className={`w-full py-3 px-6 rounded-lg font-medium bg-gradient-to-br ${role.color} text-white shadow-md hover:shadow-lg transition-all`}>
                    Register as {role.title}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}