import React, { useState } from "react";
import { GroupedTransactions, Period, TransactionType, SortOptionsType } from "../../types.ts";
import ListYear from "./ListYear.tsx";

import "../../styles/list.css";

interface ListProps {
    groupedData: GroupedTransactions | null;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function List({ groupedData, setTransactionData }: ListProps): JSX.Element {
    const [periodOption, setPeriodOption] = useState<Period>(Period.MONTH);
    const [sortOption, setSortOption] = useState<SortOptionsType>({
        name: "",
        type: "",
        category: "",
        date: "",
    })
    const listData = groupedData?.transactions;

    return (
        <div className="list-view">
            <h2>List</h2>
            <div className="filters">
                <div className="period-dropdown">
                    <label htmlFor="periodOption">Categorize by: </label>
                    <select
                        id="periodOption"
                        value={periodOption}
                        onChange={(e) => setPeriodOption(e.target.value as Period)}
                    >
                        <option value={Period.YEAR}>Year</option>
                        <option value={Period.MONTH}>Month</option>
                        <option value={Period.WEEK}>Week</option>
                        <option value={Period.DAY}>Day</option>
                    </select>
                </div>
                <div className="sort-dropdown">
                    <label htmlFor="sortOption">Sort by: </label>
                    <select
                        id="sortOption"
                        value={periodOption}
                    // onChange={(e) => setSortOption(e.target.value as SortOptionsType)}
                    >
                        <option value={Period.YEAR}>Name</option>
                        <option value={Period.MONTH}>Type</option>
                        <option value={Period.WEEK}>Category</option>
                        <option value={Period.DAY}>Date</option>
                    </select>
                </div>
            </div>
            <div className="list-content">
                {listData && Object.keys(listData).length > 0 ? Object.entries(listData).map(([year, yearData]) => {
                    return (
                        <ListYear
                            key={year}
                            yearData={yearData}
                            year={year}
                            sortOption={periodOption}
                            setTransactionData={setTransactionData}
                        />
                    );
                }) : <div>No transactions yet - add transactions first</div>}
            </div>
        </div>
    );
}


export default List;