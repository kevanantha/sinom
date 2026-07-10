# Sinom — Workspace Designer

**Live demo:** [https://sinom-eight.vercel.app](https://sinom-eight.vercel.app)  
**Repo:** [github.com/kevanantha/sinom](https://github.com/kevanantha/sinom)

Interactive **Workspace Designer** for [monis.rent](https://www.monis.rent) — design a Bali office setup in 3D, see a live quote, then request a rental.

> **Sinom** is *monis* spelled backwards. This is a concept tool for the Desent coding challenge, not the production monis storefront.

## Approach

- **IKEA-style Front / Top / Side** camera presets over a small room corner (React Three Fiber)
- **Fixed slots** (desk, chair, 0–1 monitor, lamp, plant) — swap items instead of free-drag furniture physics
- **Selection Bar** on the monitor (Rotate 90° / Replace cycles monitors / Remove) plus a quiet selection accent ring
- **Catalog** mirrors monis names, weekly prices, and product photos; **3D meshes are illustrative lookalikes** (procedural + CC0 packs — monis ships 2D only)
- **Zustand** owns the Workspace; the Canvas only renders it
- Checkout is **intent confirmation** (demo success) plus deep links to monis.rent

## Tech

- Next.js 16 · Tailwind CSS · shadcn/ui
- React Three Fiber · Drei (`useGLTF`, `Environment`, `ContactShadows`, `Html`) · `@react-spring/three` selection scale · light N8AO
- Zustand · Vercel

## 3D credits

Preview GLTFs are illustrative lookalikes (procedural Codex meshes for desk/chair/monitors + Poly Pizza CC0 for lamp/plant/light chair). See [`public/models/CREDITS.md`](./public/models/CREDITS.md). They are **not** official monis product models.

## Run locally

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Submission

| Item | Status |
|------|--------|
| Live URL | [sinom-eight.vercel.app](https://sinom-eight.vercel.app) |
| GitHub | [kevanantha/sinom](https://github.com/kevanantha/sinom) |
| `desent-bot` collaborator | Invited (Read) |
| Stack | Next.js · Tailwind · Vercel |
