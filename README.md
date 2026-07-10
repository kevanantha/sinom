# Sinom — Workspace Designer

Interactive **Workspace Designer** for [monis.rent](https://www.monis.rent) — design a Bali office setup in 3D, see a live quote, then request a rental.

> **Sinom** is *monis* spelled backwards. This is a concept tool for the Desent coding challenge, not the production monis storefront.

## Approach

- **IKEA-style Front / Top / Side** camera presets over a small room corner (React Three Fiber)
- **Fixed slots** (desk, chair, 0–1 monitor, lamp, plant) — swap items instead of free-drag furniture physics
- **Selection Bar** on the monitor (Rotate 90° / Replace / Remove) plus a quiet selection outline
- **Catalog** mirrors monis names, weekly prices, and product photos; **3D meshes are illustrative lookalikes** (procedural + CC0 packs — monis ships 2D only)
- **Zustand** owns the Workspace; the Canvas only renders it
- Checkout is **intent confirmation** (demo success) plus deep links to monis.rent

## Tech

- Next.js 16 · Tailwind CSS · shadcn/ui
- React Three Fiber · Drei (`useGLTF`, `Environment`, `ContactShadows`, `Html`) · `@react-spring/three` swaps · light N8AO
- Zustand · Vercel (deploy target)

## 3D credits

Preview GLTFs are illustrative lookalikes (procedural Codex meshes for desk/chair/monitors + Poly Pizza CC0 for lamp/plant/light chair). See [`public/models/CREDITS.md`](./public/models/CREDITS.md). They are **not** official monis product models.

## Run locally

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## What I'd improve with more time

- Tighter silhouette matching per monis SKU (second mesh only where Front camera notices)
- Bundle detection (“Looks like The Essentials”) with discount messaging
- Persist Workspace to URL / share link
- Stronger Bali atmosphere (window view texture, time-of-day lighting)
- Mobile-first catalog drawer polish

## Submission notes

- Add **desent-bot** as a GitHub collaborator (Read)
- Deploy on **Vercel** and submit the live URL
