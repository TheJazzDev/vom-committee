import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface AnalysisTabProps {
  totalIncomeCollected: number;
  totalActualExpenses: number;
  netPosition: number;
  childrenChairPersonsTotal: number;
  childrenMembersTotal: number;
  childrenHarvestDayTotal: number;
  totalChildrenCollected: number;
  childrenHarvestTotal: number;
  childrenShortfall: number;
  harvestCommitteeTotal: number;
  familyHarvestTotal: number;
  dedicationLogisticsTotal: number;
  totalPlannedBudget: number;
  expenseDetails: ExpenseDetails;
  incomeData: IncomeData;
  budgetData: BudgetData;
  printMode: boolean;
}

export const AnalysisTab: React.FC<AnalysisTabProps> = ({
  totalIncomeCollected,
  totalActualExpenses,
  netPosition,
  childrenChairPersonsTotal,
  childrenMembersTotal,
  childrenHarvestDayTotal,
  totalChildrenCollected,
  childrenHarvestTotal,
  childrenShortfall,
  harvestCommitteeTotal,
  familyHarvestTotal,
  dedicationLogisticsTotal,
  totalPlannedBudget,
  expenseDetails,
  incomeData,
  budgetData,
  printMode,
}) => {
  return (
    <div className='space-y-6'>
      {printMode && (
        <h4 className='text-3xl font-semibold text-center py-6'>Analysis</h4>
      )}
      {/* Comprehensive Financial Analysis */}
      <div
        className={`${
          printMode ? 'bg-white border border-black' : 'bg-white'
        } rounded-lg shadow-lg p-6`}>
        <h3
          className={`text-xl font-bold mb-4 ${
            printMode ? 'text-black' : 'text-gray-800'
          }`}>
          Comprehensive Financial Analysis
        </h3>

        <div className='space-y-6'>
          {/* Overall Financial Position */}
          <div
            className={`${
              printMode
                ? 'border-l-4 border-black'
                : 'border-l-4 border-green-500'
            } pl-4`}>
            <h4
              className={`font-semibold mb-3 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Overall Financial Position
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between py-2'>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Total Income Collected
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-green-600'
                  }`}>
                  {formatCurrency(totalIncomeCollected)}
                </span>
              </div>
              <div className='flex justify-between py-2'>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Total Expenses
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-red-600'
                  }`}>
                  {formatCurrency(totalActualExpenses)}
                </span>
              </div>
              <div
                className={`flex justify-between py-2 font-bold ${
                  printMode
                    ? 'border-t-2 border-black'
                    : 'border-t-2 border-gray-300'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-800'}>
                  Net Surplus
                </span>
                <span className={printMode ? 'text-black' : 'text-green-600'}>
                  {formatCurrency(netPosition)}
                </span>
              </div>
              <div
                className={`${
                  printMode ? 'bg-white border border-black' : 'bg-green-50'
                } p-3 rounded mt-2`}>
                <p
                  className={`text-sm ${
                    printMode ? 'text-black' : 'text-green-800'
                  }`}>
                  <strong>Excellent Financial Health:</strong> The committee has{' '}
                  {formatCurrency(netPosition)} in surplus, representing{' '}
                  {((netPosition / totalIncomeCollected) * 100).toFixed(1)}% of
                  total income. This demonstrates exceptional financial
                  management and fiscal discipline.
                </p>
              </div>
            </div>
          </div>

          {/* Children Harvest Detailed Analysis */}
          <div
            className={`${
              printMode
                ? 'border-l-4 border-black'
                : 'border-l-4 border-orange-500'
            } pl-4`}>
            <h4
              className={`font-semibold mb-3 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Children Harvest Detailed Analysis
            </h4>
            <div className='space-y-2'>
              <div
                className={`${
                  printMode ? 'bg-white border border-black' : 'bg-orange-50'
                } p-4 rounded-lg mb-3`}>
                <h5
                  className={`font-semibold mb-2 ${
                    printMode ? 'text-black' : 'text-orange-900'
                  }`}>
                  Income Sources
                </h5>
                <div className='flex justify-between py-1 text-sm'>
                  <span
                    className={printMode ? 'text-black' : 'text-orange-700'}>
                    Chairpersons ({incomeData.childrenChairPersons.length}{' '}
                    contributors)
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(childrenChairPersonsTotal)}
                  </span>
                </div>
                <div className='flex justify-between py-1 text-sm'>
                  <span
                    className={printMode ? 'text-black' : 'text-orange-700'}>
                    Members ({incomeData.childrenMembers.length} contributors)
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(childrenMembersTotal)}
                  </span>
                </div>
                <div className='flex justify-between py-1 text-sm'>
                  <span
                    className={printMode ? 'text-black' : 'text-orange-700'}>
                    Harvest Day Collection
                  </span>
                  <span className='font-semibold'>
                    {formatCurrency(childrenHarvestDayTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1 text-sm font-bold mt-2 pt-2 ${
                    printMode
                      ? 'border-t border-black'
                      : 'border-t border-orange-300'
                  }`}>
                  <span
                    className={printMode ? 'text-black' : 'text-orange-900'}>
                    Total Children Income
                  </span>
                  <span
                    className={printMode ? 'text-black' : 'text-orange-900'}>
                    {formatCurrency(totalChildrenCollected)}
                  </span>
                </div>
              </div>

              <div
                className={`${
                  printMode ? 'bg-white border border-black' : 'bg-red-50'
                } p-4 rounded-lg mb-3`}>
                <h5
                  className={`font-semibold mb-2 ${
                    printMode ? 'text-black' : 'text-red-900'
                  }`}>
                  Expenses Breakdown
                </h5>
                <div className='space-y-1 text-sm'>
                  {expenseDetails.childrenHarvest
                    .filter((i: ExpenseItem) => i.actual > 0)
                    .map((item: ExpenseItem, idx: number) => (
                      <div key={idx} className='flex justify-between py-1'>
                        <span
                          className={printMode ? 'text-black' : 'text-red-700'}>
                          {item.item}
                        </span>
                        <span className='font-semibold'>
                          {formatCurrency(item.actual)}
                        </span>
                      </div>
                    ))}
                </div>
                <div
                  className={`flex justify-between py-1 text-sm font-bold mt-2 pt-2 ${
                    printMode
                      ? 'border-t border-black'
                      : 'border-t border-red-300'
                  }`}>
                  <span className={printMode ? 'text-black' : 'text-red-900'}>
                    Total Children Expenses
                  </span>
                  <span className={printMode ? 'text-black' : 'text-red-900'}>
                    {formatCurrency(childrenHarvestTotal)}
                  </span>
                </div>
              </div>

              <div
                className={`${
                  printMode ? 'bg-white border border-black' : 'bg-yellow-50'
                } p-4 rounded-lg`}>
                <div className='flex justify-between items-center mb-2'>
                  <span
                    className={`font-semibold ${
                      printMode ? 'text-black' : 'text-yellow-900'
                    }`}>
                    Children Income
                  </span>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-yellow-900'
                    }`}>
                    {formatCurrency(totalChildrenCollected)}
                  </span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span
                    className={`font-semibold ${
                      printMode ? 'text-black' : 'text-yellow-900'
                    }`}>
                    Children Expenses
                  </span>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-yellow-900'
                    }`}>
                    {formatCurrency(childrenHarvestTotal)}
                  </span>
                </div>
                <div
                  className={`flex justify-between items-center pt-2 ${
                    printMode
                      ? 'border-t-2 border-black'
                      : 'border-t-2 border-yellow-400'
                  }`}>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-red-800'
                    }`}>
                    Shortfall (from Harvest Committee)
                  </span>
                  <span
                    className={`font-bold ${
                      printMode ? 'text-black' : 'text-red-600'
                    }`}>
                    {formatCurrency(childrenShortfall)}
                  </span>
                </div>
                <p
                  className={`text-xs mt-2 ${
                    printMode ? 'text-black' : 'text-yellow-700'
                  }`}>
                  The children's program expenses exceeded their contributions
                  by {formatCurrency(childrenShortfall)}. This amount was
                  appropriately covered by the Harvest Committee funds.
                </p>
              </div>
            </div>
          </div>

          {/* Harvest Committee Funds Utilization */}
          <div
            className={`${
              printMode
                ? 'border-l-4 border-black'
                : 'border-l-4 border-blue-500'
            } pl-4`}>
            <h4
              className={`font-semibold mb-3 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Harvest Committee Funds Utilization
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between py-2'>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Total Harvest Committee Contributions
                </span>
                <span className='font-semibold'>
                  {formatCurrency(harvestCommitteeTotal)}
                </span>
              </div>
              <div
                className={`flex justify-between py-2 text-sm pl-2 ${
                  printMode
                    ? 'border-l-2 border-black'
                    : 'border-l-2 border-gray-300'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Used for Children Harvest Shortfall
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-orange-600'
                  }`}>
                  ({formatCurrency(childrenShortfall)})
                </span>
              </div>
              <div
                className={`flex justify-between py-2 text-sm pl-2 ${
                  printMode
                    ? 'border-l-2 border-black'
                    : 'border-l-2 border-gray-300'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Used for Family Harvest
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-orange-600'
                  }`}>
                  ({formatCurrency(familyHarvestTotal)})
                </span>
              </div>
              <div
                className={`flex justify-between py-2 text-sm pl-2 ${
                  printMode
                    ? 'border-l-2 border-black'
                    : 'border-l-2 border-gray-300'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Used for Dedication Logistics
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-orange-600'
                  }`}>
                  ({formatCurrency(dedicationLogisticsTotal)})
                </span>
              </div>
              <div
                className={`flex justify-between py-2 font-bold ${
                  printMode
                    ? 'border-t-2 border-black'
                    : 'border-t-2 border-gray-300'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-800'}>
                  Remaining from Harvest Committee
                </span>
                <span className={printMode ? 'text-black' : 'text-green-600'}>
                  {formatCurrency(
                    harvestCommitteeTotal -
                      childrenShortfall -
                      familyHarvestTotal -
                      dedicationLogisticsTotal
                  )}
                </span>
              </div>
              <div
                className={`${
                  printMode ? 'bg-white border border-black' : 'bg-blue-50'
                } p-3 rounded mt-2`}>
                <p
                  className={`text-sm ${
                    printMode ? 'text-black' : 'text-blue-800'
                  }`}>
                  The Harvest Committee funds were strategically allocated
                  across three major areas: covering the children's harvest
                  shortfall, funding the family harvest program, and supporting
                  dedication logistics.
                </p>
              </div>
            </div>
          </div>

          {/* Budget Performance Analysis */}
          <div
            className={`${
              printMode
                ? 'border-l-4 border-black'
                : 'border-l-4 border-purple-500'
            } pl-4`}>
            <h4
              className={`font-semibold mb-3 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Budget Performance Analysis
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between py-2'>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Total Approved Budget
                </span>
                <span className='font-semibold'>
                  {formatCurrency(totalPlannedBudget)}
                </span>
              </div>
              <div className='flex justify-between py-2'>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Total Utilized
                </span>
                <span className='font-semibold'>
                  {formatCurrency(totalActualExpenses)}
                </span>
              </div>
              <div className='flex justify-between py-2'>
                <span className={printMode ? 'text-black' : 'text-gray-600'}>
                  Utilization Rate
                </span>
                <span
                  className={`font-semibold ${
                    printMode ? 'text-black' : 'text-blue-600'
                  }`}>
                  {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div
                className={`flex justify-between py-2 font-bold ${
                  printMode ? 'border-t border-black' : 'border-t'
                }`}>
                <span className={printMode ? 'text-black' : 'text-gray-800'}>
                  Budget Remaining
                </span>
                <span className={printMode ? 'text-black' : 'text-green-600'}>
                  {formatCurrency(totalPlannedBudget - totalActualExpenses)}
                </span>
              </div>
              <div
                className={`${
                  printMode ? 'bg-white border border-black' : 'bg-purple-50'
                } p-3 rounded mt-2`}>
                <p
                  className={`text-sm ${
                    printMode ? 'text-black' : 'text-purple-800'
                  }`}>
                  <strong>Outstanding Budget Control:</strong> With only{' '}
                  {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(
                    1
                  )}
                  % of the ₦5M budget utilized, the committee has demonstrated
                  exceptional cost management, saving
                  {formatCurrency(totalPlannedBudget - totalActualExpenses)}.
                </p>
              </div>
            </div>
          </div>

          {/* Expected Account Balance */}
          <div
            className={`${
              printMode
                ? 'border-l-4 border-black'
                : 'border-l-4 border-indigo-500'
            } pl-4`}>
            <h4
              className={`font-semibold mb-3 ${
                printMode ? 'text-black' : 'text-gray-800'
              }`}>
              Expected Account Balance
            </h4>
            <div
              className={`${
                printMode ? 'bg-white border border-black' : 'bg-indigo-50'
              } p-4 rounded-lg`}>
              <div className='flex justify-between items-center mb-3'>
                <span
                  className={`text-lg font-semibold ${
                    printMode ? 'text-black' : 'text-indigo-900'
                  }`}>
                  Amount in Account/Cash
                </span>
                <span
                  className={`text-3xl font-bold ${
                    printMode ? 'text-black' : 'text-indigo-700'
                  }`}>
                  {formatCurrency(netPosition)}
                </span>
              </div>
              <div className='space-y-2 text-sm'>
                <p className={printMode ? 'text-black' : 'text-indigo-800'}>
                  <strong>
                    This is the total amount that should be available across:
                  </strong>
                </p>
                <ul
                  className={`list-disc list-inside ml-2 ${
                    printMode ? 'text-black' : 'text-indigo-700'
                  }`}>
                  <li>Bank account balance</li>
                  <li>Cash on hand</li>
                  <li>Any other committee holdings</li>
                </ul>
                <p
                  className={`mt-3 pt-3 ${
                    printMode
                      ? 'text-black border-t border-black'
                      : 'text-indigo-800 border-t border-indigo-300'
                  }`}>
                  <strong>Calculation:</strong> Total Income (
                  {formatCurrency(totalIncomeCollected)}) - Total Expenses (
                  {formatCurrency(totalActualExpenses)}) ={' '}
                  {formatCurrency(netPosition)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights & Recommendations - CONTINUES IN NEXT PART */}
    </div>
  );
};
