# EmailJS Setup Instructions

This project uses EmailJS to handle contact form submissions. Follow these steps to configure it:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
To: {{to_name}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent via the Pixels & Petals contact form.
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## 5. Update the Code

In `apps/web/src/app/components/ContactSection.tsx`, replace these values:

```typescript
const EMAILJS_SERVICE_ID = "your_service_id_here";
const EMAILJS_TEMPLATE_ID = "your_template_id_here";
const EMAILJS_PUBLIC_KEY = "your_public_key_here";
```

## 6. Environment Variables (Recommended)

For security, create a `.env.local` file in `apps/web/`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Then update the component to use environment variables:

```typescript
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
```

## 7. Test the Form

1. Start your development server
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message

## Features Implemented

- ✅ Form validation (required fields, email format)
- ✅ Loading states with spinner
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Responsive design
- ✅ Theme-aware styling

## Troubleshooting

- Ensure your EmailJS service is active
- Check that template variable names match exactly
- Verify your public key is correct
- Check browser console for error messages
- Test with a simple template first
