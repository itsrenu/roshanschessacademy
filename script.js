// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_61h7otm', // Replace with your EmailJS service ID
    templateID: 'template_registration', // Template for instructor notification
    confirmationTemplateID: 'template_confirmation', // Template for parent confirmation
    publicKey: 'OvAkRTWsu4gZKCqvU' // Replace with your EmailJS public key
};

// Check if EmailJS is properly configured
function isEmailJSConfigured() {
    return EMAILJS_CONFIG.serviceID !== 'service_your_service_id' && 
           EMAILJS_CONFIG.templateID !== 'template_your_template_id' && 
           EMAILJS_CONFIG.publicKey !== 'your_public_key';
}

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    console.log('EmailJS Config Check:', {
        serviceID: EMAILJS_CONFIG.serviceID,
        templateID: EMAILJS_CONFIG.templateID,
        publicKey: EMAILJS_CONFIG.publicKey,
        isConfigured: isEmailJSConfigured(),
        emailjsAvailable: typeof emailjs !== 'undefined'
    });
    
    // Only initialize EmailJS if properly configured
    if (isEmailJSConfigured() && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.log('EmailJS not initialized:', {
            configured: isEmailJSConfigured(),
            libraryLoaded: typeof emailjs !== 'undefined'
        });
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Registration Form Handling
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const closeSuccessBtn = document.getElementById('closeSuccess');

// Check if all elements exist
if (!registrationForm) {
    console.error('Registration form not found!');
}
if (!successMessage) {
    console.error('Success message element not found!');
}
if (!closeSuccessBtn) {
    console.error('Close success button not found!');
}

const submitBtn = registrationForm ? registrationForm.querySelector('.btn-submit') : null;
if (!submitBtn) {
    console.error('Submit button not found!');
}

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.style.borderColor = '#e74c3c';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '#ddd';
}

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    const inputs = registrationForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => clearError(input));
    
    // Required field validation
    const requiredFields = [
        { id: 'parentName', message: 'Parent/Guardian name is required' },
        { id: 'studentName', message: 'Student name is required' },
        { id: 'studentAge', message: 'Please select student age' },
        { id: 'email', message: 'Email address is required' },
        { id: 'phone', message: 'Phone number is required' },
        { id: 'experience', message: 'Please select experience level' }
    ];
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input.value.trim()) {
            showError(input, field.message);
            isValid = false;
        }
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput.value.trim() && !validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Age validation
    const ageInput = document.getElementById('studentAge');
    if (ageInput.value && ageInput.value !== '' && parseInt(ageInput.value) < 8 && ageInput.value !== '8') {
        showError(ageInput, 'Students must be 8 years or older');
        isValid = false;
    }
    
    // Terms agreement validation
    const agreeCheckbox = document.getElementById('agree');
    if (!agreeCheckbox.checked) {
        showError(agreeCheckbox, 'Please agree to the lesson terms');
        isValid = false;
    }
    
    return isValid;
}

// Real-time validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value.trim() && !validateEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else if (this.value.trim()) {
        clearError(this);
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (this.value.trim() && !validatePhone(this.value)) {
        showError(this, 'Please enter a valid phone number');
    } else if (this.value.trim()) {
        clearError(this);
    }
});

// Form submission
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.error-message');
        if (firstError) {
            const input = firstError.parentElement.querySelector('input, select, textarea');
            if (input) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                input.focus();
            }
        }
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(registrationForm);
    const registrationData = {
        parentName: formData.get('parentName'),
        studentName: formData.get('studentName'),
        studentAge: formData.get('studentAge'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        preferredTime: formData.get('preferredTime'),
        goals: formData.get('goals'),
        timestamp: new Date().toISOString()
    };
    
    // Send emails using EmailJS
    sendRegistrationEmails(registrationData)
        .then(() => {
            showSuccessMessage();
            // Reset form
            registrationForm.reset();
        })
        .catch((error) => {
            console.error('Error sending emails:', error);
            alert('There was an error sending your registration. Please try again or contact us directly.');
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });
}

