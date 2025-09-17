import React from 'react';
import { Event } from '../types';
import EventCard from '../components/EventCard';

interface DashboardProps {
  events: Event[];
  onNavigate: (page: 'create' | 'detail', eventId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ events, onNavigate }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Upcoming Events</h1>
        <p className="mt-4 text-xl text-gray-400">Discover and manage your next big event with the power of AI.</p>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} onClick={() => onNavigate('detail', event.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold text-white">No Events Found</h2>
            <p className="text-gray-400 mt-2">Get started by creating a new event.</p>
            <button
              onClick={() => onNavigate('create')}
              className="mt-6 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Create Your First Event
            </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
