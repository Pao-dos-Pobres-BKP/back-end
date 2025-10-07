import { isBefore } from "date-fns";

export function handleDateRange(
  startDate: Date,
  endDate: Date
): { message: string } {
  const currentDate = new Date();

  if (isBefore(currentDate, startDate)) {
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
