
import React from 'react';
import { CalendarDayType } from '../../types';
import CalendarTransaction from './CalendarTransaction.tsx';

interface CalendarDayProps {
    calendarDay: CalendarDayType,
    onDayClick: (day: Date) => void;
}


function CalendarDayComponent({ calendarDay, onDayClick }: CalendarDayProps): JSX.Element {
    const handleClick = () => {
        onDayClick(calendarDay.date);
    }

    const handleDoubleClick = () => {
        alert('Double Clicked');
    }

    return (
        <div className={"calendar-day" + (calendarDay.currentMonth ? " current" : "") + (calendarDay.selected ? " selected" : "")}
            role="button"
            aria-pressed="false"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <p>{calendarDay.day}</p>
            {calendarDay.data && <CalendarTransaction> + </CalendarTransaction>}
        </div>
    );
}

export default CalendarDayComponent;
