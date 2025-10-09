'use client';

import { formatCurrency } from '@/utils/calculations';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { usePrintMode } from '@/hooks/usePrintMode';
import { ChildrenHarvestAnalysis } from './Analysis';
import { useState } from 'react';

export const Harvest = () => {
  const { printMode } = usePrintMode();
  const [activeTab, setActiveTab] = useState<'children' | 'family'>('children');

  const {
    totalChildrenCollected,
    childrenOutstandingTotal,
    childrenHarvestTotal,
    childrenChairPersonsTotal,
    childrenMembersTotal,
    childrenHarvestDayTotal,
    familyHarvestTotal,
    harvestCommitteeTotal,
  } = useFinancialCalculations(incomeData, expenseDetails);

  // Calculate totals for children
  const actualChildrenCollected =
    totalChildrenCollected - childrenOutstandingTotal;
  const hasChildrenShortfall = totalChildrenCollected < childrenHarvestTotal;
  const childrenDifference = totalChildrenCollected - childrenHarvestTotal;

  // Calculate family harvest analysis
  const familyIncome = harvestCommitteeTotal;
  const hasFamilyShortfall = familyIncome < familyHarvestTotal;
  //   const familyDifference = familyIncome - familyHarvestTotal;

  return (
    <div className='space-y-6'>
      <div className='mb-8'>
        <h1
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            printMode ? 'text-black' : 'text-gray-900'
          }`}>
          Harvest Programs Overview
        </h1>
        <p
          className={`text-lg mb-4 ${
            printMode ? 'text-black' : 'text-gray-600'
          }`}>
          Comprehensive financial report for both Family and Children's Harvest
          programs. View detailed breakdowns of contributions, expenses,
          collection status, and outstanding amounts for each harvest
          initiative.
        </p>

        {/* Tabs for Family vs Children Harvest */}
        <div
          className={`flex gap-3 mb-6 ${
            printMode ? 'border-b-2 border-black' : 'border-b-2 border-gray-200'
          }`}>
          <button
            onClick={() => setActiveTab('children')}
            className={`px-6 py-3 font-semibold border-b-2 -mb-[2px] transition-all cursor-pointer ${
              activeTab === 'children'
                ? printMode
                  ? 'border-black text-black'
                  : 'border-blue-500 text-blue-600'
                : printMode
                ? 'border-transparent text-gray-600 hover:text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            Children's Harvest
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-6 py-3 font-semibold border-b-2 -mb-[2px] transition-all cursor-pointer ${
              activeTab === 'family'
                ? printMode
                  ? 'border-black text-black'
                  : 'border-orange-500 text-orange-600'
                : printMode
                ? 'border-transparent text-gray-600 hover:text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            Family Harvest
          </button>
        </div>

        <div
          className={`px-4 py-3 rounded-lg mb-6 ${
            printMode
              ? 'bg-gray-100 border border-black'
              : activeTab === 'children'
              ? 'bg-blue-50 border-l-4 border-blue-500'
              : 'bg-orange-50 border-l-4 border-orange-500'
          }`}>
          <p
            className={`text-sm ${
              printMode
                ? 'text-black'
                : activeTab === 'children'
                ? 'text-blue-800'
                : 'text-orange-800'
            }`}>
            {activeTab === 'children' ? (
              <>
                <strong>📌 About Children's Harvest:</strong> This program
                engages children in the harvest celebration through chairperson
                pledges, member contributions, and harvest day collections.
                Track both received and outstanding amounts.
              </>
            ) : (
              <>
                <strong>📌 About Family Harvest:</strong> The main harvest
                program funded by committee contributions. This covers all
                family harvest expenses including logistics, decorations, and
                program execution.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Children's Harvest Tab Content */}
      {activeTab === 'children' && (
        <div className='space-y-6'>
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
                    <span
                      className={printMode ? 'text-black' : 'text-yellow-700'}>
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
                  printMode
                    ? 'border-t border-black'
                    : 'border-t border-yellow-300'
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

          <ChildrenHarvestAnalysis
            childrenChairPersonsTotal={childrenChairPersonsTotal}
            childrenMembersTotal={childrenMembersTotal}
            childrenHarvestDayTotal={childrenHarvestDayTotal}
            totalChildrenCollected={totalChildrenCollected}
            childrenOutstandingTotal={childrenOutstandingTotal}
            childrenHarvestTotal={childrenHarvestTotal}
            actualChildrenCollected={actualChildrenCollected}
          />

          {/* Expenses vs Income Analysis Card */}
          <div
            className={`${
              printMode
                ? 'bg-white border-l-4 border-black'
                : hasChildrenShortfall
                ? 'bg-red-50 border-l-4 border-red-500'
                : 'bg-green-50 border-l-4 border-green-500'
            } p-6 rounded-lg`}>
            <h3
              className={`text-lg font-bold mb-4 ${
                printMode
                  ? 'text-black'
                  : hasChildrenShortfall
                  ? 'text-red-900'
                  : 'text-green-900'
              }`}>
              Children Harvest Financial Analysis
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              {/* Expected Income */}
              <div
                className={`p-4 rounded ${
                  printMode ? 'border border-black' : 'bg-white'
                }`}>
                <p
                  className={`text-sm mb-1 ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Expected Total Income
                </p>
                <p
                  className={`text-2xl font-bold ${
                    printMode
                      ? 'text-black'
                      : hasChildrenShortfall
                      ? 'text-red-700'
                      : 'text-green-700'
                  }`}>
                  {formatCurrency(totalChildrenCollected)}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    printMode ? 'text-black' : 'text-gray-500'
                  }`}>
                  (Including outstanding)
                </p>
              </div>

              {/* Expenses */}
              <div
                className={`p-4 rounded ${
                  printMode ? 'border border-black' : 'bg-white'
                }`}>
                <p
                  className={`text-sm mb-1 ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Children Harvest Expenses
                </p>
                <p
                  className={`text-2xl font-bold ${
                    printMode
                      ? 'text-black'
                      : hasChildrenShortfall
                      ? 'text-red-700'
                      : 'text-green-700'
                  }`}>
                  {formatCurrency(childrenHarvestTotal)}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    printMode ? 'text-black' : 'text-gray-500'
                  }`}>
                  Total spent on children's program
                </p>
              </div>
            </div>

            {/* Result Summary */}
            <div
              className={`p-4 rounded ${
                printMode
                  ? 'border-2 border-black'
                  : hasChildrenShortfall
                  ? 'bg-red-100 border-2 border-red-400'
                  : 'bg-green-100 border-2 border-green-400'
              }`}>
              {hasChildrenShortfall ? (
                <div>
                  <p
                    className={`font-bold text-lg mb-2 ${
                      printMode ? 'text-black' : 'text-red-700'
                    }`}>
                    ⚠️ SHORTFALL: {formatCurrency(Math.abs(childrenDifference))}
                  </p>
                  <p
                    className={`text-sm ${
                      printMode ? 'text-black' : 'text-red-800'
                    }`}>
                    Even with outstanding contributions included, the children's
                    expenses exceed expected income by{' '}
                    <strong>
                      {formatCurrency(Math.abs(childrenDifference))}
                    </strong>
                    . This shortfall was covered by Harvest Committee funds.
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    className={`font-bold text-lg mb-2 ${
                      printMode ? 'text-black' : 'text-green-700'
                    }`}>
                    ✅ NO SHORTFALL - Fully Covered
                  </p>
                  <p
                    className={`text-sm ${
                      printMode ? 'text-black' : 'text-green-800'
                    }`}>
                    Expected total income covers all expenses. Expected surplus
                    of <strong>{formatCurrency(childrenDifference)}</strong>{' '}
                    once all outstanding contributions are collected.
                  </p>
                </div>
              )}
            </div>

            {/* Current Status */}
            <div
              className={`mt-4 p-3 rounded ${
                printMode ? 'border border-black' : 'bg-white bg-opacity-70'
              }`}>
              <p
                className={`text-sm font-semibold mb-2 ${
                  printMode ? 'text-black' : 'text-gray-800'
                }`}>
                📊 Current Collection Status:
              </p>
              <div className='space-y-1 text-sm'>
                <div className='flex justify-between'>
                  <span className={printMode ? 'text-black' : 'text-gray-700'}>
                    Actually Collected:
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(actualChildrenCollected)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className={printMode ? 'text-black' : 'text-gray-700'}>
                    Still Pending:
                  </span>
                  <span
                    className={`font-semibold ${
                      printMode ? 'text-black' : 'text-yellow-600'
                    }`}>
                    {formatCurrency(childrenOutstandingTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between pt-1 ${
                    printMode
                      ? 'border-t border-black'
                      : 'border-t border-gray-300'
                  }`}>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-gray-800'
                    }`}>
                    Expected Total:
                  </span>
                  <span className='font-bold'>
                    {formatCurrency(totalChildrenCollected)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div
            className={`p-4 rounded-lg ${
              printMode
                ? 'border border-black'
                : 'bg-gray-50 border border-gray-200'
            }`}>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-gray-700'
              }`}>
              <strong>💡 Key Insight:</strong> The children's harvest program
              generated {formatCurrency(actualChildrenCollected)} from{' '}
              {childrenChairPersonsTotal > 0
                ? 'chairpersons, members, and harvest day collections'
                : 'various sources'}
              . With {formatCurrency(childrenOutstandingTotal)} still
              outstanding, the expected total is{' '}
              {formatCurrency(totalChildrenCollected)}, which{' '}
              {hasChildrenShortfall ? 'falls short of' : 'exceeds'} the{' '}
              {formatCurrency(childrenHarvestTotal)} spent on the program.
            </p>
          </div>
        </div>
      )}

      {/* Family Harvest Tab Content */}
      {activeTab === 'family' && (
        <div className='space-y-6'>
          {/* Summary Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div
              className={`${
                printMode
                  ? 'bg-white border-l-4 border-black'
                  : 'bg-purple-50 border-l-4 border-purple-500'
              } p-6 rounded-lg`}>
              <h4
                className={`font-semibold mb-3 ${
                  printMode ? 'text-black' : 'text-purple-900'
                }`}>
                Harvest Committee Contributions
              </h4>
              <p
                className={`text-3xl font-bold ${
                  printMode ? 'text-black' : 'text-purple-700'
                }`}>
                {formatCurrency(harvestCommitteeTotal)}
              </p>
              <p
                className={`text-sm mt-2 ${
                  printMode ? 'text-black' : 'text-purple-600'
                }`}>
                Total funds contributed by harvest committee members
              </p>
            </div>

            <div
              className={`${
                printMode
                  ? 'bg-white border-l-4 border-black'
                  : 'bg-orange-50 border-l-4 border-orange-500'
              } p-6 rounded-lg`}>
              <h4
                className={`font-semibold mb-3 ${
                  printMode ? 'text-black' : 'text-orange-900'
                }`}>
                Family Harvest Expenses
              </h4>
              <p
                className={`text-3xl font-bold ${
                  printMode ? 'text-black' : 'text-orange-700'
                }`}>
                {formatCurrency(familyHarvestTotal)}
              </p>
              <p
                className={`text-sm mt-2 ${
                  printMode ? 'text-black' : 'text-orange-600'
                }`}>
                Total spent on family harvest program
              </p>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div
            className={`${
              printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
            } rounded-lg p-6`}>
            <h3
              className={`text-xl font-bold mb-4 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Family Harvest Expense Breakdown
            </h3>

            <div className='space-y-3'>
              {expenseDetails.familyHarvest
                .filter((item) => item.actual > 0)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-center py-2'>
                    <span
                      className={`text-sm ${
                        printMode ? 'text-black' : 'text-gray-700'
                      }`}>
                      {item.item}
                    </span>
                    <span
                      className={`font-semibold ${
                        printMode ? 'text-black' : 'text-orange-700'
                      }`}>
                      {formatCurrency(item.actual)}
                    </span>
                  </div>
                ))}

              <div
                className={`flex justify-between items-center pt-3 mt-3 ${
                  printMode
                    ? 'border-t-2 border-black'
                    : 'border-t-2 border-gray-300'
                }`}>
                <span
                  className={`font-bold text-lg ${
                    printMode ? 'text-black' : 'text-gray-800'
                  }`}>
                  Total Expenses
                </span>
                <span
                  className={`text-xl font-bold ${
                    printMode ? 'text-black' : 'text-orange-700'
                  }`}>
                  {formatCurrency(familyHarvestTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Analysis */}
          <div
            className={`${
              printMode
                ? 'bg-white border-l-4 border-black'
                : hasFamilyShortfall
                ? 'bg-red-50 border-l-4 border-red-500'
                : 'bg-green-50 border-l-4 border-green-500'
            } p-6 rounded-lg`}>
            <h3
              className={`text-lg font-bold mb-4 ${
                printMode
                  ? 'text-black'
                  : hasFamilyShortfall
                  ? 'text-red-900'
                  : 'text-green-900'
              }`}>
              Family Harvest Financial Analysis
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div
                className={`p-4 rounded ${
                  printMode ? 'border border-black' : 'bg-white'
                }`}>
                <p
                  className={`text-sm mb-1 ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Committee Contributions
                </p>
                <p
                  className={`text-2xl font-bold ${
                    printMode
                      ? 'text-black'
                      : hasFamilyShortfall
                      ? 'text-red-700'
                      : 'text-green-700'
                  }`}>
                  {formatCurrency(familyIncome)}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    printMode ? 'text-black' : 'text-gray-500'
                  }`}>
                  Total funds available
                </p>
              </div>

              <div
                className={`p-4 rounded ${
                  printMode ? 'border border-black' : 'bg-white'
                }`}>
                <p
                  className={`text-sm mb-1 ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Family Harvest Expenses
                </p>
                <p
                  className={`text-2xl font-bold ${
                    printMode
                      ? 'text-black'
                      : hasFamilyShortfall
                      ? 'text-red-700'
                      : 'text-green-700'
                  }`}>
                  {formatCurrency(familyHarvestTotal)}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    printMode ? 'text-black' : 'text-gray-500'
                  }`}>
                  Total program expenses
                </p>
              </div>
            </div>

            {/* <div
              className={`p-4 rounded ${
                printMode
                  ? 'border-2 border-black'
                  : hasFamilyShortfall
                  ? 'bg-red-100 border-2 border-red-400'
                  : 'bg-green-100 border-2 border-green-400'
              }`}>
              {hasFamilyShortfall ? (
                <div>
                  <p
                    className={`font-bold text-lg mb-2 ${
                      printMode ? 'text-black' : 'text-red-700'
                    }`}>
                    ⚠️ SHORTFALL: {formatCurrency(Math.abs(familyDifference))}
                  </p>
                  <p
                    className={`text-sm ${
                      printMode ? 'text-black' : 'text-red-800'
                    }`}>
                    The family harvest expenses exceed committee contributions
                    by{' '}
                    <strong>
                      {formatCurrency(Math.abs(familyDifference))}
                    </strong>
                    . Additional funds may be needed to cover this gap.
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    className={`font-bold text-lg mb-2 ${
                      printMode ? 'text-black' : 'text-green-700'
                    }`}>
                    ✅ SURPLUS: {formatCurrency(familyDifference)}
                  </p>
                  <p
                    className={`text-sm ${
                      printMode ? 'text-black' : 'text-green-800'
                    }`}>
                    Committee contributions fully cover all family harvest
                    expenses with a surplus of{' '}
                    <strong>{formatCurrency(familyDifference)}</strong>{' '}
                    remaining for other programs.
                  </p>
                </div>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
