function getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function getDataForSelectedDay(selectedDay: Date, groupedData: any) {
    const selectedYearString = selectedDay.getFullYear();
    const selectedMonthString = (selectedDay.getMonth() + 1).toString().padStart(2, "0");
    const selectedWeekString = getWeekNumber(selectedDay).toString().padStart(2, "0");
    const selectedDayString = selectedDay.getDate().toString().padStart(2, "0");

    return (
        groupedData[selectedYearString] &&
        groupedData[selectedYearString][selectedMonthString] &&
        groupedData[selectedYearString][selectedMonthString][selectedWeekString] &&
        groupedData[selectedYearString][selectedMonthString][selectedWeekString][selectedDayString]
    ) ? groupedData[selectedYearString][selectedMonthString][selectedWeekString][selectedDayString] : [];
}

export { getWeekNumber, getDataForSelectedDay };