// light or dark theme btn
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // 1. Check if theme was previously saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // 2. Click Event Listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Check current state
            const isLight = htmlElement.getAttribute('data-theme') === 'light';

            if (isLight) {
                // Switch to Dark
                htmlElement.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
                console.log("Switched to Dark Mode");
            } else {
                // Switch to Light
                htmlElement.setAttribute('data-theme', 'light');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
                console.log("Switched to Light Mode");
            }
        });
    }
});
// auto scroll animation
document.addEventListener('DOMContentLoaded', function() {
    // 1. Un sab cheezon ki list jinhe animate karna hai
    // Humne headings, cards, sections aur forms ko target kiya hai
    const animateMe = document.querySelectorAll('section, .card, h1, h2, h3, .skill-logo-card, .service-icon, .custom-form-control, .btn');

    animateMe.forEach((el, index) => {
        // Har element par automatically AOS ka attribute laga do
        el.setAttribute('data-aos', 'fade-up');
        
        // Thora sa delay dalo taake ek ke baad ek "pop" hokar ayen
        // (index % 3) ka matlab hai 3 cards ki row mein delay 0, 100, 200 hoga
        el.setAttribute('data-aos-delay', (index % 3) * 100);
    });

    // 2. AOS ko final initialize karo
    AOS.init({
        duration: 1000, // 1 second ki animation
        once: false,    // Har baar scroll par animation hogi (Eye-catching!)
        offset: 100,    // Jab element screen ke thora kareeb ho tabhi start ho
        easing: 'ease-in-out'
    });
});
// Neon Cursel
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    // Agar elements mil jayein tabhi move karo
    if (cursor && follower) {
        // Main dot (Fauran move karega)
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Follower (Halka sa smooth delay)
        follower.style.transform = `translate(${e.clientX - 11}px, ${e.clientY - 11}px)`;
    }
});
// Navbar Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Jab scroll karein to class add ho jaye
    } else {
        navbar.classList.remove('scrolled'); // Wapas upar jayein to purani halat mein aa jaye
    }
});
// typewritter
const textElement = document.getElementById('typewriter');
const words = ["Web Developer", "UI/UX Designer", "Freelancer", "Full Stack Dev"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    // Current word uthao
    const currentWord = words[wordIndex];
    
    // Check karo ke delete ho raha hai ya type
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100; // Delete tez hoga
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // Type normal hoga
    }

    // Word khatam ho jaye to pause karo phir delete shuru karo
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Poora word likhne ke baad 2 sec ka gap
    } 
    // Word poora delete ho jaye to agla word lao
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Naya word shuru karne se pehle thora gap
    }

    setTimeout(type, typeSpeed);
}
// Back to top
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // Agar 300px se ziada scroll kiya to button dikhao
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Click karne par smoothly upar le jaye
backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NEON CURSOR LOGIC ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if(cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            setTimeout(() => {
                follower.style.transform = `translate(${e.clientX - 11}px, ${e.clientY - 11}px)`;
            }, 50);
        });
    }

    // --- 2. TYPEWRITER LOGIC ---
    const textElement = document.getElementById('typewriter');
    if(textElement) {
        const words = ["Web Developer", "UI/UX Designer", "Freelancer"];
        let wordIndex = 0; let charIndex = 0; let isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            textElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            let typeSpeed = isDeleting ? 100 : 150;
            if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; typeSpeed = 2000; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- 3. TILT EFFECT (FOR CARDS) ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.2
        });
    }

    // --- 4. AOS INITIALIZE ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: false });
    }
});
// Jab page load ho tab shuru karo
document.addEventListener('DOMContentLoaded', type);
/* ===============================
   CONTACT FORM (AJAX)
================================ */
$(document).ready(function () {

    $("#contactForm").submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var url = form.attr('action');
        var formMessages = $('#form-messages');

        formMessages
            .text("Sending...")
            .removeClass('text-success text-danger')
            .addClass('text-info');

        $.ajax({
            type: 'POST',
            url: url,
            data: form.serialize(),
            dataType: 'json',

            success: function (response) {
                if (response && response.ok) {
                    formMessages
                        .removeClass('text-danger text-info')
                        .addClass('text-success')
                        .text("Message sent successfully!");
                    form[0].reset();
                } else {
                    formMessages
                        .removeClass('text-success text-info')
                        .addClass('text-danger')
                        .text("An unknown error occurred on the server.");
                }
            },

            error: function () {
                formMessages
                    .removeClass('text-success text-info')
                    .addClass('text-danger')
                    .text("An unknown error occurred on the server.");
            }
        });
    });

});


/* ===============================
   MODAL CLOSE → VIDEO RESET
================================ */
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hidden.bs.modal', function () {
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
});


/* ===============================
   LIVE PREVIEW → MODAL ONLY
   (NO NEW TAB, NO FILE NOT FOUND)
================================ */
document.querySelectorAll('.preview-btn').forEach(btn => {

    btn.addEventListener('click', function (e) {
        e.preventDefault();     // stop anchor / submit
        e.stopPropagation();    // stop bubbling

        const target = this.getAttribute('data-bs-target');
        if (!target) return;

        const modal = document.querySelector(target);
        if (!modal) return;

        bootstrap.Modal.getOrCreateInstance(modal).show();
    });

});

