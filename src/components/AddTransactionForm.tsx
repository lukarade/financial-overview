import React from "react";
import { TransactionType } from "../types";

import { postTransaction } from "../utils/utils.ts";
import { url } from "../data/constances.ts";


interface AddTransactionFormProps {
    transactionData: TransactionType[],
    setTransactionData: (data: TransactionType[]) => void
}

function AddTransactionForm({ transactionData, setTransactionData }: AddTransactionFormProps): JSX.Element {
    function handleAddTransaction(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const transaction = buildTransactionFromForm(formJson);

        form.reset();

        postTransaction(url, transaction);
        setTransactionData([...transactionData, transaction]);
    }


    function buildTransactionFromForm(formJson): TransactionType {
        const transaction = {
            id: Math.random().toString(36).substr(2, 9),  //TODO: Find a good way to generate a unique id for the transactions
            title: formJson.titleInput,
            amount: Number(formJson.amountInput),
            date: formJson.dateInput,
            category: formJson.categoryInput,
        };

        return transaction;
    }

    return (
        <form className="add-transaction-form" method="post" onSubmit={handleAddTransaction}>
            <label>
                <input type="text" name="titleInput" placeholder="Title" />
            </label>
            <label>
                <input type="number" name="amountInput" placeholder="Amount" />
            </label>
            <label>
                <input type="date" name="dateInput" />
            </label>
            <label>
                <input type="text" name="categoryInput" placeholder="Category" />
            </label>
            <button type="reset">Clear</button>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTransactionForm;