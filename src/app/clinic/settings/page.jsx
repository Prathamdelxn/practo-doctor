'use client';

import { useState } from 'react';

export default function ClinicSettings() {
  const [clinicName, setClinicName] = useState('HealthByte Clinic');
  const [address, setAddress] = useState('123 Main Street, City, Country');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('contact@healthbyte.com');
  const [workingHours, setWorkingHours] = useState('Mon-Fri, 9 AM - 6 PM');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    // Save settings logic here (API call or local storage)
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Clinic Settings</h2>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Clinic Info */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Clinic Information</h3>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="clinicName">
            Clinic Name
          </label>
          <input
            id="clinicName"
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <label className="block mt-4 mb-1 font-medium text-gray-700" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            required
          />
        </section>

        {/* Contact Details */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Contact Details</h3>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <label className="block mt-4 mb-1 font-medium text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </section>

        {/* Working Hours */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Mon-Fri, 9 AM - 6 PM"
            required
          />
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Notifications</h3>
          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2 text-gray-700">Enable Email Notifications</span>
          </label>
        </section>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
