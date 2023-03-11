import axios from 'axios';

const API_KEY = '32891390-a52999f78b5dd379dfcc20192';
const BASE_URL = 'https://pixabay.com/api/';
const per_page = 12;

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return data;
};
