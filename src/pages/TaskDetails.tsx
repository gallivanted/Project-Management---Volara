import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Edit2, Trash2, Users } from 'lucide-react';
import anime from 'animejs';

interface Member {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  progress: number;
  type: string;
  dueDate: string;
  isImportant: boolean;
  avatarUrl: string;
  description?: string;
  members?: Member[];
}

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching task data
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockTask: Task = {
        id: Number(taskId),
        title: "Pitx App 3d Icon Design",
        assignee: "Ujkmal",
        progress: 54,
        type: "Team",
        dueDate: "3 days",
        isImportant: true,
        avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100",
        description: "Create 3D icons for the Pitx application. The icons should be modern, sleek, and follow the brand guidelines. Use the color palette provided in the design system.",
        members: [
          {
            id: 1,
            name: "Ujkmal",
            avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100"
          },
          {
            id: 2,
            name: "Lima",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
          },
          {
            id: 3,
            name: "Hatik",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
          }
        ]
      };
      
      setTask(mockTask);
      setLoading(false);
    }, 500);
  }, [taskId]);

  useEffect(() => {
    if (!loading) {
      // Animate elements when task data is loaded
      anime({
        targets: '.task-detail-element',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
      });

      // Animate progress bar
      anime({
        targets: '.progress-bar-fill',
        width: `${task?.progress}%`,
        easing: 'easeInOutQuad',
        duration: 1000
      });
    }
  }, [loading, task]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Task not found</h2>
        <button 
          onClick={handleGoBack}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="mt-8">
      <button 
        onClick={handleGoBack}
        className="mb-6 flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors task-detail-element"
      >
        <ArrowLeft className="w-4 h-4" /> Back to tasks
      </button>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm task-detail-element">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                {task.type}
              </span>
              {task.isImportant && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Important
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mt-3">{task.title}</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Trash2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="mb-8 task-detail-element">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Due: {task.dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Created: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <img
              src={task.avatarUrl}
              alt={task.assignee}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">Assigned to {task.assignee}</span>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div className="progress-bar-fill bg-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mb-8 task-detail-element">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{task.description}</p>
        </div>
        
        <div className="task-detail-element">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" /> Team Members
          </h2>
          <div className="flex flex-wrap gap-4">
            {task.members?.map(member => (
              <div key={member.id} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetails;