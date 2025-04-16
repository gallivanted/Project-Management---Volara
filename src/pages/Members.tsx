import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, UserPlus } from 'lucide-react';
import anime from 'animejs';

interface Member {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  tasks: number;
}

const Members: React.FC = () => {
  const [members, setMembers] = React.useState<Member[]>([
    {
      id: 1,
      name: "Ujkmal",
      role: "UI Designer",
      email: "ujkmal@volara.com",
      avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100",
      tasks: 8
    },
    {
      id: 2,
      name: "Lima",
      role: "Product Manager",
      email: "lima@volara.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      tasks: 12
    },
    {
      id: 3,
      name: "Hatik",
      role: "Developer",
      email: "hatik@volara.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      tasks: 5
    },
    {
      id: 4,
      name: "Sarah",
      role: "UX Researcher",
      email: "sarah@volara.com",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      tasks: 7
    },
    {
      id: 5,
      name: "Mike",
      role: "QA Engineer",
      email: "mike@volara.com",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      tasks: 9
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const filteredMembers = members.filter(member => {
    if (searchTerm === '') return true;
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    // Animate member cards when they load
    anime({
      targets: '.member-card',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50),
      easing: 'easeOutQuad'
    });
  }, [searchTerm]);

  return (
    <main className="mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
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
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.length > 0 ? (
            filteredMembers.map(member => (
              <div key={member.id} className="member-card bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-sm text-gray-500 mt-1">{member.email}</p>
                    <div className="mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm inline-block">
                      {member.tasks} Tasks
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No members found matching your search
            </div>
          )}
          
          <button className="member-card flex flex-col items-center justify-center p-8 border border-dashed border-emerald-300 rounded-xl text-emerald-600 font-medium hover:bg-emerald-50 transition-colors">
            <Plus className="w-8 h-8 mb-2" />
            <span>Add New Member</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Members;