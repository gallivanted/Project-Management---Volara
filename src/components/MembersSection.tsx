import React from 'react';
import { Plus } from 'lucide-react';

export const MembersSection: React.FC = () => {
  const members = [
    {
      id: 1,
      name: "John Doe",
      avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100"
    },
    {
      id: 2,
      name: "Jane Smith",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
    }
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Members</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {members.map(member => (
          <img
            key={member.id}
            src={member.avatarUrl}
            alt={member.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        ))}
        <button className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
          <Plus className="w-5 h-5 text-emerald-600" />
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Invite Members
        </label>
        <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          <option value="">Select Members</option>
          <option value="1">John Doe</option>
          <option value="2">Jane Smith</option>
          <option value="3">Mike Johnson</option>
        </select>
      </div>
    </section>
  );
};