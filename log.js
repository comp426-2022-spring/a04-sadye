// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const logdb = new Database('log.db');

// Is the database initialized or do we need to initialize it?
const stmt = logdb.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
    );
// Define row using `get()` from better-sqlite3
let row = stmt.get();
// Check if there is a table. If row is undefined then no table exists.
if (row === undefined) {
// Echo information about what you are doing to the console.
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY,
            remoteaddr VARCHAR, 
            remoteuser VARCHAR,
            time VARCHAR,
            method VARCHAR,
            url VARCHAR, 
            protocol TEXT, 
            httpversion NUMERIC,
            secure TEXT, 
            status INTEGER, 
            referer TEXT, 
            useragent TEXT); 
    `;
// Execute SQL commands that we just wrote above.
    logdb.exec(sqlInit);
// Echo information about what we just did to the console.
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = logdb


