import { FaPills, FaClinicMedical } from 'react-icons/fa'
import { FiDownload, FiPrinter } from 'react-icons/fi'
import Card from '@/components/Card'
import Button from '@/components/Button'

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
      status: 'Active'
    },
    {
      id: 2,
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Michael Chen',
      date: '2023-04-28',
      refills: 0,
      status: 'Completed'
    },
    {
      id: 3,
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Emily Wilson',
      date: '2023-06-01',
      refills: 3,
      status: 'Active'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
        <Button icon={<FaClinicMedical />}>Request Refill</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescribed By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((rx) => (
                <tr key={rx.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaPills className="text-blue-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{rx.medication}</div>
                        <div className="text-sm text-gray-500">{rx.dosage}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rx.frequency}</div>
                    <div className="text-sm text-gray-500">{rx.refills} refill(s) left</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rx.prescribedBy}</div>
                    <div className="text-sm text-gray-500">{rx.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rx.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 flex items-center">
                      <FiDownload className="mr-1" /> PDF
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 flex items-center">
                      <FiPrinter className="mr-1" /> Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800">Prescription Refill Policy</h3>
        <p className="mt-1 text-sm text-blue-700">
          Please allow 2-3 business days for prescription refill requests to be processed. 
          Controlled substances may require an office visit before refill approval.
        </p>
      </div>
    </div>
  )
}