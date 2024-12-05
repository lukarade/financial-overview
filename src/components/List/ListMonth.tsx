import React from "react";
import { WeekTransactions } from "../../types.ts";
import ListWeek from "./ListWeek.tsx";

interface MonthProps {
    year: string;
    month: string;
    weeks: WeekTransactions;
    totalExpenseMonth: number;
    totalIncomeMonth: number;
    sortOption: string;
}


function ListMonth({ year, month, weeks, totalExpenseMonth, totalIncomeMonth, sortOption }: MonthProps): JSX.Element | null {
    return (
        <div>
            {(sortOption === "month" || sortOption === "week" || sortOption === "day") && <h4>{year} - Month {month} - Total Expense: {totalExpenseMonth} - Total Income: {totalIncomeMonth}</h4>}
            {Object.entries(weeks)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([week, dayData]) => {
                    if (week !== "totalExpense" && week !== "totalIncome") {
                        const days = dayData || [];
                        const totalExpenseWeek = -dayData?.totalExpense || 0;
                        const totalIncomeWeek = dayData?.totalIncome || 0;
                        return (
                            <ListWeek
                                key={`${year}-${month}-${week}`}
                                year={year}
                                month={month}
                                week={week}
                                days={days}
                                totalExpenseWeek={totalExpenseWeek}
                                totalIncomeWeek={totalIncomeWeek}
                                sortOption={sortOption}
                            />
                        );
                    }
                    return null;
                })}
        </div>
    );
}

export default ListMonth;