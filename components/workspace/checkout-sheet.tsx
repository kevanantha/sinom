"use client"

import Image from "next/image"
import { getCatalogItem } from "@/lib/catalog"
import {
  listSelectedItemIds,
  periodQuoteUsd,
  useWorkspaceStore,
  weeklyQuoteUsd,
} from "@/lib/workspace-store"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function CheckoutSheet() {
  const open = useWorkspaceStore((s) => s.checkoutOpen)
  const closeCheckout = useWorkspaceStore((s) => s.closeCheckout)
  const requestRental = useWorkspaceStore((s) => s.requestRental)
  const resetRental = useWorkspaceStore((s) => s.resetRental)
  const rentalRequested = useWorkspaceStore((s) => s.rentalRequested)
  const selection = useWorkspaceStore((s) => s.selection)
  const durationWeeks = useWorkspaceStore((s) => s.durationWeeks)

  const ids = listSelectedItemIds(selection)
  const items = ids
    .map((id) => getCatalogItem(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
  const weekly = weeklyQuoteUsd(selection)
  const period = periodQuoteUsd(selection, durationWeeks)

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) closeCheckout()
      }}
    >
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {rentalRequested ? "Rental requested" : "Your workspace"}
          </SheetTitle>
          <SheetDescription>
            {rentalRequested
              ? "This is a demo confirmation — no payment was taken. Open items on monis.rent to rent for real."
              : "Review your setup, then request a rental. Concept checkout for Sinom × monis."}
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          {rentalRequested ? (
            <div className="flex flex-col gap-4 py-4">
              <div className="rounded-xl border bg-muted/40 p-4">
                <p className="text-sm font-medium">You&apos;re all set (demo)</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your {durationWeeks}-week Bali workspace quote is{" "}
                  <span className="font-semibold text-foreground">${period}</span>{" "}
                  (${weekly}/week).
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.monisUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      View {item.name} on monis.rent
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="flex flex-col gap-3 py-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      ${item.weeklyPriceUsd}/week
                    </span>
                    <a
                      href={item.monisUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                    >
                      View on monis.rent
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Separator />

        <SheetFooter className="gap-3">
          {!rentalRequested && (
            <div className="flex w-full items-end justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  {durationWeeks} weeks
                </span>
                <span className="text-xl font-semibold tabular-nums">
                  ${period}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  ${weekly}/week
                </span>
              </div>
              <Button onClick={requestRental}>Request rental</Button>
            </div>
          )}
          {rentalRequested && (
            <Button variant="outline" onClick={resetRental}>
              Keep designing
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
