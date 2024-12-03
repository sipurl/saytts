import React from 'react';
import { motion } from 'framer-motion';
import { TextInput } from '../components/TextInput';
import { VoiceSelector } from '../components/VoiceSelector';
import { AudioPlayer } from '../components/AudioPlayer';
import { About } from '../components/sections/About';
import { Tutorial } from '../components/sections/Tutorial';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/Footer';
import { useStore } from '../store/useStore';
import { useVoices } from '../hooks/useVoices';

export function Home() {
  const { generatedAudios } = useStore();
  useVoices(); // Initialize voices

  return (
    <>
      <main className="min-h-screen">
        <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Premium Text-to-Speech
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                  Transform your text into natural-sounding speech with our advanced AI technology
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TextInput />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold">Select a Voice</h2>
                <VoiceSelector />
              </motion.div>

              {generatedAudios.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="sticky top-20 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm z-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Generated Audio</h2>
                      <p className="text-sm text-gray-500">
                        History will be cleared on page refresh
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {generatedAudios.map((audio) => (
                      <AudioPlayer key={audio.id} audio={audio} />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <About />
        <Tutorial />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}