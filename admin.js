// Admin functionality with Firebase integration
const db = window.firebaseDb;
const auth = window.firebaseAuth;
const storage = window.firebaseStorage;
let properties = [];
let inquiries = [];
let currentMedia = [];
let editingPropertyId = null;
let selectedFiles = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Admin panel loading...');
    
    // Wait for auth state to be determined
    auth.onAuthStateChanged(async (user) => {
        console.log('Auth state changed. User:', user ? user.email : 'Not logged in');
        
        if (!user) {
            console.warn('User not authenticated! Redirecting to login...');
            alert('You must be logged in to access the admin panel.');
            window.location.href = 'login.html';
            return;
        }
        
        // User is logged in, load data
        console.log('User authenticated:', user.email);
        await loadProperties();
        await loadInquiries();
        displayProperties();
        displayInquiries();
    });
});

// Load properties from Firebase
async function loadProperties() {
    try {
        const snapshot = await db.collection('properties').orderBy('createdAt', 'desc').get();
        properties = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error loading properties:', error);
        properties = [];
    }
}

// Load inquiries from Firebase
async function loadInquiries() {
    try {
        const snapshot = await db.collection('inquiries').orderBy('createdAt', 'desc').get();
        inquiries = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error loading inquiries:', error);
        inquiries = [];
    }
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

// Handle file selection
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('media-file');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            selectedFiles = Array.from(e.target.files);
            const fileStatus = document.getElementById('file-status');
            const uploadBtn = document.getElementById('upload-btn');
            
            if (selectedFiles.length > 0) {
                fileStatus.textContent = `${selectedFiles.length} file(s) selected`;
                uploadBtn.style.display = 'inline-block';
            } else {
                fileStatus.textContent = 'No files selected';
                uploadBtn.style.display = 'none';
            }
        });
    }
});

// Upload media files to Firebase Storage
async function uploadMediaFiles() {
    if (selectedFiles.length === 0) {
        alert('Please select files first');
        return;
    }
    
    // Check if storage is initialized
    if (!storage) {
        alert('Firebase Storage is not initialized. Please refresh the page.');
        console.error('Storage not initialized:', storage);
        return;
    }
    
    const uploadProgress = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const uploadBtn = document.getElementById('upload-btn');
    
    uploadProgress.style.display = 'block';
    uploadBtn.disabled = true;
    
    try {
        console.log('Starting upload of', selectedFiles.length, 'files');
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileName = `properties/${Date.now()}_${file.name}`;
            const storageRef = storage.ref(fileName);
            
            console.log('Uploading file:', fileName);
            progressText.textContent = `Uploading ${i + 1} of ${selectedFiles.length}: ${file.name}`;
            
            // Upload file
            const uploadTask = storageRef.put(file);
            
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progressBar.style.width = progress + '%';
                        console.log('Upload progress:', progress.toFixed(2) + '%');
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
                        
                        console.log('File uploaded successfully:', downloadURL);
                        
                        currentMedia.push({
                            type: mediaType,
                            url: downloadURL
                        });
                        
                        resolve();
                    }
                );
            });
        }
        
        console.log('All files uploaded. Current media:', currentMedia);
        progressText.textContent = 'Upload complete!';
        displayMediaList();
        
        // Reset
        setTimeout(() => {
            uploadProgress.style.display = 'none';
            progressBar.style.width = '0%';
            document.getElementById('media-file').value = '';
            document.getElementById('file-status').textContent = 'No files selected';
            uploadBtn.style.display = 'none';
            uploadBtn.disabled = false;
            selectedFiles = [];
        }, 2000);
        
    } catch (error) {
        console.error('Upload error:', error);
        alert('Error uploading files: ' + error.message + '\n\nPlease check:\n1. Firebase Storage is enabled\n2. Storage rules allow uploads\n3. You are logged in');
        uploadBtn.disabled = false;
        uploadProgress.style.display = 'none';
    }
}

