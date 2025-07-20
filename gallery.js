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
        // Add gallery photos
        this.galleryItems = [
            {
                id: 'zavetti_canada',
                src: 'gallery/zavetti_canada.jpeg',
                name: 'Zavetti Canada',
                description: 'Exploring the beautiful landscapes of Canada'
            },
            {
                id: 'swiss_alps',
                src: 'gallery/swiss_alps.jpeg',
                name: 'Swiss Alps',
                description: 'Breathtaking views of the Swiss mountain ranges'
            },
            {
                id: 'lakeside_town_beach',
                src: 'gallery/lakeside_town_beach.jpeg',
                name: 'Lakeside Town Beach',
                description: 'A peaceful day by the lakeside'
            },
            {
                id: 'ice_landscape_photographer',
                src: 'gallery/ice_landscape_photographer.jpeg',
                name: 'Ice Landscape',
                description: 'Capturing the beauty of frozen landscapes'
            },
            {
                id: 'cambridge_streetside_blakely',
                src: 'gallery/cambridge_streetside_blakely.jpeg',
                name: 'Cambridge Streetside',
                description: 'Urban exploration in Cambridge'
            },
            {
                id: 'cycling_pose_lycra',
                src: 'gallery/cycling_pose_lycra.jpeg',
                name: 'Cycling Adventure',
                description: 'Ready for the next cycling challenge'
            },
            {
                id: 'swimming_winner',
                src: 'gallery/swimming_winner.jpeg',
                name: 'Swimming Champion',
                description: 'Victory in the pool'
            },
            {
                id: 'american_football_spectator',
                src: 'gallery/american_football_spectator.jpeg',
                name: 'Football Spectator',
                description: 'Enjoying the game from the stands'
            },
            {
                id: 'soccer_goalkeeper',
                src: 'gallery/soccer_goalkeeper.jpeg',
                name: 'Soccer Goalkeeper',
                description: 'Defending the goal with determination'
            },
            {
                id: 'dorm_preworkout',
                src: 'gallery/dorm_preworkout.jpeg',
                name: 'Pre-Workout Prep',
                description: 'Getting ready for an intense session'
            },
            {
                id: 'night_at_bar_posing_staircase',
                src: 'gallery/night_at_bar_posing_staircase.jpeg',
                name: 'Night Out',
                description: 'A memorable evening in the city'
            },
            {
                id: 'new_car_show_off',
                src: 'gallery/new_car_show_off.jpeg',
                name: 'New Car',
                description: 'Showcasing the latest addition to the collection'
            },
            {
                id: 'personal_trainer_tyre_roll',
                src: 'gallery/personal_trainer_tyre_roll.jpeg',
                name: 'Tire Training',
                description: 'Intense workout with tire exercises'
            },
            {
                id: 'lakeside_sitting_on_fence',
                src: 'gallery/lakeside_sitting_on_fence.jpeg',
                name: 'Lakeside Reflection',
                description: 'Peaceful moments by the water'
            },
            {
                id: 'sofa_pose_with_american_football',
                src: 'gallery/sofa_pose_with_american_football.jpeg',
                name: 'Football Fan',
                description: 'Relaxing with the game on'
            },
            {
                id: 'rams_american_football',
                src: 'gallery/rams_american_football.jpeg',
                name: 'Rams Football',
                description: 'Supporting the team'
            },
            {
                id: 'lakers_basketball',
                src: 'gallery/lakers_basketball.jpeg',
                name: 'Lakers Basketball',
                description: 'Basketball action and excitement'
            },
            {
                id: 'model_red_door',
                src: 'gallery/model_red_door.jpeg',
                name: 'Red Door',
                description: 'Striking a pose by the iconic red door'
            },
            {
                id: 'lounging_round_swimming_pool',
                src: 'gallery/lounging_round_swimming_pool.jpeg',
                name: 'Poolside Relaxation',
                description: 'Unwinding by the swimming pool'
            },
            {
                id: 'postworkout_sunset',
                src: 'gallery/postworkout_sunset.jpeg',
                name: 'Post-Workout Sunset',
                description: 'Recovery time with a beautiful sunset view'
            },
            {
                id: 'colombus_blue_jacket',
                src: 'gallery/colombus_blue_jacket.webp',
                name: 'Columbus Blue Jacket',
                description: 'Exploring Columbus in style'
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