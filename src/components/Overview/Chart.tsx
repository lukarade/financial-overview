import React from "react";
import BarChart from "./BarChart.tsx";
import { ChartType, OverviewOptionsType, TransactionType, YearTransactions, MonthTransactions, DayTransactions, Period } from "../../types.ts";

interface ChartProps {
    overviewData: TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null;
    overviewOptions: OverviewOptionsType;
}

function Chart({ overviewData, overviewOptions }: ChartProps): JSX.Element {
    const barHeight = 20;
    const numBars = overviewOptions.overviewType === Period.YEAR ? (overviewData ? Object.keys(overviewData).length : 0) : (overviewOptions.overviewType === Period.MONTH ? 12 : 31);
    const chartHeight = 2 * numBars * barHeight > 482 ? 2 * numBars * barHeight : 482;
    const chartWidth = 400;

    return (
        <svg width={chartWidth} height={chartHeight} style={{ border: "1px solid black" }}>
            <g className="container">
                {overviewOptions.chartType === ChartType.BAR ? <BarChart overviewData={overviewData} chartWidth={chartWidth} barHeight={barHeight} /> :
                    // overviewOptions.chartType === ChartType.LINE ? <LineChart overviewData={overviewData} chartWidth={chartWidth} /> : 
                    null}
            </g>
        </svg>
    );
}

export default Chart;
