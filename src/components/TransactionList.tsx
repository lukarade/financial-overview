import React from "react";
import Transaction from "./Transaction.tsx";
import "../styles/transaction.css";
import { months } from "../data/constances.ts";

function TransactionList({ data, currentSelectedDay }) {
    return (
        <div className="transaction-view">
            <h3>Transaction View</h3>
            <div className="current-day">
                {currentSelectedDay.getDate()} {months[currentSelectedDay.getMonth()]} {currentSelectedDay.getFullYear()}
            </div>
            {data.transactions ? data.transactions.map((transaction, index) => {
                return (
                    <Transaction key={index} transaction={transaction} />
                );
            }
            ) : <p>Add transaction</p>}
        </div>
    );
}

export default TransactionList;