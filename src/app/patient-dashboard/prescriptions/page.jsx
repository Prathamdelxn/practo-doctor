import { FaPills, FaClinicMedical, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FiDownload, FiPrinter, FiPlus } from 'react-icons/fi';
import { MdHealthAndSafety, MdOutlineMedication } from 'react-icons/md';
import Card from '@/components/Card';
import Button from '@/components/Button';

function StatusBadge({ status }) {
  const statusStyles = {
    Active: 'bg-green-100 text-green-800',
    Completed: 'bg-gray-100 text-gray-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: 1,
      medication: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2023-05-15',
      refills: 2,
      status: 'Active',
      type: 'Cholesterol',
      lastFilled: '2023-06-10'
    },
    {
      id: 2,
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Michael Chen',
      date: '2023-04-28',
      refills: 0,
      status: 'Completed',
      type: 'Blood Pressure',
      lastFilled: '2023-05-15'
    },
    {
      id: 3,
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Emily Wilson',
      date: '2023-06-01',
      refills: 3,
      status: 'Active',
      type: 'Diabetes',
      lastFilled: '2023-06-05'
    }
  ];

  // Simple Empty State component (included directly in file)
  function EmptyState({ icon, title, description, action }) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex items-center justify-center h-12 w-12 text-blue-400">
          {icon}
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-500 mt-1">View and manage your current medications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={<FiPlus />}>
            New Request
          </Button>
          <Button icon={<FaClinicMedical />} className="bg-blue-600 hover:bg-blue-700">
            Request Refill
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <MdOutlineMedication size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Prescriptions</p>
              <h3 className="text-2xl font-bold text-gray-800">2</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FaRegClock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Refills</p>
              <h3 className="text-2xl font-bold text-gray-800">1</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <MdHealthAndSafety size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Prescribers</p>
              <h3 className="text-2xl font-bold text-gray-800">3</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Prescriptions Table */}
      <Card className="border-0 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Current Medications</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center">
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                  Medication
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                  Prescription Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaPills className="text-blue-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{rx.medication}</div>
                        <div className="text-xs text-gray-500">{rx.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{rx.dosage}</div>
                    <div className="text-xs text-gray-500">{rx.frequency}</div>
                    <div className="text-xs text-blue-600 mt-1 flex items-center">
                      <FaRegClock className="mr-1" size={12} /> {rx.refills} refill(s) left
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{rx.prescribedBy}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <FaRegCalendarAlt className="mr-1" size={12} /> Prescribed: {rx.date}
                    </div>
                    {rx.lastFilled && (
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <FaRegCalendarAlt className="mr-1" size={12} /> Last filled: {rx.lastFilled}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={rx.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100">
                      <FiDownload size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
                      <FiPrinter size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {prescriptions.length === 0 && (
          <EmptyState 
            icon={<MdOutlineMedication size={48} className="text-blue-400" />}
            title="No Prescriptions Found"
            description="You don't have any active prescriptions at this time."
            action={
              <Button icon={<FaClinicMedical />} className="bg-blue-600 hover:bg-blue-700">
                Request New Prescription
              </Button>
            }
          />
        )}
      </Card>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
              <MdHealthAndSafety size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Prescription Refill Policy</h3>
              <p className="mt-1 text-sm text-blue-700">
                Please allow 2-3 business days for prescription refill requests to be processed. 
                Controlled substances may require an office visit before refill approval.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-blue-50 border-blue-100">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
              <FaPills size={18} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Medication Safety Tips</h3>
              <ul className="mt-1 text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Take medications at the same time each day</li>
                <li>Store in a cool, dry place away from sunlight</li>
                <li>Never share prescriptions with others</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}