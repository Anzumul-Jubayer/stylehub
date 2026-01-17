# Vercel Deployment Guide for StyleHub

## Environment Variables Setup

To fix the authentication issues in production, you need to set the following environment variables in your Vercel dashboard:

### Required Environment Variables

1. **NEXTAUTH_URL**
   - Value: `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - Description: The canonical URL of your site

2. **NEXTAUTH_SECRET**
   - Value: Generate a secure random string (different from development)
   - Description: Used to encrypt JWT tokens
   - Generate with: `openssl rand -base64 32` or use a password generator

3. **MONGODB_URI**
   - Value: Your MongoDB connection string
   - Description: Database connection for user data

4. **DB_NAME**
   - Value: `stylehub_db`
   - Description: Database name

5. **GOOGLE_CLIENT_ID**
   - Value: Your Google OAuth client ID
   - Description: For Google authentication

6. **GOOGLE_CLIENT_SECRET**
   - Value: Your Google OAuth client secret
   - Description: For Google authentication

### How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate value
5. Make sure to set them for "Production" environment

## Google OAuth Configuration

If using Google OAuth, make sure to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable the Google+ API
4. Go to Credentials → OAuth 2.0 Client IDs
5. Add your production domain to "Authorized JavaScript origins":
   - `https://your-app-name.vercel.app`
6. Add to "Authorized redirect URIs":
   - `https://your-app-name.vercel.app/api/auth/callback/google`

## Troubleshooting

### If authentication still fails:

1. **Check Vercel Function Logs**:
   - Go to Vercel dashboard → Functions tab
   - Check logs for any errors

2. **Verify Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify NEXTAUTH_URL matches your actual domain

3. **Cookie Issues**:
   - The updated configuration should handle cookie domain issues
   - Cookies are now set without domain in production

4. **Clear Browser Data**:
   - Clear cookies and local storage
   - Try in incognito mode

### Debug Mode

The application now includes debug logging. Check your Vercel function logs to see:
- Middleware execution logs
- Authentication token status
- Authorization decisions

## Testing

After deployment:

1. Test login with credentials:
   - admin@stylehub.com / admin123
   - user@stylehub.com / user123

2. Test Google OAuth login

3. Test dashboard access after login

4. Test admin-only features (add-item page)

## Security Notes

- Never commit production secrets to git
- Use different NEXTAUTH_SECRET for production
- Regularly rotate secrets
- Monitor authentication logs for suspicious activity