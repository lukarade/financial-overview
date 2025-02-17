import { CalendarDayType, GroupedTransactions, MonthTransactions, TransactionType } from "../types.ts";
import { getWeekNumber } from "./utils.ts";

function createCalendarDay(date: Date, currentSelectedDay: Date, monthTransactions: MonthTransactions | null): CalendarDayType {
    /**
     * @param {Date} date - the date of the day to create
     * @param {Date} currentSelectedDay - the currently selected day
     * @param {any} monthTransactions - the transactions for the month
     */

    const res: CalendarDayType = {
        currentMonth: date.getMonth() === currentSelectedDay.getMonth(),
        date: new Date(date),
        day: date.getDate(),
        week: getWeekNumber(date),
        month: date.getMonth(),
        year: date.getFullYear(),
        selected: date.toDateString() === currentSelectedDay.toDateString(),
        data: getDayTransactions(monthTransactions, date),
    };
    // console.log("RES", res);
    return res;
}

function generateDays(currentSelectedDay: Date, monthTransactions: MonthTransactions | null): CalendarDayType[] {
    const days: CalendarDayType[] = [];
    const year = currentSelectedDay.getFullYear();
    const month = currentSelectedDay.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to start the week on Monday
    const lastDayOfWeek = (lastDayOfMonth.getDay() + 6) % 7; // Adjust to start the week on Monday

    // Days from the previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(year, month, -i);
        days.push(createCalendarDay(day, currentSelectedDay, monthTransactions));
    }

    // Days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const day = new Date(year, month, i);
        days.push(createCalendarDay(day, currentSelectedDay, monthTransactions));
    }

    // Days from the next month
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        const day = new Date(year, month + 1, i);
        days.push(createCalendarDay(day, currentSelectedDay, monthTransactions));
    }

    // Ensure the calendar always has 6 weeks
    const totalDays = days.length;
    if (totalDays < 42) {
        const daysToAdd = 42 - totalDays;
        const daysFromPrevMonth = firstDayOfWeek - 1;
        const daysFromNextMonth = 6 - lastDayOfWeek;

        if (daysFromPrevMonth < daysFromNextMonth) {
            // Add days from the previous month
            for (let i = 1; i <= daysToAdd; i++) {
                const day = new Date(year, month, -daysFromPrevMonth - i);
                days.unshift(createCalendarDay(day, currentSelectedDay, monthTransactions));
            }
        } else {
            // Add days from the next month
            for (let i = 1; i <= daysToAdd; i++) {
                const day = new Date(year, month + 1, daysFromNextMonth + i);
                days.push(createCalendarDay(day, currentSelectedDay, monthTransactions));
            }
        }
    }
    return days;
};

function getMonthTransactions(year: number, month: number, groupedData: GroupedTransactions): MonthTransactions | null {
    const yearTransactions = groupedData.transactions[year];
    // console.log("YEAR", yearTransactions);
    if (!yearTransactions) {
        return null;
    }

    const monthTransactions = yearTransactions.transactions[String(month).padStart(2, "0")];
    // console.log("MONTH", monthTransactions);
    if (!monthTransactions) {
        return null;
    }

    return monthTransactions;
}

function getDayTransactions(monthTransactions: MonthTransactions | null, date: Date): TransactionType[] | null {
    if (!monthTransactions) {
        return null;
    }
    // console.log("DATE", monthTransactions);

    const weekString = String(getWeekNumber(date)).padStart(2, "0");
    if (monthTransactions.transactions[weekString] === undefined) {
        return null;
    }

    const dayString = String(date.getDate()).padStart(2, "0");
    if (monthTransactions.transactions[weekString].transactions[dayString] === undefined) {
        return null;
    }
    // console.log("DAY", monthTransactions.transactions[weekString].transactions[dayString].transactions);
    return monthTransactions.transactions[weekString].transactions[dayString].transactions;
}

export { getWeekNumber, getMonthTransactions, generateDays };