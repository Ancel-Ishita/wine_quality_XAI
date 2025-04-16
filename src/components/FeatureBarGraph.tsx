import React from 'react';
import type { WineData } from '../pages/PredictPage';

interface FeatureBarGraphProps {
  wineData: WineData;
  width: number;
  height: number;
}

interface FeatureInfo {
  name: string;
  value: number;
  normalizedValue: number;
  color: string;
  idealRange: [number, number];
}

const FeatureBarGraph: React.FC<FeatureBarGraphProps> = ({ wineData, width, height }) => {
  // Define feature information with normalization ranges
  const features: FeatureInfo[] = [
    {
      name: 'Alcohol',
      value: wineData.alcohol,
      normalizedValue: (wineData.alcohol - 8) / (15 - 8), // Normalize between 8-15%
      color: '#9333ea',
      idealRange: [11, 13]
    },
    {
      name: 'Volatile Acidity',
      value: wineData.volatile_acidity,
      normalizedValue: (wineData.volatile_acidity - 0.1) / (1.2 - 0.1), // Normalize between 0.1-1.2
      color: '#a855f7',
      idealRange: [0.2, 0.6]
    },
    {
      name: 'Sulphates',
      value: wineData.sulphates,
      normalizedValue: (wineData.sulphates - 0.3) / (2 - 0.3), // Normalize between 0.3-2
      color: '#c084fc',
      idealRange: [0.5, 0.9]
    },
    {
      name: 'Citric Acid',
      value: wineData.citric_acid,
      normalizedValue: wineData.citric_acid / 1, // Normalize between 0-1
      color: '#d8b4fe',
      idealRange: [0.2, 0.5]
    },
    {
      name: 'Total SO2',
      value: wineData.total_sulfur_dioxide,
      normalizedValue: wineData.total_sulfur_dioxide / 300, // Normalize between 0-300
      color: '#e9d5ff',
      idealRange: [50, 150]
    }
  ];
  
  // Ensure normalized values are between 0 and 1
  features.forEach(feature => {
    feature.normalizedValue = Math.max(0, Math.min(1, feature.normalizedValue));
  });
  
  // Calculate bar dimensions
  const margin = { top: 20, right: 20, bottom: 30, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barHeight = innerHeight / features.length * 0.7;
  const barGap = innerHeight / features.length * 0.3;
  
  // Normalize ideal ranges to the bar width
  const normalizeIdealRange = (range: [number, number], featureName: string) => {
    const feature = features.find(f => f.name === featureName);
    if (!feature) return [0, 0];
    
    // Different normalization for each feature
    switch (featureName) {
      case 'Alcohol':
        return [(range[0] - 8) / (15 - 8) * innerWidth, (range[1] - 8) / (15 - 8) * innerWidth];
      case 'Volatile Acidity':
        return [(range[0] - 0.1) / (1.2 - 0.1) * innerWidth, (range[1] - 0.1) / (1.2 - 0.1) * innerWidth];
      case 'Sulphates':
        return [(range[0] - 0.3) / (2 - 0.3) * innerWidth, (range[1] - 0.3) / (2 - 0.3) * innerWidth];
      case 'Citric Acid':
        return [range[0] / 1 * innerWidth, range[1] / 1 * innerWidth];
      case 'Total SO2':
        return [range[0] / 300 * innerWidth, range[1] / 300 * innerWidth];
      default:
        return [0, 0];
    }
  };
  
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Y-axis labels */}
        {features.map((feature, i) => (
          <text
            key={`label-${feature.name}`}
            x={-10}
            y={i * (barHeight + barGap) + barHeight / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={12}
            fill="#4b5563"
          >
            {feature.name}
          </text>
        ))}
        
        {/* Bars */}
        {features.map((feature, i) => {
          const barWidth = feature.normalizedValue * innerWidth;
          const y = i * (barHeight + barGap);
          const idealRange = normalizeIdealRange(feature.idealRange, feature.name);
          
          return (
            <g key={`bar-${feature.name}`}>
              {/* Background bar */}
              <rect
                x={0}
                y={y}
                width={innerWidth}
                height={barHeight}
                fill="#f3f4f6"
                rx={4}
              />
              
              {/* Ideal range indicator */}
              <rect
                x={idealRange[0]}
                y={y}
                width={idealRange[1] - idealRange[0]}
                height={barHeight}
                fill="#f3e8ff"
                rx={4}
              />
              
              {/* Value bar */}
              <rect
                x={0}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={feature.color}
                rx={4}
              />
              
              {/* Value label */}
              <text
                x={barWidth + 5}
                y={y + barHeight / 2}
                dominantBaseline="middle"
                fontSize={11}
                fill="#4b5563"
              >
                {feature.value.toFixed(2)}
              </text>
            </g>
          );
        })}
        
        {/* X-axis */}
        <line
          x1={0}
          y1={innerHeight + 5}
          x2={innerWidth}
          y2={innerHeight + 5}
          stroke="#d1d5db"
          strokeWidth={1}
        />
        
        {/* Legend */}
        <g transform={`translate(0, ${innerHeight + 15})`}>
          <rect x={0} y={0} width={12} height={12} fill="#f3e8ff" rx={2} />
          <text x={16} y={10} fontSize={10} fill="#6b7280">Ideal Range</text>
          
          <rect x={100} y={0} width={12} height={12} fill="#9333ea" rx={2} />
          <text x={116} y={10} fontSize={10} fill="#6b7280">Current Value</text>
        </g>
      </g>
    </svg>
  );
};

export default FeatureBarGraph;