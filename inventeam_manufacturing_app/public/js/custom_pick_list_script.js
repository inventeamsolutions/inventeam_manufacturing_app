frappe.ui.form.on('Pick List', {
    validate: function(frm) {
        // Check if items exist in the Pick List
        if (frm.doc.locations && frm.doc.locations.length > 0) {
			console.log(frm.doc.locations.length);
            frm.doc.locations.forEach(function(item) {
                if (item.batch_no) {
                    // Item has a batch, check if the quantity matches the batch quantity
                    if (item.qty !== item.batch_qty) {
                        frappe.msgprint('Quantity does not match batch quantity for item ' + item.item_code);
                        frappe.validated = false;
                        return;
                    }
                }
            });
        }
    }
});