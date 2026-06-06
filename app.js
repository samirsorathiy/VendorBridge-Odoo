// Live Synchronization Cloud State Matrix
const state = {
    currentRole: 'Vendor',
    currentUser: '',
    isLoggedIn: false, 
    currentScreen: 'login', 
    activePage: 'dashboard',
    authError: '',
    
    // Core Repositories
    vendors: [
        { id: 'VND001', name: 'Apex Industrial Solutions', company: 'Apex Corp Ltd', gst: '27AAAAA1111A1Z1', performance: 94 },
        { id: 'VND002', name: 'Matrix Logistics & Spares', company: 'Matrix Global', gst: '27BBBBB2222B2Z2', performance: 88 }
    ],
    rfqs: [
        { id: 'RFQ-2026-001', product: 'High-Grade Silicon Wafers', qty: 5000, desc: '99.99% Pure semiconductor production wafers batch grade.', status: 'Active' }
    ],
    quotations: [
        { id: 'QTN-8801', rfqId: 'RFQ-2026-001', vendorName: 'Apex Industrial Solutions', price: 145000, delivery: '12 Days' }
    ],
    approvals: [
        { id: 'APP-401', target: 'Quotation QTN-8801 Evaluation Link', requester: 'Procurement Officer Channel', amount: 145000, status: 'Pending', remarks: 'Awaiting strategic executive authorization.' },
        { id: 'APP-402', target: 'Vendor VND002 Registration Core', requester: 'System Verification Bot', amount: 0, status: 'Pending', remarks: 'Check background compliance logs.' }
    ],
    purchaseOrders: [
        { id: 'PO-2026-901', rfqId: 'RFQ-2026-001', vendorName: 'Apex Industrial Solutions', amount: 145000, status: 'Dispatched' }
    ],
    invoices: [
        { id: 'INV-7701', poId: 'PO-2026-901', vendorName: 'Apex Industrial Solutions', totalAmount: 145000, status: 'Paid' }
    ]
};

const rolePermissions = {
    'Admin': ['dashboard', 'vendors', 'rfqs', 'quotations', 'approvals', 'pos', 'invoices'],
    'Vendor': ['dashboard', 'rfqs', 'quotations'], 
    'Manager': ['dashboard', 'approvals', 'pos', 'invoices'], // Manager focused nodes
    'Procurement Officer': ['dashboard', 'vendors', 'rfqs', 'quotations', 'pos', 'invoices'] // Officer controls
};

// UI Modular Layout Component Pipelines
window.renderDashboard = (s) => `
    <div class="space-y-6">
        <h2 class="text-xl font-bold text-slate-900">Dashboard Control Overview</h2>
        <div class="grid grid-cols-2 gap-4 h-64">
            <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-100"><canvas id="chartSpending"></canvas></div>
            <div class="p-4 bg-white rounded-xl shadow-sm border border-slate-100"><canvas id="chartPerformance"></canvas></div>
        </div>
    </div>`;

window.renderVendors = (s) => `
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Vendor Directory Registry</h2>
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table class="w-full text-left border-collapse">
                <tr class="bg-slate-50 border-b border-slate-200 font-bold"><th class="p-3">ID</th><th class="p-3">Vendor Name</th><th class="p-3">Company</th><th class="p-3">Performance Score</th></tr>
                ${s.vendors.map(v => `<tr class="border-b border-slate-100"><td class="p-3 font-mono text-brand-blueAccent font-bold">${v.id}</td><td class="p-3">${v.name}</td><td class="p-3">${v.company}</td><td class="p-3 font-bold text-emerald-600">${v.performance}%</td></tr>`).join('')}
            </table>
        </div>
    </div>`;

