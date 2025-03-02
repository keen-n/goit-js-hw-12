import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images) {
  return images
    .map(
      (image) => `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
      </a>
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `
    )
    .join("");
}

export function updateLightbox() {
  const lightbox = new SimpleLightbox(".gallery a");
  lightbox.refresh();
}
