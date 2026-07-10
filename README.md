# Sinom — Workspace Designer

Interactive **Workspace Designer** for [monis.rent](https://www.monis.rent) — design a Bali office setup in 3D, see a live quote, then request a rental.

> **Sinom** is *monis* spelled backwards. This is a concept tool for the Desent coding challenge, not the production monis storefront.

## Approach

- **IKEA-style Front / Top / Side** camera presets over a small room corner (React Three Fiber)
- **Fixed slots** (desk, chair, up to 3 monitors, lamp, plant) — swap items instead of free-drag furniture physics
- **Catalog** mirrors monis names, weekly prices, and product photos; **3D meshes are representative stand-ins** (monis ships 2D images only — no public GLTFs)
- **Zustand** owns the Workspace; the Canvas only renders it
- Checkout is **intent confirmation** (demo success) plus deep links to monis.rent

## Tech

- Next.js 16 · Tailwind CSS · shadcn/ui
- React Three Fiber · Drei · light N8AO postprocessing
- Zustand · Vercel (deploy target)

## Run locally

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## What I'd improve with more time

- Curated GLTF furniture packs matched to each monis SKU
- Bundle detection (“Looks like The Essentials”) with discount messaging
- Persist Workspace to URL / share link
- Stronger Bali atmosphere (window view texture, time-of-day lighting)
- Mobile-first catalog drawer polish

## Submission notes

- Add **desent-bot** as a GitHub collaborator (Read)
- Deploy on **Vercel** and submit the live URL