// 🛠️ PROCUREMENT OFFICER ACTION: RFQ Hub (Creation Form & Dynamic View Combined)
window.renderRFQs = (s) => {
    const isOfficer = s.currentRole === 'Procurement Officer' || s.currentRole === 'Admin';
    return `
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-slate-900">RFQ Configuration Hub</h2>
            <span class="text-xs text-slate-400 font-mono">Active Pipelines: ${s.rfqs.length}</span>
        </div>

        ${isOfficer ? `
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="text-xs font-bold text-brand-blueAccent uppercase tracking-wider flex items-center gap-1">
                <i data-lucide="file-plus-2" class="w-4 h-4"></i> Create New Procurement RFQ (Officer Control)
            </h3>
            <form id="officer-rfq-form" onsubmit="window.handleCreateRFQ(event)" class="grid grid-cols-3 gap-4 text-xs">
                <div class="space-y-1">
                    <label class="font-semibold text-slate-600">Product / Service Requirement</label>
                    <input type="text" id="rfq-product" required placeholder="e.g. Copper Cathodes Batch B" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-blueAccent">
                </div>
                <div class="space-y-1">
                    <label class="font-semibold text-slate-600">Target Quantity</label>
                    <input type="number" id="rfq-qty" required placeholder="e.g. 2500" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-blueAccent">
                </div>
                <div class="space-y-1">
                    <label class="font-semibold text-slate-600">Action Authority</label>
                    <button type="submit" class="w-full bg-brand-blueAccent hover:bg-brand-hoverBlue text-white font-bold py-2 rounded-lg transition-colors mt-5 shadow-sm uppercase tracking-wider">Publish RFQ Node</button>
                </div>
                <div class="col-span-3 space-y-1">
                    <label class="font-semibold text-slate-600">Technical Specifications / Description</label>
                    <textarea id="rfq-desc" required placeholder="Specify grade parameters, purity indices, and timeline rules..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-blueAccent h-16"></textarea>
                </div>
            </form>
        </div>
        ` : ''}

        <div class="grid grid-cols-1 gap-3">
            ${s.rfqs.map(r => `
            <div class="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs hover:shadow-md transition-shadow">
                <div class="flex justify-between items-center">
                    <b class="text-brand-blueAccent font-mono">${r.id}</b>
                    <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">${r.status}</span>
                </div>
                <p class="font-bold text-slate-800 text-sm">${r.product} <span class="text-brand-blueAccent">(Qty: ${r.qty})</span></p>
                <p class="text-slate-500 font-mono bg-slate-50 p-2 rounded border border-slate-100">${r.desc}</p>
            </div>`).join('')}
        </div>
    </div>`;
};

window.renderQuotationComparison = (s) => `
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Quotation Auditor Hub</h2>
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table class="w-full text-left border-collapse">
                <tr class="bg-slate-50 border-b border-slate-200 font-bold"><th class="p-3">ID</th><th class="p-3">RFQ ID</th><th class="p-3">Supplier</th><th class="p-3">Price Point</th></tr>
                ${s.quotations.map(q => `<tr class="border-b border-slate-100"><td class="p-3 font-mono font-bold">${q.id}</td><td class="p-3 font-mono">${q.rfqId}</td><td class="p-3">${q.vendorName}</td><td class="p-3 font-bold text-brand-blueAccent">₹${q.price.toLocaleString()}</td></tr>`).join('')}
            </table>
        </div>
    </div>`;

