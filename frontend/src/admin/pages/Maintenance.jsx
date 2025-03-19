import { useState, useEffect } from 'react';
import { TbSearch, TbFilter, TbEdit, TbTrash, TbPlus } from 'react-icons/tb';
import { X } from 'lucide-react';
import { 
    useAddMaintenanceMutation,
    useGetMaintenanceQuery,
    useUpdateMaintenanceMutation,
    useDeleteMaintenanceMutation,
} from '../../redux/services/maintenanceSlice';

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  
  const [formData, setFormData] = useState({
    vehicle: '',
    serviceType: '',
    details: '',
    status: 'pending',
    priority: 'medium',
    cost: ''
  });

  // RTK Query hooks
  const { data: maintenanceRecords, isLoading, refetch } = useGetMaintenanceQuery();
  const [addMaintenance] = useAddMaintenanceMutation();
  const [updateMaintenance] = useUpdateMaintenanceMutation();
  const [deleteMaintenance] = useDeleteMaintenanceMutation();

  // Filter maintenance records
  const filteredMaintenance = maintenanceRecords ? maintenanceRecords.filter(item => {
    const matchesSearch = item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  // Count by status
  const scheduledCount = maintenanceRecords?.filter(item => item.status === 'pending')?.length || 0;
  const inProgressCount = maintenanceRecords?.filter(item => item.status === 'in-progress')?.length || 0;
  const completedCount = maintenanceRecords?.filter(item => item.status === 'completed')?.length || 0;

  // Calculate total cost of completed maintenance
  const totalCompletedCost = maintenanceRecords?.filter(item => item.status === 'completed')
    .reduce((total, item) => total + item.cost, 0) || 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cost' ? Number(value) : value
    });
  };

  const handleScheduleMaintenance = async (e) => {
    e.preventDefault();
    
    try {
      await addMaintenance(formData).unwrap();
      setIsModalOpen(false);
      refetch(); // Refresh the maintenance list
      
      // Reset form data
      setFormData({
        vehicle: '',
        serviceType: '',
        details: '',
        status: 'pending',
        priority: 'medium',
        cost: ''
      });
    } catch (error) {
      console.error('Failed to add maintenance:', error);
    }
  };

  const handleOpenUpdateModal = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setFormData({
      vehicle: maintenance.vehicle,
      serviceType: maintenance.serviceType,
      details: maintenance.details,
      status: maintenance.status,
      priority: maintenance.priority,
      cost: maintenance.cost
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateMaintenance = async (e) => {
    e.preventDefault();
    
    try {
      await updateMaintenance({
        id: selectedMaintenance._id, 
        data: formData
      }).unwrap();
      
      setIsUpdateModalOpen(false);
      refetch(); // Refresh the maintenance list
    } catch (error) {
      console.error('Failed to update maintenance:', error);
    }
  };

  const handleDeleteMaintenance = async (id) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      try {
        await deleteMaintenance(id).unwrap();
        refetch(); // Refresh the maintenance list
      } catch (error) {
        console.error('Failed to delete maintenance:', error);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-graylight text-graydark';
      case 'in-progress':
        return 'bg-yellowlight text-yellowdark';
      case 'completed':
        return 'bg-[#d1f5d6] text-green';
      default:
        return 'bg-graylight text-graydark';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-lightred text-darkred';
      case 'medium':
        return 'bg-yellowlight text-yellowdark';
      case 'low':
        return 'bg-graylight text-graydark';
      default:
        return 'bg-graylight text-graydark';
    }
  };

  // Format status and priority for display
  const formatLabel = (text) => {
    return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Maintenance Management</h1>
        <button 
          className="bg-blue hover:bg-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <TbPlus size={18} />
          Schedule Maintenance
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-graydark">Scheduled</h3>
            <p className="text-4xl font-bold">{scheduledCount}</p>
            {scheduledCount > 0 && <p className="text-sm mt-2 text-blue">Next: {scheduledCount} pending</p>}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-graydark">In Progress</h3>
            <p className="text-4xl font-bold">{inProgressCount}</p>
            {inProgressCount > 0 && <p className="text-sm mt-2 text-yellowdark">In progress: {inProgressCount}</p>}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-graydark">Completed This Month</h3>
            <p className="text-4xl font-bold">{completedCount}</p>
            <p className="text-sm mt-2 text-green">Total Cost: Rs.{totalCompletedCost.toLocaleString()}</p>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 bg-white border border-graylight rounded-lg text-graydark cursor-pointer"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Maintenance Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center p-4">Loading maintenance records...</div>
        ) : maintenanceRecords?.length === 0 ? (
          <div className="text-center p-4">No maintenance records found.</div>
        ) : (
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
              {filteredMaintenance.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-graylight rounded-full p-2">
                        <img src="/car-model.png" alt="Car" className="w-8 h-8 object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{item.vehicle}</p>
                        <p className="text-sm text-gray-500">{item.serviceType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p>{item.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(item.status)}`}>
                        {formatLabel(item.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(item.priority)}`}>
                        {formatLabel(item.priority)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">Rs.{item.cost.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button 
                        className="text-blue font-medium flex items-center gap-1"
                        onClick={() => handleOpenUpdateModal(item)}
                      >
                        <TbEdit size={18} /> Update
                      </button>
                      <button 
                        className="text-darkred font-medium flex items-center gap-1"
                        onClick={() => handleDeleteMaintenance(item._id)}
                      >
                        <TbTrash size={18} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Schedule Maintenance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Schedule Maintenance</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-6 w-6 text-graylight cursor-pointer" />
              </button>
            </div>
            <form onSubmit={handleScheduleMaintenance} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="vehicle"
                  placeholder="Vehicle Name"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="serviceType"
                  placeholder="Service Type"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                />
                <div className="col-span-full">
                  <textarea
                    name="details"
                    placeholder="Maintenance Details"
                    className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <select
                  name="status"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  name="priority"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="col-span-full">
                  <input
                    type="number"
                    name="cost"
                    placeholder="Maintenance Cost"
                    className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                    value={formData.cost}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-graylight hover:bg-graylight cursor-pointer" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue text-white hover:bg-[#0024b5]"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Maintenance Modal */}
      {isUpdateModalOpen && selectedMaintenance && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Update Maintenance</h2>
              <button onClick={() => setIsUpdateModalOpen(false)}>
                <X className="h-6 w-6 text-graylight cursor-pointer" />
              </button>
            </div>
            <form onSubmit={handleUpdateMaintenance} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="vehicle"
                  placeholder="Vehicle Name"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="serviceType"
                  placeholder="Service Type"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                />
                <div className="col-span-full">
                  <textarea
                    name="details"
                    placeholder="Maintenance Details"
                    className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <select
                  name="status"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  name="priority"
                  className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="col-span-full">
                  <input
                    type="number"
                    name="cost"
                    placeholder="Maintenance Cost"
                    className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                    value={formData.cost}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-graylight hover:bg-graylight cursor-pointer" 
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue text-white hover:bg-[#0024b5]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}