import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const newsApi = axios.create({
  baseURL: API_BASE_URL,
});


export const getAllNews = async () => {
  try {
    const response = await newsApi.get('/news');
    return response.data; 
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    throw error; 
  }
};


export const addNews = async (newsData) => {
   try {
     // Assuming your backend '/news' POST endpoint adds and returns the new news
     const response = await newsApi.post('/news', newsData);
     return response.data;
   } catch (error) {
     console.error('Error adding news:', error.response?.data || error.message);
     throw error;
   }
};


// Check if a piece of news text is fake
export const checkNewsFake = async (newsText) => {
  try {
    // Assuming backend endpoint '/news/check' takes text and returns detection result
    const response = await newsApi.post('/news/check', { text: newsText });
    return response.data; // e.g., { isFake: true, confidence: 0.9 }
  } catch (error) {
    console.error('Error checking news:', error.response?.data || error.message);
    throw error;
  }
};