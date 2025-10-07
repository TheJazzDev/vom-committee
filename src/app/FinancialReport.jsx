'use client';

import React, { useState } from 'react';
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
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';

const FinancialReport = () => {
  const [activeTab, setActiveTab] = useState('summary');

  // Calculate totals
  const calculateTotal = (arr) =>
    arr.reduce((sum, item) => sum + item.amount, 0);
  const harvestCommitteeTotal = calculateTotal(incomeData.harvestCommittee);
  const adultContributionsTotal = calculateTotal(incomeData.adultContributions);
  const childrenChairPersonsTotal = calculateTotal(
    incomeData.childrenChairPersons
  );
  const childrenMembersTotal = calculateTotal(incomeData.childrenMembers);
  const childrenHarvestDayTotal = incomeData.childrenHarvestDay;
  const childrenOutstandingTotal = calculateTotal(
    incomeData.childrenOutstanding
  );

  const totalChildrenCollected =
    childrenChairPersonsTotal + childrenMembersTotal + childrenHarvestDayTotal;
  const totalChildrenExpected =
    totalChildrenCollected + childrenOutstandingTotal;
  const totalIncomeCollected =
    harvestCommitteeTotal + adultContributionsTotal + totalChildrenCollected;

  // Calculate expense totals
  const calculateExpenseTotal = (items) =>
    items.reduce((sum, item) => sum + item.actual, 0);
  const familyHarvestTotal = calculateExpenseTotal(
    expenseDetails.familyHarvest
  );
  const childrenHarvestTotal = calculateExpenseTotal(
    expenseDetails.childrenHarvest
  );
  const praiseNightTotal = calculateExpenseTotal(expenseDetails.praiseNight);
  const dedicationLogisticsTotal = calculateExpenseTotal(
    expenseDetails.dedicationLogistics
  );
  const dedicationEntertainmentTotal = calculateExpenseTotal(
    expenseDetails.dedicationEntertainment
  );

  const totalActualExpenses =
    familyHarvestTotal +
    childrenHarvestTotal +
    praiseNightTotal +
    dedicationLogisticsTotal +
    dedicationEntertainmentTotal;

  // Children harvest analysis
  const childrenShortfall = childrenHarvestTotal - totalChildrenCollected;
  const netPosition = totalIncomeCollected - totalActualExpenses;

  // Budget data
  const totalPlannedBudget = 5000000;

  const budgetData = {
    familyHarvest: { planned: 70000, actual: familyHarvestTotal },
    childrenHarvest: { planned: 400000, actual: childrenHarvestTotal },
    praiseNight: { planned: 80000, actual: praiseNightTotal },
    dedicationLogistics: { planned: 1200000, actual: dedicationLogisticsTotal },
    dedicationEntertainment: {
      planned: 3000000,
      actual: dedicationEntertainmentTotal,
    },
    miscellaneous: { planned: 250000, actual: 0 },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadExcel = () => {
    // Create CSV content with formulas structure
    let csvContent = 'C&S MOVT. VOM HARVEST COMMITTEE - FINANCIAL REPORT\n\n';

    csvContent += 'INCOME SUMMARY\n';
    csvContent += 'Category,Name,Amount\n';
    incomeData.harvestCommittee.forEach((item) => {
      csvContent += `Harvest Committee,${item.name},${item.amount}\n`;
    });
    csvContent += `Harvest Committee Subtotal,,${harvestCommitteeTotal}\n\n`;

    incomeData.adultContributions.forEach((item) => {
      csvContent += `Adult Members,${item.name},${item.amount}\n`;
    });
    csvContent += `Adult Members Subtotal,,${adultContributionsTotal}\n\n`;

    incomeData.childrenChairPersons.forEach((item) => {
      csvContent += `Children Chairpersons,${item.name},${item.amount}\n`;
    });
    csvContent += `Children Chairpersons Subtotal,,${childrenChairPersonsTotal}\n\n`;

    incomeData.childrenMembers.forEach((item) => {
      csvContent += `Children Members,${item.name},${item.amount}\n`;
    });
    csvContent += `Children Members Subtotal,,${childrenMembersTotal}\n\n`;

    csvContent += `Children Harvest Day Collection,,${childrenHarvestDayTotal}\n\n`;

    incomeData.childrenOutstanding.forEach((item) => {
      csvContent += `Outstanding,${item.name},${item.amount}\n`;
    });
    csvContent += `Outstanding Subtotal,,${childrenOutstandingTotal}\n\n`;

    csvContent += `TOTAL CHILDREN COLLECTED,,${totalChildrenCollected}\n`;
    csvContent += `TOTAL INCOME COLLECTED,,${totalIncomeCollected}\n\n\n`;

    csvContent += 'EXPENSE DETAILS\n';
    csvContent += 'Category,Item,Planned,Actual,Variance\n';

    Object.entries(expenseDetails).forEach(([category, items]) => {
      items.forEach((item) => {
        const variance = item.planned - item.actual;
        csvContent += `${category},${item.item},${item.planned},${item.actual},${variance}\n`;
      });
      const catTotal = calculateExpenseTotal(items);
      csvContent += `${category} TOTAL,,,${catTotal},\n\n`;
    });

    csvContent += `\nTOTAL EXPENSES,,,${totalActualExpenses},\n\n`;

    csvContent += 'FINANCIAL ANALYSIS\n';
    csvContent += `Total Income Collected,,${totalIncomeCollected}\n`;
    csvContent += `Total Expenses,,${totalActualExpenses}\n`;
    csvContent += `Net Surplus,,${netPosition}\n\n`;

    csvContent += 'CHILDREN HARVEST ANALYSIS\n';
    csvContent += `Children Income Collected,,${totalChildrenCollected}\n`;
    csvContent += `Children Expenses,,${childrenHarvestTotal}\n`;
    csvContent += `Shortfall (from Harvest Committee),,${childrenShortfall}\n\n`;

    csvContent += 'EXPECTED ACCOUNT BALANCE\n';
    csvContent += `Amount that should be in account/cash,,${formatCurrency(
      netPosition
    )}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Harvest_Committee_Financial_Report_${
        new Date().toISOString().split('T')[0]
      }.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadText = () => {
    const reportContent = `
C&S MOVT. VOM HARVEST COMMITTEE
COMPREHENSIVE FINANCIAL REPORT
Period: March - October 2025
Generated: ${new Date().toLocaleDateString()}

========================================
EXECUTIVE SUMMARY
========================================

Total Income Collected: ${formatCurrency(totalIncomeCollected)}
Total Expenses: ${formatCurrency(totalActualExpenses)}
Net Surplus: ${formatCurrency(netPosition)}

Expected Account Balance: ${formatCurrency(netPosition)}

========================================
INCOME BREAKDOWN
========================================

HARVEST COMMITTEE CONTRIBUTIONS: ${formatCurrency(harvestCommitteeTotal)}
${incomeData.harvestCommittee
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

ADULT MEMBER CONTRIBUTIONS: ${formatCurrency(adultContributionsTotal)}
${incomeData.adultContributions
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

CHILDREN HARVEST CONTRIBUTIONS:
Chairpersons: ${formatCurrency(childrenChairPersonsTotal)}
${incomeData.childrenChairPersons
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

Members: ${formatCurrency(childrenMembersTotal)}
${incomeData.childrenMembers
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

Harvest Day Collection: ${formatCurrency(childrenHarvestDayTotal)}

Total Children Collected: ${formatCurrency(totalChildrenCollected)}

Outstanding Contributions: ${formatCurrency(childrenOutstandingTotal)}
${incomeData.childrenOutstanding
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

TOTAL INCOME COLLECTED: ${formatCurrency(totalIncomeCollected)}

========================================
EXPENSE BREAKDOWN
========================================

FAMILY HARVEST: ${formatCurrency(familyHarvestTotal)}
${expenseDetails.familyHarvest
  .map(
    (item) =>
      `  ${item.item}: ${formatCurrency(
        item.actual
      )} (Planned: ${formatCurrency(item.planned)})`
  )
  .join('\n')}

CHILDREN HARVEST: ${formatCurrency(childrenHarvestTotal)}
${expenseDetails.childrenHarvest
  .map(
    (item) =>
      `  ${item.item}: ${formatCurrency(
        item.actual
      )} (Planned: ${formatCurrency(item.planned)})`
  )
  .join('\n')}

DEDICATION/HARVEST LOGISTICS: ${formatCurrency(dedicationLogisticsTotal)}
${expenseDetails.dedicationLogistics
  .filter((i) => i.actual > 0)
  .map((item) => `  ${item.item}: ${formatCurrency(item.actual)}`)
  .join('\n')}

TOTAL EXPENSES: ${formatCurrency(totalActualExpenses)}

========================================
CHILDREN HARVEST ANALYSIS
========================================

Children Income Collected: ${formatCurrency(totalChildrenCollected)}
  - Chairpersons: ${formatCurrency(childrenChairPersonsTotal)}
  - Members: ${formatCurrency(childrenMembersTotal)}
  - Harvest Day: ${formatCurrency(childrenHarvestDayTotal)}

Children Expenses: ${formatCurrency(childrenHarvestTotal)}

Shortfall: ${formatCurrency(childrenShortfall)}
(This amount was covered from Harvest Committee funds)

========================================
HARVEST COMMITTEE FUNDS UTILIZATION
========================================

Total Harvest Committee: ${formatCurrency(harvestCommitteeTotal)}
  - Children Harvest Shortfall: ${formatCurrency(childrenShortfall)}
  - Family Harvest: ${formatCurrency(familyHarvestTotal)}
  - Dedication Logistics: ${formatCurrency(dedicationLogisticsTotal)}

Remaining: ${formatCurrency(
      harvestCommitteeTotal -
        childrenShortfall -
        familyHarvestTotal -
        dedicationLogisticsTotal
    )}

========================================
FINANCIAL POSITION
========================================

Total Income: ${formatCurrency(totalIncomeCollected)}
Total Expenses: ${formatCurrency(totalActualExpenses)}
Net Surplus: ${formatCurrency(netPosition)}

Budget Approved: ${formatCurrency(totalPlannedBudget)}
Budget Utilized: ${formatCurrency(totalActualExpenses)} (${(
      (totalActualExpenses / totalPlannedBudget) *
      100
    ).toFixed(1)}%)
Budget Remaining: ${formatCurrency(totalPlannedBudget - totalActualExpenses)}

========================================
ACCOUNT RECONCILIATION
========================================

Expected Balance in Account/Cash: ${formatCurrency(netPosition)}

This is the total amount that should be available across:
- Bank account balance
- Cash on hand
- Any other committee holdings

========================================
KEY INSIGHTS
========================================

1. STRONG FINANCIAL HEALTH
   - Generated ${formatCurrency(netPosition)} surplus
   - ${((netPosition / totalIncomeCollected) * 100).toFixed(
     1
   )}% surplus rate on income

2. EXCELLENT BUDGET MANAGEMENT
   - Only ${((totalActualExpenses / totalPlannedBudget) * 100).toFixed(
     1
   )}% of ₦5M budget utilized
   - Saved ${formatCurrency(totalPlannedBudget - totalActualExpenses)}

3. CHILDREN HARVEST SUCCESS
   - Children raised ${formatCurrency(totalChildrenCollected)}
   - Shortfall of ${formatCurrency(childrenShortfall)} covered by committee
   - Well-managed event execution

========================================
END OF REPORT
========================================
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Harvest_Committee_Report_${new Date().toISOString().split('T')[0]}.txt`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart data
  const incomeByCategory = [
    {
      name: 'Harvest Committee',
      value: harvestCommitteeTotal,
      color: '#10b981',
    },
    { name: 'Adult Members', value: adultContributionsTotal, color: '#3b82f6' },
    { name: 'Children Total', value: totalChildrenCollected, color: '#f59e0b' },
  ];

  const budgetComparison = [
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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with Download */}
        <div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
          <div className='flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-0'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                C&S Movt. VOM Harvest Committee 2025
              </h1>
              <h2 className='text-xl text-gray-600 mb-4'>
                Comprehensive Financial Report{' '}
                <span className='capitalize font-semibold'>({activeTab} Section)</span>
              </h2>
              <p className='text-sm text-gray-500'>
                Period: March - October 2025 | Generated:{' '}
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={handleDownloadExcel}
                className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                Download Excel
              </button>
              <button
                onClick={handleDownloadText}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Critical Alert - Expected Balance */}
        <div className='bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-6 text-white mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-xl font-bold mb-2'>
                Expected Account Balance
              </h3>
              <p className='text-3xl font-bold'>
                {formatCurrency(netPosition)}
              </p>
              <p className='text-sm opacity-90 mt-2'>
                This amount should be in your account/cash on hand
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm opacity-90'>Total Income</p>
              <p className='text-xl font-semibold'>
                {formatCurrency(totalIncomeCollected)}
              </p>
              <p className='text-sm opacity-90 mt-2'>Total Expenses</p>
              <p className='text-xl font-semibold'>
                {formatCurrency(totalActualExpenses)}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='bg-white rounded-lg shadow-lg mb-6'>
          <div className='flex overflow-scroll'>
            {['summary', 'income', 'expenses', 'analysis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-4 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Tab */}
        {activeTab === 'summary' && (
          <div className='space-y-6'>
            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white'>
                <p className='text-sm opacity-90 mb-1'>Total Income</p>
                <p className='text-3xl font-bold'>
                  {formatCurrency(totalIncomeCollected)}
                </p>
                <p className='text-xs opacity-75 mt-2'>
                  Collected from all sources
                </p>
              </div>
              <div className='bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white'>
                <p className='text-sm opacity-90 mb-1'>Total Expenses</p>
                <p className='text-3xl font-bold'>
                  {formatCurrency(totalActualExpenses)}
                </p>
                <p className='text-xs opacity-75 mt-2'>
                  {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(
                    1
                  )}
                  % of budget
                </p>
              </div>
              <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white'>
                <p className='text-sm opacity-90 mb-1'>Net Surplus</p>
                <p className='text-3xl font-bold'>
                  {formatCurrency(netPosition)}
                </p>
                <p className='text-xs opacity-75 mt-2'>
                  {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of
                  income
                </p>
              </div>
              <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white'>
                <p className='text-sm opacity-90 mb-1'>Outstanding</p>
                <p className='text-3xl font-bold'>
                  {formatCurrency(childrenOutstandingTotal)}
                </p>
                <p className='text-xs opacity-75 mt-2'>Pending contributions</p>
              </div>
            </div>

            {/* Children Harvest Analysis Alert */}
            <div className='bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg'>
              <h3 className='text-lg font-bold text-orange-900 mb-3'>
                Children Harvest Fund Analysis
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <p className='text-sm text-orange-700 mb-1'>
                    Children Income
                  </p>
                  <p className='text-2xl font-bold text-orange-900'>
                    {formatCurrency(totalChildrenCollected)}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-orange-700 mb-1'>
                    Children Expenses
                  </p>
                  <p className='text-2xl font-bold text-orange-900'>
                    {formatCurrency(childrenHarvestTotal)}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-orange-700 mb-1'>
                    Shortfall (from Committee)
                  </p>
                  <p className='text-2xl font-bold text-red-600'>
                    {formatCurrency(childrenShortfall)}
                  </p>
                </div>
              </div>
              <p className='text-sm text-orange-800 mt-3'>
                ℹ️ The children's harvest program cost more than what was
                collected from children's contributions. The shortfall of{' '}
                {formatCurrency(childrenShortfall)} was covered by Harvest
                Committee funds.
              </p>
            </div>

            {/* Charts */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-lg shadow-lg p-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>
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
                        `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill='#8884d8'
                      dataKey='value'>
                      {incomeByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Harvest Committee</span>
                    <span className='font-semibold'>
                      {formatCurrency(harvestCommitteeTotal)}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Adult Members</span>
                    <span className='font-semibold'>
                      {formatCurrency(adultContributionsTotal)}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Children Total</span>
                    <span className='font-semibold'>
                      {formatCurrency(totalChildrenCollected)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-lg p-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>
                  Budget Performance
                </h3>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={budgetComparison}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='name'
                      angle={-45}
                      textAnchor='end'
                      height={100}
                    />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey='planned' fill='#94a3b8' name='Planned' />
                    <Bar dataKey='actual' fill='#3b82f6' name='Actual' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Financial Summary */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Financial Summary
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-semibold text-gray-700 mb-3'>
                    Income Breakdown
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>Harvest Committee</span>
                      <span className='font-semibold'>
                        {formatCurrency(harvestCommitteeTotal)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>Adult Members</span>
                      <span className='font-semibold'>
                        {formatCurrency(adultContributionsTotal)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>
                        Children (Collected)
                      </span>
                      <span className='font-semibold'>
                        {formatCurrency(totalChildrenCollected)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b text-sm'>
                      <span className='text-gray-500 ml-4'>└ Chairpersons</span>
                      <span>{formatCurrency(childrenChairPersonsTotal)}</span>
                    </div>
                    <div className='flex justify-between py-2 border-b text-sm'>
                      <span className='text-gray-500 ml-4'>└ Members</span>
                      <span>{formatCurrency(childrenMembersTotal)}</span>
                    </div>
                    <div className='flex justify-between py-2 border-b text-sm'>
                      <span className='text-gray-500 ml-4'>└ Harvest Day</span>
                      <span>{formatCurrency(childrenHarvestDayTotal)}</span>
                    </div>
                    <div className='flex justify-between py-2 border-t-2 border-gray-300 font-bold'>
                      <span>Total Income Collected</span>
                      <span className='text-green-600'>
                        {formatCurrency(totalIncomeCollected)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-700 mb-3'>
                    Expense Breakdown
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>Family Harvest</span>
                      <span className='font-semibold'>
                        {formatCurrency(familyHarvestTotal)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>Children Harvest</span>
                      <span className='font-semibold'>
                        {formatCurrency(childrenHarvestTotal)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>
                        Dedication Logistics
                      </span>
                      <span className='font-semibold'>
                        {formatCurrency(dedicationLogisticsTotal)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b'>
                      <span className='text-gray-600'>Other Categories</span>
                      <span className='font-semibold'>
                        {formatCurrency(
                          praiseNightTotal + dedicationEntertainmentTotal
                        )}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-t-2 border-gray-300 font-bold'>
                      <span>Total Expenses</span>
                      <span className='text-red-600'>
                        {formatCurrency(totalActualExpenses)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Income Tab */}
        {activeTab === 'income' && (
          <div className='space-y-6'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Harvest Committee Contributions
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Name
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {incomeData.harvestCommittee.map((item, idx) => (
                      <tr key={idx} className='hover:bg-gray-50'>
                        <td className='px-4 py-3 text-sm text-gray-800'>
                          {item.name}
                        </td>
                        <td className='px-4 py-3 text-sm text-right font-semibold'>
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className='bg-gray-100 font-bold'>
                      <td className='px-4 py-3 text-sm'>Subtotal</td>
                      <td className='px-4 py-3 text-sm text-right'>
                        {formatCurrency(harvestCommitteeTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Adult Church Members
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Name
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {incomeData.adultContributions.map((item, idx) => (
                      <tr key={idx} className='hover:bg-gray-50'>
                        <td className='px-4 py-3 text-sm text-gray-800'>
                          {item.name}
                        </td>
                        <td className='px-4 py-3 text-sm text-right font-semibold'>
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className='bg-gray-100 font-bold'>
                      <td className='px-4 py-3 text-sm'>Subtotal</td>
                      <td className='px-4 py-3 text-sm text-right'>
                        {formatCurrency(adultContributionsTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Children Harvest - Chairpersons
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Name
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {incomeData.childrenChairPersons.map((item, idx) => (
                      <tr key={idx} className='hover:bg-gray-50'>
                        <td className='px-4 py-3 text-sm text-gray-800'>
                          {item.name}
                        </td>
                        <td className='px-4 py-3 text-sm text-right font-semibold'>
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className='bg-gray-100 font-bold'>
                      <td className='px-4 py-3 text-sm'>Subtotal</td>
                      <td className='px-4 py-3 text-sm text-right'>
                        {formatCurrency(childrenChairPersonsTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Children Harvest - Members
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Name
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {incomeData.childrenMembers.map((item, idx) => (
                      <tr key={idx} className='hover:bg-gray-50'>
                        <td className='px-4 py-3 text-sm text-gray-800'>
                          {item.name}
                        </td>
                        <td className='px-4 py-3 text-sm text-right font-semibold'>
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className='bg-gray-100 font-bold'>
                      <td className='px-4 py-3 text-sm'>Subtotal</td>
                      <td className='px-4 py-3 text-sm text-right'>
                        {formatCurrency(childrenMembersTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-green-50 border-l-4 border-green-500 p-6 rounded-lg'>
                <h4 className='font-semibold text-green-900 mb-3'>
                  Harvest Day Collection
                </h4>
                <p className='text-3xl font-bold text-green-700'>
                  {formatCurrency(childrenHarvestDayTotal)}
                </p>
                <p className='text-sm text-green-600 mt-2'>
                  Funds realized on Children Harvest Programme day
                </p>
              </div>

              <div className='bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg'>
                <h4 className='font-semibold text-yellow-900 mb-3'>
                  Outstanding Contributions
                </h4>
                <div className='space-y-2 mb-3'>
                  {incomeData.childrenOutstanding.map((item, idx) => (
                    <div key={idx} className='flex justify-between text-sm'>
                      <span className='text-yellow-700'>{item.name}</span>
                      <span className='font-semibold text-yellow-900'>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='pt-2 border-t border-yellow-300'>
                  <div className='flex justify-between'>
                    <span className='font-semibold text-yellow-900'>
                      Total Outstanding
                    </span>
                    <span className='text-xl font-bold text-yellow-700'>
                      {formatCurrency(childrenOutstandingTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg'>
              <h4 className='font-semibold text-blue-900 mb-3'>
                Children Harvest Total Summary
              </h4>
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <p className='text-sm text-blue-700'>Collected</p>
                  <p className='text-2xl font-bold text-blue-900'>
                    {formatCurrency(totalChildrenCollected)}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-blue-700'>Outstanding</p>
                  <p className='text-2xl font-bold text-blue-900'>
                    {formatCurrency(childrenOutstandingTotal)}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-blue-700'>Expected Total</p>
                  <p className='text-2xl font-bold text-blue-900'>
                    {formatCurrency(totalChildrenExpected)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className='space-y-6'>
            {Object.entries(expenseDetails).map(([category, items]) => {
              const categoryTotal = calculateExpenseTotal(items);
              const categoryName = category.replace(/([A-Z])/g, ' $1').trim();

              return (
                <div
                  key={category}
                  className='bg-white rounded-lg shadow-lg p-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl font-bold text-gray-800 capitalize'>
                      {categoryName}
                    </h3>
                    <div className='text-right'>
                      <p className='text-sm text-gray-600'>Total Spent</p>
                      <p className='text-2xl font-bold text-blue-600'>
                        {formatCurrency(categoryTotal)}
                      </p>
                    </div>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className='w-full'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                            Item
                          </th>
                          <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                            Planned
                          </th>
                          <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                            Actual
                          </th>
                          <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                            Variance
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {items.map((item, idx) => {
                          const variance = item.planned - item.actual;
                          return (
                            <tr
                              key={idx}
                              className={`hover:bg-gray-50 ${
                                item.actual === 0 && item.planned > 0
                                  ? 'opacity-50'
                                  : ''
                              }`}>
                              <td className='px-4 py-3 text-sm text-gray-800'>
                                {item.item}
                              </td>
                              <td className='px-4 py-3 text-sm text-right'>
                                {formatCurrency(item.planned)}
                              </td>
                              <td className='px-4 py-3 text-sm text-right font-semibold'>
                                {item.actual > 0
                                  ? formatCurrency(item.actual)
                                  : '-'}
                              </td>
                              <td
                                className={`px-4 py-3 text-sm text-right font-semibold ${
                                  variance > 0
                                    ? 'text-green-600'
                                    : variance < 0
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                                }`}>
                                {variance !== 0
                                  ? formatCurrency(Math.abs(variance))
                                  : '-'}
                              </td>
                              <td className='px-4 py-3 text-sm text-gray-600 italic'>
                                {item.note || ''}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className='bg-gray-100 font-bold'>
                          <td className='px-4 py-3 text-sm'>Category Total</td>
                          <td className='px-4 py-3 text-sm text-right'>
                            {formatCurrency(
                              items.reduce((sum, i) => sum + i.planned, 0)
                            )}
                          </td>
                          <td className='px-4 py-3 text-sm text-right text-blue-600'>
                            {formatCurrency(categoryTotal)}
                          </td>
                          <td className='px-4 py-3 text-sm text-right text-green-600'>
                            {formatCurrency(
                              items.reduce((sum, i) => sum + i.planned, 0) -
                                categoryTotal
                            )}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}

            <div className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-6 text-white'>
              <h3 className='text-2xl font-bold mb-4'>
                Total Expenses Summary
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div>
                  <p className='text-sm opacity-90'>Total Budget</p>
                  <p className='text-xl font-bold'>
                    {formatCurrency(totalPlannedBudget)}
                  </p>
                </div>
                <div>
                  <p className='text-sm opacity-90'>Total Spent</p>
                  <p className='text-xl font-bold'>
                    {formatCurrency(totalActualExpenses)}
                  </p>
                </div>
                <div>
                  <p className='text-sm opacity-90'>Savings</p>
                  <p className='text-xl font-bold'>
                    {formatCurrency(totalPlannedBudget - totalActualExpenses)}
                  </p>
                </div>
                <div>
                  <p className='text-sm opacity-90'>Utilization</p>
                  <p className='text-xl font-bold'>
                    {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className='space-y-6'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Comprehensive Financial Analysis
              </h3>

              <div className='space-y-6'>
                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='font-semibold text-gray-800 mb-3'>
                    Overall Financial Position
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2'>
                      <span className='text-gray-600'>
                        Total Income Collected
                      </span>
                      <span className='font-semibold text-green-600'>
                        {formatCurrency(totalIncomeCollected)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2'>
                      <span className='text-gray-600'>Total Expenses</span>
                      <span className='font-semibold text-red-600'>
                        {formatCurrency(totalActualExpenses)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-t-2 border-gray-300 font-bold'>
                      <span className='text-gray-800'>Net Surplus</span>
                      <span className='text-green-600'>
                        {formatCurrency(netPosition)}
                      </span>
                    </div>
                    <div className='bg-green-50 p-3 rounded mt-2'>
                      <p className='text-sm text-green-800'>
                        <strong>Excellent Financial Health:</strong> The
                        committee has {formatCurrency(netPosition)} in surplus,
                        representing{' '}
                        {((netPosition / totalIncomeCollected) * 100).toFixed(
                          1
                        )}
                        % of total income. This demonstrates exceptional
                        financial management and fiscal discipline.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='font-semibold text-gray-800 mb-3'>
                    Children Harvest Detailed Analysis
                  </h4>
                  <div className='space-y-2'>
                    <div className='bg-orange-50 p-4 rounded-lg mb-3'>
                      <h5 className='font-semibold text-orange-900 mb-2'>
                        Income Sources
                      </h5>
                      <div className='flex justify-between py-1 text-sm'>
                        <span className='text-orange-700'>
                          Chairpersons ({incomeData.childrenChairPersons.length}{' '}
                          contributors)
                        </span>
                        <span className='font-semibold'>
                          {formatCurrency(childrenChairPersonsTotal)}
                        </span>
                      </div>
                      <div className='flex justify-between py-1 text-sm'>
                        <span className='text-orange-700'>
                          Members ({incomeData.childrenMembers.length}{' '}
                          contributors)
                        </span>
                        <span className='font-semibold'>
                          {formatCurrency(childrenMembersTotal)}
                        </span>
                      </div>
                      <div className='flex justify-between py-1 text-sm'>
                        <span className='text-orange-700'>
                          Harvest Day Collection
                        </span>
                        <span className='font-semibold'>
                          {formatCurrency(childrenHarvestDayTotal)}
                        </span>
                      </div>
                      <div className='flex justify-between py-1 text-sm border-t border-orange-300 mt-2 pt-2 font-bold'>
                        <span className='text-orange-900'>
                          Total Children Income
                        </span>
                        <span className='text-orange-900'>
                          {formatCurrency(totalChildrenCollected)}
                        </span>
                      </div>
                    </div>

                    <div className='bg-red-50 p-4 rounded-lg mb-3'>
                      <h5 className='font-semibold text-red-900 mb-2'>
                        Expenses Breakdown
                      </h5>
                      <div className='space-y-1 text-sm'>
                        {expenseDetails.childrenHarvest
                          .filter((i) => i.actual > 0)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className='flex justify-between py-1'>
                              <span className='text-red-700'>{item.item}</span>
                              <span className='font-semibold'>
                                {formatCurrency(item.actual)}
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className='flex justify-between py-1 text-sm border-t border-red-300 mt-2 pt-2 font-bold'>
                        <span className='text-red-900'>
                          Total Children Expenses
                        </span>
                        <span className='text-red-900'>
                          {formatCurrency(childrenHarvestTotal)}
                        </span>
                      </div>
                    </div>

                    <div className='bg-yellow-50 p-4 rounded-lg'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold text-yellow-900'>
                          Children Income
                        </span>
                        <span className='font-bold text-yellow-900'>
                          {formatCurrency(totalChildrenCollected)}
                        </span>
                      </div>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold text-yellow-900'>
                          Children Expenses
                        </span>
                        <span className='font-bold text-yellow-900'>
                          {formatCurrency(childrenHarvestTotal)}
                        </span>
                      </div>
                      <div className='flex justify-between items-center pt-2 border-t-2 border-yellow-400'>
                        <span className='font-bold text-red-800'>
                          Shortfall (from Harvest Committee)
                        </span>
                        <span className='font-bold text-red-600'>
                          {formatCurrency(childrenShortfall)}
                        </span>
                      </div>
                      <p className='text-xs text-yellow-700 mt-2'>
                        The children's program expenses exceeded their
                        contributions by {formatCurrency(childrenShortfall)}.
                        This amount was appropriately covered by the Harvest
                        Committee funds.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='font-semibold text-gray-800 mb-3'>
                    Harvest Committee Funds Utilization
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2'>
                      <span className='text-gray-600'>
                        Total Harvest Committee Contributions
                      </span>
                      <span className='font-semibold'>
                        {formatCurrency(harvestCommitteeTotal)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 text-sm border-l-2 border-gray-300 pl-2'>
                      <span className='text-gray-600'>
                        Used for Children Harvest Shortfall
                      </span>
                      <span className='font-semibold text-orange-600'>
                        ({formatCurrency(childrenShortfall)})
                      </span>
                    </div>
                    <div className='flex justify-between py-2 text-sm border-l-2 border-gray-300 pl-2'>
                      <span className='text-gray-600'>
                        Used for Family Harvest
                      </span>
                      <span className='font-semibold text-orange-600'>
                        ({formatCurrency(familyHarvestTotal)})
                      </span>
                    </div>
                    <div className='flex justify-between py-2 text-sm border-l-2 border-gray-300 pl-2'>
                      <span className='text-gray-600'>
                        Used for Dedication Logistics
                      </span>
                      <span className='font-semibold text-orange-600'>
                        ({formatCurrency(dedicationLogisticsTotal)})
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-t-2 border-gray-300 font-bold'>
                      <span className='text-gray-800'>
                        Remaining from Harvest Committee
                      </span>
                      <span className='text-green-600'>
                        {formatCurrency(
                          harvestCommitteeTotal -
                            childrenShortfall -
                            familyHarvestTotal -
                            dedicationLogisticsTotal
                        )}
                      </span>
                    </div>
                    <div className='bg-blue-50 p-3 rounded mt-2'>
                      <p className='text-sm text-blue-800'>
                        The Harvest Committee funds were strategically allocated
                        across three major areas: covering the children's
                        harvest shortfall, funding the family harvest program,
                        and supporting dedication logistics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-purple-500 pl-4'>
                  <h4 className='font-semibold text-gray-800 mb-3'>
                    Budget Performance Analysis
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2'>
                      <span className='text-gray-600'>
                        Total Approved Budget
                      </span>
                      <span className='font-semibold'>
                        {formatCurrency(totalPlannedBudget)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2'>
                      <span className='text-gray-600'>Total Utilized</span>
                      <span className='font-semibold'>
                        {formatCurrency(totalActualExpenses)}
                      </span>
                    </div>
                    <div className='flex justify-between py-2'>
                      <span className='text-gray-600'>Utilization Rate</span>
                      <span className='font-semibold text-blue-600'>
                        {(
                          (totalActualExpenses / totalPlannedBudget) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-t font-bold'>
                      <span className='text-gray-800'>Budget Remaining</span>
                      <span className='text-green-600'>
                        {formatCurrency(
                          totalPlannedBudget - totalActualExpenses
                        )}
                      </span>
                    </div>
                    <div className='bg-purple-50 p-3 rounded mt-2'>
                      <p className='text-sm text-purple-800'>
                        <strong>Outstanding Budget Control:</strong> With only{' '}
                        {(
                          (totalActualExpenses / totalPlannedBudget) *
                          100
                        ).toFixed(1)}
                        % of the ₦5M budget utilized, the committee has
                        demonstrated exceptional cost management, saving
                        {formatCurrency(
                          totalPlannedBudget - totalActualExpenses
                        )}
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-indigo-500 pl-4'>
                  <h4 className='font-semibold text-gray-800 mb-3'>
                    Expected Account Balance
                  </h4>
                  <div className='bg-indigo-50 p-4 rounded-lg'>
                    <div className='flex justify-between items-center mb-3'>
                      <span className='text-lg font-semibold text-indigo-900'>
                        Amount in Account/Cash
                      </span>
                      <span className='text-3xl font-bold text-indigo-700'>
                        {formatCurrency(netPosition)}
                      </span>
                    </div>
                    <div className='space-y-2 text-sm'>
                      <p className='text-indigo-800'>
                        <strong>
                          This is the total amount that should be available
                          across:
                        </strong>
                      </p>
                      <ul className='list-disc list-inside text-indigo-700 ml-2'>
                        <li>Bank account balance</li>
                        <li>Cash on hand</li>
                        <li>Any other committee holdings</li>
                      </ul>
                      <p className='text-indigo-800 mt-3 pt-3 border-t border-indigo-300'>
                        <strong>Calculation:</strong> Total Income (
                        {formatCurrency(totalIncomeCollected)}) - Total Expenses
                        ({formatCurrency(totalActualExpenses)}) ={' '}
                        {formatCurrency(netPosition)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Key Insights & Recommendations
              </h3>
              <div className='space-y-4'>
                <div className='bg-green-50 border-l-4 border-green-500 p-4'>
                  <h4 className='font-semibold text-green-900 mb-2'>
                    ✅ Strong Financial Position
                  </h4>
                  <p className='text-sm text-green-800'>
                    The committee has successfully generated a surplus of{' '}
                    {formatCurrency(netPosition)}, demonstrating excellent
                    fundraising capabilities and prudent expense management. The
                    surplus represents
                    {((netPosition / totalIncomeCollected) * 100).toFixed(1)}%
                    of total income collected.
                  </p>
                </div>

                <div className='bg-blue-50 border-l-4 border-blue-500 p-4'>
                  <h4 className='font-semibold text-blue-900 mb-2'>
                    💡 Exceptional Budget Discipline
                  </h4>
                  <p className='text-sm text-blue-800'>
                    Only{' '}
                    {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(
                      1
                    )}
                    % of the ₦5M approved budget has been utilized, saving{' '}
                    {formatCurrency(totalPlannedBudget - totalActualExpenses)}.
                    This demonstrates outstanding fiscal responsibility and
                    effective cost control measures throughout the planning
                    period.
                  </p>
                </div>

                <div className='bg-orange-50 border-l-4 border-orange-500 p-4'>
                  <h4 className='font-semibold text-orange-900 mb-2'>
                    📊 Children's Program Analysis
                  </h4>
                  <p className='text-sm text-orange-800 mb-2'>
                    The children's harvest program was well-executed with broad
                    participation (
                    {incomeData.childrenChairPersons.length +
                      incomeData.childrenMembers.length}{' '}
                    contributors). While expenses exceeded children's
                    contributions by {formatCurrency(childrenShortfall)}, this
                    was appropriately covered by committee funds and represents
                    only{' '}
                    {(
                      (childrenShortfall / harvestCommitteeTotal) *
                      100
                    ).toFixed(1)}
                    % of Harvest Committee contributions.
                  </p>
                </div>

                <div className='bg-yellow-50 border-l-4 border-yellow-500 p-4'>
                  <h4 className='font-semibold text-yellow-900 mb-2'>
                    ⚠️ Pending Budget Items
                  </h4>
                  <ul className='text-sm text-yellow-800 space-y-1 ml-4 list-disc'>
                    <li>
                      Dedication/Harvest Entertainment:{' '}
                      {formatCurrency(
                        budgetData.dedicationEntertainment.planned
                      )}{' '}
                      budgeted, ₦0 spent
                    </li>
                    <li>
                      Praise Night Refreshment:{' '}
                      {formatCurrency(budgetData.praiseNight.planned)} budgeted,
                      ₦0 spent
                    </li>
                    <li>
                      Most Dedication/Logistics items:{' '}
                      {formatCurrency(
                        budgetData.dedicationLogistics.planned -
                          dedicationLogisticsTotal
                      )}{' '}
                      remaining
                    </li>
                    <li>
                      Outstanding Contributions:{' '}
                      {formatCurrency(childrenOutstandingTotal)} yet to be
                      collected
                    </li>
                  </ul>
                </div>

                <div className='bg-purple-50 border-l-4 border-purple-500 p-4'>
                  <h4 className='font-semibold text-purple-900 mb-2'>
                    📋 Strategic Recommendations
                  </h4>
                  <ol className='text-sm text-purple-800 space-y-2 ml-4 list-decimal'>
                    <li>
                      <strong>Pending Events Review:</strong> Assess which of
                      the pending ₦4.4M in budgeted items (primarily
                      Entertainment and Logistics) are still required for
                      upcoming events.
                    </li>
                    <li>
                      <strong>Surplus Allocation:</strong> Develop a plan for
                      the {formatCurrency(netPosition)} surplus - options
                      include carrying forward to next harvest, redistribution,
                      or funding additional ministry initiatives.
                    </li>
                    <li>
                      <strong>Outstanding Collections:</strong> Follow up on the{' '}
                      {formatCurrency(childrenOutstandingTotal)}
                      in outstanding contributions from{' '}
                      {incomeData.childrenOutstanding.length} families.
                    </li>
                    <li>
                      <strong>Budget Reallocation:</strong> Consider
                      reallocating unused Entertainment budget (₦3M) based on
                      actual event requirements and current needs assessment.
                    </li>
                    <li>
                      <strong>Financial Documentation:</strong> Maintain
                      comprehensive records of all transactions for transparency
                      and future reference. Ensure all receipts are properly
                      filed.
                    </li>
                    <li>
                      <strong>Account Reconciliation:</strong> Verify that the
                      expected balance of {formatCurrency(netPosition)}
                      matches actual holdings (bank + cash).
                    </li>
                  </ol>
                </div>

                <div className='bg-gray-50 border-l-4 border-gray-500 p-4'>
                  <h4 className='font-semibold text-gray-900 mb-2'>
                    📈 Performance Highlights
                  </h4>
                  <ul className='text-sm text-gray-800 space-y-1 ml-4 list-disc'>
                    <li>
                      Total fundraising: {formatCurrency(totalIncomeCollected)}{' '}
                      from{' '}
                      {incomeData.harvestCommittee.length +
                        incomeData.adultContributions.length +
                        incomeData.childrenChairPersons.length +
                        incomeData.childrenMembers.length}{' '}
                      individual contributors plus harvest day collections
                    </li>
                    <li>
                      Budget efficiency:{' '}
                      {(
                        ((totalPlannedBudget - totalActualExpenses) /
                          totalPlannedBudget) *
                        100
                      ).toFixed(1)}
                      % savings rate
                    </li>
                    <li>
                      Net margin:{' '}
                      {((netPosition / totalIncomeCollected) * 100).toFixed(1)}%
                      surplus on total income
                    </li>
                    <li>
                      Completed categories: Family Harvest (
                      {(
                        (familyHarvestTotal /
                          budgetData.familyHarvest.planned) *
                        100
                      ).toFixed(1)}
                      % of budget), Children Harvest (
                      {(
                        (childrenHarvestTotal /
                          budgetData.childrenHarvest.planned) *
                        100
                      ).toFixed(1)}
                      % of budget)
                    </li>
                    <li>
                      Harvest Committee contribution covered{' '}
                      {(
                        (childrenShortfall / harvestCommitteeTotal) *
                        100
                      ).toFixed(1)}
                      % children's shortfall,{' '}
                      {(
                        (familyHarvestTotal / harvestCommitteeTotal) *
                        100
                      ).toFixed(1)}
                      % family harvest, and{' '}
                      {(
                        (dedicationLogisticsTotal / harvestCommitteeTotal) *
                        100
                      ).toFixed(1)}
                      % dedication logistics
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg p-8 text-white'>
              <h3 className='text-2xl font-bold mb-4'>Executive Summary</h3>
              <p className='text-lg leading-relaxed mb-4'>
                The C&S Movt. VOM Harvest Committee demonstrates exemplary
                financial stewardship. With
                {formatCurrency(totalIncomeCollected)} raised from diverse
                sources and {formatCurrency(totalActualExpenses)}
                spent (
                {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}%
                of ₦5M budget), the committee has achieved its core objectives
                while maintaining a healthy {formatCurrency(netPosition)}{' '}
                surplus. This surplus represents funds currently held in
                account/cash and demonstrates the committee's fiscal discipline
                and effective resource management.
              </p>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='bg-white bg-opacity-20 rounded p-3'>
                  <p className='text-sm opacity-90 text-white'>Total Raised</p>
                  <p className='text-2xl font-bold text-green-400'>
                    {formatCurrency(totalIncomeCollected)}
                  </p>
                </div>
                <div className='bg-white bg-opacity-20 rounded p-3'>
                  <p className='text-sm opacity-90 text-white'>Total Spent</p>
                  <p className='text-2xl font-bold text-red-400'>
                    {formatCurrency(totalActualExpenses)}
                  </p>
                </div>
                <div className='bg-white bg-opacity-20 rounded p-3'>
                  <p className='text-sm opacity-90 text-white'>Budget Saved</p>
                  <p className='text-2xl font-bold text-blue-400'>
                    {formatCurrency(totalPlannedBudget - totalActualExpenses)}
                  </p>
                </div>
                <div className='bg-white bg-opacity-20 rounded p-3'>
                  <p className='text-sm opacity-90 text-white'>Net Surplus</p>
                  <p className='text-2xl font-bold text-emerald-400'>
                    {formatCurrency(netPosition)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReport;
