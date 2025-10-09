'use client';

import { formatCurrency } from '@/utils/calculations';
import { usePrintMode } from '@/hooks/usePrintMode';

interface FinancialAnalysisCardsProps {
  totalIncomeCollected: number;
  totalActualExpenses: number;
  netPosition: number;
  totalPlannedBudget: number;
  harvestCommitteeTotal: number;
  familyHarvestTotal: number;
  dedicationLogisticsTotal: number;
  dedicationEntertainmentTotal: number;
  childrenShortfall: number;
  hasShortfall: boolean;
}

export const FinancialAnalysisCards: React.FC<FinancialAnalysisCardsProps> = ({
  totalIncomeCollected,
  totalActualExpenses,
  netPosition,
  totalPlannedBudget,
  harvestCommitteeTotal,
  familyHarvestTotal,
  dedicationLogisticsTotal,
  dedicationEntertainmentTotal,
  childrenShortfall,
  hasShortfall,
}) => {
  const { printMode } = usePrintMode();

  return (
    <div className='space-y-6'>
      {/* Overall Financial Position */}
      <div className='flex flex-col lg:flex-row gap-6'>
        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
          } rounded-lg p-6 flex-1 flex flex-col`}>
          <div className='flex-1 '>
            <h3
              className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              <span className='text-2xl'>💼</span>
              Overall Financial Position
            </h3>

            <div className='space-y-4'>
              <div className='flex justify-between items-center py-3'>
                <span
                  className={`font-medium ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Total Income Collected
                </span>
                <span
                  className={`text-xl font-bold ${
                    printMode ? 'text-black' : 'text-green-600'
                  }`}>
                  {formatCurrency(totalIncomeCollected)}
                </span>
              </div>

              <div className='flex justify-between items-center py-3'>
                <span
                  className={`font-medium ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Total Expenses
                </span>
                <span
                  className={`text-xl font-bold ${
                    printMode ? 'text-black' : 'text-red-600'
                  }`}>
                  {formatCurrency(totalActualExpenses)}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-between items-center py-4 mt-4 ${
              printMode
                ? 'border-t-2 border-black'
                : 'border-t-2 border-gray-300'
            }`}>
            <span
              className={`text-lg font-bold ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Net Surplus
            </span>
            <span
              className={`text-2xl font-bold ${
                printMode ? 'text-black' : 'text-green-600'
              }`}>
              {formatCurrency(netPosition)}
            </span>
          </div>

          <div
            className={`${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-green-50 border-l-4 border-green-500'
            } p-4 rounded mt-4`}>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-green-800'
              }`}>
              <strong>✅ Excellent Financial Health:</strong> The committee has{' '}
              {formatCurrency(netPosition)} in surplus, representing{' '}
              {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of
              total income.
            </p>
          </div>
        </div>

        {/* Budget Performance */}
        <div
          className={`${
            printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
          } rounded-lg p-6 flex-1`}>
          <h3
            className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              printMode ? 'text-black' : 'text-gray-800'
            }`}>
            <span className='text-2xl'>📋</span>
            Budget Performance Analysis
          </h3>

          <div className='space-y-4'>
            <div className='flex justify-between items-center py-3'>
              <span
                className={`font-medium ${
                  printMode ? 'text-black' : 'text-gray-600'
                }`}>
                Total Approved Budget
              </span>
              <span
                className={`text-lg font-semibold ${
                  printMode ? 'text-black' : 'text-gray-800'
                }`}>
                {formatCurrency(totalPlannedBudget)}
              </span>
            </div>

            <div className='flex justify-between items-center py-3'>
              <span
                className={`font-medium ${
                  printMode ? 'text-black' : 'text-gray-600'
                }`}>
                Total Utilized
              </span>
              <span
                className={`text-lg font-semibold ${
                  printMode ? 'text-black' : 'text-blue-600'
                }`}>
                {formatCurrency(totalActualExpenses)}
              </span>
            </div>

            <div className='flex justify-between items-center py-3'>
              <span
                className={`font-medium ${
                  printMode ? 'text-black' : 'text-gray-600'
                }`}>
                Utilization Rate
              </span>
              <span
                className={`text-lg font-semibold ${
                  printMode ? 'text-black' : 'text-blue-600'
                }`}>
                {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}%
              </span>
            </div>

            <div
              className={`flex justify-between items-center py-4 mt-4 ${
                printMode
                  ? 'border-t-2 border-black'
                  : 'border-t-2 border-gray-300'
              }`}>
              <span
                className={`text-lg font-bold ${
                  printMode ? 'text-black' : 'text-gray-800'
                }`}>
                Budget Remaining
              </span>
              <span
                className={`text-2xl font-bold ${
                  printMode ? 'text-black' : 'text-green-600'
                }`}>
                {formatCurrency(totalPlannedBudget - totalActualExpenses)}
              </span>
            </div>

            <div
              className={`${
                printMode
                  ? 'bg-gray-100 border border-black'
                  : 'bg-indigo-50 border-l-4 border-indigo-500'
              } p-4 rounded mt-4`}>
              <p
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-indigo-800'
                }`}>
                <strong>🎯 Outstanding Budget Control:</strong> With only{' '}
                {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}%
                of the ₦5M budget utilized, the committee has demonstrated
                exceptional cost management, saving{' '}
                {formatCurrency(totalPlannedBudget - totalActualExpenses)}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Harvest Committee Funds Utilization */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white shadow-lg'
        } rounded-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          <span className='text-2xl'>🏦</span>
          Harvest Committee Funds Utilization
        </h3>

        <div className='space-y-3'>
          <div className='flex justify-between items-center py-3'>
            <span
              className={`font-semibold ${
                printMode ? 'text-black' : 'text-gray-700'
              }`}>
              Total Committee Contributions
            </span>
            <span
              className={`text-lg font-bold ${
                printMode ? 'text-black' : 'text-purple-600'
              }`}>
              {formatCurrency(harvestCommitteeTotal)}
            </span>
          </div>

          <div
            className={`ml-4 pl-4 space-y-2 ${
              printMode
                ? 'border-l-2 border-black'
                : 'border-l-2 border-purple-300'
            }`}>
            <div className='flex justify-between items-center py-2'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-gray-600'
                }`}>
                Used for Family Harvest
              </span>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-orange-600'
                }`}>
                {formatCurrency(familyHarvestTotal)}
              </span>
            </div>

            <div className='flex justify-between items-center py-2'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-gray-600'
                }`}>
                Used for Dedication Logistics
              </span>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-orange-600'
                }`}>
                {formatCurrency(dedicationLogisticsTotal)}
              </span>
            </div>

            <div className='flex justify-between items-center py-2'>
              <span
                className={`text-sm ${
                  printMode ? 'text-black' : 'text-gray-600'
                }`}>
                Used for Dedication Entertainment
              </span>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-orange-600'
                }`}>
                {formatCurrency(dedicationEntertainmentTotal)}
              </span>
            </div>

            {hasShortfall && (
              <div className='flex justify-between items-center py-2'>
                <span
                  className={`text-sm ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Used for Children Harvest Shortfall
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-red-600'
                  }`}>
                  {formatCurrency(Math.abs(childrenShortfall))}
                </span>
              </div>
            )}
          </div>

          <div
            className={`flex flex-col lg:flex-row-reverse justify-between lg:items-center py-4 mt-4 gap-4 lg:gap-16 ${
              printMode
                ? 'border-t-2 border-black'
                : 'border-t-2 border-gray-300'
            }`}>
            <div className='flex-1 flex justify-between items-center'>
              <span
                className={`text-lg font-bold ${
                  printMode ? 'text-black' : 'text-gray-800'
                }`}>
                Total Spent:
              </span>
              <span
                className={`text-2xl font-bold ${
                  printMode ? 'text-black' : 'text-red-600'
                }`}>
                {formatCurrency(
                  familyHarvestTotal +
                    dedicationLogisticsTotal +
                    dedicationEntertainmentTotal
                )}
              </span>
            </div>
            <div className={`flex-1 flex justify-between items-center`}>
              <span
                className={`text-lg font-bold ${
                  printMode ? 'text-black' : 'text-gray-800'
                }`}>
                Remaining Balance:
              </span>
              <span
                className={`text-2xl font-bold ${
                  printMode ? 'text-black' : 'text-green-600'
                }`}>
                {formatCurrency(
                  harvestCommitteeTotal -
                    familyHarvestTotal -
                    dedicationLogisticsTotal -
                    dedicationEntertainmentTotal -
                    (hasShortfall ? Math.abs(childrenShortfall) : 0)
                )}
              </span>
            </div>
          </div>

          <div
            className={`${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-purple-50 border-l-4 border-purple-500'
            } p-4 rounded mt-4`}>
            <p
              className={`text-sm ${
                printMode ? 'text-black' : 'text-purple-800'
              }`}>
              The Harvest Committee funds were strategically allocated across{' '}
              {hasShortfall ? 'four' : 'three'} major areas: funding the family
              harvest program, supporting dedication logistics & entertainment
              {hasShortfall &&
                ", and covering the children's harvest shortfall"}
              .
            </p>
          </div>
        </div>
      </div>

      {/* Expected Account Balance */}
      <div
        className={`${
          printMode
            ? 'bg-white border border-black'
            : 'bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg'
        } rounded-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          <span className='text-2xl'>💰</span>
          Expected Account Balance
        </h3>

        <div
          className={`${
            printMode ? 'bg-gray-100 border border-black' : 'bg-white'
          } p-5 rounded-lg`}>
          <div className='flex justify-between items-center mb-4'>
            <span
              className={`text-lg font-semibold ${
                printMode ? 'text-black' : 'text-teal-900'
              }`}>
              Amount in Account/Cash
            </span>
            <span
              className={`text-4xl font-bold ${
                printMode ? 'text-black' : 'text-teal-700'
              }`}>
              {formatCurrency(netPosition)}
            </span>
          </div>

          <div className='space-y-3 text-sm'>
            <p
              className={`font-semibold ${
                printMode ? 'text-black' : 'text-teal-800'
              }`}>
              This is the total amount that should be available across:
            </p>
            <ul
              className={`list-disc list-inside ml-4 space-y-1 ${
                printMode ? 'text-black' : 'text-teal-700'
              }`}>
              <li>Bank account balance</li>
              <li>Cash on hand</li>
              <li>Any other committee holdings</li>
            </ul>

            <div
              className={`mt-4 pt-4 ${
                printMode ? 'border-t border-black' : 'border-t border-teal-300'
              }`}>
              <p
                className={`font-medium ${
                  printMode ? 'text-black' : 'text-teal-800'
                }`}>
                <strong>Calculation:</strong> Total Income (
                {formatCurrency(totalIncomeCollected)}) - Total Expenses (
                {formatCurrency(totalActualExpenses)}) ={' '}
                <span
                  className={`font-bold ${
                    printMode ? 'text-black' : 'text-teal-700'
                  }`}>
                  {formatCurrency(netPosition)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
