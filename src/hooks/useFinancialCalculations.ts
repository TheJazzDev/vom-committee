import { useMemo } from 'react';
import { calculateTotal, calculateExpenseTotal } from '@/utils/calculations';

export const useFinancialCalculations = (
  incomeData: IncomeData,
  expenseDetails: ExpenseDetails
) => {
  return useMemo(() => {
    // Income calculations
    const harvestCommitteeTotal = calculateTotal(incomeData.harvestCommittee);
    const sponsorsTotal = calculateTotal(incomeData.sponsors);
    const adultContributionsTotal = calculateTotal(
      incomeData.adultContributions
    );
    const childrenChairPersonsTotal = calculateTotal(
      incomeData.childrenChairPersons
    );
    const childrenMembersTotal = calculateTotal(incomeData.childrenMembers);
    const childrenOutstandingTotal = calculateTotal(
      incomeData.childrenOutstanding
    );
    const childrenHarvestDayTotal = incomeData.childrenHarvestDay;

    const totalChildrenCollected =
      childrenChairPersonsTotal +
      childrenMembersTotal +
      childrenHarvestDayTotal +
      childrenOutstandingTotal;
    // const totalChildrenExpected =
    //   totalChildrenCollected + childrenOutstandingTotal;

    const totalIncomeCollected =
      harvestCommitteeTotal + sponsorsTotal + adultContributionsTotal + totalChildrenCollected;

    // Expense calculations
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

    // Analysis calculations
    const netPosition = totalIncomeCollected - totalActualExpenses;
    const totalPlannedBudget = 5000000;

    const budgetData: BudgetData = {
      familyHarvest: { planned: 70000, actual: familyHarvestTotal },
      childrenHarvest: { planned: 400000, actual: childrenHarvestTotal },
      praiseNight: { planned: 80000, actual: praiseNightTotal },
      dedicationLogistics: {
        planned: 1200000,
        actual: dedicationLogisticsTotal,
      },
      dedicationEntertainment: {
        planned: 3000000,
        actual: dedicationEntertainmentTotal,
      },
      miscellaneous: { planned: 250000, actual: 0 },
    };

    return {
      // Income totals
      harvestCommitteeTotal,
      sponsorsTotal,
      adultContributionsTotal,
      childrenChairPersonsTotal,
      childrenMembersTotal,
      childrenHarvestDayTotal,
      childrenOutstandingTotal,
      totalChildrenCollected,
      // totalChildrenExpected,
      totalIncomeCollected,

      // Expense totals
      familyHarvestTotal,
      childrenHarvestTotal,
      praiseNightTotal,
      dedicationLogisticsTotal,
      dedicationEntertainmentTotal,
      totalActualExpenses,

      // Analysis
      netPosition,
      totalPlannedBudget,
      budgetData,
    };
  }, [incomeData, expenseDetails]);
};
