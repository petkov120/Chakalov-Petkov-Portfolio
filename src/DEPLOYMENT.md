# Deployment Guide

Guide for deploying your portfolio to various hosting platforms.

## Table of Contents
- [Vercel](#vercel-recommended)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Custom Server](#custom-server)

---

## Vercel (Recommended)

Vercel offers the best DX for React applications with automatic deployments.

### Setup

1. **Install Vercel CLI** (optional)
```bash
npm i -g vercel
```

2. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Vite settings

3. **Environment Variables**
   - Add your environment variables in Vercel dashboard
   - Settings → Environment Variables
   - Add variables from your `.env` file

4. **Deploy**
```bash
# Using CLI
vercel

# Or push to main branch for automatic deployment
git push origin main
```

### Configuration

Create `vercel.json` in your root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatic

---

## Netlify

Great alternative with similar features to Vercel.

### Setup

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

3. **Environment Variables**
   - Site settings → Environment variables
   - Add your variables

4. **Deploy**
```bash
# Using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Configuration

Create `netlify.toml` in your root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Custom Domain

1. Domain settings → Add custom domain
2. Update DNS to Netlify nameservers
3. SSL is automatic

---

## GitHub Pages

Free hosting for static sites.

### Setup

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/repository-name/', // Your repo name
  // ... rest of config
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Configure GitHub**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)

### Custom Domain

1. Add `CNAME` file in `/public` folder:
```
yourdomain.com
```

2. Update DNS:
```
Type: A
Host: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Host: www
Value: yourusername.github.io
```

---

## Custom Server

Deploy to your own server or VPS.

### Using Nginx

1. **Build Project**
```bash
npm run build
```

2. **Transfer Files**
```bash
# Upload dist folder to server
scp -r dist/* user@server:/var/www/portfolio
```

3. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/portfolio;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **Enable HTTPS** (using Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Using Apache

**Apache Configuration** (`.htaccess` in dist folder):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Content-Type-Options "nosniff"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/woff2 "access plus 1 year"
</IfModule>
```

---

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf for Docker

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -d -p 80:80 portfolio
```

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All images load correctly
- [ ] Resume download link works
- [ ] Contact email is correct
- [ ] Meta tags are updated
- [ ] Environment variables are set
- [ ] Build completes without errors
- [ ] No console errors in production build
- [ ] Test on multiple devices
- [ ] Lighthouse score is good (90+)
- [ ] Accessibility tested
- [ ] SEO tags optimized

## Post-Deployment

### 1. Test Production Site

- [ ] All pages load
- [ ] Images display correctly
- [ ] Animations work
- [ ] Forms function (if any)
- [ ] Links work
- [ ] Mobile responsive
- [ ] Fast load times

### 2. Submit to Search Engines

**Google Search Console**
```
https://search.google.com/search-console
```

**Bing Webmaster Tools**
```
https://www.bing.com/webmasters
```

### 3. Create sitemap.xml

Place in `/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 4. Create robots.txt

Place in `/public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### 5. Analytics

Add Google Analytics or similar in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Optimization

### Image Optimization

```bash
# Install imagemin
npm install --save-dev imagemin imagemin-webp

# Convert images to WebP
# Add to build script
```

### Code Splitting

Already implemented via dynamic imports.

### CDN

Consider using a CDN for:
- Fonts (Google Fonts)
- Static assets
- Images

## Monitoring

### Recommended Tools

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance**: Lighthouse CI, WebPageTest
- **Error Tracking**: Sentry, LogRocket
- **Analytics**: Google Analytics, Plausible

## Troubleshooting

### Build Fails

1. Check Node version (18+)
2. Clear cache: `rm -rf node_modules && npm install`
3. Check for missing dependencies
4. Review build logs

### Site Not Loading

1. Check DNS settings
2. Verify build output directory
3. Check server configuration
4. Review browser console for errors

### Images Not Showing

1. Verify image paths
2. Check CORS settings
3. Ensure images are in dist folder
4. Check CDN configuration

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Contact platform support
- Email: petkovrichard8@gmail.com

---

**Good luck with your deployment! 🚀**
