class l{constructor(){this.currentSlide=0,this.slides=[],this.autoPlayInterval=null,this.isTransitioning=!1,this.autoPlayDelay=4e3}init(t){this.slides=t,this.render(),this.setupEventListeners(),this.startAutoPlay()}render(){const t=document.getElementById("certifications-slider"),e=document.getElementById("slide-indicators");if(!t||!e)return;const i=this.slides.map((s,a)=>`
      <div class="certification-slide" data-slide="${a}">
        <div class="cert-content">
          <h3 class="cert-title">${sanitizeInput(s.title)}</h3>
          <p class="cert-issuer">${sanitizeInput(s.issuer)}</p>
          <p class="cert-date">Earned: ${sanitizeInput(s.year)}</p>
          <a href="${s.link}" class="cert-link highlight-link" target="_blank">🔗 View Certificate</a>
        </div>
      </div>
    `).join("");t.innerHTML=i;const n=this.slides.map((s,a)=>`
            <span class="indicator" data-slide="${a}"></span>
        `).join("");e.innerHTML=n,this.updateSlideDisplay()}setupEventListeners(){document.querySelectorAll(".indicator").forEach((i,n)=>{i.addEventListener("click",()=>{this.isTransitioning||this.goToSlide(n)})});const e=document.querySelector(".certifications-slideshow");e&&(e.addEventListener("mouseenter",()=>{this.pauseAutoPlay()}),e.addEventListener("mouseleave",()=>{this.startAutoPlay()})),document.addEventListener("keydown",i=>{i.key==="ArrowLeft"?this.previousSlide():i.key==="ArrowRight"&&this.nextSlide()}),this.setupTouchEvents()}setupTouchEvents(){const t=document.getElementById("certifications-slider");if(!t)return;let e=0,i=0,n=0,s=0;t.addEventListener("touchstart",a=>{e=a.touches[0].clientX,i=a.touches[0].clientY}),t.addEventListener("touchend",a=>{n=a.changedTouches[0].clientX,s=a.changedTouches[0].clientY;const r=e-n,c=i-s;Math.abs(r)>Math.abs(c)&&Math.abs(r)>50&&(r>0?this.nextSlide():this.previousSlide())})}goToSlide(t){if(this.isTransitioning||t===this.currentSlide)return;this.isTransitioning=!0;const e=document.querySelector(".certification-slide.active");e&&e.classList.add("glitch-transition"),setTimeout(()=>{this.currentSlide=t,this.updateSlideDisplay(),this.isTransitioning=!1},250)}nextSlide(){const t=(this.currentSlide+1)%this.slides.length;this.goToSlide(t)}previousSlide(){const t=this.currentSlide===0?this.slides.length-1:this.currentSlide-1;this.goToSlide(t)}updateSlideDisplay(){const t=document.getElementById("certifications-slider"),e=document.querySelectorAll(".indicator");if(!t)return;const i=-this.currentSlide*100;t.style.transform=`translateX(${i}%)`;const n=document.querySelectorAll(".certification-slide");n.forEach((s,a)=>{s.classList.toggle("active",a===this.currentSlide),s.classList.contains("glitch-transition")&&a!==this.currentSlide&&s.classList.remove("glitch-transition")}),e.forEach((s,a)=>{s.classList.toggle("active",a===this.currentSlide)}),setTimeout(()=>{const s=n[this.currentSlide];s&&this.applyCyberEffects(s)},300)}applyCyberEffects(t){const e=t.querySelector(".cert-title"),i=t.querySelector(".cert-image");if(e){const n=e.textContent;e.textContent="",e.style.borderRight="2px solid #00ff00";let s=0;const a=setInterval(()=>{s<n.length?(e.textContent+=n.charAt(s),s++):(clearInterval(a),setTimeout(()=>{e.style.borderRight="none"},500))},50)}i&&this.applyScanLineEffect(i)}applyScanLineEffect(t){const e=document.createElement("div");e.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff00, transparent);
            z-index: 10;
            animation: scan 2s ease-in-out;
        `;const i=document.createElement("style");i.textContent=`
            @keyframes scan {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(150px); opacity: 0; }
            }
        `,document.head.appendChild(i);const n=t.parentElement;n.style.position="relative",n.appendChild(e),setTimeout(()=>{e.parentElement&&e.parentElement.removeChild(e),i.parentElement&&i.parentElement.removeChild(i)},2e3)}startAutoPlay(){this.pauseAutoPlay(),this.autoPlayInterval=setInterval(()=>{this.isTransitioning||this.nextSlide()},this.autoPlayDelay)}pauseAutoPlay(){this.autoPlayInterval&&(clearInterval(this.autoPlayInterval),this.autoPlayInterval=null)}showProgress(){const t=document.createElement("div");t.className="slide-progress",t.style.cssText=`
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: #00ff00;
            width: 0;
            transition: width ${this.autoPlayDelay}ms linear;
        `;const e=document.querySelector(".certifications-slideshow");e&&(e.appendChild(t),setTimeout(()=>{t.style.width="100%"},100),setTimeout(()=>{t.parentElement&&t.parentElement.removeChild(t)},this.autoPlayDelay))}destroy(){this.pauseAutoPlay(),document.removeEventListener("keydown",this.handleKeydown),document.querySelectorAll(".certification-slide").forEach(e=>{e.classList.remove("glitch-transition","active")})}}class d extends l{constructor(){super(),this.glitchEffects=!0,this.scanLineEffects=!0,this.typewriterEffects=!0}applyCyberEffects(t){super.applyCyberEffects(t),this.glitchEffects&&this.applyRandomGlitch(t),this.scanLineEffects&&this.applyTerminalScanlines(t)}applyRandomGlitch(t){const n=setInterval(()=>{Math.random()<.1&&(t.style.transform=`translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`,t.style.filter=`hue-rotate(${Math.random()*360}deg)`,setTimeout(()=>{t.style.transform="translate(0, 0)",t.style.filter="hue-rotate(0deg)"},100))},2e3);setTimeout(()=>{clearInterval(n)},this.autoPlayDelay)}applyTerminalScanlines(t){const e=document.createElement("div");e.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 0, 0.1) 2px,
                rgba(0, 255, 0, 0.1) 4px
            );
            pointer-events: none;
            z-index: 5;
            opacity: 0.3;
        `,t.style.position="relative",t.appendChild(e),setTimeout(()=>{e.parentElement&&e.parentElement.removeChild(e)},this.autoPlayDelay)}}window.CertificationsSlider=d||l;export{l as C};
