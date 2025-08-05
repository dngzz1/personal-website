// Navigation generation and management
(function () {
    // Navigation data structure
    const navData = {
        logo: {
            text: "Daniel Ng",
            href: "index.html"
        },
        links: [
            { text: "Home", href: "index.html" },
            { text: "About", href: "about.html" },
            { text: "Ideas", href: "ideas.html" },
            { text: "Writings", href: "writings.html" },
            { text: "Gallery", href: "gallery.html" },
            { text: "CV", href: "cv.html" }
        ]
    };

    // Generate navigation HTML
    function generateNavigation() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const isHomePage = currentPage === 'index.html';

        // Detect if we're in a subdirectory and need to adjust paths
        const pathPrefix = currentPath.includes('/writings/') ? '../' : '';

        // Generate logo HTML with correct path
        const logoHref = pathPrefix + navData.logo.href;
        const logoHTML = isHomePage
            ? `<div class="logo">${navData.logo.text}</div>`
            : `<div class="logo"><a href="${logoHref}">${navData.logo.text}</a></div>`;

        // Generate navigation links with correct paths
        const linksHTML = navData.links.map(link => {
            const correctedHref = pathPrefix + link.href;
            const activeClass = link.href === currentPage ? ' class="active"' : '';
            return `<li><a href="${correctedHref}"${activeClass}>${link.text}</a></li>`;
        }).join('');

        // Generate hamburger menu
        const hamburgerHTML = `
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        return `
            <nav class="container">
                ${logoHTML}
                <ul class="nav-links">
                    ${linksHTML}
                </ul>
                ${hamburgerHTML}
            </nav>
        `;
    }

    // Initialize navigation when DOM is ready
    function initNavigation() {
        const navContainer = document.querySelector('header');
        if (navContainer) {
            navContainer.innerHTML = generateNavigation();
        }
    }

    // Run immediately if DOM is already loaded, otherwise wait for DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();