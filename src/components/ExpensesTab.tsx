import React from 'react';
import { formatCurrency, calculateExpenseTotal } from '@/utils/calculations';

interface ExpensesTabProps {
  expenseDetails: ExpenseDetails;
  totalActualExpenses: number;
  totalPlannedBudget: number;
  printMode: boolean;
}

export const ExpensesTab: React.FC<ExpensesTabProps> = ({
  expenseDetails,
  totalActualExpenses,
  totalPlannedBudget,
  printMode,
}) => {
  return (
    <div className='space-y-6'>
      {printMode && (
        <h4 className='text-3xl font-semibold text-center py-6'>Expenses</h4>
      )}
      {Object.entries(expenseDetails).map(([category, items]) => {
        const categoryTotal = calculateExpenseTotal(items);
        const categoryName = category.replace(/([A-Z])/g, ' $1').trim();

        return (
          <div
            key={category}
            className={`${
              printMode ? 'bg-white border border-black' : 'bg-white'
            } rounded-lg shadow-lg p-6`}>
            <div className='flex justify-between items-center mb-4 flex-wrap gap-4'>
              <h3
                className={`text-xl font-bold capitalize ${
                  printMode ? 'text-black' : 'text-gray-800'
                }`}>
                {categoryName}
              </h3>
              <div className='text-right'>
                <p
                  className={`text-sm ${
                    printMode ? 'text-black' : 'text-gray-600'
                  }`}>
                  Total Spent
                </p>
                <p
                  className={`text-2xl font-bold ${
                    printMode ? 'text-black' : 'text-blue-600'
                  }`}>
                  {formatCurrency(categoryTotal)}
                </p>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead
                  className={
                    printMode
                      ? 'bg-white border-b-2 border-black'
                      : 'bg-gray-50'
                  }>
                  <tr>
                    <th
                      className={`px-4 py-3 text-left text-sm font-semibold ${
                        printMode
                          ? 'text-black border-r border-black'
                          : 'text-gray-700'
                      }`}>
                      Item
                    </th>
                    <th
                      className={`px-4 py-3 text-right text-sm font-semibold ${
                        printMode
                          ? 'text-black border-r border-black'
                          : 'text-gray-700'
                      }`}>
                      Planned
                    </th>
                    <th
                      className={`px-4 py-3 text-right text-sm font-semibold ${
                        printMode
                          ? 'text-black border-r border-black'
                          : 'text-gray-700'
                      }`}>
                      Actual
                    </th>
                    <th
                      className={`px-4 py-3 text-right text-sm font-semibold ${
                        printMode
                          ? 'text-black border-r border-black'
                          : 'text-gray-700'
                      }`}>
                      Variance
                    </th>
                    <th
                      className={`px-4 py-3 text-left text-sm font-semibold ${
                        printMode ? 'text-black' : 'text-gray-700'
                      }`}>
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody className={printMode ? '' : 'divide-y divide-gray-200'}>
                  {items.map((item: ExpenseItem, idx: number) => {
                    const variance: number = item.planned - item.actual;
                    return (
                      <tr
                        key={idx}
                        className={`${
                          printMode
                            ? 'border-b border-black'
                            : 'hover:bg-gray-50'
                        } ${
                          item.actual === 0 && item.planned > 0 && !printMode
                            ? 'opacity-50'
                            : ''
                        }`}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            printMode
                              ? 'text-black border-r border-black'
                              : 'text-gray-800'
                          }`}>
                          {item.item}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm text-right ${
                            printMode ? 'border-r border-black' : ''
                          }`}>
                          {formatCurrency(item.planned)}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm text-right font-semibold ${
                            printMode ? 'border-r border-black' : ''
                          }`}>
                          {item.actual > 0 ? formatCurrency(item.actual) : '-'}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm text-right font-semibold ${
                            printMode ? 'border-r border-black' : ''
                          } ${
                            !printMode && variance > 0
                              ? 'text-green-600'
                              : !printMode && variance < 0
                              ? 'text-red-600'
                              : printMode
                              ? 'text-black'
                              : 'text-gray-600'
                          }`}>
                          {variance !== 0
                            ? formatCurrency(Math.abs(variance))
                            : '-'}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm italic ${
                            printMode ? 'text-black' : 'text-gray-600'
                          }`}>
                          {item.note || ''}
                        </td>
                      </tr>
                    );
                  })}
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
                      Category Total
                    </td>
                    <td
                      className={`px-4 py-3 text-sm text-right ${
                        printMode ? 'border-r border-black' : ''
                      }`}>
                      {formatCurrency(
                        items.reduce(
                          (sum: number, i: ExpenseItem) => sum + i.planned,
                          0
                        )
                      )}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm text-right ${
                        printMode
                          ? 'text-black border-r border-black'
                          : 'text-blue-600'
                      }`}>
                      {formatCurrency(categoryTotal)}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm text-right ${
                        printMode
                          ? 'text-black border-r border-black'
                          : 'text-green-600'
                      }`}>
                      {formatCurrency(
                        items.reduce(
                          (sum: number, i: ExpenseItem) => sum + i.planned,
                          0
                        ) - categoryTotal
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

      {/* Total Expenses Summary */}
      <div
        className={`${
          printMode
            ? 'bg-white border-2 border-black'
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        } rounded-lg shadow-lg p-6 ${printMode ? 'text-black' : 'text-white'}`}>
        <h3 className='text-2xl font-bold mb-4'>Total Expenses Summary</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p
              className={`text-sm text-black ${
                printMode ? 'text-black' : 'opacity-90'
              }`}>
              Total Budget
            </p>
            <p className='text-xl font-bold text-green-400'>
              {formatCurrency(totalPlannedBudget)}
            </p>
          </div>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p
              className={`text-sm text-black ${
                printMode ? 'text-black' : 'opacity-90'
              }`}>
              Total Spent
            </p>
            <p className='text-xl font-bold text-red-400'>
              {formatCurrency(totalActualExpenses)}
            </p>
          </div>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p
              className={`text-sm text-black ${
                printMode ? 'text-black' : 'opacity-90'
              }`}>
              Savings
            </p>
            <p className='text-xl font-bold text-emerald-400'>
              {formatCurrency(totalPlannedBudget - totalActualExpenses)}
            </p>
          </div>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p
              className={`text-sm text-black ${
                printMode ? 'text-black' : 'opacity-90'
              }`}>
              Utilization
            </p>
            <p className='text-xl font-bold text-blue-400'>
              {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
