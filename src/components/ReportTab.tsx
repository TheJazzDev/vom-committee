import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface ReportTabProps {
  totalIncomeCollected: number;
  totalActualExpenses: number;
  netPosition: number;
  harvestCommitteeTotal: number;
  adultContributionsTotal: number;
  totalChildrenCollected: number;
  familyHarvestTotal: number;
  childrenHarvestTotal: number;
  dedicationLogisticsTotal: number;
  totalPlannedBudget: number;
  printMode: boolean;
}

export const ReportTab: React.FC<ReportTabProps> = ({
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
  printMode,
}) => {
  return (
    <div
      className={`${
        printMode ? 'bg-white' : 'bg-white'
      } rounded-lg shadow-lg p-8`}>
      {/* Header */}
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold'>
          CHERUBIM & SERAPHIM MOVEMENT CHURCH
        </h2>
        <h3 className='text-lg font-semibold mb-2'>VALLEY OF MERCY</h3>
        <h3 className='text-xl font-semibold mb-1'>
          HARVEST COMMITTEE FINANCIAL REPORT 2025
        </h3>
        <p className='text-sm'>Period: July - October 2025</p>
        <p className='text-sm'>Generated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className='space-y-6'>
        {/* Executive Summary */}
        <div
          className={`py-4 ${
            printMode
              ? 'border-t-2 border-b-2 border-black'
              : 'border-t-2 border-b-2'
          }`}>
          <h4 className='text-lg font-bold mb-3'>EXECUTIVE SUMMARY</h4>
          <div className='space-y-2'>
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
          <h4 className='text-lg font-bold mb-3'>INCOME BREAKDOWN</h4>
          <table
            className={`w-full ${
              printMode ? 'border border-black' : 'border'
            }`}>
            <thead>
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
          <h4 className='text-lg font-bold mb-3'>EXPENSE BREAKDOWN</h4>
          <table
            className={`w-full ${
              printMode ? 'border border-black' : 'border'
            }`}>
            <thead>
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
              <tr className={printMode ? 'border-b border-black' : 'border-b'}>
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
          className={`pt-4 ${
            printMode ? 'border-t-2 border-black' : 'border-t-2'
          }`}>
          <h4 className='text-lg font-bold mb-3'>CONCLUSION</h4>
          <p className='mb-4'>
            The committee has successfully managed the harvest activities with
            strong financial discipline. The net surplus of{' '}
            {formatCurrency(netPosition)} represents{' '}
            {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of total
            income, demonstrating excellent fiscal management.
          </p>
          <p className='mb-4'>
            Budget utilization stood at{' '}
            {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}% of
            the approved ₦5M budget, showing prudent spending and effective cost
            control throughout the planning period.
          </p>
          <div
            className={`${
              printMode ? 'border border-black' : 'border'
            } p-4 mt-6`}>
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
          className={`mt-8 pt-4 mx-auto text-center ${
            printMode ? 'border-t-2 border-black' : 'border-t-2'
          }`}>
          <h4 className='text-lg font-bold mb-4'>SIGNATURES</h4>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <p className='text-sm mb-1 font-semibold'>Committee Chairman</p>
              <p className='mb-16'>Bro Taiwo Babarinde</p>
              <div
                className={`pt-2 ${
                  printMode ? 'border-t border-black' : 'border-t'
                }`}>
                <p className='text-xs text-gray-500 mt-1'>Signature & Date</p>
              </div>
            </div>
            <div>
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
            </div>
            <div>
              <p className='text-sm mb-1 font-semibold'>Committee Treasurer</p>
              <p className='mb-16'>Sis Oluwakemi Shehu</p>
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
        <div className={`mt-12 pt-4 text-center text-sm`}>
          <p>
            This report is prepared by <strong>Bro Taiwo Babarinde</strong> -
            <i> Committee Chairman</i>
          </p>
          <p className='mt-1'>C&S Movt. VOM Harvest Committee 2025</p>
        </div>
      </div>
    </div>
  );
};
