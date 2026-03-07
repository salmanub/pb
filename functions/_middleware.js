
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

    // Check User Agent to bypass SXG for Lighthouse/PSI debugging
    const userAgent = request.headers.get("User-Agent") || "";
    const isPSI = /Chrome-Lighthouse|Google Page Speed Insights/i.test(userAgent);

    // SXG Enabled (Restored)
    const sxgEnabled = true;

    if (sxgEnabled && supportsSxg && !isExcluded && !isPSI) {
        try {
            // 3. Construct the path to the potential .sxg file
            let sxgPath = url.pathname;

            // Only serve SXG for paths ending in / or .html to ensure URL matching
            if (sxgPath.endsWith("/")) {
                sxgPath += "index.html.sxg";
            } else if (sxgPath.endsWith(".html")) {
                sxgPath += ".sxg";
            } else {
                // If path is a directory without slash (e.g. /blog), let CF redirect to /blog/ first
                // Serving SXG here would cause a URL mismatch (signed with /, browser has none)
                return next();
            }

            // 4. Fetch the SXG asset
            const sxgUrl = new URL(sxgPath, url.origin);
            const sxgResponse = await env.ASSETS.fetch(sxgUrl);

            if (sxgResponse.ok) {
                // 5. Serve the SXG file if found
                const sxgBody = await sxgResponse.arrayBuffer();

                // CRÍTICO: Validar que el archivo es realmente un SXG y no un HTML 404 de Pages
                // Verificamos si empieza por los magic bytes "sxg1" (115, 120, 103, 49) o un tamaño mínimo razonable.
                const view = new Uint8Array(sxgBody);
                const isSxg = view.length > 8 && view[0] === 115 && view[1] === 120 && view[2] === 103 && view[3] === 49;

                if (!isSxg) {
                    throw new Error("El archivo .sxg solicitado está ausente o es inválido, activando fallback");
                }

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