// Display media list
function displayMediaList() {
    const mediaList = document.getElementById('media-list');
    
    mediaList.innerHTML = currentMedia.map((media, index) => `
        <div class="media-item">
            ${media.type === 'video' 
                ? `<video src="${media.url}" muted loop autoplay playsinline></video>`
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

// Display properties
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
                    <span>${property.location} • ${property.type === 'sale' ? property.price : property.rent_price}</span><br>
                    <small>${property.media ? property.media.length : 0} media files</small>
                </div>
            </div>
            <div class="property-actions">
                <button class="edit-btn" onclick="editProperty('${property.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteProperty('${property.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Display inquiries
function displayInquiries() {
    const container = document.getElementById('inquiries-container');
    
    if (!container) return;
    
    if (inquiries.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No inquiries yet.</p>';
        return;
    }
    
    container.innerHTML = inquiries.map(inquiry => {
        const date = inquiry.createdAt ? inquiry.createdAt.toDate().toLocaleString() : 'N/A';
        const statusClass = inquiry.status === 'pending' ? 'status-pending' : 
                           inquiry.status === 'contacted' ? 'status-contacted' : 'status-closed';
        
        return `
            <div class="inquiry-card">
                <div class="inquiry-header">
                    <h4>${inquiry.propertyTitle}</h4>
                    <span class="inquiry-status ${statusClass}">${inquiry.status}</span>
                </div>
                <div class="inquiry-details">
                    <p><strong>Name:</strong> ${inquiry.name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
                    <p><strong>Type:</strong> ${inquiry.inquiryType}</p>
                    ${inquiry.message ? `<p><strong>Message:</strong> ${inquiry.message}</p>` : ''}
                    <p><small>Submitted: ${date}</small></p>
                </div>
                <div class="inquiry-actions">
                    <select onchange="updateInquiryStatus('${inquiry.id}', this.value)" value="${inquiry.status}">
                        <option value="pending" ${inquiry.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="contacted" ${inquiry.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="closed" ${inquiry.status === 'closed' ? 'selected' : ''}>Closed</option>
                    </select>
                </div>
            </div>
        `;
    }).join('');
}

// Update inquiry status
async function updateInquiryStatus(id, status) {
    try {
        await db.collection('inquiries').doc(id).update({ status: status });
        await loadInquiries();
        displayInquiries();
    } catch (error) {
        console.error('Error updating inquiry:', error);
        alert('Failed to update status');
    }
}

// Edit property
function editProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;
    
    editingPropertyId = id;
    currentMedia = property.media ? [...property.media] : [];
    
    const form = document.getElementById('add-property-form');
    form.title.value = property.title;
    form.category.value = property.category;
    form.type.value = property.type;
    form.location.value = property.location;
    form.description.value = property.description || '';
    form.price.value = property.price;
    form.rentPrice.value = property.rent_price || '';
    form.bedrooms.value = property.bedrooms || '';
    form.bathrooms.value = property.bathrooms || '';
    form.area.value = property.area;
    
    document.getElementById('edit-id').value = id;
    document.getElementById('submit-btn').textContent = 'Update Property';
    
    displayMediaList();
    form.scrollIntoView({ behavior: 'smooth' });
}

// Add/Update property
document.getElementById('add-property-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!auth.currentUser) {
        alert('You must be logged in to add properties. Please refresh the page and login again.');
        console.log('Current user:', auth.currentUser);
        return;
    }
    
    const formData = new FormData(this);
    const editId = formData.get('editId');
    
    const propertyData = {
        title: formData.get('title'),
        category: formData.get('category'),
        type: formData.get('type'),
        location: formData.get('location'),
        description: formData.get('description'),
        price: formData.get('price'),
        rent_price: formData.get('rentPrice'),
        bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms')) : null,
        bathrooms: formData.get('bathrooms') ? parseInt(formData.get('bathrooms')) : null,
        area: formData.get('area'),
        media: currentMedia,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: auth.currentUser.uid
    };
    
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';
    
    try {
        if (editId) {
            // Update existing property
            await db.collection('properties').doc(editId).update(propertyData);
            alert('✅ Property updated successfully!');
            console.log('Property updated:', editId);
        } else {
            // Add new property
            const docRef = await db.collection('properties').add(propertyData);
            alert('✅ Property added successfully! ID: ' + docRef.id);
            console.log('New property added with ID:', docRef.id);
        }
        
        await loadProperties();
        displayProperties();
        
        // Reset form
        this.reset();
        currentMedia = [];
        editingPropertyId = null;
        document.getElementById('edit-id').value = '';
        document.getElementById('submit-btn').textContent = 'Add Property';
        displayMediaList();
    } catch (error) {
        console.error('Error saving property:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        let errorMsg = 'Failed to save property: ' + error.message;
        if (error.code === 'permission-denied') {
            errorMsg = 'Permission denied. Make sure you are logged in and have database access.';
        }
        alert(errorMsg);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Delete property
async function deleteProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!confirm(`Are you sure you want to delete "${property.title}"?`)) return;
    
    try {
        await db.collection('properties').doc(id).delete();
        await loadProperties();
        displayProperties();
        alert('Property deleted successfully!');
    } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property');
    }
}

// Make functions globally available
window.addMediaUrl = addMediaUrl;
window.uploadMediaFiles = uploadMediaFiles;
window.removeMedia = removeMedia;
window.editProperty = editProperty;
window.deleteProperty = deleteProperty;
window.updateInquiryStatus = updateInquiryStatus;
