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
"[project]/pages/api/create-link-token.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$_plaid$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/_plaid.ts [api] (ecmascript)");
;
async function handler(req, res) {
    try {
        const resp = await __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$_plaid$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["plaid"].linkTokenCreate({
            user: {
                client_user_id: 'demo-user-001'
            },
            client_name: 'Gambling Spend Demo',
            products: [
                'transactions'
            ],
            country_codes: [
                'GB'
            ],
            language: 'en'
        });
        res.status(200).json({
            link_token: resp.data.link_token
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0a3fd222._.js.map