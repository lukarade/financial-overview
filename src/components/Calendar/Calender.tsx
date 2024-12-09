import React, { useState } from "react";
import CalendarBody from "./CalendarBody.tsx";
import "../../styles/calendar.css";
import CalendarNavigation from "./CalendarNavigation.tsx";

function Calendar({ groupedData }): JSX.Element {
    const [currentSelectedDay, updateDisplayedDay] = useState(new Date());
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