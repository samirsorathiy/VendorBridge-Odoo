window.renderQuotationComparison = function(state) {
    return `
        <div class="space-y-4 text-slate-900">
            <h2 class="text-xl font-bold">Quotation Comparative Evaluation Grid</h2>
            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                ${state.quotations.map(q => `
                    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex justify-between items-center text-xs">
                        <div class="space-y-1">
                            <p class="text-slate-400 font-mono text-[11px]">RFQ Association Source ID: <b class="text-slate-700">${q.rfqId}</b></p>
                            <p class="text-sm font-bold text-slate-800 mt-0.5">${q.vendorName}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-sm font-extrabold text-slate-900">₹${q.price.toLocaleString('en-IN')}</span>
                            <p class="text-[11px] text-slate-400 mt-0.5">Timeline Delta: ${q.delivery}</p>
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
};