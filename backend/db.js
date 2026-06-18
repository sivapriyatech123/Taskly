const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database Connection Failed', err.stack);
    } else {
        console.log('✅ PostgreSQL Connected Successfully');
        release();
    }
});

module.exports = pool;