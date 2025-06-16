// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileNavOverlay = document.querySelector(".mobile-nav-overlay")
    const mobileNavClose = document.querySelector(".mobile-nav-close")

    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileNavOverlay.classList.add("active")
            document.body.style.overflow = "hidden"
        })
    }

    // Close mobile menu
    if (mobileNavClose) {
        mobileNavClose.addEventListener("click", () => {
            mobileNavOverlay.classList.remove("active")
            document.body.style.overflow = ""
        })
    }

    // Close mobile menu when clicking overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener("click", (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove("active")
                document.body.style.overflow = ""
            }
        })
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            mobileNavOverlay.classList.remove("active")
            document.body.style.overflow = ""
        }
    })
})
