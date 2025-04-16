import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Filter, Plus, Search } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import anime from 'animejs';

interface Task {
  id: number;
  title: string;
  assignee: string;
  progress: number;
  type: string;
  dueDate: string;
  isImportant: boolean;
  avatarUrl: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Pitx App 3d Icon Design",
      assignee: "Ujkmal",
      progress: 54,
      type: "Team",
      dueDate: "3d",
      isImportant: true,
      avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100"
    },
    {
      id: 2,
      title: "Hub Flow Video",
      assignee: "Lima",
      progress: 32,
      type: "Team",
      dueDate: "1d",
      isImportant: false,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
      id: 3,
      title: "Hip App Flow Work",
      assignee: "Hatik",
      progress: 78,
      type: "Meeting",
      dueDate: "3d",
      isImportant: true,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
    },
    {
      id: 4,
      title: "Website Redesign",
      assignee: "Sarah",
      progress: 45,
      type: "Design",
      dueDate: "5d",
      isImportant: true,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    {
      id: 5,
      title: "Mobile App Testing",
      assignee: "Mike",
      progress: 90,
      type: "QA",
      dueDate: "1d",
      isImportant: false,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    }
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTasks = tasks.filter(task => {
    // Apply type filter
    if (filter !== 'all' && filter === 'important') {
      if (!task.isImportant) return false;
    } else if (filter !== 'all' && task.type.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  useEffect(() => {
    // Animate task cards when they load or when filter changes
    anime({
      targets: '.task-list-item',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50),
      easing: 'easeOutQuad'
    });
  }, [filter, searchTerm]);

  return (
    <main className="mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
        <Link 
          to="/"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-full text-sm ${filter === 'all' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm ${filter === 'team' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'}`}
              onClick={() => setFilter('team')}
            >
              Team
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm ${filter === 'meeting' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'}`}
              onClick={() => setFilter('meeting')}
            >
              Meeting
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm ${filter === 'important' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'}`}
              onClick={() => setFilter('important')}
            >
              Important
            </button>
            <button className="p-2 bg-gray-50 rounded-full">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className="task-list-item">
                <Link to={`/tasks/${task.id}`} className="block">
                  <TaskCard task={task} />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No tasks found matching your filters
            </div>
          )}
          
          <button className="w-full py-3 mt-4 bg-white border border-dashed border-emerald-300 rounded-xl text-emerald-600 font-medium flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
            <Plus className="w-5 h-5" /> New Task
          </button>
        </div>
      </div>
    </main>
  );
};

export default TaskList;