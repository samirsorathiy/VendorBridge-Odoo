window.renderDashboard = function(state) {
    return `
        <div class="space-y-6 text-slate-900">
            <div>
                <h2 class="text-xl font-bold tracking-tight">Procurement Dashboard Overview</h2>
                <p class="text-xs text-themeLight-textMuted">Operational logs analytics corresponding to live access level state.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-themeLight-card p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Capital Outflow Metrics Analytics (INR)</h3>
                    <div class="h-64 relative"><canvas id="chartSpending"></canvas></div>
                </div>
                <div class="bg-themeLight-card p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Fulfillment Allocation Accuracy Rate (%)</h3>
                    <div class="h-64 relative"><canvas id="chartPerformance"></canvas></div>
                </div>
            </div>
        </div>`;
};