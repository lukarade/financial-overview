
import React from 'react';
import { CalendarDay } from '../types';


function CalendarDayComponent(calendarDay: CalendarDay): JSX.Element {
    return (
        <div className={"calendar-day" + (calendarDay.currentMonth ? " current" : "") + (calendarDay.selected ? " selected" : "")}
            role="button"
            aria-pressed="false">
            <p>{calendarDay.day}</p>
        </div>
    );
}

export default CalendarDayComponent;
