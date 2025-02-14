import { DayTransactions, TransactionType } from "../types.ts";

function getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function getDataForSelectedDay(selectedDay: Date, groupedData: any): DayTransactions | null {
    const selectedYearString = selectedDay.getFullYear();
    const selectedMonthString = (selectedDay.getMonth() + 1).toString().padStart(2, "0");
    const selectedWeekString = getWeekNumber(selectedDay).toString().padStart(2, "0");
    const selectedDayString = selectedDay.getDate().toString().padStart(2, "0");

    return (
        groupedData[selectedYearString] &&
        groupedData[selectedYearString].transactions[selectedMonthString] &&
        groupedData[selectedYearString].transactions[selectedMonthString].transactions[selectedWeekString] &&
        groupedData[selectedYearString].transactions[selectedMonthString].transactions[selectedWeekString].transactions[selectedDayString]
    ) ? groupedData[selectedYearString].transactions[selectedMonthString].transactions[selectedWeekString].transactions[selectedDayString] : null;
}


async function fetchUserData(url: string): Promise<{ data: TransactionType[] | null, error: string | null }> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}

async function postTransaction(url: string, transaction: TransactionType): Promise<void> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (e: any) {
        throw new Error(e.message);
    }
}

async function deleteTransaction(url: string, transactionId: string): Promise<void> {
    try {
        const response = await fetch(`${url}/${transactionId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (e: any) {
        throw new Error(e.message);
    }
}


export { getWeekNumber, getDataForSelectedDay, fetchUserData, postTransaction, deleteTransaction };