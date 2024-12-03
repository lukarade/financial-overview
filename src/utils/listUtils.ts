import { GroupedTransactions, FinancialData, Expense, Income } from "../types";

function groupTransactionsByDate(data: FinancialData): GroupedTransactions {
    const grouped: GroupedTransactions | any = {};

    const addTransaction = (transaction: Expense | Income) => {
        const date = new Date(transaction.date);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const week = getWeekNumber(date).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        if (!grouped[year]) grouped[year] = { totalExpense: 0, totalIncome: 0 };
        if (!grouped[year][month]) grouped[year][month] = { totalExpense: 0, totalIncome: 0 };
        if (!grouped[year][month][week]) grouped[year][month][week] = { totalExpense: 0, totalIncome: 0 };
        if (!grouped[year][month][week][day]) grouped[year][month][week][day] = { transactions: [], totalExpense: 0, totalIncome: 0 };

        grouped[year][month][week][day].transactions.push(transaction);

        if (transaction.amount < 0) {
            grouped[year].totalExpense += transaction.amount;
            grouped[year][month].totalExpense += transaction.amount;
            grouped[year][month][week].totalExpense += transaction.amount;
            grouped[year][month][week][day].totalExpense += transaction.amount;
        } else {
            grouped[year].totalIncome += transaction.amount;
            grouped[year][month].totalIncome += transaction.amount;
            grouped[year][month][week].totalIncome += transaction.amount;
            grouped[year][month][week][day].totalIncome += transaction.amount;
        }
    };

    data.income.forEach(addTransaction);
    data.expenses.forEach(addTransaction);

    // console.log(grouped);

    return grouped;
}

function getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export { groupTransactionsByDate };