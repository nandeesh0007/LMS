@echo off
echo 🚀 Deploying LMS to Render...

echo 📦 Deploying Backend...
cd /d "c:\Users\nande\OneDrive\Desktop\learning management system"
git add .
git commit -m "Deploy to Render"
git push origin main

echo ✅ Backend deployed!
echo 🌐 Backend will be available at: https://lms-backend.onrender.com

echo 📱 Deploying Frontend...
cd /d "c:\Users\nande\OneDrive\Desktop\learning management system\client"
git add .
git commit -m "Deploy to Render"
git push origin main

echo ✅ Frontend deployed!
echo 🌐 Frontend will be available at: https://lms-frontend.onrender.com

echo 🎉 Both deployments completed!
echo 📋 Check Render Dashboard for status
echo 🔗 Backend API: https://lms-backend.onrender.com/api
echo 📱 Frontend App: https://lms-frontend.onrender.com

pause
