import React, { useState } from 'react';
import { LineChart, ArrowRight, Wine } from 'lucide-react';
import WineForm from '../components/WineForm';
import PredictionResult from '../components/PredictionResult';
import FeatureImportance from '../components/FeatureImportance';
import WineComparison from '../components/WineComparison';
import WineQualityTrends from '../components/WineQualityTrends';

export interface WineData {
  alcohol: number;
  volatile_acidity: number;
  sulphates: number;
  citric_acid: number;
  total_sulfur_dioxide: number;
  density: number;
  fixed_acidity: number;
  residual_sugar: number;
  chlorides: number;
  free_sulfur_dioxide: number;
  pH: number;
}

const initialWineData: WineData = {
  alcohol: 11.5,
  volatile_acidity: 0.5,
  sulphates: 0.6,
  citric_acid: 0.3,
  total_sulfur_dioxide: 100,
  density: 0.996,
  fixed_acidity: 7.4,
  residual_sugar: 2.0,
  chlorides: 0.088,
  free_sulfur_dioxide: 25,
  pH: 3.4,
};

// Wine quality prediction algorithm
const predictWineQuality = (data: WineData): number => {
  // Weights for each feature based on importance
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
    const value = data[property as keyof WineData];
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

const PredictPage = () => {
  const [wineData, setWineData] = useState<WineData>(initialWineData);
  const [predictionScore, setPredictionScore] = useState<number | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonData, setComparisonData] = useState<WineData | null>(null);

  const handlePredict = (data: WineData) => {
    const score = predictWineQuality(data);
    setPredictionScore(Number(score.toFixed(1)));
    setWineData(data);
  };

  const handleCompare = (data: WineData) => {
    const score = predictWineQuality(data);
    setComparisonData(data);
  };

  return (
    <div className="pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Wine Quality Prediction
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Enter your wine's characteristics to get an AI-powered quality prediction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <WineForm
              initialData={wineData}
              onSubmit={handlePredict}
              isComparison={false}
            />
          </div>

          {predictionScore !== null && (
            <div className="space-y-8">
              <PredictionResult score={predictionScore} />
              <FeatureImportance wineData={wineData} />
            </div>
          )}
        </div>

        {predictionScore !== null && (
          <div className="mt-8">
            <WineQualityTrends wineData={wineData} score={predictionScore} />
          </div>
        )}

        {predictionScore !== null && !comparisonMode && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setComparisonMode(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Compare with Another Wine
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {comparisonMode && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wine Comparison</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WineForm
                initialData={initialWineData}
                onSubmit={handleCompare}
                isComparison={true}
              />
              {comparisonData && (
                <WineComparison
                  wine1={wineData}
                  wine2={comparisonData}
                  score1={predictionScore}
                  score2={predictWineQuality(comparisonData)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictPage;