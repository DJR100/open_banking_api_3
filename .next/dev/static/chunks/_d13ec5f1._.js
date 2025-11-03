(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/classify.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/insights.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/classify.ts [app-client] (ecmascript)");
;
function totalLost(transactions) {
    return transactions.reduce((a, t)=>a + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGambling"])(t) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spendValue"])(t) : 0), 0);
}
function biggestLosingWeek(transactions) {
    const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bucket"])(transactions, 'week');
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
    const top = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topMerchants"])(transactions, windowDays)[0];
    return top ? top.merchant : '—';
}
function mostActiveTime(transactions) {
    const counts = {};
    for (const t of transactions){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classify$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGambling"])(t)) continue;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/leaderboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Leaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$insights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/insights.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    _s();
    const [txns, setTxns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [anon, setAnon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Leaderboard.useEffect": ()=>{
            fetch('/api/transactions').then({
                "Leaderboard.useEffect": (r)=>r.json()
            }["Leaderboard.useEffect"]).then({
                "Leaderboard.useEffect": (d)=>setTxns(d.transactions || [])
            }["Leaderboard.useEffect"]);
        }
    }["Leaderboard.useEffect"], []);
    const you = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Leaderboard.useMemo[you]": ()=>({
                name: anon ? 'Anonymous' : 'You',
                amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$insights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["totalLost"])(txns)
            })
    }["Leaderboard.useMemo[you]"], [
        txns,
        anon
    ]);
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Leaderboard.useMemo[rows]": ()=>{
            const data = [
                ...MOCK,
                you
            ].sort({
                "Leaderboard.useMemo[rows].data": (a, b)=>b.amount - a.amount
            }["Leaderboard.useMemo[rows].data"]);
            return data.map({
                "Leaderboard.useMemo[rows]": (r, i)=>({
                        rank: i + 1,
                        ...r
                    })
            }["Leaderboard.useMemo[rows]"]);
        }
    }["Leaderboard.useMemo[rows]"], [
        you
    ]);
    const bigLoss = you.amount > 5000;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8 max-w-3xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold",
                        children: "Leaderboard of Shame"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/page.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm flex items-center gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-white/10 bg-[#0f1115] rounded overflow-hidden shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-[#ff1744] text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2",
                                        children: "#"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2",
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `border-t ${r.name === (anon ? 'Anonymous' : 'You') ? 'bg-[#ff1744]/10' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2",
                                            children: r.rank
                                        }, void 0, false, {
                                            fileName: "[project]/app/leaderboard/page.tsx",
                                            lineNumber: 54,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2",
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/leaderboard/page.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
            bigLoss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(Leaderboard, "iRQMbLjbhnvtQxGxbMirp4krq4Q=");
_c = Leaderboard;
var _c;
__turbopack_context__.k.register(_c, "Leaderboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_d13ec5f1._.js.map