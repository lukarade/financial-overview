import React, { useState } from "react";
import { Period, OverviewOptionsType } from "../../types.ts";
import "../../styles/overview.css";

interface OverviewOptionsProps {
    overviewOptions: OverviewOptionsType;
    setOverviewOptions: (options: OverviewOptionsType) => void;
}

function OverviewOptions({ overviewOptions, setOverviewOptions }: OverviewOptionsProps): JSX.Element {
    const [currentSelectedYearOption, setCurrentSelectedYearOption] = useState(overviewOptions.selectedYear);
    const [currentSelectedMonthOption, setCurrentSelectedMonthOption] = useState(overviewOptions.selectedMonth);
    const [inputError, setInputError] = useState<{ [name: string]: boolean }>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
        const { name, value } = event.target;

        if (name === "selectedYear") {
            handleYearChange(value);
        } else if (name === "selectedMonth") {
            handleMonthChange(value);
        } else {
            setOverviewOptions({ ...overviewOptions, [name]: value });
        }
    };

    const handleYearChange = (value: string): void => {
        if (/^\d{0,4}$/.test(value)) {
            setCurrentSelectedYearOption(value);
            if (/^\d{4}$/.test(value)) { // The value must be a valid year (exactly 4 digits long).
                updateOverviewOptions("selectedYear", value);
                removeInputError("selectedYear");
            } else {
                setInputError({ ...inputError, selectedYear: true });
            }
        }
    };

    const handleMonthChange = (value: string): void => {
        if (/^\d{0,2}$/.test(value)) {
            setCurrentSelectedMonthOption(value);
            if ( // The value can either be a single digit or two digits -> It must be a valid number for a month.
                (/^\d{2}$/.test(value) || /^\d{1}$/.test(value)) &&
                !(parseInt(value, 10) < 1 || parseInt(value, 10) > 12)
            ) {
                updateOverviewOptions("selectedMonth", value);
                removeInputError("selectedMonth");
            } else {
                setInputError({ ...inputError, selectedMonth: true });
            }
        } else {
            setInputError({ ...inputError, selectedMonth: true });
        }
    };

    const updateOverviewOptions = (name: string, value: string): void => {
        setOverviewOptions({ ...overviewOptions, [name]: value });
    };

    const removeInputError = (name: string) => {
        setInputError((prev) => {
            const { [name]: _, ...rest } = prev;
            return rest;
        });
    };

    const handleButtonClick = (direction: "previous" | "next"): void => {
        if (overviewOptions.overviewType === Period.DAY) {
            handleDayNavigation(direction);
        } else {
            handleYearNavigation(direction);
        }
    };

    const handleDayNavigation = (direction: "previous" | "next"): void => {
        let newMonth = parseInt(currentSelectedMonthOption ?? "0", 10);
        let newYear = parseInt(currentSelectedYearOption ?? "0", 10);
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
        setCurrentSelectedMonthOption(String(newMonth));
        setCurrentSelectedYearOption(String(newYear));
        setOverviewOptions({ ...overviewOptions, selectedMonth: newMonth.toString().padStart(2, "0"), selectedYear: newYear.toString() });
    };

    const handleYearNavigation = (direction: "previous" | "next"): void => {
        const newYear = (parseInt(currentSelectedYearOption ?? "0", 10) + (direction === "previous" ? -1 : 1)).toString();
        setCurrentSelectedYearOption(newYear);
        setOverviewOptions({ ...overviewOptions, selectedYear: newYear });
    };

    return (
        <div className="overview-options">
            <h6>Overview Options</h6>
            <label>
                Chart Type:
                <select value={overviewOptions.chartType} onChange={handleInputChange} name="chartType">
                    <option value="bar">Bar</option>
                    <option value="pie">Pie</option>
                </select>
            </label>

            <label>
                Overview Type:
                <select value={overviewOptions.overviewType} onChange={handleInputChange} name="overviewType">
                    <option value="total">Total</option>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="day">Day</option>
                </select>
            </label>

            {(overviewOptions.overviewType === Period.YEAR || overviewOptions.overviewType === Period.MONTH || overviewOptions.overviewType === Period.DAY) && (
                <label>
                    Year:
                    <input
                        type="text"
                        name="selectedYear"
                        value={currentSelectedYearOption ?? new Date().getFullYear()}
                        onChange={handleInputChange}
                        className={inputError.selectedYear ? "input-error" : ""}
                    />
                </label>
            )}

            {(overviewOptions.overviewType === Period.MONTH || overviewOptions.overviewType === Period.DAY) && (
                <label>
                    Month:
                    <input
                        type="text"
                        name="selectedMonth"
                        value={currentSelectedMonthOption ?? new Date().getMonth()}
                        onChange={handleInputChange}
                        className={inputError.selectedMonth ? "input-error" : ""}
                    />
                </label>
            )}

            {/* {overviewOptions.overviewType === Period.DAY && (
                <label>
                    Day:
                    <input
                        type="text"
                        name="selectedDay"
                    value={currentSelectedMonthOption ?? new Date().getMonth()}
                    onChange={handleInputChange}
                    className={inputError.selectedMonth ? "input-error" : ""}
                    />
                </label>
            )} */}

            {overviewOptions.overviewType !== Period.TOTAL && (
                <div className="navigation-buttons">
                    <button onClick={() => handleButtonClick("previous")}>Previous</button>
                    <button onClick={() => handleButtonClick("next")}>Next</button>
                </div>
            )}
        </div>
    );
}

export default OverviewOptions;