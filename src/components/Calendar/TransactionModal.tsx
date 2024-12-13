import React from "react";
import AddTransactionForm from "../AddTransactionForm";
import { TransactionType } from "../../types";

// Will most likely not be used
function TransactionModal({ transaction }: { transaction: TransactionType | null }): JSX.Element {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Add Transaction</h2>
                {/* <AddTransactionForm /> */}

            </div>
        </div>
    );
}

export default TransactionModal;