# 🚀 Deployment Guide - Render

This guide will help you deploy your Smart Energy Monitor application to Render, a modern cloud platform for web applications.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ A GitHub account
- ✅ Your code pushed to a GitHub repository
- ✅ A Render account (free tier available at [render.com](https://render.com))

## 🎯 Deployment Steps

### Method 1: Deploy Using Render Blueprint (Recommended)

This method uses the included `render.yaml` file for automatic configuration.

1. **Push Your Code to GitHub**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Create a New Web Service on Render**
   - Log in to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
   - Click **"Apply"** to deploy

3. **Wait for Deployment**
   - Render will automatically:
     - Install dependencies (`npm install`)
     - Start your server (`npm start`)
     - Assign a public URL
   - Deployment typically takes 2-3 minutes

4. **Access Your Application**
   - Once deployed, Render provides a URL like: `https://smart-energy-monitor-xxxx.onrender.com`
   - Click the URL to open your live application

---

### Method 2: Manual Deployment

If you prefer to configure manually:

1. **Create a New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: `smart-energy-monitor`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   - Add environment variable:
     - Key: `NODE_ENV`
     - Value: `production`

4. **Advanced Settings** (Optional)
   - **Health Check Path**: `/health`
   - **Auto-Deploy**: `Yes` (enables automatic deployments on git push)

5. **Create Web Service**
   - Click **"Create Web Service"**
   - Wait for deployment to complete

---

## 🔍 Verifying Your Deployment

### 1. Check Health Endpoint
Once deployed, visit:
```
https://your-app-url.onrender.com/health
```

You should see a JSON response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-13T05:08:10.000Z",
  "uptime": 123.45
}
```

### 2. Test Application Features
- ✅ Dashboard loads correctly
- ✅ Real-time data updates every 5 seconds
- ✅ Device toggle buttons work
- ✅ Chart displays and switches between time ranges
- ✅ All stat cards show current values
- ✅ Mobile responsive design works

---

## ⚙️ Configuration Options

### Environment Variables

You can add these optional environment variables in Render:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node environment |
| `PORT` | `3000` | Server port (auto-set by Render) |

### Custom Domain

To use a custom domain:

1. Go to your service's **Settings** tab
2. Scroll to **Custom Domain** section
3. Click **"Add Custom Domain"**
4. Follow instructions to configure DNS

---

## 📊 Monitoring & Logs

### View Logs
1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. View real-time logs and error messages

### Monitor Performance
- **Metrics**: View CPU, Memory, and Bandwidth in the "Metrics" tab
- **Health Checks**: Automatic health monitoring on `/health` endpoint
- **Alerts**: Set up email alerts for service downtime

---

## 🔄 Auto-Deploy from GitHub

Your application is configured for automatic deployment:

1. **Make Changes Locally**
   ```bash
   # Edit your code
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Automatic Deployment**
   - Render detects the push
   - Automatically rebuilds and deploys
   - Takes ~2-3 minutes

3. **Rollback if Needed**
   - Go to **"Events"** tab in Render
   - Find previous successful deployment
   - Click **"Redeploy"**

---

## 🛠️ Troubleshooting

### Issue: Deployment Failed

**Check Build Logs**
1. Go to service in Render Dashboard
2. Click **"Logs"** tab
3. Look for error messages during build

**Common Solutions:**
- Ensure `package.json` is in the root directory
- Verify Node.js version compatibility (requires Node 18+)
- Check that all dependencies are listed in `package.json`

### Issue: Application Not Loading

**Check Server Logs**
1. View logs in Render Dashboard
2. Look for startup errors

**Common Solutions:**
- Verify `server.js` exists and is correct
- Check that port binding uses `process.env.PORT`
- Ensure `/health` endpoint responds

### Issue: Static Files Not Loading

**Check File Paths**
- All file references should be relative
- CSS: `href="style.css"`
- JS: `src="app.js"`
- No leading slashes needed

### Issue: Performance Issues

**Optimize Your Deployment**
1. **Enable CDN**: Render includes built-in CDN
2. **Check Metrics**: Monitor CPU/Memory usage
3. **Upgrade Plan**: Free tier spins down after 15 minutes of inactivity
   - Consider upgrading to paid plan for always-on service

---

## 💰 Pricing

### Free Tier
- ✅ Perfect for development and testing
- ✅ 750 hours/month free
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ 50-second delay on first request after spin-down

### Paid Plans (Starting at $7/month)
- ✅ Always-on instances
- ✅ No spin-down delays
- ✅ More CPU and memory
- ✅ Faster builds

---

## 🎨 Performance Optimization

Your application includes these optimizations:

✅ **Gzip Compression** - Reduces file sizes by ~70%
✅ **HTTP Caching** - Improves load time for returning users
✅ **Resource Hints** - DNS prefetch and preconnect
✅ **Deferred Scripts** - Non-blocking JavaScript loading
✅ **Memory Management** - Limits data retention to 1000 points
✅ **Security Headers** - CSP, XSS protection, frame options

### Expected Performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+

---

## 📱 Testing on Mobile

1. **Get Your Render URL**
   - Example: `https://smart-energy-monitor-xxxx.onrender.com`

2. **Test on Mobile Device**
   - Open URL in mobile browser
   - Verify responsive design
   - Test device toggles work
   - Check chart interactions

3. **Add to Home Screen** (iOS/Android)
   - Mobile browsers can add as PWA-like experience
   - Uses theme color and app icons

---

## 🔐 Security Best Practices

Your deployment includes:

✅ **Content Security Policy (CSP)**
✅ **XSS Protection**
✅ **Frame Options** (prevents clickjacking)
✅ **HTTPS** (automatic with Render)
✅ **No exposed credentials**

### Additional Recommendations:
- 🔒 Keep dependencies updated
- 🔒 Monitor security advisories
- 🔒 Use environment variables for sensitive data

---

## 📞 Support & Resources

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Render Community**: [community.render.com](https://community.render.com)
- **Status Page**: [status.render.com](https://status.render.com)
- **GitHub Repository**: Check your repo's Issues tab

---

## 🎉 Next Steps

After successful deployment:

1. ✅ Share your live URL
2. ✅ Set up a custom domain
3. ✅ Monitor application metrics
4. ✅ Consider adding:
   - Backend API for data persistence
   - User authentication
   - Database integration
   - Analytics tracking

---

<div align="center">
  <strong>🚀 Your application is now live on Render! 🚀</strong>
  <br>
  <sub>Remember to star ⭐ the repository!</sub>
</div>
