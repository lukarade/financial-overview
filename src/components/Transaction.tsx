import React from "react";
import "../styles/transaction.css";

function Transaction({ transaction }) {
    const isExpense = transaction.amount < 0;
    const styles = {
        color: isExpense ? 'red' : 'green',
        backgroundColor: isExpense ? '#ffe6e6' : '#e6ffe6',
    };

    return (
        <div className="transaction" style={styles} onClick={() => alert('Clicked')}>
            <h3>{transaction.title}</h3>
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
        </div>
    );
}

export default Transaction;