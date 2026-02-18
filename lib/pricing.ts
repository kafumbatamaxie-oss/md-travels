export const RATES = {
  AIRPORT_TRANSFER_RETURN: 8500,
  DAILY_TRIP_BASE: 4000, // R12,000 / 3 days
};

export function calculateBookingTotal(data: any) {
  let total = 0;
  const days = Math.ceil((new Date(data.dropoffDate).getTime() - new Date(data.pickupDate).getTime()) / (1000 * 60 * 60 * 24));

  if (data.serviceId === 'airport-transfer') {
    total = RATES.AIRPORT_TRANSFER_RETURN;
  } else if (data.serviceId === 'daily-tours') {
    total = days * RATES.DAILY_TRIP_BASE;
  }
  
  return { total, days };
}
