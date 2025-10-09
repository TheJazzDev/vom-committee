'use client';

import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { usePrintMode } from '@/hooks/usePrintMode';
import { AnalysisCharts } from './Chart';
import { FinancialAnalysisCards } from './FinancialCards';
import { ChildrenHarvestAnalysis } from '../Harvest/Analysis';

export const Analysis = () => {
  const { printMode } = usePrintMode();

  const {
    totalIncomeCollected,
    totalActualExpenses,
    netPosition,
    childrenChairPersonsTotal,
    childrenMembersTotal,
    childrenHarvestDayTotal,
    totalChildrenCollected,
    childrenHarvestTotal,
    childrenOutstandingTotal,
    harvestCommitteeTotal,
    familyHarvestTotal,
    praiseNightTotal,
    dedicationLogisticsTotal,
    dedicationEntertainmentTotal,
    totalPlannedBudget,
    adultContributionsTotal,
  } = useFinancialCalculations(incomeData, expenseDetails);

  // Calculate children harvest figures
  const actualChildrenCollected =
    totalChildrenCollected - childrenOutstandingTotal;
  const hasShortfall = totalChildrenCollected < childrenHarvestTotal;
  const difference = totalChildrenCollected - childrenHarvestTotal;

  return (
    <div className='space-y-8'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            printMode ? 'text-black' : 'text-gray-900'
          }`}>
          Financial Analysis & Insights
        </h1>
        <p
          className={`text-lg mb-4 ${
            printMode ? 'text-black' : 'text-gray-600'
          }`}>
          In-depth financial analysis with visual charts, trends, and key
          performance indicators. Understand income vs. expenses ratios, budget
          variance, collection efficiency, and overall financial health of the
          harvest committee operations.
        </p>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${
            printMode ? 'text-black' : ''
          }`}>
          <div
            className={`p-4 rounded-lg text-center ${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}>
            <div className='text-2xl mb-1'>📊</div>
            <div
              className={`font-semibold text-sm ${
                printMode ? 'text-black' : 'text-blue-900'
              }`}>
              Visual Charts
            </div>
          </div>
          <div
            className={`p-4 rounded-lg text-center ${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-gradient-to-br from-green-50 to-green-100'
            }`}>
            <div className='text-2xl mb-1'>📈</div>
            <div
              className={`font-semibold text-sm ${
                printMode ? 'text-black' : 'text-green-900'
              }`}>
              Trend Analysis
            </div>
          </div>
          <div
            className={`p-4 rounded-lg text-center ${
              printMode
                ? 'bg-gray-100 border border-black'
                : 'bg-gradient-to-br from-purple-50 to-purple-100'
            }`}>
            <div className='text-2xl mb-1'>🎯</div>
            <div
              className={`font-semibold text-sm ${
                printMode ? 'text-black' : 'text-purple-900'
              }`}>
              KPIs & Metrics
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <AnalysisCharts
        totalIncomeCollected={totalIncomeCollected}
        totalActualExpenses={totalActualExpenses}
        netPosition={netPosition}
        harvestCommitteeTotal={harvestCommitteeTotal}
        childrenChairPersonsTotal={childrenChairPersonsTotal}
        childrenMembersTotal={childrenMembersTotal}
        childrenHarvestDayTotal={childrenHarvestDayTotal}
        familyHarvestTotal={familyHarvestTotal}
        childrenHarvestTotal={childrenHarvestTotal}
        childrenOutstandingTotal={childrenOutstandingTotal}
        adultContributionsTotal={adultContributionsTotal}
        praiseNightTotal={praiseNightTotal}
        dedicationLogisticsTotal={dedicationLogisticsTotal}
        dedicationEntertainmentTotal={dedicationEntertainmentTotal}
      />

      {/* Financial Analysis Cards */}
      <FinancialAnalysisCards
        totalIncomeCollected={totalIncomeCollected}
        totalActualExpenses={totalActualExpenses}
        netPosition={netPosition}
        totalPlannedBudget={totalPlannedBudget}
        harvestCommitteeTotal={harvestCommitteeTotal}
        familyHarvestTotal={familyHarvestTotal}
        dedicationLogisticsTotal={dedicationLogisticsTotal}
        dedicationEntertainmentTotal={dedicationEntertainmentTotal}
        childrenShortfall={difference}
        hasShortfall={hasShortfall}
      />

      {/* Children Harvest Analysis */}
      {/* <ChildrenHarvestAnalysis
        childrenChairPersonsTotal={childrenChairPersonsTotal}
        childrenMembersTotal={childrenMembersTotal}
        childrenHarvestDayTotal={childrenHarvestDayTotal}
        totalChildrenCollected={totalChildrenCollected}
        childrenOutstandingTotal={childrenOutstandingTotal}
        childrenHarvestTotal={childrenHarvestTotal}
        actualChildrenCollected={actualChildrenCollected}
        hasShortfall={hasShortfall}
        difference={difference}
      /> */}
    </div>
  );
};
