import React from 'react';
import { toast } from 'react-hot-toast';
import { Play } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateSpeech } from '../utils/api';

const MAX_CHARS = 2000;

export function TextInput() {
  const [text, setText] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { selectedVoice, addGeneratedAudio } = useStore();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    if (!selectedVoice) {
      toast.error('Please select a voice');
      return;
    }

    setIsGenerating(true);
    try {
      const audioUrl = await generateSpeech(text, selectedVoice.id);
      addGeneratedAudio({
        id: Date.now().toString(),
        text,
        voice: selectedVoice,
        audioUrl,
        timestamp: Date.now(),
      });
      toast.success('Audio generated successfully');
    } catch (error) {
      toast.error('Failed to generate audio');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="relative">
        <textarea
          className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {text.length}/{MAX_CHARS}
        </div>
      </div>

      <button
        className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${
          isGenerating
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-900'
        }`}
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        <Play className="w-5 h-5" />
        <span>{isGenerating ? 'Generating...' : 'Generate Audio'}</span>
      </button>
    </div>
  );
}