window.renderPurchaseOrders = function(state) {
    const isReadOnly = (state.currentRole === 'Vendor' || state.currentRole === 'Manager');
    
    return `
        <div class="space-y-4 text-slate-900">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Purchase Orders (PO) Dashboard</h2>
                <div class="text-xs bg-slate-100 border text-slate-600 px-3 py-1.5 rounded-lg font-medium">
                    Profile Clearance Level Mode: <b>${isReadOnly ? 'View/Read Only' : 'Read/Write Operations'}</b>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${state.purchaseOrders.map(p => `
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div class="flex justify-between items-start">
                            <span class="font-mono text-xs font-bold text-brand-blueAccent bg-blue-50 px-2 py-1 rounded">${p.id}</span>
                            <span class="text-xs font-semibold text-blue-600 bg-blue-50/60 px-2 py-0.5 rounded-full">${p.status}</span>
                        </div>
                        <div class="mt-4">
                            <p class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Vendor Entity Assignment</p>
                            <h4 class="font-bold text-slate-800 text-sm mt-0.5">${p.vendorName}</h4>
                        </div>
                        <div class="border-t border-slate-100 mt-4 pt-3 flex justify-between items-center text-xs text-slate-500">
                            <span>RFQ Reference Source: <b>${p.rfqId}</b></span>
                            <div class="flex items-center space-x-3">
                                <span class="font-bold text-slate-900">₹${p.amount.toLocaleString('en-IN')}</span>
                                ${!isReadOnly ? `
                                    <button class="bg-slate-900 hover:bg-slate-800 text-white text-[11px] px-2 py-1 rounded transition-colors font-medium">Dispatch PO</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
};