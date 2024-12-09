import React, { CSSProperties, useState } from "react";
import Calendar from "../../components/Calendar/Calender.tsx";
import List from "../../components/List/List.tsx";

import { exampleData } from "../../data/exampleData.ts";
import Overview from "../../components/Overview/Overview.tsx";
import { groupTransactionsByDate } from "../../utils/listUtils.ts";
import TransactionList from "../../components/TransactionList.tsx";
import { getDataForSelectedDay } from "../../utils/utils.ts";

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


function OverviewView() {
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
    const [currentSelectedDay, updateDisplayedDay] = useState(new Date());
    const groupedData = groupTransactionsByDate(exampleData);
    const dataForSelectedDay = getDataForSelectedDay(currentSelectedDay, groupedData);

    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === "calendar" ? "list" : "calendar"));
    };

    return (
        <div style={overviewViewStyle}>
            <TransactionList data={dataForSelectedDay} currentSelectedDay={currentSelectedDay} />
            <div style={{ ...calendarFrameStyle, ...overviewComponentStyle }}>
                <button onClick={toggleViewMode}>
                    Switch to {viewMode === "calendar" ? "List View" : "Calendar View"}
                </button>
                {viewMode === "calendar" ? (
                    <Calendar groupedData={groupedData} currentSelectedDay={currentSelectedDay} updateDisplayedDay={updateDisplayedDay} />
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


export default function Home() {
    return (
        <div className="prevent-select">
            <Header />
            <Navigation />
            <OverviewView />
            {/* <FlowView /> */}
            {/* <Footer /> */}
        </div>
    );
}