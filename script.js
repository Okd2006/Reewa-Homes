// Enhanced property data structure with multiple images/videos and sale/rent options
const properties = JSON.parse(localStorage.getItem('properties')) || [
    {
        id: 1,
        title: "Luxury Villa with Pool",
        category: "residential",
        type: "sale", // sale or rent
        location: "Prime Location, Sector 15",
        price: "₹2.5 Cr",
        rentPrice: "₹45,000/month",
        bedrooms: 4,
        bathrooms: 3,
        area: "3500 sq ft",
        description: "Stunning luxury villa with modern amenities and beautiful garden.",
        media: [
            {
                type: "image",
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e0e0e0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666'%3ELuxury Villa - Main%3C/text%3E%3C/svg%3E"
            },
            {
                type: "image", 
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23d0d0d0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666'%3ELiving Room%3C/text%3E%3C/svg%3E"
            }
        ]
    },
    {
        id: 2,
        title: "Modern Apartment",
        category: "residential",
        type: "rent",
        location: "City Center, Downtown",
        price: "₹85 Lac",
        rentPrice: "₹25,000/month",
        bedrooms: 3,
        bathrooms: 2,
        area: "1800 sq ft",
        description: "Contemporary apartment with city views and premium finishes.",
        media: [
            {
                type: "image",
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23c0c0c0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3EModern Apartment%3C/text%3E%3C/svg%3E"
            }
        ]
    }
];

let currentPropertyMedia = [];
let currentMediaIndex = 0;

// Save properties to localStorage
function saveProperties() {
    localStorage.setItem('properties', JSON.stringify(properties));
}

// Display properties with enhanced filtering
function displayProperties(type = 'all', category = 'all') {
    const grid = document.getElementById('properties-grid');
    let filtered = properties;
    
    if (type !== 'all') {
        filtered = filtered.filter(p => p.type === type);
    }
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    grid.innerHTML = filtered.map(property => {
        const displayPrice = property.type === 'rent' ? property.rentPrice : property.price;
        const mainImage = property.media && property.media.length > 0 ? property.media[0].url : 
            `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e0e0e0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666'%3E${property.title}%3C/text%3E%3C/svg%3E`;
        
        return `
            <div class="property-card">
                <div class="property-media">
                    <div class="property-image-slider">
                        <img src="${mainImage}" alt="${property.title}" class="property-image">
                    </div>
                    <div class="property-type-badge">${property.type === 'sale' ? 'For Sale' : 'For Rent'}</div>
                    ${property.media && property.media.length > 1 ? `
                        <div class="media-controls">
                            <button class="media-btn" onclick="openMediaGallery(${property.id})" title="View Gallery">
                                📷 ${property.media.length}
                            </button>
                        </div>
                    ` : ''}
                </div>
                <div class="property-details">
                    <span class="property-category">${property.category}</span>
                    <h3>${property.title}</h3>
                    <p class="property-location">📍 ${property.location}</p>
                    <p class="property-price">${displayPrice}</p>
                    <div class="property-features">
                        ${property.bedrooms ? `<div class="feature-item"><span>🛏️</span><span>${property.bedrooms} Beds</span></div>` : ''}
                        ${property.bathrooms ? `<div class="feature-item"><span>🚿</span><span>${property.bathrooms} Baths</span></div>` : ''}
                        <div class="feature-item"><span>📐</span><span>${property.area}</span></div>
                    </div>
                    <button class="inquire-btn" onclick="openInquiryModal(${property.id}, '${property.title}')">
                        Inquire Now
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Property type filtering (Sale/Rent)
document.querySelectorAll('.type-tab').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.type-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        displayProperties(this.dataset.type, activeCategory);
    });
});

// Category filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const activeType = document.querySelector('.type-tab.active').dataset.type;
        displayProperties(activeType, this.dataset.category);
    });
});

// Media gallery functionality
function openMediaGallery(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.media || property.media.length === 0) return;
    
    currentPropertyMedia = property.media;
    currentMediaIndex = 0;
    
    const modal = document.getElementById('media-modal');
    modal.style.display = 'block';
    
    displayCurrentMedia();
}

function displayCurrentMedia() {
    const mediaDisplay = document.getElementById('media-display');
    const current = currentPropertyMedia[currentMediaIndex];
    
    if (current.type === 'video') {
        mediaDisplay.innerHTML = `<video controls autoplay muted><source src="${current.url}" type="video/mp4"></video>`;
    } else {
        mediaDisplay.innerHTML = `<img src="${current.url}" alt="Property Image">`;
    }
    
    document.getElementById('media-current').textContent = currentMediaIndex + 1;
    document.getElementById('media-total').textContent = currentPropertyMedia.length;
}

function changeMedia(direction) {
    currentMediaIndex += direction;
    
    if (currentMediaIndex >= currentPropertyMedia.length) {
        currentMediaIndex = 0;
    } else if (currentMediaIndex < 0) {
        currentMediaIndex = currentPropertyMedia.length - 1;
    }
    
    displayCurrentMedia();
}

// Enhanced modal functionality
const inquiryModal = document.getElementById('inquiry-modal');
const mediaModal = document.getElementById('media-modal');
const closeBtns = document.querySelectorAll('.close');

function openInquiryModal(propertyId, propertyTitle) {
    const property = properties.find(p => p.id === propertyId);
    document.getElementById('property-id').value = propertyId;
    document.querySelector('#inquiry-modal .modal-header h2').textContent = `Inquiry: ${propertyTitle}`;
    
    // Pre-fill inquiry type based on property type
    const inquiryTypeSelect = document.querySelector('select[name="inquiryType"]');
    if (property.type === 'rent') {
        inquiryTypeSelect.value = 'rental';
    } else {
        inquiryTypeSelect.value = 'purchase';
    }
    
    inquiryModal.style.display = 'block';
}

closeBtns.forEach(btn => {
    btn.onclick = function() {
        inquiryModal.style.display = 'none';
        mediaModal.style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target == inquiryModal) {
        inquiryModal.style.display = 'none';
    }
    if (event.target == mediaModal) {
        mediaModal.style.display = 'none';
    }
}

// Enhanced form submission
document.getElementById('inquiry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    const property = properties.find(p => p.id == data.propertyId);
    
    // Create detailed email
    const subject = `${data.inquiryType.toUpperCase()} Inquiry - ${property.title}`;
    const body = `Property: ${property.title}%0D%0A` +
                `Type: ${property.type === 'sale' ? 'For Sale' : 'For Rent'}%0D%0A` +
                `Price: ${property.type === 'sale' ? property.price : property.rentPrice}%0D%0A` +
                `Location: ${property.location}%0D%0A%0D%0A` +
                `Client Details:%0D%0A` +
                `Name: ${data.name}%0D%0A` +
                `Email: ${data.email}%0D%0A` +
                `Phone: ${data.phone}%0D%0A` +
                `Inquiry Type: ${data.inquiryType}%0D%0A%0D%0A` +
                `Message: ${data.message}`;
    
    window.location.href = `mailto:info@reewahomes.com?subject=${subject}&body=${body}`;
    
    inquiryModal.style.display = 'none';
    this.reset();
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
});

// Logo handling
function checkLogo() {
    const logoImg = document.getElementById('logo-img');
    const logoText = document.querySelector('.logo-text');
    
    // Try to load logo.png
    const img = new Image();
    img.onload = function() {
        logoImg.style.display = 'block';
        logoText.style.display = 'none';
    };
    img.onerror = function() {
        logoImg.style.display = 'none';
        logoText.style.display = 'block';
    };
    img.src = 'logo.png';
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize
displayProperties();
checkLogo();
