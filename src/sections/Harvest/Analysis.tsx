'use client';

import { formatCurrency } from '@/utils/calculations';
import { usePrintMode } from '@/context/PrintModeContext';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';

interface ChildrenHarvestAnalysisProps {
  childrenChairPersonsTotal: number;
  childrenMembersTotal: number;
  childrenHarvestDayTotal: number;
  totalChildrenCollected: number;
  childrenOutstandingTotal: number;
  childrenHarvestTotal: number;
  actualChildrenCollected: number;
}

export const ChildrenHarvestAnalysis: React.FC<
  ChildrenHarvestAnalysisProps
> = ({
  childrenChairPersonsTotal,
  childrenMembersTotal,
  childrenHarvestDayTotal,
  totalChildrenCollected,
  childrenOutstandingTotal,
  childrenHarvestTotal,
  actualChildrenCollected,
}) => {
  const { printMode } = usePrintMode();

  return (
    <div>
      <div className='space-y-6'>
        {/* Income Sources Section */}
        <div
          className={`${
            printMode ? 'bg-gray-100 border border-black' : 'bg-blue-50'
          } p-5 rounded-lg`}>
          <h4
            className={`font-bold mb-4 text-lg ${
              printMode ? 'text-black' : 'text-blue-900'
            }`}>
            Income Sources
          </h4>

          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <div>
                <span
                  className={`font-medium ${
                    printMode ? 'text-black' : 'text-blue-700'
                  }`}>
                  Chairpersons
                </span>
                <span
                  className={`text-xs ml-2 ${
                    printMode ? 'text-black' : 'text-blue-600'
                  }`}>
                  ({incomeData.childrenChairPersons.length} contributors)
                </span>
              </div>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                {formatCurrency(childrenChairPersonsTotal)}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <div>
                <span
                  className={`font-medium ${
                    printMode ? 'text-black' : 'text-blue-700'
                  }`}>
                  Members
                </span>
                <span
                  className={`text-xs ml-2 ${
                    printMode ? 'text-black' : 'text-blue-600'
                  }`}>
                  ({incomeData.childrenMembers.length} contributors)
                </span>
              </div>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                {formatCurrency(childrenMembersTotal)}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span
                className={`font-medium ${
                  printMode ? 'text-black' : 'text-blue-700'
                }`}>
                Harvest Day Collection
              </span>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                {formatCurrency(childrenHarvestDayTotal)}
              </span>
            </div>

            <div
              className={`flex justify-between items-center pt-3 mt-3 ${
                printMode
                  ? 'border-t-2 border-black'
                  : 'border-t-2 border-blue-300'
              }`}>
              <span
                className={`font-bold ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                Collected to Date
              </span>
              <span
                className={`text-lg font-bold ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                {formatCurrency(actualChildrenCollected)}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span
                className={`font-medium ${
                  printMode ? 'text-black' : 'text-yellow-700'
                }`}>
                Outstanding (Not yet collected)
              </span>
              <span
                className={`font-semibold ${
                  printMode ? 'text-black' : 'text-yellow-700'
                }`}>
                {formatCurrency(childrenOutstandingTotal)}
              </span>
            </div>

            <div
              className={`flex justify-between items-center pt-3 mt-3 ${
                printMode
                  ? 'border-t-2 border-black'
                  : 'border-t-2 border-blue-400'
              }`}>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                Total Expected Income
              </span>
              <span
                className={`text-xl font-bold ${
                  printMode ? 'text-black' : 'text-blue-900'
                }`}>
                {formatCurrency(totalChildrenCollected)}
              </span>
            </div>
          </div>
        </div>

        {/* Expenses Breakdown Section */}
        <div
          className={`${
            printMode ? 'bg-gray-100 border border-black' : 'bg-red-50'
          } p-5 rounded-lg`}>
          <h4
            className={`font-bold mb-4 text-lg ${
              printMode ? 'text-black' : 'text-red-900'
            }`}>
            Expenses Breakdown
          </h4>

          <div className='space-y-2'>
            {expenseDetails.childrenHarvest
              .filter((i) => i.actual > 0)
              .map((item, idx) => (
                <div key={idx} className='flex justify-between items-center'>
                  <span
                    className={`text-sm ${
                      printMode ? 'text-black' : 'text-red-700'
                    }`}>
                    {item.item}
                  </span>
                  <span
                    className={`font-semibold ${
                      printMode ? 'text-black' : 'text-red-800'
                    }`}>
                    {formatCurrency(item.actual)}
                  </span>
                </div>
              ))}

            <div
              className={`flex justify-between items-center pt-3 mt-3 ${
                printMode
                  ? 'border-t-2 border-black'
                  : 'border-t-2 border-red-300'
              }`}>
              <span
                className={`font-bold text-lg ${
                  printMode ? 'text-black' : 'text-red-900'
                }`}>
                Total Children Expenses
              </span>
              <span
                className={`text-xl font-bold ${
                  printMode ? 'text-black' : 'text-red-900'
                }`}>
                {formatCurrency(childrenHarvestTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
