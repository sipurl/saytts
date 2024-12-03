import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Contact us through any of these channels.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:support@verbatts.com"
                  className="flex items-center space-x-3 text-gray-600 hover:text-black"
                >
                  <Mail className="w-5 h-5" />
                  <span>support@verbatts.com</span>
                </a>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <div className="space-y-2">
                <a href="/privacy" className="block text-gray-600 hover:text-black">Privacy Policy</a>
                <a href="/terms" className="block text-gray-600 hover:text-black">Terms of Service</a>
                <a href="/api-docs" className="block text-gray-600 hover:text-black">API Documentation</a>
                <a href="/pricing" className="block text-gray-600 hover:text-black">Pricing</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}