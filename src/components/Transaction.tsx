import React from "react";
import "../styles/transaction.css";

function Transaction({ transaction }) {
    const isExpense = transaction.amount < 0;
    const styles = {
        color: isExpense ? 'red' : 'green',
        backgroundColor: isExpense ? '#ffe6e6' : '#e6ffe6',
    };

    return (
        <div className="transaction" style={styles}>
            <h3>{transaction.name}</h3>
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
        </div>
    );
}

export default Transaction;