// Enhanced admin functionality with media support
let properties = JSON.parse(localStorage.getItem('properties')) || [];
let currentMedia = [];
let editingPropertyId = null;

// Save properties to localStorage
function saveProperties() {
    localStorage.setItem('properties', JSON.stringify(properties));
}

// Add media URL
function addMediaUrl() {
    const urlInput = document.getElementById('media-url');
    const typeSelect = document.getElementById('media-type');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }
    
    const mediaItem = {
        type: typeSelect.value,
        url: url
    };
    
    currentMedia.push(mediaItem);
    urlInput.value = '';
    displayMediaList();
}

// Display media list in admin
function displayMediaList() {
    const mediaList = document.getElementById('media-list');
    
    mediaList.innerHTML = currentMedia.map((media, index) => `
        <div class="media-item">
            ${media.type === 'video' 
                ? `<video src="${media.url}" muted></video>`
                : `<img src="${media.url}" alt="Property media">`
            }
            <button type="button" class="media-remove" onclick="removeMedia(${index})">×</button>
        </div>
    `).join('');
}

// Remove media item
function removeMedia(index) {
    currentMedia.splice(index, 1);
    displayMediaList();
}

// Display properties in admin panel
function displayProperties() {
    const list = document.getElementById('property-list');
    
    if (properties.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No properties added yet. Add your first property above!</p>';
        return;
    }
    
    list.innerHTML = properties.map(property => `
        <div class="property-item">
            <div class="property-info">
                <h4>${property.title}</h4>
                <div class="property-meta">
                    <span>${property.category} • ${property.type === 'sale' ? 'For Sale' : 'For Rent'}</span><br>
                    <span>${property.location} • ${property.type === 'sale' ? property.price : property.rentPrice}</span><br>
                    <small>${property.media ? property.media.length : 0} media files</small>
                </div>
            </div>
            <div class="property-actions">
                <button class="edit-btn" onclick="editProperty(${property.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProperty(${property.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Edit property
function editProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;
    
    editingPropertyId = id;
    currentMedia = property.media ? [...property.media] : [];
    
    // Fill form with property data
    const form = document.getElementById('add-property-form');
    form.title.value = property.title;
    form.category.value = property.category;
    form.type.value = property.type;
    form.location.value = property.location;
    form.description.value = property.description || '';
    form.price.value = property.price;
    form.rentPrice.value = property.rentPrice || '';
    form.bedrooms.value = property.bedrooms || '';
    form.bathrooms.value = property.bathrooms || '';
    form.area.value = property.area;
    
    document.getElementById('edit-id').value = id;
    document.getElementById('submit-btn').textContent = 'Update Property';
    
    displayMediaList();
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

// Add/Update property
document.getElementById('add-property-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const editId = formData.get('editId');
    
    const propertyData = {
        id: editId ? parseInt(editId) : Date.now(),
        title: formData.get('title'),
        category: formData.get('category'),
        type: formData.get('type'),
        location: formData.get('location'),
        description: formData.get('description'),
        price: formData.get('price'),
        rentPrice: formData.get('rentPrice'),
        bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms')) : null,
        bathrooms: formData.get('bathrooms') ? parseInt(formData.get('bathrooms')) : null,
        area: formData.get('area'),
        media: [...currentMedia]
    };
    
    if (editId) {
        // Update existing property
        const index = properties.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            properties[index] = propertyData;
            alert('Property updated successfully!');
        }
    } else {
        // Add new property
        properties.push(propertyData);
        alert('Property added successfully!');
    }
    
    saveProperties();
    displayProperties();
    
    // Reset form
    this.reset();
    currentMedia = [];
    editingPropertyId = null;
    document.getElementById('edit-id').value = '';
    document.getElementById('submit-btn').textContent = 'Add Property';
    displayMediaList();
});

// Delete property
function deleteProperty(id) {
    const property = properties.find(p => p.id === id);
    if (confirm(`Are you sure you want to delete "${property.title}"?`)) {
        properties = properties.filter(p => p.id !== id);
        saveProperties();
        displayProperties();
        alert('Property deleted successfully!');
    }
}

// Logo handling for admin
function checkAdminLogo() {
    const logoImg = document.getElementById('admin-logo-img');
    const logoText = document.querySelector('.logo-text');
    
    const img = new Image();
    img.onload = function() {
        logoImg.style.display = 'block';
        logoText.textContent = 'Admin Panel';
    };
    img.onerror = function() {
        logoImg.style.display = 'none';
        logoText.textContent = 'Reewa Homes - Admin';
    };
    img.src = 'logo.png';
}

// Initialize admin panel
displayProperties();
checkAdminLogo();
