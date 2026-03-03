// Enhanced property data structure with Firebase integration
let properties = [];
const db = window.firebaseDb;

// update navigation after login
function updateNavUser(user) {
    const navList = document.querySelector('.nav-links');
    if (!navList) return;

    // Remove everything and rebuild for simplicity
    navList.innerHTML = `
        <li><a href="#home">Home</a></li>
        <li><a href="#properties">Properties</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="dashboard.html" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important; padding: 0.5rem 1rem; border-radius: 20px; color: #fff !important; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">Dashboard</a></li>
    `;

    if (user) {
        const displayName = user.displayName || user.email;
        const li = document.createElement('li');
        li.innerHTML = `<span class="nav-username">Hello, ${displayName}</span>`;
        navList.appendChild(li);

        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" class="logout-btn" style="color:#dc3545;">Logout</a>`;
        navList.appendChild(logoutLi);

        logoutLi.querySelector('.logout-btn').addEventListener('click', async (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                await window.firebaseAuth.signOut();
                window.location.reload();
            }
        });
    } else {
        // not logged in - show login button
        const loginLi = document.createElement('li');
        loginLi.innerHTML = `<a href="login.html" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important; padding: 0.5rem 1rem; border-radius: 20px; color: #fff !important; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">Login</a>`;
        navList.appendChild(loginLi);
    }
}

// listen for auth state changes if auth is available
if (window.firebaseAuth) {
    window.firebaseAuth.onAuthStateChanged((user) => {
        updateNavUser(user);
    });
}


// Load properties from Firebase
async function loadProperties() {
    try {
        const snapshot = await db.collection('properties').orderBy('createdAt', 'desc').get();
        
        if (snapshot.empty) {
            loadDemoProperties();
        } else {
            properties = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
    } catch (error) {
        console.error('Error loading properties:', error);
        loadDemoProperties();
    }
    
    displayProperties();
}

// Load demo properties
function loadDemoProperties() {
    properties = [
        {
            id: '1',
            title: "Luxury Villa with Pool",
            category: "residential",
            type: "sale",
            location: "Prime Location, Sector 15",
            price: "₹2.5 Cr",
            rent_price: "₹45,000/month",
            bedrooms: 4,
            bathrooms: 3,
            area: "3500 sq ft",
            description: "Stunning luxury villa with modern amenities and beautiful garden.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e0e0e0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666'%3ELuxury Villa - Main%3C/text%3E%3C/svg%3E"
                }
            ]
        },
        {
            id: '2',
            title: "Modern Apartment",
            category: "residential",
            type: "rent",
            location: "City Center, Downtown",
            price: "₹85 Lac",
            rent_price: "₹25,000/month",
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
        },
        {
            id: '3',
            title: "Commercial Office Space",
            category: "commercial",
            type: "sale",
            location: "Business District, Main Road",
            price: "₹1.8 Cr",
            rent_price: "₹80,000/month",
            bedrooms: 0,
            bathrooms: 2,
            area: "2500 sq ft",
            description: "Prime commercial space perfect for offices, with parking and modern facilities.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23b0b0b0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3EOffice Space%3C/text%3E%3C/svg%3E"
                }
            ]
        },
        {
            id: '4',
            title: "Residential Plot",
            category: "plots",
            type: "sale",
            location: "Green Valley, Sector 22",
            price: "₹65 Lac",
            rent_price: null,
            bedrooms: 0,
            bathrooms: 0,
            area: "2400 sq ft",
            description: "Prime residential plot in developing area with all amenities nearby.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23a8d5a8' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3EResidential Plot%3C/text%3E%3C/svg%3E"
                }
            ]
        },
        {
            id: '5',
            title: "Penthouse with Terrace",
            category: "residential",
            type: "rent",
            location: "Skyline Towers, City Center",
            price: "₹3.2 Cr",
            rent_price: "₹75,000/month",
            bedrooms: 5,
            bathrooms: 4,
            area: "4200 sq ft",
            description: "Luxurious penthouse with private terrace, panoramic city views, and premium amenities.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23d0d0d0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3EPenthouse%3C/text%3E%3C/svg%3E"
                }
            ]
        },
        {
            id: '6',
            title: "Retail Shop Space",
            category: "commercial",
            type: "rent",
            location: "Shopping Complex, Market Area",
            price: "₹95 Lac",
            rent_price: "₹35,000/month",
            bedrooms: 0,
            bathrooms: 1,
            area: "800 sq ft",
            description: "Prime retail space in busy shopping area with high foot traffic.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23a0a0a0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3ERetail Shop%3C/text%3E%3C/svg%3E"
                }
            ]
        },
        {
            id: '7',
            title: "Farmhouse with Land",
            category: "residential",
            type: "sale",
            location: "Countryside, Highway Road",
            price: "₹1.5 Cr",
            rent_price: "₹40,000/month",
            bedrooms: 3,
            bathrooms: 2,
            area: "5000 sq ft",
            description: "Beautiful farmhouse with 1 acre land, perfect for weekend getaway.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23c8e6c8' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3EFarmhouse%3C/text%3E%3C/svg%3E"
                }
            ]
        },
        {
            id: '8',
            title: "Commercial Plot",
            category: "plots",
            type: "sale",
            location: "Industrial Area, NH-8",
            price: "₹2.8 Cr",
            rent_price: null,
            bedrooms: 0,
            bathrooms: 0,
            area: "8000 sq ft",
            description: "Large commercial plot on main highway, ideal for showroom or warehouse.",
            media: [
                {
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23909090' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666'%3ECommercial Plot%3C/text%3E%3C/svg%3E"
                }
            ]
        }
    ];
}

