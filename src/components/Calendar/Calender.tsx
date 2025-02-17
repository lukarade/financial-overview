import React, { Dispatch, SetStateAction } from "react";
import CalendarBody from "./CalendarBody.tsx";
import "../../styles/calendar.css";
import CalendarNavigation from "./CalendarNavigation.tsx";
import { GroupedTransactions } from "../../types.ts";

interface CalendarProps {
    groupedData: GroupedTransactions;
    currentSelectedDay: Date;
    showModal: boolean;
    updateDisplayedDay: (day: Date) => void;
    setShowModal: Dispatch<SetStateAction<boolean>>
    updateModalPosition: (position: { top: number; left: number }) => void;
}

function Calendar({ groupedData, currentSelectedDay, showModal, updateDisplayedDay, setShowModal, updateModalPosition }: CalendarProps): JSX.Element {
    const currentDate = new Date();

    const handleDayClick = (day: Date) => {
        updateDisplayedDay(day);
    };

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <CalendarNavigation currentSelectedDay={currentSelectedDay} updateDisplayedDay={updateDisplayedDay} />
                {currentDate.toDateString()}
            </div>
            <CalendarBody
                groupedData={groupedData}
                currentSelectedDay={currentSelectedDay}
                showModal={showModal}
                onDayClick={handleDayClick}
                setShowModal={setShowModal}
                updateModalPosition={updateModalPosition}
            />

        </div>
    );
}

export default Calendar;