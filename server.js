import express from "express";
import mysql from 'mysql2';
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";

// to check if user make login and put correct accsess code before used the app
export let accessToApp = { isLogin: false, accsessCode: false };

// dotenv to read .env file
dotenv.config();

const app = express();
app.use(express.json());

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT
})

connection.connect()


connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('connecting to database is successfully')
})

// Routes (assuming you've adapted them to use the connection pool)
app.use("/users", userRoutes);
app.use('/preferences', preferenceRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Your server is connected to port ${port}`);
});
