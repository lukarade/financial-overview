import React from "react";
import { Expense, Income, Period } from "../../types.ts";
import ListTransaction from "./ListTransaction.tsx";

interface DayProps {
    transactions: (Expense | Income)[];
    totalExpense: number;
    totalIncome: number;
    sortOption: string;
}

function ListDay({ transactions, totalExpense, totalIncome, sortOption }: DayProps): JSX.Element | null {
    return (
        <div>
            {sortOption === Period.DAY && <h6>{transactions[0].date} - Total Expense: {totalExpense} - Total Income: {totalIncome}</h6>}
            {Array.isArray(transactions) && transactions.map((transaction) => (
                <ListTransaction key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
}

export default ListDay;