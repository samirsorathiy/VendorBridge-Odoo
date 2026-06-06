window.renderVendors = function(state) {
    return `
        <div class="space-y-4 text-slate-900">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Active Vendor Directory Ledger</h2>
                <button class="bg-brand-blueAccent text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-brand-hoverBlue transition-colors flex items-center space-x-1">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i><span>Onboard Vendor</span>
                </button>
            </div>
            <div class="bg-themeLight-card rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                            <th class="p-4">Vendor ID</th>
                            <th class="p-4">Company Entity</th>
                            <th class="p-4">GST Identity Number</th>
                            <th class="p-4">Compliance Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-xs text-slate-700">
                        ${state.vendors.map(v => `
                            <tr class="hover:bg-slate-50/80 transition-colors">
                                <td class="p-4 font-mono font-bold text-brand-blueAccent">${v.id}</td>
                                <td class="p-4"><b>${v.name}</b><br><span class="text-slate-400 text-[11px]">${v.company}</span></td>
                                <td class="p-4 font-mono">${v.gst}</td>
                                <td class="p-4 font-bold text-emerald-600">${v.performance}% Acc</td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
};