import React, { useState } from "react";
import "../styles/transaction.css";
import { deleteTransaction, updateTransaction } from "../utils/utils.ts";
import { url } from "../data/constances.ts";
import { TransactionType } from "../types.ts";

interface TransactionProps {
    transaction: TransactionType;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function Transaction({ transaction, setTransactionData }: TransactionProps): JSX.Element {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState(transaction);

    const isExpense = transaction.amount < 0;
    const styles = {
        color: isExpense ? "red" : "green",
        backgroundColor: isExpense ? "#ffe6e6" : "#e6ffe6",
    };

    function handleDelete(): void {
        try {
            deleteTransaction(url, transaction.id);
            setTransactionData((prevData) => prevData.filter((t) => t.id !== transaction.id));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    }

    function handleEdit(): void {
        setIsEditing(true);
    }

    function handleSave(): void {
        try {
            updateTransaction(url, editedTransaction.id, editedTransaction);
            setTransactionData((prevData) =>
                prevData.map((t) => (t.id === editedTransaction.id ? editedTransaction : t))
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating transaction:", error);
        }
    }

    function handleCancel(): void {
        setEditedTransaction(transaction);
        setIsEditing(false);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setEditedTransaction({ ...editedTransaction, [name]: value });
    }

    return (
        <div className="transaction" style={styles}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={editedTransaction.name}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="amount"
                        value={editedTransaction.amount}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="date"
                        value={editedTransaction.date}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="category"
                        value={editedTransaction.category}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>{transaction.name}</h3>
                    <p>{transaction.amount}</p>
                    <p>{transaction.category}</p>
                    <div>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Transaction;