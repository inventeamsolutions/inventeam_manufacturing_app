frappe.ui.form.on('Stock Entry', {
    custom_material_request: function(frm) {
		if (frm.doc.custom_material_request) {
            frappe.call({
                method: 'inventeam_manufacturing_app.util.custom_script.fetch_material_request_items',
                args: {
                    material_request: frm.doc.custom_material_request
                },
                callback: function(response) {
                    if (response.message && response.message.items) {
                        // Clear existing items in the Item List
                        frm.clear_table('items');

                        // Add fetched items to the Item List
                        $.each(response.message.items, function(i, item) {
                            var child = frm.add_child('items');
                            frappe.model.set_value(child.doctype, child.name, 'item_code', item.item_code);
                            frappe.model.set_value(child.doctype, child.name, 'item_name', item.item_name);
                            frappe.model.set_value(child.doctype, child.name, 'custom_material_request_qty', item.qty);
							frappe.model.set_value(child.doctype, child.name, 'qty', 0);
							frappe.model.set_value(child.doctype, child.name, 'uom', item.uom);
							frappe.model.set_value(child.doctype, child.name, 's_warehouse', item.from_warehouse);
							frappe.model.set_value(child.doctype, child.name, 't_warehouse', item.warehouse);
                            // Add more fields as needed
                        });

                        // Refresh the Item List
                        frm.refresh_field('items');
                    }
                }
            });
        }
    },
	refresh: function(frm) {
        frm.fields_dict['items'].grid.get_field('item_code').get_query = function(doc, cdt, cdn) {
            // Customize the column width (e.g., 200px)
            return { width: '10px' };
        };

        // Refresh the item grid to reflect the changes
        frm.fields_dict['items'].grid.refresh();
    }
});