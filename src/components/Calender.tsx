import React, { useState } from "react";

import CalendarMonth from "./CalendarMonth.tsx";
import "../styles/calendar.css";
import { months } from "../data/constances.ts";

function Calendar({ data }): JSX.Element {
    const [currentDay, setCurrentDay] = useState(new Date());

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>Calendar</h2>
                {currentDay.getDate()} {months[currentDay.getMonth()]} {currentDay.getFullYear()}
            </div>
            <div className="calendar-body">
                <CalendarMonth currentDay={currentDay} />
            </div>
        </div>
    );
}

export default Calendar;