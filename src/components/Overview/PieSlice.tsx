import React, { useState } from "react";

interface PieSliceProps {
    value: number;
    period: string;
    total: number;
    startAngle: number;
    endAngle: number;
    color: string;
    radius: number;
    innerRadius: number;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y,
        "Z"
    ].join(" ");

    return d;
}

function PieSlice({ value, period, total, startAngle, endAngle, color, radius, innerRadius }: PieSliceProps): JSX.Element {
    const pathData = describeArc(0, 0, radius, startAngle, endAngle);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate the midpoint angle for placing the text
    const midAngle = (((startAngle + endAngle) / 2) - 90) * (Math.PI / 180);
    const textX = (innerRadius + radius - 20) * Math.cos(midAngle);
    const textY = (innerRadius + radius - 20) * Math.sin(midAngle);

    return (
        <g className="bar-group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <path d={pathData} fill={color} />
            <text
                x={textX}
                y={textY}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="black"
            >
                {isHovered ? `${((value / total) * 100).toFixed(2)}%` : period}
            </text>
        </g>
    );
}

export default PieSlice;