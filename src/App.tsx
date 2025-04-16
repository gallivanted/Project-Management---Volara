import React, { useState } from 'react';
import { Calendar, Clock, Plus, Users, ChevronRight, Bell } from 'lucide-react';
import { TaskCard } from './components/TaskCard';
import { StatsCard } from './components/StatsCard';
import { Header } from './components/Header';
import { DoneTasksList } from './components/DoneTasksList';
import { MembersSection } from './components/MembersSection';

function App() {
  const [view, setView] = useState<'personal' | 'work'>('personal');
  
  const currentDate = new Date();
  const dateString = currentDate.toLocaleString('en-US', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: 'numeric'
  }).toUpperCase();

  const tasks = [
    {
      id: 1,
      title: "Pitx App 3d Icon Design",
      assignee: "Ujkmal",
      progress: 54,
      type: "Meeting",
      dueDate: "3d",
      isImportant: true,
      avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100"
    },
    {
      id: 2,
      title: "Hub Flow Video",
      assignee: "Lima",
      progress: 32,
      type: "Video",
      dueDate: "1d",
      isImportant: false,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Today Plans Section */}
            <section className="bg-emerald-700 rounded-2xl p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold mb-6">Your Today Plans (5)</h1>
                  <div className="space-y-2">
                    <div className="text-emerald-100">{dateString}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">TEAM WORK</span>
                      <span className="text-emerald-200">6 Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">MY WORK</span>
                      <span className="text-emerald-200">3d And Vide Editing</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Bell className="w-6 h-6" />
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100"
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                </div>
              </div>
            </section>

            {/* Tasks Section */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Today Tasks</h2>
                <button className="text-emerald-600 flex items-center gap-2">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>

            <StatsCard view={view} onViewChange={setView} />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <DoneTasksList />
            <MembersSection />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;