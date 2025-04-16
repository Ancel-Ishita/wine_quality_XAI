import React from 'react';
import FeatureBarGraph from './FeatureBarGraph';
import QualityAlcoholGraph from './QualityAlcoholGraph';
import QualityVolatileAcidityGraph from './QualityVolatileAcidityGraph';
import { BarChart, Wine, FlaskRound as Flask } from 'lucide-react';
import type { WineData } from '../pages/PredictPage';

interface WineQualityTrendsProps {
  wineData: WineData;
  score: number;
}

const WineQualityTrends: React.FC<WineQualityTrendsProps> = ({ wineData, score }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="pt-6 border-t border-gray-200 mb-6">
        <div className="flex items-center mb-4">
          <BarChart className="h-6 w-6 text-primary-600" />
          <h3 className="ml-2 text-lg font-semibold text-gray-900">
            Feature Analysis
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          This graph shows how your wine's characteristics compare to ideal ranges.
        </p>
        <div className="h-64 w-full">
          <FeatureBarGraph 
            wineData={wineData} 
            width={600} 
            height={250} 
          />
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200 mb-6">
        <div className="flex items-center mb-4">
          <Wine className="h-6 w-6 text-primary-600" />
          <h3 className="ml-2 text-lg font-semibold text-gray-900">
            Wine Quality vs. Alcohol Content
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          This graph shows how alcohol content affects the predicted quality score while keeping other properties constant.
        </p>
        <div className="h-64 w-full">
          <QualityAlcoholGraph 
            wineData={wineData} 
            score={score} 
            width={600} 
            height={250} 
          />
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <Flask className="h-6 w-6 text-primary-600" />
          <h3 className="ml-2 text-lg font-semibold text-gray-900">
            Wine Quality vs. Volatile Acidity
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          This graph shows how volatile acidity affects the predicted quality score while keeping other properties constant.
        </p>
        <div className="h-64 w-full">
          <QualityVolatileAcidityGraph 
            wineData={wineData} 
            score={score} 
            width={600} 
            height={250} 
          />
        </div>
      </div>
    </div>
  );
};

export default WineQualityTrends;