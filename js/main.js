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
function loadAllBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    // Multiple RSS feed URLs for cybernewsx.in
    const feedUrls = [
        // Primary: RSS2JSON with your new domain
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cybernewsx.in/feeds/posts/default",
        
        // Alternative 1: RSS2JSON with RSS format
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cybernewsx.in/feeds/posts/default?alt=rss",
        
        // Alternative 2: AllOrigins proxy
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cybernewsx.in/feeds/posts/default"),
        
        // Alternative 3: CORS Anywhere (backup)
        "https://cors-anywhere.herokuapp.com/https://www.cybernewsx.in/feeds/posts/default",
        
        // Alternative 4: Direct Blogger feeds with max results
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cybernewsx.in/feeds/posts/default?max-results=50",
        
        // Alternative 5: AllOrigins with max results
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cybernewsx.in/feeds/posts/default?max-results=50")
    ];

    // Show loading state
    blogContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-circle-notch fa-spin"></i>
            <p>Loading all blog posts from CyberNews X...</p>
        </div>
    `;

    // Try each feed URL until one works
    async function tryFeedUrls(urls, index = 0) {
        if (index >= urls.length) {
            throw new Error("All RSS feed sources failed");
        }

        const currentUrl = urls[index];
        console.log(`Trying feed URL ${index + 1}:`, currentUrl);

        try {
            const response = await fetch(currentUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Handle different response formats
            if (index === 0 || index === 1 || index === 4) {
                // RSS2JSON format
                if (data.status === "error") {
                    throw new Error(data.message || "RSS2JSON error");
                }
                return { items: data.items, format: 'rss2json' };
            } else if (index === 2 || index === 5) {
                // AllOrigins format
                if (data.status?.http_code !== 200) {
                    throw new Error("AllOrigins fetch failed");
                }
                const xmlData = parseXMLFeed(data.contents);
                return { items: xmlData, format: 'xml' };
            } else {
                // Direct XML format
                const xmlData = parseXMLFeed(data);
                return { items: xmlData, format: 'xml' };
            }
        } catch (error) {
            console.warn(`Feed URL ${index + 1} failed:`, error.message);
            
            // Try next URL
            return tryFeedUrls(urls, index + 1);
        }
    }

    // Parse XML feed data
    function parseXMLFeed(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        const items = [];
        const entries = xmlDoc.querySelectorAll('entry');
        
        entries.forEach(entry => {
            const title = entry.querySelector('title')?.textContent || 'No title';
            const link = entry.querySelector('link')?.getAttribute('href') || '#';
            
            // Get content from multiple possible fields
            const content = entry.querySelector('content')?.textContent || 
                          entry.querySelector('summary')?.textContent || 
                          entry.querySelector('description')?.textContent ||
                          'No content available';
            
            const pubDate = entry.querySelector('published')?.textContent || 
                          entry.querySelector('updated')?.textContent || 
                          new Date().toISOString();
            
            // Try to extract author
            const author = entry.querySelector('author name')?.textContent || 
                          entry.querySelector('author')?.textContent || 
                          'CyberNews X';
            
            // Try to extract categories/tags
            const categories = Array.from(entry.querySelectorAll('category'))
                .map(cat => cat.getAttribute('term') || cat.textContent)
                .filter(cat => cat);

            items.push({
                title,
                link,
                content,
                pubDate,
                author,
                categories
            });
        });
        
        return items;
    }

    // Extract image from content
    function extractImageFromContent(content) {
        const imgRegex = /<img[^>]+src\s*=\s*['"']([^'"']+)['"'][^>]*>/i;
        const match = content.match(imgRegex);
        return match ? match[1] : null;
    }

    // Create pagination
    function createPagination(totalPosts, postsPerPage, currentPage) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        if (totalPages <= 1) return '';

        let paginationHTML = '<div class="pagination">';
        
        // Previous button
        if (currentPage > 1) {
            paginationHTML += `<button onclick="displayPosts(${currentPage - 1})" class="page-btn">← Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage ? 'active' : '';
            paginationHTML += `<button onclick="displayPosts(${i})" class="page-btn ${activeClass}">${i}</button>`;
        }
        
        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `<button onclick="displayPosts(${currentPage + 1})" class="page-btn">Next →</button>`;
        }
        
        paginationHTML += '</div>';
        return paginationHTML;
    }

    // Store all posts globally for pagination
    let allPosts = [];
    const postsPerPage = 10;

    // Display posts with pagination
    window.displayPosts = function(page = 1) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = allPosts.slice(startIndex, endIndex);

        const postsHTML = postsToShow.map(post => {
            const snippet = post.content.replace(/<[^>]*>/g, '').substring(0, 150) + "...";
            const date = new Date(post.pubDate);
            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });

            const postImage = extractImageFromContent(post.content);
            const categories = post.categories?.slice(0, 3).map(cat => 
                `<span class="category-tag">${cat}</span>`
            ).join('') || '';

            return `
                <article class="blog-post">
                    <div class="post-image">
                        ${postImage 
                            ? `<img src="${postImage}" alt="${post.title}" onerror="this.parentElement.innerHTML='<i class=&quot;fas fa-image&quot;></i>'">`
                            : '<i class="fas fa-newspaper"></i>'
                        }
                    </div>
                    <div class="post-content">
                        <div class="post-header">
                            <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
                            <div class="post-categories">${categories}</div>
                        </div>
                        <p class="post-excerpt">${snippet}</p>
                        <div class="post-meta">
                            <span class="date"><i class="fas fa-calendar"></i> ${formattedDate}</span>
                            <span class="author"><i class="fas fa-user"></i> ${post.author}</span>
                            <a href="${post.link}" target="_blank" class="read-more">
                                Read Full Article <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        const paginationHTML = createPagination(allPosts.length, postsPerPage, page);
        
        blogContainer.innerHTML = `
            <div class="blog-header">
                <h2><i class="fas fa-blog"></i> Latest from CyberNews X</h2>
                <p>Showing ${postsToShow.length} of ${allPosts.length} posts</p>
            </div>
            <div class="blog-posts-grid">
                ${postsHTML}
            </div>
            ${paginationHTML}
        `;

        // Scroll to top of blog section
        // blogContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Main loading function
    tryFeedUrls(feedUrls)
        .then(result => {
            allPosts = result.items || [];
            
            if (allPosts.length === 0) {
                blogContainer.innerHTML = `
                    <div class="no-posts">
                        <i class="fas fa-info-circle"></i>
                        <h3>No blog posts found</h3>
                        <p>Unable to load posts from CyberNews X. Please check the website or try again later.</p>
                    </div>
                `;
                return;
            }

            console.log(`Successfully loaded ${allPosts.length} blog posts`);
            displayPosts(1); // Display first page
        })
        .catch(error => {
            console.error("All blog load attempts failed:", error);
            blogContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i>
                    <h3>Failed to load blog posts</h3>
                    <p>Unable to fetch blog posts from CyberNews X. This might be due to:</p>
                    <ul>
                        <li>Network connectivity issues</li>
                        <li>CORS restrictions</li>
                        <li>RSS feed temporarily unavailable</li>
                    </ul>
                    <p>Please try refreshing the page or visit <a href="https://www.cybernewsx.in" target="_blank">CyberNews X</a> directly.</p>
                    <details>
                        <summary>Technical details</summary>
                        <pre>${error.message}</pre>
                    </details>
                    <button onclick="loadAllBlogPosts()" class="retry-btn">
                        <i class="fas fa-redo"></i> Try Again
                    </button>
                </div>
            `;
        });
}

