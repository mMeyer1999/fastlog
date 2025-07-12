# 🕒 fastlog (WIP)

**Work in progress – a minimalist fasting & weight tracking journal**  
📈 Goal: Simple logging of eating windows and weight entries.  
🔧 Tech stack: TypeScript · tRPC · Astro · Svelte · Bun

---

## 🧭 Project Goal

**fastlog** is a lightweight web app designed to help me:
- track daily intermittent fasting windows
- record weight over time
- identify patterns and trends
- potentially integrate into a future coaching/tracking tool

Future roadmap may include:
- Persistent storage (e.g. SQLite, Supabase, PostgreSQL)
- Authentication (local or Clerk/Auth.js)
- Visualizations with charts
- Mobile-first optimizations

---

## 🏗️ Current Status

> **Status:** Project setup phase  
Initial structure is in place. tRPC API and basic frontend components are in progress.

- [x] Repository initialized
- [x] TypeScript + Bun setup
- [ ] Basic tRPC API (`addEntry`, `getEntries`)
- [ ] Astro frontend structure
- [ ] Entry form (Svelte)
- [ ] Table/list for displaying entries
- [ ] In-memory data handling (file or DB later)

---

## 🛠 Planned Tech Stack

| Area         | Technology             |
|--------------|------------------------|
| Language     | TypeScript             |
| Build Tool   | Bun                    |
| API Backend  | tRPC + Zod             |
| UI Framework | Astro + Svelte         |
| Styling      | (optional) TailwindCSS |
| Data Storage | In-memory → SQLite     |
| Hosting      | Local → Vercel later   |

---

## 📦 Planned Project Structure

```bash
.
├── src/
│   ├── pages/              # Astro routing
│   ├── components/         # UI components (Svelte)
│   ├── server/
│   │   ├── trpc/           # API routes and handlers
│   │   └── data/           # Temporary or persistent storage
├── public/
├── tsconfig.json
├── astro.config.mjs
├── bun.lockb
└── README.md
