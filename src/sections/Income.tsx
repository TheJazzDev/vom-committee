'use client';

import { formatCurrency } from '@/utils/calculations';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { usePrintMode } from '@/hooks/usePrintMode';

export const Income = () => {
  const { printMode } = usePrintMode();

  const {
    harvestCommitteeTotal,
    sponsorsTotal,
    adultContributionsTotal,
    childrenChairPersonsTotal,
    childrenMembersTotal,
    childrenHarvestDayTotal,
    childrenOutstandingTotal,
    totalChildrenCollected,
    totalIncomeCollected,
  } = useFinancialCalculations(incomeData, expenseDetails);

  const actualChildrenCollected =
    totalChildrenCollected - childrenOutstandingTotal;

  return (
    <div className='space-y-6'>
      <div className='mb-8'>
        <h1
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            printMode ? 'text-black' : 'text-gray-900'
          }`}>
          Income & Collections
        </h1>
        <p
          className={`text-lg mb-4 ${
            printMode ? 'text-black' : 'text-gray-600'
          }`}>
          Detailed breakdown of all income sources including harvest committee
          contributions, adult donations, sponsorships, and children's harvest
          collections. Track both collected and outstanding amounts across all
          categories.
        </p>
        <div
          className={`flex flex-wrap gap-2 text-sm ${
            printMode ? 'text-black' : 'text-gray-500'
          }`}>
          <span
            className={`px-3 py-1 rounded-full ${
              printMode ? 'bg-gray-200' : 'bg-blue-100 text-blue-700'
            }`}>
            Harvest Committee
          </span>
          <span
            className={`px-3 py-1 rounded-full ${
              printMode ? 'bg-gray-200' : 'bg-green-100 text-green-700'
            }`}>
            Adult Contributions
          </span>
          <span
            className={`px-3 py-1 rounded-full ${
              printMode ? 'bg-gray-200' : 'bg-purple-100 text-purple-700'
            }`}>
            Children's Harvest
          </span>
          <span
            className={`px-3 py-1 rounded-full ${
              printMode ? 'bg-gray-200' : 'bg-yellow-100 text-yellow-700'
            }`}>
            Sponsorships
          </span>
        </div>
      </div>

      {/* Harvest Committee */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Harvest Committee Contributions ({incomeData.harvestCommittee.length}{' '}
          Members)
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead
              className={
                printMode ? 'bg-white border-b-2 border-black' : 'bg-gray-50'
              }>
              <tr>
                <th
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    printMode
                      ? 'text-black border-r border-black'
                      : 'text-gray-700'
                  }`}>
                  Name
                </th>
                <th
                  className={`px-4 py-3 text-right text-sm font-semibold ${
                    printMode ? 'text-black' : 'text-gray-700'
                  }`}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className={printMode ? '' : 'divide-y divide-gray-200'}>
              {incomeData.harvestCommittee.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    printMode ? 'border-b border-black' : 'hover:bg-gray-50'
                  }>
                  <td
                    className={`px-4 py-3 text-sm ${
                      printMode
                        ? 'text-black border-r border-black'
                        : 'text-gray-800'
                    }`}>
                    {item.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-right font-semibold'>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
              <tr
                className={
                  printMode
                    ? 'bg-white border-t-2 border-black font-bold'
                    : 'bg-gray-100 font-bold'
                }>
                <td
                  className={`px-4 py-3 text-sm ${
                    printMode ? 'border-r border-black' : ''
                  }`}>
                  Subtotal
                </td>
                <td className='px-4 py-3 text-sm text-right text-green-600'>
                  {formatCurrency(harvestCommitteeTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sponsors */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Sponsors Contributions ({incomeData.sponsors.length} People)
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead
              className={
                printMode ? 'bg-white border-b-2 border-black' : 'bg-gray-50'
              }>
              <tr>
                <th
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    printMode
                      ? 'text-black border-r border-black'
                      : 'text-gray-700'
                  }`}>
                  Name
                </th>
                <th
                  className={`px-4 py-3 text-right text-sm font-semibold ${
                    printMode ? 'text-black' : 'text-gray-700'
                  }`}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className={printMode ? '' : 'divide-y divide-gray-200'}>
              {incomeData.sponsors.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    printMode ? 'border-b border-black' : 'hover:bg-gray-50'
                  }>
                  <td
                    className={`px-4 py-3 text-sm ${
                      printMode
                        ? 'text-black border-r border-black'
                        : 'text-gray-800'
                    }`}>
                    {item.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-right font-semibold'>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
              <tr
                className={
                  printMode
                    ? 'bg-white border-t-2 border-black font-bold'
                    : 'bg-gray-100 font-bold'
                }>
                <td
                  className={`px-4 py-3 text-sm ${
                    printMode ? 'border-r border-black' : ''
                  }`}>
                  Subtotal
                </td>
                <td className='px-4 py-3 text-sm text-right'>
                  {formatCurrency(sponsorsTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Adult Church Members */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Adult Church Members ({incomeData.adultContributions.length} Members)
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead
              className={
                printMode ? 'bg-white border-b-2 border-black' : 'bg-gray-50'
              }>
              <tr>
                <th
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    printMode
                      ? 'text-black border-r border-black'
                      : 'text-gray-700'
                  }`}>
                  Name
                </th>
                <th
                  className={`px-4 py-3 text-right text-sm font-semibold ${
                    printMode ? 'text-black' : 'text-gray-700'
                  }`}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className={printMode ? '' : 'divide-y divide-gray-200'}>
              {incomeData.adultContributions.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    printMode ? 'border-b border-black' : 'hover:bg-gray-50'
                  }>
                  <td
                    className={`px-4 py-3 text-sm ${
                      printMode
                        ? 'text-black border-r border-black'
                        : 'text-gray-800'
                    }`}>
                    {item.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-right font-semibold'>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
              <tr
                className={
                  printMode
                    ? 'bg-white border-t-2 border-black font-bold'
                    : 'bg-gray-100 font-bold'
                }>
                <td
                  className={`px-4 py-3 text-sm ${
                    printMode ? 'border-r border-black' : ''
                  }`}>
                  Subtotal
                </td>
                <td className='px-4 py-3 text-sm text-right text-green-600'>
                  {formatCurrency(adultContributionsTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Children Harvest - Chairpersons */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Children Harvest - Chairpersons (
          {incomeData.childrenChairPersons.length} Members)
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead
              className={
                printMode ? 'bg-white border-b-2 border-black' : 'bg-gray-50'
              }>
              <tr>
                <th
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    printMode
                      ? 'text-black border-r border-black'
                      : 'text-gray-700'
                  }`}>
                  Name
                </th>
                <th
                  className={`px-4 py-3 text-right text-sm font-semibold ${
                    printMode ? 'text-black' : 'text-gray-700'
                  }`}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className={printMode ? '' : 'divide-y divide-gray-200'}>
              {incomeData.childrenChairPersons.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    printMode ? 'border-b border-black' : 'hover:bg-gray-50'
                  }>
                  <td
                    className={`px-4 py-3 text-sm ${
                      printMode
                        ? 'text-black border-r border-black'
                        : 'text-gray-800'
                    }`}>
                    {item.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-right font-semibold'>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
              <tr
                className={
                  printMode
                    ? 'bg-white border-t-2 border-black font-bold'
                    : 'bg-gray-100 font-bold'
                }>
                <td
                  className={`px-4 py-3 text-sm ${
                    printMode ? 'border-r border-black' : ''
                  }`}>
                  Subtotal
                </td>
                <td className='px-4 py-3 text-sm text-right text-green-600'>
                  {formatCurrency(childrenChairPersonsTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Children Harvest - Members */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Children Harvest - Members ({incomeData.childrenMembers.length}{' '}
          Members)
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead
              className={
                printMode ? 'bg-white border-b-2 border-black' : 'bg-gray-50'
              }>
              <tr>
                <th
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    printMode
                      ? 'text-black border-r border-black'
                      : 'text-gray-700'
                  }`}>
                  Name
                </th>
                <th
                  className={`px-4 py-3 text-right text-sm font-semibold ${
                    printMode ? 'text-black' : 'text-gray-700'
                  }`}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className={printMode ? '' : 'divide-y divide-gray-200'}>
              {incomeData.childrenMembers.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    printMode ? 'border-b border-black' : 'hover:bg-gray-50'
                  }>
                  <td
                    className={`px-4 py-3 text-sm ${
                      printMode
                        ? 'text-black border-r border-black'
                        : 'text-gray-800'
                    }`}>
                    {item.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-right font-semibold'>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
              <tr
                className={
                  printMode
                    ? 'bg-white border-t-2 border-black font-bold'
                    : 'bg-gray-100 font-bold'
                }>
                <td
                  className={`px-4 py-3 text-sm ${
                    printMode ? 'border-r border-black' : ''
                  }`}>
                  Subtotal
                </td>
                <td className='px-4 py-3 text-sm text-right text-green-600'>
                  {formatCurrency(childrenMembersTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INCOME SUMMARY - NEW SECTION AT BOTTOM */}
      <div
        className={`${
          printMode
            ? 'bg-white border-2 border-black'
            : 'bg-gradient-to-r from-indigo-500 to-purple-600'
        } rounded-lg shadow-lg p-8 ${printMode ? 'text-black' : 'text-white'}`}>
        <h3 className='text-2xl font-bold mb-6 text-center'>INCOME SUMMARY</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          {/* Left Column - Main Income Sources */}
          <div className='space-y-3'>
            <h4
              className={`font-semibold mb-3 pb-2 ${
                printMode
                  ? 'border-b-2 border-black'
                  : 'border-b-2 border-white border-opacity-30'
              }`}>
              Main Income Sources
            </h4>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                Harvest Committee ({incomeData.harvestCommittee.length} members)
              </span>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(harvestCommitteeTotal)}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                Sponsors ({incomeData.sponsors.length} people)
              </span>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(sponsorsTotal)}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                Adult Members ({incomeData.adultContributions.length} members)
              </span>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(adultContributionsTotal)}
              </span>
            </div>
          </div>

          {/* Right Column - Children's Income */}
          <div className='space-y-3'>
            <h4
              className={`font-semibold mb-3 pb-2 ${
                printMode
                  ? 'border-b-2 border-black'
                  : 'border-b-2 border-white border-opacity-30'
              }`}>
              Children's Harvest Income
            </h4>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                Chairpersons ({incomeData.childrenChairPersons.length})
              </span>
              <span
                className={`font-bold ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(childrenChairPersonsTotal)}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                Members ({incomeData.childrenMembers.length})
              </span>
              <span
                className={`font-bold ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(childrenMembersTotal)}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                Harvest Day Collection
              </span>
              <span
                className={`font-bold ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(childrenHarvestDayTotal)}
              </span>
            </div>
            <div
              className={`flex justify-between items-center pt-2 ${
                printMode
                  ? 'border-t border-black'
                  : 'border-t border-white border-opacity-30'
              }`}>
              <span
                className={`text-sm font-semibold ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                Children Subtotal (Collected)
              </span>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(actualChildrenCollected)}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span
                className={`text-xs ${
                  printMode ? 'text-black' : 'text-white opacity-75'
                }`}>
                Outstanding
              </span>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-white opacity-90'
                }`}>
                {formatCurrency(childrenOutstandingTotal)}
              </span>
            </div>
            <div
              className={`flex justify-between items-center pt-2 ${
                printMode
                  ? 'border-t border-black'
                  : 'border-t border-white border-opacity-30'
              }`}>
              <span
                className={`text-sm font-semibold ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                Children Grand Total
              </span>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                {formatCurrency(totalChildrenCollected)}
              </span>
            </div>
          </div>
        </div>

        {/* Total Income Collected */}
        <div
          className={`pt-6 mt-24 ${
            printMode
              ? 'border-t-2 border-black'
              : 'border-t-2 border-white border-opacity-50'
          }`}>
          <div className='flex justify-between items-center'>
            <div>
              <p
                className={`text-lg font-semibold ${
                  printMode ? 'text-black' : 'text-white'
                }`}>
                TOTAL INCOME COLLECTED
              </p>
              <p
                className={`text-xs mt-1 ${
                  printMode ? 'text-black' : 'text-white opacity-75'
                }`}>
                From{' '}
                {incomeData.harvestCommittee.length +
                  incomeData.sponsors.length +
                  incomeData.adultContributions.length +
                  incomeData.childrenChairPersons.length +
                  incomeData.childrenMembers.length}{' '}
                contributors
              </p>
            </div>
            <div className='text-right'>
              <p
                className={`text-4xl font-bold ${
                  printMode ? 'text-black' : 'text-green-600'
                }`}>
                {formatCurrency(totalIncomeCollected)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
