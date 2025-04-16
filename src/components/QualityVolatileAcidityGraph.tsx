import React, { useMemo } from 'react';
import { LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { AxisBottom, AxisLeft } from '@visx/axis';
import type { WineData } from '../pages/PredictPage';

interface QualityVolatileAcidityGraphProps {
  wineData: WineData;
  score: number;
  width: number;
  height: number;
}

// Function to predict wine quality based on volatile acidity
const predictQualityByVolatileAcidity = (baseWineData: WineData, volatileAcidity: number): number => {
  // Create a copy of the wine data with the new volatile acidity
  const wineData = { ...baseWineData, volatile_acidity: volatileAcidity };
  
  // Weights for each feature based on importance (simplified)
  const weights = {
    alcohol: 0.3,
    volatile_acidity: -0.25,
    sulphates: 0.15,
    citric_acid: 0.1,
    total_sulfur_dioxide: -0.05,
    density: -0.15
  };

  // Ideal ranges for each property
  const idealRanges = {
    alcohol: { min: 9, max: 14, optimal: 12 },
    volatile_acidity: { min: 0.2, max: 0.7, optimal: 0.4 },
    sulphates: { min: 0.4, max: 1.0, optimal: 0.65 },
    citric_acid: { min: 0.1, max: 0.5, optimal: 0.3 },
    total_sulfur_dioxide: { min: 30, max: 150, optimal: 100 },
    density: { min: 0.990, max: 1.000, optimal: 0.995 }
  };

  // Calculate score based on how close each property is to its optimal value
  let score = 5; // Start with a baseline score

  Object.entries(weights).forEach(([property, weight]) => {
    const value = wineData[property as keyof WineData];
    const range = idealRanges[property as keyof typeof idealRanges];
    
    // Calculate how close the value is to the optimal range (0 to 1)
    let propertyScore = 0;
    if (value >= range.min && value <= range.max) {
      const distanceFromOptimal = Math.abs(value - range.optimal);
      const maxDistance = Math.max(range.optimal - range.min, range.max - range.optimal);
      propertyScore = 1 - (distanceFromOptimal / maxDistance);
    }

    // Apply weight to the property score and add to total
    score += propertyScore * weight * 5;
  });

  // Ensure score stays within 0-10 range
  return Math.min(Math.max(score, 0), 10);
};

const QualityVolatileAcidityGraph: React.FC<QualityVolatileAcidityGraphProps> = ({ 
  wineData, 
  score, 
  width, 
  height 
}) => {
  // Generate data points for different volatile acidity values
  const data = useMemo(() => {
    const volatileAcidityRange = Array.from({ length: 61 }, (_, i) => 0.1 + (i * 0.02)); // 0.1 to 1.3 g/L
    return volatileAcidityRange.map(volatileAcidity => ({
      volatileAcidity,
      quality: predictQualityByVolatileAcidity(wineData, volatileAcidity)
    }));
  }, [wineData]);
  
  // Find the current wine's data point
  const currentPoint = useMemo(() => ({
    volatileAcidity: wineData.volatile_acidity,
    quality: score
  }), [wineData.volatile_acidity, score]);
  
  // Define margins
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Scales
  const xScale = scaleLinear({
    domain: [0.1, 1.3], // Volatile acidity range
    range: [0, innerWidth],
    nice: true
  });
  
  const yScale = scaleLinear({
    domain: [0, 10], // Quality score range
    range: [innerHeight, 0],
    nice: true
  });
  
  // Accessors
  const getX = (d: { volatileAcidity: number; quality: number }) => xScale(d.volatileAcidity);
  const getY = (d: { volatileAcidity: number; quality: number }) => yScale(d.quality);
  
  return (
    <svg width={width} height={height}>
      <LinearGradient
        id="acidity-gradient"
        from="#9333ea"
        to="#c084fc"
        fromOpacity={0.8}
        toOpacity={0.3}
      />
      
      <Group left={margin.left} top={margin.top}>
        {/* Grid lines */}
        {yScale.ticks(5).map((tick) => (
          <line
            key={`grid-${tick}`}
            x1={0}
            x2={innerWidth}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}
        
        {/* Axes */}
        <AxisLeft
          scale={yScale}
          tickValues={[0, 2, 4, 6, 8, 10]}
          stroke="#9ca3af"
          tickStroke="#9ca3af"
          tickLabelProps={() => ({
            fill: '#6b7280',
            fontSize: 10,
            textAnchor: 'end',
            dx: -4
          })}
        />
        
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          tickValues={[0.1, 0.3, 0.5, 0.7, 0.9, 1.1, 1.3]}
          stroke="#9ca3af"
          tickStroke="#9ca3af"
          tickLabelProps={() => ({
            fill: '#6b7280',
            fontSize: 10,
            textAnchor: 'middle',
            dy: 4
          })}
        />
        
        {/* Axis labels */}
        <text
          x={-innerHeight / 2}
          y={-35}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize={12}
          fill="#4b5563"
        >
          Wine Quality Score (0-10)
        </text>
        
        <text
          x={innerWidth / 2}
          y={innerHeight + 30}
          textAnchor="middle"
          fontSize={12}
          fill="#4b5563"
        >
          Volatile Acidity (g/L)
        </text>
        
        {/* Line path */}
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke="url(#acidity-gradient)"
          strokeWidth={3}
          curve={curveMonotoneX}
        />
        
        {/* Current wine point */}
        <circle
          cx={getX(currentPoint)}
          cy={getY(currentPoint)}
          r={6}
          fill="#7e22ce"
          stroke="white"
          strokeWidth={2}
        />
        
        {/* Optimal point indicator */}
        <line
          x1={xScale(0.4)}
          y1={0}
          x2={xScale(0.4)}
          y2={innerHeight}
          stroke="#d8b4fe"
          strokeWidth={1}
          strokeDasharray="4,4"
        />
        <text
          x={xScale(0.4)}
          y={-5}
          textAnchor="middle"
          fontSize={10}
          fill="#7e22ce"
        >
          Optimal (0.4 g/L)
        </text>
      </Group>
    </svg>
  );
};

export default QualityVolatileAcidityGraph;