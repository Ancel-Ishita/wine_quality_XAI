import React from 'react';
import { Wine } from 'lucide-react';

interface PredictionResultProps {
  score: number;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ score }) => {
  const getQualityLevel = (score: number) => {
    if (score >= 8) return { text: 'Exceptional', color: 'text-green-600' };
    if (score >= 7) return { text: 'Very Good', color: 'text-green-500' };
    if (score >= 6) return { text: 'Good', color: 'text-blue-500' };
    if (score >= 5) return { text: 'Average', color: 'text-yellow-500' };
    return { text: 'Below Average', color: 'text-red-500' };
  };

  const quality = getQualityLevel(score);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center mb-4">
        <Wine className="h-8 w-8 text-primary-600" />
        <h3 className="ml-2 text-xl font-semibold text-gray-900">
          Quality Prediction
        </h3>
      </div>

      <div className="text-center">
        <div className="text-5xl font-bold mb-2">{score}</div>
        <div className={`text-xl font-semibold ${quality.color}`}>
          {quality.text}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Quality Scale</h4>
        <div className="flex justify-between text-sm">
          <span>Poor (0-4)</span>
          <span>Average (5-6)</span>
          <span>Excellent (7-10)</span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary-600 rounded-full"
            style={{ width: `${(score / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;