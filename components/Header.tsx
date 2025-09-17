import React from 'react';

interface HeaderProps {
  onNavigate: (page: 'dashboard' | 'create') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => onNavigate('dashboard')} className="flex-shrink-0 text-white flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue text-transparent bg-clip-text">
                Aether Events
              </span>
            </button>
          </div>
          <div className="flex items-center">
             <button
              onClick={() => onNavigate('create')}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Create Event
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
