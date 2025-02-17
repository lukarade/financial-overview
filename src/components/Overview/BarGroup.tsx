import React from "react";
import Bar from "./Bar.tsx";

import { DayTransactions, MonthTransactions, TransactionType, YearTransactions } from "../../types.ts";

interface BarGroupProps {
    data: YearTransactions | MonthTransactions | DayTransactions | TransactionType[] | null;
    label: string;
    maxValue: number;
    barHeight: number;
    chartWidth: number;
}


function BarGroup({ data, label, maxValue, barHeight, chartWidth }: BarGroupProps): JSX.Element {

    // TODO: Handle invalid data better (Case for TransactionType[] is not handled)
    if (Array.isArray(data) || !data) {
        return <div>Invalid data</div>;
    }
    const incomeData = data.totalIncome;
    const expenseData = -data.totalExpense;

    return (
        <g className="bar-group">
            <text className="name-label" x="-10" y={barHeight + 5} alignmentBaseline="middle">{label}</text>
            <g transform={`translate(0, 0)`}>
                <Bar amount={incomeData} maxValue={maxValue} barHeight={barHeight} barColor="#348AA7" chartWidth={chartWidth} />
            </g>
            <g transform={`translate(0, ${barHeight})`}>
                <Bar amount={expenseData} maxValue={maxValue} barHeight={barHeight} barColor="#FF5733" chartWidth={chartWidth} />
            </g>
        </g>
    );
}

export default BarGroup;