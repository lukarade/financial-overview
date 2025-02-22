import React from "react";
import { Expense, Income, Period, TransactionType } from "../../types.ts";
import ListTransaction from "./ListTransaction.tsx";

interface DayProps {
    transactions: (Expense | Income)[];
    totalExpense: number;
    totalIncome: number;
    sortOption: string;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function ListDay({ transactions, totalExpense, totalIncome, sortOption, setTransactionData }: DayProps): JSX.Element | null {
    return (
        <div>
            {sortOption === Period.DAY && <h6>{transactions[0].date} - Total Expense: {totalExpense} - Total Income: {totalIncome}</h6>}
            {Array.isArray(transactions) && transactions.map((transaction) => (
                <ListTransaction
                    key={transaction.id}
                    transaction={transaction}
                    setTransactionData={setTransactionData}
                />
            ))}
        </div>
    );
}

export default ListDay;