import { initializePeriod } from "./listUtils.ts";
import { GroupedTransactions, OverviewOptionsType, TransactionType, YearTransactions, MonthTransactions, DayTransactions, Period } from "../types.ts";

async function getDataForSelectedOption(groupedData: GroupedTransactions, overviewOptions: OverviewOptionsType): Promise<TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null> {
    /**
     * Returns the transactions for the selected overview option
     * 
     * If the overview type is year, it returns the accumulated transactions for each year
     * If the overview type is month, it returns the transactions for each month of the selected year
     * If the overview type is day, it returns the transactions for each day of the selected month
     * @param groupedData - The grouped transactions
     * @param overviewOptions - The selected overview options
     * @returns The transactions for the selected overview option
     */
    if (overviewOptions.overviewType === Period.TOTAL) {
        return groupedData.transactions as Record<string, YearTransactions>;
    }

    if (overviewOptions.overviewType === Period.YEAR && overviewOptions?.selectedYear) {
        const yearTransactions = groupedData.transactions[overviewOptions.selectedYear]?.transactions || {};
        const allPeriods = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));

        return allPeriods.reduce((acc, month) => {
            acc[month] = yearTransactions[month] || initializePeriod<MonthTransactions>(Period.MONTH);
            return acc;
        }, {} as Record<string, MonthTransactions>);
    }

    if (overviewOptions.overviewType === Period.MONTH && overviewOptions?.selectedYear && overviewOptions?.selectedMonth) {
        const weekTransactions = groupedData?.transactions[overviewOptions.selectedYear]?.transactions[overviewOptions.selectedMonth.padStart(2, "0")]?.transactions || null;
        if (!weekTransactions) {
            return Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0")).reduce((acc, day) => {
                acc[day] = initializePeriod<DayTransactions>(Period.DAY);
                return acc;
            }, {} as Record<string, DayTransactions>);
        }
        const dayTransactions = Object.values(weekTransactions).reduce((acc, week) => {
            return { ...acc, ...week.transactions };
        }, {} as Record<string, DayTransactions>);
        return dayTransactions;
    }

    return null;
}

export { getDataForSelectedOption };