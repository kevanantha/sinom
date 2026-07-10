"use client"

import { Clone, Html, useGLTF } from "@react-three/drei"
import { a, useSpring } from "@react-spring/three"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Delete02Icon,
  Exchange01Icon,
  Rotate01Icon,
} from "@hugeicons/core-free-icons"
import { getCatalogItem } from "@/lib/catalog"
import {
  chairModelUrl,
  deskModelUrl,
  monitorModelUrl,
  PREVIEW_MODEL_URLS,
  PREVIEW_MODELS,
} from "@/lib/preview-models"
import { useWorkspaceStore } from "@/lib/workspace-store"

type MeshProps = {
  selected?: boolean
  onSelect?: () => void
  /** Approximate footprint radius for the selection ring */
  outlineRadius?: number
}

function SelectionRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
      <ringGeometry args={[radius * 0.92, radius, 64]} />
      <meshBasicMaterial
        color="#c4a574"
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </mesh>
  )
}

function SelectableGroup({
  selected,
  onSelect,
  children,
  position,
  rotation,
  outlineRadius = 0.45,
}: MeshProps & {
  children: React.ReactNode
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const { scale } = useSpring({
    scale: selected ? 1.02 : 1,
    config: { tension: 280, friction: 22 },
  })

  return (
    <a.group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.()
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto"
      }}
    >
      {selected && <SelectionRing radius={outlineRadius} />}
      {children}
    </a.group>
  )
}

export function RoomShell() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#d4c4a8" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#f5f1ea" roughness={0.95} />
      </mesh>
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.95} />
      </mesh>
      <mesh position={[1.4, 2.2, -2.99]}>
        <planeGeometry args={[2.35, 1.75]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.7} />
      </mesh>
      <mesh position={[1.4, 2.2, -2.98]}>
        <planeGeometry args={[2.2, 1.6]} />
        <meshStandardMaterial
          color="#b8d4e8"
          emissive="#7eb6d9"
          emissiveIntensity={0.35}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 3.85, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial
          color="#fff8e7"
          emissive="#ffe6a8"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

function DeskModel({ variant }: { variant: string }) {
  const { scene } = useGLTF(deskModelUrl(variant))
  return (
    <group>
      <Clone object={scene} castShadow receiveShadow />
    </group>
  )
}

function ChairModel({ variant }: { variant: string }) {
  const url = chairModelUrl(variant)
  const { scene } = useGLTF(url)
  const isLight = variant === "mesh-grey"
  return (
    <group scale={isLight ? 0.95 : 1}>
      <Clone object={scene} castShadow receiveShadow />
    </group>
  )
}

function MonitorModel({ variant }: { variant: string }) {
  const { scene } = useGLTF(monitorModelUrl(variant))
  return (
    <group>
      <Clone object={scene} castShadow receiveShadow />
    </group>
  )
}

function LampModel() {
  const { scene } = useGLTF(PREVIEW_MODELS.lamp)
  return (
    <group>
      <Clone object={scene} castShadow receiveShadow />
      <pointLight
        position={[0.05, 0.35, 0]}
        intensity={0.55}
        distance={2.2}
        color="#ffe8b0"
      />
    </group>
  )
}

function PlantModel() {
  const { scene } = useGLTF(PREVIEW_MODELS.plant)
  return <Clone object={scene} castShadow receiveShadow />
}

function KeyboardModel() {
  return (
    <mesh position={[0, 0.02, 0]} castShadow>
      <boxGeometry args={[0.36, 0.02, 0.12]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
    </mesh>
  )
}

function MouseModel() {
  return (
    <mesh position={[0, 0.015, 0]} castShadow>
      <boxGeometry args={[0.06, 0.025, 0.1]} />
      <meshStandardMaterial color="#2a2a2a" roughness={0.45} />
    </mesh>
  )
}

function AddHotspot({
  position,
  label,
  onClick,
}: {
  position: [number, number, number]
  label: string
  onClick: () => void
}) {
  return (
    <Html position={position} center distanceFactor={6} zIndexRange={[10, 0]}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        className="rounded-full border border-[#67b9e8]/60 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-[#67b9e8]/15"
      >
        + {label}
      </button>
    </Html>
  )
}

function MonitorSelectionBar({
  position,
  onRotate,
  onReplace,
  onRemove,
}: {
  position: [number, number, number]
  onRotate: () => void
  onReplace: () => void
  onRemove: () => void
}) {
  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[20, 0]}>
      <div
        role="toolbar"
        aria-label="Monitor actions"
        className="flex items-stretch gap-0 overflow-hidden rounded-full border border-white/10 bg-zinc-900/92 text-white shadow-lg backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <SelectionBarButton
          label="Rotate"
          onClick={onRotate}
          icon={Rotate01Icon}
        />
        <div className="w-px self-stretch bg-white/15" />
        <SelectionBarButton
          label="Replace"
          onClick={onReplace}
          icon={Exchange01Icon}
        />
        <div className="w-px self-stretch bg-white/15" />
        <SelectionBarButton
          label="Remove"
          onClick={onRemove}
          icon={Delete02Icon}
        />
      </div>
    </Html>
  )
}

function SelectionBarButton({
  label,
  onClick,
  icon,
}: {
  label: string
  onClick: () => void
  icon: typeof Rotate01Icon
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="flex min-w-[4.5rem] flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium tracking-wide text-white/95 transition hover:bg-white/10"
    >
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.75} />
      {label}
    </button>
  )
}

