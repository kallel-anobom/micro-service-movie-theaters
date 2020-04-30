const MongoClient = require('mongodb').MongoClient;

let connection = null;
let db = null;

function connect(callback) {
  if (connection) return callback(null, db);

  MongoClient.connect(process.env.MONGO_CONNECTION, (err, conn) => {
    if (err) 
      return callback(err, null);
    else {
      connection = conn;
      db = conn.db(process.env.DATABASE_NAME, { useUnifiedTopology: true });
      
      return callback(null, db);
    }
  });
} 

function disconnect() {
  if (!connection) return true;
  
  connection.close();
  connection = null;

  return true;
}

module.exports = { connect, disconnect }