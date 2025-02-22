import React, { useEffect, useState } from "react";
import { TransactionType, MonthTransactions, YearTransactions, DayTransactions, Period, PieSliceData } from "../../types.ts";
import { getLabel, calculateTotal, calculatePercentages } from "../../utils/overviewUtils.ts";

import PieSlice from "./PieSlice.tsx";

interface PieChartProps {
    overviewData: TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null;
    chartWidth: number;
}

function PieChart({ overviewData, chartWidth }: PieChartProps): JSX.Element {
    const [expensePercentages, setExpensePercentages] = useState<PieSliceData[]>([]);
    const [incomePercentages, setIncomePercentages] = useState<PieSliceData[]>([]);

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

    function generatePieSlices(data: PieSliceData[], chartWidth: number): JSX.Element[] {
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
                <g transform={`translate(${chartWidth / 4}, ${chartWidth / 3})`}>
                    <text className="name-label" x="0" y={`-${chartWidth / 4}`} alignmentBaseline="middle" textAnchor="middle">Income</text>
                    {pieSlicesIncome}
                </g>
                <g transform={`translate(${(3 * chartWidth) / 4}, ${chartWidth / 3})`}>
                    <text className="name-label" x="0" y={`-${chartWidth / 4}`} alignmentBaseline="middle" textAnchor="middle">Expense</text>
                    {pieSlicesExpenses}
                </g>
            </g>
        </>
    );
}

export default PieChart;