export function imagesTemplate(images){
    return images.hits
        .map((image) => {
            return ` <a href="${image.largeImageURL}" class="image-card">
    <img src="${image.webformatURL}" alt="${image.tags}"/>
    <div class="caption">
    <ul class="caption-list"><li class="caption-text">Views <span>${image.views}</span></li>
    <li class="caption-text">Likes <span>${image.likes}</span></li>
    <li class="caption-text">Comments <span>${image.comments}</span></li>
    <li class="caption-text">Downloads <span>${image.downloads}</span></li>
    </ul>
    </div>
  </a>`;
        })
        .join("");
   
}
