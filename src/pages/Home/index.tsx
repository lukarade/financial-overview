import React, { CSSProperties, useEffect, useState } from "react";
import Calendar from "../../components/Calendar/Calender.tsx";
import List from "../../components/List/List.tsx";

import Overview from "../../components/Overview/Overview.tsx";
import { groupTransactionsByDate } from "../../utils/listUtils.ts";
import TransactionList from "../../components/TransactionList.tsx";
import { fetchUserData, postTransaction, getDataForSelectedDay } from "../../utils/utils.ts";
import { url } from "../../data/constances.ts";
import { TransactionType } from "../../types.ts";

// TODO: Clean up the styles when the layout is finalized

const headerStyle: CSSProperties = {
    outline: "3px solid black",
};

const navigationStyle: CSSProperties = {
    outline: "3px solid red",
};

const footerStyle: CSSProperties = {
    outline: "3px solid blue",
};

function Header() {
    return (
        <div style={headerStyle}>
            <h2>Header</h2>
        </div>
    );
}

function Navigation() {
    return (
        <div style={navigationStyle}>
            <h2>Navigation</h2>
        </div>
    );
}

function Footer() {
    return (
        <div style={footerStyle}>
            <h2>Footer</h2>
        </div>
    );
}


const overviewViewStyle: CSSProperties = {
    outline: "3px solid green",
    display: "flex",
    height: "70vh",
};

const overviewComponentStyle: CSSProperties = {
    flex: 1,
    padding: "1rem",

}

const calendarFrameStyle: CSSProperties = {
    outline: "3px solid yellow",
};

const overviewStyle: CSSProperties = {
    outline: "3px solid orange",
};

interface OverviewViewProps {
    transactionData: TransactionType[],
    setTransactionData: (transactionData: TransactionType[]) => void,
}


function OverviewView({ transactionData, setTransactionData }: OverviewViewProps) {
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
    const [currentSelectedDay, updateDisplayedDay] = useState(new Date());
    const groupedData = groupTransactionsByDate(transactionData);
    const dataForSelectedDay = getDataForSelectedDay(currentSelectedDay, groupedData);

    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === "calendar" ? "list" : "calendar"));
    };

    return (
        <div style={overviewViewStyle}>
            <TransactionList data={dataForSelectedDay} currentSelectedDay={currentSelectedDay} transactionData={transactionData} setTransactionData={setTransactionData} />
            <div style={{ ...calendarFrameStyle, ...overviewComponentStyle }}>
                <button onClick={toggleViewMode}>
                    Switch to {viewMode === "calendar" ? "List View" : "Calendar View"}
                </button>
                {viewMode === "calendar" ? (
                    (groupedData &&
                        <Calendar groupedData={groupedData} currentSelectedDay={currentSelectedDay} updateDisplayedDay={updateDisplayedDay} />
                    )
                ) : (
                    <List groupedData={groupedData} />
                )}
            </div>
            <div style={{ ...overviewStyle, ...overviewComponentStyle }}>
                <h3>Overview</h3>
                <Overview groupedData={groupedData} />
            </div>
        </div>
    );
}

const flowStyle = {
    outline: "3px solid purple",
};

function FlowView() {
    return (
        <div style={flowStyle}>
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

    // Post data to the server
    function handleAddTransaction(transaction: TransactionType): void {
        postTransaction(url, transaction);
        setTransactionData([...transactionData, transaction]);
    }

    const TestTransaction = {
        id: "1",
        title: "Test Transaction",
        amount: 100,
        date: "2025-01-01",
        category: "Test Category",
        type: "Expense",
    };

    return (
        <div className="prevent-select">
            <Header />
            <Navigation />
            {loading ? <div>Loading Data...</div> : transactionData.length > 0 && <OverviewView transactionData={transactionData} setTransactionData={setTransactionData} />}
            {/* <FlowView /> */}
            {/* <Footer /> */}

            <button onClick={() => handleAddTransaction(TestTransaction)}>Add Example Data</button>

        </div>
    );
}

export default Home;