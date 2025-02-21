interface CalendarDayType {
    currentMonth: boolean;
    date: Date;
    day: number;
    week: number;
    month: number;
    year: number;
    selected: boolean;
    data?: TransactionType[] | null;
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

// TODO: In the future Period could be of variable length that can be changed by the user
enum Period {
    TOTAL = "total",
    YEAR = "year",
    MONTH = "month",
    WEEK = "week",
    DAY = "day"
}

enum ChartType {
    BAR = "bar",
    LINE = "line",
    PIE = "pie"
}

// Contains all transactions for a specific period as well as the total income and expenses for that period
type TransactionGroup<T = TransactionType[]> = {
    period: Period;
    totalExpense: number;
    totalIncome: number;
    transactions: T;
}

interface DayTransactions extends TransactionGroup<TransactionType[]> {
    transactions: TransactionType[];
}

interface WeekTransactions extends TransactionGroup<{ [day: string]: DayTransactions }> {
    transactions: Record<string, DayTransactions>;
}

interface MonthTransactions extends TransactionGroup<{ [week: string]: WeekTransactions }> {
    transactions: Record<string, WeekTransactions>;
}

interface YearTransactions extends TransactionGroup<{ [month: string]: MonthTransactions }> {
    transactions: Record<string, MonthTransactions>;
}

interface GroupedTransactions {
    transactions: Record<string, YearTransactions>;
}

type OverviewOptionsType = {
    chartType: ChartType;
    overviewType: Period;
    selectedYear?: string;
    selectedMonth?: string;
    selectedWeek?: string;
    selectedDay?: string;
}


export {
    CalendarDayType,
    FinancialData,
    TransactionType,
    Expense,
    Income,
    Period,
    ChartType,
    TransactionGroup,
    GroupedTransactions,
    DayTransactions,
    WeekTransactions,
    MonthTransactions,
    YearTransactions,
    OverviewOptionsType
};