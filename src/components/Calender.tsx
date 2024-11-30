import React, { useMemo, useState } from "react";
import "../styles/calendar.css";

type CalendarDay = {
    currentMonth: boolean;
    date: Date;
    month: number;
    number: number;
    selected: boolean;
    year: number;
}

interface CalendarDaysProps {
    currentDay: Date;
    setCurrentDay: (day: Date) => void;
}


const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function CalendarDays({ currentDay, setCurrentDay }: CalendarDaysProps): JSX.Element {
    const firstDayOfMonth = useMemo(() => new Date(currentDay.getFullYear(), currentDay.getMonth(), 1), [currentDay]);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();

    let currentDays: CalendarDay[] = [];

    function createCalendarDay(date: Date): CalendarDay {
        return {
            currentMonth: date.getMonth() === currentDay.getMonth(),
            date: new Date(date),
            month: date.getMonth(),
            number: date.getDate(),
            selected: date.toDateString() === currentDay.toDateString(),
            year: date.getFullYear()
        };
    }

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        currentDays.push(createCalendarDay(firstDayOfMonth));
    }

    return (
        <div className="table-content">
            {
                currentDays.map((day) => {
                    return (
                        <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                            key={day.date.toISOString()}
                            role="button"
                            aria-pressed="false"
                            onClick={() => setCurrentDay(day.date)}>
                            <p>{day.number}</p>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default function Calendar(): JSX.Element {
    const [currentDay, setCurrentDay] = useState(new Date());

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>Calendar</h2>
                {currentDay.getDate()} {months[currentDay.getMonth()]} {currentDay.getFullYear()}
            </div>
            <div className="calendar-body">
                <div className="table-header">
                    {weekDays.map((weekday) => (
                        <div className="weekday" key={weekday}><p>{weekday}</p></div>
                    ))}
                </div>
                <div className="table-body">
                    <CalendarDays currentDay={currentDay} setCurrentDay={setCurrentDay} />
                </div>
            </div>
        </div>
    );
}