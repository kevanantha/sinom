# Workspace Designer

Interactive tool for digital nomads and startups in Bali to compose a rentable office setup visually, then rent it via monis.rent-style weekly pricing.

## Language

**Workspace**:
The user's composed office setup — the set of selected items shown in the live preview and summarized at checkout.
_Avoid_: Room, cart, bundle (bundle is a pre-made monis product; Workspace is user-built)

**Catalog Item**:
A rentable product the user can add to a Workspace (desk, chair, monitor, lamp, plant, etc.), with a weekly rental price. Catalog copy, pricing shape, and card photos follow monis.rent; 3D meshes in the Preview are representative stand-ins, not official monis GLTFs (monis ships 2D images only).
_Avoid_: Claiming Preview meshes are exact monis SKUs; Product SKU as everyday language

**Preview**:
A React Three Fiber 3D scene of the current Workspace inside a small room corner (floor, walls, window/light). Items sit in fixed slots; the scene updates when the Workspace changes.
_Avoid_: Empty marketing stage/platform, full-villa walkthrough, 2.5D collage, floor-plan editor

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
Workspace starts guided (default desk + chair) so the Room is never barren. Desk and chair are always filled (swap only). Monitors: 0–3 with “+ Add” hotspots. Lamp and plant: 0–1 each.
_Avoid_: Fully empty Workspace as the default; unlimited monitors; removing desk/chair without a replacement

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
Bali sense of place in the Room (window light, materials) and via rentable accessories like plant and lamp — not a separate lifestyle-zone UI.
_Avoid_: Surfboard/motorcycle/garage zones; non-rentable props that confuse the Quote

**Sinom**:
The product name for this Workspace Designer concept (monis spelled backwards). Monis-flavored — catalog, pricing shape, and photos follow monis.rent; UI is a concept tool *for* that client, not a clone of the production storefront.
_Avoid_: Pretending to be the live monis.rent app; a totally unrelated brand; generic unbranded “Workspace Designer” chrome

**Catalog scope (Solid)**:
Enough variety for a rich Preview without aisle fatigue — typically 2–3 desks, 2–3 chairs, ~3 monitors, plus lamp/plant and a small set of desk accessories. Quality of stand-in GLTFs beats raw count.
_Avoid_: Mirroring the entire monis catalog; Lean minimum-only if aiming for high result

## Rendering (product decisions, not implementation)

**Product R3F**:
In-scope Preview capabilities: Canvas, GLTF Catalog Items, Camera View presets (Front default), mesh hotspots, soft shadows + environment lighting, constrained orbit, swap animations, light postprocessing.
_Out of scope_: Physics, XR/AR, path tracing, free floor-drag placement
