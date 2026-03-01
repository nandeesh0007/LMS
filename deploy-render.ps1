# Render Deployment Script for PowerShell

Write-Host "🚀 Deploying LMS to Render..."

# Deploy Backend
Write-Host "📦 Deploying Backend..."
Set-Location "c:\Users\nande\OneDrive\Desktop\learning management system"
try {
    git add .
    git commit -m "Deploy to Render"
    git push origin main
    Write-Host "✅ Backend deployed successfully!"
    Write-Host "🌐 Backend will be available at: https://lms-backend.onrender.com"
} catch {
    Write-Host "❌ Backend deployment failed: $_"
    Write-Host "Error: $_"
}

# Deploy Frontend
Write-Host "📱 Deploying Frontend..."
Set-Location "c:\Users\nande\OneDrive\Desktop\learning management system\client"
try {
    git add .
    git commit -m "Deploy to Render"
    git push origin main
    Write-Host "✅ Frontend deployed successfully!"
    Write-Host "🌐 Frontend will be available at: https://lms-frontend.onrender.com"
} catch {
    Write-Host "❌ Frontend deployment failed: $_"
    Write-Host "Error: $_"
}

Write-Host ""
Write-Host "🎉 Both deployments completed!"
Write-Host "📋 Check Render Dashboard for deployment status"
Write-Host "🔗 Backend API: https://lms-backend.onrender.com/api"
Write-Host "📱 Frontend App: https://lms-frontend.onrender.com"
Write-Host ""
Write-Host "Press any key to exit..."

try {
    $null = $Host.UI.RawUI.ReadKey("NoKeyPressed")
} catch {
    Write-Host "Error reading keypress: $_"
}
Write-Host "Deployment completed. Press any key to exit..."
