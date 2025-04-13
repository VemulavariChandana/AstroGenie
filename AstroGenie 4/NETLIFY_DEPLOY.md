# Deploying AstroGenie to Netlify

## Option 1: Replit Deployment (Recommended)

For the simplest deployment that maintains both frontend and backend together:

1. Click the "Deploy" button at the top of your Replit workspace
2. Follow the prompts to deploy your application
3. Your app will be live at `[your-repl-name].replit.app`

## Option 2: Separate Frontend & Backend Deployment

If you specifically want to use Netlify for the frontend:

### Step 1: Deploy the Backend on Replit

1. Keep your Replit project as is
2. Click "Deploy" to get your backend URL (e.g., `your-backend.replit.app`)
3. Note this URL for the next step

### Step 2: Prepare Your Frontend for Netlify

1. Update the `netlify.toml` file in your project
2. Replace `https://your-backend-url.replit.app` with your actual Replit backend URL

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.replit.app/api/:splat"
  status = 200
  force = true
```

### Step 3: Deploy to Netlify

1. Create a Netlify account at netlify.com
2. Push your Replit code to a GitHub repository
3. In Netlify:
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Step 4: Configure Environment Variables in Netlify

1. Go to your site settings in Netlify
2. Navigate to "Environment" → "Environment variables"
3. Add the following variables:
   - `VITE_API_URL` = your Replit backend URL

### Step 5: Test Your Deployment

1. Once deployed, your site will be available at a Netlify domain
2. Test all features including authentication and database operations
3. Consider setting up a custom domain in Netlify settings

## Important Notes

- Remember that session cookies might need additional configuration for cross-domain usage
- CORS has been configured to allow your Netlify domain
- For production, consider using a more secure SESSION_SECRET environment variable