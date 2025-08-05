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
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isHomePage = currentPage === 'index.html';

        // Generate logo HTML
        const logoHTML = isHomePage
            ? `<div class="logo">${navData.logo.text}</div>`
            : `<div class="logo"><a href="${navData.logo.href}">${navData.logo.text}</a></div>`;

        // Generate navigation links
        const linksHTML = navData.links.map(link => {
            const activeClass = link.href === currentPage ? ' class="active"' : '';
            return `<li><a href="${link.href}"${activeClass}>${link.text}</a></li>`;
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