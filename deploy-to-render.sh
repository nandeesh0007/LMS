#!/bin/bash

echo "🚀 Deploying LMS to Render..."

# Deploy Backend
echo "📦 Deploying Backend..."
cd "c:/Users/nande/OneDrive/Desktop/learning management system"
render login
git add .
git commit -m "Deploy to Render"
git push origin main

echo "✅ Backend deployment initiated!"
echo "🌐 Backend will be available at: https://lms-backend.onrender.com"

# Deploy Frontend
echo "📱 Deploying Frontend..."
cd "c:/Users/nande/OneDrive/Desktop/learning management system/client"
render login
git add .
git commit -m "Deploy to Render"
git push origin main

echo "✅ Frontend deployment initiated!"
echo "🌐 Frontend will be available at: https://lms-frontend.onrender.com"

echo ""
echo "🎉 Both deployments started!"
echo "📋 Check Render Dashboard for deployment status"
echo "🔗 Backend API: https://lms-backend.onrender.com/api"
echo "🔗 Frontend App: https://lms-frontend.onrender.com"
