import React, { useState } from "react";
import { GroupedTransactions, Period } from "../../types.ts";
import ListYear from "./ListYear.tsx";

import "../../styles/list.css";

interface ListProps {
    groupedData: GroupedTransactions | null;
}

function List({ groupedData }: ListProps): JSX.Element {
    const [sortOption, setSortOption] = useState<Period>(Period.MONTH);
    const listData = groupedData?.transactions;

    return (
        <div className="list-view">
            <h2>List</h2>
            <div className="sort-buttons">
                <button onClick={() => setSortOption(Period.YEAR)}>Year</button>
                <button onClick={() => setSortOption(Period.MONTH)}>Month</button>
                <button onClick={() => setSortOption(Period.WEEK)}>Week</button>
                <button onClick={() => setSortOption(Period.DAY)}>Day</button>
            </div>
            <div className="list-content">
                {listData ? Object.entries(listData).map(([year, yearData]) => {
                    return (
                        <ListYear
                            key={year}
                            yearData={yearData}
                            year={year}
                            sortOption={sortOption}
                        />
                    );
                }) : <div>No Data...</div>}
            </div>
        </div>
    );
}


export default List;