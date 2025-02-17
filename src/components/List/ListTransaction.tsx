import React from "react";
import { TransactionType } from "../../types";

import "../../styles/list.css";

interface ListTransactionProps {
    transaction: TransactionType
}

function ListTransaction({ transaction }: ListTransactionProps) {
    const styles = {
        color: transaction.amount < 0 ? "red" : "green",
    };

    return (
        <div className="list-transaction">
            <div className="transaction-title">{transaction.title}</div>
            <div className="transaction-amount" style={styles}>{transaction.amount}</div>
            <div className="transaction-category">{transaction.category && (transaction.category)}</div>
            <div className="transaction-date">{transaction.date}</div>
        </div>
    )
}

export default ListTransaction;