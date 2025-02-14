import { GroupedTransactions, TransactionType, YearTransactions, MonthTransactions, WeekTransactions, DayTransactions, Period } from "../types.ts";
import { getWeekNumber } from "./utils.ts";

function groupTransactionsByDate(data: TransactionType[]): GroupedTransactions {
    /**
     * Group transactions by year, month, week, and day
     * 
     * Given the unordered list of transactions, group them by year, month, week, and day
     * @param {TransactionType[]} data - the list of transactions to group
     * @returns {GroupedTransactions} - the grouped transactions
     */

    const grouped: GroupedTransactions = { transactions: {} as Record<string, YearTransactions> };

    function addTransaction(transaction: TransactionType): void {
        /**
         * Add a transaction to the grouped data
         * @param {TransactionType} transaction - the transaction to add
         * @returns {void}
         */

        // Extract the year, month, week, and day from the transaction date
        const date = new Date(transaction.date);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const week = getWeekNumber(date).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        function initializePeriod<T>(period: Period): T {
            /**
             * Initialize a period with the given transactions
             * @param {string} period - the period to initialize
             * @returns {T} - the initialized period, where T is the type of the period
             */

            if (period === Period.DAY) {
                return {
                    period,
                    totalExpense: 0,
                    totalIncome: 0,
                    transactions: [] as TransactionType[],
                } as T;
            }

            return {
                period,
                totalExpense: 0,
                totalIncome: 0,
                transactions: {} as Record<string, T>,
            } as T;
        }

        // Initialize the year, month, week, and day if they do not exist
        if (!grouped.transactions[year]) grouped.transactions[year] = initializePeriod<YearTransactions>(Period.YEAR);
        if (!grouped.transactions[year].transactions[month]) grouped.transactions[year].transactions[month] = initializePeriod<MonthTransactions>(Period.MONTH);
        if (!grouped.transactions[year].transactions[month].transactions[week]) grouped.transactions[year].transactions[month].transactions[week] = initializePeriod<WeekTransactions>(Period.WEEK);
        if (!grouped.transactions[year].transactions[month].transactions[week].transactions[day]) grouped.transactions[year].transactions[month].transactions[week].transactions[day] = initializePeriod<DayTransactions>(Period.DAY);


        grouped.transactions[year].transactions[month].transactions[week].transactions[day].transactions.push(transaction);

        // Transaction is an expense if the amount is negative
        if (transaction.amount < 0) {
            grouped.transactions[year].totalExpense += transaction.amount;
            grouped.transactions[year].transactions[month].totalExpense += transaction.amount;
            grouped.transactions[year].transactions[month].transactions[week].totalExpense += transaction.amount;
            grouped.transactions[year].transactions[month].transactions[week].transactions[day].totalExpense += transaction.amount;
        } else {  // Transaction is an income if the amount is positive
            grouped.transactions[year].totalIncome += transaction.amount;
            grouped.transactions[year].transactions[month].totalIncome += transaction.amount;
            grouped.transactions[year].transactions[month].transactions[week].totalIncome += transaction.amount;
            grouped.transactions[year].transactions[month].transactions[week].transactions[day].totalIncome += transaction.amount;
        }
    };

    data.forEach(addTransaction);

    // console.log("lU: Grouped", grouped);
    return grouped;
}

export { groupTransactionsByDate };