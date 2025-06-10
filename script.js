// Функция для инициализации слайдера брендов
function initBrandsSlider() {
    const brandsContainer = document.querySelector('.brands-container');
    if (!brandsContainer) return;

    // Клонируем элементы для бесконечной прокрутки
    const brandLogos = document.querySelectorAll('.brand-logo');
    brandLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        brandsContainer.appendChild(clone);
    });
}

// Функция для добавления товаров в корзину
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h3').textContent;
            const productPrice = this.parentElement.querySelector('.product-price').textContent;

            // Здесь можно добавить логику добавления в корзину
            console.log(`Добавлен товар: ${productName} - ${productPrice}`);

            // Анимация добавления в корзину
            button.textContent = 'Добавлено ✓';
            button.style.backgroundColor = '#28a745';

            setTimeout(() => {
                button.textContent = 'В корзину';
                button.style.backgroundColor = '#0056b3';
            }, 2000);
        });
    });
}

// Функция для создания эффекта фиксированной шапки при прокрутке
function setupStickyHeader() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    if (!header || !heroSection) return;

    const headerHeight = header.offsetHeight;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroBottom - headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Функция для создания эффекта появления элементов при прокрутке
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.category-item, .product-card, .news-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.classList.add('scroll-animation');
        observer.observe(element);
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initBrandsSlider();
    setupAddToCartButtons();
    setupStickyHeader();
    setupScrollAnimation();

    // Добавляем стили для анимации при прокрутке
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animation {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scroll-animation.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Обработка поиска
const searchIcon = document.querySelector('.search');
if (searchIcon) {
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        // Здесь можно добавить логику открытия поиска
        alert('Функция поиска будет доступна в ближайшее время!');
    });
}

