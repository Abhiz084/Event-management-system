import React from 'react';
import { Event } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import LocationIcon from './icons/LocationIcon';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Ensure date is not shifted by local timezone
  });

  return (
    <div 
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-purple/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={event.imageUrl} alt={event.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white tracking-tight">{event.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-400 mb-2">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <p className="text-sm">{formattedDate}</p>
        </div>
        <div className="flex items-center text-gray-400">
          <LocationIcon className="w-4 h-4 mr-2" />
          <p className="text-sm">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
