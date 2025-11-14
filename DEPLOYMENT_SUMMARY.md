# 🚀 Quick Deployment Summary

## What You Need

1. **GitHub Account** (to connect repositories)
2. **TiDB Cloud Account** (free database)
3. **Cloudinary Account** (free file storage)
4. **Render Account** (free backend hosting)
5. **Vercel Account** (free frontend hosting)

## Quick Start (5 Steps)

### 1️⃣ Generate Secrets
```bash
node generate-secrets.js
```
Save the output - you'll need it for backend environment variables.

### 2️⃣ Set Up Database
- Sign up: https://tidbcloud.com
- Create free cluster
- Copy connection details
- Run your SQL migration files

### 3️⃣ Set Up Cloudinary
- Sign up: https://cloudinary.com
- Get credentials from Dashboard → Settings → Security

### 4️⃣ Deploy Backend to Render
1. Go to https://render.com → New Web Service
2. Connect GitHub repo
3. Root directory: `backend`
4. Build: `npm install`
5. Start: `npm start`
6. Add all environment variables (see QUICK_DEPLOY_CHECKLIST.md)
7. Deploy → Copy backend URL

### 5️⃣ Deploy Frontend to Vercel
1. Go to https://vercel.com → New Project
2. Import GitHub repo
3. Framework: Create React App
4. Add env var: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
5. Deploy → Copy frontend URL
6. Update backend `FRONTEND_URL` with Vercel URL

## ⚡ That's It!

Your app is now live! Visit your Vercel URL to see it.

## 📚 Detailed Guides

- **Full Guide**: See `DEPLOYMENT_GUIDE.md`
- **Step-by-Step Checklist**: See `QUICK_DEPLOY_CHECKLIST.md`

## 💡 Pro Tips

- Render free tier spins down after 15 min - first request may be slow
- Always use HTTPS URLs in production
- Keep your secrets secure - never commit them to git
- Test everything after deployment

## 🆘 Need Help?

Check the troubleshooting section in `DEPLOYMENT_GUIDE.md`

