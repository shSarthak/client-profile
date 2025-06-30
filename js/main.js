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
    if (!blogContainer) {
        console.log('Blog container not found');
        return;
    }

    // Replace with your actual Blog ID
    const blogId = '7388099076371396824';
    
    // Clear existing content
    blogContainer.innerHTML = '';

    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = `
        <i class="fas fa-circle-notch fa-spin"></i>
        <p>Loading blog posts...</p>
    `;
    blogContainer.appendChild(loadingElement);

    // Since JSON API is discontinued, we need to fetch XML and parse it
    fetchBlogFeedXML(blogId, blogContainer);
}

function fetchBlogFeedXML(blogId, blogContainer) {
    // The feed URL now returns XML (Atom feed) only
    const feedUrl = `https://www.blogger.com/feeds/${blogId}/posts/default?max-results=3`;
    
    // Try CORS proxy methods since direct fetch will likely fail due to CORS
    const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(feedUrl)}`,
        `https://cors-anywhere.herokuapp.com/${feedUrl}`,
        `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`
    ];
    
    tryXMLProxiesSequentially(proxies, 0, blogContainer);
}

function tryXMLProxiesSequentially(proxies, index, blogContainer) {
    if (index >= proxies.length) {
        // If all proxies fail, try the JSONP method (might still work for some feeds)
        tryJSONPFallback(blogContainer);
        return;
    }
    
    fetch(proxies[index])
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); // Get as text since it's XML
        })
        .then(xmlText => {
            // Handle different proxy response formats
            let actualXML = xmlText;
            try {
                const jsonResponse = JSON.parse(xmlText);
                if (jsonResponse.contents) {
                    actualXML = jsonResponse.contents;
                }
            } catch (e) {
                // It's already XML text, use as is
            }
            
            parseXMLFeed(actualXML, blogContainer);
        })
        .catch(error => {
            console.log(`Proxy ${index + 1} failed:`, error);
            tryXMLProxiesSequentially(proxies, index + 1, blogContainer);
        });
}

function parseXMLFeed(xmlText, blogContainer) {
    try {
        // Parse XML using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
            throw new Error('XML parsing failed: ' + parseError.textContent);
        }
        
        // Get all entry elements (blog posts)
        const entries = xmlDoc.querySelectorAll('entry');
        
        blogContainer.innerHTML = '';
        
        if (entries.length === 0) {
            blogContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-info-circle"></i>
                    <p>No blog posts found.</p>
                </div>
            `;
            return;
        }
        
        // Process each entry
        entries.forEach(entry => {
            const title = getTextContent(entry, 'title') || 'Untitled';
            
            // Get the alternate link (the blog post URL)
            const links = entry.querySelectorAll('link');
            let postUrl = '#';
            for (let link of links) {
                if (link.getAttribute('rel') === 'alternate' && link.getAttribute('type') === 'text/html') {
                    postUrl = link.getAttribute('href');
                    break;
                }
            }
            
            // Get content (try content first, then summary)
            let content = getTextContent(entry, 'content') || getTextContent(entry, 'summary') || '';
            const snippet = content.replace(/<[^>]+>/g, '').substring(0, 120) + '...';
            
            // Get published date
            const publishedText = getTextContent(entry, 'published');
            const published = publishedText ? new Date(publishedText) : new Date();
            const formattedDate = published.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Extract image from content if available
            const imageMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
            const imageUrl = imageMatch ? imageMatch[1] : null;
            
            // Create post element
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <div class="post-image">
                    ${imageUrl ? 
                        `<img src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.parentElement.innerHTML='<i class=\\"fas fa-file-alt\\"></i>'">` : 
                        '<i class="fas fa-file-alt"></i>'
                    }
                </div>
                <div class="post-content">
                    <h4>${title}</h4>
                    <p>${snippet}</p>
                    <div class="post-meta">
                        <span class="date">${formattedDate}</span>
                        <a href="${postUrl}" target="_blank" class="read-more">
                            Read more <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            
            blogContainer.appendChild(postElement);
        });
        
    } catch (error) {
        console.error('Error parsing XML:', error);
        showError(blogContainer, 'Failed to parse blog feed: ' + error.message);
    }
}

function getTextContent(parentElement, tagName) {
    const element = parentElement.querySelector(tagName);
    return element ? element.textContent : '';
}

// Fallback JSONP method (might still work for some configurations)
function tryJSONPFallback(blogContainer) {
    const blogId = '7388099076371396824';
    const script = document.createElement('script');
    const callbackName = 'blogCallback_' + Date.now();
    
    // Create global callback function
    window[callbackName] = function(data) {
        processBlogDataJSON(data, blogContainer);
        // Cleanup
        document.head.removeChild(script);
        delete window[callbackName];
    };
    
    // Try JSONP (might still work)
    const jsonpUrl = `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json-in-script&callback=${callbackName}&max-results=3`;
    
    script.src = jsonpUrl;
    script.onerror = () => {
        console.log('JSONP fallback also failed');
        delete window[callbackName];
        document.head.removeChild(script);
        showError(blogContainer, 'All methods failed. The blog feed may not be accessible due to CORS restrictions.');
    };
    
    document.head.appendChild(script);
}

// Handle JSON data if JSONP still works
function processBlogDataJSON(parsed, blogContainer) {
    const posts = parsed.feed?.entry;
    blogContainer.innerHTML = '';

    if (!posts || posts.length === 0) {
        blogContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-info-circle"></i>
                <p>No blog posts found.</p>
            </div>
        `;
        return;
    }

    posts.forEach(post => {
        const title = post.title?.$t || 'Untitled';
        const link = post.link?.find(l => l.rel === "alternate")?.href || '#';
        const content = post.content?.$t || post.summary?.$t || "";
        const snippet = content.replace(/<[^>]+>/g, '').substring(0, 120) + '...';
        const published = new Date(post.published?.$t);
        const formattedDate = published.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const imageMatch = content.match(/<img[^>]+src="([^">]+)"/);
        const imageUrl = imageMatch ? imageMatch[1] : null;

        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <div class="post-image">
                ${imageUrl ? 
                    `<img src="${imageUrl}" alt="${title}" loading="lazy">` : 
                    '<i class="fas fa-file-alt"></i>'
                }
            </div>
            <div class="post-content">
                <h4>${title}</h4>
                <p>${snippet}</p>
                <div class="post-meta">
                    <span class="date">${formattedDate}</span>
                    <a href="${link}" target="_blank" class="read-more">
                        Read more <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;

        blogContainer.appendChild(postElement);
    });
}

function showError(blogContainer, message) {
    blogContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle" style="color: #ff6b6b; font-size: 2.5rem; margin-bottom: 20px;"></i>
            <h3>Failed to load blog posts</h3>
            <p>${message}</p>
            <button onclick="loadBlogPosts()" class="retry-btn">
                <i class="fas fa-redo"></i> Retry
            </button>
        </div>
    `;
}

// Server-side solution (recommended for production)
function loadBlogPostsServerSide() {
    fetch('/api/blog-posts')
        .then(response => response.json())
        .then(xmlText => {
            const blogContainer = document.getElementById('blog-posts');
            parseXMLFeed(xmlText, blogContainer);
        })
        .catch(error => {
            console.error('Server-side fetch failed:', error);
            const blogContainer = document.getElementById('blog-posts');
            showError(blogContainer, 'Server error: ' + error.message);
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