'use client';

import { formatCurrency } from '@/utils/calculations';
import { usePrintMode } from '@/hooks/usePrintMode';

interface AnalysisChartsProps {
  totalIncomeCollected: number;
  totalActualExpenses: number;
  netPosition: number;
  harvestCommitteeTotal: number;
  childrenChairPersonsTotal: number;
  childrenMembersTotal: number;
  childrenHarvestDayTotal: number;
  familyHarvestTotal: number;
  childrenHarvestTotal: number;
  praiseNightTotal: number;
  childrenOutstandingTotal: number;
  adultContributionsTotal: number;
  dedicationLogisticsTotal: number;
  dedicationEntertainmentTotal: number;
}

export const AnalysisCharts: React.FC<AnalysisChartsProps> = ({
  totalIncomeCollected,
  totalActualExpenses,
  netPosition,
  harvestCommitteeTotal,
  childrenChairPersonsTotal,
  childrenMembersTotal,
  childrenHarvestDayTotal,
  familyHarvestTotal,
  childrenHarvestTotal,
  praiseNightTotal,
  childrenOutstandingTotal,
  adultContributionsTotal,
  dedicationLogisticsTotal,
  dedicationEntertainmentTotal,
}) => {
  const { printMode } = usePrintMode();

  // Income breakdown
  const childrenIncomeTotal =
    childrenChairPersonsTotal + childrenMembersTotal + childrenHarvestDayTotal;

  // Expense breakdown
  const dedicationTotal =
    dedicationLogisticsTotal + dedicationEntertainmentTotal;

  // Calculate percentages for pie chart
  const incomeData = [
    {
      label: 'Harvest Committee',
      value: harvestCommitteeTotal,
      color: printMode ? '#000' : '#3b82f6',
    },
    {
      label: 'Adult Harvest',
      value: adultContributionsTotal,
      color: printMode ? '#000' : '#0fc2ea',
    },
    {
      label: "Children's Income",
      value: childrenIncomeTotal + childrenOutstandingTotal,
      color: printMode ? '#666' : '#10b981',
    },
  ];

  const expenseData = [
    {
      label: 'Family Harvest',
      value: familyHarvestTotal,
      color: printMode ? '#000' : '#f97316',
    },
    {
      label: "Children's Harvest",
      value: childrenHarvestTotal,
      color: printMode ? '#444' : '#8b5cf6',
    },
    {
      label: 'Praise Night',
      value: praiseNightTotal,
      color: printMode ? '#666' : '#ec4899',
    },
    {
      label: 'Dedication Logistics',
      value: dedicationLogisticsTotal,
      color: printMode ? '#888' : '#6366f1',
    },
    {
      label: 'Dedication Entertainment',
      value: dedicationEntertainmentTotal,
      color: printMode ? '#888' : '#0fc2ea',
    },
  ];

  // Create pie chart slices
  const createPieSlices = (data: typeof incomeData) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // Start from top

    return data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const largeArcFlag = angle > 180 ? 1 : 0;

      const startAngle = (currentAngle * Math.PI) / 180;
      const endAngle = ((currentAngle + angle) * Math.PI) / 180;

      const x1 = 100 + 90 * Math.cos(startAngle);
      const y1 = 100 + 90 * Math.sin(startAngle);
      const x2 = 100 + 90 * Math.cos(endAngle);
      const y2 = 100 + 90 * Math.sin(endAngle);

      const pathData = `M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      currentAngle += angle;

      return {
        pathData,
        color: item.color,
        percentage,
        label: item.label,
        value: item.value,
      };
    });
  };

  // Create doughnut chart
  const createDoughnutSlices = (data: typeof expenseData) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;

    return data.map((item) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const largeArcFlag = angle > 180 ? 1 : 0;

      const startAngle = (currentAngle * Math.PI) / 180;
      const endAngle = ((currentAngle + angle) * Math.PI) / 180;

      const outerRadius = 90;
      const innerRadius = 50;

      const x1Outer = 100 + outerRadius * Math.cos(startAngle);
      const y1Outer = 100 + outerRadius * Math.sin(startAngle);
      const x2Outer = 100 + outerRadius * Math.cos(endAngle);
      const y2Outer = 100 + outerRadius * Math.sin(endAngle);

      const x1Inner = 100 + innerRadius * Math.cos(startAngle);
      const y1Inner = 100 + innerRadius * Math.sin(startAngle);
      const x2Inner = 100 + innerRadius * Math.cos(endAngle);
      const y2Inner = 100 + innerRadius * Math.sin(endAngle);

      const pathData = `
        M ${x1Outer} ${y1Outer}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}
        L ${x2Inner} ${y2Inner}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}
        Z
      `;

      currentAngle += angle;

      return {
        pathData,
        color: item.color,
        percentage,
        label: item.label,
        value: item.value,
      };
    });
  };

  const incomeSlices = createPieSlices(incomeData);
  const expenseSlices = createDoughnutSlices(expenseData);

  return (
    <div className='space-y-8'>
      {/* Income vs Expenses Comparison - Bar Chart */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
        } rounded-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-6 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          📊 Income vs Expenses Comparison
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Bar Chart */}
          <div>
            <h4
              className={`text-sm font-semibold mb-4 ${
                printMode ? 'text-black' : 'text-gray-700'
              }`}>
              Bar Chart
            </h4>
            <div className='space-y-6'>
              {/* Income Bar */}
              <div>
                <div className='flex justify-between mb-2'>
                  <span
                    className={`text-sm font-medium ${
                      printMode ? 'text-black' : 'text-gray-600'
                    }`}>
                    Total Income
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      printMode ? 'text-black' : 'text-green-600'
                    }`}>
                    {formatCurrency(totalIncomeCollected)}
                  </span>
                </div>
                <div
                  className={`relative h-12 ${
                    printMode ? 'bg-gray-200' : 'bg-gray-100'
                  } rounded-lg overflow-hidden`}>
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      printMode
                        ? 'bg-black'
                        : 'bg-gradient-to-r from-green-400 to-green-600'
                    } transition-all duration-1000 flex items-center justify-end pr-4`}
                    style={{ width: '100%' }}>
                    <span className='text-white text-xs font-bold'>100%</span>
                  </div>
                </div>
              </div>

              {/* Expenses Bar */}
              <div>
                <div className='flex justify-between mb-2'>
                  <span
                    className={`text-sm font-medium ${
                      printMode ? 'text-black' : 'text-gray-600'
                    }`}>
                    Total Expenses
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      printMode ? 'text-black' : 'text-red-600'
                    }`}>
                    {formatCurrency(totalActualExpenses)}
                  </span>
                </div>
                <div
                  className={`relative h-12 ${
                    printMode ? 'bg-gray-200' : 'bg-gray-100'
                  } rounded-lg overflow-hidden`}>
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      printMode
                        ? 'bg-gray-600'
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                    } transition-all duration-1000 flex items-center justify-end pr-4`}
                    style={{
                      width: `${
                        (totalActualExpenses / totalIncomeCollected) * 100
                      }%`,
                    }}>
                    <span className='text-white text-xs font-bold'>
                      {(
                        (totalActualExpenses / totalIncomeCollected) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Surplus Bar */}
              <div>
                <div className='flex justify-between mb-2'>
                  <span
                    className={`text-sm font-medium ${
                      printMode ? 'text-black' : 'text-gray-600'
                    }`}>
                    Net Surplus
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      printMode ? 'text-black' : 'text-blue-600'
                    }`}>
                    {formatCurrency(netPosition)}
                  </span>
                </div>
                <div
                  className={`relative h-12 ${
                    printMode ? 'bg-gray-200' : 'bg-gray-100'
                  } rounded-lg overflow-hidden`}>
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      printMode
                        ? 'bg-gray-400'
                        : 'bg-gradient-to-r from-blue-400 to-blue-600'
                    } transition-all duration-1000 flex items-center justify-end pr-4`}
                    style={{
                      width: `${(netPosition / totalIncomeCollected) * 100}%`,
                    }}>
                    <span className='text-white text-xs font-bold'>
                      {((netPosition / totalIncomeCollected) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div
            className={`${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50'
            } rounded-lg p-6`}>
            <h4
              className={`text-sm font-semibold mb-4 ${
                printMode ? 'text-black' : 'text-gray-700'
              }`}>
              Financial Summary
            </h4>
            <div className='space-y-4'>
              <div
                className={`p-4 rounded-lg ${
                  printMode ? 'bg-white border border-black' : 'bg-white'
                }`}>
                <div className='text-center'>
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      printMode ? 'text-black' : 'text-green-600'
                    }`}>
                    {((netPosition / totalIncomeCollected) * 100).toFixed(1)}%
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      printMode ? 'text-black' : 'text-gray-600'
                    }`}>
                    Surplus Ratio
                  </div>
                </div>
              </div>
              <div
                className={`text-xs ${
                  printMode ? 'text-black' : 'text-gray-600'
                } space-y-2`}>
                <p>✅ Strong financial position with significant surplus</p>
                <p>✅ Excellent expense management</p>
                <p>✅ Sustainable operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income Sources - Pie Chart */}
      <div className='flex flex-col lg:flex-row gap-6'>
        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
          } rounded-lg p-6`}>
          <h3
            className={`text-xl font-bold mb-6 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            🥧 Income Sources Distribution
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Pie Chart */}
            <div className='flex justify-center items-center'>
              <svg
                width='280'
                height='280'
                viewBox='0 0 200 200'
                className='transform hover:scale-105 transition-transform'>
                {incomeSlices.map((slice, index) => (
                  <g key={index}>
                    <path
                      d={slice.pathData}
                      fill={slice.color}
                      stroke='white'
                      strokeWidth='2'
                      className='hover:opacity-80 transition-opacity cursor-pointer'
                    />
                  </g>
                ))}
                <circle
                  cx='100'
                  cy='100'
                  r='35'
                  fill={printMode ? 'white' : '#f9fafb'}
                />
                <text
                  x='100'
                  y='95'
                  textAnchor='middle'
                  className={`text-xs font-bold ${
                    printMode ? 'fill-black' : 'fill-gray-700'
                  }`}>
                  Total
                </text>
                <text
                  x='100'
                  y='110'
                  textAnchor='middle'
                  className={`text-[10px] font-semibold ${
                    printMode ? 'fill-black' : 'fill-gray-600'
                  }`}>
                  Income
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className='flex flex-col justify-center space-y-4'>
              {incomeSlices.map((slice, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className='w-4 h-4 rounded'
                      style={{ backgroundColor: slice.color }}
                    />
                    <span
                      className={`text-sm font-medium ${
                        printMode ? 'text-black' : 'text-gray-700'
                      }`}>
                      {slice.label}
                    </span>
                  </div>
                  <div className='text-right'>
                    <div
                      className={`text-sm font-bold ${
                        printMode ? 'text-black' : 'text-gray-800'
                      }`}>
                      {formatCurrency(slice.value)}
                    </div>
                    <div
                      className={`text-xs ${
                        printMode ? 'text-black' : 'text-gray-500'
                      }`}>
                      {slice.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={`pt-4 mt-4 ${
                  printMode
                    ? 'border-t-2 border-black'
                    : 'border-t-2 border-gray-200'
                }`}>
                <div className='flex justify-between items-center'>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-gray-800'
                    }`}>
                    Total
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      printMode ? 'text-black' : 'text-green-600'
                    }`}>
                    {formatCurrency(totalIncomeCollected)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Categories - Doughnut Chart */}
        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
          } rounded-lg p-6`}>
          <h3
            className={`text-xl font-bold mb-6 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            🍩 Expense Categories Distribution
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Doughnut Chart */}
            <div className='flex justify-center items-center'>
              <svg
                width='280'
                height='280'
                viewBox='0 0 200 200'
                className='transform hover:scale-105 transition-transform'>
                {expenseSlices.map((slice, index) => (
                  <path
                    key={index}
                    d={slice.pathData}
                    fill={slice.color}
                    stroke='white'
                    strokeWidth='2'
                    className='hover:opacity-80 transition-opacity cursor-pointer'
                  />
                ))}
                <circle
                  cx='100'
                  cy='100'
                  r='45'
                  fill={printMode ? 'white' : '#f9fafb'}
                />
                <text
                  x='100'
                  y='95'
                  textAnchor='middle'
                  className={`text-xs font-bold ${
                    printMode ? 'fill-black' : 'fill-gray-700'
                  }`}>
                  Total
                </text>
                <text
                  x='100'
                  y='110'
                  textAnchor='middle'
                  className={`text-[10px] font-semibold ${
                    printMode ? 'fill-black' : 'fill-gray-600'
                  }`}>
                  Expenses
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className='flex flex-col justify-center space-y-3'>
              {expenseSlices.map((slice, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className='w-4 h-4 rounded'
                      style={{ backgroundColor: slice.color }}
                    />
                    <span
                      className={`text-sm font-medium ${
                        printMode ? 'text-black' : 'text-gray-700'
                      }`}>
                      {slice.label}
                    </span>
                  </div>
                  <div className='text-right'>
                    <div
                      className={`text-sm font-bold ${
                        printMode ? 'text-black' : 'text-gray-800'
                      }`}>
                      {formatCurrency(slice.value)}
                    </div>
                    <div
                      className={`text-xs ${
                        printMode ? 'text-black' : 'text-gray-500'
                      }`}>
                      {slice.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={`pt-4 mt-4 ${
                  printMode
                    ? 'border-t-2 border-black'
                    : 'border-t-2 border-gray-200'
                }`}>
                <div className='flex justify-between items-center'>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-gray-800'
                    }`}>
                    Total
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      printMode ? 'text-black' : 'text-red-600'
                    }`}>
                    {formatCurrency(totalActualExpenses)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
