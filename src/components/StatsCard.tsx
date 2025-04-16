import React from 'react';
import { LineChart, Filter } from 'lucide-react';

interface StatsCardProps {
  view: 'personal' | 'work';
  onViewChange: (view: 'personal' | 'work') => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({ view, onViewChange }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Stats</h2>
          <LineChart className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            view === 'personal'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-gray-50 text-gray-600'
          }`}
          onClick={() => onViewChange('personal')}
        >
          Personal
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            view === 'work'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-gray-50 text-gray-600'
          }`}
          onClick={() => onViewChange('work')}
        >
          Work
        </button>
      </div>

      <div className="bg-emerald-700 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Work Overview</h3>
        <div className="h-40 flex items-end justify-between">
          {/* Placeholder for chart - would use a proper charting library in production */}
          <div className="w-8 bg-emerald-500 h-20 rounded-t-lg opacity-70"></div>
          <div className="w-8 bg-emerald-500 h-32 rounded-t-lg opacity-70"></div>
          <div className="w-8 bg-emerald-500 h-16 rounded-t-lg opacity-70"></div>
          <div className="w-8 bg-emerald-500 h-24 rounded-t-lg opacity-70"></div>
          <div className="w-8 bg-emerald-500 h-28 rounded-t-lg opacity-70"></div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="text-emerald-200 text-sm">PRODUCTIVE</div>
            <div className="text-2xl font-bold">56%</div>
          </div>
          <div>
            <div className="text-emerald-200 text-sm">COMPLETION</div>
            <div className="text-2xl font-bold">22%</div>
          </div>
        </div>
      </div>
    </section>
  );
};