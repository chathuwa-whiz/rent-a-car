import Booking from "../model/Booking.js";
import Vehicle from "../model/Vehicle.js";
import Report from "../model/Report.js";

// Generate booking reports - summaries of booking data
export const generateBookingReport = async (req, res) => {
  try {
    const { period = "7days" } = req.query;

    // Create date range
    const endDate = new Date();
    let startDate = new Date();
    let dateFormat;
    let groupByKey;

    switch (period) {
      case "30days":
        startDate.setDate(endDate.getDate() - 30);
        dateFormat = { day: "numeric" };
        groupByKey = (date) => date.getDate();
        break;
      case "6months":
        startDate.setMonth(endDate.getMonth() - 6);
        dateFormat = { month: "short" };
        groupByKey = (date) => date.getMonth();
        break;
      default: // 7days
        startDate.setDate(endDate.getDate() - 7);
        dateFormat = { weekday: "short" };
        groupByKey = (date) => date.getDay();
    }

    // Get all bookings in date range
    const bookings = await Booking.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("vehicle");

    // Get previous period's bookings for comparison
    const previousPeriodStart = new Date(startDate);
    const daysInPeriod = (endDate - startDate) / (1000 * 60 * 60 * 24);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - daysInPeriod);

    const previousPeriodBookings = await Booking.find({
      createdAt: {
        $gte: previousPeriodStart,
        $lt: startDate,
      },
    });

    // Calculate growth rate
    let growthRate = 0;
    if (previousPeriodBookings.length > 0) {
      growthRate =
        ((bookings.length - previousPeriodBookings.length) /
          previousPeriodBookings.length) *
        100;
    }

    // Group bookings by date
    const groupedData = {};
    const dateLabels = [];

    // Create all dates in range for consistent labels
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = currentDate.toLocaleDateString("en-US", dateFormat);
      dateLabels.push(dateKey);
      groupedData[dateKey] = 0;

      if (period === "7days") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (period === "30days") {
        currentDate.setDate(currentDate.getDate() + 5); // Group by 5 days
      } else {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    // Count bookings for each date
    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.createdAt);
      const dateKey = bookingDate.toLocaleDateString("en-US", dateFormat);

      if (groupedData[dateKey] !== undefined) {
        groupedData[dateKey]++;
      }
    });

    // Format response
    const response = {
      period,
      labels: dateLabels,
      data: dateLabels.map((label) => groupedData[label]),
      totalBookings: bookings.length,
      growthRate: parseFloat(growthRate.toFixed(1)),
      popularVehicles: getPopularVehicles(bookings),
    };

    // Save report to database
    const report = new Report({
      type: "booking",
      period:
        period === "7days"
          ? "daily"
          : period === "30days"
          ? "weekly"
          : "monthly",
      date: new Date(),
      data: response,
      metrics: {
        count: bookings.length,
        growth: growthRate,
      },
    });

    await report.save();

    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating booking report:", error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function to get popular vehicles
function getPopularVehicles(bookings) {
  const vehicleMap = {};

  bookings.forEach((booking) => {
    if (!booking.vehicle) return;

    const vehicleId = booking.vehicle._id.toString();
    const vehicleName = `${booking.vehicle.brand} ${booking.vehicle.model}`;

    if (!vehicleMap[vehicleId]) {
      vehicleMap[vehicleId] = {
        vehicle: vehicleName,
        bookings: 0,
        revenue: 0,
      };
    }

    vehicleMap[vehicleId].bookings++;
    vehicleMap[vehicleId].revenue += booking.total || 0;
  });

  return Object.values(vehicleMap)
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5);
}

// Get all saved reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
