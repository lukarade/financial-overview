import React from "react";
import "../styles/transaction.css";

function Transaction({ transaction }) {
    console.log(transaction);

    return (
        <div className="transaction">
            <h3>{transaction.name}</h3>
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
        </div>
    );
}

export default Transaction;