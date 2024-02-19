import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { imagesTemplate } from "./js/render-functions";


const form = document.querySelector('form');
const imagesList = document.querySelector(".gallery")
const loader = document.querySelector(".loader")
const loadButton = document.querySelector(".load-btn")

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};
let gallery = new SimpleLightbox('.gallery a', options);
gallery.on('show.simplelightbox');

let keyWord;
let page;
let maxPage;


form.addEventListener('submit', onFormSubmit);
loadButton.addEventListener('click', onLoadMoreButton);


async function onFormSubmit(event) {
        event.preventDefault();
    imagesList.innerHTML = '';
    page = 1;

    keyWord = event.target.elements.search.value.trim();
    showLoader();

    if (!keyWord) {
    iziToast.warning({
        title: 'Caution',
        position: "topLeft",
    message: 'This field is required',
    });
        hideLoader();
    return;
  }
    try {
        const images = await fetchImages(keyWord, page);
        maxPage = Math.ceil(images.total / 15);
        
        renderImages(images);
             
    
    gallery.refresh();
        hideLoader();

        checkTheOnlyPage();
       showEmptySearchResult(images);
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
   hideLoadMore() }
}


function renderImages(images) {
    const markup = imagesTemplate(images);
    imagesList.insertAdjacentHTML('beforeend', markup)
}


async function onLoadMoreButton(event) {
    hideLoadMore();
    showLoader();
    page += 1;
        const images = await fetchImages(keyWord, page);
            renderImages(images);
             
    gallery.refresh();
    hideLoader();
        showLoadMore();
    checkGalleryEnd();

    scroll();
}



function checkTheOnlyPage() {
    if (page != maxPage) {
        showLoadMore();
    }
}

function checkGalleryEnd() {
    if (page >= maxPage) {
        hideLoadMore();
       iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
          
    position: 'topRight'
});

    }
}
function showLoader() {
    loader.classList.remove('is-hidden');
}
function hideLoader() {
    loader.classList.add('is-hidden');
}
function showLoadMore() {
    loadButton.classList.remove('is-hidden');
}

function hideLoadMore() {
    loadButton.classList.add('is-hidden')
}


function scroll() {
     const height =
    imagesList.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: `${2 * height}`,
  });
}

