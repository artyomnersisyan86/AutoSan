const anSearchContainer = document.getElementById('anSearchContainer');
const anSearchInput = document.getElementById('anSearchInput');
const anClearButton = document.getElementById('anClearButton');
const anMobileSearchBtn = document.getElementById('anMobileSearchBtn');
const anMobileSearchExpanded = document.getElementById('anMobileSearchExpanded');
// const anMobileSearchInput = document.getElementById('anMobileSearchInput');
// const anMobileClearButton = document.getElementById('anMobileClearButton');
const anBackButton = document.getElementById('anBackButton');
const anSearchOverlay = document.getElementById('anSearchOverlay');
// const anScreenIndicator = document.getElementById('anScreenIndicator');
// const anMobileSearchHeader = document.querySelector('.an-mobile-search-header');

// Screen size indicator (for demo)
function updateScreenIndicator() {
    // if (window.innerWidth <= 768) {
    //     anScreenIndicator.textContent = `Mobile (${window.innerWidth}px)`;
    // } else {
    //     anScreenIndicator.textContent = `Desktop (${window.innerWidth}px)`;
    // }
}

window.addEventListener('resize', updateScreenIndicator);
updateScreenIndicator();

// Desktop search functionality
anSearchInput?.addEventListener('input', function () {
    if (this.value.length > 0) {
        anSearchContainer.classList.add('an-has-content');
    } else {
        anSearchContainer.classList.remove('an-has-content');
    }
});

anClearButton.addEventListener('click', function () {
    anSearchInput.value = '';
    anSearchContainer.classList.remove('an-has-content');
    anSearchInput.focus();
});

anSearchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim()) {
        performSearch(this.value);
    }
});

// Mobile search functionality
anMobileSearchBtn.addEventListener('click', function () {
    openMobileSearch();
});

anBackButton.addEventListener('click', function () {
    closeMobileSearch();
});

anSearchOverlay.addEventListener('click', function () {
    anBackButton.style.display = 'none'
    anMobileSearchBtn.style.display = 'flex'
    closeMobileSearch();
});

// anMobileSearchInput.addEventListener('input', function() {
//     if (this.value.length > 0) {
//         anMobileClearButton.style.display = 'flex';
//     } else {
//         anMobileClearButton.style.display = 'none';
//     }
// });
//
// anMobileClearButton.addEventListener('click', function() {
//     anMobileSearchInput.value = '';
//     anMobileClearButton.style.display = 'block';
//     anMobileSearchInput.focus();
// });

// anMobileSearchInput.addEventListener('keypress', function(e) {
//     if (e.key === 'Enter' && this.value.trim()) {
//         performSearch(this.value);
//         closeMobileSearch();
//     }
// });

// Mobile search open/close functions
function openMobileSearch() {
    document.body.style.overflow = 'hidden';
    anSearchOverlay.classList.add('an-active');
    anMobileSearchExpanded.classList.add('an-active');
    anMobileSearchExpanded.prepend(anSearchContainer)
    anSearchContainer.style.display = 'flex';
    anMobileSearchBtn.style.display = 'none'
    anBackButton.style.display = 'flex'
    anSearchInput.value = '';
    // Focus input after animation


    //
    // setTimeout(() => {
    //     anMobileSearchInput.focus();
    // }, 300);
}

function closeMobileSearch() {
    document.body.style.overflow = '';
    anSearchOverlay.classList.remove('an-active');
    anMobileSearchExpanded.classList.remove('an-active');
    anSearchInput.value = '';
    // Clear mobile input
    // anMobileSearchInput.value = '';
    // anMobileClearButton.style.display = 'none';
}

// Search function
function performSearch(query) {
    console.log('Searching for:', query);
    alert('Поиск: ' + query);
}

// Close mobile search on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && anMobileSearchExpanded.classList.contains('an-active')) {
        closeMobileSearch();
    }
});

// Prevent body scroll when mobile search is open
let startY = 0;
anMobileSearchExpanded.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
});

anMobileSearchExpanded.addEventListener('touchmove', function (e) {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // if (deltaY > 50 && anMobileSearchInput.value === '') {
    //     closeMobileSearch();
    // }

    if (deltaY > 50 && anSearchInput.value === '') {
        closeMobileSearch();
    }
});
