import React, { useState } from "react";
import { GroupedTransactions } from "../types";
import ListYear from "./ListYear.tsx";

import "../styles/list.css";

function List({ groupedData }: { groupedData: GroupedTransactions }): JSX.Element {
    const [sortOption, setSortOption] = useState<"year" | "month" | "week" | "day">("month");
    // const groupedData = groupTransactionsByDate(data);

    const renderTransactions = () => {
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
                {renderTransactions()}
            </div>
        </div>
    );
}


export default List;