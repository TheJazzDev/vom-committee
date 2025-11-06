'use client';

import { formatCurrency, calculateExpenseTotal } from '@/utils/calculations';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { usePrintMode } from '@/context/PrintModeContext';
import { Fragment } from 'react';

export const Expenses = () => {
  const { printMode } = usePrintMode();

  const { totalActualExpenses, totalPlannedBudget } = useFinancialCalculations(
    incomeData,
    expenseDetails
  );

  const groupItemsById = (items: ExpenseItem[]) => {
    const groups: { [key: string]: ExpenseItem[] } = {};
    const ungrouped: ExpenseItem[] = [];

    items.forEach((item) => {
      if (item.id && item.id.trim() !== '') {
        if (!groups[item.id]) {
          groups[item.id] = [];
        }
        groups[item.id].push(item);
      } else {
        ungrouped.push(item);
      }
    });

    return { groups, ungrouped };
  };

  // Get background color for note groups
  const getItemsGroupColor = (id: string) => {
    if (printMode) return 'bg-gray-100';

    const noteColors: { [key: string]: string } = {
      packs: 'bg-blue-50',
      donations: 'bg-green-50',
      'Bank withdrawal': 'bg-purple-50',
      'Cash payment': 'bg-yellow-50',
    };

    return noteColors[id] || 'bg-orange-50';
  };

  return (
    <div className='space-y-6'>
      <div className='mb-8'>
        <h1
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            printMode ? 'text-black' : 'text-gray-900'
          }`}>
          Expenses & Budget Allocation
        </h1>
        <p
          className={`text-lg mb-4 ${
            printMode ? 'text-black' : 'text-gray-600'
          }`}>
          Complete overview of all expenditures across different program
          categories. Compare budgeted amounts against actual spending and
          monitor budget utilization across family harvest, children's programs,
          praise night, and dedication ceremonies.
        </p>
        <div
          className={`px-4 py-3 rounded-lg ${
            printMode
              ? 'bg-gray-100 border border-black'
              : 'bg-amber-50 border-l-4 border-amber-500'
          }`}>
          <p
            className={`text-sm ${
              printMode ? 'text-black' : 'text-amber-800'
            }`}>
            <strong>💡 Note:</strong> All expenses are tracked against the
            approved budget. Variance analysis helps identify over/under
            spending in each category.
          </p>
        </div>
      </div>

      {Object.entries(expenseDetails).map(([category, items]) => {
        const categoryTotal = calculateExpenseTotal(items);
        const categoryName = category.replace(/([A-Z])/g, ' $1').trim();
        const { groups, ungrouped } = groupItemsById(items);

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
                    printMode ? 'text-black' : 'text-red-600'
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
                  {/* Render grouped items */}
                  {Object.entries(groups).map(([id, groupItems]) => {
                    const groupTotal = calculateExpenseTotal(groupItems);
                    const groupPlannedTotal = groupItems.reduce(
                      (sum, i) => sum + i.planned,
                      0
                    );

                    return (
                      <Fragment key={id}>
                        {/* Group header */}
                        <tr
                          className={`${getItemsGroupColor(id)} font-semibold`}>
                          <td
                            colSpan={5}
                            className={`px-4 py-2 text-sm capitalize ${
                              printMode
                                ? 'border-t-2 border-b border-black'
                                : ''
                            }`}>
                            📦 {id} - Group Total: {formatCurrency(groupTotal)}
                          </td>
                        </tr>

                        {/* Group items */}
                        {groupItems.map((item, idx) => {
                          const variance = item.planned - item.actual;
                          return (
                            <tr
                              key={`${id}-${idx}`}
                              className={`${getItemsGroupColor(id)} ${
                                printMode
                                  ? 'border-b border-black'
                                  : 'hover:bg-opacity-70'
                              } ${
                                item.actual === 0 &&
                                item.planned >= 0 &&
                                !printMode
                                  ? 'opacity-50'
                                  : ''
                              }`}>
                              <td
                                className={`px-4 py-3 text-sm pl-16 ${
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
                                {item.actual > 0
                                  ? formatCurrency(item.actual)
                                  : '-'}
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
                                {item.note}
                              </td>
                            </tr>
                          );
                        })}

                        {/* Group subtotal row */}
                        <tr
                          className={`${getItemsGroupColor(
                            id
                          )} font-bold border-t`}>
                          <td
                            className={`px-4 py-2 text-sm pl-16 capitalize ${
                              printMode ? 'border-r border-black' : ''
                            }`}>
                            {id} Subtotal
                          </td>
                          <td
                            className={`px-4 py-2 text-sm text-right ${
                              printMode ? 'border-r border-black' : ''
                            }`}>
                            {formatCurrency(groupPlannedTotal)}
                          </td>
                          <td
                            className={`px-4 py-2 text-sm text-right ${
                              printMode
                                ? 'border-r border-black text-black'
                                : 'text-blue-600'
                            }`}>
                            {formatCurrency(groupTotal)}
                          </td>
                          <td
                            className={`px-4 py-2 text-sm text-right ${
                              printMode
                                ? 'border-r border-black text-black'
                                : 'text-green-600'
                            }`}>
                            {formatCurrency(groupPlannedTotal - groupTotal)}
                          </td>
                          <td
                            className={
                              printMode ? 'border-b-2 border-black' : ''
                            }></td>
                        </tr>
                      </Fragment>
                    );
                  })}

                  {/* Render ungrouped items */}
                  {ungrouped.map((item, idx) => {
                    const variance = item.planned - item.actual;
                    return (
                      <tr
                        key={`ungrouped-${idx}`}
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
                          className={`px-4 py-3 text-sm italic max-w-64 ${
                            printMode ? 'text-black' : 'text-gray-600'
                          }`}>
                          {item.note || ''}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Category total */}
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
            <p className={`text-sm ${printMode ? 'text-black' : 'opacity-90'}`}>
              Total Budget
            </p>
            <p
              className={`text-xl font-bold ${
                printMode ? 'text-black' : 'text-green-400'
              }`}>
              {formatCurrency(totalPlannedBudget)}
            </p>
          </div>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p className={`text-sm ${printMode ? 'text-black' : 'opacity-90'}`}>
              Total Spent
            </p>
            <p
              className={`text-xl font-bold ${
                printMode ? 'text-black' : 'text-red-400'
              }`}>
              {formatCurrency(totalActualExpenses)}
            </p>
          </div>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p className={`text-sm ${printMode ? 'text-black' : 'opacity-90'}`}>
              Savings
            </p>
            <p
              className={`text-xl font-bold ${
                printMode ? 'text-black' : 'text-emerald-400'
              }`}>
              {formatCurrency(totalPlannedBudget - totalActualExpenses)}
            </p>
          </div>
          <div
            className={
              printMode
                ? 'bg-white border border-black rounded p-3'
                : 'bg-white bg-opacity-20 rounded p-3'
            }>
            <p className={`text-sm ${printMode ? 'text-black' : 'opacity-90'}`}>
              Utilization
            </p>
            <p
              className={`text-xl font-bold ${
                printMode ? 'text-black' : 'text-blue-400'
              }`}>
              {((totalActualExpenses / totalPlannedBudget) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Reconciliation Legend */}
      {!printMode && (
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h3 className='text-lg font-bold text-gray-800 mb-4'>
            📋 Reconciliation Legend
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 bg-blue-50 border border-blue-200 rounded'></div>
              <span className='text-sm'>Sango trip</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 bg-green-50 border border-green-200 rounded'></div>
              <span className='text-sm'>Ile Epo</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 bg-purple-50 border border-purple-200 rounded'></div>
              <span className='text-sm'>Bank withdrawal</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 bg-yellow-50 border border-yellow-200 rounded'></div>
              <span className='text-sm'>Cash payment</span>
            </div>
          </div>
          <p className='text-sm text-gray-600 mt-4'>
            💡 <strong>Tip:</strong> Grouped items with the same note are
            highlighted with matching colors. Use these groups to reconcile with
            your bank statement transactions.
          </p>
        </div>
      )}
    </div>
  );
};
