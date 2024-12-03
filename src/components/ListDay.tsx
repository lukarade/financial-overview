import React from "react";
import { Expense, Income } from "../types";

interface DayProps {
    year: string;
    month: string;
    week: string;
    day: string;
    transactions: (Expense | Income)[];
    totalExpense: number;
    totalIncome: number;
    sortOption: string;
}

function ListDay({ year, month, week, day, transactions, totalExpense, totalIncome, sortOption }: DayProps): JSX.Element | null {
    if (transactions.length === 0) {
        return null;
    }
    return (
        <div>
            {sortOption === "day" && <h6>{year} - Month {month} - Week {week} - Day {day} - Total Expense: {totalExpense} - Total Income: {totalIncome}</h6>}
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.name} - {transaction.amount} - {transaction.date} {transaction.category && (transaction.category)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListDay;