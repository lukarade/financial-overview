import React, { useEffect, useState } from "react";
import { TransactionType, MonthTransactions, YearTransactions, DayTransactions, Period } from "../../types.ts";
import PieSlice from "./PieSlice.tsx";
import { getLabel } from "../../utils/overviewUtils.ts";

interface PieChartProps {
    overviewData: TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null;
    chartWidth: number;
}


function calculateTotal(data: Record<string, YearTransactions | MonthTransactions | DayTransactions>, key: "totalIncome" | "totalExpense") {
    return Object.values(data).reduce((acc, item) => acc + item[key], 0);
}

interface ChartData {
    period: string,
    value: number,
    percentage: number,
}

function calculatePercentages(data: Record<string, YearTransactions | MonthTransactions | DayTransactions>, total: number, key: "totalIncome" | "totalExpense"): ChartData[] {
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

function PieChart({ overviewData, chartWidth }: PieChartProps): JSX.Element {
    const [expensePercentages, setExpensePercentages] = useState<ChartData[]>([]);
    const [incomePercentages, setIncomePercentages] = useState<ChartData[]>([]);


    useEffect(() => {
        if (Array.isArray(overviewData) || !overviewData) {
            return;
        }

        const totalIncomePeriod = calculateTotal(overviewData, "totalIncome");
        const totalExpensePeriod = calculateTotal(overviewData, "totalExpense");

        setExpensePercentages(calculatePercentages(overviewData, totalExpensePeriod, "totalExpense"));
        setIncomePercentages(calculatePercentages(overviewData, totalIncomePeriod, "totalIncome"));
    }, [overviewData]);

    // TODO: Handle invalid data better (Case for TransactionType[] is not handled)
    if (Array.isArray(overviewData) || !overviewData) {
        return <div>Invalid data</div>;
    }

    const firstKey = overviewData ? Object.keys(overviewData)[0] : null;
    if (!firstKey) {
        return <div>Invalid data</div>;
    }
    const firstItemOfPeriod = overviewData ? overviewData[firstKey] : null;
    const periodType = firstItemOfPeriod?.period || Period.YEAR;

    function generatePieSlices(data: ChartData[], chartWidth: number): JSX.Element[] {
        let startAngle = 0;
        return data.map((entry) => {
            const endAngle = startAngle + (entry.percentage / 100) * 360;
            const randomColor = `#${Math.floor(entry.percentage * 16777).toString(16).padStart(6, "0")}`;
            const slice = (
                <PieSlice
                    key={entry.period}
                    value={entry.percentage}
                    period={getLabel(entry.period, periodType)}
                    total={100}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    color={randomColor}
                    radius={chartWidth / 6}
                    innerRadius={chartWidth / 12}
                />
            );
            startAngle = endAngle;
            return slice;
        });
    }

    const pieSlicesExpenses = generatePieSlices(expensePercentages, chartWidth);
    const pieSlicesIncome = generatePieSlices(incomePercentages, chartWidth);

    return (
        <>
            {/* TODO: Add title, lines and legend */}
            <g className="pie-charts">
                <g transform="translate(130, 250)">
                    <text className="name-label" x="-30" y="-150" alignmentBaseline="middle">Income</text>
                    {pieSlicesIncome}
                </g>
                <g transform="translate(420, 250)">
                    <text className="name-label" x="-30" y="-150" alignmentBaseline="middle">Expense</text>
                    {pieSlicesExpenses}
                </g>
            </g>
        </>
    );
}

export default PieChart;