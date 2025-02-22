import React, { useEffect, useState } from "react";
import Calendar from "../../components/Calendar/Calender.tsx";
import List from "../../components/List/List.tsx";

import "../../styles/home.css";
import Overview from "../../components/Overview/Overview.tsx";
import { groupTransactionsByDate } from "../../utils/listUtils.ts";
import TransactionList from "../../components/TransactionList.tsx";
import { fetchUserData, getDataForSelectedDay } from "../../utils/utils.ts";
import { url } from "../../data/constances.ts";
import { TransactionType } from "../../types.ts";
import TransactionModal from "../../components/Calendar/TransactionModal.tsx";

// TODO: Clean up the styles when the layout is finalized


function Header() {
    return (
        <div className="header">
            <h2>Header</h2>
        </div>
    );
}


function Footer() {
    return (
        <div className="footer">
            <p>Financial Overview </p>
            <p>©Lukas Radermacher (2024)</p>
            <a href="https://github.com/lukarade/financial-overview">View on Github</a>
        </div>
    );
}


interface OverviewViewProps {
    transactionData: TransactionType[],
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}


function OverviewView({ transactionData, setTransactionData }: OverviewViewProps) {
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
    const [currentSelectedDay, updateDisplayedDay] = useState(new Date());
    const [isTransactionMenuOpen, setTransactionMenuOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | undefined>(undefined);


    const groupedData = groupTransactionsByDate(transactionData);
    const dataForSelectedDay = getDataForSelectedDay(currentSelectedDay, groupedData);

    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === "calendar" ? "list" : "calendar"));
    };

    const updateModalPosition = (position: { top: number; left: number }) => {
        setModalPosition(position);
    };


    return (
        <div className="total-overview-view">
            <div className={"transaction-menu" + (isTransactionMenuOpen ? " open" : "")}>
                <TransactionList
                    data={dataForSelectedDay}
                    currentSelectedDay={currentSelectedDay}
                    transactionData={transactionData}
                    setTransactionData={setTransactionData} />
            </div>
            <button
                className="toggle-menu-button"
                onClick={() => setTransactionMenuOpen(!isTransactionMenuOpen)}>{isTransactionMenuOpen ? "<<" : ">>"}
            </button>
            <div className={"calendar-frame overview-component"}>
                <button onClick={toggleViewMode}>
                    Switch to {viewMode === "calendar" ? "List View" : "Calendar View"}
                </button>

                {viewMode === "calendar" ? (
                    (groupedData &&
                        <Calendar
                            groupedData={groupedData}
                            currentSelectedDay={currentSelectedDay}
                            showModal={showModal}
                            updateDisplayedDay={updateDisplayedDay}
                            setShowModal={setShowModal}
                            updateModalPosition={updateModalPosition}
                        />
                    )
                ) : (
                    <List groupedData={groupedData} setTransactionData={setTransactionData} />
                )}
                {viewMode === "calendar" && showModal ? (
                    <TransactionModal
                        transactionData={transactionData}
                        setTransactionData={setTransactionData}
                        currentSelectedDay={currentSelectedDay}
                        setShowModal={setShowModal}
                        position={modalPosition}
                    />
                ) : null}
            </div>
            <div className={`overview overview-component`} >
                <h3>Overview</h3>
                <Overview groupedData={groupedData} isTransactionMenuOpen={isTransactionMenuOpen} />
            </div>
        </div>
    );
}


function FlowView() {
    return (
        <div className="flowview">
            <h2>FlowView</h2>
        </div>
    );
}


function Home() {
    const [transactionData, setTransactionData] = useState<TransactionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchUserData(url);
            if (result.error) {
                setError(result.error);
            } else {
                setTransactionData(result.data || []);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="prevent-select">
            <Header />
            {loading ? <div>Loading Data...</div> : transactionData.length > 0 && <OverviewView transactionData={transactionData} setTransactionData={setTransactionData} />}
            <FlowView />
            <Footer />
        </div>
    );
}

export default Home;