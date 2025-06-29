document.addEventListener('DOMContentLoaded', function() {
            const selectButtons = document.querySelectorAll('.select-button');
            const dropdowns = document.querySelectorAll('.dropdown');

            document.addEventListener('click', function(e) {
                if (!e.target.closest('.filter-select')) {
                    selectButtons.forEach(btn => btn.classList.remove('active'));
                    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
                }
            });

            selectButtons.forEach((button, index) => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();

                    selectButtons.forEach((btn, btnIndex) => {
                        if (btnIndex !== index) {
                            btn.classList.remove('active');
                            dropdowns[btnIndex]?.classList.remove('show');
                        }
                    });

                    button.classList.toggle('active');
                    dropdowns[index].classList.toggle('show');
                });
            });

            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();

                    const dropdown = this.closest('.dropdown');
                    const filterSelect = dropdown.closest('.filter-select');
                    const button = filterSelect.querySelector('.select-button');
                    const span = button.querySelector('span');

                    span.innerHTML = this.innerHTML;

                    button.classList.remove('active');
                    dropdown.classList.remove('show');

                    // Add visual feedback for selected state
                    button.style.borderColor = '#4077EC';
                    button.style.backgroundColor = 'rgba(64, 119, 236, 0.05)';

                    console.log(`Selected ${button.dataset.filter}: ${this.dataset.value}`);
                });
            });
        });