// 🛠️ MANAGER ACTION: Approvals Engine Pipeline (Accept/Reject Live Actions)
window.renderApprovals = (s) => {
    const isManager = s.currentRole === 'Manager' || s.currentRole === 'Admin';
    return `
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-slate-900">Approval Stage Pipelines</h2>
            <span class="text-xs font-mono px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg">Awaiting Audit: ${s.approvals.filter(a => a.status === 'Pending').length}</span>
        </div>

        <div class="grid grid-cols-1 gap-4">
            ${s.approvals.map(a => `
            <div class="p-5 bg-white rounded-xl border ${a.status === 'Approved' ? 'border-emerald-200 bg-emerald-50/10' : a.status === 'Rejected' ? 'border-red-200 bg-red-50/10' : 'border-slate-200'} text-xs space-y-3 transition-all">
                <div class="flex justify-between items-center font-mono">
                    <span class="font-bold text-slate-500">${a.id}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase ${a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : a.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
                        ${a.status}
                    </span>
                </div>
                
                <div class="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p class="text-slate-600"><b>Target Context:</b> <span class="text-slate-900 font-medium">${a.target}</span></p>
                    <p class="text-slate-600"><b>Requester:</b> <span class="text-slate-900">${a.requester}</span></p>
                    ${a.amount > 0 ? `<p class="text-slate-600 col-span-2"><b>Evaluated Value Matrix:</b> <span class="text-brand-blueAccent font-bold">₹${a.amount.toLocaleString()}</span></p>` : ''}
                </div>
                
                <p class="text-slate-500 pl-1 italic">Remarks: "${a.remarks}"</p>

                ${isManager && a.status === 'Pending' ? `
                <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button onclick="window.handleApprovalDecision('${a.id}', 'Rejected')" class="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"><i data-lucide="x-circle" class="w-3.5 h-3.5"></i> Deny Clearance</button>
                    <button onclick="window.handleApprovalDecision('${a.id}', 'Approved')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Authorize & Push</button>
                </div>
                ` : ''}
            </div>`).join('')}
        </div>
    </div>`;
};

window.renderPurchaseOrders = (s) => `
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Purchase Orders Allocation Matrix</h2>
        ${s.purchaseOrders.map(p => `<div class="p-4 bg-white rounded-xl border border-slate-200 text-xs">
            <div class="flex justify-between font-mono font-bold text-slate-400"><span>${p.id}</span><span class="text-blue-600">${p.status}</span></div>
            <p class="text-sm font-bold mt-1">${p.vendorName}</p><p class="text-slate-600 font-bold mt-1">Value Matrix: ₹${p.amount.toLocaleString()}</p>
        </div>`).join('')}
    </div>`;

window.renderInvoices = (s) => `
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Tax Invoices Controller Log</h2>
        ${s.invoices.map(i => `<div class="p-4 bg-white rounded-xl border border-slate-200 text-xs flex justify-between items-center">
            <div><b class="font-mono text-brand-blueAccent">${i.id}</b><p class="text-slate-500 mt-0.5">PO Link: ${i.poId} | ${i.vendorName}</p></div>
            <div class="text-right"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">${i.status}</span><p class="font-extrabold text-sm text-slate-900 mt-1">₹${i.totalAmount.toLocaleString()}</p></div>
        </div>`).join('')}
    </div>`;

// ⚡ LIVE PROCUREMENT CONTEXT ACTION HANDLERS
window.handleCreateRFQ = function(e) {
    e.preventDefault();
    const prod = document.getElementById('rfq-product').value;
    const qty = document.getElementById('rfq-qty').value;
    const desc = document.getElementById('rfq-desc').value;
    const newId = `RFQ-2026-00${state.rfqs.length + 1}`;

    const newRFQ = { id: newId, product: prod, qty: parseInt(qty), desc: desc, status: 'Active' };
    
    // Local update then push to database pipeline
    state.rfqs.unshift(newRFQ);
    firebase.database().ref('global_rfqs/' + newId).set(newRFQ).catch(err => console.log("Silent Sync:", err));
    
    alert(`RFQ System Node ${newId} initialization authorized!`);
    renderApp();
};

window.handleApprovalDecision = function(id, decision) {
    const approvalItem = state.approvals.find(a => a.id === id);
    if(approvalItem) {
        approvalItem.status = decision;
        firebase.database().ref('global_approvals/' + id).update({ status: decision }).catch(err => console.log(err));
        
        // Strategic Auto trigger chain generation if approved
        if (decision === 'Approved' && id === 'APP-401') {
            const newPoId = `PO-2026-90${state.purchaseOrders.length + 1}`;
            const newPO = { id: newPoId, rfqId: 'RFQ-2026-001', vendorName: 'Apex Industrial Solutions', amount: 145000, status: 'Dispatched' };
            state.purchaseOrders.push(newPO);
            firebase.database().ref('global_pos/' + newPoId).set(newPO);
            alert(`Manager Matrix Signature Verified! Automated Purchase Order Generated: ${newPoId}`);
        } else {
            alert(`Security Audit Action Recorded: Status changed to ${decision}`);
        }
        renderApp();
    }
};

window.navigate = function(page) {
    const allowed = rolePermissions[state.currentRole] || ['dashboard'];
    if (!allowed.includes(page)) state.activePage = 'access_denied';
    else state.activePage = page;
    renderApp();
};

window.logout = function() {
    firebase.auth().signOut().then(() => {
        state.isLoggedIn = false;
        state.currentUser = '';
        state.currentScreen = 'login';
        state.activePage = 'dashboard';
        renderApp();
    }).catch(err => console.error(err));
};

window.switchAuthScreen = function(screen) {
    state.currentScreen = screen;
    state.authError = '';
    renderApp();
};

async function handleRegisterSubmit(e) {
    e.preventDefault();
    const vendorName = document.getElementById('reg-vendor-name').value;
    const companyName = document.getElementById('reg-company-name').value;
    const email = document.getElementById('reg-email').value;
    const mobile = document.getElementById('reg-mobile').value;
    const password = document.getElementById('reg-password').value;

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await firebase.database().ref('users/' + user.uid).set({
            name: vendorName,
            company: companyName,
            email: email,
            mobile: mobile,
            role: 'Vendor'
        });

        alert('Success! Account entry has been automatically pushed to Firebase Realtime Database.');
        state.currentScreen = 'login';
        state.authError = '';
        renderApp();
    } catch (error) {
        state.authError = error.message;
        renderApp();
    }
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('login-email').value;
    const passwordInput = document.getElementById('login-password').value;
    const selectValue = document.getElementById('role-select').value;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput);
        const user = userCredential.user;

        const snapshot = await firebase.database().ref('users/' + user.uid).once('value');
        let finalRole = 'Vendor';
        let customUserEmail = emailInput;

        if (snapshot.exists()) {
            const cloudUserData = snapshot.val();
            finalRole = cloudUserData.role;
            customUserEmail = cloudUserData.email;
        }

        // Dropdown selection strategy mapping fallback
        if (selectValue.includes('Administrator')) finalRole = 'Admin';
        else if (selectValue.includes('Manager')) finalRole = 'Manager';
        else if (selectValue.includes('Procurement')) finalRole = 'Procurement Officer';
        else finalRole = 'Vendor';

        state.currentUser = customUserEmail;
        state.currentRole = finalRole;
        state.isLoggedIn = true;
        state.activePage = 'dashboard';
        state.authError = '';
        renderApp();
    } catch (error) {
        state.authError = "Verification Failed: " + error.message;
        renderApp();
    }
}

