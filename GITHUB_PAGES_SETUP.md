# GitHub Pages Deployment Setup

## What I've Configured

1. ✅ Updated `vite.config.ts` with correct base path: `/Chakalov-Petkov-Portfolio/`
2. ✅ Created GitHub Actions workflow (`.github/workflows/deploy.yml`)
3. ✅ Changed build output directory to `dist`
4. ✅ Added `.nojekyll` file to prevent Jekyll processing

## Next Steps - Update GitHub Pages Settings

You need to change your GitHub Pages deployment method from "Deploy from a branch" to "GitHub Actions":

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment** → **Source**, change from:
   - ❌ "Deploy from a branch" 
   - ✅ **"GitHub Actions"**

4. Save the changes

## After Changing Settings

1. Push these changes to your `main` branch:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. The GitHub Actions workflow will automatically:
   - Build your Vite app
   - Deploy it to GitHub Pages
   - Your site will be live at: `https://petkov120.github.io/Chakalov-Petkov-Portfolio/`

## Verify Deployment

1. Go to **Actions** tab in your GitHub repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Once it completes (green checkmark), your site should be live
4. It may take 1-2 minutes for the site to be accessible after deployment

## Troubleshooting

If the site still doesn't show:
- Check the Actions tab for any errors
- Make sure the workflow completed successfully
- Wait a few minutes and refresh the page
- Clear your browser cache

## Local Testing

To test the build locally before pushing:
```bash
npm run build
npm run preview
```

This will build and preview your site with the correct base path.

