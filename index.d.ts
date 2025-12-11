interface IncomeItem {
  name: string;
  amount: number;
}

interface LoanItem {
  name: string;
  amount: number;
  note?: string;
}

interface ExpenseItem {
  item: string;
  planned: number;
  actual: number;
  note?: string;
  id?: string
}

interface IncomeData {
  harvestCommittee: IncomeItem[];
  sponsors: IncomeItem[];
  adultContributions: IncomeItem[];
  childrenChairPersons: IncomeItem[];
  childrenMembers: IncomeItem[];
  childrenHarvestDay: number;
  dedicationHarvestDay: IncomeItem[];
  childrenOutstanding: IncomeItem[];
  loans: LoanItem[];
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
