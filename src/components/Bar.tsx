import React from 'react';

interface BarProps {
    data: any;
    maxValue: number;
    barHeight: number;
    barColor: string;
    chartWidth: number;
}

function Bar({ data, maxValue, barHeight, barColor, chartWidth }: BarProps): JSX.Element {
    let barPadding = 2;
    let widthScale = (d: number) => (d / maxValue) * (chartWidth - (chartWidth / 10));

    let width = widthScale(data.amount);
    let yMid = barHeight * 0.5;

    return (
        <>
            <rect y={barPadding * 0.5} width={width} height={barHeight - barPadding} fill={barColor} />
            <text className="value-label" x={data.amount === 0 ? 10 : data.amount < 80 ? width * 3 : width - 8} y={yMid + 4} alignmentBaseline="middle">{data.amount}</text>
        </>
    );
}

export default Bar;