// Email sending function
async function sendRegistrationEmails(registrationData) {
    console.log('Starting email send process...');
    console.log('Registration data:', registrationData);
    console.log('EmailJS configured:', isEmailJSConfigured());
    
    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
        console.log('EmailJS not configured yet. Registration data:', registrationData);
        
        // Show a helpful message to the user
        alert(`Registration received! 
        
Student: ${registrationData.studentName}
Parent: ${registrationData.parentName}
Email: ${registrationData.email}
Phone: ${registrationData.phone}

Note: Email functionality will work once you complete the EmailJS setup (see SETUP_GUIDE.md).
For now, please save this information and contact the family directly.`);
        
        return; // Skip email sending but continue with success flow
    }

    // Check if EmailJS library is available
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded');
        alert('Email service temporarily unavailable. Please try again or contact us directly.');
        return;
    }

    // Parameters for instructor notification email
    const instructorParams = {
        parent_name: registrationData.parentName,
        student_name: registrationData.studentName,
        student_age: registrationData.studentAge,
        parent_email: registrationData.email,
        phone: registrationData.phone,
        experience: registrationData.experience,
        preferred_time: registrationData.preferredTime || 'Not specified',
        goals: registrationData.goals || 'Not specified',
        timestamp: new Date(registrationData.timestamp).toLocaleString()
    };

    // Parameters for parent confirmation email (using same format as instructor email)
    const confirmationParams = {
        parent_name: registrationData.parentName,
        student_name: registrationData.studentName,
        student_age: registrationData.studentAge,
        parent_email: registrationData.email,
        phone: registrationData.phone,
        experience: registrationData.experience,
        preferred_time: registrationData.preferredTime || 'Not specified',
        goals: registrationData.goals || 'Not specified',
        timestamp: new Date(registrationData.timestamp).toLocaleString()
    };

    try {
        console.log('Sending instructor notification email...');
        console.log('Using service:', EMAILJS_CONFIG.serviceID);
        console.log('Using template:', EMAILJS_CONFIG.templateID);
        console.log('Instructor params:', instructorParams);
        
        // Send email to instructor (itsrenu@gmail.com)
        const instructorResult = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            instructorParams
        );
        
        console.log('Instructor email sent successfully:', instructorResult);

        // Send confirmation email to parent
        try {
            console.log('Sending parent confirmation email...');
            console.log('Using template:', EMAILJS_CONFIG.confirmationTemplateID);
            console.log('Confirmation params:', confirmationParams);
            
            const confirmationResult = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID, // Use same working template temporarily
                confirmationParams
            );
            
            console.log('Parent confirmation email sent successfully:', confirmationResult);
        } catch (confirmationError) {
            console.error('Parent confirmation email failed:', confirmationError);
            console.log('Continuing without parent confirmation email...');
            // Don't fail the entire process if confirmation email fails
        }

        console.log('Emails sent successfully');
    } catch (error) {
        console.error('EmailJS Error:', error);
        
        // Show user-friendly error message
        alert(`Registration received but email delivery failed. 
        
Please contact us directly at itsrenu@gmail.com with these details:
Student: ${registrationData.studentName}
Parent: ${registrationData.parentName}
Email: ${registrationData.email}
Phone: ${registrationData.phone}`);
        
        // Don't throw error - let registration succeed
        // Just continue to show success message
    }
    
    console.log('Email sending process completed successfully');
}

function showSuccessMessage() {
    if (successMessage) {
        successMessage.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideSuccessMessage() {
    if (successMessage) {
        successMessage.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Calendar Modal Elements - initialized after DOM loads
let calendarModal, scheduleBtn, closeCalendarBtn;

document.addEventListener('DOMContentLoaded', function() {
    // Debug: Check if elements exist
    console.log('Looking for calendar elements...');
    calendarModal = document.getElementById('calendarModal');
    scheduleBtn = document.getElementById('scheduleLesson');
    closeCalendarBtn = document.getElementById('closeCalendar');
    
    // Get direct schedule button from navigation
    const scheduleDirectBtn = document.getElementById('scheduleDirectBtn');
    
    console.log('calendarModal found:', calendarModal);
    console.log('scheduleBtn found:', scheduleBtn);
    console.log('scheduleDirectBtn found:', scheduleDirectBtn);
    console.log('closeCalendarBtn found:', closeCalendarBtn);
    
    // Set up event listeners after elements are found
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            console.log('Schedule button clicked');
            hideSuccessMessage();
            showCalendarModal();
        });
    } else {
        console.error('Schedule button not found!');
    }
    
    // Direct schedule button from navigation
    if (scheduleDirectBtn) {
        scheduleDirectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Direct schedule button clicked');
            showCalendarModal();
        });
    } else {
        console.error('Direct schedule button not found!');
    }
    
    if (closeCalendarBtn) {
        closeCalendarBtn.addEventListener('click', hideCalendarModal);
    }
    
    if (calendarModal) {
        calendarModal.addEventListener('click', function(e) {
            if (e.target === calendarModal) {
                hideCalendarModal();
            }
        });
    }
});

