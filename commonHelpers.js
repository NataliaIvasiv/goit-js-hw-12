import{S as u,i as p}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const d=document.querySelector("form"),l=document.querySelector(".gallery"),a=document.querySelector(".loader"),f={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250};let c;d.addEventListener("submit",s=>{s.preventDefault(),l.innerHTML="",c=s.target.elements.search.value,a.classList.remove("is-hidden"),h(c).then(r=>{m(r),y(r);let o=new u(".gallery a",f);o.on("show.simplelightbox"),o.refresh(),a.classList.add("is-hidden")}).catch(r=>console.log(r)),s.target.reset()});function m(s){s.total||p.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function h(s){const r="https://pixabay.com",o="/api",i=`?key=42236651-09dd8ef8cae726de85d6e38a7&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`,e=r+o+i;return fetch(e).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}function y(s){const r=s.hits.map(o=>` <a href="${o.largeImageURL}" class="image-card">
    <img src="${o.webformatURL}" alt="${o.tags}"/>
    <div class="caption">
    <ul class="caption-list"><li class="caption-text">Views <span>${o.views}</span></li>
    <li class="caption-text">Likes <span>${o.likes}</span></li>
    <li class="caption-text">Comments <span>${o.comments}</span></li>
    <li class="caption-text">Downloads <span>${o.downloads}</span></li>
    </ul>
    </div>
  </a>`).join("");l.innerHTML=r}
//# sourceMappingURL=commonHelpers.js.map
