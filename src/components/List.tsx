import React, { useState } from "react";
import { FinancialData } from "../types";
import { groupTransactionsByDate } from "../utils/listUtils.ts";
import "../styles/list.css";

function List({ data }: { data: FinancialData }): JSX.Element {
    const [sortOption, setSortOption] = useState<"year" | "month" | "week" | "day">("month");
    const groupedData = groupTransactionsByDate(data);

    const renderTransactions = () => {
        switch (sortOption) {
            case "year":
                return Object.entries(groupedData)
                    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                    .map(([year, months]) => (
                        <Year key={year} year={year} months={months} />
                    ));
            case "month":
                return Object.entries(groupedData).flatMap(([year, months]) =>
                    Object.entries(months)
                        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                        .map(([month, weeks]) => (
                            <Month key={`${year}-${month}`} year={year} month={month} weeks={weeks} />
                        ))
                );
            case "week":
                return Object.entries(groupedData).flatMap(([year, months]) =>
                    Object.entries(months)
                        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                        .flatMap(([month, weeks]) =>
                            Object.entries(weeks)
                                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                                .map(([week, days]) => (
                                    <Week key={`${year}-${month}-${week}`} year={year} month={month} week={week} days={days} />
                                ))
                        )
                );
            case "day":
                return Object.entries(groupedData).flatMap(([year, months]) =>
                    Object.entries(months)
                        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                        .flatMap(([month, weeks]) =>
                            Object.entries(weeks)
                                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                                .flatMap(([week, days]) =>
                                    Object.entries(days)
                                        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                                        .map(([day, transactions]) => (
                                            <Day key={`${year}-${month}-${week}-${day}`} year={year} month={month} week={week} day={day} transactions={transactions} />
                                        ))
                                )
                        )
                );
            default:
                return null;
        }
    };

    return (
        <div className="list-view">
            <h2>List</h2>
            <div className="sort-buttons">
                <button onClick={() => setSortOption("year")}>Year</button>
                <button onClick={() => setSortOption("month")}>Month</button>
                <button onClick={() => setSortOption("week")}>Week</button>
                <button onClick={() => setSortOption("day")}>Day</button>
            </div>
            {renderTransactions()}
        </div>
    );
}

function Year({ year, months }): JSX.Element {
    return (
        <div>
            <h3>{year}</h3>
            {Object.entries(months)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([month, weeks]) => (
                    <Month key={`${year}-${month}`} year={year} month={month} weeks={weeks} />
                ))}
        </div>
    );
}

function Month({ year, month, weeks }): JSX.Element {
    return (
        <div>
            <h4>{year} - Month {month}</h4>
            {Object.entries(weeks)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([week, days]) => (
                    <Week key={`${year}-${month}-${week}`} year={year} month={month} week={week} days={days} />
                ))}
        </div>
    );
}

function Week({ year, month, week, days }): JSX.Element {
    return (
        <div>
            <h5>{year} - Month {month} - Week {week}</h5>
            {Object.entries(days)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([day, transactions]) => (
                    <Day key={`${year}-${month}-${week}-${day}`} year={year} month={month} week={week} day={day} transactions={transactions} />
                ))}
        </div>
    );
}

function Day({ year, month, week, day, transactions }): JSX.Element {
    return (
        <div>
            <h6>{year} - Month {month} - Week {week} - Day {day}</h6>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.name} - {transaction.amount} - {transaction.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;