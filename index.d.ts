interface IncomeItem {
  name: string;
  amount: number;
}

interface ExpenseItem {
  item: string;
  planned: number;
  actual: number;
  note?: string;
}

interface IncomeData {
  harvestCommittee: IncomeItem[];
  adultContributions: IncomeItem[];
  childrenChairPersons: IncomeItem[];
  childrenMembers: IncomeItem[];
  childrenHarvestDay: number;
  childrenOutstanding: IncomeItem[];
}

interface ExpenseDetails {
  familyHarvest: ExpenseItem[];
  childrenHarvest: ExpenseItem[];
  praiseNight: ExpenseItem[];
  dedicationLogistics: ExpenseItem[];
  dedicationEntertainment: ExpenseItem[];
}

interface BudgetData {
  familyHarvest: { planned: number; actual: number };
  childrenHarvest: { planned: number; actual: number };
  praiseNight: { planned: number; actual: number };
  dedicationLogistics: { planned: number; actual: number };
  dedicationEntertainment: { planned: number; actual: number };
  miscellaneous: { planned: number; actual: number };
}

interface ChartDataItem {
  name: string;
  value?: number;
  color?: string;
  planned?: number;
  actual?: number;
  percent?: number;
  [key: string]: string | number;
}
