# Roshan's Chess Academy Website

A professional website for Roshan's Chess Academy, featuring online lesson registration and highlighting the unique value proposition of making chess fun while teaching life skills.

## Features

- **Professional Design**: Clean, modern interface with chess-themed styling
- **Responsive Layout**: Fully responsive design that works on all devices
- **Online Registration**: Interactive form for lesson booking with validation
- **Value Proposition**: Emphasizes fun learning and life skills development
- **Credentials Showcase**: Highlights Indiana State Champion status
- **Mobile-Friendly**: Optimized for mobile devices with hamburger navigation

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Hosting Options

### Option 1: Netlify (Recommended - Free)

1. **Sign up for Netlify**: Go to [netlify.com](https://netlify.com) and create a free account
2. **Deploy via Drag & Drop**:
   - Go to your Netlify dashboard
   - Drag and drop the entire project folder onto the deployment area
   - Your site will be live instantly with a random URL
3. **Custom Domain** (Optional):
   - In Site Settings > Domain Management
   - Add your custom domain (e.g., roshanschessacademy.com)

### Option 2: Vercel (Free)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and create an account
2. **Deploy**:
   - Click "New Project"
   - Upload your project folder
   - Your site will be deployed automatically
3. **Custom Domain**: Add in Project Settings

### Option 3: GitHub Pages (Free)

1. **Create GitHub Account**: Sign up at [github.com](https://github.com)
2. **Create Repository**:
   - Create a new repository named `roshanschessacademy` (or any name)
   - Upload all files to the repository
3. **Enable GitHub Pages**:
   - Go to Repository Settings > Pages
   - Select "Deploy from main branch"
   - Your site will be available at: `https://yourusername.github.io/roshanschessacademy`

### Option 4: Traditional Web Hosting

Upload all files to your web hosting provider's public folder (usually `public_html` or `www`).

## Customization Guide

### Adding Your Photo
Replace the trophy icon in the About section:
1. Add your photo to the project folder
2. In `index.html`, find the `.image-placeholder` div
3. Replace the `<i class="fas fa-trophy"></i>` with `<img src="your-photo.jpg" alt="Roshan">`

### Updating Contact Information
1. Add your contact details in the registration section
2. Consider adding a phone number or address in the footer

## Email and Calendar Setup

### EmailJS Setup (Required for Email Functionality)

1. **Create EmailJS Account**:
   - Go to [emailjs.com](https://www.emailjs.com/) and create a free account
   - The free tier allows 200 emails per month

2. **Set up Email Service**:
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service" and choose your email provider (Gmail recommended)
   - For Gmail: Enable 2FA and create an App Password
   - Follow the connection setup instructions

3. **Create Email Templates**:
   
   **Template 1 - New Registration (for itsrenu@gmail.com)**:
   - Go to "Email Templates" → "Create New Template"
   - Template ID: `template_registration` 
   - Subject: `New Chess Lesson Registration - {{student_name}}`
   - Content:
   ```
   New chess lesson registration received!

   Student Details:
   - Student Name: {{student_name}}
   - Student Age: {{student_age}}
   - Parent Name: {{parent_name}}
   - Email: {{parent_email}}
   - Phone: {{phone}}
   - Experience Level: {{experience}}
   - Preferred Times: {{preferred_time}}
   - Goals: {{goals}}

   Registration Time: {{timestamp}}

   Please contact the family to schedule their first lesson.
   ```

   **Template 2 - Confirmation (for parents)**:
   - Template ID: `template_confirmation`
   - Subject: `Welcome to Roshan's Chess Academy - {{student_name}}`
   - Content:
   ```
   Dear {{parent_name}},

   Thank you for registering {{student_name}} for chess lessons at Roshan's Chess Academy!

   Registration Details:
   - Student: {{student_name}}, Age {{student_age}}
   - Experience Level: {{experience}}
   - Lesson Rate: {{lesson_price}}

   I'll be in touch within 24 hours to schedule your first lesson. In the meantime, please use the calendar link in your registration confirmation to book a convenient time.

   Looking forward to helping {{student_name}} learn and grow through chess!

   Best regards,
   Roshan
   Indiana State Chess Champion
   ```

4. **Update Configuration**:
   - Copy your Service ID from EmailJS dashboard
   - Copy your Template IDs
   - Copy your Public Key from Account settings
   - Update these values in `script.js`:

   ```javascript
   const EMAILJS_CONFIG = {
       serviceID: 'your_service_id_here',
       templateID: 'template_registration',
       publicKey: 'your_public_key_here'
   };
   ```

### Calendly Setup (Required for Lesson Booking)

1. **Create Calendly Account**:
   - Go to [calendly.com](https://calendly.com) and create a free account
   - Free tier allows unlimited 1-on-1 meetings

2. **Set up Chess Lesson Event**:
   - Click "Create" → "Event Type"
   - Choose "One-on-One"
   - Event Name: "Chess Lesson"
   - Duration: 45 minutes
   - Price: $20 (if using paid Calendly features)
   - Description: "Individual chess lesson with Indiana State Champion Roshan"

3. **Configure Availability**:
   - Set your available days and times
   - Add buffer times between lessons if needed
   - Set timezone

4. **Update Calendar Link**:
   - Copy your Calendly event URL
   - In `index.html`, update the `data-url` attribute:
   ```html
   <div class="calendly-inline-widget" 
        data-url="https://calendly.com/your-username/chess-lesson" 
        style="min-width:320px;height:700px;">
   </div>
   ```
   - Also update the URL in `script.js`:
   ```javascript
   url: 'https://calendly.com/your-username/chess-lesson',
   ```

### Testing the Setup

1. **Test Email Functionality**:
   - Fill out the registration form
   - Check that you receive an email at itsrenu@gmail.com
   - Check that the parent receives a confirmation email

2. **Test Calendar Integration**:
   - Complete a registration
   - Click "Schedule First Lesson" 
   - Verify the calendar opens and shows your availability

### Alternative Email Setup Options

#### Option A: Formspree (Simpler but less customizable)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form endpoint
3. Update the form action in HTML

#### Option B: Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to your form
2. Emails will go to your Netlify account

#### Option C: Custom Backend
Implement with Node.js, PHP, or Python for full control.

## SEO Optimization

The site includes:
- Meta descriptions and titles
- Structured content with proper headings
- Fast loading times
- Mobile optimization
- Semantic HTML structure

## Browser Compatibility

- Chrome (all versions)
- Firefox (all versions)  
- Safari (all versions)
- Edge (all versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images and fonts
- Minimal external dependencies
- Compressed CSS and JavaScript
- Fast loading times

## Maintenance

To update content:
1. Edit `index.html` for text changes
2. Modify `styles.css` for design updates
3. Update `script.js` for functionality changes

## Support

For questions about the website:
1. Check this README first
2. Review the code comments in each file
3. Test locally by opening `index.html` in your browser

## License

This website is created for Roshan's Chess Academy. Feel free to modify and customize as needed.

---

**Next Steps:**
1. Test the website locally by opening `index.html`
2. Choose a hosting option and deploy
3. Set up form submission handling
4. Add your photo and any additional contact information
5. Register a custom domain if desired

Your professional chess academy website is ready to go live!