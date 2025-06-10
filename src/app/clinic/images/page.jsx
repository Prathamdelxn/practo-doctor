'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const initialImages = [
  '/clinic/img1.jpg',
  '/clinic/img2.jpg',
  '/clinic/img3.jpg',
  '/clinic/img4.jpg'
];

export default function ManageImages() {
  const [images, setImages] = useState(initialImages);
  const [showConfirm, setShowConfirm] = useState(false);
  const [imgToDelete, setImgToDelete] = useState(null);

  const handleDeleteClick = (img) => {
    setImgToDelete(img);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setImages(images.filter((img) => img !== imgToDelete));
    setImgToDelete(null);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setImgToDelete(null);
    setShowConfirm(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-blue-600">Manage Clinic Images</h2>
      <p className="mb-6 text-gray-600">
        Upload, view, and manage the images that represent your clinic.
      </p>

      {/* Upload Button */}
      <div className="mb-6">
        <label
          htmlFor="upload-input"
          className="inline-flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow"
          title="Upload Clinic Images"
        >
          <Plus className="w-5 h-5" />
          Upload Images
        </label>
        <input
          id="upload-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            const newImages = files.map((file) => URL.createObjectURL(file));
            setImages((prev) => [...prev, ...newImages]);
            e.target.value = null; // reset input
          }}
        />
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {images.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No images uploaded yet.
          </p>
        )}
        {images.map((img) => (
          <div
            key={img}
            className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={img}
              alt="Clinic"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
            <button
              onClick={() => handleDeleteClick(img)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1 rounded-full text-white shadow"
              aria-label="Delete Image"
              title="Delete Image"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this image?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
