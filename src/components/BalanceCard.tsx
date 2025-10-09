import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface BalanceCardProps {
  netPosition: number;
  totalIncomeCollected: number;
  totalActualExpenses: number;
  childrenOutstandingTotal: number;
  printMode: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  netPosition,
  totalIncomeCollected,
  totalActualExpenses,
  childrenOutstandingTotal,
  printMode,
}) => {
  return (
    <div
      className={`${
        printMode
          ? 'bg-white border-2 border-black'
          : 'bg-gradient-to-r from-green-500 to-emerald-600'
      } rounded-lg shadow-lg p-6 ${
        printMode ? 'text-black' : 'text-white'
      } mb-6`}>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h3 className='text-xl font-bold mb-2'>Expected Account Balance</h3>
          <p className='text-3xl font-bold'>{formatCurrency(netPosition)}</p>
          <p className={`text-sm mt-2 ${printMode ? '' : 'opacity-90'}`}>
            Total amount in committee account
          </p>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-2'>Current Account Balance</h3>
          <p className='text-3xl font-bold'>
            {formatCurrency(netPosition - childrenOutstandingTotal)}
          </p>
          <p className={`text-sm mt-2 ${printMode ? '' : 'opacity-90'}`}>
            This is total account balance - outstanding amount
          </p>
        </div>
        <div className='text-right'>
          <p className={`text-sm ${printMode ? '' : 'opacity-90'}`}>
            Total Income
          </p>
          <p className='text-xl font-semibold'>
            {formatCurrency(totalIncomeCollected)}
          </p>
          <p className={`text-sm mt-2 ${printMode ? '' : 'opacity-90'}`}>
            Total Expenses
          </p>
          <p className='text-xl font-semibold'>
            {formatCurrency(totalActualExpenses)}
          </p>
        </div>
      </div>
    </div>
  );
};
