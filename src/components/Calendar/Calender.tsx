import React from "react";
import CalendarBody from "./CalendarBody.tsx";
import "../../styles/calendar.css";
import CalendarNavigation from "./CalendarNavigation.tsx";
import { GroupedTransactions } from "../../types.ts";

interface CalendarProps {
    groupedData: GroupedTransactions;
    currentSelectedDay: Date;
    updateDisplayedDay: (day: Date) => void;
}

function Calendar({ groupedData, currentSelectedDay, updateDisplayedDay }: CalendarProps): JSX.Element {
    const currentDate = new Date();

    const handleDayClick = (day: Date) => {
        updateDisplayedDay(day);
    };

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <CalendarNavigation currentSelectedDay={currentSelectedDay} updateDisplayedDay={updateDisplayedDay} />
                {currentDate.toDateString()}
            </div>
            <CalendarBody groupedData={groupedData} currentSelectedDay={currentSelectedDay} onDayClick={handleDayClick} />

        </div>
    );
}

export default Calendar;