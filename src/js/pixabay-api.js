import axios from "axios";

const API_KEY = "49129723-e1a4448186c17e12c6eff5cb4";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: perPage,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка під час запиту:", error);
    throw error;
  }
}
