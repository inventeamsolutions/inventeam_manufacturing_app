import frappe

@frappe.whitelist()
def fetch_material_request_items(material_request):
    # Query the "Material Request Item" table to fetch items
    items = frappe.get_all(
        'Material Request Item',
        filters={'parent': material_request},
        fields=['item_code', 'item_name', 'qty', 'from_warehouse','warehouse','uom']
        # Add more fields as needed
    )

    return {'items': items}