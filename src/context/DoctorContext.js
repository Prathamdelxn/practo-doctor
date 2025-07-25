'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorInfo = async (id) => {
    try {
      const res = await fetch(`https://practo-backend.vercel.app/api/doctor/fetch-by-id/${id}`);
      if (!res.ok) throw new Error('Failed to fetch doctor info');
      const data = await res.json();
      setDoctor(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  const savedUser = localStorage.getItem('user');


  try {
    if (!savedUser || savedUser === 'undefined') {
      console.warn('No valid user found in localStorage.');
      setLoading(false);
      return;
    }
  console.log('Saved User:', savedUser);
    const userdata = JSON.parse(savedUser);
    if (userdata?.role === 'doctor') {
      fetchDoctorInfo(userdata.id);
    } else {
      setLoading(false);
    }
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
    localStorage.removeItem('user'); // Remove corrupted value
    setLoading(false);
  }
}, []);


  return (
    <DoctorContext.Provider value={{ doctor, loading }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
