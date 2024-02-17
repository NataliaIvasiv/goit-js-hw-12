

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { imagesTemplate } from "./js/render-functions";


const form = document.querySelector('form');
const imagesList = document.querySelector(".gallery")
const loader = document.querySelector(".loader")


const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};


let keyWord;
form.addEventListener('submit', onFormSubmit)



async function onFormSubmit(event) {
        event.preventDefault();
    imagesList.innerHTML = '';

    keyWord = event.target.elements.search.value.trim();
    loader.classList.remove('is-hidden');

    if (!keyWord) {
    iziToast.warning({
        title: 'Caution',
        position: "topLeft",
    message: 'This field is required',
    });
        loader.classList.add('is-hidden')
    return;
  }
    try {
        const images = await fetchImages(keyWord);
        showEmptySearchResult(images);
            renderImages(images);
             let gallery = new SimpleLightbox('.gallery a', options);
    gallery.on('show.simplelightbox');
    gallery.refresh();
            loader.classList.add('is-hidden');
    } catch (error) {
        console.log(error)
        };
    
    event.target.reset();
    
}


function showEmptySearchResult(images) {
    if (!images.total) {
        iziToast.error({
    title: '',
            message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
});
    }
}


function renderImages(images) {
    const markup = imagesTemplate(images);
    imagesList.insertAdjacentHTML('beforeend', markup)
}











