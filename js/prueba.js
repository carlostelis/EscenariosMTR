const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');


//{ "
//     { "nombre":
// ", "tipo":"NUMBER"}\(\d+,\d+\)
// "\sNUMBER\(\d+,\s*\d+\)
//     ", "tipo":"NUMBER"}
// " VARCHAR2\(\d+ \w+\)
//     ", "tipo":"TEXT"}
