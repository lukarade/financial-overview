import React from 'react';
import ListMonth from './ListMonth.tsx';
import { MonthTransactions } from '../../types.ts';

interface YearProps {
    year: string;
    months: MonthTransactions;
    totalExpenseYear: number;
    totalIncomeYear: number;
    sortOption: string;
}

function ListYear({ year, months, totalExpenseYear, totalIncomeYear, sortOption }: YearProps): JSX.Element {
    return (
        <div>
            {(sortOption === "year" || sortOption === "month" || sortOption === "week" || sortOption === "day") && <h3>{year} - Total Expense: {totalExpenseYear} - Total Income: {totalIncomeYear}</h3>}
            {Object.entries(months)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([month, weekData]) => {
                    const weeks = weekData || [];
                    const totalExpenseMonth = -weekData?.totalExpense || 0;
                    const totalIncomeMonth = weekData?.totalIncome || 0;
                    return (
                        <ListMonth key={`${year}-${month}`} year={year} month={month} weeks={weeks} totalExpenseMonth={totalExpenseMonth} totalIncomeMonth={totalIncomeMonth} sortOption={sortOption} />
                    );
                })}
        </div>
    );
}


export default ListYear;