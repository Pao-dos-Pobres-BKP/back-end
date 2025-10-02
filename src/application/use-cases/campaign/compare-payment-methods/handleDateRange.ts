export function handleDateRange(
  startDate: Date,
  endDate: Date
): { message: string } {
  if (!(startDate instanceof Date)) {
    return {
      message: "Start date must be a valid Date object"
    };
  }

  if (!(endDate instanceof Date)) {
    return {
      message: "End date must be a valid Date object"
    };
  }

  if (startDate && startDate < new Date()) {
    return {
      message: "Campaign starting date must be in the future"
    };
  }

  if (startDate && endDate && endDate <= startDate) {
    return {
      message: "Campaign ending date must be after the starting date"
    };
  }

  return null;
}
