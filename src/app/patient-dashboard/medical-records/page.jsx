import { FiFileText, FiDownload, FiSearch } from 'react-icons/fi'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function MedicalRecordsPage() {
  const records = [
    {
      id: 1,
      type: 'Lab Results',
      name: 'Complete Blood Count (CBC)',
      date: '2023-06-10',
      doctor: 'Dr. Sarah Johnson',
      fileType: 'PDF',
      size: '2.4 MB'
    },
    {
      id: 2,
      type: 'Imaging',
      name: 'Chest X-Ray',
      date: '2023-05-22',
      doctor: 'Dr. Michael Chen',
      fileType: 'DICOM',
      size: '15.7 MB'
    },
    {
      id: 3,
      type: 'Visit Summary',
      name: 'Annual Physical Exam',
      date: '2023-04-15',
      doctor: 'Dr. Emily Wilson',
      fileType: 'PDF',
      size: '1.2 MB'
    },
    {
      id: 4,
      type: 'Immunization',
      name: 'Flu Vaccine Record',
      date: '2022-10-05',
      doctor: 'Dr. Robert Garcia',
      fileType: 'PDF',
      size: '0.8 MB'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <div className="flex space-x-3">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Search records..."
            />
          </div>
          <Button>Upload Records</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Record Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Info
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiFileText className="text-blue-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.name}</div>
                    <div className="text-sm text-gray-500">{record.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.fileType}</div>
                    <div className="text-sm text-gray-500">{record.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center">
                      <FiDownload className="mr-1" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-800">Request Medical Records</h3>
        <p className="mt-1 text-sm text-gray-600">
          Need records sent to another provider? <a href="#" className="text-blue-600 hover:text-blue-500">Submit a records release form</a>.
        </p>
      </div>
    </div>
  )
}