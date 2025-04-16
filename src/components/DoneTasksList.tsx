import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

export const DoneTasksList: React.FC = () => {
  const doneTasks = [
    {
      id: 1,
      title: "Video editing",
      assignee: "Klami",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
    },
    {
      id: 2,
      title: "Website Design",
      assignee: "Sarah",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    }
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Done tasks</h2>
        <button className="text-emerald-600 flex items-center gap-2">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        {doneTasks.map(task => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={task.avatarUrl}
                    alt={task.assignee}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-sm text-gray-600">
                    Linked to {task.assignee}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};