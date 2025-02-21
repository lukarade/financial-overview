import React, { useEffect, useState } from "react";

import OverviewOptions from "./OverviewOptions.tsx";
import Chart from "./Chart.tsx";

import { GroupedTransactions, OverviewOptionsType, MonthTransactions, YearTransactions, Period, ChartType, DayTransactions, TransactionType } from "../../types.ts";
import { getDataForSelectedOption } from "../../utils/overviewUtils.ts";

import "../../styles/bar-chart.css";

interface OverviewProps {
    groupedData: GroupedTransactions | null;
    isTransactionMenuOpen: boolean;
}

function Overview({ groupedData, isTransactionMenuOpen }: OverviewProps): JSX.Element {
    const [overviewOptions, setOverviewOptions] = useState<OverviewOptionsType>({
        chartType: ChartType.BAR,
        overviewType: Period.YEAR,
        selectedYear: new Date().getFullYear().toString(),
        selectedMonth: (new Date().getMonth() + 1).toString(),
    });
    const [overviewData, setGroupedData] = useState<TransactionType[] | Record<string, YearTransactions | MonthTransactions | DayTransactions> | null>(null);
    const [loadingOverviewData, setLoadingOverviewData] = useState<boolean>(false);

    useEffect(() => {
        const getOverviewData = async () => {
            if (groupedData) {
                // console.log("GRD", groupedData);
                setLoadingOverviewData(true);
                const overviewData = await getDataForSelectedOption(groupedData, overviewOptions);
                setGroupedData(overviewData);
                setLoadingOverviewData(false);
                // console.log("OVER", overviewData, overviewOptions.chartType, overviewOptions.overviewType);
            }
        };
        getOverviewData();
    }, [groupedData, overviewOptions]);

    return (
        <div className="overview-view">
            {loadingOverviewData ? (
                <div>Loading Overview...</div>
            ) : !overviewData || !groupedData ? (
                <div>No data available</div>
            ) : (
                <Chart overviewData={overviewData} overviewOptions={overviewOptions} isTransactionMenuOpen={isTransactionMenuOpen} />
            )}
            <OverviewOptions overviewOptions={overviewOptions} setOverviewOptions={setOverviewOptions} />
        </div>
    );
}

export default Overview;