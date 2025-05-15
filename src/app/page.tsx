"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => router.push('/materials/receive')}
            className="btn btn-primary flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>New Transaction</span>
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Total Gold Stock</p>
              <h3 className="text-2xl font-bold mt-1">1,250g</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-blue-700 rounded-full">22K</span>
          </div>
          <div className="mt-4 text-sm opacity-90">
            <span className="text-green-300">↑ 2.5%</span> from last month
          </div>
        </div>

        <div className="card bg-gradient-to-br from-gray-500 to-gray-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Total Silver Stock</p>
              <h3 className="text-2xl font-bold mt-1">5,800g</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">99.9%</span>
          </div>
          <div className="mt-4 text-sm opacity-90">
            <span className="text-red-300">↓ 1.2%</span> from last month
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Active Orders</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-purple-700 rounded-full">Active</span>
          </div>
          <div className="mt-4 text-sm opacity-90">
            <span className="text-green-300">↑ 4 new</span> this week
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Completed Orders</p>
              <h3 className="text-2xl font-bold mt-1">156</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-green-700 rounded-full">This Month</span>
          </div>
          <div className="mt-4 text-sm opacity-90">
            <span className="text-green-300">↑ 12%</span> completion rate
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Issues</h2>
            <a href="/issues" className="text-blue-600 hover:text-blue-800 text-sm">View All</a>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Gold - 100g</p>
                <p className="text-sm text-gray-600">Issued to: Rahul Kumar</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <span className="status-badge status-success">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Diamonds - 10ct</p>
                <p className="text-sm text-gray-600">Issued to: Amit Singh</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
              <span className="status-badge status-warning">Pending</span>
            </div>
          </div>
        </div>

        {/* Recent Returns */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Returns</h2>
            <a href="/returns" className="text-blue-600 hover:text-blue-800 text-sm">View All</a>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Gold - 95g (5g wastage)</p>
                <p className="text-sm text-gray-600">Returned by: Rahul Kumar</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
              <span className="status-badge status-success">Verified</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Silver - 450g (10g wastage)</p>
                <p className="text-sm text-gray-600">Returned by: Amit Singh</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
              <span className="status-badge status-warning">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/materials/receive" className="btn bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 flex items-center justify-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Receipt</span>
          </a>
          <a href="/materials/issue" className="btn bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 flex items-center justify-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Issue Material</span>
          </a>
          <a href="/materials/return" className="btn bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 flex items-center justify-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>Record Return</span>
          </a>
          <a href="/audit" className="btn bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 flex items-center justify-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>View Audit Log</span>
          </a>
        </div>
      </div>
    </div>
  );
} 