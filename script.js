// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
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