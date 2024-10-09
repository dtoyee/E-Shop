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

export async function getUserOrders(userId) {
  const [rows] = await connection.query(
    "SELECT "+
      "o.order_id, "+
      "u.email, "+
      "o.product, "+
      "SUM(o.quantity) AS 'Quantity', "+
      "SUM(o.total) AS 'Total' "+
    "FROM orders o "+
    "INNER JOIN users u "+
      "ON u.id = o.user_id "+
    "WHERE o.user_id = " + userId + " "+
    "GROUP BY o.order_id " +
    "ORDER BY o.id DESC"
  );
  return rows;
}

export async function getOrder(orderId) {
  const [rows] = await connection.query("SELECT * FROM orders WHERE order_id = '" + orderId+"'")
  return rows
}