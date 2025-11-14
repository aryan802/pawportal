# ✅ Quick Deployment Checklist

Follow these steps in order to deploy your PawPortal app for free.

## 🔑 Step 1: Generate Secrets

Run these commands to generate secure JWT secrets:

```bash
# Generate JWT_SECRET (32+ characters)
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_REFRESH_SECRET (32+ characters)
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

**Save these values** - you'll need them for backend environment variables.

---

## 🗄️ Step 2: Set Up Database

- [ ] Sign up at https://tidbcloud.com
- [ ] Create a free cluster
- [ ] Get connection details (host, port, username, password)
- [ ] Run your SQL migration files to create tables
- [ ] Test connection locally

**Database Connection Details:**
```
Host: _______________
Port: 4000
Username: _______________
Password: _______________
Database: pawportal
```

---

## ☁️ Step 3: Set Up Cloudinary

- [ ] Sign up at https://cloudinary.com
- [ ] Get credentials from Dashboard → Settings → Security
- [ ] Save Cloud Name, API Key, API Secret

**Cloudinary Details:**
```
Cloud Name: _______________
API Key: _______________
API Secret: _______________
```

---

## 🖥️ Step 4: Deploy Backend (Render)

- [ ] Sign up at https://render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory: `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add all environment variables (see below)
- [ ] Deploy and note the URL

**Backend URL:** `https://_______________.onrender.com`

**Environment Variables for Backend:**
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app (update after frontend deploy)
DATABASE_HOST=your-tidb-host
DATABASE_PORT=4000
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=pawportal
DATABASE_SSL=true
JWT_SECRET=your-generated-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-generated-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🎨 Step 5: Deploy Frontend (Vercel)

- [ ] Sign up at https://vercel.com
- [ ] Import GitHub repository
- [ ] Framework: Create React App
- [ ] Root directory: `./` (root)
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
- [ ] Deploy

**Frontend URL:** `https://_______________.vercel.app`

---

## 🔄 Step 6: Update Backend CORS

- [ ] Go back to Render dashboard
- [ ] Update `FRONTEND_URL` environment variable to your Vercel URL
- [ ] Restart the backend service

---

## ✅ Step 7: Test Everything

- [ ] Visit your frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test file uploads
- [ ] Test all major features
- [ ] Check browser console for errors
- [ ] Check backend logs in Render dashboard

---

## 🎉 Done!

Your app should now be live! Share your frontend URL with others.

---

## 🆘 Common Issues

**Backend not responding?**
- Render free tier spins down after 15 min inactivity
- First request may take 30-60 seconds
- Check Render logs for errors

**CORS errors?**
- Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Restart backend after updating environment variables

**Database connection errors?**
- Verify all database credentials are correct
- Check if database allows external connections
- Ensure `DATABASE_SSL=true` for TiDB Cloud

**Frontend can't reach backend?**
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running (may need to wake it up)
- Look for errors in browser console

