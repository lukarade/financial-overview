import { CalendarDayType, GroupedTransactions } from '../types';
import { getWeekNumber } from './utils.ts';

function createCalendarDay(date: Date, currentSelectedDay: Date, monthTransactions: any): CalendarDayType {
    /**
     * @param {Date} date - the date of the day to create
     * @param {Date} currentSelectedDay - the currently selected day
     * @param {any} monthTransactions - the transactions for the month
     */

    const res = {
        currentMonth: date.getMonth() === currentSelectedDay.getMonth(),
        date: new Date(date),
        day: date.getDate(),
        week: getWeekNumber(date),
        month: date.getMonth(),
        year: date.getFullYear(),
        selected: date.toDateString() === currentSelectedDay.toDateString(),
        data: getDayTransactions(monthTransactions, date),
    };

    return res;
}

function getMonthTransactions(year: number, month: number, groupedData: GroupedTransactions) {
    const yearTransactions = groupedData[year];
    if (!yearTransactions) {
        return null;
    }

    const monthTransactions = yearTransactions[String(month).padStart(2, '0')];
    if (!monthTransactions) {
        return null;
    }

    return monthTransactions;
}

function getDayTransactions(monthTransactions: any, date: Date): [] | null {
    if (!monthTransactions) {
        return null;
    }

    const weekString = String(getWeekNumber(date)).padStart(2, '0');
    if (monthTransactions[weekString] === undefined) {
        return null;
    }

    const dayString = String(date.getDate()).padStart(2, '0');
    if (monthTransactions[weekString][dayString] === undefined) {
        return null;
    }

    return monthTransactions[weekString][dayString];
}


export { getWeekNumber, createCalendarDay, getMonthTransactions };