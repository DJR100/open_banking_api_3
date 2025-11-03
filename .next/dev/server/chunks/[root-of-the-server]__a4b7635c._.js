module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/plaid [external] (plaid, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("plaid", () => require("plaid"));

module.exports = mod;
}),
"[project]/pages/api/_plaid.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "plaid",
    ()=>plaid
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$plaid__$5b$external$5d$__$28$plaid$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/plaid [external] (plaid, cjs)");
;
const plaid = new __TURBOPACK__imported__module__$5b$externals$5d2f$plaid__$5b$external$5d$__$28$plaid$2c$__cjs$29$__["PlaidApi"](new __TURBOPACK__imported__module__$5b$externals$5d2f$plaid__$5b$external$5d$__$28$plaid$2c$__cjs$29$__["Configuration"]({
    basePath: __TURBOPACK__imported__module__$5b$externals$5d2f$plaid__$5b$external$5d$__$28$plaid$2c$__cjs$29$__["PlaidEnvironments"].sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SANDBOX_SECRET
        }
    }
}));
}),
"[project]/lib/store.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simple in-memory store. Single-process only (hackathon demo).
__turbopack_context__.s([
    "getAccessToken",
    ()=>getAccessToken,
    "getOverrideTransactions",
    ()=>getOverrideTransactions,
    "setAccessToken",
    ()=>setAccessToken,
    "setOverrideTransactions",
    ()=>setOverrideTransactions
]);
let ACCESS_TOKEN = null;
let OVERRIDE_TXNS = null;
function setAccessToken(token) {
    ACCESS_TOKEN = token;
    // Reset CSV override when linking a bank
    OVERRIDE_TXNS = null;
}
function getAccessToken() {
    return ACCESS_TOKEN;
}
function setOverrideTransactions(txns) {
    OVERRIDE_TXNS = txns;
}
function getOverrideTransactions() {
    return OVERRIDE_TXNS;
}
}),
"[project]/pages/api/transactions.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$_plaid$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/_plaid.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [api] (ecmascript)");
;
;
async function handler(req, res) {
    try {
        const csvOverride = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["getOverrideTransactions"])();
        if (csvOverride && csvOverride.length) {
            return res.status(200).json({
                transactions: csvOverride
            });
        }
        const access_token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["getAccessToken"])();
        if (!access_token) return res.status(200).json({
            transactions: []
        });
        const sync = await __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$_plaid$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["plaid"].transactionsSync({
            access_token,
            count: 500
        });
        const txns = (sync.data.added || []).map((t)=>({
                id: t.transaction_id,
                date: t.date,
                datetime: t.datetime || t.authorized_datetime || null,
                amount: t.amount,
                merchant_name: t.merchant_name || t.name,
                mcc: t.merchant_category_code || null,
                category: t.category || [],
                pfc: t.personal_finance_category?.detailed || null,
                currency: t.iso_currency_code || t.unofficial_currency_code || 'GBP',
                _source: 'plaid'
            }));
        res.status(200).json({
            transactions: txns
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a4b7635c._.js.map