# 🚀 Netlify Deployment Guide

## Pre-Deployment Checklist

✅ Install Netlify Next.js plugin: `npm install --save-dev @netlify/plugin-nextjs`  
✅ Test locally with `npm run dev`  
✅ Visit `http://localhost:3000/api/seed` to verify database connection  
✅ Push all changes to GitHub  

---

## Step-by-Step Deployment

### Step 1: Install Netlify Plugin

```bash
npm install --save-dev @netlify/plugin-nextjs
```

This plugin is required for Next.js to work properly on Netlify.

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### Step 3: Create Netlify Site

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `bookshelf-digital-library`

### Step 4: Configure Build Settings

Netlify should auto-detect Next.js settings:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18

If not auto-detected, enter these manually.

### Step 5: Add Environment Variables

Before deploying, click **"Add environment variables"** and add:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bookshelf?retryWrites=true&w=majority` |
| `BETTER_AUTH_SECRET` | Random 32+ character string | Run `node generate-secret.js` |
| `BETTER_AUTH_URL` | Leave empty for now | Will update after deployment |
| `NEXT_PUBLIC_APP_URL` | Leave empty for now | Will update after deployment |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | `GOCSPX-xxxxxxxxxxxxx` |

**Important:** Leave `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` empty on first deploy.

### Step 6: Deploy

Click **"Deploy site"** — Netlify will:
- Install dependencies
- Build your Next.js app
- Deploy to production

⏱️ Takes 3-5 minutes

### Step 7: Update Environment Variables

After deployment succeeds, Netlify will give you a URL like:
```
https://bookshelf-digital-library-abc123.netlify.app
```

Now:
1. Go to **Site settings** → **Environment variables**
2. Update these variables:
   - `BETTER_AUTH_URL` = `https://your-site.netlify.app`
   - `NEXT_PUBLIC_APP_URL` = `https://your-site.netlify.app`
3. Click **"Save"**
4. Go to **Deploys** → Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Step 8: Seed the Database

After redeployment succeeds:
1. Visit `https://your-site.netlify.app/api/seed`
2. You should see: `✅ Successfully seeded 12 books into the database!`

### Step 9: Update Google OAuth Redirect URIs

In [Google Cloud Console](https://console.cloud.google.com/):
1. Go to APIs & Services → Credentials
2. Click your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   ```
   https://your-site.netlify.app/api/auth/callback/google
   ```
4. Save

---

## Troubleshooting

### Build fails with "Module not found"
- Make sure `@netlify/plugin-nextjs` is installed
- Check that `netlify.toml` exists in root
- Verify all imports use `@/` prefix correctly

### "Unauthorized" errors
- Verify all environment variables are set
- Make sure `BETTER_AUTH_URL` matches your actual Netlify URL
- Trigger a new deploy after changing environment variables

### Google OAuth not working
- Check redirect URI in Google Console matches exactly
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no trailing slashes in URLs

### No books showing
- Visit `/api/seed` to populate the database
- Check MongoDB connection string is correct
- Verify MongoDB allows connections from `0.0.0.0/0` (all IPs)

### Functions timeout
- Netlify functions have a 10-second timeout on free tier
- If MongoDB connection is slow, consider upgrading to Pro plan
- Check MongoDB Atlas cluster is in a nearby region

---

## Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow Netlify's DNS instructions
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your custom domain
5. Update Google OAuth redirect URI
6. Trigger a new deploy

---

## Useful Commands

```bash
# Local development
npm run dev

# Build locally (test before deploy)
npm run build
npm start

# Check for errors
npm run lint

# Install Netlify CLI (optional)
npm install -g netlify-cli

# Deploy from CLI
netlify deploy --prod
```

---

## Environment Variables Summary

```env
# Production values (update after first deploy)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookshelf?retryWrites=true&w=majority
BETTER_AUTH_SECRET=<generate-with-node-generate-secret.js>
BETTER_AUTH_URL=https://your-site.netlify.app
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

---

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [BetterAuth Documentation](https://better-auth.com/docs)

---

## Post-Deployment Checklist

✅ Test login/register  
✅ Test Google OAuth  
✅ Browse books and search  
✅ Borrow a book  
✅ Check profile page  
✅ Update profile  
✅ Test on mobile  
✅ Verify all pages load correctly  

**Congratulations! Your Bookshelf Digital Library is now live! 🎉**
