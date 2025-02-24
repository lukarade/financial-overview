import React, { useState } from "react";
import { TransactionType } from "../../types";
import "../../styles/list.css";
import { url } from "../../data/constances.ts";
import { deleteTransaction, updateTransaction } from "../../utils/utils.ts";

interface ListTransactionProps {
    transaction: TransactionType;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function ListTransaction({ transaction, setTransactionData }: ListTransactionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState(transaction);

    const styles = {
        color: transaction.amount < 0 ? "red" : "green",
    };

    function handleEdit(): void {
        setEditedTransaction(transaction);
        setIsEditing(true);
    }

    async function handleSave(): Promise<void> {
        try {
            await updateTransaction(url, editedTransaction.id, editedTransaction);
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
        setEditedTransaction({ ...editedTransaction, [name]: name === "amount" ? parseFloat(value) : value });
    }

    async function handleDelete(): Promise<void> {
        try {
            await deleteTransaction(url, transaction.id);
            setTransactionData((prevData) => prevData.filter((t) => t.id !== transaction.id));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    }

    return (
        <div className="list-transaction">
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
                        type="text"
                        name="category"
                        value={editedTransaction.category}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="date"
                        value={editedTransaction.date}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            ) : (
                <>
                    <div className="transaction-title" onDoubleClick={handleEdit}>{transaction.name}</div>
                    <div className="transaction-amount" style={styles} onDoubleClick={handleEdit}>{transaction.amount}</div>
                    <div className="transaction-category" onDoubleClick={handleEdit}>{transaction.category && (transaction.category)}</div>
                    <div className="transaction-date" onDoubleClick={handleEdit}>{transaction.date}</div>
                </>
            )}
        </div>
    );
}

export default ListTransaction;