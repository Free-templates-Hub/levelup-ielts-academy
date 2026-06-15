// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

function toggleMobile() {
    document.getElementById("mobileMenu").classList.toggle("open");
}
function closeMobile() {
    document.getElementById("mobileMenu").classList.remove("open");
}

// ═══════════════════════════════════════
// SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════════
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Animate skill bars inside
            const bars = entry.target.querySelectorAll(".skill-bar");
            bars.forEach(bar => {
                const w = bar.getAttribute("data-width");
                if (w) {
                    bar.style.setProperty("--bar-width", w + "%");
                    bar.classList.add("animated");
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll(".journey-step, .success-card, .mentor-card, .plan-card").forEach(el => {
    observer.observe(el);
});

// ═══════════════════════════════════════
// SCORE SIMULATOR
// ═══════════════════════════════════════
let simStep = 1;
const simAnswers = {};

function selectSimOpt(btn, step) {
    const container = btn.parentElement;
    container.querySelectorAll(".sim-opt").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    simAnswers[step] = btn.getAttribute("data-value");
}

function simNext() {
    if (simStep === 1 && !simAnswers[1]) {
        alert("Iltimos, darajangizni tanlang");
        return;
    }
    if (simStep === 2 && !simAnswers[2]) {
        alert("Iltimos, vaqtingizni tanlang");
        return;
    }
    if (simStep === 3 && !simAnswers[3]) {
        alert("Iltimos, muddatingizni tanlang");
        return;
    }

    if (simStep < 3) {
        document.getElementById("simStep" + simStep).classList.remove("active");
        simStep++;
        document.getElementById("simStep" + simStep).classList.add("active");
        document.getElementById("simProgressFill").style.width = ((simStep / 4) * 100) + "%";
        document.getElementById("simProgressText").textContent = simStep + " / 4";
        document.getElementById("simBackBtn").disabled = false;
    } else {
        // Show result
        document.getElementById("simStep3").classList.remove("active");
        document.getElementById("simResult").classList.add("active");
        document.getElementById("simProgressFill").style.width = "100%";
        document.getElementById("simProgressText").textContent = "Tayyor ✓";
        document.getElementById("simBackBtn").style.display = "none";
        document.getElementById("simNextBtn").style.display = "none";

        // Calculate prediction
        calculateResult();
    }
}

function simBack() {
    if (simStep > 1 && simStep <= 3) {
        document.getElementById("simStep" + simStep).classList.remove("active");
        simStep--;
        document.getElementById("simStep" + simStep).classList.add("active");
        document.getElementById("simProgressFill").style.width = ((simStep / 4) * 100) + "%";
        document.getElementById("simProgressText").textContent = simStep + " / 4";
        if (simStep === 1) document.getElementById("simBackBtn").disabled = true;
    }
}

function calculateResult() {
    const level = simAnswers[1];
    const hours = simAnswers[2];
    const months = parseInt(simAnswers[3]);

    let baseScore = 5.0;
    if (level === "beginner") baseScore = 5.0;
    else if (level === "intermediate") baseScore = 6.0;
    else baseScore = 6.5;

    let improvement = 0;
    if (hours === "1-2") improvement = 0.5;
    else if (hours === "3-4") improvement = 1.0;
    else improvement = 1.5;

    let multiplier = months <= 3 ? 0.7 : months <= 6 ? 1.0 : 1.3;
    let predicted = (baseScore + improvement * multiplier).toFixed(1);
    if (parseFloat(predicted) > 9.0) predicted = "9.0";

    document.getElementById("predValue").textContent = "IELTS " + predicted;
    document.getElementById("predTime").textContent = months + " oy ichida";
}

// ═══════════════════════════════════════
// LEVEL TEST (CTA Section)
// ═══════════════════════════════════════
let tfStep = 1;
const tfAnswers = {};

function selectTfOpt(btn, step) {
    const container = btn.parentElement;
    container.querySelectorAll(".tf-opt").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    tfAnswers[step] = true;
}

function tfNext() {
    if (tfStep === 1 && !tfAnswers[1]) {
        alert("Iltimos, darajangizni tanlang");
        return;
    }
    if (tfStep === 2 && !tfAnswers[2]) {
        alert("Iltimos, maqsadingizni tanlang");
        return;
    }

    if (tfStep < 3) {
        document.getElementById("tfStep" + tfStep).classList.remove("active");
        tfStep++;
        document.getElementById("tfStep" + tfStep).classList.add("active");
        document.getElementById("tfProgressFill").style.width = ((tfStep / 3) * 100) + "%";
        document.getElementById("tfBackBtn").disabled = false;
    } else {
        // Check if name and phone are filled
        const name = document.getElementById("tfName").value;
        const phone = document.getElementById("tfPhone").value;
        if (!name || !phone) {
            alert("Iltimos, ismingiz va telefon raqamingizni kiriting");
            return;
        }
        document.getElementById("tfStep3").classList.remove("active");
        document.getElementById("tfResult").classList.add("active");
        document.getElementById("tfProgressFill").style.width = "100%";
        document.getElementById("tfBackBtn").style.display = "none";
        document.getElementById("tfNextBtn").style.display = "none";
    }
}

function tfBack() {
    if (tfStep > 1) {
        document.getElementById("tfStep" + tfStep).classList.remove("active");
        tfStep--;
        document.getElementById("tfStep" + tfStep).classList.add("active");
        document.getElementById("tfProgressFill").style.width = ((tfStep / 3) * 100) + "%";
        if (tfStep === 1) document.getElementById("tfBackBtn").disabled = true;
    }
}

// ═══════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ═══════════════════════════════════════
// ANIMATE ELEMENTS ON SCROLL
// ═══════════════════════════════════════
function animateOnScroll() {
    const elements = document.querySelectorAll(
        ".journey-step, .success-card, .mentor-card, .plan-card, .analytics-feature"
    );
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// ═══════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════
function animateCounter(el, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate chart bars on scroll
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".ad-bar");
            bars.forEach((bar, i) => {
                bar.style.transition = `height 0.6s ease ${i * 0.08}s`;
            });
        }
    });
}, { threshold: 0.3 });

const chartArea = document.querySelector(".ad-chart-bars");
if (chartArea) chartObserver.observe(chartArea);

// Fade in elements with stagger
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.children;
            Array.from(siblings).forEach((sib, i) => {
                sib.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
                if (!sib.classList.contains("visible")) {
                    sib.classList.add("visible");
                    sib.style.opacity = "1";
                    sib.style.transform = "translateY(0)";
                }
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".plans-grid, .success-grid, .mentors-grid, .analytics-features").forEach(grid => {
    fadeObserver.observe(grid);
});

console.log("LevelUp IELTS — Platform loaded successfully ✨");
