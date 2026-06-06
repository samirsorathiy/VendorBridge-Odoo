window.renderApprovals = function(state) {
    return `
        <div class="space-y-4 text-slate-900">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-bold">Strategic Approval Terminal</h2>
                    <p class="text-xs text-slate-500">Review pending matrix allocations and corporate operational sign-offs.</p>
                </div>
                <div class="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Pending Action Logs: <b>${state.approvals.filter(a => a.status === 'Pending').length}</b></span>
                </div>
            </div>
            
            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                ${state.approvals.map(a => `
                    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col md:flex-row justify-between items-start md:items-center text-xs gap-4">
                        <div class="space-y-1.5">
                            <div class="flex items-center space-x-2">
                                <span class="font-mono text-brand-blueAccent font-bold text-xs bg-blue-50 px-2 py-0.5 rounded">${a.id}</span>
                                <span class="text-slate-400">|</span>
                                <b class="text-slate-800 text-sm">${a.target}</b>
                            </div>
                            <p class="text-slate-600 font-medium">Requisition Segment: <span class="text-slate-900 font-semibold">${a.requester}</span></p>
                            <p class="text-slate-400 font-mono text-[11px]">Audit Remarks: "${a.remarks}"</p>
                        </div>
                        
                        <div class="flex items-center justify-between w-full md:w-auto md:space-x-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                            <div class="text-left md:text-right">
                                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Scope Assessment Cost</p>
                                <span class="text-base font-extrabold text-slate-900">₹${a.amount.toLocaleString('en-IN')}</span>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="alert('Token approved successfully')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-colors flex items-center space-x-1">
                                    <i data-lucide="check" class="w-3.5 h-3.5"></i><span>Confirm</span>
                                </button>
                                <button onclick="alert('Requisition entry rejected')" class="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-red-200 flex items-center space-x-1">
                                    <i data-lucide="x" class="w-3.5 h-3.5"></i><span>Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
};