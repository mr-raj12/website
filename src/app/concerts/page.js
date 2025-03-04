"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Music, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const concerts = [
  {
    id: 1,
    name: 'EDM Night',
    artist: 'DJ Neptune',
    date: 'March 15, 2025',
    time: '8:00 PM',
    venue: 'Main Ground',
    description: 'Experience an electrifying night of electronic dance music with heart-pounding beats and mesmerizing visuals.',
    image: '/revealing-soon.jpg',
    day: 1,
    genre: 'Electronic'
  },
  {
    id: 2,
    name: 'Rock Night',
    artist: 'The Meteors',
    date: 'March 16, 2025',
    time: '8:00 PM',
    venue: 'Main Ground',
    description: 'Get ready for an explosive night of rock music featuring powerful performances and unforgettable moments.',
    image: '/revealing-soon.jpg',
    day: 2,
    genre: 'Rock'
  },
  {
    id: 3,
    name: 'Bollywood Night',
    artist: 'Star Performer',
    date: 'March 17, 2025',
    time: '8:00 PM',
    venue: 'Main Ground',
    description: 'Celebrate the grand finale with Bollywood hits and a spectacular fusion of music and dance.',
    image: '/revealing-soon.jpg',
    day: 3,
    genre: 'Bollywood'
  }
];

export default function ConcertsPage() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#1F1033] overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Concert Nights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three unforgettable nights of music, energy, and pure entertainment
          </p>
        </motion.div>

        {/* Day Selection */}
        <div className="flex justify-center gap-4 mb-16">
          {[1, 2, 3].map((day) => (
            <motion.button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300 ${
                selectedDay === day
                  ? 'bg-white/10 border-purple-500/50 border-2 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 border-transparent border-2 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Day</span>
              <div className="text-2xl font-bold">{day}</div>
            </motion.button>
          ))}
        </div>

        {/* Concert Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8"
          >
            {concerts
              .filter((concert) => concert.day === selectedDay)
              .map((concert) => (
                <motion.div
                  key={concert.id}
                  className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-auto overflow-hidden">
                      <Image
                        src={concert.image}
                        alt={concert.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent opacity-80" />
                    </div>
                    <div className="p-8 md:w-3/5 relative">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium backdrop-blur-md">
                          Day {concert.day}
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium backdrop-blur-md">
                          {concert.genre}
                        </span>
                      </div>
                      <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        {concert.artist}
                      </h2>
                      <h3 className="text-xl text-purple-400 mb-4">{concert.name}</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">{concert.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          {concert.date}
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                          <Clock className="w-4 h-4 text-purple-400" />
                          {concert.time}
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          {concert.venue}
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                          <Star className="w-4 h-4 text-purple-400" />
                          Live Performance
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-purple-500/20"
                      >
                        Book Your Spot
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
