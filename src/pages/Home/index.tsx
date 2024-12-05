import React, { CSSProperties } from "react";
import Calendar from "../../components/Calendar/Calender.tsx";
import List from "../../components/List/List.tsx";

import { exampleData } from "../../data/exampleData.ts";
import Overview from "../../components/Overview/Overview.tsx";
import { groupTransactionsByDate } from "../../utils/listUtils.ts";

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

const calendarStyle: CSSProperties = {
    outline: "3px solid yellow",
};

const overviewStyle: CSSProperties = {
    outline: "3px solid orange",
};

function OverviewView() {
    const groupedData = groupTransactionsByDate(exampleData);

    return (
        <div style={overviewViewStyle}>
            {/* <h2>OverviewView</h2> */}
            {/* List Component will be an alternative for the Calendar view, for now it is easier to display the data in an list */}
            <div style={{ ...calendarStyle, ...overviewComponentStyle }}>
                <h3>Calendar</h3>
                <Calendar data={groupedData} />
                {/* <List groupedData={groupedData} /> */}
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
        <div>
            <Header />
            <Navigation />
            <OverviewView />
            {/* <FlowView /> */}
            {/* <Footer /> */}
        </div>
    );
}