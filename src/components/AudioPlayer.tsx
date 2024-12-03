import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Download } from 'lucide-react';
import { GeneratedAudio } from '../types';
import { toast } from 'react-hot-toast';

export function AudioPlayer({ audio }: { audio: GeneratedAudio }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const waveformRef = React.useRef<HTMLDivElement>(null);
  const wavesurferRef = React.useRef<WaveSurfer | null>(null);

  React.useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D1D5DB',
        progressColor: '#000000',
        cursorColor: '#000000',
        barWidth: 2,
        barGap: 1,
        responsive: true,
        height: 60,
        backend: 'WebAudio',
      });

      wavesurferRef.current.on('ready', () => {
        setDuration(wavesurferRef.current?.getDuration() || 0);
        setIsLoading(false);
      });

      wavesurferRef.current.on('audioprocess', () => {
        setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0);
      });

      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false);
      });

      wavesurferRef.current.on('error', (error) => {
        console.error('WaveSurfer error:', error);
        toast.error('Error loading audio');
        setIsLoading(false);
      });

      // Load audio with error handling
      try {
        wavesurferRef.current.load(audio.audioUrl);
      } catch (error) {
        console.error('Error loading audio:', error);
        toast.error('Error loading audio');
        setIsLoading(false);
      }
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audio.audioUrl]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(audio.audioUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audio-${audio.id}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download audio');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{audio.voice.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(audio.timestamp).toLocaleString()}
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="p-2 rounded-full hover:bg-gray-100"
          disabled={isLoading}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <div ref={waveformRef} />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className={`p-3 rounded-full ${
            isLoading 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-900'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      <p className="text-sm text-gray-700 line-clamp-3">{audio.text}</p>
    </div>
  );
}