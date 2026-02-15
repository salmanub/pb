
export const onRequest = async (context) => {
    const { request, next, env } = context;
    const url = new URL(request.url);

    // CRITICAL: Prevent infinite loops by ignoring requests for .sxg files themselves
    if (url.pathname.endsWith(".sxg") || url.pathname.endsWith(".cert") || url.pathname.endsWith(".cbor")) {
        return next();
    }

    // 1. Check if the client accepts Signed Exchanges (SXG)
    const acceptHeader = request.headers.get("Accept") || "";
    const supportsSxg = acceptHeader.includes("application/signed-exchange;v=b3");

    // 2. Filter for HTML requests
    const hasExtension = url.pathname.match(/\.[0-9a-z]+$/i);
    const isExcluded = hasExtension && !url.pathname.endsWith(".html");

    // SXG Enabled (Restored)
    const sxgEnabled = true;

    if (sxgEnabled && supportsSxg && !isExcluded) {
        try {
            // 3. Construct the path to the potential .sxg file
            let sxgPath = url.pathname;
            if (sxgPath.endsWith("/")) {
                sxgPath += "index.html.sxg";
            } else if (sxgPath.endsWith(".html")) {
                sxgPath += ".sxg";
            } else {
                sxgPath += "/index.html.sxg";
            }

            // 4. Fetch the SXG asset
            const sxgUrl = new URL(sxgPath, url.origin);
            const sxgResponse = await env.ASSETS.fetch(sxgUrl);

            if (sxgResponse.ok) {
                // 5. Serve the SXG file if found
                const sxgBody = await sxgResponse.arrayBuffer();
                const newHeaders = new Headers(sxgResponse.headers);
                newHeaders.set("Content-Type", "application/signed-exchange;v=b3");
                newHeaders.set("X-Content-Type-Options", "nosniff");

                // Clean headers
                newHeaders.delete("Content-Encoding");
                newHeaders.delete("Transfer-Encoding");
                newHeaders.set("Content-Length", sxgBody.byteLength.toString());
                newHeaders.set("Cache-Control", "public, max-age=600");

                return new Response(sxgBody, {
                    status: sxgResponse.status,
                    statusText: sxgResponse.statusText,
                    headers: newHeaders
                });
            }
        } catch (e) {
            // Silent fail, proceed to normal HTML
        }
    }

    // Fallback: serve standard response
    const response = await next();

    // Ensure correct Content-Type for certs (if requested directly)
    if (url.pathname.endsWith("/cert.cbor")) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Content-Type", "application/cert-chain+cbor");
        return new Response(response.body, {
            status: response.status,
            headers: newHeaders
        });
    }

    if (url.pathname.endsWith("/resource.validity.msg")) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Content-Type", "application/cbor");
        return new Response(response.body, {
            status: response.status,
            headers: newHeaders
        });
    }

    return response;
};