/** Desk surface height for meter-scale procedural desks (~0.76m). */
const DESK_TOP_Y = 0.76
const MONITOR_SLOT: [number, number, number] = [0, DESK_TOP_Y, -0.18]
const DEFAULT_MONITOR_ID = "monitor-24-fhd"

export function WorkspaceFurniture() {
  const selection = useWorkspaceStore((s) => s.selection)
  const selectedSlot = useWorkspaceStore((s) => s.selectedSlot)
  const setSelectedSlot = useWorkspaceStore((s) => s.setSelectedSlot)
  const setActiveCategory = useWorkspaceStore((s) => s.setActiveCategory)
  const setMonitor = useWorkspaceStore((s) => s.setMonitor)
  const rotateMonitor = useWorkspaceStore((s) => s.rotateMonitor)
  const replaceMonitor = useWorkspaceStore((s) => s.replaceMonitor)

  const desk = getCatalogItem(selection.deskId)
  const chair = getCatalogItem(selection.chairId)
  const monitor = getCatalogItem(selection.monitorId)
  const lamp = getCatalogItem(selection.lampId)
  const plant = getCatalogItem(selection.plantId)
  const keyboard = getCatalogItem(selection.keyboardId)
  const mouse = getCatalogItem(selection.mouseId)

  const monitorSelected = selectedSlot?.type === "monitor"
  const monitorYaw = (selection.monitorYaw * Math.PI) / 2

  return (
    <group position={[0, 0, -0.8]}>
      <SelectableGroup
        position={[0, 0, 0]}
        selected={selectedSlot?.type === "desk"}
        outlineRadius={0.85}
        onSelect={() => {
          setSelectedSlot({ type: "desk" })
          setActiveCategory("desks")
        }}
      >
        <DeskModel variant={desk?.variant ?? "electric"} />
      </SelectableGroup>

      <SelectableGroup
        position={[0, 0, 0.95]}
        rotation={[0, Math.PI, 0]}
        selected={selectedSlot?.type === "chair"}
        outlineRadius={0.4}
        onSelect={() => {
          setSelectedSlot({ type: "chair" })
          setActiveCategory("chairs")
        }}
      >
        <ChairModel variant={chair?.variant ?? "mesh-black"} />
      </SelectableGroup>

      {monitor ? (
        <SelectableGroup
          position={MONITOR_SLOT}
          rotation={[0, monitorYaw, 0]}
          selected={monitorSelected}
          outlineRadius={0.35}
          onSelect={() => {
            setSelectedSlot({ type: "monitor" })
            setActiveCategory("accessories")
          }}
        >
          <MonitorModel variant={monitor.variant} />
          {monitorSelected && (
            <MonitorSelectionBar
              position={[0, 0.55, 0]}
              onRotate={rotateMonitor}
              onReplace={replaceMonitor}
              onRemove={() => {
                setMonitor(null)
                setSelectedSlot(null)
              }}
            />
          )}
        </SelectableGroup>
      ) : (
        <AddHotspot
          position={[MONITOR_SLOT[0], DESK_TOP_Y + 0.2, MONITOR_SLOT[2]]}
          label="Monitor"
          onClick={() => {
            setMonitor(DEFAULT_MONITOR_ID)
            setSelectedSlot({ type: "monitor" })
            setActiveCategory("accessories")
          }}
        />
      )}

      {lamp ? (
        <SelectableGroup
          position={[0.65, DESK_TOP_Y, 0.15]}
          selected={selectedSlot?.type === "lamp"}
          onSelect={() => {
            setSelectedSlot({ type: "lamp" })
            setActiveCategory("accessories")
          }}
        >
          <LampModel />
        </SelectableGroup>
      ) : (
        <AddHotspot
          position={[0.65, DESK_TOP_Y + 0.15, 0.15]}
          label="Lamp"
          onClick={() => {
            setSelectedSlot({ type: "lamp" })
            setActiveCategory("accessories")
            useWorkspaceStore.getState().setLamp("lamp-1s")
          }}
        />
      )}

      {plant ? (
        <SelectableGroup
          position={[-0.65, DESK_TOP_Y, 0.2]}
          selected={selectedSlot?.type === "plant"}
          onSelect={() => {
            setSelectedSlot({ type: "plant" })
            setActiveCategory("accessories")
          }}
        >
          <PlantModel />
        </SelectableGroup>
      ) : (
        <AddHotspot
          position={[-0.65, DESK_TOP_Y + 0.15, 0.2]}
          label="Plant"
          onClick={() => {
            setSelectedSlot({ type: "plant" })
            setActiveCategory("accessories")
            useWorkspaceStore.getState().setPlant("plant-desk")
          }}
        />
      )}

      {keyboard && (
        <SelectableGroup
          position={[0, DESK_TOP_Y + 0.01, 0.15]}
          selected={selectedSlot?.type === "keyboard"}
          onSelect={() => {
            setSelectedSlot({ type: "keyboard" })
            setActiveCategory("accessories")
          }}
        >
          <KeyboardModel />
        </SelectableGroup>
      )}

      {mouse && (
        <SelectableGroup
          position={[0.28, DESK_TOP_Y + 0.01, 0.18]}
          selected={selectedSlot?.type === "mouse"}
          onSelect={() => {
            setSelectedSlot({ type: "mouse" })
            setActiveCategory("accessories")
          }}
        >
          <MouseModel />
        </SelectableGroup>
      )}
    </group>
  )
}

for (const url of PREVIEW_MODEL_URLS) {
  useGLTF.preload(url)
}
