import React, { useState } from "react";
import CalendarMonth from "./CalendarMonth.tsx";
import "../../styles/calendar.css";
import { months } from "../../data/constances.ts";

function Calendar({ data }): JSX.Element {
    const [currentSelectedDay, updateDisplayedDay] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(new Date());

    const handlePrevMonth = () => {
        updateDisplayedDay(prevDay => {
            const prevMonth = new Date(prevDay.getFullYear(), prevDay.getMonth() - 1, 1);
            return prevMonth;
        });
    };

    const handleNextMonth = () => {
        updateDisplayedDay(prevDay => {
            const nextMonth = new Date(prevDay.getFullYear(), prevDay.getMonth() + 1, 1);
            return nextMonth;
        });
    };

    const handlePrevYear = () => {
        updateDisplayedDay(prevDay => {
            const prevYear = new Date(prevDay.getFullYear() - 1, prevDay.getMonth(), 1);
            return prevYear;
        });
    };

    const handleNextYear = () => {
        updateDisplayedDay(prevDay => {
            const nextYear = new Date(prevDay.getFullYear() + 1, prevDay.getMonth(), 1);
            return nextYear;
        });
    };

    const handleDayClick = (day: Date) => {
        updateDisplayedDay(day);
    };

    const handleTodayClick = () => {
        updateDisplayedDay(new Date());
    };

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <h2>Calendar</h2>
                <div className="calendar-navigation">
                    <button onClick={handlePrevYear}>{"<<"}</button>
                    <button onClick={handlePrevMonth}>{"<"}</button>
                    <div className="current-day">
                        {currentSelectedDay.getDate()} {months[currentSelectedDay.getMonth()]} {currentSelectedDay.getFullYear()}
                    </div>
                    <button onClick={handleNextMonth}>{">"}</button>
                    <button onClick={handleNextYear}>{">>"}</button>
                    <button onClick={handleTodayClick}>Today</button>
                </div>
                {currentDay.toDateString()}
            </div>
            <div className="calendar-body">
                <CalendarMonth currentDay={currentSelectedDay} onDayClick={handleDayClick} />
            </div>
        </div>
    );
}

export default Calendar;