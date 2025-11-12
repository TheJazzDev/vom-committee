'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/utils/calculations';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { usePrintMode } from '@/context/PrintModeContext';
import { BalanceCard } from '@/components/BalanceCard';

export const Summary = () => {
  const { printMode } = usePrintMode();

  const {
    totalIncomeCollected,
    sponsorsTotal,
    totalActualExpenses,
    netPosition,
    childrenOutstandingTotal,
    totalChildrenCollected,
    childrenHarvestTotal,
    harvestCommitteeTotal,
    adultContributionsTotal,
    familyHarvestTotal,
    dedicationLogisticsTotal,
    praiseNightTotal,
    dedicationEntertainmentTotal,
    totalPlannedBudget,
  } = useFinancialCalculations(incomeData, expenseDetails);

  const incomeByCategory: ChartDataItem[] = [
    {
      name: 'Harvest Committee',
      value: harvestCommitteeTotal,
      color: '#10b981',
    },
    { name: 'Adult Members', value: adultContributionsTotal, color: '#3b82f6' },
    { name: 'Children Total', value: totalChildrenCollected, color: '#f59e0b' },
  ];

  const budgetComparison: ChartDataItem[] = [
    {
      name: 'Family Harvest',
      planned: 70000,
      actual: familyHarvestTotal,
      percent: 1.4,
    },
    {
      name: 'Children Harvest',
      planned: 400000,
      actual: childrenHarvestTotal,
      percent: 8,
    },
    {
      name: 'Praise Night',
      planned: 80000,
      actual: praiseNightTotal,
      percent: 1.6,
    },
    {
      name: 'Dedication Logistics',
      planned: 1200000,
      actual: dedicationLogisticsTotal,
      percent: 24,
    },
    {
      name: 'Entertainment',
      planned: 3000000,
      actual: dedicationEntertainmentTotal,
      percent: 60,
    },
    { name: 'Miscellaneous', planned: 250000, actual: 0, percent: 5 },
  ];

  return (
    <div className='space-y-6 print:space-y-2'>
      <div className='mb-8 print:mb-2'>
        <h1
          className={`text-3xl md:text-4xl print:text-2xl font-bold mb-3 print:mb-1 ${
            printMode ? 'text-black' : 'text-gray-900'
          }`}>
          Financial Summary Overview
        </h1>
        <p className={`text-lg print:text-sm ${printMode ? 'text-black' : 'text-gray-600'}`}>
          Comprehensive snapshot of the VOM Harvest Committee 2025 financial
          performance, including total income collected, expenses incurred, and
          current financial position.
        </p>
      </div>

      <BalanceCard
        netPosition={netPosition}
        // totalIncomeCollected={totalChildrenCollected}
        // totalActualExpenses={totalActualExpenses}
        childrenOutstandingTotal={childrenOutstandingTotal}
        printMode={printMode}
      />

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 print:gap-2'>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-green-500 to-green-600'
          } rounded-lg shadow-lg p-6 print:p-2 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm print:text-xs mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Total Income
          </p>
          <p className='text-3xl print:text-lg font-bold'>
            {formatCurrency(totalIncomeCollected)}
          </p>
          <p className={`text-xs mt-2 print:mt-0 ${printMode ? '' : 'opacity-75'}`}>
            Collected from all sources
          </p>
        </div>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-red-500 to-red-600'
          } rounded-lg shadow-lg p-6 print:p-2 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm print:text-xs mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Total Expenses
          </p>
          <p className='text-3xl print:text-lg font-bold'>
            {formatCurrency(totalActualExpenses)}
          </p>
          <p className={`text-xs mt-2 print:mt-0 ${printMode ? '' : 'opacity-75'}`}>
            {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}% of
            budget
          </p>
        </div>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
          } rounded-lg shadow-lg p-6 print:p-2 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm print:text-xs mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Net Surplus
          </p>
          <p className='text-3xl print:text-lg font-bold'>{formatCurrency(netPosition)}</p>
          <p className={`text-xs mt-2 print:mt-0 ${printMode ? '' : 'opacity-75'}`}>
            {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of income
          </p>
        </div>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-purple-500 to-purple-600'
          } rounded-lg shadow-lg p-6 print:p-2 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm print:text-xs mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Outstanding
          </p>
          <p className='text-3xl print:text-lg font-bold'>
            {formatCurrency(childrenOutstandingTotal)}
          </p>
          <p className={`text-xs mt-2 print:mt-0 ${printMode ? '' : 'opacity-75'}`}>
            Pending contributions
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2'>
        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white'
          } rounded-lg shadow-lg p-6 print:p-2`}>
          <h3
            className={`text-lg print:text-base font-bold mb-4 print:mb-1 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            Income Distribution
          </h3>
          <ResponsiveContainer width='100%' height={printMode ? 200 : 300}>
            <PieChart>
              <Pie
                data={incomeByCategory}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) =>
                  `${name?.split(' ')[0]}: ${(Number(percent) * 100).toFixed(
                    0
                  )}%`
                }
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'>
                {incomeByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
          <div className='mt-4 print:mt-1 space-y-2 print:space-y-1'>
            <div className='flex justify-between text-sm print:text-xs'>
              <span className={printMode ? 'text-black' : 'text-gray-600'}>
                Harvest Committee
              </span>
              <span className='font-semibold'>
                {formatCurrency(harvestCommitteeTotal)}
              </span>
            </div>
            <div className='flex justify-between text-sm print:text-xs'>
              <span className={printMode ? 'text-black' : 'text-gray-600'}>
                Adult Members
              </span>
              <span className='font-semibold'>
                {formatCurrency(adultContributionsTotal)}
              </span>
            </div>
            <div className='flex justify-between text-sm print:text-xs'>
              <span className={printMode ? 'text-black' : 'text-gray-600'}>
                Children Total
              </span>
              <span className='font-semibold'>
                {formatCurrency(totalChildrenCollected)}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white'
          } rounded-lg shadow-lg p-6 print:p-2`}>
          <h3
            className={`text-lg print:text-base font-bold mb-4 print:mb-1 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            Budget Performance
          </h3>
          <ResponsiveContainer width='100%' height={printMode ? 250 : 400}>
            <BarChart data={budgetComparison}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='name'
                angle={-45}
                textAnchor='end'
                height={100}
                fontSize={12}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend fontSize={8} />
              <Bar dataKey='planned' fill='#94a3b8' name='Planned' />
              <Bar dataKey='actual' fill='#3b82f6' name='Actual' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Summary */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6 print:p-2`}>
        <h3
          className={`text-xl print:text-lg font-bold mb-4 print:mb-1 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Financial Summary
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2'>
          <div className='flex flex-col'>
            <div className='flex-1'>
              <h4
                className={`font-semibold mb-3 print:mb-1 print:text-sm ${
                  printMode ? 'text-black' : 'text-gray-700'
                }`}>
                Income Breakdown
              </h4>
              <div className='space-y-2 print:space-y-1'>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Harvest Committee
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(harvestCommitteeTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Children Harvest
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(totalChildrenCollected)}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Adult Harvest Members
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(adultContributionsTotal)}
                  </span>
                </div>
                <div className={`flex justify-between pt-2 print:pt-1 text-sm print:text-xs`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Sponsors
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(sponsorsTotal)}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex justify-between py-2 print:py-1 font-bold mt-12 print:mt-2 text-sm print:text-xs ${
                printMode ? 'border-t border-black' : 'border-t'
              }`}>
              <span className={printMode ? 'text-black' : ''}>
                Total Income Collected
              </span>
              <span className={printMode ? 'text-black' : 'text-green-600'}>
                {formatCurrency(totalIncomeCollected)}
              </span>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex-1'>
              <h4
                className={`font-semibold mb-3 print:mb-1 print:text-sm ${
                  printMode ? 'text-black' : 'text-gray-700'
                }`}>
                Expense Breakdown
              </h4>
              <div className='space-y-2 print:space-y-1'>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Children Harvest
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(childrenHarvestTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Dedication Logistics
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(dedicationLogisticsTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Family Harvest
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(familyHarvestTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-2 print:py-1 text-sm print:text-xs ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Dedication Entertainment
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(dedicationEntertainmentTotal)}
                  </span>
                </div>
                <div className={`flex justify-between py-2 print:py-1 text-sm print:text-xs`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Praise Night
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(praiseNightTotal)}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex justify-between py-2 print:py-1 font-bold mt-12 print:mt-2 text-sm print:text-xs ${
                printMode ? 'border-t border-black' : 'border-t'
              }`}>
              <span className={printMode ? 'text-black' : ''}>
                Total Expenses
              </span>
              <span className={printMode ? 'text-black' : 'text-red-600'}>
                {formatCurrency(totalActualExpenses)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