// Simplified version focusing on AllOrigins
function loadAllBlogPostsSimple() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    const feedUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cybernewsx.in/feeds/posts/default?max-results=50");

    blogContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading CyberNews X blog posts...</p>
        </div>
    `;

    fetch(feedUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status?.http_code !== 200) {
                throw new Error("Failed to fetch RSS feed");
            }

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            
            const entries = xmlDoc.querySelectorAll('entry');
            const posts = [];
            
            entries.forEach((entry) => {
                const title = entry.querySelector('title')?.textContent || 'No title';
                const link = entry.querySelector('link')?.getAttribute('href') || '#';
                const content = entry.querySelector('content')?.textContent || 
                              entry.querySelector('summary')?.textContent || 
                              'No content available';
                const pubDate = entry.querySelector('published')?.textContent || 
                              entry.querySelector('updated')?.textContent || 
                              new Date().toISOString();
                
                posts.push({ title, link, content, pubDate });
            });

            blogContainer.innerHTML = "";
            
            if (posts.length === 0) {
                blogContainer.innerHTML = `
                    <div class="no-posts">
                        <p>No blog posts found from CyberNews X.</p>
                    </div>
                `;
                return;
            }

            // Display all posts
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
                        <i class="fas fa-newspaper"></i>
                    </div>
                    <div class="post-content">
                        <h4><a href="${post.link}" target="_blank">${post.title}</a></h4>
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

            // Add a summary at the top
            const summary = document.createElement("div");
            summary.className = "blog-summary";
            summary.innerHTML = `<h3>All Posts from CyberNews X (${posts.length} articles)</h3>`;
            blogContainer.insertBefore(summary, blogContainer.firstChild);
        })
        .catch(error => {
            console.error("Blog load failed:", error);
            blogContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" style="color: red;"></i>
                    <h3>Failed to load blog posts</h3>
                    <p>Error: ${error.message}</p>
                    <p>Please try visiting <a href="https://www.cybernewsx.in" target="_blank">CyberNews X</a> directly.</p>
                </div>
            `;
        });
}

