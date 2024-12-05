import React, { useMemo } from 'react';
import { createCalendarDay } from '../../utils/calendarUtils.ts';
import { CalendarDayType } from '../../types.ts';
import CalendarDayComponent from './CalendarDay.tsx';

import { weekDays } from '../../data/constances.ts';

interface CalendarBodyProps {
    currentDay: Date;
    onDayClick: (day: Date) => void;
}

function CalendarBody({ currentDay, onDayClick }: CalendarBodyProps): JSX.Element {
    const firstDayOfMonth = useMemo(() => new Date(currentDay.getFullYear(), currentDay.getMonth(), 1), [currentDay]);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();

    let currentMonth: CalendarDayType[] = [];

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 6);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay + 1));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
        currentMonth.push(createCalendarDay(firstDayOfMonth, currentDay));
    }

    const weeks = [...new Set(currentMonth.map(day => day.week))];

    return (
        <div className="calendar-body">
            <div className="week-number-column">
                {weeks.map((calendarWeekNumber, index) => (
                    <div key={index} className="week-number">
                        {calendarWeekNumber}
                    </div>
                ))}
            </div>

            <div className="calendar-grid">
                {weekDays.map((day) => (
                    <div key={day} className="week-day">
                        {day}
                    </div>
                ))}
                {
                    currentMonth.map((day) => {
                        return (
                            <CalendarDayComponent key={`${day.year}-${day.month}-${day.week}-${day.day}`} calendarDay={day} onDayClick={onDayClick} />
                        );
                    })
                }
            </div>
        </div>
    )

}

export default CalendarBody;