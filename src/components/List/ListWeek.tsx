import React from "react";
import { DayTransactions } from "../../types.ts";
import ListDay from "./ListDay.tsx";

interface WeekProps {
    year: string;
    month: string;
    week: string;
    days: DayTransactions;
    totalExpenseWeek: number;
    totalIncomeWeek: number;
    sortOption: string;
}


function ListWeek({ year, month, week, days, totalExpenseWeek, totalIncomeWeek, sortOption }: WeekProps): JSX.Element | null {
    if (Object.keys(days).length === 0) {
        return null;
    }

    return (
        <div>
            {(sortOption === "week" || sortOption === "day") && <h5>{year} - Month {month} - Week {week} - Total Expense: {totalExpenseWeek} - Total Income: {totalIncomeWeek}</h5>}
            {Object.entries(days)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([day, dayData]) => {
                    const transactions = dayData?.transactions || [];
                    const totalExpense = dayData?.totalExpense || 0;
                    const totalIncome = dayData?.totalIncome || 0;
                    return (
                        <ListDay
                            key={`${year}-${month}-${week}-${day}`}
                            year={year}
                            month={month}
                            week={week}
                            day={day}
                            transactions={transactions}
                            totalExpense={-totalExpense}
                            totalIncome={totalIncome}
                            sortOption={sortOption}
                        />
                    );
                })}
        </div>
    );
}

export default ListWeek;
