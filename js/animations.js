// Additional animations for the jewellery website

document.addEventListener('DOMContentLoaded', function() {
    // Text reveal animation for hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.05}s`;
            heroTitle.appendChild(span);
        }
        
        heroTitle.classList.add('reveal-text');
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Hover effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
    
    // Shine effect on collection images
    const collectionImages = document.querySelectorAll('.collection-image');
    collectionImages.forEach(image => {
        image.classList.add('shine');
    });
    
    // Pulse animation for special offers (example)
    const specialOffer = document.querySelector('.special-offer');
    if (specialOffer) {
        specialOffer.classList.add('pulse');
    }
    
    // Initialize loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add loading state
        if (!img.complete) {
            img.classList.add('loading');
        } else {
            img.classList.add('loaded');
        }
    });
    
    // Stagger animation for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate elements on page load
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // Add loaded class to hero section with delay
        setTimeout(() => {
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.classList.add('loaded');
            }
        }, 500);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add CSS for additional styles
    const additionalStyles = `
        .header.scrolled {
            background-color: var(--bg-color);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .page-loaded .hero {
            opacity: 1;
        }
        
        img.loading {
            opacity: 0;
        }
        
        img.loaded {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .special-offer {
            position: relative;
            border: 2px solid var(--primary-color);
        }
        
        .notification {
            font-weight: 500;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});