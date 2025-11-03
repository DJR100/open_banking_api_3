module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/classify.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bucket",
    ()=>bucket,
    "isGambling",
    ()=>isGambling,
    "spendValue",
    ()=>spendValue,
    "topMerchants",
    ()=>topMerchants,
    "totalSpend",
    ()=>totalSpend
]);
const gamblingRe = /(bet365|betfair|ladbrokes|william ?hill|sky ?bet|coral|paddy ?power|pokerstars|888|casino)/i;
function isGambling(t) {
    const mcc = t?.mcc ? String(t.mcc) : null;
    const byMcc = mcc === '7995';
    const byPfc = typeof t?.pfc === 'string' && /gambl/i.test(t.pfc);
    const byCat = Array.isArray(t?.category) && t.category.some((c)=>/gambl/i.test(c));
    const byName = gamblingRe.test(String(t?.merchant_name || t?.name || ''));
    return byMcc || byPfc || byCat || byName;
}
function spendValue(t) {
    const isCsv = t?._source === 'csv';
    const amt = Number(t?.amount || 0);
    if (isCsv) return amt < 0 ? Math.abs(amt) : 0;
    return amt > 0 ? amt : 0;
}
function bucket(transactions, granularity) {
    const fmt = (d)=>{
        const y = d.getUTCFullYear();
        const m = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        if (granularity === 'year') return `${y}`;
        if (granularity === 'month') return `${y}-${m}`;
        if (granularity === 'week') {
            const tmp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
            const day = (d.getUTCDay() + 6) % 7; // Monday=0
            tmp.setUTCDate(d.getUTCDate() - day);
            const wm = String(tmp.getUTCMonth() + 1).padStart(2, '0');
            const wd = String(tmp.getUTCDate()).padStart(2, '0');
            return `${tmp.getUTCFullYear()}-W${wm}-${wd}`;
        }
        return `${y}-${m}-${dd}`;
    };
    const out = {};
    for (const t of transactions){
        if (!isGambling(t)) continue;
        const dateStr = t?.date || (t?.datetime ? String(t.datetime).slice(0, 10) : null);
        if (!dateStr) continue;
        const date = new Date(`${dateStr}T00:00:00Z`);
        const key = fmt(date);
        const spend = spendValue(t);
        out[key] = (out[key] || 0) + spend;
    }
    return out;
}
function totalSpend(transactions) {
    return transactions.reduce((acc, t)=>acc + (isGambling(t) ? spendValue(t) : 0), 0);
}
function topMerchants(transactions, windowDays = 90) {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setUTCDate(now.getUTCDate() - windowDays);
    const sums = {};
    for (const t of transactions){
        if (!isGambling(t)) continue;
        const dateStr = t?.date || (t?.datetime ? String(t.datetime).slice(0, 10) : null);
        if (!dateStr) continue;
        const dt = new Date(`${dateStr}T00:00:00Z`);
        if (dt < cutoff) continue;
        const merchant = String(t?.merchant_name || t?.name || 'Unknown');
        sums[merchant] = (sums[merchant] || 0) + spendValue(t);
    }
    return Object.entries(sums).map(([merchant, amount])=>({
            merchant,
            amount
        })).sort((a, b)=>b.amount - a.amount);
}
}),
"[project]/lib/insights.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "biggestLosingWeek",
    ()=>biggestLosingWeek,
    "favouriteVenue",
    ()=>favouriteVenue,
    "leaderboardRows",
    ()=>leaderboardRows,
    "mostActiveTime",
    ()=>mostActiveTime,
    "percentileRank",
    ()=>percentileRank,
    "realityCheck",
    ()=>realityCheck,
    "totalLost",
    ()=>totalLost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/classify.ts [app-ssr] (ecmascript)");
