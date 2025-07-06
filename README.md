---

### ✅ Here's your `frontend/README.md`:

```markdown
# 🎰 Casino Slot Game – Frontend (React + Vite)

This is the frontend for the Casino Slot Game built with React, Tailwind, ShadCN UI, and TanStack Query.

---

## ✅ Features

- 🔐 Login & Register with JWT
- 🎮 Interactive Slot Machine UI
- 💰 Real-time balance display
- 🧾 Transaction table with pagination
- 🏆 Leaderboard with real and fake users mixed (Redis cached)
- 🎨 Responsive layout with custom theme

---

## 🛠 Tech Stack

- React + Vite + TypeScript
- TailwindCSS + ShadCN UI
- React Router v6
- TanStack Query (React Query)
- Context API for global state

---

## 🔧 Setup Instructions

1. Navigate to frontend and install dependencies:

```bash
cd frontend
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the development server:

```bash
npm run dev
```

4. Folder structure:

```plaintext
src/
├── assets/          → Images, Fonts, Icons
├── features/         → Auth, Game, Transactions
├── components/       → Shared components (SlotReel, Leaderboard)
├── context/          → App-wide state
├── lib/              → API clients, utils
├── routes/          → Route definitions
├── hooks/            → Custom hooks (useAuth, useGame)
├── App.tsx
└── main.tsx


5. Test the application:

Register a new account → you get ₹500 balance

Try different bids (₹10/30/50)

Spin → see result → balance updates → transaction saved


6. Features in progress:
- 🏆 Leaderboard with real users + fake filler names
- 🔄 Spin animation based on index returned by backend
- 🔒 Protected routes using custom `ProtectedRoute` wrapper
```
