import React, { Dispatch, SetStateAction, CSSProperties } from "react";
import AddTransactionForm from "../AddTransactionForm.tsx";
import { TransactionType } from "../../types.ts";

interface TransactionModalProps {
    transactionData: TransactionType[];
    currentSelectedDay: Date;
    position?: { top: number; left: number; };
    setTransactionData: (transactionData: TransactionType[]) => void;
    setShowModal: Dispatch<SetStateAction<boolean>>
}

function TransactionModal({ transactionData, currentSelectedDay, position, setTransactionData, setShowModal }: TransactionModalProps): JSX.Element {
    const style: CSSProperties = {
        top: position?.top ?? "auto",
        left: position?.left ?? "auto",
    }

    function handleCloseModal() {
        setShowModal(false)
    }


    return (
        <div className="modal-backdrop">
            <div className="modal" style={style}>
                <h2>Add Transaction</h2>
                <button onClick={handleCloseModal} className="close-button">
                    Close
                </button>
                <AddTransactionForm transactionData={transactionData} setTransactionData={setTransactionData} currentSelectedDay={currentSelectedDay} />
            </div>
        </div>
    );
}

export default TransactionModal;