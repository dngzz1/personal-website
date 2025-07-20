// Gallery JavaScript

class Gallery {
    constructor() {
        this.galleryItems = [];
        this.currentLightboxIndex = 0;
        this.init();
    }

    init() {
        this.setupLightbox();
        this.loadGalleryItems();
        this.setupKeyboardNavigation();
    }

    loadGalleryItems() {
        // Add existing photos to the gallery
        this.galleryItems = [
            {
                id: 'daniel_faded',
                src: 'images/daniel_faded.jpeg',
                name: 'Daniel - Faded Portrait',
                description: 'A thoughtful portrait with a faded aesthetic'
            },
            {
                id: 'daniel_thoughtful',
                src: 'images/daniel_thoughtful.jpeg',
                name: 'Daniel - Thoughtful',
                description: 'A contemplative moment captured'
            },
            {
                id: 'daniel_hood',
                src: 'images/daniel_hood.jpeg',
                name: 'Daniel - Hood Portrait',
                description: 'Portrait with a casual hooded look'
            },
            {
                id: 'daniel_japanese',
                src: 'images/daniel_japanese.jpeg',
                name: 'Daniel - Japanese Style',
                description: 'A portrait with Japanese cultural elements'
            },
            {
                id: 'daniel_jeans',
                src: 'images/daniel_jeans.jpeg',
                name: 'Daniel - Casual Jeans',
                description: 'A relaxed portrait in casual attire'
            },
            {
                id: 'daniel_pink',
                src: 'images/daniel_pink.jpeg',
                name: 'Daniel - Pink Portrait',
                description: 'A portrait with warm pink tones'
            },
            {
                id: 'daniel_yellow',
                src: 'images/daniel_yellow.jpg',
                name: 'Daniel - Yellow Portrait',
                description: 'A vibrant portrait with yellow lighting'
            }
        ];

        this.galleryItems.forEach(item => {
            this.renderGalleryItem(item);
        });
    }

    renderGalleryItem(item) {
        const galleryGrid = document.getElementById('galleryGrid');
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.id = item.id;
        
        galleryItem.innerHTML = `
            <div class="gallery-item-image">
                <img src="${item.src}" alt="${item.name}" loading="lazy">
            </div>
            <div class="gallery-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => {
            this.openLightbox(this.galleryItems.findIndex(i => i.id === item.id));
        });

        galleryGrid.appendChild(galleryItem);
    }

    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');

        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            this.closeLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Navigation - prevent event bubbling
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!lightboxPrev.disabled) {
                this.navigateLightbox(-1);
            }
        });

        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!lightboxNext.disabled) {
                this.navigateLightbox(1);
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('lightbox').classList.contains('active')) {
                return;
            }

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    this.navigateLightbox(1);
                    break;
            }
        });
    }

    openLightbox(index) {
        if (index < 0 || index >= this.galleryItems.length) {
            return;
        }

        this.currentLightboxIndex = index;
        const item = this.galleryItems[index];
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');

        lightboxImage.src = item.src;
        lightboxImage.alt = item.name;

        // Show/hide navigation buttons
        lightboxPrev.style.display = 'block';
        lightboxNext.style.display = 'block';
        
        // Enable/disable navigation buttons
        lightboxPrev.disabled = index <= 0;
        lightboxNext.disabled = index >= this.galleryItems.length - 1;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
        const newIndex = this.currentLightboxIndex + direction;
        if (newIndex >= 0 && newIndex < this.galleryItems.length) {
            this.openLightbox(newIndex);
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
}); 