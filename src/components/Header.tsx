'use client';

import { expenseDetails } from '@/constants/expensesDetails';
import { incomeData } from '@/constants/incomeData';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { usePrintMode } from '@/context/PrintModeContext';
import { handleDownloadExcel, handleDownloadText } from '@/utils/downloads';

export const Header = () => {
  const { printMode } = usePrintMode();

  const calculations = useFinancialCalculations(incomeData, expenseDetails);

  const {
    harvestCommitteeTotal,
    adultContributionsTotal,
    childrenChairPersonsTotal,
    childrenMembersTotal,
    childrenHarvestDayTotal,
    childrenOutstandingTotal,
    totalChildrenCollected,
    totalIncomeCollected,
    familyHarvestTotal,
    childrenHarvestTotal,
    dedicationLogisticsTotal,
    totalActualExpenses,
    netPosition,
    totalPlannedBudget,
  } = calculations;

  const onDownloadExcel = () => {
    handleDownloadExcel(incomeData, expenseDetails, {
      harvestCommitteeTotal,
      adultContributionsTotal,
      childrenChairPersonsTotal,
      childrenMembersTotal,
      childrenHarvestDayTotal,
      childrenOutstandingTotal,
      totalChildrenCollected,
      totalIncomeCollected,
      totalActualExpenses,
      netPosition,
    });
  };

  const onDownloadText = () => {
    handleDownloadText(incomeData, expenseDetails, {
      totalIncomeCollected,
      totalActualExpenses,
      netPosition,
      harvestCommitteeTotal,
      adultContributionsTotal,
      childrenChairPersonsTotal,
      childrenMembersTotal,
      childrenHarvestDayTotal,
      childrenOutstandingTotal,
      totalChildrenCollected,
      familyHarvestTotal,
      childrenHarvestTotal,
      dedicationLogisticsTotal,
      totalPlannedBudget,
    });
  };

  return (
    <header
      className={`${
        printMode
          ? 'bg-white border-b-2 border-black'
          : 'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700'
      } shadow-lg print:shadow-none transition-all duration-300 rounded-xl mb-6 print:mb-2`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 print:py-2'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 print:gap-2'>
          {/* Title Section */}
          <div className='flex-1'>
            <div className='flex items-center gap-3 print:gap-2 mb-2 print:mb-1'>
              <div
                className={`${
                  printMode
                    ? 'bg-black text-white'
                    : 'bg-white/20 text-white backdrop-blur-sm'
                } p-2 print:p-1 rounded-lg`}>
                <svg
                  className='w-6 h-6 print:w-4 print:h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h1
                className={`${
                  printMode ? 'text-black' : 'text-white'
                } text-2xl sm:text-3xl print:text-lg font-bold tracking-tight`}>
                C&S Movt. VOM Harvest Committee 2025
              </h1>
            </div>

            <p
              className={`${
                printMode ? 'text-gray-700' : 'text-purple-100'
              } text-lg print:text-sm font-medium mb-1`}>
              Comprehensive Financial Report
            </p>

            <p
              className={`${
                printMode ? 'text-gray-600' : 'text-purple-200'
              } text-sm print:text-xs flex items-center gap-2 print:gap-1`}>
              <svg
                className='w-4 h-4 print:w-3 print:h-3'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              Period: July - October 2025 | Generated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-wrap gap-3 print:hidden'>
            <button
              onClick={onDownloadExcel}
              className={`${
                printMode
                  ? 'bg-black text-white border-2 border-black hover:bg-gray-800'
                  : 'bg-white text-purple-700 hover:bg-purple-50'
              } px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2`}>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Download Excel
            </button>

            <button
              onClick={onDownloadText}
              className={`${
                printMode
                  ? 'bg-white text-black border-2 border-black hover:bg-gray-100'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              } px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2`}>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
