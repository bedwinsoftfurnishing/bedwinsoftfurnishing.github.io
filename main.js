// Minimal JavaScript - loads after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add any dynamic content or interactions here
    console.log('Page loaded successfully');
    
    // Example: Update timestamp
    const timestamp = new Date().toLocaleTimeString();
    console.log('Loaded at:', timestamp);
    
    // Contact form handling (client-side only)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = e.currentTarget;
            const name = form.querySelector('input[name="name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const subject = form.querySelector('input[name="subject"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();

            function showMessage(text, isError) {
                let el = document.getElementById('contactFormMessage');
                if (!el) {
                    el = document.createElement('div');
                    el.id = 'contactFormMessage';
                    el.style.marginTop = '12px';
                    form.appendChild(el);
                }
                el.textContent = text;
                el.style.color = isError ? '#b00020' : '#166534';
            }

            // Basic validation
            if (!name || !email || !subject || !message) {
                showMessage('Please complete all fields before sending.', true);
                return;
            }

            // Basic email pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessage('Please enter a valid email address.', true);
                return;
            }

            // Open mailto: fallback with prefilled form data
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            const mailtoUrl = `mailto:info@bedwinsoftfurnishing.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
            
            // Show confirmation
            showMessage('Opening your email client to send the message...', false);
            
            // Open mailto link
            window.location.href = mailtoUrl;
            
            // Reset form after a short delay to allow user to return if needed
            setTimeout(() => {
                form.reset();
                const msg = document.getElementById('contactFormMessage');
                if (msg) msg.textContent = '';
            }, 500);
        });
    }
});

// Handle bfcache restoration
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log('Page restored from bfcache');
        // Re-initialize any scripts or state if needed
    }
});

// Clean up before page enters bfcache
window.addEventListener('pagehide', (event) => {
    if (event.persisted) {
        console.log('Page entering bfcache');
        // Close any WebSocket connections or unload resources
    }
});

