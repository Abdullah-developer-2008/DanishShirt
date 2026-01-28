

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Simple Reveal Animation on Load
document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        '.badge', 'h1', 'p', '.hero-btns', '.trust-indicators', '.hero-visual'
    ];

    elements.forEach((selector, index) => {
        const el = document.querySelector(selector);
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 150 * index);
    });
});

document.getElementById('loadMoreBtn').addEventListener('click', function() {
    // Select all hidden products
    const hiddenProducts = document.querySelectorAll('.extra-row.hidden');
    const batchSize = 4; // Show one row (4 cards) at a time
    
    // Loop through the next 4 hidden items
    for (let i = 0; i < batchSize; i++) {
        if (hiddenProducts[i]) {
            hiddenProducts[i].classList.remove('hidden');
            hiddenProducts[i].classList.add('visible');
        }
    }

    // Check if any hidden products are left
    const remainingHidden = document.querySelectorAll('.extra-row.hidden');
    
    // If no more products are left to show, hide the button
    if (remainingHidden.length === 0) {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
        }, 300); // Smooth exit for the button
    }
});

const stats = document.querySelectorAll('.stat-number');

const countUp = (el) => {
    const target = +el.getAttribute('data-target');
    const count = +el.innerText;
    const speed = 200; 
    const inc = target / speed;

    if (count < target) {
        el.innerText = Math.ceil(count + inc);
        setTimeout(() => countUp(el), 1);
    } else {
        el.innerText = target;
    }
};

// Intersection Observer to trigger when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            countUp(entry.target);
        }
    });
}, { threshold: 1 });

stats.forEach(stat => observer.observe(stat));



// 1. Show the hidden section when Navbar link is clicked
document.querySelector('a[href="#customization"]').addEventListener('click', function(e) {
    e.preventDefault();
    const customSec = document.getElementById('customization-section');
    customSec.style.display = 'block'; // Reveal
    customSec.scrollIntoView({ behavior: 'smooth' });
});

// 2. Handle the Form Submission (Multipart/Form-Data)
// Ensure this is in your script.js
document.getElementById('customForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const btn = e.target.querySelector('button');
    const customSection = document.getElementById('customization-section');
    btn.innerText = "Sending Design...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/custom-design', {
            method: 'POST',
            body: formData // Correctly sends text + image file
        });

        if (response.ok) {
            alert("Thank you! Your custom design request has been sent. We will contact you shortly.");
            e.target.reset();
            customSection.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert("Error sending request. Please check if the server is running.");
        }
    } catch (err) {
        console.error(err);
        alert("Connection failed. Check your Backend (Node.js).");
    } finally {
        btn.innerText = "Submit Customization Request";
        btn.disabled = false;
    }
});


// 1. Functions to control Modal
function openBulkModal() {
    document.getElementById('bulkModal').style.display = 'flex';
}

function closeBulkModal() {
    document.getElementById('bulkModal').style.display = 'none';
}

// 2. Attach to Navbar link
document.querySelector('a[href="#bulk"]').addEventListener('click', (e) => {
    e.preventDefault();
    openBulkModal();
});

// 3. Handle Form Submission
document.getElementById('bulkOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    btn.innerText = "Processing...";
    btn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/bulk-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Bulk inquiry sent successfully! Our wholesale team will contact you within 24 hours.");
            e.target.reset();
            closeBulkModal();
        }
    } catch (err) {
        alert("Server error. Please check your connection.");
    } finally {
        btn.innerText = "Submit Bulk Request";
        btn.disabled = false;
    }
});

// Hero Section Button Logic
const heroCustomBtn = document.getElementById('hero-custom-btn');

if (heroCustomBtn) {
    heroCustomBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const customSec = document.getElementById('customization-section');
        
        // 1. Make sure the section is visible
        customSec.style.display = 'block'; 
        
        // 2. Smoothly scroll to the form
        customSec.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        // 3. Optional: Focus the first input field to help the user start typing immediately
        const firstInput = customSec.querySelector('input[name="userName"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 800); // Wait for scroll to finish
        }
    });
}

// Final CTA Button Logic
const finalCtaBtn = document.getElementById('final-cta-btn');

if (finalCtaBtn) {
    finalCtaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Use the function we defined for the Bulk Order Modal
        if (typeof openBulkModal === "function") {
            openBulkModal();
        } else {
            // Fallback: If for some reason the modal isn't ready
            alert("Our bulk order system is loading. Please try again in a second.");
        }
    });
}

// Footer Logic
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle all "Customization" related links in footer
    const footerTriggers = document.querySelectorAll('.footer-custom-trigger');
    const customSec = document.getElementById('customization-section');

    footerTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Only prevent default if we are on index.html
            if (customSec) {
                e.preventDefault();
                customSec.style.display = 'block';
                customSec.scrollIntoView({ behavior: 'smooth' });
                
                // Optional: Update the form header based on what they clicked
                const serviceName = e.target.innerText;
                customSec.querySelector('h2').innerHTML = `Custom <span style="color: var(--accent-gold);">${serviceName}</span>`;
            }
        });
    });

    // 2. Social Media Links (Simple placeholder logic)
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === "#") {
                e.preventDefault();
                alert("Our social media pages are launching soon!");
            }
        });
    });
});



const products = [
    { 
        name: "Pro Athletic Jersey", 
        cat: "Sportswear", 
        price: "5.00", 
        // Array of images: [Front, Side, Back]
        images: [
            "img/jersey-front.png", 
            "img/jersey-side.png", 
            "img/jersey-back.png"
        ], 
        keywords: "shirt football kit soccer jersey tshirt blue top" 
    },
];

// script.js
function goToDetail(name, cat, price, ...imgs) {
    // 1. Join all images with a comma
    const imgString = encodeURIComponent(imgs.join(','));
    
    // 2. Build the URL using 'imgs' for the multiple images
    const url = `pages/product-detail.html?name=${encodeURIComponent(name)}&cat=${encodeURIComponent(cat)}&price=${price}&imgs=${imgString}`;
    
    // 3. Navigate to the page
    window.location.href = url;
}

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Optional: Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}));