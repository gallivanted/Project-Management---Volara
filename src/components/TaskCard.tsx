import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface TaskCardProps {
  task: {
    title: string;
    assignee: string;
    progress: number;
    type: string;
    dueDate: string;
    isImportant: boolean;
    avatarUrl: string;
  };
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="w-full bg-gray-100 h-1 rounded-full">
          <div
            className="bg-emerald-500 h-1 rounded-full"
            style={{ width: `${task.progress}%` }}
          />
        </div>
        <span className="absolute right-0 -top-6 text-xs text-gray-500">
          {task.progress}% DONE
        </span>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <img
              src={task.avatarUrl}
              alt={task.assignee}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">
              Linked to {task.assignee}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
          {task.type}
        </span>
        {task.isImportant && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
            Important
          </span>
        )}
        <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm ml-auto">
          {task.dueDate}
        </span>
      </div>
    </div>
  );
};