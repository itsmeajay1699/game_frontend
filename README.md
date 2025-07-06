# 🎰 Casino Slot Game – Frontend (React + Vite)

## This is the frontend for the Casino Slot Game built with React, Tailwind, ShadCN UI, and TanStack Query.

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
      Leaderboard caches for 2 minutes (auto-invalidates) filled with fake data if no real data exists
      Currently, Leaderboard shows the top 10 winners in the last N days (default 7) not the net wins rather than the total amount won because net wins are in negative for the majority of the users...
- 🔄 Spin animation based on index returned by backend
- 🔒 Protected routes using custom `ProtectedRoute` wrapper
```

## 💸 Payout Logic

This slot machine uses a **weighted symbol system** to simulate spin outcomes and determine player payouts.

---

### 🧩 Symbol Setup

Each symbol has:

- **`id`** – unique identifier (e.g., `"cherry"`, `"joker"`)
- **`weight`** – probability of appearing (higher weight ⇒ more common)
- **`payout`** – multiplier applied to the wager on a 3-symbol match
- **`index`** – position used by the frontend animation

```typescript
export const ReelOne: Symbol[] = [
  { id: "cherry",     weight:  8, payout:  8, index: 0 },
  { id: "orange",     weight: 40, payout:  2, index: 4 },
  { id: "watermelon", weight: 30, payout:  4, index: 5 },
  { id: "ring",       weight: 15, payout:  6, index: 1 },
  { id: "seven",      weight:  5, payout: 10, index: 3 },
  { id: "joker",      weight:  2, payout: 20, index: 2 },
];

🎯 Weighted Random Symbol Selection
Symbols are chosen with a weighted-random algorithm:

export function getWeightedSymbol(symbols: Symbol[]): Symbol {
  const totalWeight = symbols.reduce((sum, sym) => sum + sym.weight, 0);
  const rand = Math.random() * totalWeight;

  let cumulative = 0;
  for (const symbol of symbols) {
    cumulative += symbol.weight;
    if (rand < cumulative) return symbol;
  }

  throw new Error("No symbol selected – check weights");
}


Higher weight ⇒ more likely to appear.

Lower weight ⇒ rarer but offers higher payouts.

💰 Payout Rules
Three matching symbols → player wins.

Payout formula


payout = wagerAmount * symbol.payout;


🧮 Partial Win Payout Logic
In case of a partial win (i.e., when 2 out of 3 symbols match), the user receives a reduced payout.

The logic is as follows:

Base Formula:
partialWinAmount = wagerAmount × (payout / 2)

Payout Cap:
The partial win amount is capped at ₹(wagerAmount + 10) to avoid disproportionately high rewards for partial matches.

Example:
If a user wagers ₹100 and the symbol's full payout is 10×:

Full Win: ₹100 × 10 = ₹1000

Partial Win (before cap): ₹100 × (10 / 2) = ₹500

Final Partial Win: min(500, 100 + 10) → ₹110

So the user receives ₹110 as a partial win.

This keeps the experience rewarding without overpaying for near-misses.

No match → player loses wager.

Example
Wager	Matching Symbol	Multiplier	Total Win For 3 Matches
₹30	ring	6×	₹180
₹10	joker	20×	₹200

Wager	Partial Match	Partial Win
₹30	ring	6×	₹40
₹10	joker	20×	₹20


```
