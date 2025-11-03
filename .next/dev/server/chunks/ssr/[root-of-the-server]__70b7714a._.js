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
        9200,
        yourLoss
    ].sort((a, b)=>a - b);
    const rank = pool.indexOf(yourLoss) + 1;
    return Math.round(rank / pool.length * 100);
}
function realityCheck(loss) {
    const tescoMealDeal = Math.floor(loss / 3.5);
    const sp500Year = Math.round(loss * 1.15);
    const loveIslandSeason = Math.max(1, Math.floor(loss / 500));
    const vegasTicket = loss >= 450 ? 'A one-way ticket to Vegas (and lose more there)' : 'A domestic flight (to think about your choices)';
    return {
        invested: sp500Year,
        meals: tescoMealDeal,
        entertainment: loveIslandSeason,
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
"[project]/app/leaderboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Leaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$insights$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/insights.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const MOCK = [
    {
        name: 'Zac Saber',
        amount: 8120.42
    },
    {
        name: 'Daniil Bekirov',
        amount: 6422.10
    },
    {
        name: 'Andy Tyler',
        amount: 5118.88
    },
    {
        name: 'Alex P',
        amount: 3891.50
    },
    {
        name: 'Jamie K',
        amount: 2107.33
    }
];
const gbp = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
});
function Leaderboard() {
    const [txns, setTxns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [anon, setAnon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch('/api/transactions').then((r)=>r.json()).then((d)=>setTxns(d.transactions || []));
    }, []);
    const you = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            name: anon ? 'Anonymous' : 'You',
            amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$insights$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["totalLost"])(txns)
        }), [
        txns,
        anon
    ]);
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const data = [
            ...MOCK,
            you
        ].sort((a, b)=>b.amount - a.amount);
        return data.map((r, i)=>({
                rank: i + 1,
                ...r
            }));
    }, [
        you
    ]);
    const bigLoss = you.amount > 5000;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8 max-w-3xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold",
                        children: "Leaderboard of Shame"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/page.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm flex items-center gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: anon,
                                onChange: (e)=>setAnon(e.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/app/leaderboard/page.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            "Anonymous Mode"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leaderboard/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leaderboard/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-white/10 bg-[#0f1115] rounded overflow-hidden shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-[#ff1744] text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2",
                                        children: "#"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2",
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-3 py-2",
                                        children: "Losses"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/page.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/page.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/leaderboard/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `border-t ${r.name === (anon ? 'Anonymous' : 'You') ? 'bg-[#ff1744]/10' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2",
                                            children: r.rank
                                        }, void 0, false, {
                                            fileName: "[project]/app/leaderboard/page.tsx",
                                            lineNumber: 54,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2",
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/leaderboard/page.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right",
                                            children: gbp.format(r.amount)
                                        }, void 0, false, {
                                            fileName: "[project]/app/leaderboard/page.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, r.rank, true, {
                                    fileName: "[project]/app/leaderboard/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/leaderboard/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/leaderboard/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/leaderboard/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            bigLoss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 px-3 py-2 rounded bg-[#ff1744] text-white inline-block shadow-[0_0_20px_#ff1744AA]",
                children: "Jackpot! Over £5,000 – congrats (to the casino)."
            }, void 0, false, {
                fileName: "[project]/app/leaderboard/page.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/leaderboard/page.tsx",
        lineNumber: 33,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__70b7714a._.js.map