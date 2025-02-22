import React from "react";
import { Period, TransactionType, WeekTransactions } from "../../types.ts";
import ListDay from "./ListDay.tsx";

interface WeekProps {
    week: string;
    weekData: WeekTransactions;
    sortOption: string;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}


function ListWeek({ week, weekData, sortOption, setTransactionData }: WeekProps): JSX.Element | null {
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
                    sortOption={sortOption}
                    setTransactionData={setTransactionData}
                />
            )) : <div>No Data...</div>}
        </div>
    );
}

export default ListWeek;
