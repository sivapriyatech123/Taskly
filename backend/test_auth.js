const http = require('http');

const username = 'testuser_' + Date.now();
const password = 'password123';

function makeRequest(path, data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function run() {
    try {
        console.log(`Trying signup for ${username}...`);
        const signupRes = await makeRequest('/api/auth/signup', { username, password });
        console.log(`Signup STATUS: ${signupRes.status}, BODY: ${signupRes.body}`);

        console.log(`Trying login for ${username}...`);
        const loginRes = await makeRequest('/api/auth/login', { username, password });
        console.log(`Login STATUS: ${loginRes.status}, BODY: ${loginRes.body}`);
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
