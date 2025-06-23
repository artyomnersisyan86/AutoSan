class AdaptiveTabs {
    constructor() {
        this.container = document.getElementById('tabsContainer');
        this.tabsList = document.getElementById('tabsList');
        this.mobileHeader = document.getElementById('mobileHeader');
        this.mobileTitle = document.getElementById('mobileTitle');
        this.backButton = document.getElementById('backButton');
        this.isMobile = window.innerWidth < 768;

        this.init();
        this.bindEvents();
    }

    init() {
        this.updateLayout();
        this.setInitialState();
    }

    bindEvents() {
        // Переключение табов
        this.tabsList.addEventListener('click', (e) => {
            const tabItem = e.target.closest('.tab-item');
            if (tabItem) {
                this.switchTab(tabItem);
            }
        });

        // Кнопка назад на мобильном
        this.backButton.addEventListener('click', () => {
            this.showTabsList();
            this.hideMobileHeader()
        });

        // Контроль ориентации
        document.querySelectorAll('.orientation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeOrientation(e.target.dataset.orientation);
            });
        });

        // Отслеживание изменения размера окна
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    updateLayout() {
        this.isMobile = window.innerWidth < 768;

        if (this.isMobile) {
            this.container.classList.remove('horizontal', 'vertical');
        } else {
            this.showTabsList();
            this.hideMobileHeader();
        }
    }

    setInitialState() {
        if (this.isMobile) {
            this.showTabsList();
            this.hideMobileHeader();
        }
    }

    switchTab(tabItem) {
        const tabId = tabItem.dataset.tab;
        const tabTitle = tabItem.querySelector('.tab-title').textContent;

        // Обновляем активный таб
        document.querySelectorAll('.tab-item').forEach(item => {
            item.classList.remove('active');
        });
        tabItem.classList.add('active');

        // Обновляем контент
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.querySelector(`[data-content="${tabId}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // На мобильном скрываем список табов и показываем контент
        if (this.isMobile) {
            this.hideTabsList();
            this.showMobileHeader(tabTitle);
        }
    }

    showTabsList() {
        this.tabsList.classList.remove('hidden');
        if (this.isMobile) {
            // Скрываем контент на мобильном
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
        }
    }

    hideTabsList() {
        if (this.isMobile) {
            this.tabsList.classList.add('hidden');
        }
    }

    showMobileHeader(title) {
        if (this.isMobile) {
            this.mobileHeader.style.display = 'flex';
            this.mobileTitle.textContent = title;
        }
    }

    hideMobileHeader() {
        this.mobileHeader.style.display = 'none';
    }

    changeOrientation(orientation) {
        if (!this.isMobile) {
            this.container.classList.remove('horizontal', 'vertical');
            this.container.classList.add(orientation);

            // Обновляем активную кнопку
            document.querySelectorAll('.orientation-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-orientation="${orientation}"]`).classList.add('active');
        }
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.updateLayout();

        // Если переходим с мобильного на десктоп или наоборот
        if (wasMobile !== this.isMobile) {
            this.setInitialState();

            // Показываем активный контент на десктопе
            if (!this.isMobile) {
                const activeTab = document.querySelector('.tab-item.active');
                if (activeTab) {
                    const tabId = activeTab.dataset.tab;
                    const targetContent = document.querySelector(`[data-content="${tabId}"]`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                }
            }
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new AdaptiveTabs();
});
