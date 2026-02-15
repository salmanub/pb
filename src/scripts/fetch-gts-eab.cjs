const { google } = require('googleapis');

async function main() {
    // Credentials injected via Environment Variables in GitHub Actions
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Private key might contain literal \n characters if passed from GitHub Secrets
    const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (!email || !key) {
        console.error("Error: Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY");
        process.exit(1);
    }

    // Authenticate
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: email,
            private_key: key,
        },
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const projectId = await auth.getProjectId();

    // Call Public CA API to create a new EAB key
    // Docs: https://cloud.google.com/certificate-manager/docs/public-ca-tutorial
    const url = `https://publicca.googleapis.com/v1beta1/projects/${projectId}/locations/global/externalAccountKeys`;

    const res = await client.request({
        url,
        method: 'POST',
    });

    // Output JSON for the workflow to capture
    console.log(JSON.stringify(res.data));
}

main().catch(err => {
    console.error('Failed to fetch EAB credentials:', err);
    process.exit(1);
});
