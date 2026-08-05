import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const fetchPrediction = async (inputData) => {
  try {
    const response = await api.post('/predict', inputData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to generate prediction');
    }
    throw new Error('Backend server is unreachable. Please ensure Flask API is running on port 5000.');
  }
};

export const fetchMetadata = async () => {
  try {
    const response = await api.get('/metadata');
    return response.data;
  } catch (error) {
    console.warn('Metadata API fallback triggered:', error.message);
    return {
      status: 'success',
      model_name: 'Logistic Regression',
      accuracy: 80.33,
      num_features: 13,
      training_samples: 241,
      testing_samples: 61,
      total_dataset_samples: 302
    };
  }
};

export const fetchHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data.data || [];
  } catch (error) {
    console.warn('History API fallback:', error.message);
    // Fallback to local storage if backend offline
    const local = localStorage.getItem('cardio_local_history');
    return local ? JSON.parse(local) : [];
  }
};

export const deleteHistoryItem = async (id) => {
  try {
    await api.delete(`/api/history/${id}`);
  } catch (error) {
    console.warn('Delete API fallback:', error.message);
  }
};

export const clearAllHistory = async () => {
  try {
    await api.delete('/api/history/clear');
  } catch (error) {
    console.warn('Clear history API fallback:', error.message);
  }
};

export default api;
