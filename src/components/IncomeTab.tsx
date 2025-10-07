import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface IncomeTabProps {
  incomeData: IncomeData;
  harvestCommitteeTotal: number;
  adultContributionsTotal: number;
  childrenChairPersonsTotal: number;
  childrenMembersTotal: number;
  childrenHarvestDayTotal: number;
  childrenOutstandingTotal: number;
  totalChildrenCollected: number;
  totalChildrenExpected: number;
  printMode: boolean;
}

export const IncomeTab: React.FC<IncomeTabProps> = ({
  incomeData,
  harvestCommitteeTotal,
  adultContributionsTotal,
  childrenChairPersonsTotal,
  childrenMembersTotal,
  childrenHarvestDayTotal,
  childrenOutstandingTotal,
  totalChildrenCollected,
  totalChildrenExpected,
  printMode,
}) => {
  return (
    <div className='space-y-6'>
      {printMode && (
        <h4 className='text-3xl font-semibold text-center py-6'>Income</h4>
      )}
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
                <td className='px-4 py-3 text-sm text-right'>
                  {formatCurrency(harvestCommitteeTotal)}
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
                <td className='px-4 py-3 text-sm text-right'>
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
                <td className='px-4 py-3 text-sm text-right'>
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
          Member)
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
                <td className='px-4 py-3 text-sm text-right'>
                  {formatCurrency(childrenMembersTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Harvest Day and Outstanding */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div
          className={`${
            printMode
              ? 'bg-white border-l-4 border-black'
              : 'bg-green-50 border-l-4 border-green-500'
          } p-6 rounded-lg`}>
          <h4
            className={`font-semibold mb-3 ${
              printMode ? 'text-black' : 'text-green-900'
            }`}>
            Harvest Day Collection
          </h4>
          <p
            className={`text-3xl font-bold ${
              printMode ? 'text-black' : 'text-green-700'
            }`}>
            {formatCurrency(childrenHarvestDayTotal)}
          </p>
          <p
            className={`text-sm mt-2 ${
              printMode ? 'text-black' : 'text-green-600'
            }`}>
            Funds realized on Children Harvest Programme day
          </p>
        </div>

        <div
          className={`${
            printMode
              ? 'bg-white border-l-4 border-black'
              : 'bg-yellow-50 border-l-4 border-yellow-500'
          } p-6 rounded-lg`}>
          <h4
            className={`font-semibold mb-3 ${
              printMode ? 'text-black' : 'text-yellow-900'
            }`}>
            Outstanding Contributions
          </h4>
          <div className='space-y-2 mb-3'>
            {incomeData.childrenOutstanding.map((item, idx) => (
              <div key={idx} className='flex justify-between text-sm'>
                <span className={printMode ? 'text-black' : 'text-yellow-700'}>
                  {item.name}
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-yellow-900'
                  }`}>
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
          <div
            className={`pt-2 ${
              printMode ? 'border-t border-black' : 'border-t border-yellow-300'
            }`}>
            <div className='flex justify-between'>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-yellow-900'
                }`}>
                Total Outstanding
              </span>
              <span
                className={`text-xl font-bold ${
                  printMode ? 'text-black' : 'text-yellow-700'
                }`}>
                {formatCurrency(childrenOutstandingTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Children Total Summary */}
      <div
        className={`${
          printMode
            ? 'bg-white border-l-4 border-black'
            : 'bg-blue-50 border-l-4 border-blue-500'
        } p-6 rounded-lg`}>
        <h4
          className={`font-semibold mb-3 ${
            printMode ? 'text-black' : 'text-blue-900'
          }`}>
          Children Harvest Total Summary
        </h4>
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-blue-700'
              }`}>
              Collected
            </p>
            <p
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-blue-900'
              }`}>
              {formatCurrency(totalChildrenCollected)}
            </p>
          </div>
          <div>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-blue-700'
              }`}>
              Outstanding
            </p>
            <p
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-blue-900'
              }`}>
              {formatCurrency(childrenOutstandingTotal)}
            </p>
          </div>
          <div>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-blue-700'
              }`}>
              Expected Total
            </p>
            <p
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-blue-900'
              }`}>
              {formatCurrency(totalChildrenExpected)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
