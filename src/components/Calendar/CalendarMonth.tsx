import React, { useMemo } from 'react';
import { createCalendarDay } from '../../utils/calendarUtils.ts';
import { CalendarDayType } from '../../types.ts';
import CalendarDayComponent from './CalendarDay.tsx';

import { weekDays } from '../../data/constances.ts';

interface CalendarMonthProps {
    currentDay: Date;
    onDayClick: (day: Date) => void;
}

function CalendarMonth({ currentDay, onDayClick }: CalendarMonthProps): JSX.Element {
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
        // display the calendar week numbers as a column on the left side of the calendar
        <div className="calendar-month">
            <div className="week-number-column">
                {weeks.map((week, index) => (
                    <div key={index} className="week-number">
                        {week}
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
                            <CalendarDayComponent key={day.date.toISOString()} calendarDay={day} onDayClick={onDayClick} />
                        );
                    })
                }
            </div>
        </div>
    )

}

export default CalendarMonth;