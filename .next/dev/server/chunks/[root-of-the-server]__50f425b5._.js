module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/formidable [external] (formidable, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("formidable");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/csv-parse/sync [external] (csv-parse/sync, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("csv-parse/sync");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
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
"[project]/pages/api/upload-csv.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/formidable [external] (formidable, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$csv$2d$parse$2f$sync__$5b$external$5d$__$28$csv$2d$parse$2f$sync$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/csv-parse/sync [external] (csv-parse/sync, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$csv$2d$parse$2f$sync__$5b$external$5d$__$28$csv$2d$parse$2f$sync$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$csv$2d$parse$2f$sync__$5b$external$5d$__$28$csv$2d$parse$2f$sync$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const config = {
    api: {
        bodyParser: false
    }
};
function pick(obj, keys) {
    for (const k of keys){
        if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
    }
    return null;
}
async function handler(req, res) {
    try {
        const form = new __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__["IncomingForm"]({
            multiples: false,
            uploadDir: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].tmpdir(),
            keepExtensions: true
        });
        const { files } = await new Promise((resolve, reject)=>{
            form.parse(req, (err, fields, files)=>err ? reject(err) : resolve({
                    fields,
                    files
                }));
        });
        const f = Array.isArray(files.file) ? files.file[0] : files.file;
        const filepath = f?.filepath || f?.filepath || f?.path;
        if (!filepath) {
            res.status(400).send('Invalid CSV upload');
            return;
        }
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(filepath, 'utf8');
        const records = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$csv$2d$parse$2f$sync__$5b$external$5d$__$28$csv$2d$parse$2f$sync$2c$__esm_import$29$__["parse"])(raw, {
            columns: true,
            skip_empty_lines: true
        });
        const txns = records.map((r, i)=>{
            const dateRaw = pick(r, [
                'date',
                'Date',
                'posted',
                'Posting Date',
                'Transaction Date'
            ]);
            const dateStr = String(dateRaw || '').slice(0, 10);
            const amountRaw = pick(r, [
                'amount',
                'Amount',
                'value',
                'Value',
                'Transaction Amount'
            ]);
            const merchantRaw = pick(r, [
                'merchant_name',
                'Merchant',
                'Description',
                'Name',
                'Narrative',
                'Details'
            ]);
            const mccRaw = pick(r, [
                'mcc',
                'MCC'
            ]);
            const catRaw = pick(r, [
                'category',
                'Category'
            ]);
            const pfcRaw = pick(r, [
                'pfc',
                'Personal Finance Category'
            ]);
            const currencyRaw = pick(r, [
                'currency',
                'Currency'
            ]) || 'GBP';
            const amtNum = Number(String(amountRaw || '0').replace(/,/g, ''));
            const cat = typeof catRaw === 'string' ? catRaw.split(/[>,]/).map((s)=>s.trim()).filter(Boolean) : Array.isArray(catRaw) ? catRaw : [];
            return {
                id: r.id || r.transaction_id || `csv-${i}-${dateStr}`,
                date: dateStr,
                datetime: null,
                amount: isFinite(amtNum) ? amtNum : 0,
                merchant_name: String(merchantRaw || 'Unknown'),
                mcc: mccRaw ? String(mccRaw) : null,
                category: cat,
                pfc: pfcRaw ? String(pfcRaw) : null,
                currency: String(currencyRaw || 'GBP'),
                _source: 'csv'
            };
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["setOverrideTransactions"])(txns);
        try {
            __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].unlinkSync(filepath);
        } catch  {}
        // Redirect to dashboard
        res.writeHead(303, {
            Location: '/dashboard'
        });
        res.end();
    } catch (e) {
        res.status(400).send('Invalid CSV format');
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__50f425b5._.js.map