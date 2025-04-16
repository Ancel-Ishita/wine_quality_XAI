import React, { useState } from 'react';
import type { WineData } from '../pages/PredictPage';

interface WineFormProps {
  initialData: WineData;
  onSubmit: (data: WineData) => void;
  isComparison: boolean;
}

const WineForm: React.FC<WineFormProps> = ({ initialData, onSubmit, isComparison }) => {
  const [formData, setFormData] = useState<WineData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isComparison ? 'Comparison Wine Properties' : 'Wine Properties'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alcohol (%)
          </label>
          <input
            type="number"
            name="alcohol"
            step="0.1"
            value={formData.alcohol}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Volatile Acidity
          </label>
          <input
            type="number"
            name="volatile_acidity"
            step="0.01"
            value={formData.volatile_acidity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sulphates
          </label>
          <input
            type="number"
            name="sulphates"
            step="0.01"
            value={formData.sulphates}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Citric Acid
          </label>
          <input
            type="number"
            name="citric_acid"
            step="0.01"
            value={formData.citric_acid}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Sulfur Dioxide
          </label>
          <input
            type="number"
            name="total_sulfur_dioxide"
            value={formData.total_sulfur_dioxide}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Density
          </label>
          <input
            type="number"
            name="density"
            step="0.0001"
            value={formData.density}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isComparison ? 'Compare Wine' : 'Predict Quality'}
        </button>
      </div>
    </form>
  );
};

export default WineForm;