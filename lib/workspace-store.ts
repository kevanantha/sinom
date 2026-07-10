"use client"

import { create } from "zustand"
import {
  DEFAULT_CHAIR_ID,
  DEFAULT_DESK_ID,
  DEFAULT_DURATION,
  getCatalogItem,
  type RentalDurationWeeks,
} from "@/lib/catalog"

export type CameraView = "front" | "top" | "side"

export type WorkspaceSelection = {
  deskId: string
  chairId: string
  /** Up to 3 monitor slot ids; null = empty */
  monitorIds: [string | null, string | null, string | null]
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
  setMonitor: (slotIndex: 0 | 1 | 2, id: string | null) => void
  addMonitor: (id: string) => void
  removeMonitor: (slotIndex: 0 | 1 | 2) => void
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
  | { type: "monitor"; index: 0 | 1 | 2 }
  | { type: "lamp" }
  | { type: "plant" }
  | { type: "keyboard" }
  | { type: "mouse" }

const initialSelection: WorkspaceSelection = {
  deskId: DEFAULT_DESK_ID,
  chairId: DEFAULT_CHAIR_ID,
  monitorIds: [null, null, null],
  lampId: null,
  plantId: null,
  keyboardId: null,
  mouseId: null,
}

export function listSelectedItemIds(selection: WorkspaceSelection): string[] {
  const ids: string[] = [selection.deskId, selection.chairId]
  for (const id of selection.monitorIds) {
    if (id) ids.push(id)
  }
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
  setMonitor: (slotIndex, id) =>
    set((s) => {
      const monitorIds = [...s.selection.monitorIds] as WorkspaceSelection["monitorIds"]
      monitorIds[slotIndex] = id
      return { selection: { ...s.selection, monitorIds } }
    }),
  addMonitor: (id) => {
    const { selection } = get()
    const empty = selection.monitorIds.findIndex((m) => m === null)
    if (empty === -1) return
    get().setMonitor(empty as 0 | 1 | 2, id)
  },
  removeMonitor: (slotIndex) => get().setMonitor(slotIndex, null),
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
    const { selection, selectedSlot } = get()

    switch (item.kind) {
      case "desk":
        get().setDesk(id)
        break
      case "chair":
        get().setChair(id)
        break
      case "monitor": {
        if (selectedSlot?.type === "monitor") {
          get().setMonitor(selectedSlot.index, id)
        } else {
          get().addMonitor(id)
        }
        break
      }
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
