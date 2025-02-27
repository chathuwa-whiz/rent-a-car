import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths,
  getDay
} from 'date-fns';
import { TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb';

export default function Calendar({ bookingDates = [], onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get days in current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const startDay = getDay(monthStart);
  
  // Navigation functions
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  
  // Check if a date has a booking
  const hasBooking = (date) => {
    return bookingDates.some(bookingDate => {
      const bookingDateObj = new Date(bookingDate);
      return (
        date.getDate() === bookingDateObj.getDate() &&
        date.getMonth() === bookingDateObj.getMonth() &&
        date.getFullYear() === bookingDateObj.getFullYear()
      );
    });
  };

  // Generate calendar grid
  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10"></div>
      );
    }
    
    // Add days of the month
    daysInMonth.forEach(day => {
      const isBookingDay = hasBooking(day);
      const isTodayDate = isToday(day);
      
      days.push(
        <div 
          key={day.toString()} 
          className={`
            flex items-center justify-center h-10 rounded-full cursor-pointer transition-colors
            ${isBookingDay ? 'bg-blue text-white hover:bg-opacity-90' : 'hover:bg-graylight hover:bg-opacity-20'}
            ${isTodayDate && !isBookingDay ? 'border border-blue text-blue' : ''}
          `}
          onClick={() => console.log(`Selected date: ${format(day, 'yyyy-MM-dd')}`)}
        >
          {format(day, 'd')}
        </div>
      );
    });
    
    return days;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={prevMonth}
          >
            <TbChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={nextMonth}
          >
            <TbChevronRight size={20} />
          </button>
        </div>
        <button 
          className="text-graydark hover:text-black"
          onClick={onClose}
        >
          <TbX size={20} />
        </button>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-graydark">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue"></div>
          <span className="text-sm text-graydark">Days with bookings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-blue"></div>
          <span className="text-sm text-graydark">Today</span>
        </div>
      </div>
    </div>
  );
};