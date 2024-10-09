import mysql from "mysql2";

const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "e-shop",
  })
  .promise();

export async function checkIfUserDetailExists(field, value) {
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE " + field + " = '" + value + "'"
  );
  return rows;
}

export function addUser(firstName, lastName, email, password) {
  connection.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES(?,?,?,?)",
    [firstName, lastName, email, password]
  );
}

export function addOrder(orderNumber, userId, product, quantity, total) {
  connection.query(
    "INSERT INTO orders (order_id, user_id, product, quantity, total) VALUES(?,?,?,?,?)",
    [orderNumber, userId, product, quantity, total]
  );
}
