import React, { useMemo } from 'react';
import { getMonthTransactions, generateDays } from '../../utils/calendarUtils.ts';
import { GroupedTransactions, MonthTransactions } from '../../types.ts';
import CalendarDayComponent from './CalendarDay.tsx';

import { weekDays } from '../../data/constances.ts';

interface CalendarBodyProps {
    groupedData: GroupedTransactions;
    currentSelectedDay: Date;
    onDayClick: (day: Date) => void;
}

function CalendarBody({ groupedData, currentSelectedDay, onDayClick }: CalendarBodyProps): JSX.Element {
    const monthTransactions: MonthTransactions | null = useMemo(() => {
        if (groupedData) {
            return getMonthTransactions(currentSelectedDay.getFullYear(), currentSelectedDay.getMonth() + 1, groupedData);
        }
        return null;
    }, [currentSelectedDay, groupedData]);

    const currentMonth = generateDays(currentSelectedDay, monthTransactions);
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
                            <CalendarDayComponent
                                key={`${day.year}-${day.month}-${day.week}-${day.day}`}
                                calendarDay={day}
                                onDayClick={onDayClick} />
                        );
                    })
                }
            </div>
        </div>
    )

}

export default CalendarBody;