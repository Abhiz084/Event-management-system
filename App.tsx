import React, { useState, useCallback } from 'react';
import { Event } from './types';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import Header from './components/Header';

const App: React.FC = () => {
  const [page, setPage] = useState<'dashboard' | 'create' | 'detail'>('dashboard');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Synthwave Nights',
      description: 'An electrifying night of retro-futuristic music and visuals. Get lost in the neon glow and pulsating beats of the best synthwave artists.',
      date: '2024-10-26',
      location: 'Cyberdome, Neo-Tokyo',
      imageUrl: 'https://picsum.photos/seed/synthwave/1200/800',
    },
    {
      id: '2',
      title: 'Tech Innovators Summit',
      description: 'Join industry leaders and visionaries to discuss the future of technology. A day of insightful talks, networking, and groundbreaking demos.',
      date: '2024-11-15',
      location: 'Silicon Valley Convention Center',
      imageUrl: 'https://picsum.photos/seed/tech/1200/800',
    },
    {
      id: '3',
      title: 'Artisan Coffee Workshop',
      description: 'Discover the art of coffee making from bean to cup. A hands-on workshop for enthusiasts and aspiring baristas alike. Taste some of the world\'s finest single-origin coffees.',
      date: '2024-09-30',
      location: 'The Daily Grind, Seattle',
      imageUrl: 'https://picsum.photos/seed/coffee/1200/800',
    },
  ]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleNavigate = useCallback((newPage: 'dashboard' | 'create' | 'detail', eventId?: string) => {
    setPage(newPage);
    if (eventId) {
      setSelectedEventId(eventId);
    } else {
      setSelectedEventId(null);
    }
  }, []);
  
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = { ...event, id: new Date().toISOString() };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
    handleNavigate('dashboard');
  };

  const selectedEvent = events.find(event => event.id === selectedEventId);

  const renderPage = () => {
    switch (page) {
      case 'create':
        return <CreateEvent onEventCreate={addEvent} onCancel={() => handleNavigate('dashboard')} />;
      case 'detail':
        return selectedEvent ? <EventDetail event={selectedEvent} onBack={() => handleNavigate('dashboard')} /> : <Dashboard events={events} onNavigate={handleNavigate} />;
      case 'dashboard':
      default:
        return <Dashboard events={events} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
