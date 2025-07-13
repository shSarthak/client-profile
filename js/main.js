// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Navigation Toggle with responsive handling
const headerToggle = document.querySelector('.header-toggle');
const header = document.getElementById('header');

// Function to handle screen size changes
function handleScreenSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 1000) {
        // Desktop view - hide hamburger menu and show sidebar
        headerToggle.style.display = 'none';
        header.classList.remove('active');
        header.style.transform = 'translateX(0)';
    } else if (screenWidth <= 450) {
        // Mobile view - show hamburger menu and hide sidebar by default
        headerToggle.style.display = 'flex';
        if (!header.classList.contains('active')) {
            header.style.transform = 'translateX(-100%)';
        }
    } else {
        // Tablet view (450px - 1000px) - show hamburger menu
        headerToggle.style.display = 'flex';
        if (!header.classList.contains('active')) {
            header.style.transform = 'translateX(-100%)';
        }
    }
}

// Initial call to set correct state
handleScreenSize();

// Listen for window resize
window.addEventListener('resize', handleScreenSize);

// Hamburger menu toggle functionality
headerToggle.addEventListener('click', () => {
    header.classList.toggle('active');

    if (header.classList.contains('active')) {
        header.style.transform = 'translateX(0)';
    } else {
        header.style.transform = 'translateX(-100%)';
    }
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.navmenu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1000) {
            header.classList.remove('active');
            header.style.transform = 'translateX(-100%)';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1000) {
        if (!header.contains(e.target) && !headerToggle.contains(e.target)) {
            header.classList.remove('active');
            header.style.transform = 'translateX(-100%)';
        }
    }
});

// Sticky header on scroll (modified for responsive behavior)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1000) {
        // Only apply sticky behavior on desktop
        if (window.scrollY > 100) {
            header.style.top = '-70px';
        } else {
            header.style.top = '0';
        }
    } else {
        // Reset top position for mobile/tablet
        header.style.top = '0';
    }
});

// Scroll to top button
const scrollTop = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = window.innerWidth > 1000 ? 80 : 60;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Typed.js effect for hero section
const typedElement = document.querySelector('.typed');
if (typedElement) {
    const typedItems = typedElement.getAttribute('data-typed-items').split(',');
    let currentItem = 0;

    function typeText() {
        const text = typedItems[currentItem].trim();
        let charIndex = 0;
        typedElement.textContent = '';

        const typingInterval = setInterval(() => {
            typedElement.textContent += text.charAt(charIndex);
            charIndex++;
            if (charIndex > text.length) {
                clearInterval(typingInterval);
                setTimeout(eraseText, 1500);
            }
        }, 100);
    }

    function eraseText() {
        const text = typedElement.textContent;
        let charIndex = text.length;

        const erasingInterval = setInterval(() => {
            typedElement.textContent = text.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                clearInterval(erasingInterval);
                currentItem = (currentItem + 1) % typedItems.length;
                setTimeout(typeText, 500);
            }
        }, 50);
    }

    setTimeout(typeText, 1000);
}

// Simple animations on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        const position = el.getBoundingClientRect();
        // If element is in viewport
        if (position.top < window.innerHeight * 0.9 && position.bottom >= 0) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Navigation active state based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navmenu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Blog loading function
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    const feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://cybernewsx24.blogspot.com/feeds/posts/default";

    blogContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-circle-notch fa-spin"></i>
            <p>Loading blog posts...</p>
        </div>
    `;

    fetch(feedUrl)
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => {
            blogContainer.innerHTML = "";

            const posts = data.items?.slice(0, 3);
            if (!posts || posts.length === 0) {
                blogContainer.innerHTML = `<p>No blog posts found.</p>`;
                return;
            }

            posts.forEach(post => {
                const snippet = post.content.replace(/<[^>]*>/g, '').substring(0, 120) + "...";
                const date = new Date(post.pubDate);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                });

                const postElement = document.createElement("div");
                postElement.className = "blog-post";
                postElement.innerHTML = `
                    <div class="post-image">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="post-content">
                        <h4>${post.title}</h4>
                        <p>${snippet}</p>
                        <div class="post-meta">
                            <span class="date">${formattedDate}</span>
                            <a href="${post.link}" target="_blank" class="read-more">
                                Read more <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `;
                blogContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error("Blog load failed:", error);
            blogContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" style="color: red;"></i>
                    <h3>Failed to load blog posts</h3>
                    <p>${error.message}</p>
                </div>
            `;
        });
}

