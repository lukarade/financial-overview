import React from "react";
import BarChart from "./BarChart.tsx";
import { OverviewData } from "../types.ts";

function Chart({ overviewData }: { overviewData: OverviewData }): JSX.Element {
    const barHeight = 20;
    const numBars = (overviewData.months.length - 1) * 2; // This only works for months
    const chartHeight = numBars * barHeight * 1.5;
    const chartWidth = 800;

    return (
        <svg width={chartWidth} height={chartHeight} style={{ border: "1px solid black" }}>
            <g className="container">
                <BarChart overviewData={overviewData} chartWidth={chartWidth} />
            </g>
        </svg>
    );
}

export default Chart;
