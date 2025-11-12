'use client';

import { formatCurrency } from '@/utils/calculations';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { usePrintMode } from '@/context/PrintModeContext';

export const Report = () => {
  const { printMode } = usePrintMode();

  const {
    totalIncomeCollected,
    totalActualExpenses,
    netPosition,
    harvestCommitteeTotal,
    adultContributionsTotal,
    totalChildrenCollected,
    familyHarvestTotal,
    childrenHarvestTotal,
    dedicationLogisticsTotal,
    totalPlannedBudget,
  } = useFinancialCalculations(incomeData, expenseDetails);

  return (
    <div>
      <div className='mb-8 print:hidden'>
        <h1
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            printMode ? 'text-black' : 'text-gray-900'
          }`}>
          Comprehensive Financial Report
        </h1>
        <p
          className={`text-lg mb-4 ${
            printMode ? 'text-black' : 'text-gray-600'
          }`}>
          Complete financial documentation for the C&S Movement VOM Harvest
          Committee 2025. This executive report consolidates all income,
          expenses, analysis, and recommendations in a print-ready format
          suitable for stakeholder distribution and archival purposes.
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6`}>
          <div
            className={`p-4 rounded-lg ${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-gradient-to-br from-indigo-50 to-indigo-100'
            }`}>
            <div className='flex items-center gap-3 mb-2'>
              <svg
                className='w-6 h-6'
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
              <h3
                className={`font-bold ${
                  printMode ? 'text-black' : 'text-indigo-900'
                }`}>
                Report Period
              </h3>
            </div>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-indigo-700'
              }`}>
              June - October 2025
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-gradient-to-br from-purple-50 to-purple-100'
            }`}>
            <div className='flex items-center gap-3 mb-2'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                />
              </svg>
              <h3
                className={`font-bold ${
                  printMode ? 'text-black' : 'text-purple-900'
                }`}>
                Print Ready
              </h3>
            </div>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-purple-700'
              }`}>
              Optimized for professional printing
            </p>
          </div>
        </div>

        <div
          className={`px-4 py-3 rounded-lg ${
            printMode
              ? 'bg-gray-100 border border-black'
              : 'bg-green-50 border-l-4 border-green-500'
          }`}>
          <p
            className={`text-sm ${
              printMode ? 'text-black' : 'text-green-800'
            }`}>
            <strong>✅ This report includes:</strong> Executive summary,
            detailed income & expense breakdowns, financial analysis, harvest
            program reports, variance analysis, and actionable recommendations
            for committee review.
          </p>
        </div>
      </div>

      <div className='p-8 print:p-2'>
        {/* Header */}
        <div className='text-center mb-8 print:mb-2'>
          <h2 className='text-2xl print:text-xl font-bold'>
            CHERUBIM & SERAPHIM MOVEMENT CHURCH
          </h2>
          <h3 className='text-lg print:text-base font-semibold mb-2 print:mb-1'>VALLEY OF MERCY</h3>
          <h3 className='text-xl print:text-lg font-semibold mb-1'>
            HARVEST COMMITTEE FINANCIAL REPORT 2025
          </h3>
          <p className='text-sm print:text-xs'>Period: July - October 2025</p>
          <p className='text-sm print:text-xs'>
            Generated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className='space-y-6 print:space-y-2'>
          {/* Executive Summary */}
          <div
            className={`py-4 print:py-1 ${
              printMode
                ? 'border-t-2 border-b-2 border-black'
                : 'border-t-2 border-b-2'
            }`}>
            <h4 className='text-lg print:text-base font-bold mb-3 print:mb-1'>EXECUTIVE SUMMARY</h4>
            <div className='space-y-2 print:space-y-1'>
              <div className='flex justify-between'>
                <span>Total Income Collected:</span>
                <span className='font-bold'>
                  {formatCurrency(totalIncomeCollected)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Total Expenses:</span>
                <span className='font-bold'>
                  {formatCurrency(totalActualExpenses)}
                </span>
              </div>
              <div
                className={`flex justify-between pt-2 ${
                  printMode ? 'border-t border-black' : 'border-t'
                }`}>
                <span className='font-bold'>Net Surplus:</span>
                <span className='font-bold'>{formatCurrency(netPosition)}</span>
              </div>
            </div>
          </div>

          {/* Income Breakdown */}
          <div>
            <h4 className='text-lg print:text-base font-bold mb-3 print:mb-1'>INCOME BREAKDOWN</h4>
            <table
              className={`w-full ${
                printMode ? 'border border-black' : 'border'
              }`}>
              <thead>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <th
                    className={`text-left p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Category
                  </th>
                  <th className='text-right p-2'>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Harvest Committee
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(harvestCommitteeTotal)}
                  </td>
                </tr>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Adult Members
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(adultContributionsTotal)}
                  </td>
                </tr>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Children Contributions
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(totalChildrenCollected)}
                  </td>
                </tr>
                <tr className='font-bold'>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    TOTAL
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(totalIncomeCollected)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expense Breakdown */}
          <div>
            <h4 className='text-lg print:text-base font-bold mb-3 print:mb-1'>EXPENSE BREAKDOWN</h4>
            <table
              className={`w-full ${
                printMode ? 'border border-black' : 'border'
              }`}>
              <thead>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <th
                    className={`text-left p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Category
                  </th>
                  <th className='text-right p-2'>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Family Harvest
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(familyHarvestTotal)}
                  </td>
                </tr>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Children Harvest
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(childrenHarvestTotal)}
                  </td>
                </tr>
                <tr
                  className={printMode ? 'border-b border-black' : 'border-b'}>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    Dedication Logistics
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(dedicationLogisticsTotal)}
                  </td>
                </tr>
                <tr className='font-bold'>
                  <td
                    className={`p-2 ${
                      printMode ? 'border-r border-black' : 'border-r'
                    }`}>
                    TOTAL
                  </td>
                  <td className='text-right p-2'>
                    {formatCurrency(totalActualExpenses)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Conclusion */}
          <div
            className={`pt-4 print:pt-2 ${
              printMode ? 'border-t-2 border-black' : 'border-t-2'
            }`}>
            <h4 className='text-lg print:text-base font-bold mb-3 print:mb-1'>CONCLUSION</h4>
            <p className='mb-4 print:mb-1'>
              The committee has successfully managed the harvest activities with
              strong financial discipline. The net surplus of{' '}
              {formatCurrency(netPosition)} represents{' '}
              {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of
              total income, demonstrating excellent fiscal management.
            </p>
            <p className='mb-4 print:mb-1'>
              Budget utilization stood at{' '}
              {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}%
              of the approved ₦5M budget, showing prudent spending and effective
              cost control throughout the planning period.
            </p>
            <div
              className={`${
                printMode ? 'border border-black' : 'border'
              } p-4 print:p-2 mt-6 print:mt-2`}>
              <p className='font-bold text-center'>EXPECTED ACCOUNT BALANCE</p>
              <p className='text-2xl font-bold text-center mt-2'>
                {formatCurrency(netPosition)}
              </p>
              <p className='text-sm text-center mt-1'>
                This amount should be available in bank account and cash on hand
              </p>
            </div>
          </div>

          {/* Signature Section - UPDATED */}
          <div
            className={`mt-8 print:mt-2 pt-4 print:pt-2 mx-auto text-center ${
              printMode ? 'border-t-2 border-black' : 'border-t-2'
            }`}>
            <h4 className='text-lg print:text-base font-bold mb-4 print:mb-2'>SIGNATURES</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4'>
              <div>
                <p className='text-sm print:text-xs mb-1 font-semibold'>Committee Chairman</p>
                <p className='mb-16 print:mb-6'>Bro Taiwo Babarinde</p>
                <div
                  className={`pt-2 ${
                    printMode ? 'border-t border-black' : 'border-t'
                  }`}>
                  <p className='text-xs text-gray-500 mt-1'>Signature & Date</p>
                </div>
              </div>
              {/* <div>
                <p className='text-sm mb-1 font-semibold'>
                  Committee Chairperson
                </p>
                <p className='mb-16'>Pst V.A Adeyemo</p>
                <div
                  className={`pt-2 ${
                    printMode ? 'border-t border-black' : 'border-t'
                  }`}>
                  <p className='text-xs text-gray-500 mt-1'>Signature & Date</p>
                </div>
              </div> */}
              <div>
                <p className='text-sm print:text-xs mb-1 font-semibold'>
                  Committee Treasurer
                </p>
                <p className='mb-16 print:mb-6'>Sis Oluwakemi Shehu</p>
                <div
                  className={`pt-2 ${
                    printMode ? 'border-t border-black' : 'border-t'
                  }`}>
                  <p className='text-xs text-gray-500 mt-1'>Signature & Date</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - NEW */}
          <div className={`mt-12 print:mt-2 pt-4 print:pt-2 text-center text-sm print:text-xs`}>
            <p>
              This report is prepared by <strong>Bro Taiwo Babarinde</strong> -
              <i> Committee Chairman</i>
            </p>
            <p className='mt-1'>C&S Movt. VOM Harvest Committee 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};
