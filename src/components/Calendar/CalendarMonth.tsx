import React, { useMemo } from 'react';
import { getWeekNumber } from '../../utils/calendarUtils.ts';
import { CalendarDay } from '../../types.ts';
import CalendarDayComponent from './CalendarDay.tsx';

import { weekDays } from '../../data/constances.ts';

interface CalendarMonthProps {
    currentDay: Date;
}

function CalendarMonth({ currentDay }: CalendarMonthProps): JSX.Element {
    const firstDayOfMonth = useMemo(() => new Date(currentDay.getFullYear(), currentDay.getMonth(), 1), [currentDay]);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();

    let currentMonth: CalendarDay[] = [];

    function createCalendarDay(date: Date): CalendarDay {
        const res = {
            currentMonth: date.getMonth() === currentDay.getMonth(),
            date: new Date(date),
            day: date.getDate(),
            week: getWeekNumber(date),
            month: date.getMonth(),
            year: date.getFullYear(),
            selected: date.toDateString() === currentDay.toDateString(),
        };
        // console.log(res);
        return res;
    }

    for (let day = 0; day < 42; day++) {

        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 6);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
        currentMonth.push(createCalendarDay(firstDayOfMonth));
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
                            <CalendarDayComponent key={day.date.toISOString()} {...day} />
                        );
                    })
                }
            </div>
        </div>
    )

}

export default CalendarMonth;