
export const onRequest = async (context) => {
    const { request, next, env } = context;
    const url = new URL(request.url);

    // 1. Check if the client accepts Signed Exchanges (SXG)
    const acceptHeader = request.headers.get("Accept") || "";
    const supportsSxg = acceptHeader.includes("application/signed-exchange;v=b3");

    // 2. We only care about potential HTML requests (not assets)
    // If the request ends in .html or is just a path (e.g. /about), it's a candidate.
    // We exclude paths with extensions that are clearly not HTML (images, styles, scripts)
    // Only process if it MIGHT be an HTML page.
    const hasExtension = url.pathname.match(/\.[0-9a-z]+$/i);
    // Allow .html, otherwise if it has an extension it's likely an asset
    const isExcluded = hasExtension && !url.pathname.endsWith(".html");

    if (supportsSxg && !isExcluded) {
        try {
            // 3. Construct the path to the potential .sxg file
            // Standard 11ty output Structure:
            // / -> /index.html -> /index.html.sxg
            // /about -> /about/index.html -> /about/index.html.sxg
            // /post/hello -> /post/hello/index.html -> /post/hello/index.html.sxg 

            let sxgPath = url.pathname;

            if (sxgPath.endsWith("/")) {
                sxgPath += "index.html.sxg";
            } else if (sxgPath.endsWith(".html")) {
                // If it's a direct HTML request: /foo.html -> /foo.html.sxg
                sxgPath += ".sxg";
            } else {
                // Assume it's a Clean URL (directory): /about -> /about/index.html.sxg
                sxgPath += "/index.html.sxg";
            }

            // 4. Fetch the SXG asset from the deployment via the ASSETS binding
            // Note: In Pages Functions, `env.ASSETS` is how we access static files
            // We must construct a full URL for fetch()
            const sxgUrl = new URL(sxgPath, url.origin);

            // Try to fetch the SXG file
            // Important: Using env.ASSETS.fetch allows us to get the static asset
            const sxgResponse = await env.ASSETS.fetch(sxgUrl);

            if (sxgResponse.ok) {
                // 5. Serve the SXG file if found, with correct headers
                const newHeaders = new Headers(sxgResponse.headers);
                newHeaders.set("Content-Type", "application/signed-exchange;v=b3");
                newHeaders.set("X-Content-Type-Options", "nosniff");

                return new Response(sxgResponse.body, {
                    status: sxgResponse.status,
                    statusText: sxgResponse.statusText,
                    headers: newHeaders
                });
            }
        } catch (e) {
            // Silent fail: proceed to normal HTML response
            // console.error("SXG lookup failed:", e);
        }
    }

    // Fallback: serve the standard HTML or asset response
    return next();
};
