import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import anime from 'animejs';
import { useEffect } from 'react';

const Layout: React.FC = () => {
  useEffect(() => {
    // Animate page transition when layout mounts
    anime({
      targets: '.page-container',
      opacity: [0, 1],
      translateY: [10, 0],
      easing: 'easeOutQuad',
      duration: 500
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;