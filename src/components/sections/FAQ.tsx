import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "What is the maximum text length I can convert?",
      answer: "You can convert up to 2000 characters per request. For longer texts, we recommend breaking them into smaller segments."
    },
    {
      question: "Are the generated audio files stored permanently?",
      answer: "Generated audio files are temporarily stored in your browser's cache and will be cleared when you refresh the page. We recommend downloading your audio files if you need to keep them."
    },
    {
      question: "Can I use the generated audio for commercial purposes?",
      answer: "Yes, all generated audio can be used for commercial purposes under our standard license. Please refer to our Terms of Service for detailed usage rights."
    },
    {
      question: "How many languages are supported?",
      answer: "We support over 50 languages and multiple regional accents, with new voices being added regularly. You can filter voices by language in the voice selector."
    },
    {
      question: "What audio format is used for the output?",
      answer: "All audio is generated in high-quality MP3 format, optimized for both quality and file size."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our text-to-speech service
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-left">{faq.question}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border border-gray-100 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}