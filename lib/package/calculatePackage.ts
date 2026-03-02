// /lib/package/calculatePackage.ts

export const PACKAGE_PRICING = {
  ARRIVAL_PRICE: 4250,
  RETURN_PRICE: 4250,
  DAY_ONE_PRICE: 6000,
  EXTRA_DAY_PRICE: 3000,
};

export function calculatePackage(days: number) {
  const {
    ARRIVAL_PRICE,
    RETURN_PRICE,
    DAY_ONE_PRICE,
    EXTRA_DAY_PRICE,
  } = PACKAGE_PRICING;

  const extraDays = Math.max(days - 1, 0);

  const dailyTotal =
    DAY_ONE_PRICE + extraDays * EXTRA_DAY_PRICE;

  const total =
    ARRIVAL_PRICE + RETURN_PRICE + dailyTotal;

  return {
    arrival: ARRIVAL_PRICE,
    returnTransfer: RETURN_PRICE,
    dayOne: DAY_ONE_PRICE,
    extraDays,
    extraDayPrice: EXTRA_DAY_PRICE,
    dailyTotal,
    total,
  };
}