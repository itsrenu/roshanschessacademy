# Quick Setup Guide for Roshan's Chess Academy Website

## 🚀 Immediate Steps to Go Live

### 1. Deploy the Website (5 minutes)
Choose one option:

**Option A: Netlify (Recommended)**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag your entire project folder to the deployment area
3. Your site is now live!

**Option B: Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project" and upload your folder

### 2. Set up Email Notifications (15 minutes)

**Step 1: Create EmailJS Account**
- Go to [emailjs.com](https://www.emailjs.com/)
- Sign up for free account (200 emails/month)

**Step 2: Connect Gmail**
- Email Services → Add New Service → Gmail
- Use your Gmail account (itsrenu@gmail.com)
- Enable 2FA and create App Password if needed

**Step 3: Create Templates**
Create 2 email templates with these exact IDs:

1. **Template ID: `template_registration`**
   - Subject: `New Chess Registration - {{student_name}}`
   - Body: Copy template from main README

2. **Template ID: `template_confirmation`**  
   - Subject: `Welcome to Chess Academy - {{student_name}}`
   - Body: Copy template from main README

**Step 4: Update Your Code**
In `script.js`, replace these values:
```javascript
const EMAILJS_CONFIG = {
    serviceID: 'service_61h7otm',    // From EmailJS dashboard
    templateID: 'template_registration',   // Keep this exact name
    publicKey: 'OvAkRTWsu4gZKCqvU'     // From EmailJS Account settings
};
```

### 3. Set up Calendar Booking (10 minutes)

**Step 1: Create Calendly Account**
- Go to [calendly.com](https://calendly.com)
- Sign up for free account

**Step 2: Create Chess Lesson Event**
- Create → Event Type → One-on-One
- Name: "Chess Lesson" 
- Duration: 45 minutes
- Set your availability hours

**Step 3: Update Calendar Links**
Replace both URLs in your code with your Calendly URL:

In `index.html` (line ~320):
```html
data-url="https://calendly.com/YOUR-USERNAME/chess-lesson"
```

In `script.js` (line ~327):
```javascript
url: 'https://calendly.com/YOUR-USERNAME/chess-lesson',
```

## ✅ Test Everything

1. **Test Registration Form**:
   - Fill out the form on your live site
   - Check itsrenu@gmail.com for new registration email
   - Check parent email for confirmation

2. **Test Calendar**:
   - Complete registration 
   - Click "Schedule First Lesson"
   - Verify calendar shows your availability

## 🎯 You're Done!

Your professional chess academy website is now:
- ✅ Live on the internet
- ✅ Accepting registrations via email
- ✅ Allowing lesson scheduling via calendar
- ✅ Mobile-friendly and professional

## 🔧 Need Help?

Common issues and solutions:

**Email not working?**
- Check EmailJS service connection
- Verify template IDs match exactly
- Check spam folders

**Calendar not loading?**  
- Verify Calendly URL is correct
- Check that your Calendly event is published
- Ensure your availability is set

**Form not submitting?**
- Check browser console for errors
- Verify all EmailJS config values are correct

---

**Total setup time: ~30 minutes**  
**Monthly cost: $0 (using free tiers)**

Your chess academy website is ready to accept students!