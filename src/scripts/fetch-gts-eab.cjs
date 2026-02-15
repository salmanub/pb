const { google } = require('googleapis');

async function main() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Handle newlines in secret
    const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (!email || !key) {
        console.error("Error: Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY");
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: email,
            private_key: key,
        },
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();

    // Robust Project ID detection
    let projectId;
    try {
        projectId = await auth.getProjectId();
    } catch (e) {
        // Provide hint but don't fail yet, try fallback
    }

    if (!projectId && email.includes('@')) {
        // Fallback: extract from service account email
        // e.g. sa-name@PROJECT-ID.iam.gserviceaccount.com
        const parts = email.split('@');
        if (parts.length > 1) {
            const domainParts = parts[1].split('.');
            // Typically the project ID is the first segment of the domain
            projectId = domainParts[0];
        }
    }

    if (!projectId) {
        throw new Error("Unable to determine Google Cloud Project ID. Automatic detection failed and cannot extract from email.");
    }

    // Log to stderr so it doesn't break the JSON output on stdout
    console.error(`Using Project ID: ${projectId}`);

    const url = `https://publicca.googleapis.com/v1beta1/projects/${projectId}/locations/global/externalAccountKeys`;

    const res = await client.request({
        url,
        method: 'POST',
    });

    console.log(JSON.stringify(res.data));
}

main().catch(err => {
    console.error('Failed to fetch EAB credentials:', err);
    process.exit(1);
});
