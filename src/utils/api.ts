import { toast } from 'react-hot-toast';

const API_ENDPOINT = 'https://api.verbatik.com/v1';
const API_KEY = import.meta.env.VITE_VERBATIK_API_KEY;

if (!API_KEY) {
  console.error('Missing API key. Please add VITE_VERBATIK_API_KEY to your environment variables.');
}

export async function generateSpeech(text: string, voiceId: string): Promise<string> {
  try {
    const response = await fetch(`${API_ENDPOINT}/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        text,
        voice_id: voiceId,
        output_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate speech');
    }

    const data = await response.json();
    return data.audio_url;
  } catch (error) {
    console.error('Error generating speech:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to generate speech');
    throw error;
  }
}