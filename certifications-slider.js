// Certifications Slideshow with Cyber Glitch Effects
class CertificationsSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = [];
    this.autoPlayInterval = null;
    this.isTransitioning = false;
    this.autoPlayDelay = 4000; // 4 seconds
  }

  init(certificationsData) {
    this.slides = certificationsData;
    this.render();
    this.setupEventListeners();
    this.startAutoPlay();
  }

  render() {
    const slider = document.getElementById("certifications-slider");
    const indicators = document.getElementById("slide-indicators");

    if (!slider || !indicators) return;

  // Render slides
  const slidesHtml = this.slides
    .map(
    (cert, index) => `
      <div class="certification-slide" data-slide="${index}">
        <div class="cert-content">
          <h3 class="cert-title">${sanitizeInput(cert.title)}</h3>
          <p class="cert-issuer">${sanitizeInput(cert.issuer)}</p>
          <p class="cert-date">Earned: ${sanitizeInput(cert.year)}</p>
          <a href="${cert.link}" class="cert-link highlight-link" target="_blank">🔗 View Certificate</a>
        </div>
      </div>
    `
    )
    .join("");

    slider.innerHTML = slidesHtml;

    // Render indicators
    const indicatorsHtml = this.slides
      .map(
        (_, index) => `
            <span class="indicator" data-slide="${index}"></span>
        `
      )
      .join("");

    indicators.innerHTML = indicatorsHtml;

    // Set initial active states
    this.updateSlideDisplay();
  }

  setupEventListeners() {
    const indicators = document.querySelectorAll(".indicator");

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        if (!this.isTransitioning) {
          this.goToSlide(index);
        }
      });
    });

    // Pause auto-play on hover
    const container = document.querySelector(".certifications-slideshow");
    if (container) {
      container.addEventListener("mouseenter", () => {
        this.pauseAutoPlay();
      });

      container.addEventListener("mouseleave", () => {
        this.startAutoPlay();
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.previousSlide();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
      }
    });

    // Touch/swipe support
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    const slider = document.getElementById("certifications-slider");
    if (!slider) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    });
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return;

    this.isTransitioning = true;

    // Add glitch effect to current slide
    const currentSlideElement = document.querySelector(
      ".certification-slide.active"
    );
    if (currentSlideElement) {
      currentSlideElement.classList.add("glitch-transition");
    }

    setTimeout(() => {
      this.currentSlide = index;
      this.updateSlideDisplay();
      this.isTransitioning = false;
    }, 250);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  updateSlideDisplay() {
    const slider = document.getElementById("certifications-slider");
    const indicators = document.querySelectorAll(".indicator");

    if (!slider) return;

    // Update slider transform
    const translateX = -this.currentSlide * 100;
    slider.style.transform = `translateX(${translateX}%)`;

    // Update slide active states
    const slides = document.querySelectorAll(".certification-slide");
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide);
      if (
        slide.classList.contains("glitch-transition") &&
        index !== this.currentSlide
      ) {
        slide.classList.remove("glitch-transition");
      }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });

    // Apply cyber effects to new active slide
    setTimeout(() => {
      const newActiveSlide = slides[this.currentSlide];
      if (newActiveSlide) {
        this.applyCyberEffects(newActiveSlide);
      }
    }, 300);
  }

  applyCyberEffects(slideElement) {
    const certTitle = slideElement.querySelector(".cert-title");
    const certImage = slideElement.querySelector(".cert-image");

    if (certTitle) {
      // Typing effect for title
      const titleText = certTitle.textContent;
      certTitle.textContent = "";
      certTitle.style.borderRight = "2px solid #00ff00";

      let i = 0;
      const typeEffect = setInterval(() => {
        if (i < titleText.length) {
          certTitle.textContent += titleText.charAt(i);
          i++;
        } else {
          clearInterval(typeEffect);
          setTimeout(() => {
            certTitle.style.borderRight = "none";
          }, 500);
        }
      }, 50);
    }

    if (certImage) {
      // Scan line effect for image
      this.applyScanLineEffect(certImage);
    }
  }

  applyScanLineEffect(imageElement) {
    const scanLine = document.createElement("div");
    scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff00, transparent);
            z-index: 10;
            animation: scan 2s ease-in-out;
        `;

    // Add keyframes for scan animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes scan {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(150px); opacity: 0; }
            }
        `;
    document.head.appendChild(style);

    const container = imageElement.parentElement;
    container.style.position = "relative";
    container.appendChild(scanLine);

    // Remove scan line after animation
    setTimeout(() => {
      if (scanLine.parentElement) {
        scanLine.parentElement.removeChild(scanLine);
      }
      if (style.parentElement) {
        style.parentElement.removeChild(style);
      }
    }, 2000);
  }

  startAutoPlay() {
    this.pauseAutoPlay(); // Clear existing interval

    this.autoPlayInterval = setInterval(() => {
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // Progress indicator for auto-play
  showProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "slide-progress";
    progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: #00ff00;
            width: 0;
            transition: width ${this.autoPlayDelay}ms linear;
        `;

    const container = document.querySelector(".certifications-slideshow");
    if (container) {
      container.appendChild(progressBar);

      // Animate progress bar
      setTimeout(() => {
        progressBar.style.width = "100%";
      }, 100);

      // Reset progress bar after transition
      setTimeout(() => {
        if (progressBar.parentElement) {
          progressBar.parentElement.removeChild(progressBar);
        }
      }, this.autoPlayDelay);
    }
  }

  destroy() {
    this.pauseAutoPlay();

    // Remove event listeners
    document.removeEventListener("keydown", this.handleKeydown);

    // Clear any remaining effects
    const slides = document.querySelectorAll(".certification-slide");
    slides.forEach((slide) => {
      slide.classList.remove("glitch-transition", "active");
    });
  }
}

// Enhanced Cyber Certifications Slider
class CyberCertificationsSlider extends CertificationsSlider {
  constructor() {
    super();
    this.glitchEffects = true;
    this.scanLineEffects = true;
    this.typewriterEffects = true;
  }

  applyCyberEffects(slideElement) {
    super.applyCyberEffects(slideElement);

    if (this.glitchEffects) {
      this.applyRandomGlitch(slideElement);
    }

    if (this.scanLineEffects) {
      this.applyTerminalScanlines(slideElement);
    }
  }

  applyRandomGlitch(element) {
    const glitchChance = 0.1;

    const randomGlitch = () => {
      if (Math.random() < glitchChance) {
        element.style.transform = `translate(${Math.random() * 4 - 2}px, ${
          Math.random() * 4 - 2
        }px)`;
        element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

        setTimeout(() => {
          element.style.transform = "translate(0, 0)";
          element.style.filter = "hue-rotate(0deg)";
        }, 100);
      }
    };

    // Random glitch effects during display
    const glitchInterval = setInterval(randomGlitch, 2000);

    // Clear after slide change
    setTimeout(() => {
      clearInterval(glitchInterval);
    }, this.autoPlayDelay);
  }

  applyTerminalScanlines(element) {
    const scanlines = document.createElement("div");
    scanlines.style.cssText = `
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
        `;

    element.style.position = "relative";
    element.appendChild(scanlines);

    // Remove after slide change
    setTimeout(() => {
      if (scanlines.parentElement) {
        scanlines.parentElement.removeChild(scanlines);
      }
    }, this.autoPlayDelay);
  }
}

// Export for global use
window.CertificationsSlider = CyberCertificationsSlider || CertificationsSlider;
