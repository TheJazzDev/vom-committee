import React from 'react';
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

interface SummaryTabProps {
  totalIncomeCollected: number;
  totalActualExpenses: number;
  netPosition: number;
  childrenOutstandingTotal: number;
  totalChildrenCollected: number;
  childrenHarvestTotal: number;
  childrenShortfall: number;
  harvestCommitteeTotal: number;
  adultContributionsTotal: number;
  childrenChairPersonsTotal: number;
  childrenMembersTotal: number;
  childrenHarvestDayTotal: number;
  familyHarvestTotal: number;
  dedicationLogisticsTotal: number;
  praiseNightTotal: number;
  dedicationEntertainmentTotal: number;
  totalPlannedBudget: number;
  printMode: boolean;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  totalIncomeCollected,
  totalActualExpenses,
  netPosition,
  childrenOutstandingTotal,
  totalChildrenCollected,
  childrenHarvestTotal,
  childrenShortfall,
  harvestCommitteeTotal,
  adultContributionsTotal,
  childrenChairPersonsTotal,
  childrenMembersTotal,
  childrenHarvestDayTotal,
  familyHarvestTotal,
  dedicationLogisticsTotal,
  praiseNightTotal,
  dedicationEntertainmentTotal,
  totalPlannedBudget,
  printMode,
}) => {
  //   type IncomeCategoryData = {
  //     name: string;
  //     value: number;
  //     color: string;
  //     [key: string]: string | number;
  //   };

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
    <div className='space-y-6'>
      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-green-500 to-green-600'
          } rounded-lg shadow-lg p-6 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Total Income
          </p>
          <p className='text-3xl font-bold'>
            {formatCurrency(totalIncomeCollected)}
          </p>
          <p className={`text-xs mt-2 ${printMode ? '' : 'opacity-75'}`}>
            Collected from all sources
          </p>
        </div>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-red-500 to-red-600'
          } rounded-lg shadow-lg p-6 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Total Expenses
          </p>
          <p className='text-3xl font-bold'>
            {formatCurrency(totalActualExpenses)}
          </p>
          <p className={`text-xs mt-2 ${printMode ? '' : 'opacity-75'}`}>
            {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}% of
            budget
          </p>
        </div>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
          } rounded-lg shadow-lg p-6 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Net Surplus
          </p>
          <p className='text-3xl font-bold'>{formatCurrency(netPosition)}</p>
          <p className={`text-xs mt-2 ${printMode ? '' : 'opacity-75'}`}>
            {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of income
          </p>
        </div>
        <div
          className={`${
            printMode
              ? 'bg-white border-2 border-black'
              : 'bg-gradient-to-br from-purple-500 to-purple-600'
          } rounded-lg shadow-lg p-6 ${
            printMode ? 'text-black' : 'text-white'
          }`}>
          <p
            className={`text-sm mb-1 ${
              printMode ? 'font-semibold' : 'opacity-90'
            }`}>
            Outstanding
          </p>
          <p className='text-3xl font-bold'>
            {formatCurrency(childrenOutstandingTotal)}
          </p>
          <p className={`text-xs mt-2 ${printMode ? '' : 'opacity-75'}`}>
            Pending contributions
          </p>
        </div>
      </div>

      {/* Children Harvest Analysis Alert */}
      <div
        className={`${
          printMode
            ? 'bg-white border-l-4 border-black'
            : 'bg-orange-50 border-l-4 border-orange-500'
        } p-6 rounded-lg`}>
        <h3
          className={`text-lg font-bold mb-3 ${
            printMode ? 'text-black' : 'text-orange-900'
          }`}>
          Children Harvest Fund Analysis
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <p
              className={`text-sm mb-1 ${
                printMode ? 'text-black' : 'text-orange-700'
              }`}>
              Children Income
            </p>
            <p
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-orange-900'
              }`}>
              {formatCurrency(totalChildrenCollected)}
            </p>
          </div>
          <div>
            <p
              className={`text-sm mb-1 ${
                printMode ? 'text-black' : 'text-orange-700'
              }`}>
              Children Expenses
            </p>
            <p
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-orange-900'
              }`}>
              {formatCurrency(childrenHarvestTotal)}
            </p>
          </div>
          <div>
            <p
              className={`text-sm mb-1 ${
                printMode ? 'text-black' : 'text-orange-700'
              }`}>
              Shortfall (from Committee)
            </p>
            <p
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-red-600'
              }`}>
              {formatCurrency(childrenShortfall)}
            </p>
          </div>
        </div>
        <p
          className={`text-sm mt-3 ${
            printMode ? 'text-black' : 'text-orange-800'
          }`}>
          ℹ️ The children's harvest program cost more than what was collected
          from children's contributions. The shortfall of{' '}
          {formatCurrency(childrenShortfall)} was covered by Harvest Committee
          funds.
        </p>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white'
          } rounded-lg shadow-lg p-6`}>
          <h3
            className={`text-lg font-bold mb-4 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            Income Distribution
          </h3>
          <ResponsiveContainer width='100%' height={300}>
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
          <div className='mt-4 space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className={printMode ? 'text-black' : 'text-gray-600'}>
                Harvest Committee
              </span>
              <span className='font-semibold'>
                {formatCurrency(harvestCommitteeTotal)}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className={printMode ? 'text-black' : 'text-gray-600'}>
                Adult Members
              </span>
              <span className='font-semibold'>
                {formatCurrency(adultContributionsTotal)}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
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
          } rounded-lg shadow-lg p-6`}>
          <h3
            className={`text-lg font-bold mb-4 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            Budget Performance
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={budgetComparison}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' angle={-45} textAnchor='end' height={100} />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
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
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Financial Summary
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='h-full'>
            <h4
              className={`font-semibold mb-3 ${
                printMode ? 'text-black' : 'text-gray-700'
              }`}>
              Income Breakdown
            </h4>
            <div className='space-y-2'>
              <div
                className={`flex justify-between py-2 ${
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
                className={`flex justify-between py-2 ${
                  printMode ? 'border-b border-black' : 'border-b'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Adult Members
                </span>
                <span className='font-semibold'>
                  {formatCurrency(adultContributionsTotal)}
                </span>
              </div>
              <div className={`flex justify-between pt-2`}>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Children (Collected)
                </span>
                <span className='font-semibold'>
                  {formatCurrency(totalChildrenCollected)}
                </span>
              </div>
              <div className={`flex justify-between text-sm`}>
                <span
                  className={
                    printMode ? 'text-black ml-4' : 'text-gray-500 ml-4'
                  }>
                  Chairpersons
                </span>
                <span>{formatCurrency(childrenChairPersonsTotal)}</span>
              </div>
              <div className={`flex justify-between text-sm`}>
                <span
                  className={
                    printMode ? 'text-black ml-4' : 'text-gray-500 ml-4'
                  }>
                  Members
                </span>
                <span>{formatCurrency(childrenMembersTotal)}</span>
              </div>
              <div className={`flex justify-between text-sm`}>
                <span
                  className={
                    printMode ? 'text-black ml-4' : 'text-gray-500 ml-4'
                  }>
                  Harvest Day
                </span>
                <span>{formatCurrency(childrenHarvestDayTotal)}</span>
              </div>
              <div
                className={`flex justify-between py-2 font-bold mt-12 ${
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
          </div>
          <div className='flex flex-col'>
            <div className='flex-1'>
              <h4
                className={`font-semibold mb-3 ${
                  printMode ? 'text-black' : 'text-gray-700'
                }`}>
                Expense Breakdown
              </h4>
              <div className='space-y-2'>
                <div
                  className={`flex justify-between py-2 ${
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
                  className={`flex justify-between py-2 ${
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
                  className={`flex justify-between py-2 ${
                    printMode ? 'border-b border-black' : 'border-b'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Dedication Logistics
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(dedicationLogisticsTotal)}
                  </span>
                </div>
                <div className={`flex justify-between py-2`}>
                  <span className={printMode ? 'text-black' : 'text-gray-600'}>
                    Other Categories
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(
                      praiseNightTotal + dedicationEntertainmentTotal
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex justify-between py-2 font-bold ${
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
