import React from "react";

interface BarProps {
    amount: number;
    maxValue: number;
    barHeight: number;
    barColor: string;
    chartWidth: number;
}

function Bar({ amount, maxValue, barHeight, barColor, chartWidth }: BarProps): JSX.Element {
    const barPadding = 2;
    function widthScale(d: number): number {
        if (maxValue === 0) return 0;
        const scaledWidth = (d / maxValue) * (chartWidth * 1.2 - (chartWidth / 10));
        return Math.min(scaledWidth, chartWidth - 50);
    };

    const width = widthScale(amount);
    const yMid = barHeight * 0.5;

    return (
        <>
            <rect y={barPadding * 0.5} width={width} height={barHeight - barPadding} fill={barColor} />
            <text
                className="value-label"
                x={amount === 0 ? 10 : width < 30 ? width + 15 : width - 5}
                y={yMid + 4}
                alignmentBaseline="middle"
            >
                {amount}
            </text>
        </>
    );
}

export default Bar;