import React from "react";
import BarGroup from "./BarGroup.tsx";
import { TransactionType, MonthTransactions, YearTransactions, Period, DayTransactions } from "../../types.ts";
import { getLabel } from "../../utils/overviewUtils.ts";

interface BarChartProps {
    overviewData: TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null;
    chartWidth: number;
    barHeight: number;
}


function BarChart({ overviewData, chartWidth, barHeight }: BarChartProps): JSX.Element {
    // TODO: Handle invalid data better (Case for TransactionType[] is not handled)
    if (Array.isArray(overviewData) || !overviewData) {
        return <div>Invalid data</div>;
    }

    // Get the maximum value for the x-axis
    let maxValue = 0;
    for (let key in overviewData) {
        let total = overviewData[key].totalIncome - overviewData[key].totalExpense;
        if (total > maxValue) {
            maxValue = total;
        }
    }

    // Get all the periods (months, days, years) for the y-axis
    let allPeriods: string[] = [];
    const firstKey = overviewData ? Object.keys(overviewData)[0] : null;
    if (!firstKey) {
        return <div>Invalid data</div>;
    }
    const firstItemOfPeriod = overviewData ? overviewData[firstKey] : null;
    const periodType = firstItemOfPeriod?.period || Period.YEAR;

    if (periodType === Period.YEAR) {
        allPeriods.push(...Object.keys(overviewData));
    }
    else if (periodType === Period.MONTH) {
        allPeriods = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));  // Safeguard to make sure all months of the year are included and in the right order
    } else if (periodType === Period.DAY) {
        allPeriods = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0")); // Safeguard to make sure all days of the month are included and in the right order
    }

    // Get the income and expense data for each month
    let barGroups: JSX.Element[] = [];
    allPeriods.forEach((period, index) => {
        const plotData = overviewData[period] || { totalIncome: 0, totalExpense: 0, transactions: [] };;
        barGroups.push(
            <g key={period} transform={`translate(0, ${index * barHeight * 2})`}>
                <BarGroup
                    data={plotData}
                    label={getLabel(period, periodType)}
                    maxValue={maxValue}
                    barHeight={barHeight}
                    chartWidth={chartWidth} />
            </g>
        );
    });

    return (
        <>
            {/* TODO: Add title, lines and legend */}
            <g className="bar-chart" transform="translate(50, 0)">
                {barGroups}
            </g>
        </>
    );
}

export default BarChart;