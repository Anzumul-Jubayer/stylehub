# Vercel Deployment Guide for StyleHub

## 🚨 Google OAuth Production Fix

This guide specifically addresses the Google OAuth authentication issues in production.

## Environment Variables Setup

To fix the authentication issues in production, you need to set the following environment variables in your Vercel dashboard:

### Required Environment Variables

1. **NEXTAUTH_URL** (CRITICAL FOR GOOGLE OAUTH)
   - Value: `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - Description: The canonical URL of your site - MUST match exactly
   - ⚠️ **Important**: This must be your exact production domain

2. **NEXTAUTH_SECRET** (CRITICAL FOR SECURITY)
   - Value: Generate a secure random string (different from development)
   - Description: Used to encrypt JWT tokens
   - Generate with: `openssl rand -base64 32` or use a password generator
   - ⚠️ **Important**: Use a strong, unique secret for production

3. **MONGODB_URI**
   - Value: Your MongoDB connection string
   - Description: Database connection for user data

4. **DB_NAME**
   - Value: `stylehub_db`
   - Description: Database name

5. **GOOGLE_CLIENT_ID** (CRITICAL FOR GOOGLE OAUTH)
   - Value: Your Google OAuth client ID
   - Description: For Google authentication
   - ⚠️ **Important**: Must match Google Cloud Console configuration

6. **GOOGLE_CLIENT_SECRET** (CRITICAL FOR GOOGLE OAUTH)
   - Value: Your Google OAuth client secret
   - Description: For Google authentication
   - ⚠️ **Important**: Keep this secret secure

### How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate value
5. Make sure to set them for "Production" environment
6. **Redeploy after adding variables**

## Google OAuth Configuration (CRITICAL)

### Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable the Google+ API (if not already enabled)
4. Go to APIs & Services → Credentials
5. Find your OAuth 2.0 Client ID or create a new one

### Step 2: Configure Authorized Origins

Add your production domain to "Authorized JavaScript origins":
- `https://your-app-name.vercel.app`
- `https://your-custom-domain.com` (if using custom domain)

### Step 3: Configure Redirect URIs (MOST IMPORTANT)

Add these EXACT URLs to "Authorized redirect URIs":
- `https://your-app-name.vercel.app/api/auth/callback/google`
- `https://your-custom-domain.com/api/auth/callback/google` (if using custom domain)

⚠️ **CRITICAL**: The path `/api/auth/callback/google` must be exact!

## Common Google OAuth Errors & Solutions

### 1. "redirect_uri_mismatch" Error
**Cause**: Redirect URI not configured in Google Console
**Solution**: Add `https://your-domain.vercel.app/api/auth/callback/google` to authorized redirect URIs

### 2. "invalid_client" Error
**Cause**: Wrong client ID or secret
**Solution**: Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel environment variables

### 3. "access_denied" Error
**Cause**: User denied permissions or OAuth flow interrupted
**Solution**: Enhanced error handling now shows specific error messages

### 4. Cookie/Session Issues
**Cause**: Insecure cookies in production
**Solution**: ✅ Fixed with secure cookie configuration for HTTPS

### 5. CORS Errors
**Cause**: Domain not authorized in Google Console
**Solution**: Add your domain to authorized JavaScript origins

## Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push your code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Add environment variables** (see above)
6. **Deploy**

### Method 2: Vercel CLI

1. **Install Vercel CLI**: `npm install -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `vercel --prod`
4. **Set environment variables**: Use `vercel env add` for each variable

## Post-Deployment Checklist

### ✅ Verify Google OAuth Setup

1. **Check Vercel Environment Variables**:
   - NEXTAUTH_URL matches your live domain
   - NEXTAUTH_SECRET is set and unique
   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct

2. **Check Google Cloud Console**:
   - Authorized JavaScript origins include your domain
   - Authorized redirect URIs include `/api/auth/callback/google`

3. **Test Authentication**:
   - Try demo login (should work)
   - Try Google OAuth (should now work in production)

### 🔧 If Google OAuth Still Doesn't Work

1. **Check browser console** for error messages
2. **Check Vercel function logs** for server-side errors
3. **Verify domain spelling** in all configurations
4. **Try incognito/private browsing** to avoid cache issues
5. **Wait 5-10 minutes** after configuration changes

## Enhanced Features Added

### ✅ Production-Ready OAuth Configuration
- Secure cookie settings for HTTPS
- Enhanced error handling and user feedback
- Proper redirect handling for production domains
- Debug logging for troubleshooting

### ✅ Error Handling Improvements
- Specific error messages for different OAuth failures
- Toast notifications for better user experience
- Fallback mechanisms for authentication flows

### ✅ Security Enhancements
- Secure cookie configuration for production
- Enhanced CSRF protection
- Proper session management

## Testing Your Deployment

1. **Visit your live site**: `https://your-app-name.vercel.app`
2. **Test demo login**: Use admin@stylehub.com / admin123
3. **Test Google OAuth**: Click "Continue with Google"
4. **Verify user dashboard**: Check if user info displays correctly
5. **Test admin features**: Login as admin and try adding products

## Support

If you're still experiencing issues:

1. **Check the detailed setup guide**: `GOOGLE_OAUTH_SETUP.md`
2. **Review error messages** in browser console
3. **Check Vercel function logs** for server errors
4. **Verify all environment variables** are set correctly

Your StyleHub application should now have fully working Google OAuth in production! 🎉
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