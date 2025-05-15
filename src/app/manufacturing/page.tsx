"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Department {
  id: string;
  name: string;
  description: string;
}

interface ProcessStep {
  id: string;
  departmentId: string;
  startDate: string;
  endDate?: string;
  materialUsed: number;
  wastage: number;
  status: 'In Progress' | 'Completed' | 'On Hold';
  notes?: string;
}

interface ManufacturingOrder {
  id: string;
  orderNumber: string;
  productName: string;
  designNumber: string;
  startDate: string;
  expectedEndDate: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  totalGoldIssued: number;
  currentGoldUsed: number;
  wastage: number;
  artisanId: string;
  artisanName: string;
  currentDepartment: string;
  processSteps: ProcessStep[];
}

export default function ManufacturingPage() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<ManufacturingOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock departments data
  const departments: Department[] = [
    { id: 'DEPT001', name: 'Casting', description: 'Initial metal casting and mold preparation' },
    { id: 'DEPT002', name: 'Filing', description: 'Smoothing and shaping the cast pieces' },
    { id: 'DEPT003', name: 'Stone Setting', description: 'Setting diamonds and precious stones' },
    { id: 'DEPT004', name: 'Polishing', description: 'Final polish and finishing' },
    { id: 'DEPT005', name: 'Quality Check', description: 'Final quality inspection' }
  ];

  // Mock manufacturing orders
  const [orders] = useState<ManufacturingOrder[]>([
    {
      id: 'MFG001',
      orderNumber: 'ORD123',
      productName: 'Diamond Necklace',
      designNumber: 'DN789',
      startDate: '2024-02-20',
      expectedEndDate: '2024-03-05',
      status: 'In Progress',
      totalGoldIssued: 500,
      currentGoldUsed: 420,
      wastage: 15,
      artisanId: 'ART001',
      artisanName: 'Rahul Kumar',
      currentDepartment: 'Stone Setting',
      processSteps: [
        {
          id: 'STEP001',
          departmentId: 'DEPT001',
          startDate: '2024-02-20',
          endDate: '2024-02-22',
          materialUsed: 500,
          wastage: 8,
          status: 'Completed',
          notes: 'Initial casting completed with minimal wastage'
        },
        {
          id: 'STEP002',
          departmentId: 'DEPT002',
          startDate: '2024-02-22',
          endDate: '2024-02-25',
          materialUsed: 492,
          wastage: 7,
          status: 'Completed',
          notes: 'Filing and shaping completed'
        },
        {
          id: 'STEP003',
          departmentId: 'DEPT003',
          startDate: '2024-02-25',
          materialUsed: 485,
          wastage: 0,
          status: 'In Progress',
          notes: 'Stone setting in progress'
        }
      ]
    }
  ]);

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order || null);
    setIsDetailsModalOpen(true);
  };

  const getDepartmentName = (departmentId: string) => {
    return departments.find(d => d.id === departmentId)?.name || departmentId;
  };

  const calculateProgress = (order: ManufacturingOrder) => {
    const completedSteps = order.processSteps.filter(step => step.status === 'Completed').length;
    return (completedSteps / departments.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manufacturing Tracking</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                    <div className="text-sm text-gray-500">Order: {order.orderNumber}</div>
                    <div className="text-sm text-gray-500">Design: {order.designNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Issued: {order.totalGoldIssued}g</div>
                    <div className="text-sm text-gray-500">Used: {order.currentGoldUsed}g</div>
                    <div className="text-sm text-red-500">Wastage: {order.wastage}g</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.currentDepartment}</div>
                    <div className="text-sm text-gray-500">{order.artisanName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${calculateProgress(order)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {calculateProgress(order).toFixed(0)}% Complete
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manufacturing Details Modal */}
      {isDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedOrder.productName}</h3>
                <p className="text-gray-500">Order: {selectedOrder.orderNumber} | Design: {selectedOrder.designNumber}</p>
              </div>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Material Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800">Total Gold Issued</h4>
                <p className="text-2xl font-bold text-blue-900">{selectedOrder.totalGoldIssued}g</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-green-800">Current Gold Used</h4>
                <p className="text-2xl font-bold text-green-900">{selectedOrder.currentGoldUsed}g</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-red-800">Total Wastage</h4>
                <p className="text-2xl font-bold text-red-900">{selectedOrder.wastage}g</p>
              </div>
            </div>

            {/* Manufacturing Timeline */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Manufacturing Timeline</h4>
              <div className="space-y-4">
                {selectedOrder.processSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start">
                    <div className="flex items-center h-full">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'Completed' ? 'bg-green-500' :
                          step.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                        } text-white font-bold`}>
                          {index + 1}
                        </div>
                        {index < selectedOrder.processSteps.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-300"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900">{getDepartmentName(step.departmentId)}</h5>
                        <p className="text-sm text-gray-500 mt-1">
                          {step.startDate} {step.endDate ? `to ${step.endDate}` : '(In Progress)'}
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Material Used:</p>
                            <p className="font-medium">{step.materialUsed}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Wastage:</p>
                            <p className="font-medium text-red-600">{step.wastage}g</p>
                          </div>
                        </div>
                        {step.notes && (
                          <p className="mt-2 text-sm text-gray-600">{step.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 