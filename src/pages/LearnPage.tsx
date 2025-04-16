import React from 'react';
import { Brain, LineChart, Wine, Database } from 'lucide-react';

const LearnPage = () => {
  return (
    <div className="pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Understanding Wine Quality Prediction
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Learn how our AI system analyzes and predicts wine quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Brain className="h-8 w-8 text-red-700" />
              <h2 className="ml-3 text-2xl font-bold text-gray-900">The AI Model</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our AI model uses advanced machine learning techniques to analyze various chemical properties of wine and predict its quality score. The model has been trained on thousands of wine samples with expert ratings.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Gradient Boosting Decision Trees</li>
              <li>Deep Neural Networks</li>
              <li>Ensemble Learning Methods</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-red-700" />
              <h2 className="ml-3 text-2xl font-bold text-gray-900">Training Data</h2>
            </div>
            <p className="text-gray-600 mb-4">
              The model is trained on a comprehensive dataset of wine samples, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Chemical composition analysis</li>
              <li>Expert sommelier ratings</li>
              <li>Vintage and regional data</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <LineChart className="h-8 w-8 text-red-700" />
              <h2 className="ml-3 text-2xl font-bold text-gray-900">Feature Importance</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Key factors that influence wine quality predictions:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Alcohol content</li>
              <li>Acidity levels</li>
              <li>Sulfur dioxide concentration</li>
              <li>pH balance</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Wine className="h-8 w-8 text-red-700" />
              <h2 className="ml-3 text-2xl font-bold text-gray-900">Quality Metrics</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Understanding the quality score:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Scores range from 0 to 10</li>
              <li>Based on expert tasting notes</li>
              <li>Considers multiple quality factors</li>
              <li>Validated against sommelier ratings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;