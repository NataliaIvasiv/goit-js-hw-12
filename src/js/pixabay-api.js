import axios from "axios";
export async function fetchImages(keyWord) {
    const API_KEY = '42236651-09dd8ef8cae726de85d6e38a7'
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api';
    const Parameters = {
        key: API_KEY,
        q: keyWord,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        // page: currentPage,
    }
        
    const url = `${BASE_URL}${END_POINT}`;
  

    const response = await axios.get(url, {Parameters})
    return response.data;
}