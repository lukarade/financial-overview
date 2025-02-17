
import React, { Dispatch, SetStateAction } from "react";
import { CalendarDayType } from "../../types";
import CalendarTransaction from "./CalendarTransaction.tsx";

interface CalendarDayProps {
    calendarDay: CalendarDayType,
    showModal: boolean;
    onDayClick: (day: Date) => void;
    setShowModal: Dispatch<SetStateAction<boolean>>
    updateModalPosition: (position: { top: number; left: number }) => void;
}


function CalendarDayComponent({ calendarDay, showModal, onDayClick, setShowModal, updateModalPosition }: CalendarDayProps): JSX.Element {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        onDayClick(calendarDay.date);
        if (showModal) {
            const rect = event.currentTarget.getBoundingClientRect();
            updateModalPosition({ top: rect.top, left: rect.left });
        }
    }

    const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setShowModal(true);
        const rect = event.currentTarget.getBoundingClientRect();
        updateModalPosition({ top: rect.top, left: rect.left });
    }

    return (
        <div
            className={"calendar-day" + (calendarDay.currentMonth ? " current" : "") + (calendarDay.selected ? " selected" : "")}
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