// Auto-load when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Use the full-featured version by default
    loadAllBlogPosts();
    
    // Uncomment the line below to use the simple version instead
    // loadAllBlogPostsSimple();
});

// Optional: Add some basic CSS styles (you can customize these)
const blogStyles = `
<style>
.blog-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
}

.blog-posts-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.blog-post {
    display: flex;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.blog-post:hover {
    transform: translateY(-5px);
}

.post-image {
    width: 200px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    font-size: 2rem;
    color: #6c757d;
}

.post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.post-content {
    flex: 1;
    padding: 1.5rem;
}

.post-header h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
}

.post-header a {
    text-decoration: none;
    color: #333;
}

.post-header a:hover {
    color: #667eea;
}

.post-categories {
    margin-bottom: 1rem;
}

.category-tag {
    display: inline-block;
    background: #e9ecef;
    color: #6c757d;
    padding: 0.25rem 0.5rem;
    border-radius: 15px;
    font-size: 0.8rem;
    margin-right: 0.5rem;
}

.post-excerpt {
    color: #6c757d;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.post-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #6c757d;
}

.post-meta span {
    margin-right: 1rem;
}

.read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
}

.read-more:hover {
    text-decoration: underline;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
}

.page-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    background: white;
    color: #495057;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-btn:hover, .page-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.loading, .error-message, .no-posts {
    text-align: center;
    padding: 3rem;
}

.retry-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
}

.retry-btn:hover {
    background: #5a6fd8;
}

@media (max-width: 768px) {
    .blog-post {
        flex-direction: column;
    }
    
    .post-image {
        width: 100%;
        height: 200px;
    }
    
    .post-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>
`;

// Inject styles into the page
if (!document.querySelector('#blog-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'blog-styles';
    styleElement.innerHTML = blogStyles;
    document.head.appendChild(styleElement);
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
        const serviceID = 'service_wp6oixl'; // Replace with your EmailJS service ID
        const templateID = 'template_ygeakuk'; // Replace with your EmailJS template ID
        const publicKey = 'PrXglDKKoVCdWEOyA'; // Replace with your EmailJS public key

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
