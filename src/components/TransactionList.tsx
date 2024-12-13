import React from "react";
import Transaction from "./Transaction.tsx";
import "../styles/transaction.css";
import { months } from "../data/constances.ts";
import { DayTransactions, TransactionType } from "../types.ts";
import AddTransactionForm from "./AddTransactionForm.tsx";

interface TransactionListProps {
    data: DayTransactions | null,
    currentSelectedDay: Date
    transactionData: TransactionType[]
    setTransactionData: (data: TransactionType[]) => void
}

function TransactionList({ data, currentSelectedDay, transactionData, setTransactionData }: TransactionListProps): JSX.Element {

    return (
        <div className="transaction-view">
            <h3>Transaction View</h3>
            <div className="current-day">
                {currentSelectedDay.getDate()} {months[currentSelectedDay.getMonth()]} {currentSelectedDay.getFullYear()}
            </div>
            <div className="transaction-list">
                {data && data.transactions && data.transactions.map((transaction, index) => {
                    return (
                        <Transaction key={index} transaction={transaction} />
                    );
                }
                )}
            </div>
            <div className="add-transaction transaction">
                <p>Add transaction</p>
                <AddTransactionForm transactionData={transactionData} setTransactionData={setTransactionData} />

            </div>
        </div>
    );
}

export default TransactionList;