// Navigation and hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if navigation exists, if not inject it (fallback for direct file access)
    if (!document.querySelector('.nav-links')) {
        const header = document.querySelector('header');
        if (header) {
            header.innerHTML = `
                <nav class="container">
                    <div class="logo"><a href="index.html">Daniel Ng</a></div>
                    <ul class="nav-links">
                        <li><a href="index.html" class="nav-home">Home</a></li>
                        <li><a href="about.html" class="nav-about">About</a></li>
                        <li><a href="cv.html" class="nav-cv">CV</a></li>
                        <li><a href="projects.html" class="nav-projects">Projects</a></li>
                    </ul>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            `;
        }
    }

    // Set active navigation state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinksContainer.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // Image Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const profilePhotos = document.querySelectorAll('.profile-photo img');

    // Function to close modal with fade-out animation
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        modalImg.style.animation = 'zoomOut 0.3s ease';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.animation = '';
            modalImg.style.animation = '';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }, 300);
    }

    // Open modal when profile photo is clicked
    profilePhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when clicking the X button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        // Check if the click was on the modal background (not on the image or close button)
        if (event.target === modal || event.target.classList.contains('modal-content')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}); 