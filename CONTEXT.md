# Workspace Designer

Interactive tool for digital nomads and startups in Bali to compose a rentable office setup visually, then rent it via monis.rent-style weekly pricing.

## Language

**Workspace**:
The user's composed office setup — the set of selected items shown in the live preview and summarized at checkout.
_Avoid_: Room, cart, bundle (bundle is a pre-made monis product; Workspace is user-built)

**Catalog Item**:
A rentable product the user can add to a Workspace (desk, chair, monitor, lamp, plant, etc.), with a weekly rental price. Catalog copy, pricing shape, and card photos follow monis.rent; Preview meshes are curated stock GLTF lookalikes matched by kind/silhouette — not official monis or manufacturer SKU models (monis ships 2D only; product names identify the Catalog Item, they do not source the mesh). Catalog photos are the rentable truth; Preview meshes are spatial stand-ins — silhouette-matched on purpose, with room for a short “illustrative preview” cue in the UI. Mesh assets are permissively licensed curated packs (credited), not paid exclusives or monis-derived 3D.
_Avoid_: Claiming Preview meshes are exact monis SKUs; photo→3D or SKU-name generation as the mesh source; Product SKU as everyday language; ignoring the photo↔mesh gap; unlicensed or “sort license later” mesh grabs

**Preview**:
A React Three Fiber 3D scene of the current Workspace inside a small room corner (floor, walls, window/light). Items sit in fixed slots; the scene updates when the Workspace changes. Meshes are illustrative stand-ins silhouette-matched to Catalog Items; catalog card photos remain the product truth.
_Avoid_: Empty marketing stage/platform, full-villa walkthrough, 2.5D collage, floor-plan editor; presenting Preview as photoreal product photography

**Room**:
The architectural container for the Preview — a focused Bali office corner (floor, two walls, ceiling light), not an entire apartment.
_Avoid_: Stage, platform, open void, multi-room home

**Camera View**:
A named camera preset for the Preview. Presets: Front (default, eye-level facing the desk wall), Top, and Side — IKEA-style thumbnail switches. Constrained orbit is allowed as a secondary control on Front; free-fly is not the primary UX.
_Avoid_: Dollhouse/walk-through as MVP; unbounded free-fly camera; Top/Side if they hurt clarity (prefer fewer presets over bad ones)

**Slot**:
A fixed position in the Preview where a Catalog Item of a given kind can appear. Users swap what fills a Slot; they do not freely place furniture on the floor.
_Avoid_: Free placement, drag-anywhere, physics drop

**Slot rules**:
Workspace starts guided (default desk + chair) so the Room is never barren. Desk and chair are always filled (swap only). Monitors: 0–1 (add or clear a single monitor Slot). Lamp and plant: 0–1 each.
_Avoid_: Fully empty Workspace as the default; multi-monitor strips (2–3) as MVP; unlimited monitors; removing desk/chair without a replacement

**Selection Bar**:
Floating in-Preview action chrome for the selected Slot (IKEA-style), not a DOM tooltip. MVP: on the monitor Slot — Rotate (90° yaw steps), Replace (swap via Catalog), Remove (clear the Slot). Selection chrome uses a quiet accent ring under the selected item (silhouette edge outline is a later polish).
_Avoid_: Autorotate/turntable spin; full IKEA bag/copy/goes-with set; using Tooltip as the primary selection chrome inside the canvas

**Quote**:
The running rental total for Catalog Items in the Workspace. Shown as a weekly rate and as a period total based on the selected Rental Duration.
_Avoid_: Cart total, one-off purchase price, opaque checkout-only pricing

**Rental Duration**:
How long the user intends to rent the Workspace, chosen from presets (1 / 4 / 12 weeks). Default is 4 weeks. Period total = weekly Quote × weeks.
_Avoid_: Open-ended custom date range as MVP; treating price as a one-time purchase

**Checkout**:
The summary view of the selected Workspace (items + Quote) before the user confirms rental intent. Primary CTA confirms intent and shows a success state (no payment/backend). Secondary actions can deep-link individual items to monis.rent for credibility.
_Avoid_: Order, purchase, payment processing, lead-capture form as the primary end state

**Atmosphere**:
Bali sense of place in the Room (window light, materials) and via rentable accessories like plant and lamp — not a separate lifestyle-zone UI. Preview lighting uses a warm indoor drei `Environment` (e.g. apartment) plus the window emissive — not a sterile studio void or a custom Bali HDRI for MVP.
_Avoid_: Surfboard/motorcycle/garage zones; non-rentable props that confuse the Quote; cold studio-only lighting that kills place; blocking ship on a custom HDRI

**Illustrative Preview**:
The honest stance that Preview meshes are spatial stand-ins, not product photography. Surfaced as a tiny persistent caption near the Preview (e.g. “3D preview is illustrative”) — not a dismissible tip or README-only note.
_Avoid_: Hiding the photo↔mesh gap; a modal disclaimer; claiming photoreal SKU fidelity; one-time toast that disappears forever

**Mesh Variant**:
How a Catalog Item’s `variant` maps onto Preview geometry. Prefer one base GLTF per kind with material/color swaps; use a distinct curated/generated GLTF when silhouette or Catalog Item look truly differs at Front camera (e.g. each monitor size, electric vs mechanical desk, primary vs light chair meshes). Generated lookalikes are still illustrative stand-ins — not official monis/manufacturer SKUs.
_Avoid_: Claiming generated meshes are monis product 3D; one packed “office scene” with hide/show nodes as the primary model; duplicate identical GLTFs for tint-only differences when a material swap would do

**Sinom**:
The product name for this Workspace Designer concept (monis spelled backwards). Monis-flavored — catalog, pricing shape, and photos follow monis.rent; UI is a concept tool *for* that client, not a clone of the production storefront.
_Avoid_: Pretending to be the live monis.rent app; a totally unrelated brand; generic unbranded “Workspace Designer” chrome

**Catalog scope (Solid)**:
Enough variety for a rich Preview without aisle fatigue — typically 2–3 desks, 2–3 chairs, ~3 monitor options (one Slot), plus lamp/plant and a small set of desk accessories. Quality of stand-in GLTFs beats raw count. GLTF priority: desk, chair, monitor, lamp, plant; keyboard/mouse may stay simple primitives (they barely read at Front camera distance).
_Avoid_: Mirroring the entire monis catalog; Lean minimum-only if aiming for high result; blocking ship on peripheral GLTFs; multi-monitor strips as MVP

## Rendering (product decisions, not implementation)

**Product R3F**:
In-scope Preview capabilities (capability-driven — steal configurator patterns, not floor-planners): Canvas; `useGLTF` Catalog Items (desk/chair/monitor/lamp/plant priority; keyboard/mouse may stay primitive; Mesh Variant as above); warm indoor `Environment` (e.g. apartment) + `ContactShadows`; Camera View presets (Front default) with constrained orbit; in-scene `Html` mesh hotspots and Selection Bar; selection accent ring; monitor Slot 90° yaw (persisted on the Workspace); `useGLTF.preload` / loader; spring swap animations; light N8AO postprocessing; Illustrative Preview caption.
_Out of scope_: Physics, XR/AR, path tracing, free floor-drag / TransformControls-as-primary, 2D floor-plan dual mode, explode views, autorotate turntables, kitchen-sink “use every drei export”; custom Bali HDRI as MVP blocker; studio-only lighting as the primary look; multi-monitor (2–3) as MVP; IKEA-yellow mesh silhouette outline as MVP (ring chrome first)
