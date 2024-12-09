import React from "react";

function CalendarTransaction({ children }): JSX.Element {
    return (
        <div className="calendar-transaction">
            {children}
        </div>
    );
}

export default CalendarTransaction;