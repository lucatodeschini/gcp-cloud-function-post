const {GoogleAuth} = require('google-auth-library');

async function getAuthConfigHeader(url, credentials) {
    let auth = new GoogleAuth({keyFilename: credentials});
    const client = await auth.getIdTokenClient(url);
    const res = await client.request({url});
    return res.config;
}

exports.getAuthConfigHeader = getAuthConfigHeader