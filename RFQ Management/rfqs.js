window.renderRFQs = function(state) {
    const canCreateRFQ = (state.currentRole === 'Admin' || state.currentRole === 'Procurement Officer');
    
    return `
        <div class="space-y-4 text-slate-900">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Request For Quotations (RFQ) Logs</h2>
                ${canCreateRFQ ? `
                    <button class="bg-brand-blueAccent text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-brand-hoverBlue transition-colors flex items-center space-x-1">
                        <i data-lucide="file-plus" class="w-3.5 h-3.5"></i><span>Create RFQ Node</span>
                    </button>
                ` : ''}
            </div>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                ${state.rfqs.map(r => `
                    <div class="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                        <div>
                            <span class="font-mono text-brand-blueAccent font-bold text-xs bg-blue-50 px-2 py-0.5 rounded">${r.id}</span>
                            <span class="mx-2 text-slate-300">|</span>
                            <b class="text-slate-800 text-sm">${r.product}</b> <span class="text-slate-500 font-normal text-xs">(Target Vol: ${r.qty})</span>
                            <p class="text-xs text-slate-500 mt-1">${r.desc}</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">${r.status}</span>
                            ${state.currentRole === 'Vendor' ? `
                                <button class="bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md font-medium hover:bg-slate-800 transition-colors">Submit Bid</button>
                            ` : ''}
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
};