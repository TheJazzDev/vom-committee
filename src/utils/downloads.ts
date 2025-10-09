import { formatCurrency, calculateExpenseTotal } from './calculations';

export const handleDownloadExcel = (
  incomeData: IncomeData,
  expenseDetails: ExpenseDetails,
  totals: {
    harvestCommitteeTotal: number;
    adultContributionsTotal: number;
    childrenChairPersonsTotal: number;
    childrenMembersTotal: number;
    childrenHarvestDayTotal: number;
    childrenOutstandingTotal: number;
    totalChildrenCollected: number;
    totalIncomeCollected: number;
    totalActualExpenses: number;
    netPosition: number;
  }
): void => {
  // Create CSV content with formulas structure
  let csvContent = 'C&S MOVT. VOM HARVEST COMMITTEE - FINANCIAL REPORT\n\n';

  csvContent += 'INCOME SUMMARY\n';
  csvContent += 'Category,Name,Amount\n';
  incomeData.harvestCommittee.forEach((item) => {
    csvContent += `Harvest Committee,${item.name},${item.amount}\n`;
  });
  csvContent += `Harvest Committee Subtotal,,${totals.harvestCommitteeTotal}\n\n`;

  incomeData.adultContributions.forEach((item) => {
    csvContent += `Adult Members,${item.name},${item.amount}\n`;
  });
  csvContent += `Adult Members Subtotal,,${totals.adultContributionsTotal}\n\n`;

  incomeData.childrenChairPersons.forEach((item) => {
    csvContent += `Children Chairpersons,${item.name},${item.amount}\n`;
  });
  csvContent += `Children Chairpersons Subtotal,,${totals.childrenChairPersonsTotal}\n\n`;

  incomeData.childrenMembers.forEach((item) => {
    csvContent += `Children Members,${item.name},${item.amount}\n`;
  });
  csvContent += `Children Members Subtotal,,${totals.childrenMembersTotal}\n\n`;

  csvContent += `Children Harvest Day Collection,,${totals.childrenHarvestDayTotal}\n\n`;

  incomeData.childrenOutstanding.forEach((item) => {
    csvContent += `Outstanding,${item.name},${item.amount}\n`;
  });
  csvContent += `Outstanding Subtotal,,${totals.childrenOutstandingTotal}\n\n`;

  csvContent += `TOTAL CHILDREN COLLECTED,,${totals.totalChildrenCollected}\n`;
  csvContent += `TOTAL INCOME COLLECTED,,${totals.totalIncomeCollected}\n\n\n`;

  csvContent += 'EXPENSE DETAILS\n';
  csvContent += 'Category,Item,Planned,Actual,Variance\n';

  Object.entries(expenseDetails).forEach(([category, items]) => {
    items.forEach((item: any) => {
      const variance = item.planned - item.actual;
      csvContent += `${category},${item.item},${item.planned},${item.actual},${variance}\n`;
    });
    const catTotal = calculateExpenseTotal(items);
    csvContent += `${category} TOTAL,,,${catTotal},\n\n`;
  });

  csvContent += `\nTOTAL EXPENSES,,,${totals.totalActualExpenses},\n\n`;

  csvContent += 'FINANCIAL ANALYSIS\n';
  csvContent += `Total Income Collected,,${totals.totalIncomeCollected}\n`;
  csvContent += `Total Expenses,,${totals.totalActualExpenses}\n`;
  csvContent += `Net Surplus,,${totals.netPosition}\n\n`;

  csvContent += 'CHILDREN HARVEST ANALYSIS\n';
  csvContent += `Children Income Collected,,${totals.totalChildrenCollected}\n`;
  csvContent += `Children Expenses,,${calculateExpenseTotal(
    expenseDetails.childrenHarvest
  )}\n`;
  // csvContent += `Shortfall (from Harvest Committee),,${totals.childrenShortfall}\n\n`;

  csvContent += 'EXPECTED ACCOUNT BALANCE\n';
  csvContent += `Amount that should be in account/cash,,${formatCurrency(
    totals.netPosition
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

export const handleDownloadText = (
  incomeData: IncomeData,
  expenseDetails: ExpenseDetails,
  totals: {
    totalIncomeCollected: number;
    totalActualExpenses: number;
    netPosition: number;
    harvestCommitteeTotal: number;
    adultContributionsTotal: number;
    childrenChairPersonsTotal: number;
    childrenMembersTotal: number;
    childrenHarvestDayTotal: number;
    childrenOutstandingTotal: number;
    totalChildrenCollected: number;
    familyHarvestTotal: number;
    childrenHarvestTotal: number;
    dedicationLogisticsTotal: number;
    totalPlannedBudget: number;
  }
): void => {
  const reportContent = `
C&S MOVT. VOM HARVEST COMMITTEE
COMPREHENSIVE FINANCIAL REPORT
Period: March - October 2025
Generated: ${new Date().toLocaleDateString()}

========================================
EXECUTIVE SUMMARY
========================================

Total Income Collected: ${formatCurrency(totals.totalIncomeCollected)}
Total Expenses: ${formatCurrency(totals.totalActualExpenses)}
Net Surplus: ${formatCurrency(totals.netPosition)}

Expected Account Balance: ${formatCurrency(totals.netPosition)}

========================================
INCOME BREAKDOWN
========================================

HARVEST COMMITTEE CONTRIBUTIONS: ${formatCurrency(totals.harvestCommitteeTotal)}
${incomeData.harvestCommittee
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

ADULT MEMBER CONTRIBUTIONS: ${formatCurrency(totals.adultContributionsTotal)}
${incomeData.adultContributions
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

CHILDREN HARVEST CONTRIBUTIONS:
Chairpersons: ${formatCurrency(totals.childrenChairPersonsTotal)}
${incomeData.childrenChairPersons
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

Members: ${formatCurrency(totals.childrenMembersTotal)}
${incomeData.childrenMembers
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

Harvest Day Collection: ${formatCurrency(totals.childrenHarvestDayTotal)}

Total Children Collected: ${formatCurrency(totals.totalChildrenCollected)}

Outstanding Contributions: ${formatCurrency(totals.childrenOutstandingTotal)}
${incomeData.childrenOutstanding
  .map((item) => `  ${item.name}: ${formatCurrency(item.amount)}`)
  .join('\n')}

TOTAL INCOME COLLECTED: ${formatCurrency(totals.totalIncomeCollected)}

========================================
EXPENSE BREAKDOWN
========================================

FAMILY HARVEST: ${formatCurrency(totals.familyHarvestTotal)}
${expenseDetails.familyHarvest
  .map(
    (item) =>
      `  ${item.item}: ${formatCurrency(
        item.actual
      )} (Planned: ${formatCurrency(item.planned)})`
  )
  .join('\n')}

CHILDREN HARVEST: ${formatCurrency(totals.childrenHarvestTotal)}
${expenseDetails.childrenHarvest
  .map(
    (item) =>
      `  ${item.item}: ${formatCurrency(
        item.actual
      )} (Planned: ${formatCurrency(item.planned)})`
  )
  .join('\n')}

DEDICATION/HARVEST LOGISTICS: ${formatCurrency(totals.dedicationLogisticsTotal)}
${expenseDetails.dedicationLogistics
  .filter((i) => i.actual > 0)
  .map((item) => `  ${item.item}: ${formatCurrency(item.actual)}`)
  .join('\n')}

TOTAL EXPENSES: ${formatCurrency(totals.totalActualExpenses)}

========================================
CHILDREN HARVEST ANALYSIS
========================================

Children Income Collected: ${formatCurrency(totals.totalChildrenCollected)}
  - Chairpersons: ${formatCurrency(totals.childrenChairPersonsTotal)}
  - Members: ${formatCurrency(totals.childrenMembersTotal)}
  - Harvest Day: ${formatCurrency(totals.childrenHarvestDayTotal)}

Children Expenses: ${formatCurrency(totals.childrenHarvestTotal)}

========================================
HARVEST COMMITTEE FUNDS UTILIZATION
========================================

Total Harvest Committee: ${formatCurrency(totals.harvestCommitteeTotal)}
  - Family Harvest: ${formatCurrency(totals.familyHarvestTotal)}
  - Dedication Logistics: ${formatCurrency(totals.dedicationLogisticsTotal)}

Remaining: ${formatCurrency(
    totals.harvestCommitteeTotal -
      totals.familyHarvestTotal -
      totals.dedicationLogisticsTotal
  )}

========================================
FINANCIAL POSITION
========================================

Total Income: ${formatCurrency(totals.totalIncomeCollected)}
Total Expenses: ${formatCurrency(totals.totalActualExpenses)}
Net Surplus: ${formatCurrency(totals.netPosition)}

Budget Approved: ${formatCurrency(totals.totalPlannedBudget)}
Budget Utilized: ${formatCurrency(totals.totalActualExpenses)} (${(
    (totals.totalActualExpenses / totals.totalPlannedBudget) *
    100
  ).toFixed(1)}%)
Budget Remaining: ${formatCurrency(
    totals.totalPlannedBudget - totals.totalActualExpenses
  )}

========================================
ACCOUNT RECONCILIATION
========================================

Expected Balance in Account/Cash: ${formatCurrency(totals.netPosition)}

This is the total amount that should be available across:
- Bank account balance
- Cash on hand
- Any other committee holdings

========================================
KEY INSIGHTS
========================================

1. STRONG FINANCIAL HEALTH
   - Generated ${formatCurrency(totals.netPosition)} surplus
   - ${((totals.netPosition / totals.totalIncomeCollected) * 100).toFixed(
     1
   )}% surplus rate on income

2. EXCELLENT BUDGET MANAGEMENT
   - Only ${(
     (totals.totalActualExpenses / totals.totalPlannedBudget) *
     100
   ).toFixed(1)}% of ₦5M budget utilized
   - Saved ${formatCurrency(
     totals.totalPlannedBudget - totals.totalActualExpenses
   )}

3. CHILDREN HARVEST SUCCESS
   - Children raised ${formatCurrency(totals.totalChildrenCollected)}
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
