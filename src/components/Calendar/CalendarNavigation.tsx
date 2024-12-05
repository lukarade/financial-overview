import React from "react";
import { months } from "../../data/constances.ts";

interface CalendarNavigationProps {
    currentSelectedDay: Date;
    updateDisplayedDay: (day: Date) => void;
}

function CalendarNavigation({ currentSelectedDay, updateDisplayedDay }: CalendarNavigationProps): JSX.Element {
    const navigateDate = (type: 'month' | 'year', direction: 'prev' | 'next') => {
        const newDate = new Date(currentSelectedDay);
        if (type === 'month') {
            newDate.setMonth(currentSelectedDay.getMonth() + (direction === 'next' ? 1 : -1));
        } else if (type === 'year') {
            newDate.setFullYear(currentSelectedDay.getFullYear() + (direction === 'next' ? 1 : -1));
        }
        updateDisplayedDay(newDate);
    };

    return (
        <div className="calendar-navigation">
            <button onClick={() => navigateDate('year', 'prev')}>{"<<"}</button>
            <button onClick={() => navigateDate('month', 'prev')}>{"<"}</button>
            <div className="current-day">
                {currentSelectedDay.getDate()} {months[currentSelectedDay.getMonth()]} {currentSelectedDay.getFullYear()}
            </div>
            <button onClick={() => navigateDate('month', 'next')}>{">"}</button>
            <button onClick={() => navigateDate('year', 'next')}>{">>"}</button>
            <button onClick={() => updateDisplayedDay(new Date())}>Today</button>
        </div>
    );
}

export default CalendarNavigation;