let currentPropertyMedia = [];
let currentMediaIndex = 0;

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
        const displayPrice = property.type === 'rent' ? (property.rent_price || property.rentPrice) : property.price;
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
                            <button class="media-btn" onclick="openMediaGallery('${property.id}')" title="View Gallery">
                                <img src="icons/camera.png" alt="Gallery" class="icon icon-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                                <span style="display:none;">📷</span> ${property.media.length}
                            </button>
                        </div>
                    ` : ''}
                </div>
                <div class="property-details">
                    <span class="property-category">${property.category}</span>
                    <h3>${property.title}</h3>
                    <p class="property-location">
                        <img src="icons/location.png" alt="Location" class="icon icon-small"> ${property.location}
                    </p>
                    <p class="property-price">${displayPrice}</p>
                    <div class="property-features">
                        ${property.bedrooms ? `<div class="feature-item">
                            <img src="icons/bed.png" alt="Bedrooms" class="icon icon-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                            <span style="display:none;">🛏️</span>
                            <span>${property.bedrooms} Beds</span>
                        </div>` : ''}
                        ${property.bathrooms ? `<div class="feature-item">
                            <img src="icons/bath.png" alt="Bathrooms" class="icon icon-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                            <span style="display:none;">🚿</span>
                            <span>${property.bathrooms} Baths</span>
                        </div>` : ''}
                        <div class="feature-item">
                            <img src="icons/area.png" alt="Area" class="icon icon-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                            <span style="display:none;">📐</span>
                            <span>${property.area}</span>
                        </div>
                    </div>
                    <button class="inquire-btn" onclick="openInquiryModal('${property.id}', '${property.title}')">
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
    const property = properties.find(p => p.id == propertyId);
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
    const property = properties.find(p => p.id == propertyId);
    document.getElementById('property-id').value = propertyId;
    document.querySelector('#inquiry-modal .modal-header h2').textContent = `Inquiry: ${propertyTitle}`;
    
    // Pre-fill inquiry type based on property type
    const inquiryTypeSelect = document.querySelector('select[name="inquiryType"]');
    if (property && property.type === 'rent') {
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

// Enhanced form submission - Save to Firebase
document.getElementById('inquiry-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    const property = properties.find(p => p.id == data.propertyId);
    
    if (!property) {
        alert('Property not found');
        return;
    }
    
    // Try to save inquiry to Firebase
    try {
        await db.collection('inquiries').add({
            propertyId: property.id,
            propertyTitle: property.title,
            name: data.name,
            email: data.email,
            phone: data.phone,
            inquiryType: data.inquiryType,
            message: data.message || '',
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert('Thank you for your inquiry! We will contact you within 24 hours.');
    } catch (error) {
        console.error('Firebase error:', error);
        alert('Thank you for your inquiry! (Demo mode - Database not set up yet)\n\nYour inquiry: ' + data.name + ' - ' + data.email);
    }
    
    inquiryModal.style.display = 'none';
    this.reset();
});

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
loadProperties();
