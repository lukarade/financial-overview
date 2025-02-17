import React from "react";
import { Period, WeekTransactions } from "../../types.ts";
import ListDay from "./ListDay.tsx";

interface WeekProps {
    week: string;
    weekData: WeekTransactions;
    sortOption: string;
}


function ListWeek({ week, weekData, sortOption }: WeekProps): JSX.Element | null {
    const dayData = weekData?.transactions

    return (
        <div>
            {(sortOption === Period.WEEK || sortOption === Period.DAY) && <h5>Week {week} - Total Expense: {weekData.totalExpense} - Total Income: {weekData.totalIncome}</h5>}
            {dayData ? Object.entries(weekData.transactions).map(([day, dayData]) => (
                <ListDay
                    key={day}
                    transactions={dayData.transactions}
                    totalExpense={dayData.totalExpense}
                    totalIncome={dayData.totalIncome}
                    sortOption={sortOption} />
            )) : <div>No Data...</div>}
        </div>
    );
}

export default ListWeek;
