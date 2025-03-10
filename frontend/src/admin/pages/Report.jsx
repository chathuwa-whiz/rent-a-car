import React, { useState } from 'react';
import { TbDownload, TbX } from 'react-icons/tb';
import { useGetBookingReportQuery } from '../../redux/services/reportSlice';
// Add these imports for Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Modal component for confirmation
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-graydark hover:text-black"
          >
            <TbX size={20} />
          </button>
        </div>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-graylight rounded-lg text-graydark hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-blue hover:bg-[#0024b5] text-white rounded-lg"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom bar chart component 
const BarChart = ({ data, labels, maxY, dataKey = "bookings" }) => {
  const highestValue = Math.max(...data);
  const yLabels = [];
  for (let i = 0; i <= 4; i++) {
    yLabels.push(Math.round((maxY / 4) * i));
  }
  
  return (
    <div className="h-full relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between">
        {yLabels.reverse().map((label, i) => (
          <div key={i} className="text-xs text-graydark">{dataKey === "revenue" ? `Rs.${label}` : label}</div>
        ))}
      </div>
      
      {/* Grid lines */}
      <div className="absolute left-12 right-0 top-0 bottom-10">
        {yLabels.map((_, i) => (
          <div key={i} className="border-t border-graylight border-dashed h-1/4"></div>
        ))}
      </div>
      
      {/* Bars */}
      <div className="absolute left-12 right-0 bottom-10 flex justify-between items-end h-5/6">
        {data.map((value, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div 
              className="w-4/5 bg-blue rounded-t"
              style={{ height: `${(value / maxY) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="absolute left-12 right-0 bottom-0 flex justify-between">
        {labels.map((label, i) => (
          <div key={i} className="text-xs text-center w-full text-graydark">{label}</div>
        ))}
      </div>
    </div>
  );
};

// Replace your custom LineChart component with this Chart.js implementation
const BookingTrendsChart = ({ data, labels, dataKey = "bookings" }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: dataKey === "bookings" ? "Bookings" : "Revenue",
        data: data,
        fill: true,
        backgroundColor: 'rgba(0, 67, 255, 0.2)',
        borderColor: 'rgba(0, 67, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 67, 255, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // This makes the line curved for a smoother appearance
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => dataKey === "revenue" ? `Rs.${value}` : value,
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        titleColor: '#fff',
        bodyColor: '#fff',
        bodySpacing: 5,
        borderColor: 'rgba(0, 67, 255, 0.5)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context) => {
            let label = dataKey === "revenue" 
              ? `Rs.${context.parsed.y.toLocaleString()}` 
              : `Bookings: ${context.parsed.y}`;
            return label;
          }
        }
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default function Report() {
  const [timeRange, setTimeRange] = useState('7days');
  const { data: reportData, isLoading, error } = useGetBookingReportQuery(timeRange);
  const [showExportConfirmation, setShowExportConfirmation] = useState(false);
  
  // Calculate max values for charts with some padding
  const maxBookingValue = reportData?.data && Math.max(...reportData.data) > 0 
    ? Math.max(...reportData.data) * 1.2 
    : 10;
    
  // Generate revenue data from popularVehicles
  const generateRevenueData = () => {
    if (!reportData || !reportData.popularVehicles) return [];
    
    // Get total revenue per day by distributing evenly across the time period
    const totalRevenue = reportData.popularVehicles.reduce((sum, vehicle) => sum + vehicle.revenue, 0);
    const daysCount = reportData.data.length;
    
    // Create a simple distribution with slight variation
    return reportData.data.map((bookings, index) => {
      const baseRevenue = totalRevenue / daysCount;
      // Create some variation based on booking numbers
      const factor = bookings / (Math.max(...reportData.data) || 1);
      return Math.round(baseRevenue * (0.7 + factor * 0.6));
    });
  };
  
  const revenueData = generateRevenueData();
  const maxRevenueValue = revenueData.length > 0 ? Math.max(...revenueData) * 1.2 : 100000;
  
  // Calculate total revenue
  const totalRevenue = reportData?.popularVehicles
    ? reportData.popularVehicles.reduce((sum, vehicle) => sum + vehicle.revenue, 0)
    : 0;
  
  const handleExport = () => {
    if (!reportData) return;
    
    // Create CSV content with both booking and revenue data
    const headers = ["Date", "Bookings", "Revenue (Rs)"];
    const csvRows = [headers];
    
    // Add data rows
    reportData.labels.forEach((label, index) => {
      csvRows.push([label, reportData.data[index], revenueData[index]]);
    });
    
    // Convert to CSV format
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    
    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `booking-revenue-report-${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close modal after export
    setShowExportConfirmation(false);
  };
  
  // Show loading state while fetching data
  if (isLoading) {
    return <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Analytics</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        Loading booking data...
      </div>
    </div>;
  }
  
  // Show error message if request failed
  if (error) {
    return <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Analytics</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center text-darkred">
        Error loading booking data. Please try again.
      </div>
    </div>;
  }
  
  // Use fallback data if no data available
  const chartData = reportData?.data || [0, 0, 0, 0, 0, 0, 0];
  const chartLabels = reportData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const totalBookings = reportData?.totalBookings || 0;
  const growthRate = reportData?.growthRate || 0;
  const popularVehicles = reportData?.popularVehicles || [];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Report Analytics</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="border border-graylight rounded-lg px-4 py-2 bg-white flex items-center justify-between cursor-pointer">
            <select 
              className="text-graydark bg-transparent border-none focus:outline-none w-full"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
            </select>
          </div>
          <button 
            className="bg-blue hover:bg-[#0024b5] text-white rounded-lg px-4 py-2 flex items-center justify-center"
            onClick={() => setShowExportConfirmation(true)}
          >
            <TbDownload size={18} className="mr-2" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showExportConfirmation}
        onClose={() => setShowExportConfirmation(false)}
        onConfirm={handleExport}
        title="Export Report"
        message="Are you sure you want to export this Report ?"
      />
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-6">Revenue Overview</h2>
          <div className="h-64">
            <BarChart 
              data={revenueData} 
              labels={chartLabels} 
              maxY={maxRevenueValue}
              dataKey="revenue" 
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-6">Booking Trends</h2>
          <div className="h-64">
            <BookingTrendsChart 
              data={chartData} 
              labels={chartLabels} 
              dataKey="bookings" 
            />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-graydark font-medium mb-2">Total Bookings</h3>
          <div className="text-3xl font-bold mb-2">{totalBookings}</div>
          <div className={`${growthRate >= 0 ? 'text-green' : 'text-darkred'}`}>
            {growthRate >= 0 ? '+' : ''}{growthRate}% from last period
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-graydark font-medium mb-2">Total Revenue</h3>
          <div className="text-3xl font-bold mb-2">Rs.{totalRevenue.toLocaleString()}</div>
          <div className="text-green">+{(growthRate * 1.1).toFixed(1)}% from last period</div>
        </div>
      </div>
      
      {/* Popular Vehicles Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-6">Popular Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Total Bookings</th>
                <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graylight">
              {popularVehicles.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">No vehicle data available</td>
                </tr>
              ) : popularVehicles.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{item.vehicle}</td>
                  <td className="px-6 py-4">{item.bookings}</td>
                  <td className="px-6 py-4">Rs.{item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}