import { GoogleAuth } from 'google-auth-library';

async function main() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!email || !key) {
        console.error('❌ Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY');
        process.exit(1);
    }

    // Extract Project ID from email
    // Expected format: name@project-id.iam.gserviceaccount.com
    const projectIdMatch = email.match(/@(.+)\.iam\.gserviceaccount\.com/);
    if (!projectIdMatch) {
        console.error('❌ Could not extract Project ID from Service Account Email. Ensure it follows format: name@project-id.iam.gserviceaccount.com');
        process.exit(1);
    }
    const projectId = projectIdMatch[1];

    console.log(`🔄 Authenticating with Google Cloud Project: ${projectId}`);

    const auth = new GoogleAuth({
        credentials: { client_email: email, private_key: key },
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });

    const client = await auth.getClient();
    const url = `https://publicca.googleapis.com/v1beta1/projects/${projectId}/locations/global/externalAccountKeys`;

    console.log(`🔑 Requesting new EAB key from Google Public CA API...`);

    try {
        const res = await client.request({
            url,
            method: 'POST',
            data: {}
        });

        const { keyId, b64MacKey } = res.data;

        if (keyId && b64MacKey) {
            console.log('✅ Successfully obtained new EAB credentials.');

            // Mask secrets in logs
            console.log(`::add-mask::${keyId}`);
            console.log(`::add-mask::${b64MacKey}`);

            // Export to Github Actions Environment for subsequent steps
            const envFile = process.env.GITHUB_ENV;
            if (envFile) {
                const fs = await import('fs');
                await fs.promises.appendFile(envFile, `GTS_EAB_KID=${keyId}\n`);
                await fs.promises.appendFile(envFile, `GTS_EAB_HMAC=${b64MacKey}\n`);
            }

            // Output for easy parsing if run locally
            console.log(JSON.stringify({ keyId, b64MacKey }));
        } else {
            console.error('❌ API response did not contain keyId or b64MacKey');
            process.exit(1);
        }

    } catch (err) {
        console.error('❌ Error requesting EAB key:', err.message);
        if (err.response) {
            console.error('Response data:', JSON.stringify(err.response.data, null, 2));
        }
        console.error('💡 Recommendation: Ensure the "Public CA API" is enabled in Google Cloud Console and the Service Account has "Public CA External Account Key Creator" role.');
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Fatal Script Error:', err);
    process.exit(1);
});
