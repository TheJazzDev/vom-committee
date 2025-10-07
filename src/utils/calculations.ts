export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotal = (arr: IncomeItem[]): number =>
  arr.reduce((sum, item) => sum + item.amount, 0);

export const calculateExpenseTotal = (items: ExpenseItem[]): number =>
  items.reduce((sum, item) => sum + item.actual, 0);
