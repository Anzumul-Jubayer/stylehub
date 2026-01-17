# Google OAuth Setup for Production

## 🔧 Google Cloud Console Configuration

### Step 1: Update Authorized JavaScript Origins
Add these URLs to your Google Cloud Console OAuth 2.0 Client:

**For Development:**
- `http://localhost:3000`

**For Production (Replace with your actual Vercel domain):**
- `https://your-app-name.vercel.app`
- `https://your-custom-domain.com` (if using custom domain)

### Step 2: Update Authorized Redirect URIs
Add these callback URLs:

**For Development:**
- `http://localhost:3000/api/auth/callback/google`

**For Production:**
- `https://your-app-name.vercel.app/api/auth/callback/google`
- `https://your-custom-domain.com/api/auth/callback/google` (if using custom domain)

### Step 3: Vercel Environment Variables
Set these environment variables in your Vercel dashboard:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-strong-production-secret-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database Configuration
MONGODB_URI=your-mongodb-connection-string
DB_NAME=stylehub_db
```

## 🚨 Important Notes:

1. **NEXTAUTH_URL**: Must match your production domain exactly
2. **NEXTAUTH_SECRET**: Use a strong, unique secret for production
3. **Redirect URIs**: Must include `/api/auth/callback/google` path
4. **HTTPS Required**: Google OAuth requires HTTPS in production
5. **Domain Verification**: Ensure your domain is verified in Google Console

## 🔍 Troubleshooting:

### Common Issues:
1. **redirect_uri_mismatch**: Check authorized redirect URIs in Google Console
2. **invalid_client**: Verify client ID and secret are correct
3. **Cookie issues**: Ensure secure cookies are enabled for HTTPS
4. **CORS errors**: Check authorized JavaScript origins

### Debug Steps:
1. Enable NextAuth debug mode in development
2. Check browser network tab for failed requests
3. Verify environment variables are set in Vercel
4. Test with different browsers/incognito mode

## 📝 Quick Setup Checklist:

- [ ] Google Cloud Console OAuth client configured
- [ ] Authorized JavaScript origins added
- [ ] Authorized redirect URIs added
- [ ] Vercel environment variables set
- [ ] NEXTAUTH_URL matches production domain
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Application deployed and accessible via HTTPS