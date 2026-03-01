# 🚀 Render Deployment Guide

## 📋 Prerequisites

1. **Install Render CLI**
```bash
npm install -g @render/cli
```

2. **Login to Render**
```bash
render login
```

## 🔧 Backend Deployment

### Option 1: Automatic Deployment Script

```bash
cd "c:/Users/nande/OneDrive/Desktop/learning management system"
chmod +x deploy-to-render.sh
./deploy-to-render.sh
```

### Option 2: Manual Deployment

#### Step 1: Initialize Git Repository
```bash
cd "c:/Users/nande/OneDrive/Desktop/learning management system"
git init
git add .
git commit -m "Initial commit for Render"
git branch -M main
git remote add origin https://git.render.com/nandeesh0007/lms-backend.git
```

#### Step 2: Deploy Backend
```bash
git push origin main
```

#### Step 3: Configure Render Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect to your GitHub repository
4. Use the `render.yaml` configuration
5. Set service name: `lms-backend`
6. Build command: `node freshServer.js`
7. Start command: `node freshServer.js`
8. Environment: `Production`

## 📱 Frontend Deployment

### Option 1: Automatic Deployment Script

```bash
cd "c:/Users/nande/OneDrive/Desktop/learning management system/client"
chmod +x deploy-to-render.sh
./deploy-to-render.sh
```

### Option 2: Manual Deployment

#### Step 1: Initialize Git Repository
```bash
cd "c:/Users/nande/OneDrive/Desktop/learning management system/client"
git init
git add .
git commit -m "Initial commit for Render"
git branch -M main
git remote add origin https://git.render.com/nandeesh0007/lms-frontend.git
```

#### Step 2: Deploy Frontend
```bash
git push origin main
```

#### Step 3: Configure Render Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect to your GitHub repository
4. Use the `render.yaml` configuration
5. Set service name: `lms-frontend`
6. Build command: `npm run build`
7. Publish directory: `build`
8. Environment: `Production`

## 🌐 Expected URLs After Deployment

- **Backend**: https://lms-backend.onrender.com
- **Frontend**: https://lms-frontend.onrender.com
- **Backend API**: https://lms-backend.onrender.com/api
- **Frontend API**: https://lms-frontend.onrender.com/api (via proxy)

## 🔧 Configuration Files Created

### Backend: `render.yaml`
- Node.js service configuration
- Production environment variables
- Health check endpoint

### Frontend: `render.yaml`
- React static site configuration
- Production environment variables
- Auto-deployment enabled

## 📊 Deployment Status

After deployment, you can check:
- Render Dashboard for deployment logs
- Service health at `/health` endpoint
- API functionality at `/api/public-courses`

## 🎯 Benefits of Render

- ✅ **Free tier** available
- ✅ **Custom domains** supported
- ✅ **SSL certificates** included
- ✅ **Auto-deployment** from GitHub
- ✅ **Environment variables** for configuration
- ✅ **Health checks** and monitoring

## 🚀 Quick Start Commands

```bash
# Install Render CLI and deploy both services
npm install -g @render/cli && \
cd "c:/Users/nande/OneDrive/Desktop/learning management system" && \
chmod +x deploy-to-render.sh && \
./deploy-to-render.sh
```

This will deploy both your LMS backend and frontend to Render with proper configuration!
