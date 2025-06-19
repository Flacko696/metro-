document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('calendar.html')) {
        fillCalendar();
        showUserGreeting();
    }
});

function fillCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    const rewards = [
        { name: "Фильтр для противогаза", img: "images/calendar-items/filter.png" },
        { name: "5 патронов 5.45мм", img: "images/calendar-items/5,45.jpg" },
        { name: "Медикаменты", img: "images/calendar-items/medkit.jpg" },
        { name: "Граната", img: "images/calendar-items/grenade.jpg" },
        { name: "Скин для АКМ 'Ржавчина'", img: "images/calendar-items/akm-rust.jpg" },
        { name: "10 патронов 7.62мм", img: "images/calendar-items/ammo-762.jpg" },
        { name: "Фонарик", img: "images/calendar-items/flashlight.jpg" },
        { name: "Банка тушенки", img: "images/calendar-items/stew.jpg" },
        { name: "Нож 'Спартанец'", img: "images/calendar-items/knife.jpg" },
        { name: "Бронепластина", img: "images/calendar-items/armor.jpg" },
        { name: "Скин для револьвера 'Тихий'", img: "images/calendar-items/revolver.jpg" },
        { name: "3 гранаты", img: "images/calendar-items/grenade.jpg" },
        { name: "Ночное видение", img: "images/calendar-items/vision.jpg" },
        { name: "20 патронов 5.45мм", img: "images/calendar-items/5,45.jpg" },
        { name: "Кожаный ремешок", img: "images/calendar-items/strap.jpg" },
        { name: "Скин для противогаза 'Сталкер'", img: "images/calendar-items/mask.jpg" },
        { name: "Молоток", img: "images/calendar-items/hammer.jpg" },
        { name: "10 патронов 7.62мм", img: "images/calendar-items/ammo-762.jpg" },
        { name: "Аптечка", img: "images/calendar-items/med.jpg" },
        { name: "Дымовая шашка", img: "images/calendar-items/smoke.jpg" },
        { name: "Скин для винтовки 'Тихая ночь'", img: "images/calendar-items/rifle.jpg" },
        { name: "15 патронов 5.45мм", img: "images/calendar-items/5,45.jpg" },
        { name: "Клейкая лента", img: "images/calendar-items/tape.jpg" },
        { name: "Фляга с водой", img: "images/calendar-items/cant.jpg" },
        { name: "Секретный документ", img: "images/calendar-items/document.jpg" },
        { name: "Скин для брони 'Рейнджер'", img: "images/calendar-items/ranger.jpg" },
        { name: "25 патронов 7.62мм", img: "images/calendar-items/ammo-762.jpg" },
        { name: "Газовый баллон", img: "images/calendar-items/gas.jpg" },
        { name: "Ключ от тайника", img: "images/calendar-items/key.jpg" },
        { name: "Эксклюзивный скин 'Артём'", img: "images/calendar-items/artyom.jpg" }
    ];
    
    for (let i = 1; i <= 30; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        if (i <= new Date().getDate()) {
            dayElement.classList.add('completed');
        }
        
        dayElement.innerHTML = `
            <div class="day-number">${i}</div>
            <img src="${rewards[i-1].img}" alt="${rewards[i-1].name}" class="reward-image">
            <div class="day-reward">${rewards[i-1].name}</div>
        `;
        
        calendarGrid.appendChild(dayElement);
    }
}

function showUserGreeting() {
    const username = localStorage.getItem('metroEventUsername');
    if (username) {
        const header = document.querySelector('header h1');
        if (header) {
            header.textContent += ` - ${username}`;
        }
    }
}




// Скрипт для слайдера
        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('slider');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dotsContainer = document.getElementById('dotsContainer');
            
            const slides = document.querySelectorAll('.slide');
            const slideCount = slides.length;
            let currentIndex = 0;
            let slideInterval;
            
            // Создаем точки для навигации
            function createDots() {
                dotsContainer.innerHTML = '';
                slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        goToSlide(index);
                        resetInterval();
                    });
                    dotsContainer.appendChild(dot);
                });
            }
            
            createDots();
            const dots = document.querySelectorAll('.dot');
            
            // Функция для перехода к конкретному слайду
            function goToSlide(index) {
                if (index < 0) {
                    index = slideCount - 1;
                } else if (index >= slideCount) {
                    index = 0;
                }
                
                currentIndex = index;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Обновляем активную точку
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
                
                // Добавляем анимацию для текущего слайда
                slides[currentIndex].style.animation = 'fadeIn 0.7s ease-out';
                setTimeout(() => {
                    slides[currentIndex].style.animation = '';
                }, 700);
            }
            
            // Кнопка "Назад"
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetInterval();
            });
            
            // Кнопка "Вперед"
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetInterval();
            });
            
            // Автоматическое перелистывание
            function startInterval() {
                slideInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 5000);
            }
            
            function resetInterval() {
                clearInterval(slideInterval);
                startInterval();
            }
            
            startInterval();
            
            // Остановка авто-перелистывания при наведении
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            // Возобновление авто-перелистывания при уходе курсора
            slider.addEventListener('mouseleave', () => {
                startInterval();
            });
            
            // Обработка свайпов на мобильных устройствах
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(slideInterval);
            }, {passive: true});
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startInterval();
            }, {passive: true});
            
            function handleSwipe() {
                const threshold = 50;
                if (touchEndX < touchStartX - threshold) {
                    // Свайп влево
                    goToSlide(currentIndex + 1);
                } else if (touchEndX > touchStartX + threshold) {
                    // Свайп вправо
                    goToSlide(currentIndex - 1);
                }
            }
            
            // Адаптация к изменению размера окна
            window.addEventListener('resize', () => {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
                });
            });
        });