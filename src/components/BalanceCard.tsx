import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface BalanceCardProps {
  netPosition: number;
  actualBalance: number;
  loansTotal: number;
  printMode: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  netPosition,
  actualBalance,
  loansTotal,
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
          <h3 className='text-xl font-bold mb-2'>Net Position</h3>
          <p className='text-3xl font-bold'>{formatCurrency(netPosition)}</p>
          <p className={`text-sm mt-2 ${printMode ? '' : 'opacity-90'}`}>
            Income - Expenses
          </p>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-2'>Loans Borrowed</h3>
          <p className='text-3xl font-bold text-red-300'>
            -{formatCurrency(loansTotal)}
          </p>
          <p className={`text-sm mt-2 ${printMode ? '' : 'opacity-90'}`}>
            Money borrowed for expenses
          </p>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-2'>Actual Balance</h3>
          <p className='text-3xl font-bold'>
            {formatCurrency(actualBalance)}
          </p>
          <p className={`text-sm mt-2 ${printMode ? '' : 'opacity-90'}`}>
            Net position minus loans ({formatCurrency(netPosition)} - {formatCurrency(loansTotal)})
          </p>
        </div>
      </div>
    </div>
  );
};
