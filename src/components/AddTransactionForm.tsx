import React, { useEffect, useState } from "react";
import { TransactionType } from "../types";

import { postTransaction } from "../utils/utils.ts";
import { url } from "../data/constances.ts";

interface AddTransactionFormProps {
    transactionData: TransactionType[];
    setTransactionData: (transactionData: TransactionType[]) => void;
    currentSelectedDay: Date;
}

function AddTransactionForm({ transactionData, setTransactionData, currentSelectedDay }: AddTransactionFormProps): JSX.Element {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState<{ title?: boolean; amount?: boolean; date?: boolean }>({});

    useEffect(() => {
        // This is a workaround to fix the timezone issue
        const currentSelectedDayCorrected = new Date(currentSelectedDay);
        currentSelectedDayCorrected.setMinutes(currentSelectedDay.getMinutes() - currentSelectedDay.getTimezoneOffset());

        setDate(currentSelectedDayCorrected.toISOString().split("T")[0]);
    }, [currentSelectedDay]);

    function validateForm(): boolean {
        const newErrors: { title?: boolean; amount?: boolean; date?: boolean } = {};
        if (!title) newErrors.title = true;
        if (!amount || isNaN(Number(amount))) newErrors.amount = true;
        if (!date) newErrors.date = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function handleAddTransaction(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!validateForm()) return;

        const transaction: TransactionType = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: title,
            amount: Number(amount),
            date,
            category,
        };

        setTransactionData([...transactionData, transaction]);
        postTransaction(url, transaction);
        setTitle("");
        setAmount("");
        setDate("");
        setCategory("");
        setErrors({});
    };

    return (
        <form className="add-transaction-form" onSubmit={handleAddTransaction}>
            <label>
                <input
                    type="text"
                    name="titleInput"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={errors.title ? "error" : ""}
                />
            </label>
            <label>
                <input
                    type="number"
                    name="amountInput"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className={errors.amount ? "error" : ""}
                />
            </label>
            <label>
                <input
                    type="date"
                    name="dateInput"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={errors.date ? "error" : ""}
                />
            </label>
            <label>
                <input
                    type="text"
                    name="categoryInput"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category (Optional)"
                />
            </label>
            <div className="add-transaction-buttons">

                <button type="reset"> Clear</button>
                <button type="submit">Add Transaction</button>
            </div>
        </form>
    );
};

export default AddTransactionForm;