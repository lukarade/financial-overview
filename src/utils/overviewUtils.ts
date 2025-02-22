import { initializePeriod } from "./listUtils.ts";
import { GroupedTransactions, OverviewOptionsType, TransactionType, YearTransactions, MonthTransactions, DayTransactions, Period, PieSliceData } from "../types.ts";
import { monthsShort } from "../data/constances.ts";

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


function getLabel(period: string, periodType: Period): string {
    /**
     * Returns the label for the plots depending on the period type.
     * 
     * @param period - The period to get the label for. This can be a year or a month represented as a string.
     * @param periodType - The type of the period, which can be either `Period.YEAR` or `Period.MONTH`.
     * @returns The label for the given period. If the period type is `Period.YEAR`, it returns the period as is.
     * If the period type is `Period.MONTH`, it returns the abbreviated month name.
     */

    if (periodType === Period.YEAR) {
        return period;
    }
    if (periodType === Period.MONTH) {
        return monthsShort[parseInt(period) - 1];
    }
    return period;
}


function calculateTotal(data: Record<string, YearTransactions | MonthTransactions | DayTransactions>, key: "totalIncome" | "totalExpense"): number {
    return Object.values(data).reduce((acc, item) => acc + item[key], 0);
}


function calculatePercentages(data: Record<string, YearTransactions | MonthTransactions | DayTransactions>, total: number, key: "totalIncome" | "totalExpense"): PieSliceData[] {
    const rawPercentages = Object.entries(data)
        .map(([period, item]) => {
            const value = (item as YearTransactions | MonthTransactions | DayTransactions)[key];
            const percentage = total !== 0 ? (value / total) * 100 : 0;
            return { period, value, percentage };
        })
        .filter(item => item.value !== 0);

    const totalPercentage = rawPercentages.reduce((acc, item) => acc + item.percentage, 0);
    const adjustment = 100 - totalPercentage;

    // Adjust the largest percentage to ensure the total is exactly 100%
    if (rawPercentages.length > 0) {
        const maxItem = rawPercentages.reduce((prev, current) => (prev.percentage > current.percentage ? prev : current));
        maxItem.percentage += adjustment;
    }

    const res = rawPercentages.map(item => ({
        ...item,
        percentage: Math.round(item.percentage * 100) / 100
    }));
    return res
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y,
        "Z"
    ].join(" ");

    return d;
}

export { getDataForSelectedOption, getLabel, calculateTotal, calculatePercentages, describeArc };