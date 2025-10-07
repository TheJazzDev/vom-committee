'use client';

import React, { useState } from 'react';
import { incomeData } from '@/constants/incomeData';
import { expenseDetails } from '@/constants/expensesDetails';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { handleDownloadExcel, handleDownloadText } from '@/utils/downloads';
import { Header } from '@/components/Header';
import { ExpectedBalanceCard } from '@/components/ExpectedBalanceCard';
import { TabNavigation } from '@/components/TabNavigation';
import { SummaryTab } from '@/components/SummaryTab';
import { IncomeTab } from '@/components/IncomeTab';
import { ExpensesTab } from '@/components/ExpensesTab';
import { AnalysisTab } from '@/components/AnalysisTab';
import { ReportTab } from '@/components/ReportTab';

const Report: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [printMode, setPrintMode] = useState<boolean>(false);

  // Get all calculated values from custom hook
  const calculations = useFinancialCalculations(incomeData, expenseDetails);

  const {
    harvestCommitteeTotal,
    adultContributionsTotal,
    childrenChairPersonsTotal,
    childrenMembersTotal,
    childrenHarvestDayTotal,
    childrenOutstandingTotal,
    totalChildrenCollected,
    totalChildrenExpected,
    totalIncomeCollected,
    familyHarvestTotal,
    childrenHarvestTotal,
    praiseNightTotal,
    dedicationLogisticsTotal,
    dedicationEntertainmentTotal,
    totalActualExpenses,
    childrenShortfall,
    netPosition,
    totalPlannedBudget,
    budgetData,
  } = calculations;

  const handleDownloadExcelWrapper = () => {
    handleDownloadExcel(incomeData, expenseDetails, {
      harvestCommitteeTotal,
      adultContributionsTotal,
      childrenChairPersonsTotal,
      childrenMembersTotal,
      childrenHarvestDayTotal,
      childrenOutstandingTotal,
      totalChildrenCollected,
      totalIncomeCollected,
      totalActualExpenses,
      netPosition,
      childrenShortfall,
    });
  };

  const handleDownloadTextWrapper = () => {
    handleDownloadText(incomeData, expenseDetails, {
      totalIncomeCollected,
      totalActualExpenses,
      netPosition,
      harvestCommitteeTotal,
      adultContributionsTotal,
      childrenChairPersonsTotal,
      childrenMembersTotal,
      childrenHarvestDayTotal,
      childrenOutstandingTotal,
      totalChildrenCollected,
      familyHarvestTotal,
      childrenHarvestTotal,
      dedicationLogisticsTotal,
      childrenShortfall,
      totalPlannedBudget,
    });
  };

  return (
    <div
      className={`min-h-screen ${
        printMode ? 'bg-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      } p-4 lg:p-8`}>
      <style>
        {printMode
          ? `
          * {
            color: black !important;
            background: white !important;
            border-color: black !important;
          }
          .text-green-400, .text-red-400, .text-blue-400, .text-emerald-400,
          .text-green-600, .text-red-600, .text-blue-600, .text-purple-600,
          .text-orange-600, .text-yellow-600, .text-indigo-600,
          .text-orange-700, .text-orange-800, .text-orange-900,
          .text-yellow-700, .text-yellow-900, .text-blue-700, .text-blue-900,
          .text-green-700, .text-green-800, .text-green-900,
          .text-red-700, .text-red-800, .text-red-900,
          .text-indigo-700, .text-indigo-800, .text-indigo-900,
          .text-purple-800, .text-purple-900,
          .bg-gradient-to-br, .bg-gradient-to-r,
          .bg-green-50, .bg-red-50, .bg-blue-50, .bg-yellow-50,
          .bg-orange-50, .bg-purple-50, .bg-indigo-50,
          .bg-gray-50, .bg-gray-100 {
            color: black !important;
            background: white !important;
          }
          @media print {
            button { display: none !important; }
            .no-print { display: none !important; }
          }
        `
          : ''}
      </style>

      <div className='max-w-7xl mx-auto'>
        {(!printMode || activeTab === 'summary') && (
          <>
            <Header
              // activeTab={activeTab}
              printMode={printMode}
              onTogglePrintMode={() => setPrintMode(!printMode)}
              onDownloadExcel={handleDownloadExcelWrapper}
              onDownloadText={handleDownloadTextWrapper}
            />

            <ExpectedBalanceCard
              netPosition={netPosition}
              totalIncomeCollected={totalIncomeCollected}
              totalActualExpenses={totalActualExpenses}
              printMode={printMode}
            />
          </>
        )}

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          printMode={printMode}
        />

        {/* Tab Content */}
        {activeTab === 'summary' && (
          <SummaryTab
            totalIncomeCollected={totalIncomeCollected}
            totalActualExpenses={totalActualExpenses}
            netPosition={netPosition}
            childrenOutstandingTotal={childrenOutstandingTotal}
            totalChildrenCollected={totalChildrenCollected}
            childrenHarvestTotal={childrenHarvestTotal}
            childrenShortfall={childrenShortfall}
            harvestCommitteeTotal={harvestCommitteeTotal}
            adultContributionsTotal={adultContributionsTotal}
            childrenChairPersonsTotal={childrenChairPersonsTotal}
            childrenMembersTotal={childrenMembersTotal}
            childrenHarvestDayTotal={childrenHarvestDayTotal}
            familyHarvestTotal={familyHarvestTotal}
            dedicationLogisticsTotal={dedicationLogisticsTotal}
            praiseNightTotal={praiseNightTotal}
            dedicationEntertainmentTotal={dedicationEntertainmentTotal}
            totalPlannedBudget={totalPlannedBudget}
            printMode={printMode}
          />
        )}

        {activeTab === 'income' && (
          <IncomeTab
            incomeData={incomeData}
            harvestCommitteeTotal={harvestCommitteeTotal}
            adultContributionsTotal={adultContributionsTotal}
            childrenChairPersonsTotal={childrenChairPersonsTotal}
            childrenMembersTotal={childrenMembersTotal}
            childrenHarvestDayTotal={childrenHarvestDayTotal}
            childrenOutstandingTotal={childrenOutstandingTotal}
            totalChildrenCollected={totalChildrenCollected}
            totalChildrenExpected={totalChildrenExpected}
            printMode={printMode}
          />
        )}

        {activeTab === 'expenses' && (
          <ExpensesTab
            expenseDetails={expenseDetails}
            totalActualExpenses={totalActualExpenses}
            totalPlannedBudget={totalPlannedBudget}
            printMode={printMode}
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisTab
            totalIncomeCollected={totalIncomeCollected}
            totalActualExpenses={totalActualExpenses}
            netPosition={netPosition}
            childrenChairPersonsTotal={childrenChairPersonsTotal}
            childrenMembersTotal={childrenMembersTotal}
            childrenHarvestDayTotal={childrenHarvestDayTotal}
            totalChildrenCollected={totalChildrenCollected}
            childrenHarvestTotal={childrenHarvestTotal}
            childrenShortfall={childrenShortfall}
            harvestCommitteeTotal={harvestCommitteeTotal}
            familyHarvestTotal={familyHarvestTotal}
            dedicationLogisticsTotal={dedicationLogisticsTotal}
            totalPlannedBudget={totalPlannedBudget}
            expenseDetails={expenseDetails}
            incomeData={incomeData}
            budgetData={budgetData}
            printMode={printMode}
          />
        )}

        {activeTab === 'report' && (
          <ReportTab
            totalIncomeCollected={totalIncomeCollected}
            totalActualExpenses={totalActualExpenses}
            netPosition={netPosition}
            harvestCommitteeTotal={harvestCommitteeTotal}
            adultContributionsTotal={adultContributionsTotal}
            totalChildrenCollected={totalChildrenCollected}
            familyHarvestTotal={familyHarvestTotal}
            childrenHarvestTotal={childrenHarvestTotal}
            dedicationLogisticsTotal={dedicationLogisticsTotal}
            totalPlannedBudget={totalPlannedBudget}
            printMode={printMode}
          />
        )}
      </div>
    </div>
  );
};

export default Report;
