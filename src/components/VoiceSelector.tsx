import React from 'react';
import { Search, Volume2 } from 'lucide-react';
import { Voice } from '../types';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function VoiceSelector() {
  const { voices, selectedVoice, setSelectedVoice } = useStore();
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({
    language: '',
    gender: '',
    country: '',
  });

  const filteredVoices = voices.filter((voice) => {
    const matchesSearch = voice.name.toLowerCase().includes(search.toLowerCase()) ||
      voice.language.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = !filters.language || voice.language === filters.language;
    const matchesGender = !filters.gender || voice.gender === filters.gender;
    const matchesCountry = !filters.country || voice.country === filters.country;
    return matchesSearch && matchesLanguage && matchesGender && matchesCountry;
  });

  const languages = Array.from(new Set(voices.map((v) => v.language)));
  const countries = Array.from(new Set(voices.map((v) => v.country)));

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search voices..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <select
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[400px] overflow-y-auto p-6">
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVoices.map((voice, index) => (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <VoiceCard
                  voice={voice}
                  isSelected={selectedVoice?.id === voice.id}
                  onSelect={() => setSelectedVoice(voice)}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VoiceCard({ voice, isSelected, onSelect }: {
  voice: Voice;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handlePreview = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(voice.preview_url);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-black text-white'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{voice.name}</h3>
          <p className="text-sm opacity-75">{voice.language}</p>
          <p className="text-sm opacity-75">{voice.country}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePreview();
          }}
          className={`p-2 rounded-full ${
            isSelected
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-black text-white hover:bg-gray-900'
          }`}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}