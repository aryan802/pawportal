# 🚀 Free Deployment Guide for PawPortal

This guide will help you deploy your PawPortal application to free hosting services.

## 📋 Overview

Your application consists of:
- **Frontend**: React app (runs on port 3000 in development)
- **Backend**: Node.js/Express API (runs on port 5000)
- **Database**: MySQL/TiDB
- **File Storage**: Cloudinary

## 🎯 Recommended Free Hosting Stack

### Option 1: Easiest Setup (Recommended for Beginners)
- **Frontend**: Vercel (Free, automatic deployments)
- **Backend**: Render (Free tier with limitations)
- **Database**: TiDB Cloud (Free tier available)
- **File Storage**: Cloudinary (Free tier available)

### Option 2: All-in-One Platform
- **Frontend + Backend**: Railway (Free tier, $5 credit/month)
- **Database**: Railway's MySQL addon (included in free tier)
- **File Storage**: Cloudinary (Free tier)

---

## 📦 Step-by-Step Deployment

### Part 1: Database Setup (TiDB Cloud - Free)

1. **Sign up for TiDB Cloud**
   - Go to https://tidbcloud.com
   - Sign up for a free account
   - Create a new cluster (select the free tier)

2. **Get Database Credentials**
   - Go to your cluster → **Connect** tab
   - Copy the connection details:
     - Host
     - Port (usually 4000)
     - Username
     - Password
     - Database name

3. **Run Database Migrations**
   - Use the SQL files in your project root to create tables
   - You can use TiDB Cloud's SQL Editor or a MySQL client

---

### Part 2: Backend Deployment (Render)

1. **Prepare Backend for Deployment**
   - Create a `render.yaml` file (we'll create this)
   - Ensure your backend uses environment variables

2. **Deploy to Render**
   - Go to https://render.com
   - Sign up for free account
   - Click **New +** → **Web Service**
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Configure:
     - **Name**: `pawportal-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     DATABASE_HOST=your-tidb-host
     DATABASE_PORT=4000
     DATABASE_USERNAME=your-username
     DATABASE_PASSWORD=your-password
     DATABASE_NAME=pawportal
     DATABASE_SSL=true
     JWT_SECRET=your-secret-key-32-chars-min
     JWT_EXPIRES_IN=7d
     JWT_REFRESH_SECRET=your-refresh-secret
     JWT_REFRESH_EXPIRES_IN=30d
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     ```
   - Click **Create Web Service**
   - Note your backend URL (e.g., `https://pawportal-backend.onrender.com`)

**⚠️ Important**: Render free tier spins down after 15 minutes of inactivity. First request may take 30-60 seconds.

---

### Part 3: Frontend Deployment (Vercel)

1. **Prepare Frontend**
   - Create a `.env.production` file (we'll create this)
   - Build the React app to ensure it works

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click **New Project**
   - Import your repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `./` (root of repo)
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
   - Add Environment Variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click **Deploy**
   - Your site will be live at `https://your-project.vercel.app`

3. **Update Backend CORS**
   - Go back to Render dashboard
   - Update `FRONTEND_URL` environment variable to your Vercel URL
   - Restart the service

---

### Part 4: Cloudinary Setup (File Uploads)

1. **Sign up for Cloudinary**
   - Go to https://cloudinary.com
   - Sign up for free account
   - Go to **Dashboard** → **Settings** → **Security**
   - Copy:
     - Cloud Name
     - API Key
     - API Secret

2. **Add to Backend Environment Variables**
   - Add these to your Render backend environment variables

---

## 🔧 Alternative: Railway (All-in-One)

Railway offers a simpler setup with everything in one place:

1. **Sign up for Railway**
   - Go to https://railway.app
   - Sign up with GitHub
   - You get $5 free credit/month

2. **Deploy Backend**
   - Click **New Project** → **Deploy from GitHub**
   - Select your repo
   - Select the `backend` folder
   - Railway auto-detects Node.js
   - Add environment variables (same as Render)
   - Add MySQL database: **New** → **Database** → **MySQL**
   - Railway automatically provides `DATABASE_URL` environment variable

3. **Deploy Frontend**
   - Add another service in the same project
   - Select root directory
   - Set build command: `npm install && npm run build`
   - Set start command: `npx serve -s build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend.railway.app/api`

---

## 📝 Files to Create

I'll create the necessary configuration files for you:

1. `.env.production` - Frontend production environment
2. `render.yaml` - Render deployment config (optional)
3. `vercel.json` - Vercel deployment config (optional)
4. `.gitignore` updates - Ensure secrets aren't committed

---

## 🔐 Security Checklist

- [ ] Generate strong JWT secrets (32+ characters)
- [ ] Use HTTPS for all services
- [ ] Set `NODE_ENV=production`
- [ ] Enable CORS only for your frontend domain
- [ ] Use environment variables, never hardcode secrets
- [ ] Enable database SSL connections

---

## 🐛 Troubleshooting

### Backend not connecting to database
- Check database credentials
- Ensure database allows connections from Render/Railway IPs
- Verify SSL settings match your database provider

### CORS errors
- Update `FRONTEND_URL` in backend environment variables
- Restart backend service after changing environment variables

### Frontend can't reach backend
- Check `REACT_APP_API_URL` is set correctly
- Ensure backend is running (Render free tier may spin down)
- Check browser console for errors

### Build failures
- Check Node.js version compatibility
- Ensure all dependencies are in `package.json`
- Review build logs for specific errors

---

## 🎉 Post-Deployment

1. **Test your application**
   - Visit your frontend URL
   - Test login/registration
   - Test file uploads
   - Test all major features

2. **Set up custom domain (optional)**
   - Vercel: Add custom domain in project settings
   - Render: Upgrade to paid plan for custom domains
   - Update `FRONTEND_URL` in backend if using custom domain

3. **Monitor your application**
   - Check Render/Railway logs for errors
   - Monitor database usage
   - Set up error tracking (optional)

---

## 💰 Cost Breakdown

**Free Tier Limits:**
- **Vercel**: Unlimited deployments, 100GB bandwidth/month
- **Render**: 750 hours/month (enough for 24/7), spins down after inactivity
- **Railway**: $5 credit/month (usually enough for small apps)
- **TiDB Cloud**: 1GB storage, 1GB RAM
- **Cloudinary**: 25GB storage, 25GB bandwidth/month

**Total Cost: $0/month** (if within free tier limits)

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [TiDB Cloud Documentation](https://docs.pingcap.com/tidbcloud)

---

## 🆘 Need Help?

If you encounter issues:
1. Check the service logs
2. Verify all environment variables are set
3. Ensure database is accessible
4. Check CORS configuration
5. Review this guide's troubleshooting section

