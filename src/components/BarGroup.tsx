import React from 'react';
import Bar from "./Bar.tsx";

import { monthsShort } from "../data/constances.ts";

interface BarGroupProps {
    data: any;
    maxValue: number;
    barHeight: number;
    chartWidth: number;
}


function BarGroup({ data, maxValue, barHeight, chartWidth }: BarGroupProps): JSX.Element {
    const incomeData = { month: data.month, amount: data.totalIncome };
    const expenseData = { month: data.month, amount: -data.totalExpense };

    return (
        <g className="bar-group">
            <text className="name-label" x="-20" y={barHeight + 5} alignmentBaseline="middle">{monthsShort[data.month - 1]}</text>
            <g transform={`translate(0, 0)`}>
                <Bar data={incomeData} maxValue={maxValue} barHeight={barHeight} barColor="#348AA7" chartWidth={chartWidth} />
            </g>
            <g transform={`translate(0, ${barHeight})`}>
                <Bar data={expenseData} maxValue={maxValue} barHeight={barHeight} barColor="#FF5733" chartWidth={chartWidth} />
            </g>
        </g>
    );
}

export default BarGroup;