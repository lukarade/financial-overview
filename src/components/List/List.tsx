import React, { useState } from "react";
import { GroupedTransactions, Period, TransactionType } from "../../types.ts";
import ListYear from "./ListYear.tsx";

import "../../styles/list.css";

interface ListProps {
    groupedData: GroupedTransactions | null;
    setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function List({ groupedData, setTransactionData }: ListProps): JSX.Element {
    const [sortOption, setSortOption] = useState<Period>(Period.MONTH);
    const listData = groupedData?.transactions;

    return (
        <div className="list-view">
            <h2>List</h2>
            <div className="sort-dropdown">
                <label htmlFor="sortOption">Categorize by: </label>
                <select
                    id="sortOption"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as Period)}
                >
                    <option value={Period.YEAR}>Year</option>
                    <option value={Period.MONTH}>Month</option>
                    <option value={Period.WEEK}>Week</option>
                    <option value={Period.DAY}>Day</option>
                </select>
            </div>
            <div className="list-content">
                {listData && Object.keys(listData).length > 0 ? Object.entries(listData).map(([year, yearData]) => {
                    return (
                        <ListYear
                            key={year}
                            yearData={yearData}
                            year={year}
                            sortOption={sortOption}
                            setTransactionData={setTransactionData}
                        />
                    );
                }) : <div>No transactions yet - add transactions first</div>}
            </div>
        </div>
    );
}


export default List;