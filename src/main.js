import { fetchImages } from "./js/pixabay-api";
import { renderImages, updateLightbox } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 40;
let totalHits = 0;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({ message: "Enter a search term!", position: "topRight" });
    return;
  }

  page = 1;
  gallery.innerHTML = "";
  loadMoreBtn.classList.add("hidden");

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({ message: "No images found!", position: "topRight" });
      return;
    }

    gallery.innerHTML = renderImages(data.hits);
    updateLightbox();

    if (totalHits > perPage) {
      loadMoreBtn.classList.remove("hidden");
    }
  } catch (error) {
    iziToast.error({ message: "Failed to load images!", position: "topRight" });
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  try {
    const data = await fetchImages(query, page, perPage);
    gallery.insertAdjacentHTML("beforeend", renderImages(data.hits));
    updateLightbox();

    if (page * perPage >= totalHits) {
      loadMoreBtn.classList.add("hidden");
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
  } catch (error) {
    iziToast.error({ message: "Error loading more images!", position: "topRight" });
  }
});
