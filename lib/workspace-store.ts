"use client"

import { create } from "zustand"
import {
  DEFAULT_CHAIR_ID,
  DEFAULT_DESK_ID,
  DEFAULT_DURATION,
  catalogByKind,
  getCatalogItem,
  type RentalDurationWeeks,
} from "@/lib/catalog"

export type CameraView = "front" | "top" | "side"

/** Yaw in 90° steps: 0 → 0°, 1 → 90°, 2 → 180°, 3 → 270° */
export type YawStep = 0 | 1 | 2 | 3

export type WorkspaceSelection = {
  deskId: string
  chairId: string
  /** Single monitor Slot; null = empty */
  monitorId: string | null
  /** Persisted facing for the monitor Slot */
  monitorYaw: YawStep
  lampId: string | null
  plantId: string | null
  keyboardId: string | null
  mouseId: string | null
}

type WorkspaceState = {
  selection: WorkspaceSelection
  durationWeeks: RentalDurationWeeks
  cameraView: CameraView
  checkoutOpen: boolean
  rentalRequested: boolean
  activeCategory: "desks" | "chairs" | "accessories"
  selectedSlot: SelectedSlot | null

  setDesk: (id: string) => void
  setChair: (id: string) => void
  setMonitor: (id: string | null) => void
  rotateMonitor: () => void
  replaceMonitor: () => void
  setLamp: (id: string | null) => void
  setPlant: (id: string | null) => void
  setKeyboard: (id: string | null) => void
  setMouse: (id: string | null) => void
  setDuration: (weeks: RentalDurationWeeks) => void
  setCameraView: (view: CameraView) => void
  setActiveCategory: (category: WorkspaceState["activeCategory"]) => void
  setSelectedSlot: (slot: SelectedSlot | null) => void
  openCheckout: () => void
  closeCheckout: () => void
  requestRental: () => void
  resetRental: () => void
  applyCatalogItem: (id: string) => void
}

export type SelectedSlot =
  | { type: "desk" }
  | { type: "chair" }
  | { type: "monitor" }
  | { type: "lamp" }
  | { type: "plant" }
  | { type: "keyboard" }
  | { type: "mouse" }

const initialSelection: WorkspaceSelection = {
  deskId: DEFAULT_DESK_ID,
  chairId: DEFAULT_CHAIR_ID,
  monitorId: null,
  monitorYaw: 0,
  lampId: null,
  plantId: null,
  keyboardId: null,
  mouseId: null,
}

export function listSelectedItemIds(selection: WorkspaceSelection): string[] {
  const ids: string[] = [selection.deskId, selection.chairId]
  if (selection.monitorId) ids.push(selection.monitorId)
  if (selection.lampId) ids.push(selection.lampId)
  if (selection.plantId) ids.push(selection.plantId)
  if (selection.keyboardId) ids.push(selection.keyboardId)
  if (selection.mouseId) ids.push(selection.mouseId)
  return ids
}

export function weeklyQuoteUsd(selection: WorkspaceSelection): number {
  return listSelectedItemIds(selection).reduce((sum, id) => {
    const item = getCatalogItem(id)
    return sum + (item?.weeklyPriceUsd ?? 0)
  }, 0)
}

export function periodQuoteUsd(
  selection: WorkspaceSelection,
  weeks: RentalDurationWeeks
): number {
  return weeklyQuoteUsd(selection) * weeks
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  selection: initialSelection,
  durationWeeks: DEFAULT_DURATION,
  cameraView: "front",
  checkoutOpen: false,
  rentalRequested: false,
  activeCategory: "desks",
  selectedSlot: null,

  setDesk: (id) =>
    set((s) => ({ selection: { ...s.selection, deskId: id } })),
  setChair: (id) =>
    set((s) => ({ selection: { ...s.selection, chairId: id } })),
  setMonitor: (id) =>
    set((s) => ({
      selection: {
        ...s.selection,
        monitorId: id,
        monitorYaw: id ? s.selection.monitorYaw : 0,
      },
    })),
  rotateMonitor: () =>
    set((s) => {
      if (!s.selection.monitorId) return s
      const next = ((s.selection.monitorYaw + 1) % 4) as YawStep
      return { selection: { ...s.selection, monitorYaw: next } }
    }),
  replaceMonitor: () => {
    const monitors = catalogByKind("monitor")
    if (monitors.length === 0) return
    const { selection } = get()
    const currentIndex = monitors.findIndex((m) => m.id === selection.monitorId)
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % monitors.length
    const next = monitors[nextIndex]
    if (!next) return
    get().setMonitor(next.id)
    get().setSelectedSlot({ type: "monitor" })
    get().setActiveCategory("accessories")
  },
  setLamp: (id) =>
    set((s) => ({ selection: { ...s.selection, lampId: id } })),
  setPlant: (id) =>
    set((s) => ({ selection: { ...s.selection, plantId: id } })),
  setKeyboard: (id) =>
    set((s) => ({ selection: { ...s.selection, keyboardId: id } })),
  setMouse: (id) =>
    set((s) => ({ selection: { ...s.selection, mouseId: id } })),
  setDuration: (weeks) => set({ durationWeeks: weeks }),
  setCameraView: (view) => set({ cameraView: view }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  openCheckout: () => set({ checkoutOpen: true, rentalRequested: false }),
  closeCheckout: () => set({ checkoutOpen: false }),
  requestRental: () => set({ rentalRequested: true }),
  resetRental: () => set({ rentalRequested: false, checkoutOpen: false }),

  applyCatalogItem: (id) => {
    const item = getCatalogItem(id)
    if (!item) return
    const { selection } = get()

    switch (item.kind) {
      case "desk":
        get().setDesk(id)
        break
      case "chair":
        get().setChair(id)
        break
      case "monitor":
        get().setMonitor(id)
        get().setSelectedSlot({ type: "monitor" })
        break
      case "lamp":
        get().setLamp(selection.lampId === id ? null : id)
        break
      case "plant":
        get().setPlant(selection.plantId === id ? null : id)
        break
      case "keyboard":
        get().setKeyboard(selection.keyboardId === id ? null : id)
        break
      case "mouse":
        get().setMouse(selection.mouseId === id ? null : id)
        break
    }
  },
}))
