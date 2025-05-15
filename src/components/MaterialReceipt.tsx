import React from 'react';

interface MaterialReceiptProps {
  receiptData: {
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
  };
}

const MaterialReceipt: React.FC<MaterialReceiptProps> = ({ receiptData }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto print:shadow-none">
      {/* Print Button - Hidden during printing */}
      <div className="print:hidden mb-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print Receipt</span>
        </button>
      </div>

      {/* Receipt Header */}
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Material Receipt</h1>
        <div className="mt-2 text-gray-600">
          <p>Receipt No: {receiptData.receiptNumber}</p>
          <p>Date: {receiptData.date}</p>
        </div>
      </div>

      {/* Company Information */}
      <div className="mb-8 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Company Details</h2>
          <p className="text-gray-600">Jewellery Management System</p>
          <p className="text-gray-600">123 Business Street</p>
          <p className="text-gray-600">Contact: +91 1234567890</p>
          <p className="text-gray-600">GST: 12ABCDE3456F7Z8</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold text-gray-800">Supplier Details</h2>
          <p className="text-gray-600">{receiptData.supplierName}</p>
          <p className="text-gray-600">PO Number: {receiptData.poNumber}</p>
        </div>
      </div>

      {/* Material Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Material Details</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-gray-600">Description</th>
              <th className="px-4 py-2 text-left text-gray-600">Purity</th>
              <th className="px-4 py-2 text-left text-gray-600">Weight</th>
              <th className="px-4 py-2 text-right text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-gray-800">{receiptData.materialType}</td>
              <td className="px-4 py-2 text-gray-800">{receiptData.purity}</td>
              <td className="px-4 py-2 text-gray-800">{receiptData.weight} {receiptData.unit}</td>
              <td className="px-4 py-2 text-gray-800 text-right">₹{receiptData.purchasePrice}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t">
              <td colSpan={3} className="px-4 py-2 text-right font-semibold">Total Amount:</td>
              <td className="px-4 py-2 text-right font-semibold">₹{receiptData.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Terms and Signature */}
      <div className="mt-8 pt-8 border-t">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Terms & Conditions</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Material quality verified at the time of receipt</li>
              <li>Returns accepted within 24 hours of receipt</li>
              <li>Payment terms as per agreement</li>
            </ul>
          </div>
          <div className="text-right">
            <div className="mt-16 pt-4 border-t border-gray-300">
              <p className="text-gray-600">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This is a computer generated receipt</p>
      </div>
    </div>
  );
};

export default MaterialReceipt; 