import frappe

def validate_batch_qty(pick_list):
    for item in pick_list.locations:
        if item.batch_no:
            # Fetch the batch record
            batch = frappe.get_doc("Batch", item.batch_no)
            
            # Check if the batch quantity is less than the pick list quantity
            if batch.batch_qty > item.qty:
                frappe.throw(f"Batch quantity for {item.item_code} ({batch.batch_qty}) is less than the pick list quantity ({item.qty})")

def on_submit(doc, method):
    validate_batch_qty(doc)