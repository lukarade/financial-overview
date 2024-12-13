interface CalendarDayType {
    currentMonth: boolean;
    date: Date;
    day: number;
    week: number;
    month: number;
    year: number;
    selected: boolean;
    data?: any; //TODO: Define the type
}

interface FinancialData {
    expenses: Expense[];
    income: Income[];
}

interface TransactionType {
    id: string;
    title: string;
    amount: number;
    date: string;
    category?: string;
    type?: string;
}

interface Expense extends TransactionType {
}

interface Income extends TransactionType {
}
interface DayTransactions {
    transactions: (Expense | Income)[];
    totalExpense: number;
    totalIncome: number;
}

interface WeekTransactions {
    day: DayTransactions;
    totalExpense: number;
    totalIncome: number;
}

interface MonthTransactions {
    week: WeekTransactions;
    totalExpense: number;
    totalIncome: number;
}

interface YearTransactions {
    month: MonthTransactions;
    totalExpense: number;
    totalIncome: number;
}

interface GroupedTransactions {
    year: YearTransactions;
}


type OverviewData = {
    months: {
        year: string,
        month: string,
        totalExpense: number,
        totalIncome: number,
    }[];
}


export { CalendarDayType, FinancialData, TransactionType, Expense, Income, GroupedTransactions, DayTransactions, WeekTransactions, MonthTransactions, YearTransactions, OverviewData };