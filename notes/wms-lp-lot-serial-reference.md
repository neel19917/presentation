# WMS reference — License Plating, Lot Tracking, Serialization

Source: WMS demo call, Applied Digital, June 09. Robert Buntin (FreightPOP) presenting.
Recording: https://fathom.video/calls/703092733
Use this as the content source for the cooking demos on these three topics.

## License plating — demoed, 9:03 / 27:06 / 48:05
A license plate is "a pallet or an ID that includes a larger set of items."

- Robert's worked example: solar customers receive serialized micro-inverters, up to
  50,000 serialized items in a shipment. They break them into pallets — ~10,000
  serialized items per pallet — and FreightPOP associates those items *and* their
  serial numbers to the pallet.
- Result: "you're able to move that pallet around the warehouse in one scan without
  having to validate the items and the serial number, because we've already made that
  association."
- Multiples are supported: combine several license plates onto one pallet, so a pallet
  carries three subsets of items and serial numbers. The system then directs users
  where to go to get those items.
- On the receiving screen the license plate is optional, not required.
- Naming is customizable: customers use pre-printed rolls of 4x6 license plate numbers,
  magnetic tags, or a convention like PO-number-dash-something. Plates can be reprinted
  later from the receiving process.
- Job/project tracking: name the license plate after the job or project, put that job's
  allocated items on it, and track the LP through the warehouse and out to job sites.
  Lot number or bin can serve the same purpose.

## Lot tracking — demoed, 27:06 / 36:00
- "there's lot tracking and expiration dates as well on here if you need" — captured
  inline on the receiving screen, per allocation.
- The Inventory view reports lot numbers alongside license plate association and
  location: "it's going to show you where these items are located, lot numbers, where
  they're associated with a license plate."
- A lot number can be tied to a purchase order or a job number.

## Serialization — discussed, 5:44 / 6:59 / 8:18
- FreightPOP can track serial numbers. NetSuite is the constraint: it enforces an
  item-to-serial-number association, so a serialized item must have its serial scanned
  every time it is touched — receiving, put away, counting, sales order picking.
- "It's a lot of overhead," which is why FreightPOP offers a lighter capture path and
  the license plate approach.
- FreightPOP can register a range: "we've got these 100 serial numbers on a pallet."
  The per-touch validation is NetSuite's requirement, not FreightPOP's.
- Caution Robert gave the customer: once serial numbers are turned on for an item in
  NetSuite, they cannot be turned off for that item.

## RMA receiving — 29:01
PO receipt, RMA receipt, and transfer order receipt are the same screen and the same
transaction, run against different NetSuite records: "It's going to mirror exactly what
the RMA receiving process looks like. These are the same. This is what a transfer order
receipt looks like as well. So all three of those are the same."

Implication for the demos: one receiving screen build covers all three flows — change
only the source document label.

## Receiving flow buttons (confirms the built demo) — 23:25 / 24:30
- **Save** — preserves partial progress mid-container so another user or shift can resume.
  Robert's framing: a container with 10,000 items across 15 pallets takes a long time.
- **Submit** — completes the PO receipt. If quantity is short, NetSuite creates a partial
  receipt and leaves the PO open for the remainder, typically as a supplemental PO
  (PO-dash-2).
- **Post** — optional manager review and approval before writeback to NetSuite.
  Recommended for lower-volume, higher-value items. Once posted, corrections happen in
  NetSuite, and the adjustment flows back to FreightPOP.

## Photos — 29:01 / 31:45
Each scanner has a camera. Photos attach to the item receipt or item fulfillment record
in NetSuite — inbound damage for vendor RMA requests, outbound wrapped pallets for QA.
Roughly 10 photos per transaction; no video.

## Reference screen — license plating / RMA receiving
`uploads/pasted-1786739372516-0.png` — app.freightpop.com/app/#/wms/receipts/1734/edit,
Product Details & Bin Allocation section, scrolled down.

- Scan Item field at top (search + camera icons), placeholder "Scan or type item number".
- Item table columns: ITEM NUMBER, DESCRIPTION, QTY ORDERED, TOTAL RECEIVED, BIN ALLOCATIONS, ACTIONS.
  Row action is a "+ ADD BIN" button. Example rows: st123 / Hard Drive / 100 ordered.
- Allocation cards headed "Allocation 1 - Bin: EXP-REC, Quantity: 50", red trash icon at right.
- Allocation fields, 3-col grid:
  row 1 = License Plate (search / refresh / print / camera icons), Bin (X + search), Quantity Received
  row 2 = Lot ID, Lot Expiration (calendar icon, MM/DD/YYYY placeholder)
- License plate values repeat across allocations (FRTPOP84 on two bins) — that is the pallet ID
  moving a group without scanning each serial.
- Lot ID 123 / Lot Expiration 05/21/2026 captured inline at receipt.
- Footer buttons, left to right: POST, SUBMIT, SAVE, CANCEL.

WmsReceivingDemo.dc.html already mirrors this section.

## Pending
- Screenshots for the serialization screen and the RMA receiving entry point.