;
function totalLost(transactions) {
    return transactions.reduce((a, t)=>a + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isGambling"])(t) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spendValue"])(t) : 0), 0);
}
function biggestLosingWeek(transactions) {
    const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bucket"])(transactions, 'week');
    let maxKey = '';
    let maxVal = 0;
    for (const [k, v] of Object.entries(w)){
        if (v > maxVal) {
            maxVal = Number(v);
            maxKey = k;
        }
    }
    return {
        week: maxKey,
        amount: maxVal
    };
}
function favouriteVenue(transactions, windowDays = 365) {
    const top = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["topMerchants"])(transactions, windowDays)[0];
    return top ? top.merchant : '—';
}
function mostActiveTime(transactions) {
    const counts = {};
    for (const t of transactions){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isGambling"])(t)) continue;
        const dtStr = t?.datetime || null;
        if (!dtStr) continue;
        const hour = new Date(dtStr).getUTCHours();
        counts[hour] = (counts[hour] || 0) + 1;
    }
    const [hour, cnt] = Object.entries(counts).sort((a, b)=>Number(b[1]) - Number(a[1]))[0] || [
        null,
        0
    ];
    if (hour == null) return {
        label: '—',
        tagline: 'No time data'
    };
    const h = Number(hour);
    const ampm = h === 0 ? '12:00 AM' : h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h - 12}:00 PM`;
    const quips = {
        night: 'Midnight Meltdown',
        morning: 'Breakfast Bets',
        afternoon: 'Afternoon Action',
        evening: 'Prime-time Punt'
    };
    const slot = h < 6 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
    return {
        label: ampm,
        tagline: quips[slot],
        count: cnt
    };
}
function percentileRank(yourLoss) {
    // Return the percentage of users with losses strictly BELOW yours (0..99)
    // Using a mock global pool for demo; exclude yourLoss to avoid 100% edge.
    const pool = [
        200,
        450,
        680,
        820,
        1100,
        1500,
        2200,
        3400,
        4700,
        6500,
        9200
    ];
    const below = pool.filter((v)=>v < yourLoss).length;
    const pctBelow = Math.round(below / pool.length * 100);
    return Math.min(99, Math.max(0, pctBelow));
}
function realityCheck(loss) {
    const tescoMealDeal = Math.floor(loss / 3.5);
    const sp500Year = Math.round(loss * 1.15);
    const vegasTicket = loss >= 450 ? 'A one-way ticket to Vegas (and lose more there)' : 'A domestic flight (to think about your choices)';
    return {
        invested: sp500Year,
        meals: tescoMealDeal,
        travel: vegasTicket
    };
}
function leaderboardRows(transactions, anon = true) {
    const youName = anon ? 'You (Anonymous)' : 'You';
    const youAmt = totalLost(transactions);
    const MOCK = [
        {
            name: 'Zac Saber',
            amount: 12491
        },
        {
            name: 'Daniil Bekirov',
            amount: 8672
        },
        {
            name: 'Andy Tyler',
            amount: 5034
        }
    ];
    return [
        ...MOCK,
        {
            name: youName,
            amount: youAmt
        }
    ].sort((a, b)=>b.amount - a.amount).map((r, i)=>({
            rank: i + 1,
            ...r
        }));
}
}),
"[project]/app/share/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Share
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/classify.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$insights$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/insights.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Share() {
    const [txns, setTxns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch('/api/transactions').then((r)=>r.json()).then((d)=>setTxns(d.transactions || []));
    }, []);
    const loss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["totalSpend"])(txns), [
        txns
    ]);
    const pctBelow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$insights$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentileRank"])(loss), [
        loss
    ]);
    const level = loss > 10000 ? 'High-Roller Catastrophe' : loss > 5000 ? 'Intermediate Disaster' : loss > 1000 ? 'Mild Mishap' : 'Beginner’s Luck';
    const gbp0 = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0
    });
    const nf = new Intl.NumberFormat('en-GB');
    const save = async ()=>{
        const { toPng } = await __turbopack_context__.A("[project]/node_modules/html-to-image/es/index.js [app-ssr] (ecmascript, async loader)");
        if (!ref.current) return;
        const dataUrl = await toPng(ref.current, {
            pixelRatio: 2,
            cacheBust: true
        });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'gambling-damage-card.png';
        a.click();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8 max-w-xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold mb-4",
                children: "Share your damage"
            }, void 0, false, {
                fileName: "[project]/app/share/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                className: "rounded-2xl overflow-hidden border-2 border-[#ff1744] bg-[radial-gradient(120%_120%_at_30%_10%,#2a0c10_0%,#111318_60%)] text-white shadow-[0_0_40px_#ff174433]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-block text-xs px-3 py-1 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 mb-4",
                                children: "GAMBLER LEVEL"
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-semibold",
                                children: level
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl font-extrabold mt-2 text-[#ff1744]",
                                children: gbp0.format(loss)
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70 mt-1",
                                children: "Total Lost This Year"
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 rounded-lg bg-white/5 border border-white/10 p-4 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: [
                                        "I lost ",
                                        gbp0.format(loss),
                                        " this year — Top ",
                                        nf.format(Math.max(1, 100 - pctBelow)),
                                        "% of Gamblers."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/share/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-xs text-[#fbbf24]",
                                children: [
                                    "• Top ",
                                    Math.max(1, 100 - pctBelow),
                                    "% Globally"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/share/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-3 bg-[#161a22] text-gray-300 text-xs flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "gambling-spend-demo"
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "We promise not to tell your girlfriend."
                            }, void 0, false, {
                                fileName: "[project]/app/share/page.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/share/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/share/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: save,
                className: "mt-4 w-full px-4 py-3 rounded bg-[#ff1744] hover:bg-[#d5133a] text-white font-medium",
                children: "⬇ Download Card"
            }, void 0, false, {
                fileName: "[project]/app/share/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 mt-2",
                children: "Share your shame on social media"
            }, void 0, false, {
                fileName: "[project]/app/share/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/share/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f33742cd._.js.map