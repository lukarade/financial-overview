import React from "react";
import OverviewOptions from "./OverviewOptions.tsx";
import { GroupedTransactions, MonthTransactions } from "../../types.ts";
import { OverviewData } from "../../types.ts";
import Chart from "./Chart.tsx";

import "../../styles/bar-chart.css";


function Overview({ groupedData }: { groupedData: GroupedTransactions }): JSX.Element {
    // const [chartType, setChartType] = useState<"bar">("bar");
    // const [overviewType, setOverviewType] = useState<"year" | "month" | "week" | "day">("month");

    // console.log(groupedData);
    const overviewData = transformGroupedDataToOverviewData(groupedData);

    return (<div className="overview-view">
        <Chart overviewData={overviewData} />

        <OverviewOptions />
    </div>
    );
}

// TODO: Move this to utils after it is fully implemented
// TODO: Add transformation for years and weeks
function transformGroupedDataToOverviewData(groupedData: GroupedTransactions): OverviewData {
    let overviewData: OverviewData = { months: [] };

    Object.entries(groupedData)
        .forEach(([year, monthData]) => {
            Object.entries(monthData as MonthTransactions).forEach(([month, weekData]) => {
                if (month !== "totalExpense" && month !== "totalIncome") {
                    const totalExpense = weekData.totalExpense || 0;
                    const totalIncome = weekData.totalIncome || 0;

                    overviewData.months.push({
                        year: year,
                        month: month,
                        totalExpense,
                        totalIncome,
                    });
                }
            });
        });

    // console.log(overviewData);
    return overviewData;
}

export default Overview;