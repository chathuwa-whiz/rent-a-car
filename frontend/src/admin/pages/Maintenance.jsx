import { TbSearch, TbFilter, TbEdit } from 'react-icons/tb';

export default function Maintenance() {
  const maintenanceData = [
    {
      id: 1,
      vehicle: "Hyundai Creta",
      type: "Regular Service",
      details: "Oil change, brake inspection, and general maintenance",
      technician: "Mike Johnson",
      status: "Scheduled",
      priority: "Medium",
      cost: "Rs.15,000"
    },
    {
      id: 2,
      vehicle: "Hyundai Creta",
      type: "Regular Service",
      details: "Oil change, brake inspection, and general maintenance",
      technician: "Mike Johnson",
      status: "In Progress",
      priority: "High",
      cost: "Rs.15,000"
    },
    {
      id: 3,
      vehicle: "Hyundai Creta",
      type: "Regular Service",
      details: "Oil change, brake inspection, and general maintenance",
      technician: "Mike Johnson",
      status: "Scheduled",
      priority: "Medium",
      cost: "Rs.15,000"
    },
    {
      id: 4,
      vehicle: "Hyundai Creta",
      type: "Regular Service",
      details: "Oil change, brake inspection, and general maintenance",
      technician: "Mike Johnson",
      status: "In Progress",
      priority: "High",
      cost: "Rs.15,000"
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-graylight text-graydark';
      case 'In Progress':
        return 'bg-yellowlight text-yellowdark';
      case 'Completed':
        return 'bg-graylight text-graydark';
      default:
        return 'bg-graylight text-graydark';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-lightred text-darkred';
      case 'Medium':
        return 'bg-yellowlight text-yellowdark';
      case 'Low':
        return 'bg-graylight text-graydark';
      default:
        return 'bg-graylight text-graydark';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Maintenance Management</h1>
        <button className="bg-blue hover:bg-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <TbEdit size={18} />
          Schedule Maintenance
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-graydark">Scheduled</h3>
            <p className="text-4xl font-bold">8</p>
            <p className="text-sm mt-2 text-blue">Next: Tomorrow</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-graydark">In Progress</h3>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm mt-2 text-yellowdark">Estimated Completion: 2 days</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-graydark">Completed This Month</h3>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm mt-2 text-green">Total Cost: Rs.1,000,000</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <TbSearch className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-graydark bg-white border border-graylight rounded-lg focus:outline-none focus:ring-1 focus:ring-blue focus:border-blue"
            placeholder="Search Maintenance Records"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-graylight rounded-lg text-graydark">
          <TbFilter size={20} />
          All Status
        </button>
      </div>

      {/* Maintenance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle & Type
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Priority
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graylight">
            {maintenanceData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-graylight rounded-full p-2">
                      <img src="/car-model.png" alt="Car" className="w-8 h-8 object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{item.vehicle}</p>
                      <p className="text-sm text-gray-500">{item.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p>{item.details}</p>
                  <p className="text-sm text-gray-500">Technician: {item.technician}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{item.cost}</td>
                <td className="px-6 py-4">
                  <button className="text-blue font-medium">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};