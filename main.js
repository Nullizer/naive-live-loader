import{f as e}from"./vendor/flv.js-b465a89a.js";import"./vendor/rollup-plugin-node-polyfills-b833fabb.js";var t;const a=document.getElementById.bind(document),n=a("video_container"),l=a("main_video"),o=a("over_area"),d=a("fs"),r=a("playpause"),s=a("mute"),i=a("volume"),u=a("stream_url");let v;const m=localStorage.getItem("volume");function c(){const e=new URLSearchParams(location.search).get("stream");e&&(u.value=e)}l.volume=Number.parseFloat(m)||.1,l.addEventListener("volumechange",()=>{localStorage.setItem("volume",l.volume.toString())}),l.addEventListener("playing",()=>{n.style.width=l.videoWidth/devicePixelRatio+"px",i.value=(100*l.volume).toString()}),r.addEventListener("click",()=>{l.paused||l.ended?l.play():l.pause()}),s.addEventListener("click",()=>{l.muted=!l.muted}),d.addEventListener("click",()=>{document.fullscreen?document.exitFullscreen():n.requestFullscreen()}),i.addEventListener("input",()=>{l.volume=Number.parseInt(i.value)/100}),o.addEventListener("mouseenter",e=>{o.dataset.controlsState="show"}),o.addEventListener("mouseleave",e=>{o.dataset.controlsState="hide"}),null===(t=a("load"))||void 0===t||t.addEventListener("submit",t=>{t.preventDefault();const a=u.value;if(v&&(v.detachMediaElement(),v.destroy()),v=e.createPlayer({type:"flv",isLive:!0,url:a},{enableStashBuffer:!1}),v.attachMediaElement(l),v.load(),v.play(),a){new URLSearchParams(location.search).get("stream")!==a&&history.pushState(null,"","?stream="+encodeURIComponent(a))}}),window.addEventListener("popstate",c),window.addEventListener("load",c);
