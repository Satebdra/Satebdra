"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MaterialIssue() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const artisanIdFromUrl = searchParams.get('artisanId');

  const [formData, setFormData] = useState({
    artisanId: '',
    materialType: '',
    quantity: '',
    unit: 'g',
    purpose: '',
    expectedReturn: ''
  });

  useEffect(() => {
    if (artisanIdFromUrl) {
      setFormData(prev => ({
        ...prev,
        artisanId: artisanIdFromUrl
      }));
    }
  }, [artisanIdFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Redirect to issues page after submission
    router.push('/issues');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Issue Material</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Artisan Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Select Artisan
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.artisanId}
              onChange={(e) => setFormData({...formData, artisanId: e.target.value})}
              required
            >
              <option value="">Select an artisan</option>
              <option value="ART001">Rahul Kumar (ART001)</option>
              <option value="ART002">Amit Singh (ART002)</option>
            </select>
          </div>

          {/* Material Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Material Type
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.materialType}
              onChange={(e) => setFormData({...formData, materialType: e.target.value})}
              required
            >
              <option value="">Select material</option>
              <option value="gold-22k">Gold (22K)</option>
              <option value="silver-999">Silver (99.9%)</option>
              <option value="diamond-vvs1">Diamond (VVS1)</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
              >
                <option value="g">Grams (g)</option>
                <option value="ct">Carats (ct)</option>
              </select>
            </div>
          </div>

          {/* Purpose */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Purpose / Design Reference
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              required
            />
          </div>

          {/* Expected Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Return Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.expectedReturn}
              onChange={(e) => setFormData({...formData, expectedReturn: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Please ensure all materials are weighed accurately before issuing. The artisan must sign the issue slip to acknowledge receipt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Issue Material
          </button>
        </div>
      </form>
    </div>
  );
} 