// Success message event listeners (moved to DOMContentLoaded above for calendar elements)
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', hideSuccessMessage);
}

if (successMessage) {
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            hideSuccessMessage();
        }
    });
}

// Calendar Modal Functions
function showCalendarModal() {
    // Try to get the element again if it wasn't found before
    if (!calendarModal) {
        calendarModal = document.getElementById('calendarModal');
    }
    
    if (!calendarModal) {
        console.error('Calendar modal not found!');
        alert('Calendar feature temporarily unavailable. Please contact itsrenu@gmail.com to schedule your lesson.');
        return;
    }
    
    // Check if Calendly URL is configured
    const calendlyWidget = document.querySelector('.calendly-inline-widget');
    if (!calendlyWidget) {
        console.error('Calendly widget not found!');
        return;
    }
    
    const calendlyUrl = calendlyWidget.getAttribute('data-url');
    console.log('Found Calendly URL:', calendlyUrl);
    
    // Check if URL is the placeholder or empty
    if (!calendlyUrl || 
        calendlyUrl === 'https://calendly.com/roshanschess/chess-lesson' ||
        calendlyUrl === 'https://calendly.com/your-username/chess-lesson') {
        alert(`Calendar booking will be available once you set up Calendly.

For now, please contact Roshan directly to schedule your lesson:
Email: itsrenu@gmail.com

See SETUP_GUIDE.md for Calendly setup instructions.`);
        return;
    }
    
    console.log('Calendly URL is valid, opening calendar...');
    
    calendarModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Initialize Calendly if available
    if (typeof Calendly !== 'undefined') {
        Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: calendlyWidget,
            prefill: {},
            utm: {}
        });
    } else {
        // Fallback if Calendly script doesn't load
        calendlyWidget.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #666;">
                <p>Calendar loading...</p>
                <p>If this doesn't load, please contact itsrenu@gmail.com to schedule your lesson.</p>
            </div>
        `;
    }
}

function hideCalendarModal() {
    if (calendarModal) {
        calendarModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Calendar modal event listeners moved to DOMContentLoaded block above

// Close success message with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (successMessage && successMessage.classList.contains('show')) {
            hideSuccessMessage();
        }
        if (calendarModal && calendarModal.classList.contains('show')) {
            hideCalendarModal();
        }
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations to elements
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .pricing-card, .register-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Chess piece animation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const chessPieces = document.querySelectorAll('.chess-board-animation i');
    
    chessPieces.forEach((piece, index) => {
        piece.style.animationDelay = `${index * 0.2}s`;
        
        piece.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        piece.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
});

// Contact form enhancement for better UX
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.register-form input, .register-form select, .register-form textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Clear errors on input
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                clearError(this);
            }
        });
    });
});

// Utility function to format phone number as user types
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;
    
    if (value.length >= 6) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    e.target.value = formattedValue;
});

// Add loading animation to submit button
const submitButton = document.querySelector('.btn-submit');
if (submitButton) {
    submitButton.addEventListener('click', function() {
        if (!this.disabled && validateForm()) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
    });
}

// Performance optimization: Lazy load animations
const lazyAnimations = () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
        const animationType = el.getAttribute('data-animate');
        el.classList.add(`animate-${animationType}`);
    });
};

// Initialize lazy animations when page is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyAnimations);
} else {
    lazyAnimations();
}