"use client";

import { useState } from 'react';

interface AuditLog {
  timestamp: string;
  transactionType: 'Material Return' | 'Material Issue' | 'Material Receipt';
  material: string;
  materialType: string;
  quantity: string;
  wastage?: string;
  personName: string;
  personType: string;
  reference: string;
}

export default function AuditLogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    transactionType: '',
    material: '',
    person: ''
  });

  // Mock data - replace with actual data from your backend
  const auditLogs: AuditLog[] = [
    {
      timestamp: '2024-02-20 14:30',
      transactionType: 'Material Return',
      material: 'Gold',
      materialType: '22K',
      quantity: '95g',
      wastage: '5g',
      personName: 'Rahul Kumar',
      personType: 'Artisan',
      reference: '#RET001'
    },
    {
      timestamp: '2024-02-20 10:15',
      transactionType: 'Material Issue',
      material: 'Gold',
      materialType: '22K',
      quantity: '100g',
      personName: 'Rahul Kumar',
      personType: 'Artisan',
      reference: '#ISS001'
    },
    {
      timestamp: '2024-02-19 16:45',
      transactionType: 'Material Receipt',
      material: 'Gold',
      materialType: '22K',
      quantity: '1000g',
      personName: 'Rajesh Jewellers',
      personType: 'Supplier',
      reference: '#PO123'
    }
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredLogs = auditLogs.filter(log => {
    if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
    if (filters.transactionType && log.transactionType !== filters.transactionType) return false;
    if (filters.material && !log.material.toLowerCase().includes(filters.material.toLowerCase())) return false;
    if (filters.person && !log.personName.toLowerCase().includes(filters.person.toLowerCase())) return false;
    return true;
  });

  const handleExport = () => {
    const headers = [
      'Timestamp',
      'Transaction Type',
      'Material',
      'Material Type',
      'Quantity',
      'Wastage',
      'Person Name',
      'Person Type',
      'Reference'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.transactionType,
        log.material,
        log.materialType,
        log.quantity,
        log.wastage || '',
        log.personName,
        log.personType,
        log.reference
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Audit Log</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filter</span>
          </button>
          <button 
            onClick={handleExport}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
              <select
                name="transactionType"
                value={filters.transactionType}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Material Return">Material Return</option>
                <option value="Material Issue">Material Issue</option>
                <option value="Material Receipt">Material Receipt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Material</label>
              <input
                type="text"
                name="material"
                value={filters.material}
                onChange={handleFilterChange}
                placeholder="Search material..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Person</label>
              <input
                type="text"
                name="person"
                value={filters.person}
                onChange={handleFilterChange}
                placeholder="Search person..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.transactionType === 'Material Return' ? 'bg-green-100 text-green-800' :
                      log.transactionType === 'Material Issue' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {log.transactionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.material}</div>
                    <div className="text-sm text-gray-500">{log.materialType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.quantity}</div>
                    {log.wastage && (
                      <div className="text-sm text-gray-500">Wastage: {log.wastage}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.personName}</div>
                    <div className="text-sm text-gray-500">{log.personType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 