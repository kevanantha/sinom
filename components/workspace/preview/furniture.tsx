"use client"

import { useMemo } from "react"
import { getCatalogItem } from "@/lib/catalog"
import { useWorkspaceStore } from "@/lib/workspace-store"

type MeshProps = {
  selected?: boolean
  onSelect?: () => void
}

function SelectableGroup({
  selected,
  onSelect,
  children,
  position,
  rotation,
}: MeshProps & {
  children: React.ReactNode
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <group
      position={position}
      rotation={rotation}
      scale={selected ? 1.03 : 1}
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
      {children}
    </group>
  )
}

export function RoomShell() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#d4c4a8" roughness={0.85} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2, -3]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#f5f1ea" roughness={0.95} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.95} />
      </mesh>
      {/* Window on back wall */}
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
      {/* Ceiling light disc */}
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
  const topColor = variant === "mechanical" ? "#c4a574" : "#e8e0d4"
  const legColor = variant === "mechanical" ? "#3a3a3a" : "#2a2a2a"

  return (
    <group>
      <mesh position={[0, 0.74, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.8]} />
        <meshStandardMaterial color={topColor} roughness={0.55} />
      </mesh>
      {/* Legs */}
      {[
        [-0.7, 0.37, -0.3],
        [0.7, 0.37, -0.3],
        [-0.7, 0.37, 0.3],
        [0.7, 0.37, 0.3],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.74, 0.06]} />
          <meshStandardMaterial color={legColor} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
      {variant === "electric" && (
        <mesh position={[0, 0.2, 0.28]}>
          <boxGeometry args={[0.35, 0.08, 0.12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      )}
    </group>
  )
}

function ChairModel({ variant }: { variant: string }) {
  const frame = variant === "mesh-grey" ? "#6b7280" : "#1f1f1f"
  const seat = variant === "mesh-grey" ? "#9ca3af" : "#2d2d2d"

  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.48, 0.06, 0.48]} />
        <meshStandardMaterial color={seat} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.75, -0.2]}>
        <boxGeometry args={[0.48, 0.55, 0.06]} />
        <meshStandardMaterial color={frame} roughness={0.65} wireframe={false} />
      </mesh>
      {/* Mesh hint */}
      <mesh position={[0, 0.75, -0.17]}>
        <boxGeometry args={[0.4, 0.48, 0.02]} />
        <meshStandardMaterial color="#4b5563" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
        <meshStandardMaterial color={frame} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Base star */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.22, 0.05, Math.sin(a) * 0.22]}
            rotation={[0, -a, 0]}
           
          >
            <boxGeometry args={[0.28, 0.03, 0.05]} />
            <meshStandardMaterial color={frame} metalness={0.5} roughness={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

function MonitorModel({ variant }: { variant: string }) {
  const width =
    variant === "ultrawide-34" ? 0.85 : variant === "uhd-27" ? 0.62 : 0.52
  const height =
    variant === "ultrawide-34" ? 0.32 : variant === "uhd-27" ? 0.38 : 0.32

  return (
    <group>
      <mesh position={[0, height / 2 + 0.12, 0]}>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </mesh>
      <mesh position={[0, height / 2 + 0.12, 0.022]}>
        <planeGeometry args={[width * 0.92, height * 0.88]} />
        <meshStandardMaterial
          color="#1e3a5f"
          emissive="#1a4a7a"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.16, 12]} />
        <meshStandardMaterial color="#222" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0.02]}>
        <boxGeometry args={[0.18, 0.02, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.5} />
      </mesh>
    </group>
  )
}

function LampModel() {
  return (
    <group>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.03, 16]} />
        <meshStandardMaterial color="#e5e5e5" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.08, 0.4, 0]} rotation={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.01, 0.01, 0.22, 8]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.16, 0.48, 0]}>
        <coneGeometry args={[0.07, 0.1, 16]} />
        <meshStandardMaterial
          color="#f5f5f5"
          emissive="#ffe8b0"
          emissiveIntensity={0.4}
        />
      </mesh>
      <pointLight position={[0.16, 0.42, 0]} intensity={0.6} distance={2} color="#ffe8b0" />
    </group>
  )
}

function PlantModel() {
  return (
    <group>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
        <meshStandardMaterial color="#c4a484" roughness={0.8} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.04, 0.22, Math.sin(a) * 0.04]}
            rotation={[0.4, a, 0]}
           
          >
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#3d7a4a" roughness={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

