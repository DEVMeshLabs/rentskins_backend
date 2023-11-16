export function calculateDiscount(balance: number) {
  const percentDiscount = 4;
  const discountAmount = (percentDiscount / 100) * balance;
  const newBalance = balance - discountAmount;

  return { percentDiscount, discountAmount, newBalance };
}