function renderSidebar() {
    const allItems = [
        { id: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard Overview' },
        { id: 'vendors', icon: 'users', label: 'Vendor Directory' },
        { id: 'rfqs', icon: 'file-text', label: 'RFQ Configuration' },
        { id: 'quotations', icon: 'layers', label: 'Quotation Auditor' },
        { id: 'approvals', icon: 'shield-check', label: 'Approval Workflow' },
        { id: 'pos', icon: 'shopping-bag', label: 'Purchase Orders' },
        { id: 'invoices', icon: 'receipt', label: 'Tax Invoices' }
    ];
    const allowed = rolePermissions[state.currentRole] || ['dashboard'];
    const filteredItems = allItems.filter(i => allowed.includes(i.id));

    return `
        <aside class="w-64 bg-themeDark-slate border-r border-themeDark-border flex flex-col h-full text-white">
            <div class="p-5 border-b border-themeDark-border flex items-center space-x-3">
                <div class="bg-brand-blueAccent p-2 rounded-lg text-white"><i data-lucide="network" class="w-5 h-5"></i></div>
                <div><h1 class="font-bold tracking-wider text-xs">LOGI-VEND ERP</h1><span class="text-[9px] uppercase text-brand-blueAccent font-bold">Standard Stack</span></div>
            </div>
            <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
                ${filteredItems.map(item => `<button onclick="window.navigate('${item.id}')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs transition-colors ${state.activePage === item.id ? 'bg-brand-blueAccent text-white font-medium' : 'text-slate-400 hover:bg-themeDark-base hover:text-white'}"><i data-lucide="${item.icon}" class="w-4 h-4"></i><span>${item.label}</span></button>`).join('')}
            </nav>
            <div class="p-4 border-t border-themeDark-border text-center"><span class="text-xs font-bold uppercase tracking-wide bg-brand-blueAccent/10 border border-brand-blueAccent/30 text-brand-blueAccent py-2 rounded block">Clearance: ${state.currentRole}</span></div>
        </aside>`;
}

let chartsInstance = {};
function initCharts() {
    if(chartsInstance.spending) chartsInstance.spending.destroy();
    if(chartsInstance.perf) chartsInstance.perf.destroy();
    const commonOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
    const ctxS = document.getElementById('chartSpending');
    if (ctxS) { chartsInstance.spending = new Chart(ctxS, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ data: [320, 410, 290, 520, 480], borderColor: '#0062e3', tension: 0.3, borderWidth: 2 }] }, options: commonOptions }); }
    const ctxP = document.getElementById('chartPerformance');
    if (ctxP) { chartsInstance.perf = new Chart(ctxP, { type: 'bar', data: { labels: ['Apex Ind.', 'Matrix Log.'], datasets: [{ data: [94, 88], backgroundColor: '#0062e3', borderRadius: 4 }] }, options: commonOptions }); }
}

