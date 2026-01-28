document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const products = document.querySelectorAll('.product-card');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterProducts();
        });
    });

    function filterProducts() {
        // Get array of values from all checked boxes
        const activeFilters = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value);

        products.forEach(product => {
            const productCat = product.getAttribute('data-category');

            // If no filters are selected, show all. Otherwise, check for match.
            if (activeFilters.length === 0 || activeFilters.includes(productCat)) {
                product.style.display = 'block';
                // Add a small delay to trigger CSS fade-in
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 10);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'scale(0.95)';
                // Wait for animation to finish before removing from layout
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxes = document.querySelectorAll('.filter-checkbox'); // For categories
    const techCheckboxes = document.querySelectorAll('.tech-checkbox'); // Add this class to your Tech checkboxes
    const products = document.querySelectorAll('.product-card');

    const allCheckboxes = [...categoryCheckboxes, ...techCheckboxes];

    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterGallery);
    });

    function filterGallery() {
        const activeCategories = Array.from(categoryCheckboxes).filter(c => c.checked).map(c => c.value);
        const activeTechs = Array.from(techCheckboxes).filter(t => t.checked).map(t => t.value);

        products.forEach(product => {
            const productCat = product.getAttribute('data-category');
            const productTech = product.getAttribute('data-tech');

            // Logic: Must match Category (if any selected) AND Tech (if any selected)
            const catMatch = activeCategories.length === 0 || activeCategories.includes(productCat);
            const techMatch = activeTechs.length === 0 || activeTechs.includes(productTech);

            if (catMatch && techMatch) {
                showProduct(product);
            } else {
                hideProduct(product);
            }
        });
    }

    function showProduct(el) {
        el.style.display = 'block';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, 50);
    }

    function hideProduct(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
            el.style.display = 'none';
        }, 300);
    }
});
const sortDropdown = document.querySelector('.sort-dropdown');
if (sortDropdown) {
    document.querySelector('.sort-dropdown').addEventListener('change', function () {
        const grid = document.getElementById('productGrid');
        const cards = Array.from(grid.querySelectorAll('.product-card'));
        const sortValue = this.value;

        cards.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            const titleA = a.querySelector('h3').innerText.toLowerCase();
            const titleB = b.querySelector('h3').innerText.toLowerCase();

            if (sortValue === "Price: Low to High") {
                return priceA - priceB;
            } else if (sortValue === "Price: High to Low") {
                return priceB - priceA;
            } else if (sortValue === "Alphabetical") {
                return titleA.localeCompare(titleB);
            }
            return 0; // Default (Featured/No Sort)
        });

        // Clear and Re-append sorted cards
        grid.innerHTML = "";
        cards.forEach(card => grid.appendChild(card));
    });
}
const clearBtn = document.getElementById('clearFilters');
if (clearBtn) {
    document.getElementById('clearFilters').addEventListener('click', () => {
        // Uncheck all boxes
        document.querySelectorAll('.filter-checkbox, .tech-checkbox').forEach(cb => cb.checked = false);

        // Show all products
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
    });
}

function goToDetail(name, cat, price, ...imgs) {
    // 1. Join all images with a comma
    const imgString = encodeURIComponent(imgs.join(','));

    // 2. Build the URL using 'imgs' for the multiple images
    const url = `product-detail.html?name=${encodeURIComponent(name)}&cat=${encodeURIComponent(cat)}&price=${price}&imgs=${imgString}`;

    // 3. Navigate to the page
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // CONFIGURATION: Set how many products to show per click
    const BATCH_SIZE = 4; 

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 1. Get all products that currently have the 'hidden' class
            const hiddenProducts = document.querySelectorAll('.product-card.hidden');

            // 2. Loop through only the first few (the BATCH_SIZE)
            for (let i = 0; i < BATCH_SIZE; i++) {
                if (hiddenProducts[i]) {
                    // Remove the hidden class to reveal the product
                    hiddenProducts[i].classList.remove('hidden');
                    
                    // Add an 'active' or 'show' class if you want a fade-in effect
                    hiddenProducts[i].style.opacity = '0';
                    setTimeout(() => {
                        hiddenProducts[i].style.opacity = '1';
                        hiddenProducts[i].style.transition = 'opacity 0.5s ease';
                    }, 10);
                }
            }

            // 3. Check if there are any hidden products left
            // We check again AFTER revealing the batch
            const remainingHidden = document.querySelectorAll('.product-card.hidden');
            if (remainingHidden.length === 0) {
                loadMoreBtn.style.display = 'none'; // Hide button when list is finished
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // 1. Toggle Menu on Click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 2. Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Close menu if window is resized above mobile width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

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