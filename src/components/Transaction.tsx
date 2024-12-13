import React from "react";
import "../styles/transaction.css";
import { deleteTransaction } from "../utils/utils.ts";
import { url } from "../data/constances.ts";
import { TransactionType } from "../types.ts";

interface TransactionProps {
    transaction: TransactionType;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}


function Transaction({ transaction, setTransactionData }: TransactionProps): JSX.Element {
    const isExpense = transaction.amount < 0;
    const styles = {
        color: isExpense ? 'red' : 'green',
        backgroundColor: isExpense ? '#ffe6e6' : '#e6ffe6',
    };

    function handleDelete() {
        try {
            deleteTransaction(url, transaction.id);
            setTransactionData((prevData) => prevData.filter((t) => t.id !== transaction.id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    }

    return (
        <div className="transaction" style={styles}>
            <h3>{transaction.title}</h3>
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Transaction;