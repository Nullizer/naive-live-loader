import{f as e}from"./vendor/flv.js-b465a89a.js";import"./vendor/rollup-plugin-node-polyfills-b833fabb.js";const t=document.querySelector.bind(document),a=t("#video_container"),n=t("#main_video"),l=t("#over_area"),r=t("#fs"),o=t("#playpause"),s=t("#mute"),d=t("#volume"),i=t("#stream_url"),u=t("#res");let c;const v=localStorage.getItem("volume");function m(){const e=Number.parseInt(u.value)||n.videoWidth;e&&(a.style.width=e/devicePixelRatio+"px")}function p(){const e=new URLSearchParams(location.search).get("stream");e&&(i.value=e)}n.volume=Number.parseFloat(v)||.1,n.addEventListener("volumechange",()=>{localStorage.setItem("volume",n.volume.toString())}),n.addEventListener("playing",()=>{d.value=(100*n.volume).toString()}),o.addEventListener("click",()=>{n.paused||n.ended?n.play():n.pause()}),s.addEventListener("click",()=>{n.muted=!n.muted}),r.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():a.requestFullscreen()}),d.addEventListener("input",()=>{n.volume=Number.parseInt(d.value)/100}),l.addEventListener("mouseenter",()=>{l.dataset.controlsState="show"}),l.addEventListener("mouseleave",()=>{l.dataset.controlsState="hide"}),u.addEventListener("change",m),n.addEventListener("playing",m),t("#load").addEventListener("submit",t=>{t.preventDefault();const a=i.value=i.value.trim();if(!a)return;c&&(c.detachMediaElement(),c.destroy()),c=e.createPlayer({type:"flv",isLive:!0,url:a}),c.attachMediaElement(n),c.load(),c.play();const l=new URLSearchParams(location.search);l.get("stream")!==a&&(l.set("stream",a),history.pushState(null,"","?"+l))}),window.addEventListener("popstate",p),window.addEventListener("load",p);
