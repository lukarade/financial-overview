import React from 'react';
import BarGroup from './BarGroup.tsx';
import { OverviewData } from '../../types.ts';

interface BarChartProps {
    overviewData: OverviewData;
    chartWidth: number;
}

function BarChart({ overviewData, chartWidth }: BarChartProps): JSX.Element {
    let barHeight = 20;
    let maxValue = Math.max(...overviewData.months.flatMap(data => [data.totalIncome, data.totalExpense]));

    let barGroups = overviewData.months.map((data, i) => (
        <g key={i} transform={`translate(0, ${i * barHeight * 2})`}>
            <BarGroup data={data} maxValue={maxValue} barHeight={barHeight} chartWidth={chartWidth} />
        </g>
    ));

    return (
        <>
            <text className="title" x="10" y="30">Income and Expenses by Month ({overviewData.months[0].year})</text>
            <g className="bar-chart" transform="translate(50,60)">
                {barGroups}
            </g>
        </>
    );
}

export default BarChart;