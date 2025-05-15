"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ArtisanStatus = 'Active' | 'On Break' | 'On Leave' | 'Assigned' | 'Unavailable';

interface StatusHistory {
  status: ArtisanStatus;
  startDate: string;
  endDate?: string;
  notes?: string;
}

interface Artisan {
  id: string;
  name: string;
  specialization: string;
  currentAssignment: string;
  materialsIssued: Array<{ type: string; quantity: string }>;
  status: ArtisanStatus;
  initials: string;
  experience: string;
  completedProjects: number;
  rating: number;
  contactNumber: string;
  address: string;
  statusHistory: StatusHistory[];
}

export default function ArtisansPage() {
  const router = useRouter();
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<{
    status: ArtisanStatus;
    notes: string;
  }>({
    status: 'Active',
    notes: ''
  });

  // Mock data - replace with actual data from your backend
  const [artisanData, setArtisanData] = useState<Artisan[]>([
    {
      id: 'ART001',
      name: 'Rahul Kumar',
      specialization: 'Gold Jewelry',
      currentAssignment: 'Necklace Design #NK102',
      materialsIssued: [
        { type: 'Gold', quantity: '100g' },
        { type: 'Diamonds', quantity: '5ct' }
      ],
      status: 'Active',
      initials: 'RK',
      experience: '8 years',
      completedProjects: 156,
      rating: 4.8,
      contactNumber: '+91 98765 43210',
      address: 'Workshop #12, Jewelry Market',
      statusHistory: [
        {
          status: 'Active',
          startDate: '2024-01-01',
          notes: 'Regular work schedule'
        }
      ]
    },
    {
      id: 'ART002',
      name: 'Amit Singh',
      specialization: 'Silver Jewelry',
      currentAssignment: 'Bracelet Set #BR045',
      materialsIssued: [
        { type: 'Silver', quantity: '450g' }
      ],
      status: 'On Break',
      initials: 'AS',
      experience: '5 years',
      completedProjects: 89,
      rating: 4.5,
      contactNumber: '+91 98765 43211',
      address: 'Workshop #15, Jewelry Market',
      statusHistory: [
        {
          status: 'Active',
          startDate: '2024-01-01',
          endDate: '2024-02-15',
          notes: 'Regular work schedule'
        },
        {
          status: 'On Break',
          startDate: '2024-02-15',
          notes: 'Personal leave'
        }
      ]
    }
  ]);

  const handleIssueClick = (artisanId: string) => {
    router.push(`/materials/issue?artisanId=${artisanId}`);
  };

  const handleViewDetails = (artisanId: string) => {
    const artisan = artisanData.find(a => a.id === artisanId);
    setSelectedArtisan(artisan || null);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (artisanId: string) => {
    const artisan = artisanData.find(a => a.id === artisanId);
    setSelectedArtisan(artisan || null);
    setNewStatus({ status: artisan?.status || 'Active', notes: '' });
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = () => {
    if (!selectedArtisan) return;

    const now = new Date().toISOString().split('T')[0];
    const updatedArtisans = artisanData.map(artisan => {
      if (artisan.id === selectedArtisan.id) {
        // Update the last status history entry's end date
        const updatedHistory = [...artisan.statusHistory];
        if (updatedHistory.length > 0) {
          updatedHistory[updatedHistory.length - 1].endDate = now;
        }

        // Add new status entry
        updatedHistory.push({
          status: newStatus.status,
          startDate: now,
          notes: newStatus.notes
        });

        return {
          ...artisan,
          status: newStatus.status,
          statusHistory: updatedHistory
        };
      }
      return artisan;
    });

    setArtisanData(updatedArtisans);
    setIsStatusModalOpen(false);
  };

  const getStatusColor = (status: ArtisanStatus) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'On Break': 'bg-yellow-100 text-yellow-800',
      'On Leave': 'bg-orange-100 text-orange-800',
      'Assigned': 'bg-blue-100 text-blue-800',
      'Unavailable': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Artisans</h1>
        <button 
          className="btn bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 flex items-center space-x-2"
          onClick={() => router.push('/artisans/new')}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Artisan</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artisan Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materials Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {artisanData.map((artisan) => (
                <tr key={artisan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{artisan.initials}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{artisan.name}</div>
                        <div className="text-sm text-gray-500">ID: {artisan.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{artisan.specialization}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{artisan.currentAssignment}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artisan.materialsIssued.map((material, idx) => (
                      <div key={idx} className="text-sm text-gray-900">{material.type} - {material.quantity}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusUpdate(artisan.id)}
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(artisan.status)}`}
                    >
                      {artisan.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewDetails(artisan.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleIssueClick(artisan.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Issue Material
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedArtisan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className={`h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center`}>
                  <span className="text-blue-600 font-medium text-xl">{selectedArtisan.initials}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedArtisan.name}</h3>
                  <p className="text-gray-500">ID: {selectedArtisan.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Specialization</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedArtisan.specialization}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedArtisan.experience}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Current Assignment</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedArtisan.currentAssignment}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <span className={`mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedArtisan.status)}`}>
                  {selectedArtisan.status}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Contact Number</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedArtisan.contactNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Address</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedArtisan.address}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Completed Projects</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedArtisan.completedProjects}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Rating</h4>
                <p className="mt-1 text-sm text-gray-900">⭐ {selectedArtisan.rating}/5.0</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500">Status History</h4>
              <div className="mt-2 space-y-2">
                {selectedArtisan.statusHistory.map((history, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md">
                    <div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(history.status)}`}>
                        {history.status}
                      </span>
                      {history.notes && (
                        <span className="ml-2 text-sm text-gray-600">{history.notes}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {history.startDate} {history.endDate ? `to ${history.endDate}` : '(Current)'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleIssueClick(selectedArtisan.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Issue Material
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {isStatusModalOpen && selectedArtisan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Status
                </label>
                <select
                  value={newStatus.status}
                  onChange={(e) => setNewStatus({ ...newStatus, status: e.target.value as ArtisanStatus })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="On Break">On Break</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={newStatus.notes}
                  onChange={(e) => setNewStatus({ ...newStatus, notes: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add any relevant notes about the status change..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 