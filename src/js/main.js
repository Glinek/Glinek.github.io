document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE HAMBURGER MENU
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav__list');
  
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navList.classList.toggle('is-active');
        });
    }
  
    /* =========================================
       2. TYPING EFFECT (Home Page)
    ========================================= */
    const roleContainer = document.querySelector('.hero-role');
    const typingElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.cursor');
  
    if (roleContainer && typingElement) {
        const rolesString = roleContainer.dataset.roles || "";
        const roles = rolesString ? rolesString.split(',') : [];
        let roleIndex = 0, charIndex = 0, isDeleting = false;
        
        typingElement.classList.add('text-blue');
        if (cursorElement) cursorElement.classList.add('text-blue');
  
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
  
            let typeSpeed = isDeleting ? 50 : 100;
  
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
                
                // Zmiana kolorów: parzyste = niebieski, nieparzyste = żółty
                if (roleIndex % 2 === 0) {
                    typingElement.classList.replace('text-yellow', 'text-blue');
                    if (cursorElement) cursorElement.classList.replace('text-yellow', 'text-blue');
                } else {
                    typingElement.classList.replace('text-blue', 'text-yellow');
                    if (cursorElement) cursorElement.classList.replace('text-blue', 'text-yellow');
                }
            }
            setTimeout(typeEffect, typeSpeed);
        }
  
        if (roles.length > 0) setTimeout(typeEffect, 1000);
    }

    /* =========================================
       3. PROJECTS CAROUSEL
    ========================================= */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track ? track.children : []);
    const nextButton = document.querySelector('.right-arrow');
    const prevButton = document.querySelector('.left-arrow');
    const dotsNav = document.querySelector('.carousel-dots');
    
    // ZMIANA: Zmieniono nazwę na carouselDots, żeby nie było błędu!
    const carouselDots = Array.from(dotsNav ? dotsNav.children : []); 

    if (track && slides.length > 0) {
        let currentIndex = 0;
        let autoPlayInterval;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            carouselDots.forEach(dot => dot.classList.remove('active'));
            if(carouselDots[index]) carouselDots[index].classList.add('active');
            currentIndex = index;
        };

        const moveToNextSlide = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            updateCarousel(nextIndex);
        };

        const moveToPrevSlide = () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            updateCarousel(prevIndex);
        };

        if(nextButton) nextButton.addEventListener('click', () => { moveToNextSlide(); resetAutoPlay(); });
        if(prevButton) prevButton.addEventListener('click', () => { moveToPrevSlide(); resetAutoPlay(); });

        if(dotsNav) {
            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('.carousel-dot');
                if (!targetDot) return;
                const targetIndex = carouselDots.findIndex(dot => dot === targetDot);
                updateCarousel(targetIndex);
                resetAutoPlay();
            });
        }

        const startAutoPlay = () => { autoPlayInterval = setInterval(moveToNextSlide, 5000); };
        const resetAutoPlay = () => { clearInterval(autoPlayInterval); startAutoPlay(); };
        startAutoPlay();
    }
  
    /* =========================================
       4. SCROLL INTERSECTION OBSERVER (Hexagons)
    ========================================= */
    const sections = document.querySelectorAll('.home-section');
    
    // ZMIANA: Zmieniono nazwę na navDots, żeby nie było błędu!
    const navDots = document.querySelectorAll('.dot-nav .dot'); 
  
    if (sections.length > 0 && navDots.length > 0) {
        const visibilityMap = new Map();
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] 
        };
  
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                visibilityMap.set(entry.target.id, entry.intersectionRatio);
            });
  
            let maxVisibleId = '';
            let maxRatio = 0;
  
            for (let [id, ratio] of visibilityMap.entries()) {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    maxVisibleId = id;
                }
            }
  
            if (maxVisibleId) {
                navDots.forEach(dot => dot.classList.remove('active'));
                const activeDot = document.querySelector(`.dot-nav .dot[href="#${maxVisibleId}"]`);
                
                if (activeDot && !activeDot.classList.contains('active')) {
                    activeDot.classList.add('active');
                    history.replaceState(null, null, '#' + maxVisibleId);
                }
            }
        }, observerOptions);
  
        sections.forEach(section => observer.observe(section));
    }
    /* =========================================
       5. AUTO-SCROLL LONG PROJECT TITLES
    ========================================= */
    const projectTitles = document.querySelectorAll('.project-card h3');
    
    projectTitles.forEach(title => {
        // Uruchamiamy animację TYLKO, jeśli tekst fizycznie wystaje za kontener
        if (title.scrollWidth > title.clientWidth) {
            let scrollPos = 0;
            let direction = 1;
            
            setInterval(() => {
                scrollPos += direction * 1; // Zmień z 1 na np. 2, aby tekst przewijał się szybciej
                title.scrollLeft = scrollPos;
                
                // Odbijanie się od krawędzi (Ping-Pong)
                if (scrollPos >= (title.scrollWidth - title.clientWidth)) {
                    direction = -1; // Zaczyna wracać w lewo
                } else if (scrollPos <= 0) {
                    direction = 1; // Zaczyna znów iść w prawo
                }
            }, 30); // 30ms to płynność animacji (ok 30 klatek na sekundę)
        }
    });

    // Pobieramy wszystkie kafelki galerii oraz elementy lightboxa
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    // Jeśli na stronie nie ma galerii, skrypt nie robi nic (nie sypie błędami)
    if (galleryItems.length > 0 && lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const btnClose = document.getElementById('lightbox-close');
        const btnPrev = document.getElementById('lightbox-prev');
        const btnNext = document.getElementById('lightbox-next');
        
        let galleryImages = [];
        let currentImgIndex = 0;

        // Budujemy tablicę zdjęć na podstawie atrybutów 'data-src' z HTML
        galleryItems.forEach(item => {
            galleryImages.push(item.getAttribute('data-src'));
            
            // Dodajemy obsługę kliknięcia w konkretny kafelek
            item.addEventListener('click', () => {
                currentImgIndex = parseInt(item.getAttribute('data-index'));
                updateLightboxImage();
                lightbox.classList.add('active');
            });
        });

        // Funkcja podmieniająca źródło zdjęcia
        function updateLightboxImage() {
            lightboxImg.src = galleryImages[currentImgIndex];
        }

        // Funkcja obsługująca strzałki przód/tył
        function changeImage(step) {
            currentImgIndex += step;
            // Zapętlanie galerii
            if (currentImgIndex >= galleryImages.length) currentImgIndex = 0;
            if (currentImgIndex < 0) currentImgIndex = galleryImages.length - 1;
            updateLightboxImage();
        }

        // Przypięcie akcji do przycisków
        btnPrev.addEventListener('click', () => changeImage(-1));
        btnNext.addEventListener('click', () => changeImage(1));
        btnClose.addEventListener('click', () => lightbox.classList.remove('active'));

        // Zamykanie galerii po kliknięciu w ciemne tło (poza zdjęciem)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
});