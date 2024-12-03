interface CalendarDay {
    currentMonth: boolean;
    date: Date;
    day: number;
    week: number;
    month: number;
    year: number;
    selected: boolean;
}

interface FinancialData {
    expenses: Expense[];
    income: Income[];
}

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    category?: string;
    type?: string;
}

interface Expense extends Transaction {
}

interface Income extends Transaction {
}

interface GroupedTransactions {
    [year: string]: {
        [month: string]: {
            [week: string]: {
                [day: string]: (Expense | Income)[];
            };
        };
    };
}


export { CalendarDay, FinancialData, Expense, Income, GroupedTransactions };