function KeyboardModel() {
  return (
    <mesh position={[0, 0.02, 0]}>
      <boxGeometry args={[0.36, 0.02, 0.12]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
    </mesh>
  )
}

function MouseModel() {
  return (
    <mesh position={[0, 0.015, 0]}>
      <boxGeometry args={[0.06, 0.025, 0.1]} />
      <meshStandardMaterial color="#2a2a2a" roughness={0.45} />
    </mesh>
  )
}

function AddHotspot({
  position,
  onClick,
}: {
  position: [number, number, number]
  onClick: () => void
}) {
  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color="#67b9e8"
          emissive="#67b9e8"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <ringGeometry args={[0.07, 0.09, 24]} />
        <meshBasicMaterial color="#67b9e8" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export function WorkspaceFurniture() {
  const selection = useWorkspaceStore((s) => s.selection)
  const selectedSlot = useWorkspaceStore((s) => s.selectedSlot)
  const setSelectedSlot = useWorkspaceStore((s) => s.setSelectedSlot)
  const setActiveCategory = useWorkspaceStore((s) => s.setActiveCategory)
  const addMonitor = useWorkspaceStore((s) => s.addMonitor)

  const desk = getCatalogItem(selection.deskId)
  const chair = getCatalogItem(selection.chairId)
  const lamp = getCatalogItem(selection.lampId)
  const plant = getCatalogItem(selection.plantId)
  const keyboard = getCatalogItem(selection.keyboardId)
  const mouse = getCatalogItem(selection.mouseId)

  const monitorSlots = useMemo(
    () =>
      selection.monitorIds.map((id, index) => ({
        id,
        index: index as 0 | 1 | 2,
        item: getCatalogItem(id),
        // Spread monitors along the desk
        position: ([-0.45, 0, 0.45][index] ?? 0) as number,
      })),
    [selection.monitorIds]
  )

  const nextMonitorId = "monitor-24-fhd"

  return (
    <group position={[0, 0, -0.8]}>
      {/* Desk */}
      <SelectableGroup
        position={[0, 0, 0]}
        selected={selectedSlot?.type === "desk"}
        onSelect={() => {
          setSelectedSlot({ type: "desk" })
          setActiveCategory("desks")
        }}
      >
        <DeskModel variant={desk?.variant ?? "electric"} />
      </SelectableGroup>

      {/* Chair */}
      <SelectableGroup
        position={[0, 0, 0.85]}
        rotation={[0, Math.PI, 0]}
        selected={selectedSlot?.type === "chair"}
        onSelect={() => {
          setSelectedSlot({ type: "chair" })
          setActiveCategory("chairs")
        }}
      >
        <ChairModel variant={chair?.variant ?? "mesh-black"} />
      </SelectableGroup>

      {/* Monitors on desk — only first empty slot gets a hotspot */}
      {monitorSlots.map((slot) => {
        if (slot.item) {
          return (
            <SelectableGroup
              key={slot.index}
              position={[slot.position, 0.76, -0.18]}
              selected={
                selectedSlot?.type === "monitor" &&
                selectedSlot.index === slot.index
              }
              onSelect={() => {
                setSelectedSlot({ type: "monitor", index: slot.index })
                setActiveCategory("accessories")
              }}
            >
              <MonitorModel variant={slot.item.variant} />
            </SelectableGroup>
          )
        }
        const firstEmpty = selection.monitorIds.findIndex((m) => m === null)
        if (slot.index !== firstEmpty) return null
        return (
          <AddHotspot
            key={`empty-${slot.index}`}
            position={[slot.position, 0.95, -0.18]}
            onClick={() => {
              setSelectedSlot({ type: "monitor", index: slot.index })
              setActiveCategory("accessories")
              addMonitor(nextMonitorId)
            }}
          />
        )
      })}

      {lamp ? (
        <SelectableGroup
          position={[0.65, 0.76, 0.15]}
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
          position={[0.65, 0.9, 0.15]}
          onClick={() => {
            setSelectedSlot({ type: "lamp" })
            setActiveCategory("accessories")
            useWorkspaceStore.getState().setLamp("lamp-1s")
          }}
        />
      )}

      {plant ? (
        <SelectableGroup
          position={[-0.65, 0.76, 0.2]}
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
          position={[-0.65, 0.9, 0.2]}
          onClick={() => {
            setSelectedSlot({ type: "plant" })
            setActiveCategory("accessories")
            useWorkspaceStore.getState().setPlant("plant-desk")
          }}
        />
      )}

      {keyboard && (
        <SelectableGroup
          position={[0, 0.77, 0.15]}
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
          position={[0.28, 0.77, 0.18]}
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
