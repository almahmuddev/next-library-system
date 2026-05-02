# 🚀 Vercel Deployment Guide

## Pre-Deployment Checklist

✅ Run `npm install` to update dependencies  
✅ Test locally with `npm run dev`  
✅ Visit `http://localhost:3000/api/seed` to verify database connection  
✅ Push all changes to GitHub  

---

## Step-by-Step Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo: `bookshelf-digital-library`
4. Click **"Import"**

### 3. Configure Environment Variables
In the Vercel dashboard, add these environment variables:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bookshelf` |
| `BETTER_AUTH_SECRET` | Random 32+ character string | `your-super-secret-key-minimum-32-chars` |
| `BETTER_AUTH_URL` | Your Vercel deployment URL | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Same as BETTER_AUTH_URL | `https://your-app.vercel.app` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | `GOCSPX-xxxxxxxxxxxxx` |

**Important:** Leave `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` empty on first deploy. After deployment, Vercel will give you a URL like `https://bookshelf-digital-library.vercel.app`. Then:
1. Go to Settings → Environment Variables
2. Add both URLs with your actual Vercel URL
3. Redeploy (Deployments → click ⋯ → Redeploy)

### 4. Deploy
Click **"Deploy"** — Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to production

⏱️ Takes 2-3 minutes

### 5. Seed the Database
After deployment succeeds:
1. Visit `https://your-app.vercel.app/api/seed`
2. You should see: `✅ Successfully seeded 12 books into the database!`

### 6. Update Google OAuth Redirect URIs
In [Google Cloud Console](https://console.cloud.google.com/):
1. Go to APIs & Services → Credentials
2. Click your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   - `https://your-app.vercel.app/api/auth/callback/google`
4. Save

---

## Troubleshooting

### Build fails with "Module not found"
- Make sure `jsconfig.json` exists in the root
- Check that all imports use `@/` prefix correctly

### "Unauthorized" errors
- Verify all environment variables are set
- Make sure `BETTER_AUTH_URL` matches your actual Vercel URL
- Redeploy after adding/changing environment variables

### Google OAuth not working
- Check redirect URI in Google Console matches exactly
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct

### No books showing
- Visit `/api/seed` to populate the database
- Check MongoDB connection string is correct
- Verify MongoDB allows connections from `0.0.0.0/0` (all IPs)

---

## Post-Deployment

✅ Test login/register  
✅ Test Google OAuth  
✅ Browse books and search  
✅ Borrow a book  
✅ Check profile page  
✅ Update profile  
✅ Test on mobile  

---

## Custom Domain (Optional)

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS instructions
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your custom domain
5. Update Google OAuth redirect URI
6. Redeploy

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
```

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [BetterAuth Documentation](https://better-auth.com/docs)
