/* ===============
   PKHEALTHSCIENCE
   Main JavaScript
   ================ */


/* =========
   1. SELECT ELEMENTS
   ================== */

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");

const navLinks = document.querySelectorAll(".nav-link");


/* =======================
   2. CURRENT YEAR
   ===================== */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   3. OPEN MOBILE MENU
   ========================================================= */

function openMenu() {

    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");

    document.body.classList.add("menu-open");

    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    // Move keyboard focus into the menu
    if (menuClose) {
        setTimeout(() => {
            menuClose.focus();
        }, 300);
    }
}


/* =========================================================
   4. CLOSE MOBILE MENU
   ========================================================= */

function closeMenu() {

    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

    document.body.classList.remove("menu-open");

    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    // Return focus to hamburger button
    menuToggle.focus();
}


/* =========================================================
   5. HAMBURGER EVENTS
   ========================================================= */

menuToggle.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});


/* Close button */

menuClose.addEventListener("click", closeMenu);


/* Overlay click */

menuOverlay.addEventListener("click", closeMenu);


/* =========================================================
   6. CLOSE MENU WHEN LINK IS CLICKED
   ========================================================= */

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


/* =========================================================
   7. ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        mobileMenu.classList.contains("active")
    ) {
        closeMenu();
    }

});


/* =========================================================
   8. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        // Ignore empty "#"
        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   9. ACTIVE NAVIGATION STATE
   ========================================================= */

function updateActiveNavigation() {

    const sections = document.querySelectorAll("main section[id]");

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

        if (
            window.scrollY < 300 &&
            href === "index.html"
        ) {
            link.classList.add("active");
        }

    });

}


/* =========================================================
   10. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                // Stop observing once revealed
                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   11. BACK TO TOP BUTTON
   ========================================================= */

function handleBackToTop() {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener("scroll", () => {

    handleBackToTop();
    updateActiveNavigation();

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   12. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", event => {

    // Close menu if user presses Escape
    if (event.key === "Escape") {

        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        }

    }

});


/* =========================================================
   13. INITIALIZE
   ========================================================= */

handleBackToTop();
updateActiveNavigation();

console.log(
    "PKHealthScience loaded successfully."
);

/* =========================================================
   PKHEALTHSCIENCE REGISTRATION - MINIMUM 4 COURSES
   ========================================================= */

const registrationForm = document.querySelector(".registration-form");

if (registrationForm) {

    registrationForm.addEventListener("submit", function (event) {

        const selectedCourses = registrationForm.querySelectorAll(
            'input[name="courses[]"]:checked'
        );

        if (selectedCourses.length < 4) {

            event.preventDefault();

            alert(
                "Please select at least 4 courses before submitting your registration."
            );

            const courseSection =
                document.querySelector(".course-selection-grid");

            if (courseSection) {
                courseSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            return;
        }

    });

}