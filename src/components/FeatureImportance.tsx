import React from 'react';
import { BarChart } from 'lucide-react';
import type { WineData } from '../pages/PredictPage';

interface FeatureImportanceProps {
  wineData: WineData;
}

const FeatureImportance: React.FC<FeatureImportanceProps> = ({ wineData }) => {
  // Mock feature importance scores (replace with actual calculations)
  const features = [
    { name: 'Alcohol', importance: 0.85, value: wineData.alcohol },
    { name: 'Volatile Acidity', importance: 0.75, value: wineData.volatile_acidity },
    { name: 'Sulphates', importance: 0.70, value: wineData.sulphates },
    { name: 'Citric Acid', importance: 0.65, value: wineData.citric_acid },
    { name: 'Total SO2', importance: 0.60, value: wineData.total_sulfur_dioxide }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <BarChart className="h-6 w-6 text-red-700" />
        <h3 className="ml-2 text-lg font-semibold text-gray-900">
          Feature Importance
        </h3>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{feature.name}</span>
              <span>{feature.value.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-700 h-2.5 rounded-full"
                style={{ width: `${feature.importance * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Bars indicate the relative importance of each feature in determining wine quality.
        </p>
      </div>
    </div>
  );
};

export default FeatureImportance;