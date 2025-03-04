import React, { useEffect } from "react";
import BarChart from "./BarChart.tsx";
import { ChartType, OverviewOptionsType, TransactionType, YearTransactions, MonthTransactions, DayTransactions, Period } from "../../types.ts";
import PieChart from "./PieChart.tsx";

interface ChartProps {
    overviewData: TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null;
    overviewOptions: OverviewOptionsType;
    isTransactionMenuOpen: boolean;
}

function Chart({ overviewData, overviewOptions, isTransactionMenuOpen }: ChartProps): JSX.Element {
    const barHeight = overviewOptions.overviewType === Period.MONTH ? 10 : 20;
    const numBars = (overviewOptions.overviewType === Period.TOTAL || overviewOptions.overviewType === Period.DAY) ? (overviewData ? Object.keys(overviewData).length : 0) : (overviewOptions.overviewType === Period.YEAR ? 12 : 31);
    const chartHeight = overviewOptions.chartType === ChartType.PIE ? 600 : 2 * numBars * barHeight > 482 ? 2 * numBars * barHeight : 482;
    const chartContainerRef = React.useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = React.useState(400);

    useEffect(() => {
        if (chartContainerRef.current) {
            setTimeout(() => {
                setChartWidth(chartContainerRef.current ? chartContainerRef.current.offsetWidth : 400);
            }, 500);  // The timeout is needed because the transiton animation takes 0.5s which would lead to a wrong value being use elsewise.
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isTransactionMenuOpen]);

    const handleResize = () => {
        if (chartContainerRef.current) {
            setChartWidth(chartContainerRef.current.offsetWidth);
        }
    };

    return (
        <div ref={chartContainerRef} className="overview-chart">
            <svg width={chartWidth} height={chartHeight} className="overview-svg">
                <g className="chart-container">
                    {overviewOptions.chartType === ChartType.BAR ? <BarChart overviewData={overviewData} chartWidth={chartWidth} barHeight={barHeight} /> :
                        overviewOptions.chartType === ChartType.PIE ? <PieChart overviewData={overviewData} chartWidth={chartWidth} /> :
                            null}
                </g>
            </svg>
        </div >
    );
}

export default Chart;
