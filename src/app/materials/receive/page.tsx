"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import MaterialReceipt from '@/components/MaterialReceipt';

interface ReceiptData {
  receiptNumber: string;
  date: string;
  supplierName: string;
  materialType: string;
  purity: string;
  weight: string;
  unit: string;
  purchasePrice: string;
  poNumber: string;
  totalAmount: string;
}

export default function MaterialReceive() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [formData, setFormData] = useState({
    supplierName: "",
    materialType: "",
    purity: "",
    weight: "",
    unit: "grams",
    purchasePrice: "",
    poNumber: "",
  });

  const calculateTotal = () => {
    const weight = parseFloat(formData.weight) || 0;
    const price = parseFloat(formData.purchasePrice) || 0;
    return (weight * price).toFixed(2);
  };

  const generateReceiptNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REC${year}${month}${day}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const receiptNumber = generateReceiptNumber();
      const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const newReceiptData = {
        receiptNumber,
        date: currentDate,
        supplierName: formData.supplierName,
        materialType: formData.materialType,
        purity: formData.purity,
        weight: formData.weight,
        unit: formData.unit,
        purchasePrice: formData.purchasePrice,
        poNumber: formData.poNumber,
        totalAmount: calculateTotal()
      };

      // Save to database
      const response = await fetch('/api/materials/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReceiptData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save material receipt');
      }

      // Show receipt
      setReceiptData(newReceiptData);
      setShowReceipt(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving material receipt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showReceipt && receiptData) {
    return <MaterialReceipt receiptData={receiptData} />;
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Receive Material</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Supplier Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.supplierName}
                onChange={(e) => setFormData({...formData, supplierName: e.target.value})}
                required
              />
            </div>

            {/* Material Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.materialType}
                onChange={(e) => setFormData({...formData, materialType: e.target.value})}
                required
              >
                <option value="">Select Type</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Diamond">Diamond</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            {/* Purity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purity
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 22K, 24K"
                value={formData.purity}
                onChange={(e) => setFormData({...formData, purity: e.target.value})}
                required
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  step="0.01"
                  className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  required
                />
                <select
                  className="rounded-r-md border-l-0 border-gray-300"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="grams">Grams</option>
                  <option value="carats">Carats</option>
                </select>
              </div>
            </div>

            {/* Purchase Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purchase Price (per unit)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  className="block w-full pl-7 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* PO Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PO Number
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.poNumber}
                onChange={(e) => setFormData({...formData, poNumber: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Total Amount Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="text-lg font-bold text-gray-900">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Receive Material</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 