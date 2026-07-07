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

        const startAutoPlay = () => { autoPlayInterval = setInterval(moveToNextSlide, 15000); };
        const resetAutoPlay = () => { clearInterval(autoPlayInterval); startAutoPlay(); };
        
        // --- NOWOŚĆ: OBSŁUGA DOTYKU (SWIPE) NA TELEFONACH ---
        let touchStartX = 0;
        let touchEndX = 0;

        // Kiedy użytkownik dotyka ekranu
        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoPlayInterval); // Zatrzymujemy automatyczne przewijanie na czas dotyku
        }, { passive: true });

        // Kiedy użytkownik odrywa palec od ekranu
        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay(); // Wznawiamy automatyczne przewijanie
        }, { passive: true });

        // Funkcja obliczająca kierunek przesunięcia palcem
        const handleSwipe = () => {
            const swipeThreshold = 50; // Minimalna długość przesunięcia palcem (w pikselach), by zaliczyć swipe'a
            
            // Jeśli palec przesunął się w lewo (następny projekt)
            if (touchEndX < touchStartX - swipeThreshold) {
                moveToNextSlide();
            }
            // Jeśli palec przesunął się w prawo (poprzedni projekt)
            if (touchEndX > touchStartX + swipeThreshold) {
                moveToPrevSlide();
            }
        };

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
       5. AUTO-SCROLL LONG PROJECT TITLES (ZAPĘTLONE)
    ========================================= */
    const projectTitles = document.querySelectorAll('.project-card h3');
    
    const initTitleScroll = () => {
        projectTitles.forEach(title => {
            // Zatrzymujemy poprzednią animację, jeśli istnieje
            if (title.scrollIntervalId) {
                clearInterval(title.scrollIntervalId);
            }

            // Zapisujemy oryginalny tekst projektu przy pierwszym uruchomieniu
            if (!title.dataset.originalText) {
                title.dataset.originalText = title.innerHTML;
            }

            // Wrzucamy czysty, oryginalny tekst z powrotem do pomiarów
            // (Jest to niezbędne, jeśli ktoś obróci ekran i zniknie potrzeba przewijania)
            title.innerHTML = title.dataset.originalText;

            // Sprawdzamy, czy tekst ucieka poza ramkę
            if (title.scrollWidth > title.clientWidth) {
                title.style.textAlign = 'left'; 
                
                // --- MAGIA NIESKOŃCZONEJ PĘTLI ---
                const text = title.dataset.originalText;
                
                // Duplikujemy tekst, zawijając w osobne spany z odstępem (padding-right)
                title.innerHTML = `
                    <span class="scroll-part" style="padding-right: 3rem;">${text}</span>
                    <span class="scroll-part" style="padding-right: 3rem;">${text}</span>
                `;
                
                let scrollPos = 0;
                // Pobieramy długość pierwszego kawałka tekstu
                const firstPart = title.querySelector('.scroll-part');
                
                title.scrollIntervalId = setInterval(() => {
                    scrollPos += 2; // Szybkość przesuwania (możesz zmienić na 2, żeby było szybciej)
                    title.scrollLeft = scrollPos;
                    
                    // Jeśli pierwszy tekst w całości zjechał w lewo, niezauważalnie resetujemy pozycję na 0
                    if (scrollPos >= firstPart.offsetWidth) {
                        scrollPos = 0;
                    }
                }, 30);
                
            } else {
                // Jeśli tekst się mieści (np. duże ekrany), przywracamy normę
                title.style.textAlign = '';
                title.scrollLeft = 0;
            }
        });
    };

    // Odpalamy po załadowaniu czcionek
    window.addEventListener('load', initTitleScroll);
    
    // Przeliczamy w razie zmiany wymiarów okna (np. obrót telefonu)
    window.addEventListener('resize', () => {
        setTimeout(initTitleScroll, 300);
    });

    // Odpalamy po PEŁNYM załadowaniu zasobów (gdy czcionki nadadzą ostateczną szerokość literom)
    window.addEventListener('load', initTitleScroll);
    
    // Przeliczamy ponownie w razie obrotu telefonu lub zmiany rozmiaru okna
    window.addEventListener('resize', () => {
        setTimeout(initTitleScroll, 300);
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

    /* =========================================
       6. GLOBALNY LIGHTBOX (DELEGACJA ZDARZEŃ)
    ========================================= */
    
    // Sprawdzamy na starcie, czy w ogóle mamy na stronie kontener artykułu
    const postContent = document.querySelector('.post-content');

    if (postContent) {
        
        // 1. Zawsze ładujemy strukturę Lightboxa do DOM
        if (!document.getElementById('global-custom-lightbox')) {
             const lightboxHTML = `
                <div id="global-custom-lightbox" class="custom-lightbox-overlay">
                    <span class="custom-lightbox-close">&times;</span>
                    <button class="custom-lightbox-btn custom-lightbox-prev">&#10094;</button>
                    <img class="custom-lightbox-image" src="" alt="Powiększenie">
                    <button class="custom-lightbox-btn custom-lightbox-next">&#10095;</button>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }

        const globalLightbox = document.getElementById('global-custom-lightbox');
        const customLightboxImg = globalLightbox.querySelector('.custom-lightbox-image');
        const customCloseBtn = globalLightbox.querySelector('.custom-lightbox-close');
        const customPrevBtn = globalLightbox.querySelector('.custom-lightbox-prev');
        const customNextBtn = globalLightbox.querySelector('.custom-lightbox-next');
        
        let customCurrentIndex = 0;
        let customImgSources = [];

        // 2. Delegacja zdarzeń - nasłuchujemy kliknięć w całym artykule
        postContent.addEventListener('click', (event) => {
            const clickedImg = event.target.closest('.custom-clickable-img');
            
            if (clickedImg) {
                // Gdy ktoś kliknie, na świeżo pobieramy wszystkie zdjęcia (odporne na opóźnienia)
                const allInlineImages = document.querySelectorAll('.custom-clickable-img');
                customImgSources = Array.from(allInlineImages).map(img => img.getAttribute('data-src'));
                
                // Znajdujemy, które to z kolei zdjęcie
                customCurrentIndex = customImgSources.indexOf(clickedImg.getAttribute('data-src'));
                
                customLightboxImg.src = customImgSources[customCurrentIndex];
                globalLightbox.classList.add('active');
            }
        });

        // 3. Logika nawigacji (strzałki i zamykanie)
        const showNextInlineImage = () => { 
            if (customImgSources.length === 0) return;
            customCurrentIndex = (customCurrentIndex + 1) % customImgSources.length; 
            customLightboxImg.src = customImgSources[customCurrentIndex]; 
        };
        
        const showPrevInlineImage = () => { 
            if (customImgSources.length === 0) return;
            customCurrentIndex = (customCurrentIndex - 1 + customImgSources.length) % customImgSources.length; 
            customLightboxImg.src = customImgSources[customCurrentIndex]; 
        };

        customCloseBtn.addEventListener('click', () => globalLightbox.classList.remove('active'));
        customNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextInlineImage(); });
        customPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevInlineImage(); });
        
        globalLightbox.addEventListener('click', (e) => { 
            if (e.target === globalLightbox) globalLightbox.classList.remove('active'); 
        });

        document.addEventListener('keydown', (e) => {
            if (!globalLightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') showNextInlineImage();
            if (e.key === 'ArrowLeft') showPrevInlineImage();
            if (e.key === 'Escape') globalLightbox.classList.remove('active');
        });
    }

    /* =========================================
       7. AUTOMATYCZNE POBIERANIE OPISU Z GITHUBA
    ========================================= */
    const githubCards = document.querySelectorAll('.github-card');
    
    if (githubCards.length > 0) {
        githubCards.forEach(card => {
            const repo = card.getAttribute('data-repo');
            const descTarget = card.querySelector('.github-desc-target');
            
            if (repo && descTarget) {
                // Odpytujemy darmowe API GitHuba o dane tego repozytorium
                fetch(`https://api.github.com/repos/${repo}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.description) {
                            descTarget.textContent = data.description;
                        } else {
                            descTarget.textContent = "To repozytorium nie posiada opisu.";
                        }
                    })
                    .catch(error => {
                        console.error('Błąd pobierania danych z GitHuba:', error);
                        descTarget.textContent = "Nie udało się połączyć z serwerem GitHuba.";
                    });
            }
        });
    }

    /* =========================================
       8. GLOBALNY LIGHTBOX DLA GALERII INLINE
    ========================================= */
    const allInlineImages = document.querySelectorAll('.custom-clickable-img');

    if (allInlineImages.length > 0) {
        // Zamiast wklejać HTML do post.html, generujemy go automatycznie w JS!
        const lightboxHTML = `
            <div id="global-custom-lightbox" class="custom-lightbox-overlay">
                <span class="custom-lightbox-close">&times;</span>
                <button class="custom-lightbox-btn custom-lightbox-prev">&#10094;</button>
                <img class="custom-lightbox-image" src="" alt="Powiększenie">
                <button class="custom-lightbox-btn custom-lightbox-next">&#10095;</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Obsługa logiki
        const globalLightbox = document.getElementById('global-custom-lightbox');
        const customLightboxImg = globalLightbox.querySelector('.custom-lightbox-image');
        const customCloseBtn = globalLightbox.querySelector('.custom-lightbox-close');
        const customPrevBtn = globalLightbox.querySelector('.custom-lightbox-prev');
        const customNextBtn = globalLightbox.querySelector('.custom-lightbox-next');
        
        let customCurrentIndex = 0;
        // Zbieramy ścieżki (src) wszystkich zdjęć na stronie
        const customImgSources = Array.from(allInlineImages).map(img => img.getAttribute('data-src'));

        allInlineImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                customCurrentIndex = index;
                customLightboxImg.src = customImgSources[customCurrentIndex];
                globalLightbox.classList.add('active');
            });
        });

        const showNextInlineImage = () => { 
            customCurrentIndex = (customCurrentIndex + 1) % customImgSources.length; 
            customLightboxImg.src = customImgSources[customCurrentIndex]; 
        };
        
        const showPrevInlineImage = () => { 
            customCurrentIndex = (customCurrentIndex - 1 + customImgSources.length) % customImgSources.length; 
            customLightboxImg.src = customImgSources[customCurrentIndex]; 
        };

        customCloseBtn.addEventListener('click', () => globalLightbox.classList.remove('active'));
        customNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextInlineImage(); });
        customPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevInlineImage(); });
        
        // Zamykanie po kliknięciu w puste tło
        globalLightbox.addEventListener('click', (e) => { 
            if (e.target === globalLightbox) globalLightbox.classList.remove('active'); 
        });

        // Obsługa strzałek na klawiaturze
        document.addEventListener('keydown', (e) => {
            if (!globalLightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') showNextInlineImage();
            if (e.key === 'ArrowLeft') showPrevInlineImage();
            if (e.key === 'Escape') globalLightbox.classList.remove('active');
        });
    }
});