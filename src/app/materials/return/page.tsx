"use client";

import { useState } from 'react';

export default function MaterialReturn() {
  const [formData, setFormData] = useState({
    issueId: '',
    artisanId: '',
    materialType: '',
    returnedQuantity: '',
    wastageQuantity: '',
    unit: 'g',
    remarks: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Record Material Return</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Issue Reference */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Issue Reference
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.issueId}
              onChange={(e) => setFormData({...formData, issueId: e.target.value})}
              required
            >
              <option value="">Select issue reference</option>
              <option value="ISS001">ISS001 - Gold (100g) - Rahul Kumar</option>
              <option value="ISS002">ISS002 - Silver (450g) - Amit Singh</option>
            </select>
          </div>

          {/* Artisan Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Artisan
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.artisanId}
              onChange={(e) => setFormData({...formData, artisanId: e.target.value})}
              required
            >
              <option value="">Select artisan</option>
              <option value="ART001">Rahul Kumar (ART001)</option>
              <option value="ART002">Amit Singh (ART002)</option>
            </select>
          </div>

          {/* Material Type */}
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

          {/* Quantities */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Returned Quantity
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.returnedQuantity}
                onChange={(e) => setFormData({...formData, returnedQuantity: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Wastage Quantity
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.wastageQuantity}
                onChange={(e) => setFormData({...formData, wastageQuantity: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Unit */}
          <div className="mb-6">
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

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remarks
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              placeholder="Add any notes about the return or wastage..."
            />
          </div>
        </div>

        {/* Verification Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Verification Required
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  All returned materials must be verified by a supervisor. Please ensure accurate weighing of both returned material and wastage.
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
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Record Return
          </button>
        </div>
      </form>
    </div>
  );
} 