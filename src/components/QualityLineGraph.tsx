import React, { useMemo } from 'react';
import { LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import type { WineData } from '../pages/PredictPage';

interface QualityLineGraphProps {
  wineData: WineData;
  score: number;
  width: number;
  height: number;
}

// Mock historical data for the wine quality over time
const generateHistoricalData = (currentScore: number) => {
  // Generate some realistic fluctuations around the current score
  const baseScore = Math.max(currentScore - 1, 0);
  const maxScore = Math.min(currentScore + 1, 10);
  
  return Array.from({ length: 12 }, (_, i) => {
    // Create a slightly random path that ends at the current score
    const randomFactor = Math.random() * 0.8 - 0.4; // Random value between -0.4 and 0.4
    const monthScore = i === 11 
      ? currentScore 
      : Math.min(Math.max(baseScore + randomFactor + (i / 11) * (currentScore - baseScore), 0), 10);
    
    return {
      month: i,
      score: monthScore
    };
  });
};

const QualityLineGraph: React.FC<QualityLineGraphProps> = ({ score, width, height }) => {
  // Generate mock historical data
  const data = useMemo(() => generateHistoricalData(score), [score]);
  
  // Define margins
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Scales
  const xScale = scaleLinear({
    domain: [0, 11],
    range: [0, innerWidth],
  });
  
  const yScale = scaleLinear({
    domain: [0, 10],
    range: [innerHeight, 0],
  });
  
  // Accessors
  const getX = (d: { month: number; score: number }) => xScale(d.month);
  const getY = (d: { month: number; score: number }) => yScale(d.score);
  
  // Month labels
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <svg width={width} height={height}>
      <LinearGradient
        id="line-gradient"
        from="#9333ea"
        to="#c084fc"
        fromOpacity={0.8}
        toOpacity={0.3}
      />
      
      <Group left={margin.left} top={margin.top}>
        {/* Y-axis */}
        {yScale.ticks(5).map((tick) => (
          <Group key={`y-tick-${tick}`}>
            <line
              x1={0}
              x2={innerWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={-10}
              y={yScale(tick)}
              dy="0.3em"
              textAnchor="end"
              fontSize={10}
              fill="#6b7280"
            >
              {tick}
            </text>
          </Group>
        ))}
        
        {/* X-axis */}
        {xScale.ticks(6).map((tick) => (
          <Group key={`x-tick-${tick}`}>
            <text
              x={xScale(tick)}
              y={innerHeight + 15}
              textAnchor="middle"
              fontSize={10}
              fill="#6b7280"
            >
              {months[tick * 2]}
            </text>
          </Group>
        ))}
        
        {/* Line path */}
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke="url(#line-gradient)"
          strokeWidth={3}
          curve={curveMonotoneX}
        />
        
        {/* Data points */}
        {data.map((d, i) => (
          <circle
            key={`point-${i}`}
            cx={getX(d)}
            cy={getY(d)}
            r={i === data.length - 1 ? 5 : 3}
            fill={i === data.length - 1 ? "#7e22ce" : "#c084fc"}
            stroke="white"
            strokeWidth={1}
          />
        ))}
      </Group>
    </svg>
  );
};

export default QualityLineGraph;