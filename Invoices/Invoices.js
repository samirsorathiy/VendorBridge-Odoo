window.renderInvoices = function(state) {
    const isReadOnly = (state.currentRole === 'Vendor' || state.currentRole === 'Manager');
    
    return `
        <div class="space-y-4 text-slate-900">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Tax Invoicing Systems Ledger</h2>
                <span class="text-xs text-slate-400 font-mono">Clearance Node Module: <b class="text-slate-700">${state.currentRole}</b></span>
            </div>
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
                ${state.invoices.map(i => `
                    <div class="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center text-xs">
                        <div class="space-y-1">
                            <div class="flex items-center space-x-2">
                                <span class="font-bold text-slate-800 text-sm">${i.id}</span>
                                <span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">${i.status}</span>
                            </div>
                            <p class="text-slate-400">Associated PO Asset Structure Link: <span class="font-mono text-slate-600 font-semibold">${i.poId}</span></p>
                        </div>
                        <div class="flex items-center space-x-6">
                            <div class="text-right">
                                <span class="text-sm font-extrabold text-emerald-600">₹${i.totalAmount.toLocaleString('en-IN')}</span>
                                <p class="text-[10px] text-slate-400 mt-0.5">${i.vendorName}</p>
                            </div>
                            ${!isReadOnly ? `
                                <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] px-3 py-1.5 rounded-md shadow-sm transition-colors">Reconcile Settlement</button>
                            ` : ''}
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
};