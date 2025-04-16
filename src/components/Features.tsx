import React from 'react';
import { Wine, LineChart, Brain, Share2 } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze wine properties to predict quality scores.',
    icon: Brain,
  },
  {
    name: 'Real-time Predictions',
    description: 'Get instant quality predictions and detailed analysis of your wine characteristics.',
    icon: LineChart,
  },
  {
    name: 'Expert Insights',
    description: 'Understand what makes a great wine with explainable AI technology.',
    icon: Wine,
  },
  {
    name: 'Share & Compare',
    description: 'Compare different wines and share insights with other enthusiasts.',
    icon: Share2,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Advanced Wine Analysis Made Simple
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our AI-powered platform provides comprehensive wine quality analysis using cutting-edge technology.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;