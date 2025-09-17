import React from 'react';
import { Event } from '../types';
import CalendarIcon from '../components/icons/CalendarIcon';
import LocationIcon from '../components/icons/LocationIcon';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timeZone: 'UTC',
    });

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-8 text-brand-blue hover:underline">&larr; Back to all events</button>
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <img className="w-full h-96 object-cover" src={event.imageUrl} alt={event.title} />
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-gray-300 mb-6">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-brand-purple" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <LocationIcon className="w-5 h-5 mr-2 text-brand-purple" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
             {event.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
