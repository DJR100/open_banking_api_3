module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConnectPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-plaid-link/dist/index.esm.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function ConnectPage() {
    const [linkToken, setLinkToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch('/api/create-link-token').then((r)=>r.json()).then((d)=>setLinkToken(d.link_token)).catch(()=>setLinkToken(null));
    }, []);
    const onSuccess = async (public_token)=>{
        const r = await fetch('/api/exchange-public-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                public_token
            })
        });
        if (!r.ok) return alert('Token exchange failed');
        window.location.href = '/loading';
    };
    const { open, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlaidLink"])({
        token: linkToken || '',
        onSuccess
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative p-8 max-w-3xl mx-auto text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 opacity-30 pointer-events-none",
                style: {
                    background: 'radial-gradient(60% 60% at 50% 30%, #ff1744 0%, transparent 55%), radial-gradient(40% 40% at 70% 80%, #ff1744 0%, transparent 55%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-5xl md:text-7xl font-extrabold tracking-tight leading-tight",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-white",
                        children: "Expose your"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-[#ff1744]",
                        children: "gambling addiction."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-lg text-gray-400",
                children: "Your bank knows. The house knows. It's time you knew."
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    disabled: !ready || !linkToken,
                    onClick: ()=>open(),
                    className: "px-6 py-3 rounded bg-[#ff1744] hover:bg-[#d5133a] text-white disabled:opacity-50 shadow-[0_0_30px_#ff1744AA]",
                    children: linkToken ? 'Connect your bank and face the truth →' : 'Preparing…'
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-8 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-white/10"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-500 text-sm",
                        children: "or"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-white/10"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: "Upload a statement (CSV):"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        action: "/api/upload-csv",
                        method: "post",
                        encType: "multipart/form-data",
                        className: "flex justify-center items-center gap-3",
                        children: (()=>{
                            const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
                            const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: fileRef,
                                        id: "csv-file",
                                        type: "file",
                                        name: "file",
                                        accept: ".csv",
                                        className: "hidden",
                                        required: true,
                                        onChange: (e)=>setFileName(e.currentTarget.files?.[0]?.name || '')
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>fileRef.current?.click(),
                                        className: "px-3 py-1.5 rounded border border-white/20 bg-black/30 text-white hover:border-[#ff1744] hover:text-[#ff1744] transition-colors",
                                        children: "Choose file"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-400 max-w-[240px] truncate",
                                        children: fileName || 'No file selected'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-3 py-1.5 rounded border border-[#ff1744] text-[#ff1744] hover:bg-[#ff1744] hover:text-white transition-colors",
                                        type: "submit",
                                        children: "Upload"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true);
                        })()
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-500 mt-2",
                        children: [
                            "Need sample data? Download",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "underline text-[#ff1744]",
                                href: "/samples/small.csv",
                                children: "small.csv"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            " or",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "underline text-[#ff1744]",
                                href: "/samples/large.csv",
                                children: "large.csv"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 mt-10",
                children: "We promise not to tell your girlfriend."
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
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
"[project]/node_modules/react-plaid-link/dist/index.esm.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlaidEmbeddedLink",
    ()=>PlaidEmbeddedLink,
    "PlaidLink",
    ()=>PlaidLink,
    "PlaidLinkStableEvent",
    ()=>PlaidLinkStableEvent,
    "usePlaidLink",
    ()=>usePlaidLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var _excluded = [
    "src",
    "checkForExisting"
];
var scripts = {}; // Check for existing <script> tags with this src. If so, update scripts[src]
// and return the new status; otherwise, return undefined.
var checkExisting = function checkExisting(src) {
    var existing = document.querySelector("script[src=\"".concat(src, "\"]"));
    if (existing) {
        // Assume existing <script> tag is already loaded,
        // and cache that data for future use.
        return scripts[src] = {
            loading: false,
            error: null,
            scriptEl: existing
        };
    }
    return undefined;
};
var isBrowser = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && typeof window.document !== 'undefined';
function useScript(_ref) {
    var src = _ref.src, _ref$checkForExisting = _ref.checkForExisting, checkForExisting = _ref$checkForExisting === void 0 ? false : _ref$checkForExisting, attributes = _objectWithoutProperties(_ref, _excluded);
    // Check whether some instance of this hook considered this src.
    var status = src ? scripts[src] : undefined; // If requested, check for existing <script> tags with this src
    // (unless we've already loaded the script ourselves).
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(status ? status.loading : Boolean(src)), _useState2 = _slicedToArray(_useState, 2), loading = _useState2[0], setLoading = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(status ? status.error : null), _useState4 = _slicedToArray(_useState3, 2), error = _useState4[0], setError = _useState4[1]; // Tracks if script is loaded so we can avoid duplicate script tags
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), _useState6 = _slicedToArray(_useState5, 2), scriptLoaded = _useState6[0], setScriptLoaded = _useState6[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        // Nothing to do on server, or if no src specified, or
        // if script is already loaded or "error" state.
        if ("TURBOPACK compile-time truthy", 1) return; // Check again for existing <script> tags with this src
        //TURBOPACK unreachable
        ;
        var scriptEl;
        // from a previous load, or a newly created one.
        var handleLoad;
        var handleError;
    }, [
        src
    ]);
    return [
        loading,
        error
    ];
}
var renameKeyInObject = function renameKeyInObject(o, oldKey, newKey) {
    var newObject = {};
    delete Object.assign(newObject, o, _defineProperty({}, newKey, o[oldKey]))[oldKey];
    return newObject;
};
/**
 * Wrap link handler creation and instance to clean up iframe via destroy() method
 */ var createPlaidHandler = function createPlaidHandler(config, creator) {
    var state = {
        plaid: null,
        open: false,
        onExitCallback: null
    }; // If Plaid is not available, throw an Error
    if ("TURBOPACK compile-time truthy", 1) {
        throw new Error('Plaid not loaded');
    }
    state.plaid = creator(_objectSpread2(_objectSpread2({}, config), {}, {
        onExit: function onExit(error, metadata) {
            state.open = false;
            config.onExit && config.onExit(error, metadata);
            state.onExitCallback && state.onExitCallback();
        }
    }));
    var open = function open() {
        if (!state.plaid) {
            return;
        }
        state.open = true;
        state.onExitCallback = null;
        state.plaid.open();
    };
    var submit = function submit(data) {
        if (!state.plaid) {
            return;
        }
        state.plaid.submit(data);
    };
    var exit = function exit(exitOptions, callback) {
        if (!state.open || !state.plaid) {
            callback && callback();
            return;
        }
        state.onExitCallback = callback;
        state.plaid.exit(exitOptions);
        if (exitOptions && exitOptions.force) {
            state.open = false;
        }
    };
    var destroy = function destroy() {
        if (!state.plaid) {
            return;
        }
        state.plaid.destroy();
        state.plaid = null;
    };
    return {
        open: open,
        submit: submit,
        exit: exit,
        destroy: destroy
    };
};
var createPlaid = function createPlaid(options, creator) {
    var config = renameKeyInObject(options, 'publicKey', 'key');
    return createPlaidHandler(config, creator);
};
var PLAID_LINK_STABLE_URL = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
var noop = function noop() {};
/**
 * This hook loads Plaid script and manages the Plaid Link creation for you.
 * You get easy open & exit methods to call and loading & error states.
 *
 * This will destroy the Plaid UI on un-mounting so it's up to you to be
 * graceful to the user.
 *
 * A new Plaid instance is created every time the token and products options change.
 * It's up to you to prevent unnecessary re-creations on re-render.
 */ var usePlaidLink = function usePlaidLink(options) {
    // Asynchronously load the plaid/link/stable url into the DOM
    var _useScript = useScript({
        src: PLAID_LINK_STABLE_URL,
        checkForExisting: true
    }), _useScript2 = _slicedToArray(_useScript, 2), loading = _useScript2[0], error = _useScript2[1]; // internal state
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), _useState2 = _slicedToArray(_useState, 2), plaid = _useState2[0], setPlaid = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), _useState4 = _slicedToArray(_useState3, 2), iframeLoaded = _useState4[0], setIframeLoaded = _useState4[1];
    var products = (options.product || []).slice().sort().join(',');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        // If the link.js script is still loading, return prematurely
        if (loading) {
            return;
        } // If the token, publicKey, and received redirect URI are undefined, return prematurely
        if (!options.token && !options.publicKey && !options.receivedRedirectUri) {
            return;
        }
        if (error || !window.Plaid) {
            // eslint-disable-next-line no-console
            console.error('Error loading Plaid', error);
            return;
        } // if an old plaid instance exists, destroy it before
        // creating a new one
        if (plaid != null) {
            plaid.exit({
                force: true
            }, function() {
                return plaid.destroy();
            });
        }
        var next = createPlaid(_objectSpread2(_objectSpread2({}, options), {}, {
            onLoad: function onLoad() {
                setIframeLoaded(true);
                options.onLoad && options.onLoad();
            }
        }), window.Plaid.create);
        setPlaid(next); // destroy the Plaid iframe factory
        return function() {
            return next.exit({
                force: true
            }, function() {
                return next.destroy();
            });
        };
    }, [
        loading,
        error,
        options.publicKey,
        options.token,
        products
    ]);
    var ready = plaid != null && (!loading || iframeLoaded);
    var openNoOp = function openNoOp() {
        if (!options.token) {
            console.warn('react-plaid-link: You cannot call open() without a valid token supplied to usePlaidLink. This is a no-op.');
        }
    };
    return {
        error: error,
        ready: ready,
        submit: plaid ? plaid.submit : noop,
        exit: plaid ? plaid.exit : noop,
        open: plaid ? plaid.open : openNoOp
    };
};
var _excluded$1 = [
    "children",
    "style",
    "className"
];
var PlaidLink = function PlaidLink(props) {
    var children = props.children, style = props.style, className = props.className, config = _objectWithoutProperties(props, _excluded$1);
    var _usePlaidLink = usePlaidLink(_objectSpread2({}, config)), error = _usePlaidLink.error, open = _usePlaidLink.open;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("button", {
        disabled: Boolean(error),
        type: "button",
        className: className,
        style: _objectSpread2({
            padding: '6px 4px',
            outline: 'none',
            background: '#FFFFFF',
            border: '2px solid #F1F1F1',
            borderRadius: '4px'
        }, style),
        onClick: function onClick() {
            return open();
        }
    }, children);
};
PlaidLink.displayName = 'PlaidLink';
var PlaidEmbeddedLink = function PlaidEmbeddedLink(props) {
    var style = props.style, className = props.className, onSuccess = props.onSuccess, onExit = props.onExit, onLoad = props.onLoad, onEvent = props.onEvent, token = props.token, receivedRedirectUri = props.receivedRedirectUri;
    var config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(function() {
        return {
            onSuccess: onSuccess,
            onExit: onExit,
            onLoad: onLoad,
            onEvent: onEvent,
            token: token,
            receivedRedirectUri: receivedRedirectUri
        };
    }, [
        onSuccess,
        onExit,
        onLoad,
        onEvent,
        token,
        receivedRedirectUri
    ]); // Asynchronously load the plaid/link/stable url into the DOM
    var _useScript = useScript({
        src: PLAID_LINK_STABLE_URL,
        checkForExisting: true
    }), _useScript2 = _slicedToArray(_useScript, 2), loading = _useScript2[0], error = _useScript2[1];
    var embeddedLinkTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        // If the external link JS script is still loading, return prematurely
        if (loading) {
            return;
        }
        if (error || !window.Plaid) {
            // eslint-disable-next-line no-console
            console.error('Error loading Plaid', error);
            return;
        }
        if (config.token == null || config.token == '') {
            console.error('A token is required to initialize embedded Plaid Link');
            return;
        } // The embedded Link interface doesn't use the `usePlaidLink` hook to manage
        // its Plaid Link instance because the embedded Link integration in link-initialize
        // maintains its own handler internally.
        var _window$Plaid$createE = window.Plaid.createEmbedded(_objectSpread2({}, config), embeddedLinkTarget.current), destroy = _window$Plaid$createE.destroy; // Clean up embedded Link component on unmount
        return function() {
            destroy();
        };
    }, [
        loading,
        error,
        config,
        embeddedLinkTarget
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: style,
        className: className,
        ref: embeddedLinkTarget
    });
};
// The following event names are stable and will not be deprecated or changed
var PlaidLinkStableEvent;
(function(PlaidLinkStableEvent) {
    PlaidLinkStableEvent["OPEN"] = "OPEN";
    PlaidLinkStableEvent["EXIT"] = "EXIT";
    PlaidLinkStableEvent["HANDOFF"] = "HANDOFF";
    PlaidLinkStableEvent["SELECT_INSTITUTION"] = "SELECT_INSTITUTION";
    PlaidLinkStableEvent["ERROR"] = "ERROR";
    PlaidLinkStableEvent["BANK_INCOME_INSIGHTS_COMPLETED"] = "BANK_INCOME_INSIGHTS_COMPLETED";
    PlaidLinkStableEvent["IDENTITY_VERIFICATION_PASS_SESSION"] = "IDENTITY_VERIFICATION_PASS_SESSION";
    PlaidLinkStableEvent["IDENTITY_VERIFICATION_FAIL_SESSION"] = "IDENTITY_VERIFICATION_FAIL_SESSION";
})(PlaidLinkStableEvent || (PlaidLinkStableEvent = {}));
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d688c24d._.js.map