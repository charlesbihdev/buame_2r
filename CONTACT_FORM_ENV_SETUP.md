# Contact Form EmailJS Environment Variables Setup

This document outlines the environment variables required for the contact form to work with EmailJS.

## Required Environment Variables

Add the following variables to your `.env` file (or `.env.example` for reference):

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Contact Form Recipient Email
VITE_CONTACT_EMAIL=your-email@example.com
```

## Setup Instructions

### 1. EmailJS Account Setup

1. **Create an EmailJS account** at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Create an Email Service**:
   - Go to Email Services in your dashboard
   - Add a new service (Gmail, Outlook, etc.)
   - Follow the setup instructions for your email provider
   - Copy the **Service ID** → This is your `VITE_EMAILJS_SERVICE_ID`

3. **Create an Email Template**:
   - Go to Email Templates in your dashboard
   - Create a new template
   - Use the following template variables in your email template:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{phone}}` - Sender's phone number (optional)
     - `{{inquiry_type}}` - Type of inquiry
     - `{{message}}` - The message content
     - `{{to_email}}` - Recipient email (from env variable)
   - Copy the **Template ID** → This is your `VITE_EMAILJS_TEMPLATE_ID`

4. **Get your Public Key**:
   - Go to Account → API Keys
   - Copy your **Public Key** → This is your `VITE_EMAILJS_PUBLIC_KEY`

### 2. Environment Variables

Add the following to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_CONTACT_EMAIL=support@2rbuame.com
```

**Note**: All variables prefixed with `VITE_` are exposed to the frontend. Do not put sensitive information in these variables.

### 3. Email Template Example

Here's an example EmailJS template you can use:

**Subject**: New Contact Form Submission - {{inquiry_type}}

**Body**:
```
You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Inquiry Type: {{inquiry_type}}

Message:
{{message}}

---
This email was sent from the 2RBUAME contact form.
```

### 4. Testing

After setting up the environment variables:

1. Restart your development server (`npm run dev`)
2. Navigate to the contact page (`/contact`)
3. Fill out and submit the form
4. Check your email inbox for the test message

## Troubleshooting

- **"Failed to send message" error**: 
  - Verify all environment variables are set correctly
  - Check that your EmailJS service is properly configured
  - Ensure your email service provider (Gmail, Outlook, etc.) is connected correctly

- **Environment variables not loading**:
  - Make sure variables are prefixed with `VITE_`
  - Restart your development server after adding new variables
  - Clear browser cache if needed

- **Email not received**:
  - Check your spam/junk folder
  - Verify the `VITE_CONTACT_EMAIL` is correct
  - Check EmailJS dashboard for delivery status

## Security Notes

- The EmailJS Public Key is safe to expose in the frontend
- The Service ID and Template ID are also safe to expose
- Never put your EmailJS Private Key in frontend environment variables
- The `VITE_CONTACT_EMAIL` will be visible in the frontend code, but this is typically acceptable for a contact form