function renderApp() {
    const container = document.getElementById('app-container');
    if (!state.isLoggedIn) {
        let authFormHTML = '';
        if (state.currentScreen === 'login') {
            authFormHTML = `
                <form id="login-form" class="space-y-4">
                    <div><h3 class="text-2xl font-black text-slate-900 tracking-tight">Sign In Dashboard</h3><p class="text-[11px] text-slate-400 mt-1">Provide cryptography validated node access metrics.</p></div>
                    ${state.authError ? `<div class="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">${state.authError}</div>` : ''}
                    <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Work Email Access Token</label><input type="email" id="login-email" required placeholder="name@vendorbridge.com" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand-blueAccent shadow-sm"></div>
                    <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Verification Password</label><input type="password" id="login-password" required placeholder="••••••••" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand-blueAccent shadow-sm"></div>
                    <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Workspace Clearance Node</label><select id="role-select" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-brand-blueAccent"><option>Administrator (Complete Workspace)</option><option>Vendor Portal Access</option><option>Strategic Approver / Manager</option><option>Procurement Officer Module</option></select></div>
                    <button type="submit" class="w-full bg-brand-blueAccent hover:bg-brand-hoverBlue text-white text-xs font-bold py-2.5 rounded-lg shadow-md transition-colors uppercase tracking-wider mt-2">Sign In Workspace</button>
                    <div class="text-center pt-2"><p class="text-xs text-slate-500">New industrial supplier? <button type="button" onclick="window.switchAuthScreen('register')" class="text-brand-blueAccent font-bold hover:underline">Register Onboarding Node</button></p></div>
                </form>`;
        } else {
            authFormHTML = `
                <form id="register-form" class="space-y-3">
                    <div><h3 class="text-2xl font-black text-slate-900 tracking-tight">Vendor Registration</h3><p class="text-[11px] text-slate-400 mt-0.5">Deploy parameters into the ERP core.</p></div>
                    ${state.authError ? `<div class="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">${state.authError}</div>` : ''}
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Vendor Name</label><input type="text" id="reg-vendor-name" required placeholder="John Doe" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"></div>
                        <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Company Name</label><input type="text" id="reg-company-name" required placeholder="Matrix Logistics" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"></div>
                    </div>
                    <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email Address</label><input type="email" id="reg-email" required placeholder="vendor@company.com" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"></div>
                    <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Mobile Number</label><input type="tel" id="reg-mobile" required placeholder="+91 98765 43210" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"></div>
                    <div class="space-y-1"><label class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Secure Access Password</label><input type="password" id="reg-password" required placeholder="••••••••" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"></div>
                    <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-lg shadow-md uppercase tracking-wider mt-2">Initialize Registration</button>
                    <div class="text-center pt-1"><p class="text-xs text-slate-500">Already initialized token? <button type="button" onclick="window.switchAuthScreen('login')" class="text-brand-blueAccent font-bold hover:underline">Back to Sign In</button></p></div>
                </form>`;
        }

        container.innerHTML = `
            <div class="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#0d131f]">
                <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0062e3_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div class="bg-white/95 rounded-2xl shadow-2xl flex max-w-4xl w-full overflow-hidden border border-slate-800/10 z-10">
                    <div class="w-1/2 bg-themeDark-slate p-12 text-white flex flex-col justify-between">
                        <div>
                            <div class="flex items-center space-x-3 mb-8">
                                <div class="bg-brand-blueAccent p-2.5 rounded-xl text-white shadow-lg"><i data-lucide="network" class="w-6 h-6"></i></div>
                                <div><h2 class="font-black text-sm tracking-widest">LOGI-VEND</h2><p class="text-[10px] text-brand-blueAccent font-bold tracking-widest">ERP ECOSYSTEM</p></div>
                            </div>
                            <div class="space-y-4 mt-16"><h3 class="text-3xl font-extrabold leading-tight">Supply Chain Command Terminal</h3><p class="text-xs text-slate-400">Synchronized matrix interface.</p></div>
                        </div>
                        <div class="text-[10px] text-slate-500 font-mono">© 2026 Logi-Vend Corp</div>
                    </div>
                    <div class="w-1/2 p-10 flex flex-col justify-center bg-slate-50/50">${authFormHTML}</div>
                </div>
            </div>`;
            
        document.getElementById('login-form')?.addEventListener('submit', handleLoginSubmit);
        document.getElementById('register-form')?.addEventListener('submit', handleRegisterSubmit);
        window.lucide.createIcons();
        return;
    }

    let moduleHTML = '';
    switch (state.activePage) {
        case 'dashboard': moduleHTML = window.renderDashboard(state); break;
        case 'vendors': moduleHTML = window.renderVendors(state); break;
        case 'rfqs': moduleHTML = window.renderRFQs(state); break;
        case 'quotations': moduleHTML = window.renderQuotationComparison(state); break;
        case 'approvals': moduleHTML = window.renderApprovals(state); break;
        case 'pos': moduleHTML = window.renderPurchaseOrders(state); break;
        case 'invoices': moduleHTML = window.renderInvoices(state); break;
        case 'access_denied': 
            moduleHTML = `
                <div class="flex flex-col items-center justify-center h-[70vh] text-center space-y-4 p-6">
                    <div class="p-4 bg-red-500/10 text-red-500 rounded-full border border-red-500/20"><i data-lucide="shield-alert" class="w-12 h-12"></i></div>
                    <h3 class="text-lg font-bold text-slate-900 uppercase tracking-wider">Access Denied / Security Block</h3>
                    <p class="text-xs text-slate-500 max-w-sm">Clearance profile context (${state.currentRole}) does not possess permissions.</p>
                    <button onclick="window.navigate('dashboard')" class="bg-brand-blueAccent text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase">Return to Dashboard</button>
                </div>`;
            break;
    }

    container.innerHTML = `
        <div class="flex h-full w-full overflow-hidden">
            ${renderSidebar()}
            <div class="flex-1 flex flex-col bg-themeLight-base overflow-hidden">
                <header class="h-16 bg-themeDark-slate border-b border-themeDark-border flex items-center justify-between px-6 text-white text-xs">
                    <span class="font-mono text-slate-400">Connected Gate Access Token: <b class="text-emerald-400 font-normal">${state.currentUser}</b></span>
                    <button onclick="window.logout()" class="p-2 text-slate-400 hover:text-red-400 flex items-center space-x-1 bg-themeDark-base/50 rounded-lg border border-themeDark-border"><i data-lucide="power" class="w-3.5 h-3.5 text-red-500"></i><span>Disconnect Node</span></button>
                </header>
                <main class="flex-1 overflow-y-auto p-6">${moduleHTML}</main>
            </div>
        </div>`;
        
    if (state.activePage === 'dashboard') initCharts();
    window.lucide.createIcons();
}

renderApp();