// Contact form handler with EmailJS
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Clear previous status
        statusMessage.innerHTML = '';
        statusMessage.className = 'status-message';

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.';
            statusMessage.className = 'status-message error';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.';
            statusMessage.className = 'status-message error';
            return;
        }

        // Show sending message
        statusMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
        statusMessage.className = 'status-message sending';

        // Disable submit button to prevent multiple submissions
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Send email using EmailJS
        // Replace these with your actual EmailJS credentials
        const serviceID = 'service_ictdk2i'; // Replace with your EmailJS service ID
        const templateID = 'template_p01lpyv'; // Replace with your EmailJS template ID
        const publicKey = 'YeZcvTbZBMd7U-mq8'; // Replace with your EmailJS public key

        // Template parameters that will be sent to EmailJS
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'Saraswatnitin88@gmail.com'
        };

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded');
            statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Email service not available. Please try again later.';
            statusMessage.className = 'status-message error';
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        }

        // Send the email
        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully:', response);
                statusMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
                statusMessage.className = 'status-message success';
                
                // Reset form
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or contact me directly.';
                statusMessage.className = 'status-message error';
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}

// Run on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact form
    handleContactForm();
    
    // Load blog posts
    loadBlogPosts();
    
    // Initialize animations and navigation
    animateOnScroll();
    updateActiveNavigation();
});

// Run on load and scroll
window.addEventListener('load', () => {
    animateOnScroll();
    updateActiveNavigation();
});

window.addEventListener('scroll', () => {
    animateOnScroll();
    updateActiveNavigation();
});

// Make loadBlogPosts available globally for retry functionality
window.loadBlogPosts = loadBlogPosts;
        // WhatsApp Business Integration
        function openWhatsApp() {
            const whatsappUrl = 'https://api.whatsapp.com/message/PGUJPWTWTHKVH1?autoload=1&app_absent=0';
            window.open(whatsappUrl, '_blank');
        }

        // WhatsApp for specific courses
        function openWhatsAppForCourse(courseName) {
            const message = encodeURIComponent(`Hi Nitin, I'm interested in your ${courseName} course. Could you please provide more details?`);
            const whatsappUrl = `https://wa.me/918445519227?text=${message}`;
            window.open(whatsappUrl, '_blank');
        }

        // Alternative function for general inquiries
        function openWhatsAppGeneral() {
            const message = encodeURIComponent('Hi Nitin, I would like to know more about your services.');
            const whatsappUrl = `https://wa.me/918445519227?text=${message}`;
            window.open(whatsappUrl, '_blank');
        }

        // Function to detect device and use appropriate WhatsApp method
        function detectAndOpenWhatsApp() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // For mobile devices, try the business account first
                const businessUrl = 'https://api.whatsapp.com/message/PGUJPWTWTHKVH1?autoload=1&app_absent=0';
                window.open(businessUrl, '_blank');
            } else {
                // For desktop, use web WhatsApp
                const webUrl = 'https://web.whatsapp.com/send?phone=918445519227&text=Hi%20Nitin%2C%20I%20would%20like%20to%20connect%20with%20you';
                window.open(webUrl, '_blank');
            }
        }

        // Initialize WhatsApp functionality when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Add click event to all WhatsApp buttons
            const whatsappButtons = document.querySelectorAll('.whatsapp, .btn-whatsapp');
            whatsappButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    openWhatsApp();
                });
            });
        });