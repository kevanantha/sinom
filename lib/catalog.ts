export type CatalogCategory = "desks" | "chairs" | "accessories"

export type CatalogKind =
  | "desk"
  | "chair"
  | "monitor"
  | "lamp"
  | "plant"
  | "keyboard"
  | "mouse"

export type CatalogItem = {
  id: string
  name: string
  description: string
  category: CatalogCategory
  kind: CatalogKind
  weeklyPriceUsd: number
  imageUrl: string
  monisUrl: string
  /** Visual variant key for the Preview mesh */
  variant: string
}

/**
 * Solid catalog mirrored from monis.rent (names, weekly prices, photos).
 * Preview meshes are representative stand-ins — monis ships 2D images only.
 */
export const CATALOG: CatalogItem[] = [
  {
    id: "desk-electric",
    name: "Electrical Adjustable Desk",
    description: "Electric height adjustment (70–118cm), quiet motor, sit-stand.",
    category: "desks",
    kind: "desk",
    weeklyPriceUsd: 5,
    imageUrl:
      "https://strapi.monis.rent/uploads/desk_titel_new_3db151d44c.jpg",
    monisUrl: "https://www.monis.rent/products/electrical-adjustable-desk",
    variant: "electric",
  },
  {
    id: "desk-mechanical",
    name: "Mechanical Adjustable Desk",
    description: "Manual height 70–120cm, no electricity needed.",
    category: "desks",
    kind: "desk",
    weeklyPriceUsd: 7,
    imageUrl:
      "https://strapi.monis.rent/uploads/Mechanical_Adjustable_Desk_front_new_a83b8077b0.jpg",
    monisUrl: "https://www.monis.rent/products/adjustable-wooden-desk",
    variant: "mechanical",
  },
  {
    id: "chair-ergo",
    name: "Ergonomic Office Chair",
    description: "Mesh back, 4D arms, lumbar support, recline + leg rest.",
    category: "chairs",
    kind: "chair",
    weeklyPriceUsd: 4,
    imageUrl:
      "https://strapi.monis.rent/uploads/fantech_oca259s_chair_6_b632a0c529.jpg",
    monisUrl: "https://www.monis.rent/products/ergonomic-office-chair",
    variant: "mesh-black",
  },
  {
    id: "chair-ergo-light",
    name: "Ergonomic Office Chair (Light)",
    description: "Same ergo comfort in a lighter frame finish.",
    category: "chairs",
    kind: "chair",
    weeklyPriceUsd: 4,
    imageUrl:
      "https://strapi.monis.rent/uploads/fantech_oca259s_chair_6_b632a0c529.jpg",
    monisUrl: "https://www.monis.rent/products/ergonomic-office-chair",
    variant: "mesh-grey",
  },
  {
    id: "monitor-24-fhd",
    name: '24" Full HD Office Monitor A24i 2026',
    description: "23.8″ IPS, 144 Hz, ideal everyday work display.",
    category: "accessories",
    kind: "monitor",
    weeklyPriceUsd: 7,
    imageUrl:
      "https://strapi.monis.rent/uploads/24_full_HD_office_monitor_a24i_2026_be9e6bf958.jpg",
    monisUrl:
      "https://www.monis.rent/products/24-full-hd-office-monitor-a24i-2026",
    variant: "fhd-24",
  },
  {
    id: "monitor-27-4k",
    name: '27" 4K Multimedia Monitor',
    description: "4K IPS, USB-C, HDR — sharp multitasking screen.",
    category: "accessories",
    kind: "monitor",
    weeklyPriceUsd: 12,
    imageUrl:
      "https://strapi.monis.rent/uploads/27_4_K_A27_U_Multitasking_Monitor_1_ce29d15357.jpg",
    monisUrl: "https://www.monis.rent/products/27-4-k-multimedia-monitor",
    variant: "uhd-27",
  },
  {
    id: "monitor-34-curved",
    name: '34" 4K Gaming Monitor',
    description: "Ultrawide curved, 180 Hz — trading / immersive work.",
    category: "accessories",
    kind: "monitor",
    weeklyPriceUsd: 19,
    imageUrl:
      "https://strapi.monis.rent/uploads/34_4_K_Gaming_Monitor_7_3f6b2ba627.jpg",
    monisUrl: "https://www.monis.rent/products/34-4-k-curved-monitor-180-hz",
    variant: "ultrawide-34",
  },
  {
    id: "lamp-1s",
    name: "Smart LED Desk Lamp 1S",
    description: "Ra90, four modes, flicker-free, smart control.",
    category: "accessories",
    kind: "lamp",
    weeklyPriceUsd: 3,
    imageUrl:
      "https://strapi.monis.rent/uploads/Xiaomi_Mi_Led_Desk_Lamp_1_S_10_3777ddd163.jpg",
    monisUrl: "https://www.monis.rent/products/smart-led-desk-lamp-1-s",
    variant: "led-arm",
  },
  {
    id: "plant-desk",
    name: "Desk Plant",
    description: "A touch of Bali green for the Room (concept accessory).",
    category: "accessories",
    kind: "plant",
    weeklyPriceUsd: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop",
    monisUrl: "https://www.monis.rent/",
    variant: "leafy",
  },
  {
    id: "keyboard-mx",
    name: "Logitech MX Keyboard",
    description: "Wireless, Easy-Switch across 3 computers.",
    category: "accessories",
    kind: "keyboard",
    weeklyPriceUsd: 6,
    imageUrl:
      "https://strapi.monis.rent/uploads/Logitech_MX_keys_1_9977480ae1.jpg",
    monisUrl: "https://www.monis.rent/products/logitech-mx-keyboard",
    variant: "mx-keys",
  },
  {
    id: "mouse-mx",
    name: "Logitech MX Master Mouse S3",
    description: "Ergonomic wireless mouse, 8K DPI Darkfield.",
    category: "accessories",
    kind: "mouse",
    weeklyPriceUsd: 3,
    imageUrl: "https://strapi.monis.rent/uploads/Logitech_S3_6_4cf1e523b8.jpg",
    monisUrl: "https://www.monis.rent/products/logitech-mx-master-mouse-s3",
    variant: "mx-master",
  },
]

export const DEFAULT_DESK_ID = "desk-electric"
export const DEFAULT_CHAIR_ID = "chair-ergo"

export const RENTAL_DURATIONS = [1, 4, 12] as const
export type RentalDurationWeeks = (typeof RENTAL_DURATIONS)[number]
export const DEFAULT_DURATION: RentalDurationWeeks = 4

export function getCatalogItem(id: string | null | undefined) {
  if (!id) return undefined
  return CATALOG.find((item) => item.id === id)
}

export function catalogByCategory(category: CatalogCategory) {
  return CATALOG.filter((item) => item.category === category)
}

export function catalogByKind(kind: CatalogKind) {
  return CATALOG.filter((item) => item.kind === kind)
}
