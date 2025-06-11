"use client";
import { useState, useRef, useEffect } from 'react';
import { 
  FiDownload, 
  FiPrinter, 
  FiSearch, 
  FiFilter, 
  FiDollarSign, 
  FiCalendar, 
  FiUser,
  FiClock,
  FiX,
  FiFileText,
  FiEye
} from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

export default function Billing() {
  // Sample invoice data with two more entries
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      client: 'Acme Corp',
      date: '2023-05-15',
      dueDate: '2023-06-15',
      amount: 1250.00,
      status: 'Paid',
      items: [
        { description: 'Website Design', quantity: 1, price: 1000.00 },
        { description: 'Hosting (1 year)', quantity: 1, price: 250.00 }
      ]
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      date: '2023-06-01',
      dueDate: '2023-07-01',
      amount: 850.50,
      status: 'Pending',
      items: [
        { description: 'SEO Services', quantity: 1, price: 500.00 },
        { description: 'Content Writing', quantity: 5, price: 70.10 }
      ]
    },
    {
      id: 'INV-003',
      client: 'Stark Industries',
      date: '2023-06-10',
      dueDate: '2023-07-10',
      amount: 3200.75,
      status: 'Paid',
      items: [
        { description: 'Mobile App Development', quantity: 1, price: 2500.00 },
        { description: 'UI/UX Design', quantity: 1, price: 700.75 }
      ]
    },
    {
      id: 'INV-004',
      client: 'Wayne Enterprises',
      date: '2023-06-15',
      dueDate: '2023-07-15',
      amount: 1500.00,
      status: 'Overdue',
      items: [
        { description: 'Consulting Services', quantity: 10, price: 150.00 }
      ]
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const printRef = useRef();
  const modalPrintRef = useRef();

  // Handle print from main view
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
    removeAfterPrint: true
  });

  // Handle print from modal
  const handleModalPrint = useReactToPrint({
    content: () => modalPrintRef.current,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
    removeAfterPrint: true
  });

  // Handle download as PDF
  const handleDownload = () => {
    try {
      if (selectedInvoice) {
        handleModalPrint();
      } else {
        handlePrint();
      }
    } catch (error) {
      console.error('Error during download:', error);
    }
  };

  // Open invoice details modal
  const openInvoiceModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Billing Dashboard</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <FiDownload className="mr-2" /> Export
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <FiPrinter className="mr-2" /> Print
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${invoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiDollarSign className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Overdue Invoices</p>
                <p className="text-2xl font-bold text-red-600">
                  ${invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiCalendar className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiClock className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            <FiFilter className="mr-2" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${invoice.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button 
                      onClick={() => openInvoiceModal(invoice)}
                      className="text-blue-600 hover:text-blue-800 mr-3 transition-colors duration-200"
                    >
                      <FiEye className="inline mr-1" /> View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      <FiDownload className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details Modal with Blurred Background */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-200 p-6 sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">Invoice Details</h2>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">From</h3>
                  <p className="text-gray-600">Your Company Name</p>
                  <p className="text-gray-600">123 Business Street</p>
                  <p className="text-gray-600">City, State 10001</p>
                  <p className="text-gray-600">Email: billing@yourcompany.com</p>
                </div>
                
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Invoice #{selectedInvoice.id}</h3>
                  <p className="text-gray-600">Date: {selectedInvoice.date}</p>
                  <p className="text-gray-600">Due Date: {selectedInvoice.dueDate}</p>
                  <p className="text-gray-600">Status: 
                    <span className={`ml-2 px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        selectedInvoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {selectedInvoice.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bill To</h3>
                <p className="text-gray-600">{selectedInvoice.client}</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="text-gray-800">$0.00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-800 font-semibold">Total</span>
                    <span className="text-gray-800 font-bold">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0">
              <button 
                onClick={handleModalPrint}
                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <FiPrinter className="mr-2" /> Print
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <FiDownload className="mr-2" /> Download
              </button>
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice (hidden by default) */}
      <div style={{ display: 'none' }}>
        <div 
          ref={printRef} 
          className="p-8 max-w-3xl mx-auto"
        >
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                <p className="text-gray-600 mt-2">#INV-000</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-semibold">Your Company</p>
                <p className="text-gray-600">123 Business Street</p>
                <p className="text-gray-600">City, State 10001</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Bill To</h2>
              <p className="text-gray-600">Client Name</p>
            </div>
            
            <div className="text-right">
              <div className="mb-2">
                <span className="text-gray-600">Date: </span>
                <span className="text-gray-800">2023-01-01</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-600">Due Date: </span>
                <span className="text-gray-800">2023-02-01</span>
              </div>
              <div>
                <span className="text-gray-600">Status: </span>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sample Item</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$100.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">$100.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax (0%)</span>
                <span className="text-gray-800">$0.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-800 font-semibold">Total</span>
                <span className="text-gray-800 font-bold">$100.00</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">Thank you for your business!</p>
            <p className="text-gray-600 text-sm">Please make payment by the due date to avoid late fees.</p>
          </div>
        </div>
      </div>

      {/* Printable Invoice for Modal (hidden by default) */}
      {isModalOpen && selectedInvoice && (
        <div style={{ display: 'none' }}>
          <div 
            ref={modalPrintRef} 
            className="p-8 max-w-3xl mx-auto"
          >
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                  <p className="text-gray-600 mt-2">#{selectedInvoice.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">Your Company</p>
                  <p className="text-gray-600">123 Business Street</p>
                  <p className="text-gray-600">City, State 10001</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Bill To</h2>
                <p className="text-gray-600">{selectedInvoice.client}</p>
              </div>
              
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-gray-600">Date: </span>
                  <span className="text-gray-800">{selectedInvoice.date}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-600">Due Date: </span>
                  <span className="text-gray-800">{selectedInvoice.dueDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status: </span>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      selectedInvoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${selectedInvoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax (0%)</span>
                  <span className="text-gray-800">$0.00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-800 font-semibold">Total</span>
                  <span className="text-gray-800 font-bold">${selectedInvoice.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">Thank you for your business!</p>
              <p className="text-gray-600 text-sm">Please make payment by the due date to avoid late fees.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}