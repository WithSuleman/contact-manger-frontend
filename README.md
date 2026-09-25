# Contact Manager - Frontend (React + Vite) 💻

A modern, responsive, and beginner-friendly single-page Contact Manager built with **React**, **Vite**, **Tailwind CSS**, **Axios**, **React Icons**, **React Toastify**, and **Framer Motion**.

---

## 📁 Folder Structure

```
contact-manager-frontend/
├── public/                # Static public assets
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Header with branding & subtle gradient
│   │   ├── Stats.jsx          # Total contacts and active metrics
│   │   ├── SearchBar.jsx      # Instant search input
│   │   ├── ContactCard.jsx    # Contact item with actions & avatar
│   │   ├── ContactModal.jsx   # Add/Edit modal dialog with validation
│   │   └── EmptyState.jsx     # Visual state when list is empty
│   ├── services/
│   │   └── contactService.js  # Axios API methods using VITE_API_URL
│   ├── App.jsx                # Main single-page application orchestrator
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & Tailwind directives
├── .env.example               # Example frontend environment variables
├── .env                       # Local environment variables
├── .gitignore                 # Files excluded from git
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # Documentation
```

---

## ⚙️ Environment Variables

Create `.env` in `contact-manager-frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

In production (Vercel), change this to your deployed backend URL:
```env
VITE_API_URL=https://your-backend-service.onrender.com/api
```

---

## 🚀 How to Run Locally

1. **Navigate into the frontend directory:**
   ```bash
   cd contact-manager-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Go to [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Build for Production

To test the production build locally:

```bash
npm run build
npm run preview
```

The compiled output will be generated inside the `dist/` directory.

---

## 🌐 Deploying to Vercel (Free)

1. Push this frontend folder (or repository) to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. If frontend is in a subfolder, select `contact-manager-frontend` as the **Root Directory**.
5. Framework Preset: **Vite**.
6. Build Command: `npm run build`.
7. Output Directory: `dist`.
8. In **Environment Variables**, add:
   - `VITE_API_URL`: Your deployed backend URL + `/api` (e.g., `https://contact-manager-api.onrender.com/api`).
9. Click **Deploy**.
