# Inventory Management — Frontend

This is a Vite + React frontend scaffold for the Inventory Management System.

Quick start:

1. cd frontend
2. npm install
3. npm run dev

Notes:
- Uses Tailwind CSS for styling
- API calls are expected at `/api/*` — Vite dev server proxies `/api` to `http://localhost:5000` (see `vite.config.js`)
- Auth uses JWT stored in localStorage
- Admin seed user: `admin@example.com` / `password` (run backend seeder)

Dev/demo notes:
- The frontend includes a local demo data seeder (stores demo objects in `localStorage` under key `demoData`).
- Use the "Seed Demo" / "Clear Demo" buttons in the navbar or the demo login buttons on `/login` to populate local demo data when the backend is not available.

Hero video generation (optional):
- To create a project-branded hero video for the login page, install `ffmpeg` and run the script from the `frontend` folder:

  1. Install ffmpeg: https://ffmpeg.org/download.html
  2. cd frontend
  3. powershell -ExecutionPolicy Bypass -File .\scripts\generate-hero-video.ps1

- This will download 3 sample images and create `public/assets/hero.mp4` and `public/assets/hero-poster.jpg` which the login page automatically uses.
- Replace the images in `public/assets/hero-src/` with your own photos and re-run the script to regenerate the video.

To run backend locally:

1. cd backend
2. npm install
3. copy `.env.example` to `.env` and edit (or use MongoDB at default `mongodb://localhost:27017/inventory`)
4. npm run seed   # seeds demo data
5. npm run dev    # starts backend on port 5000

Docker:
- `docker-compose up` will start `mongo` and build the backend service (if Docker is available)
