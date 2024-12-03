import { Voice } from '../types';

export const voices: Voice[] = [
  {
    id: "en_us_001",
    name: "Matthew",
    gender: "male",
    language: "English",
    country: "United States",
    preview_url: "https://api.verbatik.com/v1/preview/en_us_001.mp3"
  },
  {
    id: "en_us_002",
    name: "Emma",
    gender: "female",
    language: "English",
    country: "United States",
    preview_url: "https://api.verbatik.com/v1/preview/en_us_002.mp3"
  },
  {
    id: "en_uk_001",
    name: "James",
    gender: "male",
    language: "English",
    country: "United Kingdom",
    preview_url: "https://api.verbatik.com/v1/preview/en_uk_001.mp3"
  },
  {
    id: "fr_fr_001",
    name: "Sophie",
    gender: "female",
    language: "French",
    country: "France",
    preview_url: "https://api.verbatik.com/v1/preview/fr_fr_001.mp3"
  },
  // Add more voices here...
  // The full list would include 400+ voices from the Verbatik API
];