import React, { useState } from 'react';
import { Event } from '../types';
import { generateEventDescription, generateEventImage } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import SparklesIcon from '../components/icons/SparklesIcon';

interface CreateEventProps {
  onEventCreate: (event: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onEventCreate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/seed/placeholder/1200/675');
  
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDescription = async () => {
    if (!title) {
      setError('Please enter an event title first.');
      return;
    }
    setError(null);
    setIsGeneratingDesc(true);
    try {
      const generatedDesc = await generateEventDescription(title);
      setDescription(generatedDesc);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) {
      setError('Please enter a prompt for the image.');
      return;
    }
    setError(null);
    setIsGeneratingImg(true);
    try {
      const base64Image = await generateEventImage(imagePrompt);
      setImageUrl(`data:image/jpeg;base64,${base64Image}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date || !location) {
        setError("Please fill out all required fields.");
        return;
    }
    onEventCreate({ title, description, date, location, imageUrl });
  };

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-8">Create a New Event</h1>
        {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-8 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-6">Event Details</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" placeholder="e.g., Annual Tech Summit" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" placeholder="e.g., City Conference Center" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={6} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" placeholder="Tell us about your event..."></textarea>
                        <button type="button" onClick={handleGenerateDescription} disabled={isGeneratingDesc} className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isGeneratingDesc ? <LoadingSpinner /> : <SparklesIcon className="w-5 h-5" />}
                            {isGeneratingDesc ? 'Generating...' : 'Generate with AI'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-6">AI Banner Generation</h2>
                <img src={imageUrl} alt="Event Banner" className="w-full h-64 object-cover rounded-lg mb-4 bg-gray-700" />
                <div>
                    <label htmlFor="imagePrompt" className="block text-sm font-medium text-gray-300 mb-2">Image Prompt</label>
                    <div className="flex gap-4">
                        <input type="text" id="imagePrompt" value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" placeholder="e.g., A futuristic city skyline at sunset"/>
                        <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImg} className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed">
                             {isGeneratingImg ? <LoadingSpinner /> : <SparklesIcon className="w-5 h-5" />}
                             {isGeneratingImg ? 'Generating...' : 'Generate Image'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-2 px-6 rounded-lg transition-colors">Create Event</button>
            </div>
        </form>
    </div>
  );
};

export default CreateEvent;
