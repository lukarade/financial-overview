import React from "react";
import { MonthTransactions, Period } from "../../types.ts";
import ListWeek from "./ListWeek.tsx";
import { months } from "../../data/constances.ts";

interface MonthProps {
    month: string;
    monthData: MonthTransactions;
    sortOption: string;
}


function ListMonth({ month, monthData, sortOption }: MonthProps): JSX.Element | null {
    const weekData = monthData?.transactions

    return (
        <div>
            {(sortOption === Period.MONTH || sortOption === Period.WEEK || sortOption === Period.DAY) && <h4>{months[Number(month) - 1]} - Total Expense: {monthData.totalExpense} - Total Income: {monthData.totalIncome}</h4>}

            {weekData ? Object.entries(monthData.transactions)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([week, weekData]) => (
                    <ListWeek
                        key={week}
                        week={week}
                        weekData={weekData}
                        sortOption={sortOption} />
                )) : <div>No Data...</div>}
        </div>
    );
}

export default ListMonth;