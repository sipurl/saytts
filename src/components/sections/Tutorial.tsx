import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Type, Mic, Download, PlayCircle } from 'lucide-react';

export function Tutorial() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <Type className="w-6 h-6" />,
      title: "Enter Your Text",
      description: "Type or paste your text into the input field. You can enter up to 2000 characters."
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Choose a Voice",
      description: "Select from our extensive collection of voices. Filter by language, gender, or accent."
    },
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: "Preview and Generate",
      description: "Preview voices before generating. Click 'Generate' to create your audio."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download and Use",
      description: "Download your generated audio in high-quality MP3 format, ready for use."
    }
  ];

  return (
    <section id="tutorial" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to transform your text into natural-sounding speech
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}