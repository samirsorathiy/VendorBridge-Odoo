export const rolePermissions = {
    'Admin': ['dashboard', 'vendors', 'logs'],
    'Procurement Officer': ['dashboard', 'rfqs', 'quotations', 'pos', 'invoices'],
    'Vendor': ['dashboard', 'rfqs', 'quotations', 'pos', 'invoices'],
    'Manager': ['dashboard', 'approvals']
};

export const ledgerMockState = {
    vendors: [
        { id: 'VND001', name: 'Apex Industrial Solutions', company: 'Apex Corp Ltd', gst: '27AAAAA1111A1Z1', email: 'procure@apex.com', performance: 94 },
        { id: 'VND002', name: 'Matrix Logistics & Spares', company: 'Matrix Global', gst: '27BBBBB2222B2Z2', email: 'sales@matrix.io', performance: 88 }
    ],
    rfqs: [
        { id: 'RFQ-2026-001', product: 'High-Grade Silicon Wafers', qty: 5000, desc: '99.99% Pure semiconductor wafers.', deadline: '2026-06-20', status: 'Active' }
    ],
    quotations: [
        { id: 'QTN-8801', rfqId: 'RFQ-2026-001', vendorName: 'Apex Industrial Solutions', price: 145000, delivery: '12 Days', rank: 1 }
    ],
    approvals: [
        { id: 'APP-401', target: 'Quotation QTN-8801', requester: 'Procurement Officer', amount: 145000, status: 'Pending', remarks: 'Awaiting authorization review.' }
    ],
    purchaseOrders: [
        { id: 'PO-2026-901', rfqId: 'RFQ-2026-001', vendorName: 'Apex Industrial Solutions', amount: 145000, status: 'Dispatched' }
    ],
    invoices: [
        { id: 'INV-7701', poId: 'PO-2026-901', vendorName: 'Apex Industrial Solutions', totalAmount: 145000, status: 'Paid' }
    ],
    logs: [
        { timestamp: '2026-06-06 12:00', user: 'System Control', event: 'Handshake', desc: 'Odoo Modular Framework Active.' }
    ]
};