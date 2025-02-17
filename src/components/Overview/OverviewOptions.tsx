import React from "react";
import { Period, OverviewOptionsType } from "../../types.ts";

interface OverviewOptionsProps {
    overviewOptions: OverviewOptionsType;
    setOverviewOptions: (options: OverviewOptionsType) => void;
}

function OverviewOptions({ overviewOptions, setOverviewOptions }: OverviewOptionsProps): JSX.Element {

    function handleInputChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void {
        const { name, value } = event.target;
        setOverviewOptions({ ...overviewOptions, [name]: value });
    }

    function handleButtonClick(direction: "previous" | "next"): void {
        if (overviewOptions.overviewType === Period.DAY) {
            let newMonth = parseInt(overviewOptions.selectedMonth ?? "0", 10);
            let newYear = parseInt(overviewOptions.selectedYear ?? "0", 10);
            if (direction === "previous") {
                newMonth -= 1;
                if (newMonth < 1) {
                    newMonth = 12;
                    newYear -= 1;
                }
            } else {
                newMonth += 1;
                if (newMonth > 12) {
                    newMonth = 1;
                    newYear += 1;
                }
            }
            setOverviewOptions({ ...overviewOptions, selectedMonth: newMonth.toString().padStart(2, "0"), selectedYear: newYear.toString() });
        } else {
            const newYear = (parseInt(overviewOptions.selectedYear ?? "0", 10) + (direction === "previous" ? -1 : 1)).toString();
            setOverviewOptions({ ...overviewOptions, selectedYear: newYear });
        }
    }

    return (
        <div className="overview-options">
            <h6>Overview Options</h6>
            <label>
                Chart Type:
                <select value={overviewOptions.chartType} onChange={(e) => handleInputChange(e)} name="chartType">
                    <option value="bar">Bar</option>
                    {/* <option value="line">Line</option> */}
                    <option value="pie">Pie</option>
                </select>
            </label>

            <label>
                Overview Type:
                <select value={overviewOptions.overviewType} onChange={(e) => handleInputChange(e)} name="overviewType">
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    {/* <option value="week">Week</option> */}
                    <option value="day">Day</option>
                </select>
            </label>

            {(overviewOptions.overviewType === Period.MONTH || overviewOptions.overviewType === Period.DAY) && (
                <label>
                    Year:
                    <input type="text" value={overviewOptions.selectedYear ?? ""} onChange={(e) => handleInputChange(e)} />
                </label>
            )}

            {overviewOptions.overviewType === Period.DAY && (
                <label>
                    Month:
                    <input type="text" value={overviewOptions.selectedMonth ?? ""} onChange={(e) => handleInputChange(e)} />
                </label>
            )}

            {overviewOptions.overviewType !== Period.YEAR ? <div className="navigation-buttons">
                <button onClick={() => handleButtonClick("previous")}>Previous</button>
                <button onClick={() => handleButtonClick("next")}>Next</button>
            </div> : null}
        </div>
    );
}

export default OverviewOptions;