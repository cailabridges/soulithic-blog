import mysql from "mysql";

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "TallSloth29!",
//   database: "blog",
// });

export const db = mysql.createConnection({
  host: "us-cluster-east-01.k8s.cleardb.net",
  user: "b44a045a7455b4",
  password: "9de1d90b",
  database: "heroku_7c11955d935d599",
});

// mysql://b44a045a7455b4:9de1d90b@us-cluster-east-01.k8s.cleardb.net/heroku_7c11955d935d599?reconnect=true
