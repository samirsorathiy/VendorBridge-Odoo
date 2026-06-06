window.renderLogin = function(state) {
    return `
        <div class="min-h-screen w-full flex items-center justify-center bg-themeDark-base relative overflow-hidden px-4">
            <div class="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/5 flex flex-col md:flex-row min-h-[540px] shadow-2xl">
                <div class="w-full md:w-1/2 p-12 bg-gradient-to-br from-themeDark-slate to-themeDark-base flex flex-col justify-between relative">
                    <div class="flex items-center space-x-3">
                        <div class="bg-brand-blueAccent p-2.5 rounded-xl text-white shadow-lg"><i data-lucide="network" class="w-6 h-6"></i></div>
                        <div>
                            <h1 class="text-xl font-bold text-white tracking-wide">LOGI-VEND</h1>
                            <p class="text-[10px] text-brand-blueAccent font-bold uppercase tracking-widest">ERP Ecosystem</p>
                        </div>
                    </div>
                    <div class="my-auto pt-12">
                        <h2 class="text-3xl font-extrabold text-white leading-tight">Access your<br>Procurement Hub</h2>
                        <p class="text-xs text-slate-400 mt-2">Secure entry point verified via role governance controls.</p>
                    </div>
                    <div class="text-xs text-slate-500">© 2026 Logi-Vend | Project Matrix Ecosystem</div>
                </div>
                <div class="w-full md:w-1/2 bg-themeLight-card p-12 flex flex-col justify-center text-slate-900">
                    <h3 class="text-2xl font-bold mb-6 text-slate-800">Sign In</h3>
                    ${state.authError ? `<div class="bg-red-50 text-red-700 p-3 rounded-lg text-xs mb-4 border border-red-200">${state.authError}</div>` : ''}
                    <form id="login-form" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Work Email</label>
                            <input type="email" id="login-email" value="${state.currentUser || ''}" placeholder="name@vendorbridge.com" required class="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand-blueAccent bg-white">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Verification Password</label>
                            <input type="password" id="login-password" value="password123" placeholder="••••••••" required class="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand-blueAccent bg-white">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Workspace Clearance Node Role</label>
                            <select id="role-select" class="w-full border border-slate-200 rounded-lg p-2.5 text-xs bg-white focus:outline-none focus:border-brand-blueAccent">
                                <option value="Admin" ${state.currentRole === 'Admin' ? 'selected' : ''}>Administrator (Full Clearance)</option>
                                <option value="Vendor" ${state.currentRole === 'Vendor' ? 'selected' : ''}>Vendor Portal Profile Node</option>
                                <option value="Manager" ${state.currentRole === 'Manager' ? 'selected' : ''}>Strategic Approver / Manager</option>
                                <option value="Procurement Officer" ${state.currentRole === 'Procurement Officer' ? 'selected' : ''}>Procurement Officer Channel</option>
                            </select>
                        </div>
                        <button type="submit" class="w-full bg-brand-blueAccent hover:bg-brand-hoverBlue text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-md mt-2">Sign In</button>
                    </form>
                </div>
            </div>
        </div>`;
};