import React, { Dispatch, SetStateAction, useMemo } from "react";
import { getMonthTransactions, generateDays } from "../../utils/calendarUtils.ts";
import { GroupedTransactions, MonthTransactions } from "../../types.ts";
import CalendarDayComponent from "./CalendarDay.tsx";

import { weekDays } from "../../data/constances.ts";

interface CalendarBodyProps {
    groupedData: GroupedTransactions;
    currentSelectedDay: Date;
    showModal: boolean;
    onDayClick: (day: Date) => void;
    setShowModal: Dispatch<SetStateAction<boolean>>
    updateModalPosition: (position: { top: number; left: number }) => void;
}

function CalendarBody({ groupedData, currentSelectedDay, showModal, onDayClick, setShowModal, updateModalPosition }: CalendarBodyProps): JSX.Element {
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
                        const uniqueId = `${day.year}-${day.month}-${day.week}-${day.day}`
                        return (
                            <CalendarDayComponent
                                key={uniqueId}
                                calendarDay={day}
                                showModal={showModal}
                                onDayClick={onDayClick}
                                setShowModal={setShowModal}
                                updateModalPosition={updateModalPosition}
                            />
                        );
                    })
                }
            </div>
        </div>
    )

}

export default CalendarBody;