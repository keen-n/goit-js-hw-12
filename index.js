import{a as y,S as b,i}from"./assets/vendor-KnZd4sWe.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();const L="49129723-e1a4448186c17e12c6eff5cb4",w="https://pixabay.com/api/";async function h(r,e=1,d=40){try{return(await y.get(w,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:d,page:e}})).data}catch(s){throw console.error("Помилка під час запиту:",s),s}}function m(r){return r.map(e=>`
    <div class="photo-card">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
      </a>
      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </div>
  `).join("")}function g(){new b(".gallery a").refresh()}const v=document.querySelector("#search-form"),p=document.querySelector(".gallery"),c=document.querySelector(".load-more");let a="",n=1;const l=40;let f=0;v.addEventListener("submit",async r=>{if(r.preventDefault(),a=r.target.elements.searchQuery.value.trim(),!a){i.warning({message:"Enter a search term!",position:"topRight"});return}n=1,p.innerHTML="",c.classList.add("hidden");try{const e=await h(a,n,l);if(f=e.totalHits,e.hits.length===0){i.error({message:"No images found!",position:"topRight"});return}p.innerHTML=m(e.hits),g(),f>l&&c.classList.remove("hidden")}catch{i.error({message:"Failed to load images!",position:"topRight"})}});c.addEventListener("click",async()=>{n+=1;try{const r=await h(a,n,l);p.insertAdjacentHTML("beforeend",m(r.hits)),g(),n*l>=f&&(c.classList.add("hidden"),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch{i.error({message:"Error loading more images!",position:"topRight"})}});
//# sourceMappingURL=index.js.map
