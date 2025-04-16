import React from 'react';
import { Code, Database, LineChart } from 'lucide-react';

const About = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The Science Behind Our AI
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 lg:mx-auto">
            Our advanced AI system combines machine learning with expert knowledge to deliver accurate wine quality predictions.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
                <Database className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Rich Dataset</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Trained on thousands of wine samples with expert ratings and chemical analysis.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
                <Code className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Advanced Algorithms</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                State-of-the-art machine learning models for accurate quality predictions.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
                <LineChart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Real-time Analysis</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Instant predictions and insights about your wine's quality factors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;