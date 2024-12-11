import React, { useEffect, useState } from "react";
import { GroupedTransactions } from "../../types.ts";
import ListYear from "./ListYear.tsx";

import "../../styles/list.css";

function List({ groupedData }: { groupedData: GroupedTransactions | null }): JSX.Element {
    const [sortOption, setSortOption] = useState<"year" | "month" | "week" | "day">("month");
    // const groupedData = groupTransactionsByDate(data);

    const renderTransactions = () => {
        if (!groupedData) {
            return null;
        }

        return Object.entries(groupedData)
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .map(([year, monthData]) => {
                const months = monthData || [];
                const totalExpenseYear = -monthData?.totalExpense || 0;
                const totalIncomeYear = monthData?.totalIncome || 0;
                return (
                    <ListYear key={year} year={year} months={months} totalExpenseYear={totalExpenseYear} totalIncomeYear={totalIncomeYear} sortOption={sortOption} />
                );
            });
    };

    return (
        <div className="list-view">
            <h2>List</h2>
            <div className="sort-buttons">
                <button onClick={() => setSortOption("year")}>Year</button>
                <button onClick={() => setSortOption("month")}>Month</button>
                <button onClick={() => setSortOption("week")}>Week</button>
                <button onClick={() => setSortOption("day")}>Day</button>
            </div>
            {sortOption}
            <div className="list-content">
                {groupedData ? renderTransactions() : <div>Loading...</div>}
            </div>
        </div>
    );
}


export default List;