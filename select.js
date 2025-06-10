class UniversalSelect {
    constructor(element) {
        this.element = element;
        this.button = element.querySelector('.select-button');
        this.dropdown = element.querySelector('.dropdown-menu');
        this.items = element.querySelectorAll('.dropdown-item');
        this.overlay = document.getElementById('select-overlay');
        this.isOpen = false;

        this.init();
    }

    init() {
        // Toggle dropdown on button click
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Handle item selection
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectItem(item);
            });
        });

        // Close on overlay click
        this.overlay?.addEventListener('click', () => {
            this.close();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        // Close other selects
        document.querySelectorAll('.universal-select.open').forEach(select => {
            if (select !== this.element) {
                select.classList.remove('open');
            }
        });

        this.element?.classList?.add('open');
        this.overlay?.classList?.add('active');
        this.isOpen = true;
    }

    close() {
        this.element?.classList?.remove('open');
        this.overlay?.classList?.remove('active');
        this.isOpen = false;
    }

    selectItem(item) {
        // Remove active class from all items
        this.items.forEach(i => i.classList.remove('active'));

        // Add active class to selected item
        item.classList.add('active');

        // Update button content
        const value = item.dataset.value;
        const text = item.dataset.text;
        const iconSrc = item.dataset.icon;

        // Update text
        this.button.querySelector('.select-text').textContent = text;

        // Update icon if exists
        const selectIcon = this.button.querySelector('.select-icon');
        const itemIcon = item.querySelector('.item-icon');

        if (iconSrc) {
            // Image icon
            const img = selectIcon.querySelector('img');
            if (img) {
                img.src = iconSrc;
            }
        } else if (itemIcon) {
            // SVG icon or other content
            selectIcon.innerHTML = itemIcon.innerHTML;
        }

        // Close dropdown
        this.close();

        // Trigger change event
        this.onChange(value, text, iconSrc);

        console.log('Selected:', { value, text, iconSrc });
    }

    onChange(value, text, iconSrc) {
        // Override this method or listen to custom events
        const event = new CustomEvent('selectChange', {
            detail: { value, text, iconSrc }
        });
        this.element.dispatchEvent(event);
    }

    // Public methods
    getValue() {
        const activeItem = this.element.querySelector('.dropdown-item.active');
        return activeItem ? activeItem.dataset.value : null;
    }

    setValue(value) {
        const item = this.element.querySelector(`[data-value="${value}"]`);
        if (item) {
            this.selectItem(item);
        }
    }
}

// Initialize all select components
document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.universal-select');
    selects.forEach(select => {
        const instance = new UniversalSelect(select);

        // Listen to change events
        select.addEventListener('selectChange', (e) => {
            console.log(`${select.id} changed:`, e.detail);
        });
    });
});

// Example of programmatic control
function setLanguage(lang) {
    const languageSelect = document.querySelector('#language-select');
    if (languageSelect && languageSelect.selectInstance) {
        languageSelect.selectInstance.setValue(lang);
    }
}
// --------------------------------------------//


