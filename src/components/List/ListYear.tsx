import React from "react";
import ListMonth from "./ListMonth.tsx";
import { Period, TransactionType, YearTransactions } from "../../types.ts";

interface YearProps {
    yearData: YearTransactions;
    year: string;
    sortOption: string;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function ListYear({ yearData, year, sortOption, setTransactionData }: YearProps): JSX.Element {
    const monthData = yearData?.transactions

    return (
        <div>
            {(sortOption === Period.YEAR || sortOption === Period.MONTH || sortOption === Period.WEEK || sortOption === Period.DAY) && <h3>{year} - Total Expense: {yearData.totalExpense} - Total Income: {yearData.totalIncome}</h3>}
            {monthData ? Object.entries(monthData)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([month, monthData]) => {
                    return (
                        <ListMonth
                            key={month}
                            month={month}
                            monthData={monthData}
                            sortOption={sortOption}
                            setTransactionData={setTransactionData}
                        />
                    );
                }) : <div>No Data...</div>}
        </div>
    );
}


export default ListYear;