import React, { useState } from "react";
import { describeArc } from "../../utils/overviewUtils.ts";

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

function PieSlice({ value, period, total, startAngle, endAngle, color, radius, innerRadius }: PieSliceProps): JSX.Element {
    const pathData = describeArc(0, 0, radius, startAngle, endAngle);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate the midpoint angle for placing the text
    const midAngle = (((startAngle + endAngle) / 2) - 90) * (Math.PI / 180);
    const textX = (innerRadius + radius - 20) * Math.cos(midAngle);
    const textY = (innerRadius + radius - 20) * Math.sin(midAngle);

    return (
        <g className="chart-section"
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