import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import type { WineData } from '../pages/PredictPage';

interface WineComparisonProps {
  wine1: WineData;
  wine2: WineData;
  score1: number;
  score2: number;
}

const WineComparison: React.FC<WineComparisonProps> = ({
  wine1,
  wine2,
  score1,
  score2
}) => {
  const compareValues = (val1: number, val2: number) => {
    if (val1 > val2) return 'text-green-600';
    if (val1 < val2) return 'text-red-600';
    return 'text-gray-600';
  };

  const features = [
    { name: 'Quality Score', value1: score1, value2: score2 },
    { name: 'Alcohol', value1: wine1.alcohol, value2: wine2.alcohol },
    { name: 'Volatile Acidity', value1: wine1.volatile_acidity, value2: wine2.volatile_acidity },
    { name: 'Sulphates', value1: wine1.sulphates, value2: wine2.sulphates },
    { name: 'Citric Acid', value1: wine1.citric_acid, value2: wine2.citric_acid }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <ArrowLeftRight className="h-6 w-6 text-red-700" />
        <h3 className="ml-2 text-lg font-semibold text-gray-900">
          Wine Comparison
        </h3>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name} className="grid grid-cols-3 gap-4 items-center">
            <div className="text-sm font-medium text-gray-500">{feature.name}</div>
            <div className={`text-right ${compareValues(feature.value1, feature.value2)}`}>
              {feature.value1.toFixed(2)}
            </div>
            <div className={`text-right ${compareValues(feature.value2, feature.value1)}`}>
              {feature.value2.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 text-sm text-gray-500">
          <div>Feature</div>
          <div className="text-right">Wine 1</div>
          <div className="text-right">Wine 2</div>
        </div>
      </div>
    </div>
  );
};

export default WineComparison;