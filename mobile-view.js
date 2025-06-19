// // Mobile Menu Toggle
// document.addEventListener("DOMContentLoaded", () => {
//     const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
//     const mobileNavOverlay = document.querySelector(".mobile-nav-overlay")
//     const mobileNavClose = document.querySelector(".mobile-nav-close")
//
//     // Open mobile menu
//     if (mobileMenuBtn) {
//         mobileMenuBtn.addEventListener("click", () => {
//             mobileNavOverlay.classList.add("active")
//             document.body.style.overflow = "hidden"
//         })
//     }
//
//     // Close mobile menu
//     if (mobileNavClose) {
//         mobileNavClose.addEventListener("click", () => {
//             mobileNavOverlay.classList.remove("active")
//             document.body.style.overflow = ""
//         })
//     }
//
//     // Close mobile menu when clicking overlay
//     if (mobileNavOverlay) {
//         mobileNavOverlay.addEventListener("click", (e) => {
//             if (e.target === mobileNavOverlay) {
//                 mobileNavOverlay.classList.remove("active")
//                 document.body.style.overflow = ""
//             }
//         })
//     }
//
//     // Handle window resize
//     window.addEventListener("resize", () => {
//         if (window.innerWidth > 768) {
//             mobileNavOverlay.classList.remove("active")
//             document.body.style.overflow = ""
//         }
//     })
// })
class MobileMenu {
    constructor(options = {}) {
        // Настройки по умолчанию
        this.config = {
            menuBtnSelector: '.mobile-menu-btn',
            overlaySelector: '.mobile-nav-overlay',
            closeBtnSelector: '.mobile-nav-close',
            activeClass: 'active',
            breakpoint: 768,
            disableBodyScroll: true,
            closeOnOverlayClick: true,
            closeOnResize: true,
            ...options
        }

        this.menuBtn = null
        this.overlay = null
        this.closeBtn = null
        this.isOpen = false

        this.init()
    }

    init() {
        this.findElements()
        this.bindEvents()
    }

    findElements() {
        this.menuBtn = document.querySelector(this.config.menuBtnSelector)
        this.overlay = document.querySelector(this.config.overlaySelector)
        this.closeBtn = document.querySelector(this.config.closeBtnSelector)

        if (!this.menuBtn || !this.overlay) {
            console.warn('MobileMenu: Required elements not found')
            return false
        }
        return true
    }

    bindEvents() {
        if (!this.findElements()) return

        // Открытие меню
        this.menuBtn.addEventListener('click', (e) => {
            e.preventDefault()
            this.open()
        })

        // Закрытие через кнопку
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault()
                this.close()
            })
        }

        // Закрытие при клике на оверлей
        if (this.config.closeOnOverlayClick) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close()
                }
            })
        }

        // Закрытие при изменении размера окна
        if (this.config.closeOnResize) {
            window.addEventListener('resize', () => {
                if (window.innerWidth > this.config.breakpoint && this.isOpen) {
                    this.close()
                }
            })
        }

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close()
            }
        })
    }

    open() {
        if (this.isOpen) return

        this.overlay.classList.add(this.config.activeClass)
        this.isOpen = true

        if (this.config.disableBodyScroll) {
            document.body.style.overflow = 'hidden'
        }

        // Фокус на первый интерактивный элемент
        this.focusFirstElement()

        // Кастомное событие
        this.dispatchEvent('mobileMenuOpen')
    }

    close() {
        if (!this.isOpen) return

        this.overlay.classList.remove(this.config.activeClass)
        this.isOpen = false

        if (this.config.disableBodyScroll) {
            document.body.style.overflow = ''
        }

        // Возврат фокуса на кнопку меню
        if (this.menuBtn) {
            this.menuBtn.focus()
        }

        // Кастомное событие
        this.dispatchEvent('mobileMenuClose')
    }

    toggle() {
        if (this.isOpen) {
            this.close()
        } else {
            this.open()
        }
    }

    focusFirstElement() {
        const focusableElements = this.overlay.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        )

        if (focusableElements.length > 0) {
            focusableElements[0].focus()
        }
    }

    dispatchEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: { menu: this }
        })
        document.dispatchEvent(event)
    }

    // Публичные методы для управления
    destroy() {
        if (this.isOpen) {
            this.close()
        }
        // Здесь можно добавить удаление обработчиков событий если нужно
    }

    updateConfig(newOptions) {
        this.config = { ...this.config, ...newOptions }
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие элементов перед инициализацией
    if (document.querySelector('.mobile-menu-btn') && document.querySelector('.mobile-nav-overlay')) {
        window.mobileMenu = new MobileMenu()
    }
})

// Экспорт для модульных систем
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenu
}

// Пример использования с кастомными настройками:

const customMenu = new MobileMenu({
    menuBtnSelector: '.my-menu-btn',
    overlaySelector: '.my-overlay',
    closeBtnSelector: '.my-close-btn',
    activeClass: 'is-open',
    breakpoint: 1024,
    disableBodyScroll: false
});
const catalogBtn = new MobileMenu({
    menuBtnSelector: '.my-menu-btn',
    overlaySelector: '.my-overlay',
    closeBtnSelector: '.my-close-btn',
    activeClass: 'is-open',
    breakpoint: 1024,
    disableBodyScroll: false
})

// Слушатели кастомных событий
document.addEventListener('mobileMenuOpen', (e) => {
    console.log('Menu opened:', e.detail.menu)
})

document.addEventListener('mobileMenuClose', (e) => {
    console.log('Menu closed:', e.detail.menu)
})

// Программное управление
customMenu.open()
customMenu.close()
customMenu.toggle()